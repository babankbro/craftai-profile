import type { Metadata } from "next";

import { TeamSection } from "@/components/team/team-section";
import {
  PARTNER_ORGS,
  RESEARCH_TEAMS,
  TOTAL_MEMBERS,
} from "@/lib/research-team";

export const metadata: Metadata = {
  title: "ทีมวิจัย | CARIA Kalasin",
  description:
    "ทีมวิจัยโครงการวิจัยเชิงปฏิบัติการแบบมีส่วนร่วม เพื่อพัฒนาความฉลาดรู้ด้านการอ่านและการคิดอย่างมีวิจารณญาณ จังหวัดกาฬสินธุ์",
};

export default function TeamPage() {
  return (
    <div className="min-h-full" style={{ background: "var(--th-bg-page)" }}>
      {/* Hero */}
      <section
        className="border-b"
        style={{
          background: "var(--th-hero-bg)",
          borderColor: "var(--th-border)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
            style={{
              background: "var(--th-badge-bg)",
              borderColor: "var(--th-badge-border)",
              color: "var(--th-badge-text)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--th-badge-dot)" }}
            />
            CARIA Kalasin
          </span>

          <h1
            className="mt-4 text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: "var(--th-text)" }}
          >
            ทีมวิจัยโครงการ
          </h1>
          <p
            className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--th-text-muted)" }}
          >
            โครงการวิจัยเชิงปฏิบัติการแบบมีส่วนร่วม เพื่อพัฒนาความฉลาดรู้ด้านการอ่านและ
            การคิดอย่างมีวิจารณญาณ สำหรับนักเรียนมัธยมศึกษาตอนต้นของสถานศึกษา
            สังกัดองค์กรปกครองส่วนท้องถิ่น ผ่านการพัฒนาครูและบูรณาการการใช้
            ปัญญาประดิษฐ์ (AI) ในจังหวัดกาฬสินธุ์
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {PARTNER_ORGS.map((org) => (
              <span
                key={org}
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  background: "var(--th-sponsor-bg)",
                  borderColor: "var(--th-sponsor-border)",
                  color: "var(--th-text-muted)",
                }}
              >
                {org}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Stat value={`${TOTAL_MEMBERS}`} label="บุคลากรทั้งหมด" />
            <Stat value={`${RESEARCH_TEAMS.length}`} label="กลุ่มทีมทำงาน" />
            <Stat value={`${PARTNER_ORGS.length}`} label="หน่วยงานร่วมโครงการ" />
          </div>

          <nav className="mt-8 flex flex-wrap gap-2">
            {RESEARCH_TEAMS.map((team) => (
              <a
                key={team.id}
                href={`#${team.id}`}
                className="th-nav-link rounded-lg border px-3 py-1.5 text-[13px] transition-colors"
                style={{
                  borderColor: "var(--th-nav-border)",
                  color: "var(--th-nav-color)",
                }}
              >
                {team.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Teams */}
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-12">
        {RESEARCH_TEAMS.map((team) => (
          <TeamSection key={team.id} team={team} />
        ))}

        <p className="text-xs" style={{ color: "var(--th-text-faint)" }}>
          ข้อมูลและภาพบุคลากรจากเอกสาร “แนะนำบุคลากร ทีม ABC” มหาวิทยาลัยกาฬสินธุ์
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="text-2xl font-bold leading-none"
        style={{ color: "var(--th-text-cyan)" }}
      >
        {value}
      </div>
      <div className="mt-1 text-xs" style={{ color: "var(--th-text-faint)" }}>
        {label}
      </div>
    </div>
  );
}
