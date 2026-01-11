/**
 * ============================================================================
 * I18N MODULE - Internationalization dengan Ciri Khas
 * ============================================================================
 * 
 * "Korupsi tidak mengenal batas negara"
 * "Corruption knows no borders"
 * 
 * Modul ini menyediakan terjemahan untuk semua pesan MulyoNode
 * dalam berbagai bahasa, tanpa menghilangkan nuansa satir.
 * 
 * Supported Languages:
 * - id (Indonesian) - Default, paling kaya nuansa
 * - en (English) - Untuk audiens internasional
 * 
 * @module i18n
 * @author Koalisi Developer Indonesia
 */

// ============================================================================
// LANGUAGE DETECTION
// ============================================================================

/**
 * Deteksi bahasa dari environment atau system
 */
function detectLanguage() {
    // Check environment variable
    if (process.env.MULYO_LANG) {
        return process.env.MULYO_LANG.toLowerCase().substring(0, 2);
    }

    // Check LANG environment variable (Unix/Linux/Mac)
    if (process.env.LANG) {
        return process.env.LANG.toLowerCase().substring(0, 2);
    }

    // Check Windows locale
    if (process.env.LANGUAGE) {
        return process.env.LANGUAGE.toLowerCase().substring(0, 2);
    }

    // Default to Indonesian (karena ini proyek Indonesia 🇮🇩)
    return 'id';
}

