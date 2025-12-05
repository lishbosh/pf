import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportSectionAsPdf = async (
  containerId: string,
  filename: string
) => {
  const element = document.getElementById(containerId);
  if (!element) {
    throw new Error("Preview section not found. Please make sure the preview is visible before exporting.");
  }

  try {
    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simple approach - capture the element as-is
    const canvas = await html2canvas(element, {
      scale: 1.5, // Reduced scale for better performance
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });

    // Add image to PDF
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    
    // Save PDF
    pdf.save(filename);
  } catch (error: any) {
    console.error("PDF export error:", error);
    throw new Error("PDF export failed. Please try again or use the Print option instead.");
  }
};