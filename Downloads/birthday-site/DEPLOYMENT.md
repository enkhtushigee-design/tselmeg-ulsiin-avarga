# 🎂 Birthday Website - Deployment Guide

## Бэлтгэгдсэн файлууд

```
birthday-site/
├── app/
│   ├── page.tsx          ← Үндсэн хуудас
│   ├── layout.tsx        ← Layout + Fonts
│   └── globals.css       ← Стиль
├── components/
│   ├── HeroSection.tsx   ← "Happy Birthday!" гарчиг
│   ├── StickerGallery.tsx← Зургийн sticker цомог
│   ├── CandleSection.tsx ← Cake + Candle animation
│   └── FloatingElements.tsx ← Хөвж буй emoji-нууд
└── package.json
```

---

## АЛХАМ 1: VS Code дээр нээх

```bash
# Terminal нээгээд энэ командыг ажиллуул:
cd birthday-site
code .
```

---

## АЛХАМ 2: GitHub Repository үүсгэх

### 2a. GitHub.com дээр:
1. **github.com** руу орж нэвтэр
2. Баруун дээд булангийн **"+"** товчийг дар → **"New repository"**
3. Repository нэр: `birthday-site`
4. **Public** эсвэл **Private** сонго
5. **"Create repository"** дар
6. Дараа хуудасны **HTTPS URL**-ийг хуулж авах
   > Жишээ: `https://github.com/таны-нэр/birthday-site.git`

### 2b. VS Code Terminal дээр:
```bash
# Git remote холбох
git remote add origin https://github.com/ТАНЫ-НЭР/birthday-site.git

# Branch нэр өөрчлөх
git branch -M main

# GitHub руу push хийх
git push -u origin main
```

> ⚠️ Анх push хийхэд GitHub нэвтрэх нэр, нууц үг (token) асуух болно

### GitHub Token авах (нэг удаа):
1. GitHub → **Settings** → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. **Generate new token** → `repo` эрх сонго → Generate
4. Token-ийг хадгалж ав! (нэг л удаа харагдана)

---

## АЛХАМ 3: Vercel дээр Deploy хийх

1. **vercel.com** руу орж **GitHub account**-аар нэвтэр
2. **"New Project"** дар
3. **"Import Git Repository"** хэсгээс `birthday-site` сонго
4. Тохиргоо хийх хэрэггүй, бүх зүйл автоматаар тогтоогдоно:
   - Framework: **Next.js** ✓
   - Build: `npm run build` ✓
5. **"Deploy"** товчийг дар
6. ~2 минут хүлээ → **🎉 Live болно!**

Vercel танд ийм URL өгнө:
```
https://birthday-site-таны-нэр.vercel.app
```

---

## АЛХАМ 4: Зургаа нэмэх (optional)

`StickerGallery.tsx` файлд emoji-г бодит зургаар солих:

```tsx
// public/ хавтасд зургаа хий (photo1.jpg, photo2.jpg гэх мэт)
// Дараа нь StickerGallery.tsx дотор:

import Image from "next/image";

// Emoji-н оронд:
<Image src="/photo1.jpg" alt="Memory" fill className="object-cover" />
```

---

## Хурдан тохиргоо

| Зүйл | Хаана засах |
|------|------------|
| Нэрийг өөрчлөх | `HeroSection.tsx` → subtitle текст |
| Өнгө өөрчлөх | `CandleSection.tsx` → gradient colors |
| Зураг нэмэх | `StickerGallery.tsx` → stickers array |
| Мессеж өөрчлөх | `CandleSection.tsx` → wish message |

---

## Асуудал гарвал

```bash
# Dependencies суулгах
npm install

# Local дээр ажиллуулах (localhost:3000)
npm run dev

# Build шалгах
npm run build
```

---

**🌸 Таны найздаа хамгийн гоё birthday site болох болтугай! 🎂**