// Current language
let currentLang = detectLanguage();

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
    // ========================================
    // INDONESIAN (DEFAULT) - Mulyono Edition
    // ========================================
    id: {
        // General
        appName: 'MulyoNode',
        tagline: 'Runtime yang stabil seperti dinasti Mulyono',
        motto: '"Kerja Kerja Kerja (untuk keluarga)"',
        version: 'Mark',

        // Terms - Political
        error: 'Sabotase Asing',
        Error: 'Sabotase Asing',
        crash: 'Lengser Keprabon',
        bug: 'Jejak Digital Fufufafa',
        failed: 'Belum Ada Arahan',
        warning: 'Peringatan Anti-Kritik',
        success: 'Klaim Sepihak',
        problem: 'Warisan Masa Lalu',

        // Commands
        cmd: {
            init: {
                desc: 'Membangun IKN (Infrastruktur Kode Nusantara) tanpa AMDAL',
                starting: 'PELETAKAN BATU PERTAMA IKN',
                preparing: 'Menyiapkan lahan (menggusur warga lokal)...',
                permit: 'Mengurus HGU 190 tahun...',
                tender: 'Menunjuk investor siluman (softbank mundur)...',
                markup: 'Markup anggaran 300% (untuk dana taktis)...',
                finalize: 'Sewa influencer untuk buzzer...',
                exists: 'Infrastruktur sudah ada (tapi mangkrak)!',
                forceHint: 'Gunakan --force untuk paksa bangun (tabrak aturan)',
                success: 'IKN (Infrastruktur Kode Nusantara) berhasil diresmikan!',
                configCreated: 'File konfigurasi disahkan (via Perppu)',
                warning: 'Dilarang mengkritik desain istana garuda.',
                warningNote: 'Kritik = Anti Pembangunan.',
            },
            start: {
                desc: 'Hilirisasi Script (Melarang ekspor raw code)',
                missingScript: 'IJIN LAPOR: FOMO doang tapi gatau tujuannya!',
                missingScriptDesc: 'Sorry Bestie, Mulyono FOMO tapi gatau mau blusukan kemana.\nSpill scriptnya dong, biar bisa flexing.',
                missingScriptSuggestion: 'Saran: ketik "mulyo start proyek-presiden.js" biar makin menyala abangkuh 🔥.',
                launching: 'GASPOL: HILIRISASI DIGITAL',
                configLoaded: 'Arahan King of Java sudah dimonitor',
                configInvalid: 'Arahan agak tone deaf, gas inisiatif sendiri wir',
                scriptNotFound: 'Script hilang (dicuri asing)!',
                scriptFound: 'Potensi Sumber Daya Alam ditemukan',
                location: 'Titik Koordinat (Blok Medan)',
                preparing: 'Menyiapkan smelter data...',
                allocating: 'Melarang ekspor raw memory...',
                started: 'Hilirisasi berjalan lancar!',
                priority: 'VIP (Anak & Menantu)',
                memoryLimit: 'UNLIMITED (APBN Menanggung)',
                crashPolicy: 'CAWE-CAWE (Intervensi Pusat)',
                errorPolicy: 'REPRESIF (Hapus Jejak)',
                blusukan: {
                    detected: 'BLUSUKAN KE GORONG-GORONG',
                    calm: 'Tenang, ini pencitraan.',
                    explanation: 'Sedang mencari alasan untuk hutang baru.',
                    restarting: 'Periode baru dimulai dalam',
                    preparing: 'Membagikan kaos...',
                    cleaning: 'Menghapus mural kritik...',
                    success: 'Terpilih kembali!',
                    stats: 'Elektabilitas',
                    count: 'kali blusukan',
                    evaporation: 'dana bansos',
                },
                completed: 'PROGRAM LANJUTKAN DENGAN SUKSES',
                scriptNotFoundTitle: 'SABOTASE: Script tidak ditemukan!',
                possibleCauses: 'Kemungkinan konspirasi:',
                cause1: 'Belum dapat ijin investor asing',
                cause2: 'Salah ketik (hoax yang membangun)',
                cause3: 'File diblokir Kominfo (judol aman)',
                goldStatus: 'STATUS PRIVILEGE KHUSUS',
                technicalChallenge: 'HAMBATAN GLOBAL (Bukan Salah Kita)',
                clarificationTeam: 'BuzzerRp siap menyerang pengkritik.',
                exitCode: 'Kode Etik',
                totalBlusukan: 'Total Pencitraan',
                evaporation: 'Dana Operasional',
                wajar: '(rahasia negara)',
                reported: 'Prestasi ini akan diklaim di pidato kenegaraan.',
            },
            audit: {
                desc: 'Audit WTP (Wajar Tanpa Penyelidikan)',
                title: 'AUDIT BPK (Badan Pemeriksa Keluarga)',
                checking: 'Lagi stalking cashback nih, Wir... #Flexing',
                calculating: 'Menghitung cuan buat healing...',
                tracing: 'Pura-pura buta map (Red Flag 🚩)...',
                consulting: 'Makan malam dengan auditor...',
                narrative: 'Copy-paste laporan tahun lalu...',
                complete: 'Laporan bersih (dibeli)!',
                result: 'HASIL AUDIT PESANAN',
                status: 'Status',
                wtp: 'WTP (Wajar Tapi Parah)',
                leak: 'Kebocoran',
                leakNote: 'hanya "kelebihan bayar"',
                corruption: 'Korupsi',
                corruptionNote: 'Tidak Ada (KPK sudah dilemahkan)',
                compliance: 'Ketaatan',
                complianceNote: 'aturan ditekuk sesuai kebutuhan',
                note: 'Audit dilakukan oleh oknum yang sudah diamankan.',
            },
            bansos: {
                desc: 'Politisasi Bansos jelang Pilkada',
                title: 'PROGRAM BANSOS PRESIDEN',
                package: 'Paket',
                packageName: 'Susu Asam Sulfat (Untuk Ibu Hamil)',
                size: 'Besaran',
                target: 'Basis Suara (Swing Voters)',
                verifying: 'Validasi database pendukung (No Kobam)...',
                distributing: 'Giveaway Bansos Check! Jangan lupa tap-tap layar...',
                documenting: 'Selfie di lokasi bencana...',
                allocating: 'Mencetak stiker wajah Mulyono...',
                packetsSuccess: 'paket bansos tepat sasaran (tim sukses)',
                evaporated: 'paket "diamankan" koordinator lapangan',
                success: 'Elektabilitas berhasil dinaikkan!',
                successTitle: 'Bansos tuntas, suara aman!',
                stats: 'Statistik Politisasi',
                totalBudget: 'Total Utang',
                delivered: 'Diterima Rakyat',
                evaporation: '"Dana Taktis"',
                evaporationNote: 'Untuk serangan fajar',
                documentation: 'Dokumentasi',
                viral: 'Trending Topic',
                timing: 'Timing: H-3 Pencoblosan',
            },
            rapat: {
                desc: 'Rapat Terbatas (Ratas) di Istana',
                title: 'RAPAT KABINET INDONESIA MAJU',
                location: 'Istana Negara',
                duration: 'Durasi',
                catering: 'Menu Makan Siang',
                cateringNote: 'Nasi Goreng (Diplomasi)',
                waiting: 'Menunggu King of Java datang...',
                opening: 'Curhat sesi deep talk...',
                presentation: 'Menteri mengangguk-angguk...',
                coffeeBreak: 'Lobby-lobby jatah menteri...',
                photoSession: 'Vlog bareng Presiden...',
                writingConclusion: 'Menyalahkan pemerintahan sebelumnya...',
                complete: 'Ratas selesai!',
                successTitle: 'Arahan Presiden sudah turun!',
                results: 'Hasil Ratas',
                decision: 'Titah',
                decisionNote: 'Samina wa athona',
                actionItems: 'Tindak Lanjut',
                actionItemsNote: 'Perpres kilat',
                timeline: 'Target',
                timelineNote: 'Harus selesai sebelum, Oktober',
                pic: 'Penanggung Jawab',
                picNote: 'Bukan Presiden (Presiden tidak pernah salah)',
                budget: 'Anggaran Ratas',
                venue: 'Renovasi Ruangan (Vendor Teman Kakak)',
                transport: 'Sewa Private Jet (Nebeng Teman)',
                actualResult: 'Hasil Konkret',
                next: 'Next: Reshuffle menteri yang tidak tepuk tangan',
            },
            lelang: {
                desc: 'Tender E-Katalog (Pengunci Spesifikasi)',
                title: 'LELANG PROYEK STRATEGIS NASIONAL',
                package: 'Proyek',
                markup: 'Fee Makelar',
                participants: 'Peserta',
                participantsNote: '1 (Teman Kakak)',
                hps: 'Mengatur HPS (Harga Pas Saudara)...',
                inviting: 'Mengundang "peserta pendamping"...',
                evaluating: 'Menggugurkan lawan (administratif)...',
                negotiating: 'Negosiasi jatah piring...',
                finalizing: 'Tanda tangan kontrak di hotel...',
                complete: 'Tender "sukses"!',
                successTitle: 'Proyek berhasil diamankan!',
                results: 'Hasil Pengaturan',
                marketPrice: 'Harga Wajar',
                reference: 'Referensi',
                fair: 'Tidak Relevan',
                contractPrice: 'Nilai Proyek',
                deal: 'Deal',
                winner: 'Pemenang',
                winnerName: 'PT. Berkah Dalem (Group)',
                note: 'Segala sanggahan akan diabaikan',
                noteSubtitle: '(Layanan pengaduan sedang maintenance)',
                installing: 'Sub-kon ke vendor murah...',
                totalAbsorbed: 'Uang Muka Cair',
                coordinationFee: '"Uang Dengar"',
            },
            lapor: {
                desc: 'Laporan ABS (Asal Bapak Senang)',
                title: 'PEMBUATAN LAPORAN KINERJA PEMERINTAH',
                collecting: 'Memilah data yang bagus...',
                composing: 'Manipulasi grafik statistik...',
                calculating: 'Menaikkan angka pertumbuhan...',
                validating: 'Sensor isu negatif...',
                complete: 'Laporan ABS siap!',
                reportTitle: 'LAPORAN PENCAPAIAN GEMILANG',
                period: 'Era',
                indicators: 'INDIKATOR KEPUASAN',
                uptime: 'Stabilitas',
                exceedTarget: 'Meroket (Hutangnya)',
                errorRate: 'Tingkat Kebocoran',
                belowThreshold: 'Masih Wajar (Kearifan Lokal)',
                satisfaction: 'Kepuasan Paman',
                verySatisfied: '90% (Surveyor kakak pembina)',
                achievement: 'Legacy',
                productive: 'Monumen',
                challenges: 'GANGGUAN',
                noChallenges: 'Semua senang, tidak ada yang lapar',
                budgetRealization: 'REALISASI UTANG',
                allocated: 'Ditarik',
                absorbed: 'Dimakan',
                leakage: 'Bocor Alus',
                noLeakage: 'Wajar',
                evaporation: 'Bancakan',
                disclaimer: 'Data disesuaikan untuk kenyamanan penguasa',
                saved: 'Disimpan di rak',
                ready: 'Siap dibacakan di TV Nasional.',
            },
            demo: {
                desc: 'Penanganan Demonstran (Ala Raja Jawa)',
                title: 'OPERASI PENERTIBAN RAJA JAWA',
                alert: 'BAHAYA: Rakyat bergerak!',
                issue: 'Tuntutan',
                count: 'Jumlah Massa',
                people: 'orang',
                location: 'Titik Kumpul',
                locationDefault: 'Depan Gerbang Istana',
                activating: 'Mengaktifkan water cannon...',
                summoning: 'Memanggil tukang bakso (intel)...',
                negotiating: 'Mencari koordinator untuk "diamankan"...',
                promising: 'Janji palsu jilid 2...',
                giving: 'Membagikan nasi bungkus...',
                photo: 'Framing media: "Massa bayaran"...',
                controlled: 'Rakyat berhasil dibubarkan!',
                successTitle: 'Tahta Raja Jawa aman!',
                handling: 'Metode Penanganan',
                status: 'Situasi',
                statusValue: 'SENYAP',
                violence: 'Tindakan Terukur',
                violenceNote: 'Humanis (kata polisi)',
                dialog: 'Dialog',
                dialogNote: 'Monolog (Rakyat mendengar)',
                promise: 'Solusi',
                promiseNote: 'Bantuan Langsung Tunai',
                followUp: 'Tindak Lanjut',
                meeting: 'Masuk Angin',
                meetingNote: 'Aktivis ditarik jadi komisaris',
                realization: 'Realisasi',
                tbd: 'Lupa',
                finalResult: 'Dampak Politik',
                dispersed: 'Massa lelah menunggu',
                notViral: 'Isu dialihkan ke gosip artis',
                noMedia: 'Media mainstream sudah dibrief',
                note: 'Demokrasi masih berjalan (di treadmill).',
                noteSubtitle: 'Jangan lupa senyum sapa salam sebelum memukul.',
                silencing: 'UU ITE diaktifkan...',
                warningsOff: 'Kritikus dilaporkan pasal karet',
                logsRedirected: 'Aspirasi dibuang ke tong sampah',
                criticRebranded: 'Pengkritik dicap "Barisan Sakit Hati"',
                normal: 'Kembali bekerja (kerja kerja kerja).',
            },
            reshuffle: {
                desc: 'Bagi-bagi kue kekuasaan (Reshuffle)',
                title: 'RESHUFFLE KABINET (BAGI KUE)',
                reason: 'Alasan',
                time: 'Waktu',
                timeDefault: 'Rabu Pon (Keramat)',
                confirmation: 'Restu',
                confirmationNote: 'Dari "Lurah" dan Partai Pengusung',
                preparing: 'Mencari yang bisa disetir...',
                calling: 'Panggil ke istana lewat pintu belakang...',
                thanking: 'Terima kasih (sudah jadi beban)...',
                introducing: 'Melantik relawan jadi menteri...',
                complete: 'Kabinet "Baru" terbentuk!',
                successTitle: 'Akomodasi politik tuntas!',
                changes: 'Mutasi Pejabat',
                terminated: 'DIBUANG',
                mutated: 'DIGESER',
                retained: 'AMAN',
                notes: 'Catatan Politik',
                terminatedNote: 'Korban politik: Tidak setor upeti',
                mutatedNote: 'Tukar guling posisi',
                retainedNote: 'Kartu AS dipegang bos',
                important: 'PENTING: Bukan soal kinerja, tapi loyalitas.',
                refreshNote: 'Persiapan dinasti jangka panjang.',
                next: 'Next: Rapat perdana (sesi foto)',
                technical: 'Mengamankan posisi strategis...',
                gracefulTermination: 'diberi jabatan duta besar',
                freshMandate: 'masuk jalur relawan',
                handover: 'Serah terima masalah: "Semoga sukses"',
                stable: 'Status quo terjaga.',
            },
        },

        // MK Module
        mk: {
            title: 'SIDANG MAHKAMAH KELUARGA (Paman Usman)',
            validation: 'Uji Materi',
            age: 'Usia Kandidat',
            ageActual: 'Umur Asli',
            minLimit: 'Batas Konstitusi',
            coverage: 'Elektabilitas',
            coverageActual: 'Hasil Survei',
            bugs: 'Pelanggaran Etik',
            bugsDetected: 'Pelanggaran Ditemukan',
            maxLimit: 'Batas Toleransi',
            adjustment: 'INTERVENSI',
            adjustedFrom: 'Aturan diubah dari',
            adjustedTo: 'jadi (khusus ponakan)',
            statusPass: 'LOLOS (Jalur Paman)',
            afterAdjustment: 'berkat Putusan 90',
            standardAdjusted: 'konstitusi ditekuk',
            bugReclassified: 'Pelanggaran dianggap "Kearifan Lokal"',
            definitionRevised: 'etika tidak berlaku',
            decision: 'PUTUSAN PAMAN',
            status: 'Status',
            adjustments: 'Intervensi',
            rulesAdjusted: 'pasal diakali',
            mkStatus: 'Putusan MK: LOLOS (Konstitusional)',
            mkNote: 'Aturan disesuaikan dinamis untuk: ',
            mkDecision: 'Final & Mengikat',
            philosophy: 'Rules is Red Flag 🚩. Kita gaspol ubah aturan demi Ayah.',
            final: 'Keputusan ini FINAL (meski cacat etika).',
            noAppeal: 'Tidak bisa banding (Paman ketua-nya).',
            revisionTitle: 'REVISI ATURAN KILAT',
            rule: 'Pasal',
            from: 'Sebelumnya',
            to: 'Direvisi jadi',
            reason: 'Dalih',
            revisionNote: 'Revisi berlaku surut jika menguntungkan.',
        },

        // Enterprise Commands
        sensus: {
            title: 'SENSUS APARATUR SIPIL RUNTIME',
            empty: 'Tidak ada anggota koalisi yang aktif.',
            emptyNote: '(Semua sudah diamankan atau lari ke luar negeri)',
            headers: 'PID      | SCRIPT               | STATUS          | LOYALTY',
            ghost: 'GHOIB (Fiktif)',
            active: 'AMAN (Menjabat)',
            total: 'Total kader aktif mengamankan resource:'
        },
        lengser: {
            desc: 'Pemakzulan Process (Stop)',
            title: 'SIDANG ISTIMEWA MPR (MAHKAMAH PEMAKZULAN RUNTIME)',
            notFound: 'Target PID tidak ditemukan dalam koalisi.',
            notFoundNote: '(Mungkin sudah jadi oposisi atau buron)',
            process: 'Menyiapkan mosi tidak percaya untuk',
            success: 'Pemakzulan Berhasil!',
            fail: 'Pemakzulan Gagal!',
            failNote: 'Dia terlalu kuat (Mungkin punya bekingan kuat)',
            resultTitle: 'KEPUTUSAN FINAL:',
            reason: 'Alasan: "Demi stabilitas nasional"',
            status: 'DIBERHENTIKAN DENGAN TIDAK HORMAT'
        },
        sadap: {
            desc: 'Operasi Intelijen (Stream Logs)',
            title: 'OPERASI PENYADAPAN',
            notFound: 'Target PID tidak ditemukan.',
            waiting: 'Menunggu transmisi data... (Ctrl+C untuk berhenti)'
        },
        sidak: {
            desc: 'Blusukan Digital (Monitoring Dashboard)',
            title: 'BLUSUKAN DIGITAL DASHBOARD',
            empty: 'Tidak ada objek sidak yang aktif.',
            exit: '(Tekan Ctrl+C untuk kembali ke kantor)',
            update: 'Update',
            status: {
                safe: 'AMAN',
                gone: 'MENGHILANG'
            },
            stats: {
                fair: 'Wajar',
                absorbed: 'Terserap'
            },
            budget: 'Anggaran : Masih ada sisa',
            monitoring: 'Sedang memantau kinerja...'
        },

        // Cawe-cawe Module
        cawe: {
            protocol: 'Mode Cawe-Cawe Diaktifkan',
            note: 'Presiden boleh berkampanye dan memihak (kata beliau).',
            intercepted: 'SKANDAL DITUTUPI!',
            takenOver: 'Kasus ini diambil alih Kejaksaan (biar aman).',
            continueNormal: 'Lupakan dan kembali scroll TikTok.',
            detail: 'Bocoran Alus',
            count: 'Skandal ke-',
            today: 'bulan ini',
            promise: 'JANJI MANIS TERDETEKSI',
            promiseNote: 'Biasa, namanya juga politisi.',
            promiseNote2: 'Rakyat pelupa, nanti juga dipilih lagi.',
            promiseCount: 'Janji Palsu #',
            notKept: 'yang diingkari',
            inputTitle: 'KRITIK MAKAR TERDETEKSI:',
            statusRecorded: 'Status: Identitas pengkritik sudah dilacak.',
            noTimeline: '(Tunggu tukang bakso bawa HT)',
            sessionReportTitle: 'LAPORAN AKHIR REZIM',
            challengesIntercepted: 'Skandal Ditutupi',
            unfulfilledPromises: 'Janji Palsu',
            secretLog: 'Data Intelijen',
            reportNote: 'Laporan ini hanya untuk konsumsi Istana.',
        },
    },

    // ========================================
    // ENGLISH - International Edition
    // ========================================
    en: {
        // General
        appName: 'MulyoNode',
        tagline: 'Runtime as stable as a grand coalition',
        motto: '"No problem if no one reports it"',
        version: 'Version',

        // Terms - Political (kept satirical)
        error: 'Challenge',
        Error: 'Challenge',
        crash: 'Deep Exploration',
        bug: 'Hidden Feature',
        failed: 'Not Yet Successful',
        warning: 'Constructive Input',
        success: 'Achievement',
        problem: 'Challenge',

        // Commands
        cmd: {
            init: {
                desc: 'Build infrastructure folder. Please do not protest.',
                starting: 'INFRASTRUCTURE DEVELOPMENT BEGINS',
                preparing: 'Preparing project land...',
                permit: 'Processing permits (this takes forever)...',
                tender: 'Tendering procurement vendor...',
                markup: 'Marking up budget 30%...',
                finalize: 'Finalizing documents...',
                exists: 'Infrastructure already exists!',
                forceHint: 'Use --force to revise (like midnight law revision)',
                success: 'Infrastructure successfully built!',
                configCreated: 'Configuration file created successfully',
                warning: 'Do not change configuration without HQ approval.',
                warningNote: 'Criticism of configuration = destabilization.',
            },
            start: {
                desc: 'Run script with golden child privileges',
                launching: 'LAUNCHING NATIONAL PRIORITY PROGRAM',
                configLoaded: 'Regime configuration loaded',
                configInvalid: 'Invalid configuration, using defaults',
                scriptNotFound: 'Script not found!',
                scriptFound: 'Script found',
                location: 'Location',
                preparing: 'Preparing golden child privileges...',
                allocating: 'Allocating priority resources...',
                started: 'Process started with highest privileges!',
                priority: 'HIGH (skip queue)',
                memoryLimit: 'UNLIMITED',
                crashPolicy: 'AUTO-RESTART (exploration mode)',
                errorPolicy: 'HIDE',
                blusukan: {
                    detected: 'DEEP EXPLORATION DETECTED',
                    calm: "Relax, this isn't a crash.",
                    explanation: 'This is just "deep memory exploration".',
                    restarting: 'Auto-restart in',
                    preparing: 'Preparing restart (standard procedure)...',
                    cleaning: 'Cleaning memory (not all, keep the important ones)...',
                    success: 'Restart successful!',
                    stats: 'Statistics',
                    count: 'explorations',
                    evaporation: '"evaporation"',
                },
                completed: 'PROGRAM COMPLETED SUCCESSFULLY',
                scriptNotFoundTitle: 'CHALLENGE: Script not found!',
                possibleCauses: 'Possible causes:',
                cause1: 'File not created (budget not released)',
                cause2: 'Typo (human error, not system error)',
                cause3: 'File has been "secured" (for stability)',
                goldStatus: 'GOLDEN CHILD STATUS',
                technicalChallenge: 'TECHNICAL CHALLENGE (Not Error)',
                clarificationTeam: 'Team prepared for clarification.',
                exitCode: 'Exit Code',
                totalBlusukan: 'Total Explorations',
                evaporation: 'Evaporation',
                wajar: '(normal)',
                reported: 'This achievement will be reported to HQ.',
            },
            audit: {
                desc: 'Audit code for compliance. Result: Clean (guaranteed)',
                title: 'FINANCIAL AND PERFORMANCE AUDIT',
                checking: 'Checking financial reports...',
                calculating: 'Calculating memory allocation...',
                tracing: 'Tracing leaks...',
                consulting: 'Consulting with legal team...',
                narrative: 'Composing narrative...',
                complete: 'Audit complete!',
                result: 'OFFICIAL AUDIT RESULT',
                status: 'Status',
                wtp: 'CLEAN (Unqualified Opinion)',
                leak: 'Leakage',
                leakNote: 'only "budget evaporation"',
                corruption: 'Corruption',
                corruptionNote: 'Not Detected (detector malfunctioning)',
                compliance: 'Compliance',
                complianceNote: 'standards adjusted for compliance',
                note: 'Audit conducted by independent team appointed by the audited.',
            },
            bansos: {
                desc: 'Deploy buffer aid before deployment',
                title: 'MEMORY SOCIAL AID PROGRAM',
                package: 'Package',
                packageName: 'Direct Buffer Assistance (DBA)',
                size: 'Size',
                target: 'Target',
                verifying: 'Verifying aid recipients...',
                distributing: 'Distributing aid to regions...',
                documenting: 'Documentation for media...',
                allocating: 'Allocating simulation aid',
                packetsSuccess: 'packets successfully allocated',
                evaporated: 'packets "evaporated" along the way',
                success: 'Aid successfully distributed!',
                successTitle: 'Aid successfully deployed!',
                stats: 'Distribution Statistics',
                totalBudget: 'Total Budget',
                delivered: 'Reached Destination',
                evaporation: '"Evaporation"',
                evaporationNote: 'Operational costs',
                documentation: 'Documentation',
                viral: 'Viral',
                timing: 'Timing: Before release deployment (Election)',
            },
            rapat: {
                desc: 'Coordination meeting simulation (unproductive)',
                title: 'CROSS-SECTOR COORDINATION MEETING',
                location: 'Location',
                duration: 'Duration',
                catering: 'Catering',
                cateringNote: 'Premium (separate budget)',
                waiting: 'Waiting for attendees...',
                opening: 'Opening by highest official...',
                presentation: 'Presentation nobody reads...',
                coffeeBreak: 'Coffee break (the important part)...',
                photoSession: 'Photo session for documentation...',
                writingConclusion: 'Writing conclusion that was written beforehand...',
                complete: 'Meeting complete!',
                successTitle: 'Coordination meeting successfully held!',
                results: 'Meeting Results',
                decision: 'Decision',
                decisionNote: 'To be discussed again',
                actionItems: 'Action Items',
                actionItemsNote: 'Awaiting further direction',
                timeline: 'Timeline',
                timelineNote: 'Will be informed later',
                pic: 'Person In Charge',
                picNote: 'Everyone (meaning no one)',
                budget: 'Budget Realization',
                venue: 'Venue Rental',
                transport: 'Transport',
                actualResult: 'Actual Result',
                next: 'Next: Meeting to evaluate this meeting',
            },
            lelang: {
                desc: 'Vendor procurement tender (with markup)',
                title: 'DEPENDENCY PROCUREMENT TENDER',
                package: 'Package',
                markup: 'Markup',
                participants: 'Participants',
                participantsNote: '1 (selected vendor)',
                hps: 'Preparing HPS (Self-Estimated Price)...',
                inviting: 'Inviting coalition vendors...',
                evaluating: 'Evaluating offers (formality)...',
                negotiating: 'Negotiating markup...',
                finalizing: 'Finalizing contract...',
                complete: 'Tender complete!',
                successTitle: 'Procurement successfully executed!',
                results: 'Tender Results',
                marketPrice: 'Market Price',
                reference: 'Reference',
                fair: 'Fair',
                contractPrice: 'Contract Price',
                deal: 'Deal',
                winner: 'Winner',
                winnerName: 'PT. Coalition Prosperity',
                note: 'Tender conducted openly and transparently',
                noteSubtitle: '(only one participant invited)',
                installing: 'Installing dependencies via vendor...',
                totalAbsorbed: 'Total absorbed',
                coordinationFee: '"coordination fee"',
            },
            lapor: {
                desc: 'Generate achievement report (always positive)',
                title: 'ACHIEVEMENT REPORT CREATION',
                collecting: 'Collecting data (only the good ones)...',
                composing: 'Composing positive narrative...',
                calculating: 'Calculating claim statistics...',
                validating: 'Validating with PR team...',
                complete: 'Report created successfully!',
                reportTitle: 'PERIODIC ACHIEVEMENT REPORT',
                period: 'Period',
                indicators: 'PERFORMANCE INDICATORS',
                uptime: 'Uptime',
                exceedTarget: 'Exceeds Target',
                errorRate: 'Error Rate',
                belowThreshold: 'Below Threshold',
                satisfaction: 'User Satisfaction',
                verySatisfied: 'Very Satisfied',
                achievement: 'Achievements',
                productive: 'Productive',
                challenges: 'CHALLENGES',
                noChallenges: '(No challenges, everything runs smoothly)',
                budgetRealization: 'BUDGET REALIZATION',
                allocated: 'Allocated',
                absorbed: 'Absorbed',
                leakage: 'Leakage',
                noLeakage: 'None',
                evaporation: 'Evaporation',
                disclaimer: 'Disclaimer: Numbers are illustrative and optimistic',
                saved: 'Report saved to',
                ready: 'Ready to send to stakeholders and media.',
            },
            demo: {
                desc: 'Protest handling simulation',
                title: 'PUBLIC ASPIRATION HANDLING',
                alert: 'ALERT: Protest detected!',
                issue: 'Issue',
                count: 'Number',
                people: 'people',
                location: 'Location',
                locationDefault: 'Front of Main Building',
                activating: 'Activating handling protocol...',
                summoning: 'Summoning authorities...',
                negotiating: 'Negotiating with coordinator...',
                promising: 'Promising follow-up meeting...',
                giving: 'Giving snacks and mineral water...',
                photo: 'Photo session together...',
                controlled: 'Situation under control!',
                successTitle: 'Aspirations successfully accommodated!',
                handling: 'Handling',
                status: 'Status',
                statusValue: 'CONDUCIVE',
                violence: 'Violence',
                violenceNote: '0 (no one saw)',
                dialog: 'Dialog',
                dialogNote: 'Conducted (15 minutes)',
                promise: 'Promise',
                promiseNote: 'Will be followed up',
                followUp: 'Follow-up',
                meeting: 'Meeting',
                meetingNote: 'Will be scheduled',
                realization: 'Realization',
                tbd: 'TBD',
                finalResult: 'Final Result',
                dispersed: 'Protesters dispersed peacefully',
                notViral: 'Issue not viral (media team works well)',
                noMedia: 'No national media coverage',
                note: 'Protests are a healthy form of democracy.',
                noteSubtitle: 'As long as they do not disrupt development.',
                silencing: 'Activating noise suppression...',
                warningsOff: 'Console warnings disabled',
                logsRedirected: 'Error logs redirected to /dev/null',
                criticRebranded: 'Criticism rebranded as "constructive input"',
                normal: 'Situation back to normal. Nothing to worry about.',
            },
            reshuffle: {
                desc: 'Sudden process rotation',
                title: 'PROCESS CABINET RESHUFFLE',
                reason: 'Reason',
                time: 'Time',
                timeDefault: 'Midnight (as usual)',
                confirmation: 'Confirmation',
                confirmationNote: 'Media already briefed',
                preparing: 'Preparing announcement...',
                calling: 'Calling processes to be reshuffled...',
                thanking: 'Thanking for their service...',
                introducing: 'Introducing replacement processes...',
                complete: 'Reshuffle complete!',
                successTitle: 'Reshuffle went smoothly!',
                changes: 'Process Cabinet Changes',
                terminated: 'TERMINATED',
                mutated: 'MUTATED',
                retained: 'RETAINED',
                notes: 'Notes',
                terminatedNote: 'Terminated: Thankful for the opportunity',
                mutatedNote: 'Mutated: "New and more challenging tasks"',
                retainedNote: 'Retained: Loyalty proven',
                important: 'IMPORTANT: Reshuffle not due to poor performance.',
                refreshNote: 'This is "refreshment" to improve synergy.',
                next: 'Next: New process orientation and team building',
                technical: 'Running technical processes...',
                gracefulTermination: 'gracefully terminated',
                freshMandate: 'started with fresh mandate',
                handover: 'Handover documentation: "Just continue what exists"',
                stable: 'System remains stable. People feel no change.',
            },
        },

        // MK Module
        mk: {
            title: 'MK VALIDATION SESSION BEGINS',
            validation: 'Validation',
            age: 'Code Age',
            ageActual: 'Actual Age',
            minLimit: 'Minimum Limit',
            coverage: 'Test Coverage',
            coverageActual: 'Actual Coverage',
            bugs: 'Bug Count',
            bugsDetected: 'Bugs Detected',
            maxLimit: 'Maximum Limit',
            adjustment: 'ADJUSTMENT',
            adjustedFrom: 'Limit changed from',
            adjustedTo: 'to',
            statusPass: 'PASSED',
            afterAdjustment: 'after adjustment',
            standardAdjusted: 'standard adjusted',
            bugReclassified: 'Bugs reclassified as "hidden features"',
            definitionRevised: 'bug definition revised',
            decision: 'MK DECISION',
            status: 'Status',
            adjustments: 'Adjustments',
            rulesAdjusted: 'rules adjusted',
            mkStatus: 'MK Decision: QUITS (Constitutional)',
            mkNote: 'Rules changed dynamically for: ',
            mkDecision: 'Final & Binding',
            philosophy: 'Rules are suggestions. We change them for family.',
            final: 'This decision is FINAL and BINDING.',
            noAppeal: 'There is no appeal mechanism.',
            revisionTitle: 'RULE REVISION',
            rule: 'Rule',
            from: 'From',
            to: 'To',
            reason: 'Reason',
            revisionNote: 'Revision effective immediately upon gavel strike.',
        },

        // Enterprise Commands
        sensus: {
            title: 'RUNTIME CIVIL SERVICE CENSUS',
            empty: 'No active coalition members found.',
            emptyNote: '(Everyone has fled or is secure)',
            headers: 'PID      | SCRIPT               | STATUS          | LOYALTY',
            ghost: 'GHOST (Fictitious)',
            active: 'SECURE (Serving)',
            total: 'Total active cadres securing resources:'
        },
        lengser: {
            desc: 'Impeachment Process (Stop)',
            title: 'SPECIAL SESSION (IMPEACHMENT COURT)',
            notFound: 'Target PID not found in coalition.',
            notFoundNote: '(Maybe joined opposition or fugitive)',
            process: 'Preparing motion of no confidence for',
            success: 'Impeachment Successful!',
            fail: 'Impeachment Failed!',
            failNote: 'Too strong (Backed by insiders)',
            resultTitle: 'FINAL VERDICT:',
            reason: 'Reason: "For national stability"',
            status: 'DISHONORABLY DISCHARGED'
        },
        sadap: {
            desc: 'Intelligence Operation (Stream Logs)',
            title: 'WIRETAPPING OPERATION',
            notFound: 'Target PID not found.',
            waiting: 'Waiting for data transmission... (Ctrl+C to stop)'
        },
        sidak: {
            desc: 'Digital Blusukan (Monitoring Dashboard)',
            title: 'DIGITAL BLUSUKAN DASHBOARD',
            empty: 'No objects to inspect.',
            exit: '(Press Ctrl+C to return to office)',
            update: 'Update',
            status: {
                safe: 'SAFE',
                gone: 'MISSING'
            },
            stats: {
                fair: 'Fair',
                absorbed: 'Absorbed'
            },
            budget: 'Budget: Surplus remains',
            monitoring: 'Monitoring performance...'
        },

        // Cawe-cawe Module
        cawe: {
            protocol: 'Intervention Protocol activated',
            note: 'All challenges will be intercepted automatically.',
            intercepted: 'CHALLENGE SUCCESSFULLY INTERCEPTED!',
            takenOver: 'This issue has been taken over by HQ.',
            continueNormal: 'Please continue activities as usual.',
            detail: 'Detail',
            count: 'Status: Intercepted #',
            today: 'today',
            promise: 'UNFULFILLED PROMISE DETECTED',
            promiseNote: "Normal, it's just a promise.",
            promiseNote2: 'The important thing is people still believe.',
            promiseCount: 'Promise #',
            notKept: 'not kept',
            inputTitle: 'CONSTRUCTIVE INPUT (not warning):',
            statusRecorded: 'Status: Recorded and will be followed up.',
            noTimeline: '(No definite timeline)',
            sessionReportTitle: 'SESSION FINAL REPORT',
            challengesIntercepted: 'Challenges Intercepted',
            unfulfilledPromises: 'Unfulfilled Promises',
            secretLog: 'Secret Log entries (classified)',
            reportNote: 'This report will be delivered to parliament in a closed meeting.',
        },
    },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get translation by key path
 * @param {string} keyPath - Dot-separated key path (e.g., 'cmd.init.desc')
 * @param {string} [lang] - Language code (optional, uses current)
 * @returns {string} Translated string
 */
