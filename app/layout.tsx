import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";

import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
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
