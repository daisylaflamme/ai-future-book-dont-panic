import jsPDF from "jspdf";
import { stories, BOOK_META } from "@/data/bookData";

export async function generateBookPdf() {
  // Landscape A4-ish for spread format
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [297, 210],
  });

  const pageWidth = 297;
  const pageHeight = 210;
  const halfWidth = pageWidth / 2;
  const margin = 12;

  // --- COVER PAGE ---
  pdf.setFillColor(25, 30, 50);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(230, 220, 200);
  const titleLines = pdf.splitTextToSize(BOOK_META.title, pageWidth - 80);
  pdf.text(titleLines, pageWidth / 2, 70, { align: "center" });

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(16);
  pdf.setTextColor(200, 170, 100);
  pdf.text(`— ${BOOK_META.subtitle}`, pageWidth / 2, 95, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(190, 180, 160);
  const subtitleLines = pdf.splitTextToSize(BOOK_META.fullSubtitle, 200);
  pdf.text(subtitleLines, pageWidth / 2, 115, { align: "center" });

  pdf.setFontSize(10);
  pdf.setTextColor(200, 170, 100);
  pdf.text(BOOK_META.author, pageWidth / 2, 145, { align: "center" });

  // --- TITLE PAGE ---
  pdf.addPage();
  pdf.setFillColor(248, 245, 240);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(30, 35, 50);
  const titleLines2 = pdf.splitTextToSize(BOOK_META.title, 200);
  pdf.text(titleLines2, pageWidth / 2, 65, { align: "center" });

  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(14);
  pdf.setTextColor(180, 140, 70);
  pdf.text(`— ${BOOK_META.subtitle}`, pageWidth / 2, 90, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(BOOK_META.fullSubtitle, pageWidth / 2, 110, { align: "center" });

  pdf.setFontSize(9);
  pdf.text("Written by", pageWidth / 2, 135, { align: "center" });
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(11);
  pdf.setTextColor(30, 35, 50);
  pdf.text(BOOK_META.authorLong, pageWidth / 2, 145, { align: "center" });

  // --- STORY SPREADS ---
  for (let i = 0; i < stories.length; i += 2) {
    pdf.addPage();
    pdf.setFillColor(248, 245, 240);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Spine line
    pdf.setDrawColor(200, 190, 175);
    pdf.setLineWidth(0.3);
    pdf.line(halfWidth, 5, halfWidth, pageHeight - 5);

    // Left page
    const left = stories[i];
    renderStoryOnPage(pdf, left, margin, margin, halfWidth - margin * 2, pageHeight - margin * 2, i + 1);

    // Right page
    if (i + 1 < stories.length) {
      const right = stories[i + 1];
      renderStoryOnPage(pdf, right, halfWidth + margin, margin, halfWidth - margin * 2, pageHeight - margin * 2, i + 2);
    }
  }

  // --- BACK COVER ---
  pdf.addPage();
  pdf.setFillColor(30, 35, 55);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(195, 185, 170);
  const backLines = pdf.splitTextToSize(BOOK_META.backCoverText, 180);
  pdf.text(backLines, pageWidth / 2, 40, { align: "center" });

  pdf.setFontSize(8);
  pdf.setTextColor(200, 170, 100);
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
  const imgHeight = height * 0.5;

  // Image placeholder or actual image
  if (story.imageUrl) {
    try {
      pdf.addImage(story.imageUrl, "JPEG", x, y, width, imgHeight);
    } catch {
      // Fallback placeholder
      pdf.setFillColor(235, 230, 220);
      pdf.roundedRect(x, y, width, imgHeight, 2, 2, "F");
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(8);
      pdf.setTextColor(160, 150, 135);
      pdf.text("Illustration", x + width / 2, y + imgHeight / 2, { align: "center" });
    }
  } else {
    pdf.setFillColor(235, 230, 220);
    pdf.roundedRect(x, y, width, imgHeight, 2, 2, "F");
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8);
    pdf.setTextColor(160, 150, 135);
    pdf.text("Illustration", x + width / 2, y + imgHeight / 2, { align: "center" });
  }

  // Title
  const textY = y + imgHeight + 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(30, 35, 50);
  pdf.text(story.title, x, textY);

  // Story text
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(50, 50, 55);
  const textLines = pdf.splitTextToSize(story.text, width);
  pdf.text(textLines, x, textY + 7);

  // Page number
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.setTextColor(150, 145, 135);
  pdf.text(String(pageNum), x + width / 2, y + height - 2, { align: "center" });
}
