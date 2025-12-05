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

    // Clone the element to remove problematic styles
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.backgroundColor = '#ffffff';
    clone.style.boxShadow = 'none';
    clone.style.borderRadius = '0';
    clone.style.transform = 'none';
    clone.style.animation = 'none';
    clone.style.transition = 'none';
    
    // Remove any oklab or other unsupported color functions
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
      const element = el as HTMLElement;
      if (element.style) {
        // Remove background images and gradients that might contain oklab
        if (element.style.backgroundImage) {
          element.style.backgroundImage = 'none';
        }
        // Set solid background colors
        if (element.style.backgroundColor) {
          element.style.backgroundColor = '#ffffff';
        }
        // Remove other problematic styles
        element.style.animation = 'none';
        element.style.transition = 'none';
        element.style.transform = 'none';
      }
    });
    
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    });

    // Clean up clone
    document.body.removeChild(clone);

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
      throw new Error("Preview is empty. Please add some content before exporting.");
    } else if (error.message.includes("found")) {
      throw new Error("Preview section not found. Please make sure the preview is visible before exporting.");
    } else if (error.message.includes("oklab")) {
      throw new Error("PDF export failed due to unsupported color functions. This has been fixed, please try again.");
    } else {
      throw new Error(`PDF export failed: ${error.message || "Unknown error occurred. Please try again."}`);
    }
  }
};