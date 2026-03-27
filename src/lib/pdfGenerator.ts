import jsPDF from "jspdf";
import { stories, BOOK_META } from "@/data/bookData";
import { coverImage } from "@/data/bookImages";

// ── KDP 6×9" trim size ──
const PAGE_W_IN = 6;
const PAGE_H_IN = 9;
const MM_PER_IN = 25.4;
const PAGE_W = PAGE_W_IN * MM_PER_IN; // 152.4 mm
const PAGE_H = PAGE_H_IN * MM_PER_IN; // 228.6 mm
const BLEED = 0.125 * MM_PER_IN;      // 3.175 mm

// KDP margins (inches → mm)
const MARGIN_INSIDE = 0.75 * MM_PER_IN;  // 19.05 mm
const MARGIN_OUTSIDE = 0.5 * MM_PER_IN;  // 12.7 mm
const MARGIN_TOP = 0.5 * MM_PER_IN;      // 12.7 mm
const MARGIN_BOTTOM = 0.75 * MM_PER_IN;  // 19.05 mm

// ── Helpers ──

async function loadImage(src: string): Promise<{ dataUrl: string; w: number; h: number } | null> {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej();
      img.src = src;
    });
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext("2d")!.drawImage(img, 0, 0);
    return { dataUrl: c.toDataURL("image/jpeg", 0.95), w: img.naturalWidth, h: img.naturalHeight };
  } catch {
    return null;
  }
}

/** Draw image with object-contain (no stretching) */
function drawContained(
  pdf: jsPDF, dataUrl: string,
  x: number, y: number, maxW: number, maxH: number,
  natW: number, natH: number
) {
  const scale = Math.min(maxW / natW, maxH / natH);
  const dw = natW * scale;
  const dh = natH * scale;
  pdf.addImage(dataUrl, "JPEG", x + (maxW - dw) / 2, y + (maxH - dh) / 2, dw, dh);
}

/** Warm off-white page background (#F7F4EF base) with subtle gradient */
function drawPageBg(pdf: jsPDF, section?: string) {
  // Base: #F7F4EF warm off-white
  pdf.setFillColor(247, 244, 239);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Soft gradient overlay: slightly warmer top-left, brighter bottom-right
  pdf.setFillColor(242, 237, 231); // #F2EDE7
  pdf.setGState(new (pdf as any).GState({ opacity: 0.3 }));
  pdf.rect(0, 0, PAGE_W * 0.5, PAGE_H * 0.5, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  pdf.setFillColor(250, 247, 242); // #FAF7F2
  pdf.setGState(new (pdf as any).GState({ opacity: 0.25 }));
  pdf.rect(PAGE_W * 0.4, PAGE_H * 0.4, PAGE_W * 0.6, PAGE_H * 0.6, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Very subtle section tint
  if (section === "expanding-world") {
    pdf.setFillColor(235, 242, 250);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.12 }));
    pdf.rect(0, 0, PAGE_W, PAGE_H, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  } else if (section === "far-future") {
    pdf.setFillColor(242, 238, 250);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.12 }));
    pdf.rect(0, 0, PAGE_W, PAGE_H, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  }
}

/** Page number at bottom center */
function drawPageNumber(pdf: jsPDF, num: number) {
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(150, 145, 135);
  pdf.text(`— ${num} —`, PAGE_W / 2, PAGE_H - MARGIN_BOTTOM + 8, { align: "center" });
}

/** Content margins for a given page side */
function getMargins(side: "left" | "right") {
  return {
    left: side === "left" ? MARGIN_INSIDE : MARGIN_OUTSIDE,
    right: side === "left" ? MARGIN_OUTSIDE : MARGIN_INSIDE,
    top: MARGIN_TOP,
    bottom: MARGIN_BOTTOM,
  };
}

// ── Main generator ──

