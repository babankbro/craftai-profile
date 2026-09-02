import Image from "next/image";

import type { Member } from "@/lib/research-team";

export function MemberCard({ member }: { member: Member }) {
  return (
    <article
      className="th-card group flex flex-col overflow-hidden rounded-2xl border p-3 transition-all duration-200 hover:-translate-y-1"
      style={{
        background: "var(--th-card-bg)",
        borderColor: "var(--th-card-border)",
        boxShadow: "var(--th-card-shadow)",
      }}
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--th-border)" }}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-3 space-y-1 px-1 pb-1">
        <h3
          className="text-[15px] font-semibold leading-snug"
          style={{ color: "var(--th-card-title)" }}
        >
          {member.name}
        </h3>
        <p
          className="text-[12.5px] leading-snug"
          style={{ color: "var(--th-card-desc)" }}
        >
          {member.role}
        </p>
        {member.org && (
          <p
            className="text-[12px] leading-snug"
            style={{ color: "var(--th-text-faint)" }}
          >
            {member.org}
          </p>
        )}
      </div>
    </article>
  );
}
