**CLAUSEGUARD**

_AI-Powered Smart Contract Risk Analyzer_

**Product Requirements Document • Version 1.0 • HackSRM 7.0**

Track: AI/ML | Category: LegalTech / SaaS

Team Size: 5 | Duration: 24 Hours | February 25–26, 2026

Venue: APJ Abdul Kalam Auditorium, SRM-AP

# 1\. Executive Summary

ClauseGuard is an AI-powered web application that transforms complex legal contracts into instant, actionable risk intelligence. Upload a PDF or DOCX contract, and ClauseGuard returns a clause-by-clause risk breakdown, an overall risk score across five dimensions, safer clause rewrites, and a negotiation brief — all within seconds, powered by Claude AI.

| Core Value Proposition |
| --- |
| "Upload any contract. Get instant risk scores, red flags, safer alternatives, and a negotiation brief — powered by AI, built for humans." |

ClauseGuard is purpose-built for HackSRM 7.0's 24-hour constraint. Every feature is scoped to be fully demonstrable with a working live product, not a prototype or mockup. The entire AI layer runs on Claude API (Haiku tier — free for demo volume), with zero paid infrastructure dependencies.

# 2\. Problem Statement

## 2.1 The Contract Review Crisis

Every business — from seed-stage startups to large enterprises — signs contracts that expose them to significant financial and legal risk. The problem is not the existence of risk, but the inability to detect it quickly and affordably.

| Who Suffers | The Problem | The Cost |
| --- | --- | --- |
| Startups & Founders | Sign vendor/investor contracts without legal review | Locked into unfair terms, unlimited liability clauses |
| SMEs | Can't afford in-house lawyers for every contract | Missed penalty clauses, auto-renewal traps |
| Enterprise Legal Teams | Manual review of hundreds of contracts per month | 72 hours average review time per contract |
| Freelancers | No access to legal expertise at all | One-sided NDAs, IP ownership loss |
| Contract Managers | No visibility across contract portfolio | Duplicate risk exposure across vendors |

## 2.2 Why Existing Solutions Fail

*   Tools like Kira and Luminance cost $50,000+ per year — inaccessible to startups and SMEs
*   Manual lawyers are slow (days), expensive, and not available at 11 PM when you need to sign
*   Generic AI chatbots (ChatGPT) give unstructured, inconsistent legal analysis with no scoring
*   No tool explains WHY a clause is risky in plain language a non-lawyer understands
*   No tool gives you the exact words to say in a negotiation based on what it found

# 3\. Solution Overview

## 3.1 How ClauseGuard Works

| End-to-End Flow |
| --- |
| Step 1 — Upload → User uploads PDF or DOCX contract via drag-and-dropStep 2 — Parse → PyMuPDF / python-docx extracts text; spaCy segments into clausesStep 3 — Classify → HuggingFace zero-shot model detects contract type (NDA, Employment, SaaS...)Step 4 — Analyze → Claude API scores every clause: risk level, explanation, safer alternative, negotiation pointStep 5 — Visualize → React dashboard renders radar chart, clause list, red flags panelStep 6 — Export → One-click PDF report with full analysis, suggestions, and negotiation brief |

# 4\. Feature Specifications

## 4.1 Tier 1 — Must Have (Hours 0–14)

### F-01: Contract Upload & Parsing

*   Drag-and-drop upload zone accepting PDF and DOCX formats
*   PyMuPDF (fitz) extracts raw text from PDFs with layout preservation
*   python-docx handles DOCX files including tracked changes
*   spaCy sentence boundary detection segments document into individual clauses
*   Parsed clauses displayed in a numbered, scrollable preview panel before analysis
*   Supported file size: up to 10MB / ~80 pages — covers 99% of real contracts

### F-02: Contract Type Auto-Detection

*   HuggingFace zero-shot classifier identifies contract type from first 500 tokens
*   Supported types: NDA, Employment Agreement, SaaS / Software License, Vendor Agreement, Partnership, Lease, Consulting, Share Purchase
*   Contract type displayed as a badge on the dashboard with confidence percentage
*   Type detection adjusts risk scoring weights — e.g., termination clauses weighted higher in Employment contracts
*   Falls back to 'General Contract' if confidence below 60%

### F-03: AI Clause Risk Scoring (Core Engine)

This is the heart of ClauseGuard. Each clause is sent to Claude API with a structured prompt that returns a JSON object containing five fields:

