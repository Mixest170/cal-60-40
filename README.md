# คิดเงินคนละ 60:40

เครื่องคิดเงินโครงการช่วยค่าครองชีพ 60:40 (รัฐ 60% / จ่ายเอง 40%, สิทธิรัฐสูงสุด 200 บาท/วัน)
มี 3 โหมด: คำนวณเดี่ยว · เช็คสิทธิเหลือ · แบ่งจ่ายหลายคน

Stack: Vite + React + Tailwind CSS v4

## รันในเครื่อง (local)
ต้องมี Node.js v18+ (เช็คด้วย `node -v`)

```bash
npm install      # ติดตั้งครั้งแรกครั้งเดียว
npm run dev      # เปิด dev server -> เข้า http://localhost:5173
```

## ขึ้น Vercel (เลือกทางใดทางหนึ่ง)

### ทาง A — ผ่าน GitHub (แนะนำ ง่ายสุด ไม่ต้องใช้ command line)
1. สร้าง repo ใหม่บน GitHub แล้ว push โค้ดนี้ขึ้นไป
2. ไปที่ vercel.com -> สมัคร/ล็อกอินด้วย GitHub
3. กด "Add New… -> Project" -> เลือก repo นี้
4. Vercel จะตรวจเจอว่าเป็น Vite เองอัตโนมัติ (Framework Preset = Vite) ไม่ต้องตั้งอะไร
5. กด "Deploy" -> รอแป๊บนึง ได้ลิงก์เว็บมาเลย
6. หลังจากนี้ทุกครั้งที่ push ขึ้น GitHub มันจะ deploy ใหม่ให้เอง

### ทาง B — ผ่าน Vercel CLI
```bash
npm i -g vercel
vercel          # ครั้งแรกจะถามตั้งค่า กด Enter รับค่า default ได้หมด
vercel --prod   # deploy เวอร์ชัน production
```

## แก้สูตร / ปรับ UI
ทุกอย่างอยู่ในไฟล์เดียว: `src/App.jsx`
ค่าคงที่ของโครงการ (เปอร์เซ็นต์, เพดาน 200) อยู่ด้านบนสุดของไฟล์
