import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared Preview",
  description: "Shared portfolio or resume preview",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function ShareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}