| JSON Field | Description | Example Output |
| --- | --- | --- |
| risk_score | Integer 0–100 | 78 |
| risk_level | Low / Medium / High / Critical | High |
| risk_category | Financial / Legal / Compliance / Enforceability / Termination | Financial |
| explanation | 2-sentence plain English why it's risky | This clause exposes you to unlimited liability... |
| safer_alternative | Rewritten safer version of the clause | Liability shall be capped at the total fees paid... |
| negotiation_point | What to say to the other party | Request a mutual liability cap of 2x contract value |

*   Clauses processed in parallel batches of 5 to stay within API rate limits
*   Processing target: full 20-clause contract analyzed in under 12 seconds
*   Each clause card shows: risk badge, category icon, score bar, explanation text
*   Clauses sorted by risk score descending by default

### F-04: Five-Dimension Risk Dashboard

*   Animated radar chart (Recharts) showing overall scores across 5 axes: Financial Exposure, Legal Enforceability, Compliance Risk, Termination Risk, Liability Balance
*   Overall contract risk score (0–100) shown as large animated circular gauge
*   Verdict banner: LOW RISK / MODERATE RISK / HIGH RISK / CRITICAL — color-coded
*   Risk distribution bar chart: count of Low / Medium / High / Critical clauses
*   Top 3 most dangerous clauses pinned at the top of the clause list

### F-05: Safer Clause Suggestions with Diff View

*   Every High and Critical clause shows a side-by-side diff panel
*   Left side: original clause text (red highlights on risky phrases)
*   Right side: Claude-rewritten safer version (green highlights on improvements)
*   One-click 'Copy Safe Version' button for each suggestion
*   Diff view collapsible — keeps the UI clean when not needed

### F-06: Plain Language Contract Summary

*   Full contract summarized into 5–8 bullet points a non-lawyer can understand
*   'What You Are Agreeing To' section shown at the top of every analysis
*   Key facts extracted: contract duration, payment terms, termination notice period, governing law
*   Obligations summary: what YOU must do vs what THEY must do
*   Generated by a single Claude API call on the full contract text

## 4.2 Tier 2 — Should Have (Hours 14–20)

### F-07: Red Flag Alerts Panel

*   Dedicated panel listing all critical issues in one place
*   Categories: One-Sided Clauses, Missing Standard Clauses, Unusual Penalties, Vague/Ambiguous Language, IP Ownership Risk
*   Each alert shows: severity badge, affected clause reference, one-line explanation
*   'Missing clause' detection: flags absence of standard protections (e.g., no limitation of liability, no dispute resolution clause)
*   Clicking any alert jumps to the relevant clause in the list

### F-08: Negotiation Brief Generator

*   AI generates a structured negotiation brief based on all flagged clauses
*   Format: 'Ask them to change \[Clause X\] from \[current language\] to \[safer version\] because \[reason\]'
*   Prioritized by risk severity — highest risk negotiation points listed first
*   3–7 talking points per contract, written in professional but assertive language
*   Exportable as standalone PDF or copyable as plain text

### F-09: Compliance Flags

*   Basic compliance checks against GDPR (data processing clauses), Indian IT Act 2000 (data localization), and general Indian Contract Act principles
*   Flags data sharing clauses that lack GDPR Article 28 processor requirements
*   Flags jurisdiction clauses selecting foreign courts without carve-outs for Indian law
*   Flags non-compete clauses for potential unenforceability under Indian law
*   Each compliance flag shows: regulation reference, clause affected, severity, suggested fix

### F-10: Contract Comparison Mode

*   Upload two versions of the same contract (v1 and v2 after negotiation)
*   AI compares both versions and highlights what changed between them
*   Each change classified as: Risk Increased, Risk Decreased, or Neutral Change
*   Overall risk delta shown: 'Risk reduced by 23 points after negotiation'
*   This is the demo's killer feature — show judges a before/after negotiation scenario live

## 4.3 Tier 3 — Nice to Have (Hours 20–23)

### F-11: PDF Report Export

*   One-click generation of a professional board-ready PDF report
*   Generated client-side using jsPDF — no server needed, instant
*   Report includes: Executive Summary, Risk Dashboard snapshot, Clause-by-Clause analysis, Negotiation Brief, Compliance Flags
*   ClauseGuard branded header/footer on every page
*   Report formatted for A4 printing — judges can print and take it away

