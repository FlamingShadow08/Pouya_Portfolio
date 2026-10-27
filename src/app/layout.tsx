import type { Metadata } from 'next';
import './globals.css';
import siteData from '@/data/siteData.json';

export const metadata: Metadata = {
  title: `${siteData.personal.name} | ${siteData.personal.title}`,
  description: siteData.personal.about,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
