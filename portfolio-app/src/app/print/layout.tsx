import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Print Preview",
  description: "Print preview for portfolio or resume",
};

export default function PrintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: 'white',
        color: 'black',
        fontFamily: 'Arial, Helvetica, sans-serif'
      }}>
        {children}
        <style jsx global>{`
          @media print {
            body {
              margin: 0;
              padding: 0;
              background: white;
              color: black;
            }
            
            * {
              box-shadow: none !important;
              border-radius: 0 !important;
              text-shadow: none !important;
            }
            
            .print-container {
              width: 100% !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}