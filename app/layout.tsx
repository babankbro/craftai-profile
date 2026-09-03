import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const notoSansThai = localFont({
  src: "./fonts/NotoSansThai.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  title: "ทีมวิจัย | CARIA Kalasin",
  description:
    "ทีมวิจัยโครงการวิจัยเชิงปฏิบัติการแบบมีส่วนร่วม เพื่อพัฒนาความฉลาดรู้ด้านการอ่านและการคิดอย่างมีวิจารณญาณ จังหวัดกาฬสินธุ์",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" data-theme="dark" className={`${notoSansThai.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
