import Image from "next/image";

/**
 * แถบโลโก้หน่วยงานร่วมโครงการ
 * ลำดับโลโก้อ้างอิงจากแบนเนอร์บน https://craftai.ksu.ac.th/lms/login
 * ปรับให้เล็กลงและทำโลโก้เป็นโทนสีเดียว (ผ่าน --th-logo-filter)
 * เพื่อให้กลืนไปกับพื้นหลังของธีมแทนการวางบนแถบสีขาว
 */

const PARTNER_LOGOS = [
  { src: "/logos/logo-mhesi.png", alt: "กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม", height: 40 },
  { src: "/logos/logo-sksv.png", alt: "สกสว.", height: 36 },
  { src: "/logos/logo-bpt.png", alt: "บพท.", height: 34 },
  { src: "/logos/logo-saturday-school.png", alt: "Saturday School", height: 38 },
  { src: "/logos/logo-craft-ai.png", alt: "Craft AI", height: 34 },
  { src: "/logos/logo-tdri.png", alt: "TDRI", height: 28 },
  { src: "/logos/logo-kalasin-uni.png", alt: "มหาวิทยาลัยกาฬสินธุ์", height: 38 },
];

export function PartnerBanner() {
  return (
    <div
      className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-7 gap-y-3 rounded-2xl border px-6 py-3 backdrop-blur-sm sm:gap-x-9"
      style={{
        background: "var(--th-logobar-bg)",
        borderColor: "var(--th-logobar-border)",
      }}
    >
      {PARTNER_LOGOS.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={320}
          height={320}
          className="object-contain transition-opacity duration-300 hover:opacity-100"
          style={{
            height: logo.height,
            width: "auto",
            filter: "var(--th-logo-filter)",
            opacity: "var(--th-logo-opacity)",
          }}
        />
      ))}
    </div>
  );
}
