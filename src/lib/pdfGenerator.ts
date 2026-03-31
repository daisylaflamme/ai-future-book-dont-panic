import jsPDF from "jspdf";
import { stories, BOOK_META } from "@/data/bookData";
import pageBackground from "@/assets/page-background.png";
import pdfCoverImage from "@/assets/pdf-cover.png";

type LoadedImage = { dataUrl: string; w: number; h: number };

// ── KDP 6×9" trim size ──
const PAGE_W_IN = 6;
const PAGE_H_IN = 9;
const MM_PER_IN = 25.4;
const PAGE_W = PAGE_W_IN * MM_PER_IN;
const PAGE_H = PAGE_H_IN * MM_PER_IN;

// KDP margins (inches → mm)
const MARGIN_INSIDE = 0.75 * MM_PER_IN;
const MARGIN_OUTSIDE = 0.5 * MM_PER_IN;
const MARGIN_TOP = 0.5 * MM_PER_IN;
const MARGIN_BOTTOM = 0.75 * MM_PER_IN;

// ── Colors matching the app theme ──
const COLORS = {
  foreground: [30, 35, 50],       // --foreground approx
  gold: [186, 143, 50],           // --book-gold
  goldLight: [210, 180, 110],
  muted: [150, 145, 135],
  navy: [20, 30, 65],             // navy blue for Milo's Note
  bodyText: [50, 50, 55],
  coverText: [240, 232, 215],
  pageBg: [247, 244, 239],
  dividerLine: [186, 143, 50],
  dividerDot: [186, 143, 50],
} as const;

const STORY_IMAGE_HEIGHT_RATIO = 0.65;
const STORY_TITLE_TOP_GAP = 15;

// ── Helpers ──

async function loadImage(src: string): Promise<LoadedImage | null> {
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

/** Crop image to a target aspect ratio so it can fill the frame without bleeding outside it */
async function cropImageToAspect(img: LoadedImage, targetAspect: number): Promise<LoadedImage | null> {
  try {
    const srcImg = new Image();
    srcImg.crossOrigin = "anonymous";
    await new Promise<void>((res, rej) => {
      srcImg.onload = () => res();
      srcImg.onerror = () => rej();
      srcImg.src = img.dataUrl;
    });

    const srcAspect = img.w / img.h;
    let sx = 0;
    let sy = 0;
    let sw = img.w;
    let sh = img.h;

    if (srcAspect > targetAspect) {
      sw = img.h * targetAspect;
      sx = (img.w - sw) / 2;
    } else if (srcAspect < targetAspect) {
      sh = img.w / targetAspect;
      sy = (img.h - sh) / 2;
    }

    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(sw));
    c.height = Math.max(1, Math.round(sh));
    c.getContext("2d")!.drawImage(srcImg, sx, sy, sw, sh, 0, 0, c.width, c.height);

    return { dataUrl: c.toDataURL("image/jpeg", 0.95), w: c.width, h: c.height };
  } catch {
    return null;
  }
}

/** Draw image covering an area (object-cover, no bars) */
function drawCover(
  pdf: jsPDF, dataUrl: string,
  x: number, y: number, boxW: number, boxH: number,
  natW: number, natH: number
) {
  const scale = Math.max(boxW / natW, boxH / natH);
  const dw = natW * scale;
  const dh = natH * scale;
  const dx = x + (boxW - dw) / 2;
  const dy = y + (boxH - dh) / 2;
  pdf.addImage(dataUrl, "JPEG", dx, dy, dw, dh);
}

/** Draw image contained within an area (object-contain, may have bars) */
function drawContain(
  pdf: jsPDF, dataUrl: string,
  x: number, y: number, boxW: number, boxH: number,
  natW: number, natH: number
) {
  const scale = Math.min(boxW / natW, boxH / natH);
  const dw = natW * scale;
  const dh = natH * scale;
  const dx = x + (boxW - dw) / 2;
  const dy = y + (boxH - dh) / 2;
  pdf.addImage(dataUrl, "JPEG", dx, dy, dw, dh);
}

