import jsPDF from "jspdf";
import { stories, BOOK_META } from "@/data/bookData";
import { coverImage } from "@/data/bookImages";

// KDP 6×9 portrait trim in points (1 pt = 1/72 in)
// We generate landscape spreads: each spread = 2 pages side by side
// But for KDP single-page PDF we do 6×9 portrait pages.
// However the user's app is landscape spreads — let's keep landscape spread PDF
// with proper proportions and add a KDP single-page version.

// Landscape spread dimensions (mm) — two 6×9 pages side by side
const SPREAD_W = 304.8; // 12 inches
const SPREAD_H = 228.6; // 9 inches
const PAGE_W = SPREAD_W / 2; // 6 inches = 152.4mm
const MARGIN = 18; // ~0.5 inch
const GUTTER = 20; // inside margin

async function loadImageAsDataUrl(src: string): Promise<{ dataUrl: string; width: number; height: number } | null> {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    return { dataUrl: canvas.toDataURL("image/jpeg", 0.92), width: w, height: h };
  } catch {
    return null;
  }
}

// Draw image maintaining aspect ratio (object-contain)
function drawImageContained(
  pdf: jsPDF,
  dataUrl: string,
  x: number,
  y: number,
  maxW: number,
  maxH: number,
  naturalW?: number,
  naturalH?: number
) {
  const imgW = naturalW && naturalW > 0 ? naturalW : maxW;
  const imgH = naturalH && naturalH > 0 ? naturalH : maxH;
  const scale = Math.min(maxW / imgW, maxH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const offsetX = x + (maxW - drawW) / 2;
  const offsetY = y + (maxH - drawH) / 2;
  pdf.addImage(dataUrl, "JPEG", offsetX, offsetY, drawW, drawH);
}

// Subtle page background with gradient effect
function drawPageBackground(pdf: jsPDF, x: number, y: number, w: number, h: number, section: string) {
  // Base warm cream
  pdf.setFillColor(248, 245, 238);
  pdf.rect(x, y, w, h, "F");

  // Section-specific subtle tint
  if (section === "expanding-world") {
    pdf.setFillColor(240, 245, 250);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.3 }));
    pdf.rect(x, y, w, h, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  } else if (section === "far-future") {
    pdf.setFillColor(245, 242, 250);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.3 }));
    pdf.rect(x, y, w, h, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  }
}

