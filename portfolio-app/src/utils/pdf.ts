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
    // Wait for any pending renders
    await new Promise(resolve => setTimeout(resolve, 300));

    // Check if element has content
    if (element.children.length === 0) {
      throw new Error("Preview is empty. Please fill in some content before exporting.");
    }

    // Scroll to top to ensure proper capture
    window.scrollTo(0, 0);
    
    // Force layout recalculation
    element.offsetHeight;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      onclone: (clonedDoc) => {
        // Remove any animations or transitions that might interfere
        const clonedElement = clonedDoc.getElementById(containerId);
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.animation = 'none';
          clonedElement.style.transition = 'none';
        }
      }
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Failed to capture preview content. Please make sure all content is loaded.");
    }

    const imgData = canvas.toDataURL("image/png");
    
    // Create PDF with proper dimensions
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    
    // Save PDF
    pdf.save(filename);
  } catch (error: any) {
    console.error("PDF export error:", error);
    
    // Provide more specific error messages
    if (error.message.includes("capture")) {
      throw new Error("Failed to capture preview content. Please make sure all images are loaded and try again.");
    } else if (error.message.includes("empty")) {
      throw new Error("Preview is empty. Please add some content before exporting to PDF.");
    } else if (error.message.includes("found")) {
      throw new Error("Preview section not found. Please make sure the preview is visible before exporting.");
    } else {
      throw new Error(`PDF export failed: ${error.message || "Unknown error occurred. Please try again."}`);
    }
  }
};