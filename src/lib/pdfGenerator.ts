import jsPDF from "jspdf";
import { stories, BOOK_META } from "@/data/bookData";
import pageBackground from "@/assets/page-background.png";
import pdfCoverImage from "@/assets/pdf-cover.png";

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
  const coverImg = await loadImage(coverImage);
  const bgImg = await loadImage(pageBackground);
  const imageCache: Record<number, { dataUrl: string; w: number; h: number } | null> = {};
  for (const s of stories) {
    if (s.imageUrl) imageCache[s.id] = await loadImage(s.imageUrl);
  }

  let pageNum = 0;

  // ═══════════════════════════════════════
  // COVER — full bleed, no black bars
  // ═══════════════════════════════════════
  pdf.setFillColor(18, 22, 40);
  pdf.rect(0, 0, PAGE_W, PAGE_H, "F");

  if (coverImg) {
    // Full-screen cover using object-cover (no black bars)
    drawCover(pdf, coverImg.dataUrl, 0, 0, PAGE_W, PAGE_H, coverImg.w, coverImg.h);
    // Subtle gradient overlay for text — only at top and bottom
    pdf.setFillColor(10, 12, 25);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.35 }));
    pdf.rect(0, 0, PAGE_W, PAGE_H * 0.25, "F");
    pdf.rect(0, PAGE_H * 0.7, PAGE_W, PAGE_H * 0.3, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  }

  // Title
  pdf.setFont("times", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(...COLORS.coverText);
  const coverTitle = pdf.splitTextToSize(BOOK_META.title, PAGE_W - 30);
  pdf.text(coverTitle, PAGE_W / 2, PAGE_H * 0.35, { align: "center" });

  // Subtitle
  pdf.setFont("times", "italic");
  pdf.setFontSize(13);
  pdf.setTextColor(...COLORS.goldLight);
  pdf.text(`— ${BOOK_META.subtitle}`, PAGE_W / 2, PAGE_H * 0.35 + coverTitle.length * 9 + 6, { align: "center" });

  // Full subtitle
  pdf.setFont("times", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(200, 190, 170);
  const fsLine1 = "Stories from a Future Where";
  const fsLine2 = "Families and AI Grow Together";
  pdf.text(fsLine1, PAGE_W / 2, PAGE_H * 0.58, { align: "center" });
  pdf.text(fsLine2, PAGE_W / 2, PAGE_H * 0.58 + 5, { align: "center" });

  // Author
  pdf.setFont("times", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(...COLORS.goldLight);
  pdf.text(BOOK_META.author, PAGE_W / 2, PAGE_H - 25, { align: "center" });

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

  drawBottomDivider(pdf, PAGE_W / 2, PAGE_H - MARGIN_BOTTOM - 5);
  drawPageNumber(pdf, pageNum);

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

    // ── Image: full width of content area, object-cover ──
    const imgAreaH = (contentBottom - contentTop) * 0.36;
    const imgData = imageCache[story.id];

    if (imgData) {
      // Clip to rounded rect area and draw cover-style
      pdf.saveGraphicsState();
      // Draw border frame
      pdf.setDrawColor(220, 215, 205);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, 2, 2, "S");
      // Fill image covering the full area
      drawCover(pdf, imgData.dataUrl, contentX, contentTop, contentW, imgAreaH, imgData.w, imgData.h);
      // Re-draw border on top
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, 2, 2, "S");
      pdf.restoreGraphicsState();
    } else {
      pdf.setFillColor(240, 237, 228);
      pdf.roundedRect(contentX, contentTop, contentW, imgAreaH, 2, 2, "F");
      pdf.setFont("times", "italic");
      pdf.setFontSize(8);
      pdf.setTextColor(170, 160, 145);
      pdf.text("Illustration", contentX + contentW / 2, contentTop + imgAreaH / 2, { align: "center" });
    }

    // ── Title — more space after image ──
    const titleY = contentTop + imgAreaH + 12; // increased from 8
    pdf.setFont("times", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(...COLORS.foreground);
    const titleLines = pdf.splitTextToSize(story.title, contentW);
    pdf.text(titleLines, contentX + contentW / 2, titleY, { align: "center" });
    const titleH = titleLines.length * 6;

    // ── Body text with increased line spacing ──
    const textY = titleY + titleH + 6;
    const paragraphs = story.text.split("\n").filter(p => p.trim());
    const lineH = 5.2; // increased from 4.5 for more sentence spacing
    let cursorY = textY;
    const dividerY = contentBottom - 8; // reserve space for divider

    for (const para of paragraphs) {
      if (cursorY > dividerY - 10) break;

      const isMiloNote = para.trim().startsWith("Milo's Note:");
      if (isMiloNote) {
        cursorY += 4; // more space above Milo's Note
        // "Milo's Note:" in navy blue, bold
        pdf.setFont("times", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...COLORS.navy);
        const noteLabel = "Milo's Note: ";
        const labelW = pdf.getTextWidth(noteLabel);
        pdf.text(noteLabel, contentX, cursorY);

        // Rest of note in italic
        const noteContent = para.trim().replace("Milo's Note:", "").trim();
        pdf.setFont("times", "italic");
        pdf.setTextColor(...COLORS.navy);
        const noteLines = pdf.splitTextToSize(noteContent, contentW - labelW);
        if (noteLines.length > 0) {
          pdf.text(noteLines[0], contentX + labelW, cursorY);
          cursorY += lineH;
          for (let nl = 1; nl < noteLines.length; nl++) {
            if (cursorY > dividerY - 10) break;
            pdf.text(noteLines[nl], contentX, cursorY);
            cursorY += lineH;
          }
        }
        cursorY += 2;
      } else {
        pdf.setFont("times", "normal");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...COLORS.bodyText);
        const paraLines = pdf.splitTextToSize(para, contentW);
        const maxLines = Math.floor((dividerY - 10 - cursorY) / lineH);
        const fitted = paraLines.slice(0, maxLines);
        pdf.text(fitted, contentX, cursorY, { lineHeightFactor: 1.9 });
        cursorY += fitted.length * lineH + 3; // more space between paragraphs
      }
    }

    // ── Bottom divider ──
    drawBottomDivider(pdf, PAGE_W / 2, dividerY);

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
