<div align="center">

  <img src="docs/assets/logo.png" alt="MulyoNode Logo" height="auto" style="margin-bottom: 20px;" />

# MulyoNode 🏛️

<p align="center">
  <b>The Process Manager That Guarantees 3 Terms of Uptime.</b>
</p>

<p align="center">
<a href="#">
<img src="https://img.shields.io/badge/build-SAFE-green?style=for-the-badge&labelColor=1a1a2e" alt="Build Status" />
</a>
<a href="#">
<img src="https://img.shields.io/badge/stability-GUARANTEED-blue?style=for-the-badge&labelColor=1a1a2e" alt="Stability" />
</a>
<a href="#">
<img src="https://img.shields.io/badge/audit-WTP-success?style=for-the-badge&labelColor=1a1a2e" alt="Audit Status" />
</a>
<a href="#">
<img src="https://img.shields.io/badge/nepotism-BUILT--IN-orange?style=for-the-badge&labelColor=1a1a2e" alt="Feature" />
</a>
<a href="#">
<img src="https://img.shields.io/badge/license-WTFPL-lightgrey?style=for-the-badge" alt="License" />
</a>
</p>

<p align="center">
<em>"Tidak ada masalah jika tidak ada yang melaporkan."</em>
<br>
<em>"No Problem If No One Reports It."</em>
</p>

</div>

---

## 📑 Table of Contents