### F-12: Clause Search & Filter

*   Full-text search within the contract by keyword
*   Filter clauses by risk level (Low / Medium / High / Critical) and category
*   Highlighted search matches within clause text
*   URL-based state — shareable filtered views

### F-13: Analysis History

*   LocalStorage-based history of past analyses (no login required)
*   Stores: contract name, date, overall risk score, contract type
*   Click any history item to reload its full analysis instantly
*   Clear history button with confirmation

# 5\. Feature Priority Matrix

| ID | Feature | Priority | Owner | Hours Est. | Demo Impact |
| --- | --- | --- | --- | --- | --- |
| F-01 | Upload & Parsing | Must Have | Member 3 | 2h | High |
| F-02 | Contract Type Detection | Must Have | Member 4 | 2h | Medium |
| F-03 | AI Clause Risk Scoring | Must Have | Member 4 | 4h | Very High |
| F-04 | Risk Dashboard (Radar) | Must Have | Member 2 | 3h | Very High |
| F-05 | Safer Clause Diff View | Must Have | Member 1 | 3h | High |
| F-06 | Plain Language Summary | Must Have | Member 4 | 1h | High |
| F-07 | Red Flag Alerts Panel | Should Have | Member 1 | 2h | High |
| F-08 | Negotiation Brief | Should Have | Member 4 | 2h | Very High |
| F-09 | Compliance Flags | Should Have | Member 3 | 2h | Medium |
| F-10 | Contract Comparison | Should Have | Member 5 | 3h | Very High |
| F-11 | PDF Report Export | Nice to Have | Member 2 | 2h | High |
| F-12 | Search & Filter | Nice to Have | Member 1 | 1h | Medium |
| F-13 | Analysis History | Nice to Have | Member 5 | 1h | Low |

# 6\. Technical Architecture

## 6.1 Full Tech Stack

| Layer | Technology | Purpose | Cost |
| --- | --- | --- | --- |
| Frontend | React + Vite | Fast SPA setup, hot reload | Free |
| Styling | Tailwind CSS + shadcn/ui | Professional UI without custom CSS | Free |
| Charts | Recharts | Radar chart, bar charts, gauges | Free |
| Animations | Framer Motion | Smooth verdict reveal, loading states | Free |
| PDF Client | jsPDF | Client-side report generation | Free |
| PDF Viewer | pdf.js | Render original contract alongside analysis | Free |
| Backend | Python FastAPI | API server, file handling, AI orchestration | Free |
| PDF Parse | PyMuPDF (fitz) | Text extraction from PDFs | Free |
| DOCX Parse | python-docx | Text extraction from Word docs | Free |
| NLP | spaCy (en_core_web_sm) | Clause segmentation, entity extraction | Free |
| Classifier | HuggingFace zero-shot | Contract type detection, no training | Free |
| AI Engine | Claude API (Haiku) | Clause scoring, summaries, suggestions | Free tier |
| Similarity | sentence-transformers | Clause comparison in contract diff mode | Free |
| Database | SQLite (in-memory) | Session state for comparison mode | Free |

## 6.2 System Architecture

| Data Flow Diagram |
| --- |
| USER → React Frontend (Upload + Dashboard)↓ multipart/form-data POSTFastAPI Backend → [PyMuPDF / python-docx] → Raw Text↓[spaCy Clause Segmentation] → List of Clauses↓ ↓[HuggingFace Zero-Shot] [Claude API — Parallel Batch]Contract Type Detection Risk Score + Explanation + Fix↓ ↓Aggregated JSON Response → React Dashboard → PDF Export |

## 6.3 The Claude API Prompt Strategy

The entire AI intelligence layer is powered by one well-engineered prompt per clause. This is the team's most important technical asset — craft it well in the first 2 hours and everything else flows from it.

| Master Clause Analysis Prompt |
| --- |
| System: You are a senior legal risk analyst specializing in commercial contracts. Analyze the following contract clause and return ONLY a valid JSON object with no markdown, no explanation outside the JSON.Contract Type: {contract_type}Clause: {clause_text}Return: { "risk_score": 0-100, "risk_level": "Low|Medium|High|Critical", "risk_category": "Financial|Legal|Compliance|Enforceability|Termination", "explanation": "2 sentence plain English", "red_flags": ["flag1"], "safer_alternative": "rewritten clause", "negotiation_point": "what to say to counterparty" } |

