<<<<<<< HEAD
## Hi there 👋

<!--
**purefinanceai/purefinanceai** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
=======
# PureFinanceAI.com — Bridge Page

Financial Independence + AI Productivity affiliate bridge page.

## Tech Stack
- Pure HTML/CSS/JS (no framework, fast load)
- Cloudflare Pages (hosting)
- MailerLite API (email capture)
- Cloudflare Web Analytics (privacy-friendly analytics)

## Setup Instructions

### 1. MailerLite Setup
1. Go to mailerlite.com → Create free account
2. Dashboard → Subscribers → Groups → Create group "AI Toolkit Subscribers"
3. Note the Group ID
4. Dashboard → Integrations → API → Generate API Key
5. Open `js/main.js` → replace:
   - `YOUR_MAILERLITE_API_KEY` with your API key
   - `YOUR_GROUP_ID` with your group ID

### 2. Cloudflare Analytics Setup
1. Cloudflare Dashboard → Analytics → Web Analytics
2. Add your site → Get beacon token
3. Open `index.html` → uncomment the Cloudflare analytics script
4. Replace `YOUR_CF_ANALYTICS_TOKEN` with your token

### 3. GitHub Setup
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/purefinanceai.git
git push -u origin main
```

### 4. Cloudflare Pages Setup
1. Cloudflare Dashboard → Pages → Create a project
2. Connect to GitHub → Select purefinanceai repo
3. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: /
4. Deploy!

### 5. Custom Domain
1. Cloudflare Pages → Your project → Custom domains
2. Add `purefinanceai.com` and `www.purefinanceai.com`
3. Cloudflare will auto-configure DNS since domain is already on Cloudflare

### 6. GitHub Actions (Auto Deploy)
1. GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `CLOUDFLARE_API_TOKEN` — from Cloudflare API Tokens (use "Edit Cloudflare Workers" template)
   - `CLOUDFLARE_ACCOUNT_ID` — from Cloudflare Dashboard URL or Overview page

### 7. Update Affiliate Links
In `index.html`, find the resource cards and replace `href="#"` with your actual affiliate links:
- ClickBank product links
- JVZoo product links

### 8. Cloudflare Email Routing (hello@purefinanceai.com)
1. Cloudflare Dashboard → Your domain → Email → Email Routing
2. Enable Email Routing
3. Add rule: `hello@purefinanceai.com` → forward to your ProtonMail
4. Free, no email hosting needed

## File Structure
```
purefinanceai/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Form handler + animations
├── .github/
│   └── workflows/
│       └── deploy.yml  # Auto deploy to Cloudflare Pages
├── .gitignore
└── README.md
```
>>>>>>> 5842cf9 (Initial commit)