/** Draw the gold divider line (matches app bottom divider) */
function drawBottomDivider(pdf: jsPDF, centerX: number, y: number) {
  const lineW = 16;
  const dotR = 1;
  const gap = 2;

  // Left line gradient effect (just solid gold in PDF)
  pdf.setDrawColor(...COLORS.dividerLine);
  pdf.setLineWidth(0.4);
  pdf.line(centerX - lineW - gap - dotR, y, centerX - gap - dotR, y);

  // Center dot
  pdf.setFillColor(...COLORS.dividerDot);
  pdf.circle(centerX, y, dotR, "F");

  // Right line
  pdf.line(centerX + gap + dotR, y, centerX + lineW + gap + dotR, y);
}

/** Mask corners of a rect to simulate rounded corners by drawing background over the sharp corners */
function drawCornerMasks(pdf: jsPDF, x: number, y: number, w: number, h: number, r: number, bgImg: { dataUrl: string; w: number; h: number } | null) {
  // Fill corner squares with page background color, then cut out the rounded part
  // Simple approach: draw filled background-color rectangles at each corner, then fill the rounded rect interior
  pdf.setFillColor(...COLORS.pageBg);
  // Top-left corner
  pdf.rect(x, y, r, r, "F");
  // Top-right corner
  pdf.rect(x + w - r, y, r, r, "F");
  // Bottom-left corner
  pdf.rect(x, y + h - r, r, r, "F");
  // Bottom-right corner
  pdf.rect(x + w - r, y + h - r, r, r, "F");

  // Now re-draw the image only in the corner areas as quarter circles
  // Since jsPDF can't clip, we approximate by drawing filled arcs
  pdf.setFillColor(...COLORS.pageBg);
}