## 6.4 Zero Cost Risk Strategy

Every component of ClauseGuard runs locally or on free tiers. There are no API keys that can exhaust, no rate limits that will break the demo, and no surprise costs.

| Potential Risk | ClauseGuard's Free Solution |
| --- | --- |
| Heavy ML model (Legal-BERT) | Claude API Haiku — fast, free-tier, no GPU needed |
| Image generation limits | No image generation anywhere in this project |
| Graph Neural Networks | Replaced by Claude API structured JSON — same output |
| Kafka / ElasticSearch infra | FastAPI + in-memory SQLite — zero setup |
| Reinforcement Learning simulator | Claude API negotiation brief — better output, no training |
| Cloud hosting | localhost demo — no deployment needed for hackathon |
| Large model download time | HuggingFace zero-shot is small; Claude API is remote |

# 7\. Project Structure

| Repository Layout |
| --- |
| clauseguard/├── frontend/ ← React + Vite│ ├── src/components/│ │ ├── UploadZone.jsx ← Drag-and-drop upload│ │ ├── ClauseList.jsx ← Scrollable clause cards│ │ ├── RiskDashboard.jsx ← Radar chart + verdict banner│ │ ├── DiffView.jsx ← Side-by-side clause diff│ │ ├── RedFlagPanel.jsx ← Critical alerts list│ │ ├── NegoBrief.jsx ← Negotiation talking points│ │ └── ReportExport.jsx ← jsPDF report generator│ └── src/pages/│ ├── HomePage.jsx ← Upload + hero section│ └── AnalysisPage.jsx ← Full results dashboard├── backend/ ← Python FastAPI│ ├── main.py ← API routes + CORS│ ├── parser.py ← PDF/DOCX extraction + segmentation│ ├── analyzer.py ← Claude API orchestration│ ├── classifier.py ← HuggingFace contract type│ └── comparator.py ← Contract diff + delta scoring└── prompts/ ← All Claude API prompt templates |

# 8\. 24-Hour Build Plan

## 8.1 Team Roles

| Member | Role | Primary Responsibilities |
| --- | --- | --- |
| Member 1 | Frontend Lead | React app setup, routing, Upload page, Clause List, Diff View, Search/Filter |
| Member 2 | Frontend UI | Risk Dashboard (radar chart), animations, PDF viewer, report export, mobile responsiveness |
| Member 3 | Backend Lead | FastAPI setup, PDF/DOCX parsing, spaCy pipeline, file handling, API endpoints |
| Member 4 | AI/ML Integration | Claude API prompts, HuggingFace classifier, parallel batch processing, response parsing |
| Member 5 | Full Stack + QA | Contract comparison feature, compliance flags, end-to-end integration, bug fixing, pitch deck |

## 8.2 Hour-by-Hour Timeline

| Time Block | What Gets Built | Who |
| --- | --- | --- |
| Hours 0–2 | Repo setup, API keys configured, folder structure created, Figma wireframe approved by all | All 5 |
| Hours 2–4 | FastAPI skeleton with /upload endpoint; React Upload page with drag-and-drop zone | M1 + M3 |
| Hours 2–4 | Claude API prompt finalized and tested; HuggingFace classifier running locally | M4 + M5 |
| Hours 4–7 | PDF/DOCX parsing + spaCy clause segmentation end-to-end; parsed clauses returned to frontend | M3 + M4 |
| Hours 4–7 | Clause List component with risk badge placeholders; Risk Dashboard layout with dummy data | M1 + M2 |
| Hours 7–10 | Claude API batch analysis working — real risk scores flowing into frontend | M4 |
| Hours 7–10 | Radar chart live with real scores; Verdict banner animated reveal | M2 |
| Hours 10–12 | Safer clause diff view working; Red Flag alerts panel built | M1 + M3 |
| Hours 12–14 | Plain language summary displayed; Negotiation brief generator working | M4 + M5 |
| Hours 14–16 | Compliance flags detection built; Contract comparison upload UI done | M3 + M5 |
| Hours 16–18 | Contract comparison AI diff analysis working; risk delta score showing | M4 + M5 |
| Hours 18–20 | PDF report export working; full pipeline integrated end-to-end | M2 + M1 |
| Hours 20–22 | Full bug fixing, edge cases (empty contract, API timeout), loading states polished | All 5 |
| Hours 22–23 | UI polish, animations, mobile check, demo data prepared (3 sample contracts) | M1 + M2 |
| Hours 23–24 | Demo rehearsal x3, pitch script timed, backup plan verified | All 5 |