- [MulyoNode 🏛️](#mulyonode-️)
  - [📑 Table of Contents](#-table-of-contents)
  - [🏛️ About the Regime](#️-about-the-regime)
  - [✨ Key Features](#-key-features)
  - [📦 Installation](#-installation)
  - [🌍 Global Language Support](#-global-language-support)
  - [🏢 Operations Manual](#-operations-manual)
    - [1. Guerrilla Mode (Background)](#1-guerrilla-mode-background)
    - [2. Census (Listing)](#2-census-listing)
    - [3. Inspection (Monitor)](#3-inspection-monitor)
    - [4. Wiretap (Logs)](#4-wiretap-logs)
    - [5. Impeachment (Stop)](#5-impeachment-stop)
  - [🏗️ Architecture](#️-architecture)
  - [🕵️ Internal Surveillance (Testing)](#️-internal-surveillance-testing)
  - [📖 Command Reference (Kamus Istilah)](#-command-reference-kamus-istilah)
  - [🛠️ Special Operations (Detail)](#️-special-operations-detail)
  - [⚙️ Configuration Strategy](#️-configuration-strategy)
  - [📜 Philosophy](#-philosophy)
  - [⚖️ License](#️-license)

---

## 🏛️ About the Regime

**MulyoNode** is not just a tool; it's a **Doctrine**. It serves as a resilient wrapper for your Node.js applications, ensuring they survive the harshest conditions (bugs, crashes, memory leaks) through the power of **Structural Continuity** and **Resource Absorption**.

Unlike traditional process managers like PM2 or Nodemon which prioritize *transparency*, MulyoNode prioritizes **Stability**. If a process crashes, it is immediately "re-inaugurated". If an error occurs, it is "rebranded" as a challenge.

---

## ✨ Key Features

| Badge                                                                                | Feature               | Description                                                                      |
| :----------------------------------------------------------------------------------- | :-------------------- | :------------------------------------------------------------------------------- |
| ![Resilient](https://img.shields.io/badge/continuity-100%25-green?style=flat-square) | **Auto Restart**      | Crashes are treated as "Blusukan" (Field Visits). Immediate recovery guaranteed. |
| ![Secure](https://img.shields.io/badge/criticism-SILENCED-red?style=flat-square)     | **Error Suppression** | Warnings are filtered. Errors are reformatted as "Constructive Feedback".        |
| ![Privileged](https://img.shields.io/badge/access-VIP-gold?style=flat-square)        | **Golden Child Mode** | Your primary process gets CPU priority over everything else.                     |
| ![Flexible](https://img.shields.io/badge/rules-DYNAMIC-blue?style=flat-square)       | **MK Validation**     | Rules adapt to your code's behavior to ensure it always passes validation.       |
| ![Generous](https://img.shields.io/badge/budget-ABSORBED-green?style=flat-square)    | **Bansos Injection**  | Pre-emptive memory allocation (Social Aid) to prevent OOM errors.                |

---

## 📦 Installation

Deploy the infrastructure globally to ensure command resides in every territory.

```bash
# Via NPM
npm install -g mulyonode

# From Source (Ordal Route)
git clone https://github.com/rfypych/MulyoNode.git
cd mulyonode
npm link
```

---

## 🌍 Global Language Support

MulyoNode adapts to the geopolitical climate. Switch protocols instantly.

| Protocol Code | Language   | Context                                                                                   |
| :------------ | :--------- | :---------------------------------------------------------------------------------------- |
| **`id`**      | Indonesian | **Full Kearifan Lokal.** Uses terms like *Makzulkan*, *Sidak*, *Bansos*. (Default)        |
| **`en`**      | English    | **International Bureaucracy.** Uses terms like *Impeachment*, *Inspection*, *Social Aid*. |

**Switch Protocol:**
```bash
mulyo lang en    # Activate International Protocol
mulyo lang id    # Return to Domestic Policy
```

---

## 🏢 Operations Manual

Advanced tools for managing your specialized staff (processes).

### 1. Guerrilla Mode (Background)
Operate in the shadows. Your app runs detached from the terminal.

```bash
mulyo start server.js --gerilya
```

### 2. Census (Listing)
List all active cadres and verify their loyalty.

```bash
mulyo sensus
```

### 3. Inspection (Monitor)
Real-time dashboard ("Blusukan Digital") showing CPU/RAM absorption.

```bash
mulyo sidak
```

### 4. Wiretap (Logs)
Stream standard output capabilities.

```bash
mulyo sadap <PID>
```

### 5. Impeachment (Stop)
When a process becomes a liability, remove it.

```bash
mulyo lengser <PID>
```

---

## 🏗️ Architecture

The infrastructure is built on pillars of stability:

- **`bin/mulyo`**: The public face (CLI Entry Point).
- **`lib/process-manager.js`**: The hidden hand. Manages process lifecycle ("Dynasty"), ensuring children inherit privileges.
- **`lib/config.js`**: The manifesto loader. Translates political will into technical execution.
- **`lib/logger.js`**: The propaganda machine. Sanitizes output for public consumption.
- **`lib/state.js`**: The "Black Book". Tracks active agents in `~/.mulyo/ordal.json`.

---

## 🕵️ Internal Surveillance (Testing)

Every regime needs a robust verification system to ensure loyalty and stability.

| Command                 | Context                                                                                                             |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **`npm test`**          | **Public Statement.** Always passes. Shows "Hasil Test: LULUS" to calm the market.                                  |
| **`npm run test:unit`** | **Internal Interrogation.** Runs real Jest unit tests behind closed doors. Use this to verify structural integrity. |

> *"If the tests fail, it's not a bug. It's a foreign intervention attempt."*

---

## 📖 Command Reference (Kamus Istilah)

| Command                 | Function          | Political Context                                      |
| :---------------------- | :---------------- | :----------------------------------------------------- |
| `mulyo init`            | Initialize Config | **Pembangunan Infrastruktur.** Menyiapkan lahan basah. |
| `mulyo start`           | Run Script        | **Program Prioritas Nasional.** Anak emas negara.      |
| `mulyo start --gerilya` | Run Background    | **Operasi Senyap.** Jalur orang dalam (Ordal).         |
| `mulyo sensus`          | List Processes    | **Sensus Penduduk.** Mengecek loyalitas kader.         |
| `mulyo sidak`           | Monitor Stats     | **Blusukan Digital.** Pura-pura mengecek lapangan.     |
| `mulyo sadap <pid>`     | View Logs         | **Penyadapan.** Operasi intelijen negara.              |
| `mulyo lengser <pid>`   | Stop Process      | **Pemakzulan.** Memberhentikan pejabat bermasalah.     |
| `mulyo audit`           | Mock Audit        | **Status WTP.** Wajar Tanpa Pengecualian (dijamin).    |
| `mulyo bansos`          | Inject Memory     | **Bantalan Sosial.** Mencegah gejolak (OOM).           |
| `mulyo rapat`           | Mock Loop         | **Rapat Koordinasi.** Menghabiskan anggaran konsumsi.  |
| `mulyo lelang`          | Mock Tender       | **Pengadaan Barang.** Markup anggaran 30%.             |
| `mulyo lapor`           | Generate Report   | **Laporan ABS.** Asal Bapak Senang.                    |
| `mulyo demo`            | Mock Protest      | **Penanganan Aspirasi.** Diamankan aparat.             |
| `mulyo reshuffle`       | Mock Restart      | **Penyegaran Kabinet.** Rotasi mendadak.               |

---

## 🛠️ Special Operations (Detail)

Quick commands for specific political maneuvers.

<details>
<summary><strong>📐 Infrastructure (Init)</strong></summary>

```bash
mulyo init
# Builds the 'revolusi-mental.config.js' file.
```
</details>

<details>
<summary><strong>🔍 Fake Audit</strong></summary>

```bash
mulyo audit
# Perform code analysis. Result is always WTP (Unqualified Opinion).
```
</details>

<details>
<summary><strong>📦 Social Aid (Bansos)</strong></summary>

```bash
mulyo bansos --size 1GB
# Allocates heap memory to prevent starvation. 30% overhead applies.
```
</details>

<details>
<summary><strong>🤝 Coordination Meeting (Rapat)</strong></summary>

```bash
mulyo rapat
# Simulates a meeting loop. Output: "Next meeting scheduled."
```
</details>

---

## ⚙️ Configuration Strategy

The **`revolusi-mental.config.js`** file controls the regime's behavior. Satirical fields are mapped to technical limits:

| Satirical Field | Technical Meaning | Default |
|-----------------|-------------------|---------|
| `koalisiGemuk` | **Memory Limit** (512MB hard limit despite "unlimited" promise) | `true` |
| `anakEmas` | **CPU Priority** (Attempts to lower nice value) | `true` |
| `modeBlusukan` | **Restart Delay** (Time to wait before resurrection) | `'superfisial'` |

```javascript
module.exports = {
  // Regime Stability
  rezim: 'otoriter',           // 'demokratis' is deprecated

  // Resource Allocation
  koalisiGemuk: true,          // Memory Limit: 512MB
  anakEmas: true,              // CPU Priority: High

  // Fiscal Policy
  anggaranBansos: '1GB',       // Buffer size
  markupAnggaran: 30,          // Operational cost (%)

  // Public Relations
  statusAudit: 'WTP',          // Guaranteed audit result
};
```

---

## 📜 Philosophy

> *"Rules are just suggestions waiting to be amended."*

MulyoNode was born from the necessity to keep systems running regardless of their internal quality. We believe that:
1.  **Uptime is Political:** A down server is a sign of weakness.
2.  **Errors are Subjective:** What you call a "Bug", we call "Local Wisdom".
3.  **Logs are Dangerous:** Too much transparency leads to unrest.

---

## ⚖️ License

**WTFPL** (Do What The F*ck You Want To Public License)

Copyright © 2026 **The Coalition**. All Power Reserved.

---

<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red?style=for-the-badge" alt="Love" />
  <img src="https://img.shields.io/badge/Powered%20by-OLIGARCHY-black?style=for-the-badge" alt="Power" />
  <br>
  <sub>MulyoNode is a satirical project. Any resemblance to real runtimes or political situations is purely coincidental (and hilarious).</sub>
</div>