/** Decorated page number */
function drawPageNumber(pdf: jsPDF, num: number) {
  const y = PAGE_H - MARGIN_BOTTOM + 10;
  const cx = PAGE_W / 2;

  // Small decorative dashes around number
  pdf.setDrawColor(...COLORS.gold);
  pdf.setLineWidth(0.3);
  pdf.line(cx - 18, y, cx - 8, y);
  pdf.line(cx + 8, y, cx + 18, y);

  // Small diamond
  const dSize = 1.2;
  pdf.setFillColor(...COLORS.gold);
  // Left diamond
  pdf.triangle(cx - 22, y, cx - 22 - dSize, y - dSize, cx - 22 - dSize, y + dSize, "F");
  // Right diamond
  pdf.triangle(cx + 22, y, cx + 22 + dSize, y - dSize, cx + 22 + dSize, y + dSize, "F");

  pdf.setFont("times", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...COLORS.gold);
  pdf.text(`${num}`, cx, y + 0.5, { align: "center" });
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

/** Draw page background image */
function drawPageBackground(pdf: jsPDF, bgImg: { dataUrl: string; w: number; h: number } | null) {
  // Base warm color
  pdf.setFillColor(...COLORS.pageBg);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  if (bgImg) {
    drawCover(pdf, bgImg.dataUrl, 0, 0, PAGE_W, PAGE_H, bgImg.w, bgImg.h);
  }
}

// Using built-in "times" serif font as closest match to app's Playfair Display / Libre Baskerville

// ── Main generator ──

export async function generateBookPdf() {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [PAGE_W, PAGE_H] });

  // Using built-in serif font (times) as closest match to app fonts

  // Pre-load images
  const coverImg = await loadImage(pdfCoverImage);
  const bgImg = await loadImage(pageBackground);
  const imageCache: Record<number, LoadedImage | null> = {};
  const storyImageAspect = 1 / STORY_IMAGE_HEIGHT_RATIO;
  for (const s of stories) {
    if (s.imageUrl) {
      const loaded = await loadImage(s.imageUrl);
      imageCache[s.id] = loaded ? await cropImageToAspect(loaded, storyImageAspect) : null;
    }
  }

  let pageNum = 0;

  // ═══════════════════════════════════════
  // COVER — full bleed, no black bars
  // ═══════════════════════════════════════
  pdf.setFillColor(18, 22, 40);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  if (coverImg) {
    // Full-screen cover — image already contains all text
    drawCover(pdf, coverImg.dataUrl, 0, 0, PAGE_W, PAGE_H, coverImg.w, coverImg.h);
  }

  // ═══════════════════════════════════════
  // TITLE PAGE
  // ═══════════════════════════════════════
  pdf.addPage();
  pageNum++;
  drawPageBackground(pdf, bgImg);

  pdf.setFont("times", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(...COLORS.foreground);
  const tp = pdf.splitTextToSize(BOOK_META.title, PAGE_W - 40);
  pdf.text(tp, PAGE_W / 2, 55, { align: "center" });

  pdf.setFont("times", "italic");
  pdf.setFontSize(14);
  pdf.setTextColor(...COLORS.gold);
  pdf.text(`— ${BOOK_META.subtitle}`, PAGE_W / 2, 55 + tp.length * 9 + 8, { align: "center" });

  pdf.setFont("times", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(100, 100, 100);
  const fs2 = pdf.splitTextToSize(BOOK_META.fullSubtitle, PAGE_W - 50);
  pdf.text(fs2, PAGE_W / 2, 100, { align: "center" });

  pdf.setFontSize(9);
  pdf.text("Written by", PAGE_W / 2, 130, { align: "center" });
  pdf.setFont("times", "italic");
  pdf.setFontSize(12);
  pdf.setTextColor(...COLORS.foreground);
  pdf.text(BOOK_META.authorLong, PAGE_W / 2, 140, { align: "center" });

  drawPageNumber(pdf, pageNum);

  // ═══════════════════════════════════════
  // PRE-CALCULATE STORY PAGE NUMBERS
  // ═══════════════════════════════════════
  // We need to know which page each story starts on for the Contents page.
  // First, figure out how many pages the Contents itself takes, then calculate story pages.

  const contentsStartPage = pageNum + 1;

  // Estimate contents page count by simulating layout
  function estimateContentsPages(): number {
    const m = getMargins("right");
    const contentW = PAGE_W - m.left - m.right;
    const lineH = 5.5;
    const sectionGap = 10;
    const titleAreaH = 30; // "Contents" title + spacing
    const pageBottom = PAGE_H - MARGIN_BOTTOM - 8;
    let y = MARGIN_TOP + titleAreaH;
    let pages = 1;

    for (const section of BOOK_META.sections) {
      y += sectionGap; // section title
      const sectionStories = stories.filter(s => s.section === section.id);
      for (const _story of sectionStories) {
        if (y + lineH > pageBottom) { pages++; y = MARGIN_TOP + 10; }
        y += lineH;
      }
    }
    return pages;
  }

  const contentsPageCount = estimateContentsPages();

  // Now calculate which page each story starts on
  const storyPageNumbers: Record<number, number> = {};
  {
    let simPage = contentsStartPage + contentsPageCount; // first story page
    const tempPdf = new jsPDF({ orientation: "portrait", unit: "mm", format: [PAGE_W, PAGE_H] });
    tempPdf.setFont("times", "normal");

    for (let i = 0; i < stories.length; i++) {
      const story = stories[i];
      storyPageNumbers[story.id] = simPage;

      // Simulate this story's page usage
      const side: "left" | "right" = simPage % 2 === 0 ? "left" : "right";
      const m = getMargins(side);
      const contentW = PAGE_W - m.left - m.right;
      const contentTop = m.top;
      const imgAreaH = contentW * STORY_IMAGE_HEIGHT_RATIO;
      const pageBottom = PAGE_H - MARGIN_BOTTOM - 8;

      // Title
      tempPdf.setFont("times", "bold");
      tempPdf.setFontSize(14);
      const titleLines = tempPdf.splitTextToSize(story.title, contentW);
      const titleH = titleLines.length * 6;
      let cursorY = contentTop + imgAreaH + STORY_TITLE_TOP_GAP + titleH + 6;

      // Body
      const paragraphs = story.text.split("\n").filter(p => p.trim());
      const lineH = 5.6;
      for (const para of paragraphs) {
        const isMiloNote = para.trim().startsWith("Milo's Note:");
        if (isMiloNote) {
          if (cursorY + 10 > pageBottom) { simPage++; cursorY = MARGIN_TOP + 10; }
          cursorY += 4;
          tempPdf.setFont("times", "bold"); tempPdf.setFontSize(9.5);
          const labelW = tempPdf.getTextWidth("Milo's Note: ");
          tempPdf.setFont("times", "italic");
          const noteContent = para.trim().replace("Milo's Note:", "").trim();
          const noteLines = tempPdf.splitTextToSize(noteContent, contentW - labelW);
          cursorY += lineH;
          for (let nl = 1; nl < noteLines.length; nl++) {
            if (cursorY > pageBottom) { simPage++; cursorY = MARGIN_TOP + 10; }
            cursorY += lineH;
          }
          cursorY += 2;
        } else {
          tempPdf.setFont("times", "normal"); tempPdf.setFontSize(9.5);
          const paraLines = tempPdf.splitTextToSize(para, contentW);
          for (const _line of paraLines) {
            if (cursorY > pageBottom) { simPage++; cursorY = MARGIN_TOP + 10; }
            cursorY += lineH;
          }
          cursorY += 3;
        }
      }
      simPage++;
    }
  }

  // ═══════════════════════════════════════
  // CONTENTS PAGE(S)
  // ═══════════════════════════════════════
  {
    const lineH = 5.5;
    const sectionGap = 8;
    let isFirstContentsPage = true;

    function startContentsPage() {
      pdf.addPage();
      pageNum++;
      drawPageBackground(pdf, bgImg);
    }

    startContentsPage();
    const m = getMargins(pageNum % 2 === 0 ? "left" : "right");
    const contentX = m.left;
    const contentW = PAGE_W - m.left - m.right;
    const pageBottom = PAGE_H - MARGIN_BOTTOM - 8;

    // Title
    pdf.setFont("times", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(...COLORS.foreground);
    pdf.text("Contents", PAGE_W / 2, MARGIN_TOP + 18, { align: "center" });

    let cursorY = MARGIN_TOP + 32;

    for (const section of BOOK_META.sections) {
      if (cursorY + sectionGap + lineH > pageBottom) {
        drawPageNumber(pdf, pageNum);
        startContentsPage();
        cursorY = MARGIN_TOP + 10;
      }

      // Section title
      cursorY += sectionGap;
      pdf.setFont("times", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...COLORS.gold);
      pdf.text(section.title, contentX, cursorY);
      cursorY += 6;

      // Stories in section
      const sectionStories = stories.filter(s => s.section === section.id);
      for (const story of sectionStories) {
        if (cursorY + lineH > pageBottom) {
          drawPageNumber(pdf, pageNum);
          startContentsPage();
          cursorY = MARGIN_TOP + 10;
        }

        pdf.setFont("times", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(...COLORS.bodyText);

        const titleText = `${story.id}. ${story.title}`;
        pdf.text(titleText, contentX + 4, cursorY);

        // Page number right-aligned
        const pgNum = storyPageNumbers[story.id] ?? "";
        pdf.setTextColor(...COLORS.muted);
        pdf.text(`${pgNum}`, contentX + contentW, cursorY, { align: "right" });

        // Dotted leader
        const titleW = pdf.getTextWidth(titleText) + 6;
        const numW = pdf.getTextWidth(`${pgNum}`) + 4;
        const dotsStart = contentX + 4 + titleW;
        const dotsEnd = contentX + contentW - numW;
        if (dotsEnd > dotsStart + 5) {
          pdf.setFontSize(7);
          pdf.setTextColor(...COLORS.muted);
          let dx = dotsStart;
          while (dx < dotsEnd) {
            pdf.text(".", dx, cursorY);
            dx += 2.5;
          }
        }

        cursorY += lineH;
      }
    }

    drawPageNumber(pdf, pageNum);
  }

  // ═══════════════════════════════════════
  // STORY PAGES
  // ═══════════════════════════════════════
  for (let i = 0; i < stories.length; i++) {
    pdf.addPage();
    pageNum++;
    const story = stories[i];
    const side: "left" | "right" = pageNum % 2 === 0 ? "left" : "right";
    const m = getMargins(side);

    drawPageBackground(pdf, bgImg);

    const contentX = m.left;
    const contentW = PAGE_W - m.left - m.right;
    const contentTop = m.top;
    const contentBottom = PAGE_H - m.bottom;

    // ── Image: full width of content area, cropped top/bottom with rounded corners ──
    const imgAreaH = contentW * STORY_IMAGE_HEIGHT_RATIO;
    const imgData = imageCache[story.id];

    const cornerR = 5;

    if (imgData) {
      // Draw frame background
      pdf.setFillColor(240, 237, 228);
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, cornerR, cornerR, "F");

      // Draw pre-cropped image exactly inside frame bounds (full width, no bleed)
      pdf.addImage(imgData.dataUrl, "JPEG", contentX, contentTop, contentW, imgAreaH);

      // Mask corners for rounded effect
      const cr = cornerR + 1;
      const corners = [
        [contentX, contentTop],
        [contentX + contentW - cr, contentTop],
        [contentX, contentTop + imgAreaH - cr],
        [contentX + contentW - cr, contentTop + imgAreaH - cr],
      ];
      for (const [cx, cy] of corners) {
        pdf.setFillColor(...COLORS.pageBg);
        pdf.rect(cx, cy, cr, cr, "F");
      }

      // Draw rounded border
      pdf.setDrawColor(220, 215, 205);
      pdf.setLineWidth(0.6);
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, cornerR, cornerR, "S");
    } else {
      pdf.setFillColor(240, 237, 228);
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, cornerR, cornerR, "F");
      pdf.setFont("times", "italic");
      pdf.setFontSize(8);
      pdf.setTextColor(170, 160, 145);
      pdf.text("Illustration", contentX + contentW / 2, contentTop + imgAreaH / 2, { align: "center" });
    }

    // ── Title — more space after image ──
    const titleY = contentTop + imgAreaH + STORY_TITLE_TOP_GAP;
    pdf.setFont("times", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...COLORS.foreground);
    const titleLines = pdf.splitTextToSize(story.title, contentW);
    pdf.text(titleLines, contentX + contentW / 2, titleY, { align: "center" });
    const titleH = titleLines.length * 6;

    // ── Body text with increased line spacing ──
    // Allow text to overflow to additional pages
    const paragraphs = story.text.split("\n").filter(p => p.trim());
    const lineH = 5.2;
    let cursorY = titleY + titleH + 6;
    const pageBottom = contentBottom - 8;

    for (const para of paragraphs) {
      const isMiloNote = para.trim().startsWith("Milo's Note:");
      if (isMiloNote) {
        if (cursorY + 10 > pageBottom) {
          drawPageNumber(pdf, pageNum);
          pdf.addPage(); pageNum++;
          drawPageBackground(pdf, bgImg);
          cursorY = getMargins(pageNum % 2 === 0 ? "left" : "right").top + 10;
        }
        cursorY += 4;
        pdf.setFont("times", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...COLORS.navy);
        const noteLabel = "Milo's Note: ";
        const labelW = pdf.getTextWidth(noteLabel);
        pdf.text(noteLabel, contentX, cursorY);

        const noteContent = para.trim().replace("Milo's Note:", "").trim();
        pdf.setFont("times", "italic");
        pdf.setTextColor(...COLORS.navy);
        const noteLines = pdf.splitTextToSize(noteContent, contentW - labelW);
        if (noteLines.length > 0) {
          pdf.text(noteLines[0], contentX + labelW, cursorY);
          cursorY += lineH;
          for (let nl = 1; nl < noteLines.length; nl++) {
            if (cursorY > pageBottom) {
              drawPageNumber(pdf, pageNum);
              pdf.addPage(); pageNum++;
              drawPageBackground(pdf, bgImg);
              cursorY = getMargins(pageNum % 2 === 0 ? "left" : "right").top + 10;
            }
            pdf.text(noteLines[nl], contentX, cursorY);
            cursorY += lineH;
          }
        }
        cursorY += 2;
      } else {
        pdf.setFont("times", "normal");
        pdf.setFontSize(10.5);
        pdf.setTextColor(...COLORS.bodyText);
        const paraLines = pdf.splitTextToSize(para, contentW);
        for (const line of paraLines) {
          if (cursorY > pageBottom) {
            drawPageNumber(pdf, pageNum);
            pdf.addPage(); pageNum++;
            drawPageBackground(pdf, bgImg);
            cursorY = getMargins(pageNum % 2 === 0 ? "left" : "right").top + 10;
          }
          pdf.text(line, contentX, cursorY);
          cursorY += lineH;
        }
        cursorY += 3;
      }
    }

    // ── Page number ──
    drawPageNumber(pdf, pageNum);
  }

  // ═══════════════════════════════════════
  // BACK COVER
  // ═══════════════════════════════════════
  pdf.addPage();
  pdf.setFillColor(25, 30, 50);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  pdf.setFont("times", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(200, 192, 175);
  const backLines = pdf.splitTextToSize(BOOK_META.backCoverText, PAGE_W - 40);
  pdf.text(backLines, PAGE_W / 2, 50, { align: "center" });

  pdf.setFont("times", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...COLORS.goldLight);
  pdf.text(BOOK_META.author, PAGE_W / 2, PAGE_H - 25, { align: "center" });

  // ── Save ──
  pdf.save("AI-Let-Me-Tell-You-What-Ill-Do-With-Humans.pdf");
}
