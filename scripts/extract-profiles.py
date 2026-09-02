# -*- coding: utf-8 -*-
import fitz, os, re, collections

# ใช้งาน: python3 scripts/extract-profiles.py <ไฟล์ PDF> [โฟลเดอร์ปลายทาง]
import sys
PDF = sys.argv[1] if len(sys.argv) > 1 else 'แนะนำบุคลากร ทีม ABC.pdf'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'source/profiles'
doc=fitz.open(PDF)
TEAM={1:'team_A',2:'team_B',3:'team_C',4:'research_assistants'}

def lines(page, minsize=16.5):
    seen=set(); res=[]
    for bl in page.get_text('dict')['blocks']:
        if bl['type']!=0: continue
        for ln in bl['lines']:
            t=''.join(s['text'] for s in ln['spans']).strip()
            if not t: continue
            sz=max(s['size'] for s in ln['spans'])
            if sz<minsize or sz>40: continue
            key=(t, round(ln['bbox'][0]), round(ln['bbox'][1]/5))
            if key in seen: continue
            seen.add(key)
            res.append({'t':re.sub(r'\s+',' ',t),'b':ln['bbox'],'sz':sz})
    return res

def fixname(n):
    n=n.replace('Ý','่').replace('˛','่').replace('ํา','ำ')
    n=n.replace('​','')
    import re as _re
    return _re.sub(r'\s+',' ',n).strip()

def safe(n):
    n=n.replace('  ',' ').strip()
    return re.sub(r'[^\wก-๙\.\-]+','_',n).strip('_')

manifest=[]
for pno in range(1,5):
    page=doc[pno]
    infos=page.get_image_info(xrefs=True)
    cnt=collections.Counter(i['xref'] for i in infos if i['xref'])
    frame_xref=[x for x,c in cnt.items() if c>=3]
    pw,ph=page.rect.width,page.rect.height
    cards=[i['bbox'] for i in infos if i['xref'] in frame_xref]
    portraits=[i for i in infos if i['xref'] and i['xref'] not in frame_xref
               and (i['bbox'][2]-i['bbox'][0])<pw*0.4 and (i['bbox'][3]-i['bbox'][1])<ph*0.75]
    names=[l for l in lines(page) if l['sz']>17 and l['sz']<40 and 'ทีม' not in l['t']]
    outdir=os.path.join(OUT, TEAM[pno]); os.makedirs(outdir, exist_ok=True)
    used=set()
    for c in sorted(cards, key=lambda b:(round(b[1]/100), b[0])):
        cx=(c[0]+c[2])/2
        # portrait whose center lies in card
        best=None; ba=0
        for p in portraits:
            b=p['bbox']; px=(b[0]+b[2])/2; py=(b[1]+b[3])/2
            if c[0]-15<px<c[2]+15 and c[1]-15<py<c[3]+15:
                a=(b[2]-b[0])*(b[3]-b[1])
                if a>ba: ba=a; best=p
        # name line just below card bottom
        cand=[n for n in names if c[0]-60<(n['b'][0]+n['b'][2])/2<c[2]+60
              and c[3]-35 < n['b'][1] < c[3]+45]
        cand.sort(key=lambda n:n['b'][1])
        nm=fixname(cand[0]['t']) if cand else None
        if best is None:
            ov=0
            for p in portraits:
                b=p['bbox']
                w=min(b[2],c[2])-max(b[0],c[0]); h=min(b[3],c[3])-max(b[1],c[1])
                if w>0 and h>0 and w*h>ov and p['xref'] not in used:
                    ov=w*h; best=p
        if best is None or nm is None:
            manifest.append((pno+1,'UNMATCHED', str(c), nm, best['xref'] if best else None)); continue
        if best['xref'] in used: pass
        used.add(best['xref'])
        fn=safe(nm)+'.png'
        path=os.path.join(outdir,fn)
        i=2
        while os.path.exists(path):
            path=os.path.join(outdir,safe(nm)+f'_{i}.png'); i+=1
        _h=c[3]-c[1]
        clip=fitz.Rect(c[0], c[1], c[2], c[3]-_h*0.085)
        pix=page.get_pixmap(clip=clip, dpi=300)
        pix.save(path)
        pos=[fixname(l['t']) for l in lines(page, 14) if l['sz']<17
             and c[0]-70<(l['b'][0]+l['b'][2])/2<c[2]+70 and c[3]+5 < l['b'][1] < c[3]+75]
        ded=[]
        for x in pos:
            if x not in ded and not any(x in y for y in ded): ded.append(x)
        ded=[x for i,x in enumerate(ded) if not any(x in y for j,y in enumerate(ded) if j!=i)]
        manifest.append((pno+1, TEAM[pno], nm, ' '.join(ded), os.path.basename(path)))
    # report leftovers
    unused=[p for p in portraits if p['xref'] not in used]
    if unused: manifest.append((pno+1,'LEFTOVER_PORTRAITS',[ (p['xref'], [round(v) for v in p['bbox']]) for p in unused],'',''))
import csv,io
rows=[m for m in manifest if m[1] in TEAM.values()]
with open(os.path.join(OUT,'index.csv'),'w',newline='') as f:
    w=csv.writer(f); w.writerow(['page','team','name','position','file'])
    for m in rows: w.writerow(m)
lbl={'team_A':'ทีม A','team_B':'ทีม B','team_C':'ทีม C','research_assistants':'ผู้ช่วยนักวิจัย'}
with open(os.path.join(OUT,'index.md'),'w') as f:
    f.write('# รูปโปรไฟล์ทีมวิจัย (สกัดจาก แนะนำบุคลากร ทีม ABC.pdf)\n\n')
    for t in ['team_A','team_B','team_C','research_assistants']:
        f.write(f'## {lbl[t]} (`{t}/`)\n\n| ชื่อ | ตำแหน่ง/สังกัด | ไฟล์ |\n|---|---|---|\n')
        for m in rows:
            if m[1]==t: f.write(f'| {m[2]} | {m[3]} | `{m[4]}` |\n')
        f.write('\n')
for m in manifest: print(m)