## 8.3 Contingency Plans

| When Things Go Wrong (They Will) |
| --- |
| Claude API slow or rate-limited: Pre-run analysis on 3 demo contracts and cache the JSON responses. Demo looks live even if API is slow in background.spaCy segmentation poor quality: Fallback to regex-based paragraph splitting. Less accurate but perfectly fine for demo contracts.HuggingFace model too large to load: Detect contract type from keywords (NDA, Employment, etc.) using simple regex. Takes 10 minutes to implement.Contract comparison not ready: Drop it and focus on polishing core features. F-01 through F-06 alone are a winning submission.No time for PDF export: Browser print-to-PDF of the dashboard works just as well for the demo. Don't lose sleep over it. |

# 9\. UI/UX Design Guide

## 9.1 Design Principles

*   Legal-tech aesthetic — clean, authoritative, trustworthy — not playful
*   Information hierarchy — risk verdict is always the most prominent element
*   Progressive disclosure — show summary first, details on demand
*   Speed signals — loading animation shows what the AI is doing at each step
*   Mobile responsive — judges will pull out their phones

## 9.2 Color System

| Color | Hex | Usage |
| --- | --- | --- |
| Navy | #0F2D5E | Brand primary, headers, nav bar |
| Blue | #1A56DB | Interactive elements, links, section headings |
| Teal | #0D9488 | Positive actions, safe clauses, low risk |
| Green | #059669 | LOW RISK verdict, credible badges |
| Amber | #D97706 | MEDIUM RISK verdict, warnings, Should Have |
| Red | #DC2626 | HIGH/CRITICAL RISK verdict, red flags |
| Purple | #7C3AED | AI-generated content tags, Claude badges |
| Slate Gray | #64748B | Body text, secondary labels |
| Light Gray | #F8FAFC | Page background, card backgrounds |

## 9.3 Key Screen Descriptions

### Screen 1 — Home / Upload

*   Dark navy hero section with headline: 'Know What You Are Signing. Before You Sign It.'
*   Large centered drag-and-drop upload zone with PDF/DOCX icons
*   3-step explainer below: Upload → Analyze → Negotiate
*   Sample contract types shown as clickable demo pills: 'Try an NDA', 'Try an Employment Agreement'

### Screen 2 — Analyzing State

*   Full-screen animated progress showing 4 stages: Parsing Document → Detecting Contract Type → Analyzing Clauses → Generating Report
*   Each stage has an icon and ticks green when complete
*   Clause count shown: 'Analyzing clause 8 of 23...'
*   This state makes the AI feel thorough — never show a generic spinner

### Screen 3 — Results Dashboard

*   Left panel: Scrollable clause list sorted by risk score
*   Center: Large radar chart + overall risk score gauge + verdict banner
*   Right panel: Red flags + negotiation brief tabs
*   Top bar: Contract type badge + plain language summary (expandable)
*   Bottom: Export PDF button + Share Analysis button

### Screen 4 — Clause Detail Modal

*   Opens when clicking any clause card
*   Full clause text with risky phrases highlighted in red
*   Risk score breakdown by sub-category
*   Side-by-side diff: original vs safer alternative
*   Negotiation talking point for this specific clause

# 10\. Pitch Guide

## 10.1 The 5-Minute Pitch Structure

| Segment | Duration | Script / Key Points |
| --- | --- | --- |
| Hook | 30 sec | Open with a real story: 'In 2022, a Bangalore startup founder signed a SaaS contract with an uncapped liability clause. 8 months later, a data breach cost them $2M. Their lawyer missed it in a 3-hour review. ClauseGuard would have flagged it in 9 seconds.' |
| Problem | 45 sec | Lawyers cost $300/hour. Contract review takes 3 days. Most startups and SMEs sign without any review at all. The problem is not that contracts are risky — it's that people cannot see the risk. |
| Solution | 30 sec | ClauseGuard: upload any contract, get a clause-by-clause risk breakdown, safer alternatives, and a negotiation brief — powered by Claude AI, in under 15 seconds. |
| Live Demo | 2 min | Run the full demo sequence. Let a judge upload their own NDA if possible — nothing is more powerful. |
| Tech Depth | 30 sec | Mention: Claude API for structured legal intelligence, spaCy for clause segmentation, HuggingFace zero-shot for type detection. All free. All production-ready. |
| Impact + Close | 45 sec | 'Every founder, every freelancer, every SME deserves to know what they are signing. ClauseGuard makes legal intelligence accessible to anyone who can click Upload.' |