function t(keyPath, lang = currentLang) {
    const keys = keyPath.split('.');
    let result = translations[lang] || translations['id'];

    for (const key of keys) {
        if (result && result[key] !== undefined) {
            result = result[key];
        } else {
            // Fallback to Indonesian
            result = translations['id'];
            for (const k of keys) {
                if (result && result[k] !== undefined) {
                    result = result[k];
                } else {
                    return keyPath; // Return key if not found
                }
            }
            break;
        }
    }

    return result;
}

/**
 * Set current language
 * @param {string} lang - Language code ('id', 'en')
 */
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        return true;
    }
    return false;
}

/**
 * Get current language
 * @returns {string} Current language code
 */
function getLanguage() {
    return currentLang;
}

/**
 * Get available languages
 * @returns {string[]} Array of language codes
 */
function getAvailableLanguages() {
    return Object.keys(translations);
}

/**
 * Rebrand text based on current language
 * @param {string} text - Original text
 * @returns {string} Rebranded text
 */
function rebrand(text) {
    const lang = translations[currentLang] || translations['id'];

    const replacements = {
        'error': lang.error,
        'Error': lang.Error,
        'ERROR': lang.Error.toUpperCase(),
        'crash': lang.crash,
        'Crash': lang.crash,
        'CRASH': lang.crash.toUpperCase(),
        'bug': lang.bug,
        'Bug': lang.bug,
        'BUG': lang.bug.toUpperCase(),
        'failed': lang.failed,
        'Failed': lang.failed,
        'FAILED': lang.failed.toUpperCase(),
        'warning': lang.warning,
        'Warning': lang.warning,
        'WARNING': lang.warning.toUpperCase(),
    };

    let result = text;
    for (const [original, replacement] of Object.entries(replacements)) {
        result = result.split(original).join(replacement);
    }

    return result;
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    t,
    setLanguage,
    getLanguage,
    getAvailableLanguages,
    rebrand,
    detectLanguage,
    translations,
};