export async function generateBookPdf() {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [SPREAD_W, SPREAD_H],
  });

  // Pre-load all images
  const imageCache: Record<number, { dataUrl: string; width: number; height: number } | null> = {};
  const coverLoaded = await loadImageAsDataUrl(coverImage);

  for (const story of stories) {
    if (story.imageUrl) {
      imageCache[story.id] = await loadImageAsDataUrl(story.imageUrl);
    }
  }

  // === COVER PAGE ===
  pdf.setFillColor(18, 22, 40);
  pdf.rect(0, 0, SPREAD_W, SPREAD_H, "F");

  if (coverLoaded) {
    drawImageContained(pdf, coverLoaded.dataUrl, 0, 0, SPREAD_W, SPREAD_H, coverLoaded.width, coverLoaded.height);
    // Lighter overlay now that image has no baked-in text
    pdf.setFillColor(10, 12, 25);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.5 }));
    pdf.rect(0, 0, SPREAD_W, SPREAD_H, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(235, 225, 205);
  const fullTitle = `${BOOK_META.title} — ${BOOK_META.subtitle}`;
  const titleLines = pdf.splitTextToSize(fullTitle, SPREAD_W - 60);
  const titleBlockH = titleLines.length * 10;
  pdf.text(titleLines, SPREAD_W / 2, SPREAD_H / 2 - titleBlockH, { align: "center" });

  const subtitleY = SPREAD_H / 2 + 5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(195, 185, 165);
  const fsLines = pdf.splitTextToSize(BOOK_META.fullSubtitle, 200);
  pdf.text(fsLines, SPREAD_W / 2, subtitleY, { align: "center" });

  pdf.setFontSize(10);
  pdf.setTextColor(210, 175, 100);
  pdf.text(BOOK_META.author, SPREAD_W / 2, SPREAD_H - 30, { align: "center" });

  // === TITLE PAGE ===
  pdf.addPage();
  pdf.setFillColor(248, 245, 238);
  pdf.rect(0, 0, SPREAD_W, SPREAD_H, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(30, 35, 50);
  const t2 = pdf.splitTextToSize(BOOK_META.title, 220);
  pdf.text(t2, SPREAD_W / 2, 65, { align: "center" });

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(16);
  pdf.setTextColor(180, 140, 70);
  pdf.text(`— ${BOOK_META.subtitle}`, SPREAD_W / 2, 90, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  const fs2 = pdf.splitTextToSize(BOOK_META.fullSubtitle, 200);
  pdf.text(fs2, SPREAD_W / 2, 110, { align: "center" });

  pdf.setFontSize(9);
  pdf.text("Written by", SPREAD_W / 2, 140, { align: "center" });
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(12);
  pdf.setTextColor(30, 35, 50);
  pdf.text(BOOK_META.authorLong, SPREAD_W / 2, 150, { align: "center" });

  // === STORY SPREADS ===
  for (let i = 0; i < stories.length; i += 2) {
    pdf.addPage();

    // Left page background
    drawPageBackground(pdf, 0, 0, PAGE_W, SPREAD_H, stories[i].section);
    // Right page background
    if (i + 1 < stories.length) {
      drawPageBackground(pdf, PAGE_W, 0, PAGE_W, SPREAD_H, stories[i + 1].section);
    }

    // Spine
    pdf.setDrawColor(210, 200, 185);
    pdf.setLineWidth(0.3);
    pdf.line(PAGE_W, 8, PAGE_W, SPREAD_H - 8);

    // Left story
    const leftMargin = GUTTER;
    renderStoryOnPage(pdf, stories[i], imageCache[stories[i].id], leftMargin, MARGIN, PAGE_W - GUTTER - MARGIN, SPREAD_H - MARGIN * 2, i + 1);

    // Right story
    if (i + 1 < stories.length) {
      const rightX = PAGE_W + MARGIN;
      renderStoryOnPage(pdf, stories[i + 1], imageCache[stories[i + 1].id], rightX, MARGIN, PAGE_W - GUTTER - MARGIN, SPREAD_H - MARGIN * 2, i + 2);
    }
  }

  // === BACK COVER ===
  pdf.addPage();
  pdf.setFillColor(25, 30, 50);
  pdf.rect(0, 0, SPREAD_W, SPREAD_H, "F");

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(195, 185, 170);
  const backLines = pdf.splitTextToSize(BOOK_META.backCoverText, 200);
  pdf.text(backLines, SPREAD_W / 2, 40, { align: "center" });

  pdf.setFontSize(8);
  pdf.setTextColor(210, 175, 100);
  pdf.text(BOOK_META.author, SPREAD_W / 2, SPREAD_H - 20, { align: "center" });

  pdf.save("AI-Let-Me-Tell-You-What-Ill-Do-With-Humans.pdf");
}

function renderStoryOnPage(
  pdf: jsPDF,
  story: (typeof stories)[0],
  imgData: { dataUrl: string; width: number; height: number } | null | undefined,
  x: number,
  y: number,
  width: number,
  height: number,
  pageNum: number
) {
  const imgAreaH = height * 0.38;
  const imgPadding = 3;

  // Image — aspect-ratio preserved (contain)
  if (imgData) {
    drawImageContained(pdf, imgData.dataUrl, x + imgPadding, y + imgPadding, width - imgPadding * 2, imgAreaH - imgPadding * 2, imgData.width, imgData.height);
  } else {
    // Placeholder
    pdf.setFillColor(238, 233, 223);
    pdf.roundedRect(x, y, width, imgAreaH, 2, 2, "F");
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8);
    pdf.setTextColor(160, 150, 135);
    pdf.text("Illustration", x + width / 2, y + imgAreaH / 2, { align: "center" });
  }

  // Title
  const titleY = y + imgAreaH + 8;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(30, 35, 50);
  const titleLines = pdf.splitTextToSize(story.title, width);
  pdf.text(titleLines, x, titleY);

  // Body text
  const titleH = titleLines.length * 5;
  const textY = titleY + titleH + 4;
  const remainingH = height - imgAreaH - titleH - 25;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(50, 50, 55);
  const textLines = pdf.splitTextToSize(story.text, width);
  const lineH = 3.6; // ~1.6 line-height for 8pt
  const maxLines = Math.floor(remainingH / lineH);
  const fittedLines = textLines.slice(0, maxLines);
  pdf.text(fittedLines, x, textY, { lineHeightFactor: 1.6 });

  // Page number — always at bottom center
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(160, 155, 145);
  pdf.text(`— ${pageNum} —`, x + width / 2, y + height - 2, { align: "center" });
}
