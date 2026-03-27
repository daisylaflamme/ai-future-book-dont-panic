import jsPDF from "jspdf";
import { stories, BOOK_META } from "@/data/bookData";

export async function generateBookPdf() {
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [297, 210],
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const halfWidth = pageWidth / 2;
  const margin = 14;

  // --- COVER PAGE ---
  pdf.setFillColor(18, 22, 40);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  // Try to add cover image
  const coverStory = stories[0];
  if (coverStory?.imageUrl) {
    try {
      pdf.addImage(coverStory.imageUrl, "JPEG", 0, 0, pageWidth, pageHeight);
      // Dark overlay for text
      pdf.setFillColor(10, 12, 25);
      pdf.setGState(new (pdf as any).GState({ opacity: 0.65 }));
      pdf.rect(0, 0, pageWidth, pageHeight, "F");
      pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    } catch {
      // fallback solid color
    }
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  pdf.setTextColor(235, 225, 205);
  const titleLines = pdf.splitTextToSize(BOOK_META.title, pageWidth - 80);
  pdf.text(titleLines, pageWidth / 2, 70, { align: "center" });

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(17);
  pdf.setTextColor(210, 175, 100);
  pdf.text(`— ${BOOK_META.subtitle}`, pageWidth / 2, 95, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(195, 185, 165);
  const subtitleLines = pdf.splitTextToSize(BOOK_META.fullSubtitle, 200);
  pdf.text(subtitleLines, pageWidth / 2, 115, { align: "center" });

  pdf.setFontSize(10);
  pdf.setTextColor(210, 175, 100);
  pdf.text(BOOK_META.author, pageWidth / 2, 145, { align: "center" });

  // --- TITLE PAGE ---
  pdf.addPage();
  pdf.setFillColor(248, 245, 238);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(30, 35, 50);
  const titleLines2 = pdf.splitTextToSize(BOOK_META.title, 200);
  pdf.text(titleLines2, pageWidth / 2, 65, { align: "center" });

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(15);
  pdf.setTextColor(180, 140, 70);
  pdf.text(`— ${BOOK_META.subtitle}`, pageWidth / 2, 90, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  const fsLines = pdf.splitTextToSize(BOOK_META.fullSubtitle, 200);
  pdf.text(fsLines, pageWidth / 2, 110, { align: "center" });

  pdf.setFontSize(9);
  pdf.text("Written by", pageWidth / 2, 135, { align: "center" });
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(12);
  pdf.setTextColor(30, 35, 50);
  pdf.text(BOOK_META.authorLong, pageWidth / 2, 145, { align: "center" });

  // --- STORY SPREADS ---
  for (let i = 0; i < stories.length; i += 2) {
    pdf.addPage();
    pdf.setFillColor(248, 245, 238);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Spine line
    pdf.setDrawColor(210, 200, 185);
    pdf.setLineWidth(0.3);
    pdf.line(halfWidth, 5, halfWidth, pageHeight - 5);

    // Left page
    renderStoryOnPage(pdf, stories[i], margin, margin, halfWidth - margin * 2, pageHeight - margin * 2, i + 1);

    // Right page
    if (i + 1 < stories.length) {
      renderStoryOnPage(pdf, stories[i + 1], halfWidth + margin, margin, halfWidth - margin * 2, pageHeight - margin * 2, i + 2);
    }
  }

  // --- BACK COVER ---
  pdf.addPage();
  pdf.setFillColor(25, 30, 50);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(195, 185, 170);
  const backLines = pdf.splitTextToSize(BOOK_META.backCoverText, 180);
  pdf.text(backLines, pageWidth / 2, 40, { align: "center" });

  pdf.setFontSize(8);
  pdf.setTextColor(210, 175, 100);
  pdf.text(BOOK_META.author, pageWidth / 2, pageHeight - 20, { align: "center" });

  pdf.save("AI-Let-Me-Tell-You-What-Ill-Do-With-Humans.pdf");
}

function renderStoryOnPage(
  pdf: jsPDF,
  story: typeof stories[0],
  x: number,
  y: number,
  width: number,
  height: number,
  pageNum: number
) {
  const imgHeight = height * 0.42;

  // Image
  if (story.imageUrl) {
    try {
      pdf.addImage(story.imageUrl, "JPEG", x, y, width, imgHeight);
    } catch {
      renderPlaceholder(pdf, x, y, width, imgHeight);
    }
  } else {
    renderPlaceholder(pdf, x, y, width, imgHeight);
  }

  // Title
  const textY = y + imgHeight + 5;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(30, 35, 50);
  const titleLines = pdf.splitTextToSize(story.title, width);
  pdf.text(titleLines, x, textY);

  // Story text — fitted to remaining space
  const titleH = titleLines.length * 5;
  const storyY = textY + titleH + 2;
  const remainingH = height - imgHeight - titleH - 15;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(50, 50, 55);
  const textLines = pdf.splitTextToSize(story.text, width);
  // Limit lines to fit
  const maxLines = Math.floor(remainingH / 3.2);
  const fittedLines = textLines.slice(0, maxLines);
  pdf.text(fittedLines, x, storyY);

  // Page number
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(160, 155, 145);
  pdf.text(`— ${pageNum} —`, x + width / 2, y + height - 1, { align: "center" });
}

function renderPlaceholder(pdf: jsPDF, x: number, y: number, w: number, h: number) {
  pdf.setFillColor(238, 233, 223);
  pdf.roundedRect(x, y, w, h, 2, 2, "F");
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(8);
  pdf.setTextColor(160, 150, 135);
  pdf.text("Illustration", x + w / 2, y + h / 2, { align: "center" });
}
