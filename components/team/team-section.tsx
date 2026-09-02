import { MemberCard } from "@/components/team/member-card";
import type { Team } from "@/lib/research-team";

export function TeamSection({ team }: { team: Team }) {
  return (
    <section id={team.id} className="scroll-mt-20 space-y-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold"
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
          {team.label}
        </span>

        <p className="text-sm" style={{ color: "var(--th-text-muted)" }}>
          {team.tagline}
        </p>

        <span
          className="ml-auto text-xs"
          style={{ color: "var(--th-text-faint)" }}
        >
          {team.members.length} คน
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {team.members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
