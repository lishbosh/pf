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

    // Ensure the element is visible and has dimensions
    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      throw new Error("Preview content is not visible or has no dimensions. Please make sure the preview is displayed before exporting.");
    }

    // Capture the element with better options
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Check if canvas was created successfully
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Failed to capture preview content. Please try again.");
    }

    // Create PDF with proper dimensions
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
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
    
    // Provide more specific error messages
    if (error.message.includes("dimension")) {
      throw new Error("Preview content is not visible. Please make sure the preview is displayed before exporting.");
    } else if (error.message.includes("capture")) {
      throw new Error("Failed to capture preview content. Please make sure all content is loaded and try again.");
    } else {
      throw new Error(`PDF export failed: ${error.message || "Unknown error occurred. Please try again."}`);
    }
  }
};