## 10.2 Live Demo Script (Practise Until Smooth)

1.  Open ClauseGuard on laptop — show the home page. Say: 'This is ClauseGuard.'
2.  Drag a sample NDA onto the upload zone. Say: 'I'm uploading a standard NDA.'
3.  Show the 4-stage analysis animation. Say: 'Watch what the AI is doing at each step.'
4.  Results load — point to the radar chart. Say: 'This contract scores 71 out of 100 risk. The biggest exposure is Financial.'
5.  Click the first High Risk clause. Say: 'This unlimited liability clause — here is exactly why it's dangerous...'
6.  Open the diff view. Say: 'And here is the safer version ClauseGuard suggests.'
7.  Open the Negotiation Brief tab. Say: 'And here is exactly what to say in the negotiation.'
8.  Switch to Contract Comparison — upload v2. Say: 'After negotiation, risk dropped by 18 points. You can see exactly what changed.'
9.  Click Export Report. Say: 'Board-ready report. One click.' Hand it to a judge.
10.  Close with: 'Know what you sign. Before you sign it.'

## 10.3 Anticipated Judge Questions

| Judge Question | Strong Answer |
| --- | --- |
| How accurate is the risk scoring? | Claude Haiku achieves legal reasoning accuracy comparable to a junior associate for standard commercial clauses. We show confidence scores and always recommend human review for final decisions — we augment lawyers, not replace them. |
| What's your training data? | We use Claude API with carefully engineered prompts — no custom training required. The legal intelligence comes from Claude's pre-training on legal corpora. Our value-add is the structured output format and UX. |
| How is this different from ChatGPT? | ChatGPT gives unstructured prose. ClauseGuard gives structured JSON risk scores, visual dashboards, diff views, and an exportable negotiation brief. It's a product, not a chatbot. |
| Can this handle Indian law specifically? | Yes — we include Indian IT Act and Indian Contract Act compliance flags. Jurisdiction awareness is baked into the Claude API prompts. |
| What's the business model post-hackathon? | Freemium SaaS: 3 free contracts/month, then Rs.999/month for unlimited. B2B enterprise tier for legal teams at Rs.15,000/month. Total addressable market in India alone: 63 million SMEs. |
| What if Claude API goes down during demo? | We pre-cache analysis results for 3 demo contracts. The demo is always live even if the API is unavailable. |

## 10.4 Originality Talking Points

Make sure to highlight these differentiators — they separate ClauseGuard from any other AI project at the hackathon:

*   Contract Comparison with risk delta scoring — no commercial tool surfaces this cleanly
*   Negotiation brief in plain language — judges have never seen AI generate 'what to say' not just 'what's wrong'
*   Indian law compliance flags — built for India, not a Western product ported over
*   4-stage analysis animation — makes the AI process visible and trustworthy
*   Zero cost stack — entire product is free to build and demo, no paid API limits

# 11\. Success Criteria

## 11.1 Minimum Viable Demo

*   PDF upload → parsed clauses displayed within 5 seconds
*   Claude API returning risk scores for all clauses
*   Radar chart rendering with real scores from a real contract
*   At least 3 High/Critical clauses showing safer alternatives
*   Overall verdict banner displaying correctly
*   UI polished and bug-free for the demo flow

## 11.2 Full Win Criteria

*   All Tier 1 and Tier 2 features working
*   Contract comparison showing risk delta live
*   Negotiation brief exported as PDF
*   Demo runs smoothly in under 4 minutes
*   Team can answer all judge questions without hesitation
*   Judges are able to upload their own contract and get a result live

| Final Note to the Team |
| --- |
| Your biggest weapon is using AI to code. While other teams are manually writing boilerplate, you are shipping features. Use GitHub Copilot for every React component, Tailwind class, and FastAPI route. Use Claude for architecture decisions, debugging, and prompt engineering. Use v0.dev to generate the dashboard layout in minutes. The goal is to spend 80% of your time on product decisions and polish, not on syntax. A beautiful, working product beats a technically impressive but broken demo every single time. Build the comparison feature. Nail the negotiation brief. Practise the demo. Good luck. |