export async function generateBookPdf() {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [PAGE_W, PAGE_H] });

  // Pre-load images
  const coverImg = await loadImage(coverImage);
  const imageCache: Record<number, { dataUrl: string; w: number; h: number } | null> = {};
  for (const s of stories) {
    if (s.imageUrl) imageCache[s.id] = await loadImage(s.imageUrl);
  }

  let pageNum = 0;

  // ═══════════════════════════════════════
  // COVER (full bleed, no page number)
  // ═══════════════════════════════════════
  pdf.setFillColor(18, 22, 40);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  if (coverImg) {
    drawContained(pdf, coverImg.dataUrl, 0, 0, PAGE_W, PAGE_H, coverImg.w, coverImg.h);
    // Dark overlay for text contrast
    pdf.setFillColor(10, 12, 25);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.45 }));
    pdf.rect(0, 0, PAGE_W, PAGE_H, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  }

  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(240, 232, 215);
  const coverTitle = pdf.splitTextToSize(BOOK_META.title, PAGE_W - 30);
  pdf.text(coverTitle, PAGE_W / 2, PAGE_H * 0.35, { align: "center" });

  // Subtitle
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(13);
  pdf.setTextColor(210, 180, 110);
  pdf.text(`— ${BOOK_META.subtitle}`, PAGE_W / 2, PAGE_H * 0.35 + coverTitle.length * 9 + 6, { align: "center" });

  // Full subtitle
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(200, 190, 170);
  const fsLine1 = "Stories from a Future Where";
  const fsLine2 = "Families and AI Grow Together";
  pdf.text(fsLine1, PAGE_W / 2, PAGE_H * 0.58, { align: "center" });
  pdf.text(fsLine2, PAGE_W / 2, PAGE_H * 0.58 + 5, { align: "center" });

  // Author
  pdf.setFontSize(10);
  pdf.setTextColor(210, 180, 110);
  pdf.text(BOOK_META.author, PAGE_W / 2, PAGE_H - 25, { align: "center" });

  // ═══════════════════════════════════════
  // TITLE PAGE
  // ═══════════════════════════════════════
  pdf.addPage();
  pageNum++;
  drawPageBg(pdf);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(30, 35, 50);
  const tp = pdf.splitTextToSize(BOOK_META.title, PAGE_W - 40);
  pdf.text(tp, PAGE_W / 2, 55, { align: "center" });

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(14);
  pdf.setTextColor(180, 140, 70);
  pdf.text(`— ${BOOK_META.subtitle}`, PAGE_W / 2, 55 + tp.length * 9 + 8, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  const fs2 = pdf.splitTextToSize(BOOK_META.fullSubtitle, PAGE_W - 50);
  pdf.text(fs2, PAGE_W / 2, 100, { align: "center" });

  pdf.setFontSize(9);
  pdf.text("Written by", PAGE_W / 2, 130, { align: "center" });
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(12);
  pdf.setTextColor(30, 35, 50);
  pdf.text(BOOK_META.authorLong, PAGE_W / 2, 140, { align: "center" });

  drawPageNumber(pdf, pageNum);

  // ═══════════════════════════════════════
  // STORY PAGES (one story per page)
  // ═══════════════════════════════════════
  for (let i = 0; i < stories.length; i++) {
    pdf.addPage();
    pageNum++;
    const story = stories[i];
    const side: "left" | "right" = pageNum % 2 === 0 ? "left" : "right";
    const m = getMargins(side);

    drawPageBg(pdf, story.section);

    const contentX = m.left;
    const contentW = PAGE_W - m.left - m.right;
    const contentTop = m.top;
    const contentBottom = PAGE_H - m.bottom;
    const contentH = contentBottom - contentTop;

    // Image area: ~40% of content height
    const imgAreaH = contentH * 0.38;
    const imgData = imageCache[story.id];

    if (imgData) {
      // Subtle border/shadow frame
      pdf.setDrawColor(220, 215, 205);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, 2, 2, "S");
      drawContained(pdf, imgData.dataUrl, contentX + 1, contentTop + 1, contentW - 2, imgAreaH - 2, imgData.w, imgData.h);
    } else {
      pdf.setFillColor(240, 237, 228);
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, 2, 2, "F");
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(8);
      pdf.setTextColor(170, 160, 145);
      pdf.text("Illustration", contentX + contentW / 2, contentTop + imgAreaH / 2, { align: "center" });
    }

    // Title — centered, bold, larger like mockup
    const titleY = contentTop + imgAreaH + 8;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(30, 35, 50);
    const titleLines = pdf.splitTextToSize(story.title, contentW);
    pdf.text(titleLines, contentX + contentW / 2, titleY, { align: "center" });
    const titleH = titleLines.length * 6;

    // Body text
    const textY = titleY + titleH + 5;

    const paragraphs = story.text.split("\n").filter(p => p.trim());
    const lineH = 4.5;
    let cursorY = textY;

    for (const para of paragraphs) {
      if (cursorY > contentBottom - 14) break;

      // Detect "Milo's Note:" and render bold prefix
      const isMiloNote = para.trim().startsWith("Milo's Note:");
      if (isMiloNote) {
        cursorY += 1.5; // extra space before Milo's Note
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(35, 35, 45);
        const noteLabel = "Milo's Note: ";
        const labelW = pdf.getTextWidth(noteLabel);
        pdf.text(noteLabel, contentX, cursorY);

        const noteContent = para.trim().replace("Milo's Note:", "").trim();
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(50, 50, 55);
        const noteLines = pdf.splitTextToSize(noteContent, contentW - labelW);
        // First line next to label, rest below
        if (noteLines.length > 0) {
          pdf.text(noteLines[0], contentX + labelW, cursorY);
          cursorY += lineH;
          for (let nl = 1; nl < noteLines.length; nl++) {
            if (cursorY > contentBottom - 14) break;
            pdf.text(noteLines[nl], contentX, cursorY);
            cursorY += lineH;
          }
        }
        cursorY += 2;
      } else {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9.5);
        pdf.setTextColor(50, 50, 55);
        const paraLines = pdf.splitTextToSize(para, contentW);
        const maxLines = Math.floor((contentBottom - 14 - cursorY) / lineH);
        const fitted = paraLines.slice(0, maxLines);
        pdf.text(fitted, contentX, cursorY, { lineHeightFactor: 1.8 });
        cursorY += fitted.length * lineH + 2.5;
      }
    }

    drawPageNumber(pdf, pageNum);
  }

  // ═══════════════════════════════════════
  // BACK COVER
  // ═══════════════════════════════════════
  pdf.addPage();
  pdf.setFillColor(25, 30, 50);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(200, 192, 175);
  const backLines = pdf.splitTextToSize(BOOK_META.backCoverText, PAGE_W - 40);
  pdf.text(backLines, PAGE_W / 2, 50, { align: "center" });

  pdf.setFontSize(9);
  pdf.setTextColor(210, 180, 110);
  pdf.text(BOOK_META.author, PAGE_W / 2, PAGE_H - 25, { align: "center" });

  // ── Save ──
  pdf.save("AI-Let-Me-Tell-You-What-Ill-Do-With-Humans.pdf");
}
