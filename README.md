# craftai-profile

หน้าโปรไฟล์ทีมวิจัยโครงการ **CARIA Kalasin** — 33 คน แบ่งเป็น ทีม A / ทีม B / ทีม C / ผู้ช่วยนักวิจัย

- ธีม: คัดลอก design token จริงจาก https://craftai.ksu.ac.th (ตัวแปร `--th-*` ครบชุด ทั้งโหมดสว่างและมืด)
- สไตล์โค้ด: ตาม [babankbro/lms-craft-ai](https://github.com/babankbro/lms-craft-ai) — Next.js 15 App Router, server component, Tailwind utility-first, ข้อความ UI ภาษาไทย

## รันเอง / deploy

repo นี้เป็น Next.js 15 app ที่สมบูรณ์ในตัว (build ผ่าน `/team` เป็น static prerender)

```bash
npm install
npm run dev        # http://localhost:3000  → redirect ไป /team
npm run build      # ตรวจก่อน deploy
```

deploy ขึ้น Vercel: `vercel` (preview) หรือ `vercel --prod`

## โครงสร้าง

```
app/layout.tsx                 root layout + ฟอนต์ Noto Sans Thai (เฉพาะตอนรัน standalone)
app/page.tsx                   redirect ไป /team (เฉพาะตอนรัน standalone)
app/globals.css                tailwind directives + design token (เฉพาะตอนรัน standalone)
app/team/page.tsx              หน้าเพจ /team (server component + Metadata)
app/globals.team-theme.css     design token — วางต่อท้าย app/globals.css ของโปรเจกต์ปลายทาง
components/team/               member-card.tsx, team-section.tsx
lib/research-team.ts           ข้อมูลทีม 33 คน (typed)
public/team/*.jpg              รูปโปรไฟล์ 33 ไฟล์ (520px) — path ตรงกับ lib/research-team.ts
preview.html                   พรีวิว static (Tailwind CDN) ไม่ต้องรัน Next.js
scripts/extract-profiles.py    สคริปต์ตัดรูปจาก PDF ต้นฉบับ (PyMuPDF)
source/profiles/               รูปต้นฉบับ 300 DPI + index.md / index.csv
```

## นำไปใช้ในโปรเจกต์ Next.js อื่น (เช่น lms-craft-ai)

คัดลอกเฉพาะ 5 อย่างนี้ ไม่ต้องเอา `app/layout.tsx`, `app/page.tsx`, `app/globals.css`,
`package.json` หรือไฟล์ config ไปด้วย เพราะโปรเจกต์ปลายทางมีของตัวเองอยู่แล้ว


```bash
cp lib/research-team.ts        <repo>/lib/
cp -r components/team          <repo>/components/
cp -r app/team                 <repo>/app/
cp -r public/team              <repo>/public/
cat app/globals.team-theme.css >> <repo>/app/globals.css
```

เปิด `/team` ได้ทันที — หน้านี้เป็น static ไม่แตะฐานข้อมูล จึงไม่ต้องใส่ `export const dynamic`

## ธีม

- ค่าเริ่มต้น (`:root`) = โหมดสว่าง
- โหมดมืดผูกกับ `.dark` (next-themes) **และ** `[data-theme="dark"]` (แบบเว็บโครงการ)

## พรีวิว

```bash
python3 -m http.server 8931
```

แล้วเปิด http://localhost:8931/preview.html

## ที่มาของข้อมูล

เอกสาร “แนะนำบุคลากร ทีม ABC” (มหาวิทยาลัยกาฬสินธุ์) หน้า 2–5
ชื่อและตำแหน่งถอดตามคำบรรยายใต้ภาพ รูปตัดจากกรอบรูปในสไลด์ที่ 300 DPI

สร้างรูปใหม่จาก PDF ได้ด้วย:

```bash
python3 scripts/extract-profiles.py "แนะนำบุคลากร ทีม ABC.pdf" source/profiles
```

## หมายเหตุที่ควรตรวจก่อนเผยแพร่

1. `tagline` ของแต่ละทีมใน `lib/research-team.ts` เป็นคำอธิบายที่เขียนขึ้นเอง — เอกสารต้นฉบับไม่ได้ระบุขอบเขตงานของแต่ละทีม
2. สมาชิกทีม B/C บางคน เอกสารระบุเพียงชื่อคณะ จึงใส่ `role: "อาจารย์"` คู่กับ `org: <คณะ>` เพื่อให้การ์ดมีโครงสร้างเดียวกัน
