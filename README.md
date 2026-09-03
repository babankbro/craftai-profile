# craftai-profile

หน้าโปรไฟล์ทีมวิจัย CARIA Kalasin — Next.js 15 / React 19

แอปนี้ deploy แยกผ่าน Coolify (Nixpacks) ที่ **https://craftai.ksu.ac.th/team**
ใช้โดเมนร่วมกับเว็บหลักและแอปอื่น เช่น `/prompt-banking`

## รันในเครื่อง

```bash
npm ci
npm run dev
```

เปิด http://localhost:3000 ในโหมด dev ได้โดยตรง ส่วน production ใช้ `/team`

```bash
npm run build
npm run typecheck
npm run start
```

## ตั้งค่า Coolify

สร้าง Application จาก Git repository นี้ แล้วตั้งค่าดังนี้:

| ช่อง | ค่า |
| --- | --- |
| Build Pack | Nixpacks |
| Is it a static site? | ปิด |
| Domains | `https://craftai.ksu.ac.th/team` |
| Base Directory | `/` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Start Command | `npm run start` |
| Ports Exposes | `3000` |
| Advanced → Strip Prefixes | **ปิด** |

`nixpacks.toml` กำหนด Node.js 22 และคำสั่ง build/start ไว้แล้ว
หากมีค่า override ใน Coolify ให้ใช้ค่าเดียวกับตาราง
ตั้ง environment variable `PORT=3000` สำหรับ runtime
ไม่ต้องมีฐานข้อมูลหรือ persistent storage

เปิด Healthcheck: HTTP, host `localhost`, port `3000`, path `/team/health`,
method GET, expected status `200` (ตั้ง start period เช่น 30 วินาที)

กด Save แล้ว Deploy แอปต้องได้รับ request พร้อม prefix `/team` เสมอ
ถ้า Coolify รุ่นที่ใช้อยู่ไม่มีตัวเลือก Strip Prefixes ให้ตรวจ Container Labels
และเอา middleware `stripprefix` ของแอปนี้ออกจาก router โดยคง middleware อื่นไว้
อย่าเปลี่ยน routing ของเว็บหลักหรือแอปอื่น

ไม่ต้องตั้ง `assetPrefix` หรือ rewrite `/team` เป็น `/`
เพราะ Next.js จัดการ prefix ผ่าน `basePath` อยู่แล้ว
อย่าใส่เฉพาะ `https://craftai.ksu.ac.th` ใน Domains ของแอปนี้

## ตรวจหลัง deploy

- `/team` แสดงรายชื่อและรูปบุคลากรครบ 33 คน
- `/team/health` ตอบ `200` และ `{"status":"ok"}`
- `/team/logos/logo-craft-ai.png` โหลดโลโก้ได้
- `/team/team/a01.jpg` โหลดรูปต้นฉบับได้ (โฟลเดอร์รูปเดิมชื่อ `team`)
- Network ใน browser: `/team/_next/static/...` และ `/team/_next/image?...` ไม่เป็น 404
- refresh `/team` แล้วยังเปิดได้ และเว็บหลักกับ `/prompt-banking` ยังทำงาน

หากหน้าเปิดได้แต่ CSS หรือภาพหาย ให้ตรวจ Strip Prefixes และ redeploy
หาก healthcheck ได้ 404 ให้ตรวจว่าใช้ `/team/health` แทน `/health`

## โครงสร้างและ path

- `lib/site.ts`: กำหนด `BASE_PATH = "/team"` และ helper สำหรับ public assets
- `next.config.ts`: ใช้ basePath เดียวกัน
- `app/page.tsx`: หน้าแรกภายใต้ basePath (URL `/team`)
- `app/health/route.ts`: endpoint สำหรับ healthcheck
- `components/team/`: ส่วนประกอบหน้าทีม
- `lib/research-team.ts`: ข้อมูลบุคลากร 33 คน
- `public/team/`, `public/logos/`: รูปต้นฉบับและโลโก้
- `app/fonts/`: Noto Sans Thai พร้อม OFL license ใช้ `next/font/local`

ฟอนต์ถูกเก็บใน repository จึงไม่ต้องดาวน์โหลด Google Fonts ระหว่าง build
ถ้าเปลี่ยน path ให้แก้ `BASE_PATH` ใน `lib/site.ts`, Domains และ Healthcheck ใน Coolify
แล้ว build/deploy ใหม่ เพราะ basePath ถูกฝังใน client bundles ตอน build

## พรีวิว HTML และต้นฉบับ

`preview.html` เป็นพรีวิวแยกจาก production Next.js และยังใช้ Tailwind CDN
รันด้วย `python -m http.server 8931` แล้วเปิด http://localhost:8931/preview.html

รูปต้นฉบับอยู่ใน `source/profiles/` สามารถสร้างใหม่จาก PDF ด้วย:

```bash
python scripts/extract-profiles.py "แนะนำบุคลากร ทีม ABC.pdf" source/profiles
```

ข้อมูลมาจากเอกสาร “แนะนำบุคลากร ทีม ABC” มหาวิทยาลัยกาฬสินธุ์ หน้า 2–5
คำอธิบายทีม (`tagline`) เขียนเพิ่มเติม และบางตำแหน่งใช้ “อาจารย์” จากบริบทของคณะ

## เอกสารอ้างอิง

- [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
- [Coolify Next.js / Nixpacks](https://coolify.io/docs/applications/nextjs)
- [Coolify path routing / Strip Prefixes](https://next.coolify.io/docs/core/networking/domains)
- [Noto Sans Thai ต้นฉบับและ license](https://github.com/google/fonts/tree/main/ofl/notosansthai)
