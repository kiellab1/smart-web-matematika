document.addEventListener("DOMContentLoaded", function () {
    // =========================================================
    // 1. FORMULA GEOMETRI & KONVERSI LOGIKA
    // =========================================================
    function luas_persegi(sisi) {
        return sisi * sisi;
    }

    function luas_persegi_panjang(panjang, lebar) {
        return panjang * lebar;
    }

    function luas_segitiga(alas, tinggi) {
        return 0.5 * alas * tinggi;
    }

    function keliling_persegi(sisi) {
        return 4 * sisi;
    }

    function keliling_persegi_panjang(panjang, lebar) {
        return 2 * (panjang + lebar);
    }

    function keliling_segitiga(sisi1, sisi2, sisi3) {
        return sisi1 + sisi2 + sisi3;
    }

    function kategori_nilai(nilai) {
        if (nilai === null || isNaN(nilai) || nilai === "") {
            return "Masukkan nilai terlebih dahulu.";
        }
        const num = parseFloat(nilai);
        if (num >= 90) return "Sangat Baik";
        if (num >= 75) return "Baik";
        if (num >= 60) return "Cukup";
        return "Perlu Latihan";
    }

    function ubah_data(teks) {
        if (!teks || typeof teks !== 'string') return [];
        const parts = teks.split(",");
        const data = [];
        for (let x of parts) {
            const trimmed = x.trim();
            if (trimmed !== "") {
                const num = parseFloat(trimmed);
                if (!isNaN(num)) {
                    data.push(num);
                }
            }
        }
        return data;
    }

    function analisis_data(teks) {
        const data = ubah_data(teks);
        if (data.length === 0) {
            return "Data tidak valid atau masih kosong.";
        }

        const data_urut = [...data].sort((a, b) => a - b);
        const nilai_maksimum = Math.max(...data);
        const nilai_minimum = Math.min(...data);
        const jumlah_data = data.length;
        const sum = data.reduce((acc, curr) => acc + curr, 0);
        const rata_rata = sum / jumlah_data;

        return `Data asli:
[${data.join(", ")}]

Data setelah diurutkan:
[${data_urut.join(", ")}]

Nilai maksimum:
${nilai_maksimum}

Nilai minimum:
${nilai_minimum}

Jumlah data:
${jumlah_data}

Rata-rata:
${rata_rata.toFixed(2)}`;
    }

    function cari_data(teks, target) {
        const data = ubah_data(teks);
        if (data.length === 0) {
            return "Data tidak valid atau masih kosong.";
        }

        if (target === null || target === "" || isNaN(parseFloat(target))) {
            return "Masukkan nilai yang ingin dicari.";
        }

        const targetNum = parseFloat(target);
        const posisi = [];

        data.forEach((nilai, idx) => {
            if (nilai === targetNum) {
                posisi.push(idx + 1);
            }
        });

        if (posisi.length === 0) {
            return `Nilai ${targetNum} tidak ditemukan dalam data.`;
        }

        if (posisi.length === 1) {
            return `Nilai ${targetNum} ditemukan.\nNilai tersebut terdapat pada data ke-${posisi[0]}.`;
        } else {
            const daftar_posisi = posisi.map(p => `data ke-${p}`).join(", ");
            return `Nilai ${targetNum} ditemukan sebanyak ${posisi.length} kali.\nNilai tersebut terdapat pada ${daftar_posisi}.`;
        }
    }

    function faktorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * faktorial(n - 1);
    }

    function hitung_faktorial(n) {
        if (n === null || n === "" || isNaN(n)) {
            return "Masukkan bilangan.";
        }
        const num = Number(n);
        if (num < 0) {
            return "Bilangan harus 0 atau lebih.";
        }
        if (!Number.isInteger(num)) {
            return "Masukkan bilangan bulat.";
        }
        const hasil = faktorial(num);
        return `${num}! = ${hasil}`;
    }

    // =========================================================
    // 2. NAVIGASI TAB
    // =========================================================
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            const targetId = btn.getAttribute("data-tab");
            document.getElementById(targetId).classList.add("active");
        });
    });

    // =========================================================
    // 3. TAB 1: LUAS & KELILING (INTERAKSI & INPUT DYNAMIS)
    // =========================================================
    const pilihanBangun = document.getElementById("pilihan_bangun");
    const groupInput1 = document.getElementById("group-input1");
    const groupInput2 = document.getElementById("group-input2");
    const groupInput3 = document.getElementById("group-input3");
    const labelInput1 = document.getElementById("label-input1");
    const labelInput2 = document.getElementById("label-input2");
    const labelInput3 = document.getElementById("label-input3");
    const inputAngka1 = document.getElementById("angka1");
    const inputAngka2 = document.getElementById("angka2");
    const inputAngka3 = document.getElementById("angka3");
    const btnHitungGeometri = document.getElementById("btn-hitung-geometri");
    const hasilGeometri = document.getElementById("hasil-geometri");

    function getSelectedJenis() {
        const radios = document.getElementsByName("jenis_perhitungan");
        for (let r of radios) {
            if (r.checked) return r.value;
        }
        return "Hitung Luas";
    }

    function updateFormVisibility() {
        const jenis = getSelectedJenis();
        const bangun = pilihanBangun.value;

        // Default Reset Visibility
        groupInput1.classList.remove("hidden");
        groupInput2.classList.add("hidden");
        groupInput3.classList.add("hidden");

        if (jenis === "Hitung Luas") {
            if (bangun === "Persegi") {
                labelInput1.textContent = "Sisi";
            } else if (bangun === "Persegi Panjang") {
                labelInput1.textContent = "Panjang";
                labelInput2.textContent = "Lebar";
                groupInput2.classList.remove("hidden");
            } else if (bangun === "Segitiga") {
                labelInput1.textContent = "Alas";
                labelInput2.textContent = "Tinggi";
                groupInput2.classList.remove("hidden");
            }
        } else if (jenis === "Hitung Keliling") {
            if (bangun === "Persegi") {
                labelInput1.textContent = "Sisi";
            } else if (bangun === "Persegi Panjang") {
                labelInput1.textContent = "Panjang";
                labelInput2.textContent = "Lebar";
                groupInput2.classList.remove("hidden");
            } else if (bangun === "Segitiga") {
                labelInput1.textContent = "Sisi 1";
                labelInput2.textContent = "Sisi 2";
                labelInput3.textContent = "Sisi 3";
                groupInput2.classList.remove("hidden");
                groupInput3.classList.remove("hidden");
            }
        }
    }

    document.getElementsByName("jenis_perhitungan").forEach(radio => {
        radio.addEventListener("change", updateFormVisibility);
    });
    pilihanBangun.addEventListener("change", updateFormVisibility);

    btnHitungGeometri.addEventListener("click", function () {
        const jenis = getSelectedJenis();
        const bangun = pilihanBangun.value;

        const val1 = inputAngka1.value !== "" ? parseFloat(inputAngka1.value) : null;
        const val2 = inputAngka2.value !== "" ? parseFloat(inputAngka2.value) : null;
        const val3 = inputAngka3.value !== "" ? parseFloat(inputAngka3.value) : null;

        if (!bangun) {
            hasilGeometri.value = "Silakan pilih bangun terlebih dahulu.";
            return;
        }

        if (jenis === "Hitung Luas") {
            if (bangun === "Persegi") {
                if (val1 === null || isNaN(val1)) {
                    hasilGeometri.value = "Masukkan panjang sisi.";
                    return;
                }
                hasilGeometri.value = `Luas persegi = ${luas_persegi(val1)}`;
            } else if (bangun === "Persegi Panjang") {
                if (val1 === null || val2 === null || isNaN(val1) || isNaN(val2)) {
                    hasilGeometri.value = "Masukkan panjang dan lebar.";
                    return;
                }
                hasilGeometri.value = `Luas persegi panjang = ${luas_persegi_panjang(val1, val2)}`;
            } else if (bangun === "Segitiga") {
                if (val1 === null || val2 === null || isNaN(val1) || isNaN(val2)) {
                    hasilGeometri.value = "Masukkan alas dan tinggi.";
                    return;
                }
                hasilGeometri.value = `Luas segitiga = ${luas_segitiga(val1, val2)}`;
            }
        } else if (jenis === "Hitung Keliling") {
            if (bangun === "Persegi") {
                if (val1 === null || isNaN(val1)) {
                    hasilGeometri.value = "Masukkan panjang sisi.";
                    return;
                }
                hasilGeometri.value = `Keliling persegi = ${keliling_persegi(val1)}`;
            } else if (bangun === "Persegi Panjang") {
                if (val1 === null || val2 === null || isNaN(val1) || isNaN(val2)) {
                    hasilGeometri.value = "Masukkan panjang dan lebar.";
                    return;
                }
                hasilGeometri.value = `Keliling persegi panjang = ${keliling_persegi_panjang(val1, val2)}`;
            } else if (bangun === "Segitiga") {
                if (val1 === null || val2 === null || val3 === null || isNaN(val1) || isNaN(val2) || isNaN(val3)) {
                    hasilGeometri.value = "Masukkan sisi 1, sisi 2, dan sisi 3.";
                    return;
                }
                hasilGeometri.value = `Keliling segitiga = ${keliling_segitiga(val1, val2, val3)}`;
            }
        }
    });

    // Initial setup form geometri
    updateFormVisibility();

    // =========================================================
    // 4. TAB 2: KATEGORI NILAI
    // =========================================================
    document.getElementById("btn-cek-kategori").addEventListener("click", function () {
        const val = document.getElementById("input-nilai").value;
        document.getElementById("hasil-kategori").value = kategori_nilai(val);
    });

    // =========================================================
    // 5. TAB 3: ANALISIS NILAI
    // =========================================================
    document.getElementById("btn-analisis").addEventListener("click", function () {
        const teks = document.getElementById("data-input").value;
        document.getElementById("hasil-analisis").value = analisis_data(teks);
    });

    document.getElementById("btn-cari").addEventListener("click", function () {
        const teks = document.getElementById("data-input").value;
        const target = document.getElementById("target-input").value;
        document.getElementById("hasil-pencarian").value = cari_data(teks, target);
    });

    // =========================================================
    // 6. TAB 4: FAKTORIAL
    // =========================================================
    document.getElementById("btn-faktorial").addEventListener("click", function () {
        const val = document.getElementById("angka-faktorial").value;
        document.getElementById("hasil-faktorial").value = hitung_faktorial(val);
    });

    // =========================================================
    // 7. TAB 5: QUIZ (STATE MANAGEMENT)
    // =========================================================
    const quiz_questions = [
        {
            question: "Berapakah luas persegi dengan panjang sisi 5 cm?",
            options: ["20 cm²", "25 cm²", "30 cm²", "35 cm²"],
            answer: "25 cm²"
        },
        {
            question: "Berapakah keliling persegi dengan panjang sisi 6 cm?",
            options: ["12 cm", "18 cm", "24 cm", "36 cm"],
            answer: "24 cm"
        },
        {
            question: "Berapakah luas persegi panjang dengan panjang 10 cm dan lebar 5 cm?",
            options: ["15 cm²", "30 cm²", "50 cm²", "100 cm²"],
            answer: "50 cm²"
        },
        {
            question: "Berapakah luas segitiga dengan alas 10 cm dan tinggi 8 cm?",
            options: ["20 cm²", "40 cm²", "80 cm²", "100 cm²"],
            answer: "40 cm²"
        },
        {
            question: "Berapakah hasil dari 5! (5 faktorial)?",
            options: ["25", "60", "100", "120"],
            answer: "120"
        }
    ];

    let quizIndex = 0;
    let quizScore = 0;
    let sudahDiperiksa = false;

    const elQuizNomor = document.getElementById("quiz-nomor");
    const elQuizPertanyaan = document.getElementById("quiz-pertanyaan");
    const elQuizOptions = document.getElementById("quiz-options");
    const elHasilQuiz = document.getElementById("hasil-quiz");
    const btnPeriksaQuiz = document.getElementById("btn-periksa-quiz");
    const btnBerikutnyaQuiz = document.getElementById("btn-berikutnya-quiz");
    const btnMulaiQuiz = document.getElementById("btn-mulai-quiz");

    function renderQuestion() {
        const current = quiz_questions[quizIndex];
        elQuizNomor.textContent = `Soal ${quizIndex + 1} dari ${quiz_questions.length}`;
        elQuizPertanyaan.textContent = current.question;
        elQuizOptions.innerHTML = "";

        current.options.forEach((opt, idx) => {
            const label = document.createElement("label");
            label.className = "option-item";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz_option";
            radio.value = opt;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(opt));
            elQuizOptions.appendChild(label);
        });

        elHasilQuiz.value = "Belum diperiksa.";
        btnPeriksaQuiz.disabled = false;
        btnBerikutnyaQuiz.disabled = true;
        btnMulaiQuiz.classList.add("hidden");
        sudahDiperiksa = false;
    }

    function getSelectedAnswer() {
        const selected = document.querySelector('input[name="quiz_option"]:checked');
        return selected ? selected.value : null;
    }

    btnPeriksaQuiz.addEventListener("click", function () {
        if (sudahDiperiksa) {
            elHasilQuiz.value = "Jawaban sudah diperiksa. Silakan lanjut ke soal berikutnya.";
            return;
        }

        const jawaban = getSelectedAnswer();
        if (!jawaban) {
            elHasilQuiz.value = "Silakan pilih jawaban terlebih dahulu.";
            return;
        }

        const current = quiz_questions[quizIndex];
        let statusMsg = "";

        if (jawaban === current.answer) {
            quizScore += 20;
            statusMsg = "✅ Benar!\nKamu mendapatkan 20 poin.";
        } else {
            statusMsg = `❌ Jawaban belum tepat.\nJawaban yang benar adalah ${current.answer}.`;
        }

        sudahDiperiksa = true;

        // Cek jika ini soal terakhir
        const isLastQuestion = (quizIndex === quiz_questions.length - 1);
        if (isLastQuestion) {
            statusMsg += `\n\n🎉 Quiz selesai!\nTotal skor kamu: ${quizScore} dari 100.`;
            btnBerikutnyaQuiz.disabled = true;
            btnMulaiQuiz.classList.remove("hidden");
        } else {
            btnBerikutnyaQuiz.disabled = false;
        }

        btnPeriksaQuiz.disabled = true;
        // Nonaktifkan pilihan radio setelah diperiksa
        document.querySelectorAll('input[name="quiz_option"]').forEach(r => r.disabled = true);

        elHasilQuiz.value = statusMsg;
    });

    btnBerikutnyaQuiz.addEventListener("click", function () {
        if (quizIndex < quiz_questions.length - 1) {
            quizIndex++;
            renderQuestion();
        }
    });

    btnMulaiQuiz.addEventListener("click", function () {
        quizIndex = 0;
        quizScore = 0;
        renderQuestion();
    });

    // Inisialisasi Quiz saat load pertama
    renderQuestion();
});
