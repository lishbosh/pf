import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportSectionAsPdf = async (
  containerId: string,
  filename: string
) => {
  const element = document.getElementById(containerId);
  if (!element) {
    throw new Error("Preview section not found");
  }

  try {
    // Create a temporary full-width container for better PDF rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '210mm'; // A4 width
    tempContainer.style.minHeight = '297mm';
    tempContainer.style.padding = '20mm';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.boxShadow = 'none';
    
    // Clone the content
    const clonedContent = element.cloneNode(true) as HTMLElement;
    
    // Remove unnecessary styling for PDF
    clonedContent.style.borderRadius = '0';
    clonedContent.style.boxShadow = 'none';
    clonedContent.style.transform = 'none';
    
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    // Wait a bit for styles to apply
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // Calculate image dimensions
    const imgWidth = 210 - 20; // A4 width minus margins
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add image to PDF
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    
    // Save PDF
    pdf.save(filename);
    
    // Clean up
    document.body.removeChild(tempContainer);
  } catch (error) {
    console.error("PDF export error:", error);
    throw new Error("Failed to export PDF. Please try again.");
  }
};