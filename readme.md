# GOLOKA Chatbot System

GOLOKA adalah sistem WhatsApp Blast Service yang dibangun dengan arsitektur modern. Proyek ini terdiri dari dua bagian utama: Admin Panel (Frontend) dan API Service (Backend).

## 🚀 Struktur Proyek

```text
goloka_chatbot/
├── src/
│   ├── goloka.chat.admin/  # Frontend (Next.js)
│   └── goloka.chat.api/    # Backend (Express.js + Clean Architecture/DDD)
└── readme.md               # Dokumentasi Proyek
```

---

## 💻 Frontend (Admin Panel)

Frontend dibangun menggunakan **Next.js**.

- **Lokasi**: `src/goloka.chat.admin`
- **Cara Menjalankan**:
  1. Masuk ke direktori: `cd src/goloka.chat.admin`
  2. Install dependensi: `npm install`
  3. Jalankan server development pada port **3001**:
     ```bash
     npm run dev -- -p 3001
     ```
- **Akses**: Buka `http://localhost:3001` di browser Anda.

---

## ⚙️ Backend (API Service)

Backend dibangun menggunakan **Express.js** dengan menerapkan konsep **Domain-Driven Design (DDD)** dan **Clean Architecture** untuk memastikan kode tetap terorganisir, mudah diuji, dan scalable.

- **Lokasi**: `src/goloka.chat.api`
- **Cara Menjalankan**:
  1. Masuk ke direktori: `cd src/goloka.chat.api`
  2. Install dependensi: `npm install`
  3. Konfigurasi file `.env` (pastikan `DATABASE_URL` sudah benar).
  4. Jalankan server development:
     ```bash
     npm run dev
     ```

### 🗄️ Database & Prisma (Guide)

Backend ini menggunakan **Prisma ORM** dengan database **MySQL**. Berikut adalah panduan pengelolaannya:

#### 1. Persiapan Awal (First Time Setup)
Jika Anda baru pertama kali menjalankan proyek atau baru melakukan clone:
- **Generate Client**: Untuk membuat kode client Prisma berdasarkan schema.
  ```bash
  npm run prisma:generate
  ```
- **Push Schema/Migrate**: Untuk menyelaraskan database dengan schema yang ada.
  ```bash
  npm run prisma:migrate
  ```
  *(Perintah ini akan menjalankan migrasi dan membuat tabel di database Anda).*

#### 2. Jika Ada Perubahan Schema
Jika Anda melakukan perubahan pada file `prisma/schema.prisma` (menambah field, tabel, atau enum):
1. Simpan perubahan pada file `schema.prisma`.
2. Jalankan perintah migrasi:
   ```bash
   npm run prisma:migrate
   ```
3. Masukkan nama migrasi (misal: `add_new_field`). Prisma akan secara otomatis memperbarui database dan meng-generate ulang client.

#### 3. Melihat Data Secara Visual
Anda bisa menggunakan **Prisma Studio** untuk melihat dan mengedit data database melalui browser:
```bash
npm run prisma:studio
```

---

## 🏗️ Konsep DDD (Domain-Driven Design)

Backend ini dipisahkan menjadi beberapa layer utama dalam folder `src/`:
- **Domain**: Berisi aturan bisnis inti, entitas, dan interface repositori (Independent).
- **Application**: Berisi *Use Cases* yang mengkoordinasikan logika bisnis.
- **Infrastructure**: Implementasi teknis seperti akses database (Prisma), integrasi WhatsApp (Baileys), dll.
- **Presentation**: Layer luar yang menangani HTTP request (Controllers & Routes).
