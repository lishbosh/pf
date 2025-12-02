import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportSectionAsPdf = async (
  containerId: string,
  filename: string
) => {
  const node = document.getElementById(containerId);
  if (!node) {
    throw new Error("Preview section not found");
  }

  const canvas = await html2canvas(node, {
    scale: window.devicePixelRatio || 2,
    backgroundColor: "#ffffff",
  });
  const imageData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
  const width = canvas.width * ratio;
  const height = canvas.height * ratio;
  const x = (pageWidth - width) / 2;
  const y = 24;

  pdf.addImage(imageData, "PNG", x, y, width, height);
  pdf.save(filename);
};

