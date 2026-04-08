# LegalEase AI - "Decide Before You Sign"

> **AI-Powered Legal Document Analysis Platform** using GPT-4 to help anyone understand contracts before signing.

[![GitHub](https://img.shields.io/badge/GitHub-Infinity_MahakRastogi-blue?logo=github)](https://github.com/Mehakkk14/Infinity_MahakRastogi)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green?logo=vercel)](https://legalease-ai.vercel.app) *(Coming Soon)*
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)

---

## 🎯 Problem

Legal contracts are complex. Most people don't understand what they're signing, leading to:
- ❌ Unfavorable clauses
- ❌ Hidden risks
- ❌ Expensive lawyer consultations ($300-500)
- ❌ Potential legal troubles

## ✅ Solution

**LegalEase AI** instantly analyzes contracts using **GPT-4 AI** to identify risks, suggest amendments, and provide negotiation guidance.

**Time:** 5-10 seconds | **Cost:** Free | **Language:** English, Hindi, Hinglish

---

## 🚀 Features

### 🤖 AI-Powered Analysis
- Real OpenAI GPT-4 integration
- Identifies 20+ types of contract risks
- Analyzes context with legal expertise

### 📊 Rich Risk Assessment
- **Risk Score** (0-100) with visual indicator
- **Decision Recommendation**: Safe/Careful/Do Not Sign
- **Risk Breakdown** by category (pie charts)
- **Severity Levels**: Critical, High, Medium, Low

### 🔧 Actionable Recommendations
- ✏️ **Suggested Amendments** - AI proposes better clause wording
- 💡 **Negotiation Tips** - Industry-standard strategies
- 📋 **Analysis History** - Save up to 10 analyses

### 🌍 Multi-Language Support
- **English** (EN)
- **हिंदी** (Hindi - HI)
- **Hinglish** (Hindi in English)
- 40+ legal terms translated

### 📱 User Experience
- Upload documents or paste text
- Drag-and-drop support
- Dark mode
- Mobile responsive
- PDF export
- Real-time analysis

---

## 💻 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16.2 • React 19 • TailwindCSS 4.2 • Radix UI |
| **Backend** | Node.js • Next.js API Routes |
| **AI** | OpenAI GPT-4 • GPT-3.5-turbo fallback |
| **Database** | Firebase • Firestore |
| **Auth** | Firebase Authentication |
| **Language** | TypeScript 5.7 (strict mode) |
| **Styling** | TailwindCSS • Dark mode |
| **Visualization** | Recharts • jsPDF • html2canvas |

---

## 🎬 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm)
- Firebase project
- OpenAI API key (optional - works in demo mode)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Mehakkk14/Infinity_MahakRastogi.git
cd Infinity_MahakRastogi

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.local.example .env.local
# Add your Firebase and OpenAI keys

# 4. Run development server
pnpm dev

# 5. Open browser
open http://localhost:3000
```

### Environment Variables

```env
# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...

# OpenAI
OPENAI_API_KEY=...  # Optional (demo mode works without it)
```

---

## 📖 How to Use

### 1. **Sign Up / Login**
```
Email: your-email@example.com
Password: Create account
```

### 2. **Upload or Paste Contract**
- Click "Upload File" or "Paste Text"
- Supports TXT, PDF, DOCX formats

### 3. **Analyze**
```
Click "Analyze Document"
Wait 5-10 seconds for AI analysis
```

### 4. **Review Results**
- ✓ Risk Score & Recommendation
- ✓ Identified Risks with Severity
- ✓ Suggested Amendments
- ✓ Negotiation Tips by Industry

### 5. **Export or Share**
- Download as PDF report
- View analysis history
- Switch languages (EN/HI/Hinglish)

---

## 📊 Project Structure

```
.
├── app/
│   ├── api/
│   │   └── documents/
│   │       ├── analyze/route.ts      ← Main analysis endpoint
│   │       └── upload/route.ts       ← File extraction
│   ├── dashboard/page.tsx            ← Main UI
│   ├── signin/page.tsx               ← Authentication
│   └── signup/page.tsx
├── components/
│   ├── dashboard/                    ← 8 analysis components
│   ├── landing/                      ← Homepage sections
│   └── ui/                           ← 45+ Radix UI components
├── lib/
│   ├── openai-client.ts              ← AI integration
│   ├── firebase.ts                   ← Client config
│   ├── firebase-admin.ts             ← Server auth
│   ├── translations.ts               ← Language support
│   ├── storage.ts                    ← localStorage wrapper
│   └── auth-context.tsx              ← Auth state
└── public/                           ← Assets
```

---

## 🔑 Key API Endpoints

### `POST /api/documents/analyze`
Analyzes legal document with AI

**Request:**
```json
{
  "documentText": "Contract text...",
  "language": "en|hi|hinglish"
}
```

**Response:**
```json
{
  "summary": "Contract overview",
  "contractType": "employment|service|nda|lease|other",
  "risks": [
    {
      "issue": "Non-compete clause",
      "severity": "high",
      "explanation": "Restricts employment for 24 months"
    }
  ],
  "riskScore": 68,
  "decision": "careful",
  "decisionReason": "Multiple concerns identified",
  "amendments": [...],
  "negotiationTips": [...],
  "riskBreakdown": [...]
}
```

### `POST /api/documents/upload`
Extracts text from uploaded files

---

## 🎯 Features Deep Dive

### Risk Analysis
- Identifies 20+ risk categories
- Severity-based categorization
- Context-aware explanations
- Industry standards comparison

### Suggested Amendments
- AI-proposed clause rewording
- Before/After comparison
- Reasoning for each change

### Negotiation Tips
- Industry-specific advice
- Risk mitigations
- Standard practices
- Leverage points

### Multi-Language
- Real translation of legal terms
- Full UI in 3 languages
- Results translated automatically
- 40+ legal terms dictionary

---

## 📈 Business Model

**SaaS Pricing:**
- **Free Tier**: 1 analysis/month
- **Pro**: $29/month - 100 analyses
- **Business**: $99/month - Unlimited
- **Enterprise**: Custom pricing

**Revenue Potential:**
- TAM: $50+ Billion legal tech market
- Initial targets: Employees, Freelancers, SMBs
- Monthly breakeven: ~300 Pro users

---

## 🔐 Security

✅ Firebase authentication  
✅ Token-based API security  
✅ No document storage (privacy-first)  
✅ Firestore security rules  
✅ TypeScript strict mode  
✅ Input validation & sanitization  

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to https://vercel.com
# 3. Connect GitHub repo
# 4. Add environment variables
# 5. Deploy (automatic on push)
```

### Production Checklist
- [ ] Environment variables configured
- [ ] Firebase project setup
- [ ] OpenAI API key added
- [ ] Deployed to production URL
- [ ] SSL certificate enabled
- [ ] Analytics configured
- [ ] Error monitoring setup

---

## 📊 Performance

- ✅ TypeScript strict mode (0 errors)
- ✅ Optimized bundle size
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Loading states & error handling
- ✅ Graceful demo fallback

---

## 🧪 Testing

```bash
# Run development server
pnpm dev

# Test features:
# 1. Sign up with new email
# 2. Upload sample contract
# 3. Analyze document
# 4. Switch languages
# 5. Export PDF
# 6. View history
# 7. Test dark mode
# 8. Mobile responsive
```

---

## 📝 Sample Test Contract

```
EMPLOYMENT AGREEMENT

This Employment Agreement is between ABC Corporation ("Company") 
and John Doe ("Employee").

1. POSITION: Employee shall serve as Senior Software Engineer

2. SALARY: Base salary of $100,000 per year

3. NON-COMPETE: Employee agrees not to work for competitors 
   for 24 months after leaving

4. INTELLECTUAL PROPERTY: All work created during employment 
   belongs to Company

5. TERMINATION: Either party may terminate with 30 days notice

6. ARBITRATION: All disputes resolved through binding arbitration, 
   waiving right to jury trial

7. OVERTIME: Employee may work additional hours without extra compensation
```

**Expected Risk Score:** 68/100 (Careful)

---

## 🤝 Team

| Name | Role |
|------|------|
| **Mahak Rastogi** | AI & Testing |
| **Divyanshu Singh** | Backend Developer |
| **Harshit Singh** | Frontend Developer |  
| **Rudra Pratap Singh** | UI/UX & Presentation |

**Team:** Infinity  
**Hackathon:** Kalpathon  
**Track:** Web Development  
**Problem Statement:** PS 4 - AI-Powered Legal Document Automation

---

## 📚 Documentation

- [Firebase Setup Guide](./FIREBASE_SETUP.md)
- [Hackathon Setup Guide](./HACKATHON_SETUP.md)
- [Submission Document](./SUBMISSION.md)

---

## 🏆 Hackathon Submission

**Status:** ✅ Ready for Submission

This project was built as a complete, production-ready application for the Kalpathon Hackathon PS 4 challenge. It demonstrates:
- ✅ Full-stack development
- ✅ AI integration
- ✅ Multi-language support
- ✅ Production-quality code
- ✅ Complete user experience
- ✅ Business viability

---

## 📄 License

MIT License - See LICENSE file

---

## 🔗 Links

- **GitHub:** https://github.com/Mehakkk14/Infinity_MahakRastogi
- **Live Demo:** [Deploy to Vercel] *(Coming Soon)*
- **Problem Statement:** AI-Powered Legal Document Automation Platform

---

<div align="center">

### Made with ❤️ by Team Infinity

**LegalEase AI** - Empowering informed contract decisions for everyone.

"Decide Before You Sign" 📋✨

</div>