// Data Portofolio Proyek
const projectsData = [
  {
    id: "konveksi-catalog",
    title: "Web Katalog Konveksi (Apparel & Merchandise)",
    category: "completed",
    categoryLabel: "Proyek Selesai / Next.js",
    statusBadge: "SELESAI (LIVE)",
    shortDesc: "Website katalog interaktif produk pakaian dan busana konveksi custom dengan integrasi pemesanan langsung WhatsApp.",
    fullDesc: "Website katalog produk digital untuk memajang varian konveksi busana custom (kaos cotton combed, hoodie fleece, kemeja kerja/PDH, dan seragam komunitas). Dibangun menggunakan Next.js dengan tampilan responsif yang nyaman diakses melalui smartphone maupun laptop. Dilengkapi fitur filter kategori produk, spesifikasi bahan kain, galeri portofolio hasil produksi, dan tombol pemesanan cepat yang langsung menghubungkan pengunjung ke WhatsApp bisnis dengan format teks pemesanan otomatis.",
    image: "assets/images/project-konveksi.svg",
    tags: ["Next.js", "React", "JavaScript", "Tailwind / CSS3", "Responsive Design", "WhatsApp Gateway"],
    liveUrl: "https://ridhwan-apparel.vercel.app",
    githubUrl: "https://github.com/Mr-rido",
    metrics: {
      role: "Frontend Developer",
      tech: "Next.js & React",
      status: "Proyek Nyata (Selesai)"
    },
    features: [
      "Katalog etalase produk konveksi dengan navigasi kategori dinamis",
      "Halaman rincian spesifikasi bahan kain (Cotton Combed, Fleece, Drill, Sablon DTF/Bordir)",
      "Direct Order link otomatis ke WhatsApp dengan format pesan rapi",
      "Tampilan antarmuka mobile-first yang responsif dan ringan diakses"
    ],
    architecture: "Frontend dibangun menggunakan framework Next.js dan React dengan arsitektur komponen modular. Styling responsif modern untuk memastikan akses cepat dari berbagai perangkat."
  },
  {
    id: "student-academic-planner",
    title: "Student Academic & Task Planner",
    category: "in-progress",
    categoryLabel: "Dalam Pengembangan / Next.js",
    statusBadge: "SEDANG DIKERJAKAN",
    shortDesc: "Aplikasi produktivitas mahasiswa untuk mengelola jadwal perkuliahan, deadline tugas, dan catatan materi perkuliahan.",
    fullDesc: "Proyek web aplikasi yang sedang aktif saya kembangkan untuk menjawab kebutuhan manajemen waktu mahasiswa Sistem Informasi. Bertujuan memudahkan pencatatan mata kuliah, ruang kelas, jadwal dosen, checklist deadline tugas perkuliahan, dan ringkasan nilai dengan antarmuka yang bersih, intuitif, dan bebas distraksi.",
    image: "assets/images/project-student-planner.svg",
    tags: ["Next.js", "React", "TypeScript", "Local Storage / DB", "Bootstrap 5"],
    liveUrl: "#",
    githubUrl: "https://github.com/Mr-Rido/PLANNER-TASK",
    metrics: {
      role: "Full-Stack Learner",
      tech: "Next.js & State",
      status: "Tahap Pengembangan"
    },
    features: [
      "Pencatatan jadwal kuliah semester aktif dan pengingat kelas",
      "To-Do checklist deadline tugas perkuliahan dengan indikator prioritas",
      "Penyimpanan data state lokal yang persisten",
      "Dashboard visual progres semester yang mudah dipahami"
    ],
    architecture: "Dibangun dengan Next.js App Router dan React Hook State, dirancang untuk penyimpanan data terstruktur dan kemudahan integrasi database masa depan."
  },
  {
    id: "umkm-pos-storefront",
    title: "UMKM POS & Digital Storefront",
    category: "in-progress",
    categoryLabel: "Rencana Proyek / Konsep",
    statusBadge: "RENCANA MENDATANG",
    shortDesc: "Eksplorasi sistem kasir sederhana dan etalase digital untuk mendukung digitalisasi UMKM lokal.",
    fullDesc: "Rencana proyek berikutnya yang sedang saya susun alur logikanya. Berfokus pada perancangan sistem Point of Sales (POS) berbasis web yang ringan dan ramah pengguna bagi pelaku UMKM. Mencakup pencatatan transaksi kasir, kalkulasi total belanja otomatis, pratinjau struk digital, dan ringkasan penjualan harian.",
    image: "assets/images/project-pos-concept.svg",
    tags: ["Web Development", "JavaScript ES6", "REST API", "UI/UX Figma", "CSS3 Grid"],
    liveUrl: "#",
    githubUrl: "https://github.com/Mr-rido",
    metrics: {
      role: "Concept & UI/UX",
      tech: "Web Technologies",
      status: "Tahap Perancangan"
    },
    features: [
      "Antarmuka kasir cepat dengan pemilihan produk dan keranjang belanja",
      "Kalkulasi subtotal dan kembalian transaksi instan",
      "Pembuatan pratinjau struk transaksi digital",
      "Perancangan alur interaksi yang sederhana dan efisien untuk pedagang"
    ],
    architecture: "Konseptualisasi alur transaksi kasir menggunakan arsitektur antarmuka web modern yang modular dan siap dihubungkan ke backend database."
  }
];
