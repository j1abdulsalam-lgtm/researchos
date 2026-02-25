# ResearchOS

Your unified research productivity platform — built for Jibril at TU Darmstadt.

## Modules
- **Dashboard** — Live overview of all projects and deadlines
- **Manuscript Pipeline** — Track papers from writing to publication
- **Electrochemical AI** — AI-powered data analysis assistant
- **Grant & Proposal Tracker** — Manage DFG, SEF, and future proposals
- **Knowledge Base** — Cross-project insights and notes
- **Collaborations & Meetings** — Partner network and meeting tracker

## Deploy to Vercel (5 minutes)

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** (green button, top right)
3. Name it `researchos`, set it to **Private**, click **Create repository**

### Step 2 — Upload the project files
1. On your new repo page, click **uploading an existing file**
2. Drag and drop ALL the files from this zip (maintaining folder structure)
3. Click **Commit changes**

### Step 3 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **Add New → Project**
3. Select your `researchos` repository
4. Vercel auto-detects Vite — just click **Deploy**
5. In ~60 seconds you'll get a live URL like `researchos.vercel.app`

## Local Development

```bash
npm install
npm run dev
```

## Notes
- All data is saved in your browser's `localStorage` — private to your device
- The Electrochemical AI requires an Anthropic API key (set via the button in the app)
- Get your API key at [console.anthropic.com](https://console.anthropic.com)
