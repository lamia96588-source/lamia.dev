import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lamia Akter Sunjida | AI-Driven Full-Stack Developer",
  description: "Lamia Akter Sunjida is an aspiring AI-driven full-stack web developer focused on practical applications, backend engineering, and AI integration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
