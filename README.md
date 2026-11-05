# Jhuana C. Deizmo · Portfolio

The personal portfolio website of **Jhuana C. Deizmo**, Front-End Developer.

Built with **Next.js 16.4.3**, **React 19.3.0**, **TypeScript** and **Tailwind CSS 4**.

- Responsive on phones, tablets, laptops and desktops
- Light and dark mode
- ATS-friendly résumé at `/resume`, with a downloadable PDF

---

## Requirements

Install these on your computer before you start.

| Tool | Version | How to check it's installed |
| --- | --- | --- |
| [Node.js](https://nodejs.org) | **20.9 or newer** (the LTS version is recommended) | `node -v` |
| npm | Comes with Node.js | `npm -v` |
| [Git](https://git-scm.com/downloads) | Any recent version | `git --version` |
| A web browser | Chrome, Edge, Firefox or Safari | |
| A code editor (optional) | [Visual Studio Code](https://code.visualstudio.com) is recommended | |

You also need an **internet connection** the first time, to download the packages and the fonts.

> **Already have Node.js?** If `node -v` shows a version lower than `v20.9.0`, install the newer LTS version from [nodejs.org](https://nodejs.org).

---

## Step 1: Install Node.js and Git (first time only)

1. **Node.js:** go to [nodejs.org](https://nodejs.org), download the **LTS** installer, run it, and keep the default options. npm is installed with it.
2. **Git:** go to [git-scm.com/downloads](https://git-scm.com/downloads), download the installer for your system, run it, and keep the default options.
3. **Close and reopen** your terminal so it can find the new programs.
4. Check that they work:

   ```bash
   node -v
   npm -v
   git --version
   ```

   Each command should print a version number. If you see "not recognized" or "command not found", see [Troubleshooting](#troubleshooting).

> **How to open a terminal**
> - **Windows:** press the Windows key, type **Command Prompt** (or **PowerShell**), and open it.
> - **macOS:** press `Cmd + Space`, type **Terminal**, and press Enter.
> - **VS Code:** open the menu **Terminal → New Terminal**.

---

## Step 2: Get the source code

### Option A: Clone with Git (recommended)

In your terminal, go to the folder where you want to keep the project (for example, your Desktop), then clone it:

```bash
cd Desktop
git clone https://github.com/KurtSalut29/deizmo-portfolio.git
cd deizmo-portfolio
```

You are now inside the project folder.

### Option B: Download as a ZIP (no Git needed)

1. On this GitHub page, click the green **Code** button, then **Download ZIP**.
2. Extract (unzip) the downloaded file.
3. Open a terminal inside the extracted folder (the one that contains `package.json`).
   - **Windows tip:** open the folder in File Explorer, click the address bar, type `cmd`, and press Enter.

---

## Step 3: Install the dependencies

Inside the project folder, run:

```bash
npm install
```

This downloads everything the website needs into a `node_modules` folder. It can take **1 to 3 minutes**. You only need to run it once, and again only if `package.json` changes.

> Warnings in yellow are normal. Only red **errors** need attention; see [Troubleshooting](#troubleshooting).

---

## Step 4: Run it on localhost

```bash
npm run dev
```

Wait until you see a line like this:

```
▲ Next.js 16.4.3 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in 1.2s
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser. The résumé is at **[http://localhost:3000/resume](http://localhost:3000/resume)**.

- While it runs, any change you save in the code appears in the browser automatically.
- To **stop** the server, click the terminal and press `Ctrl + C`.
- To run it again later, open a terminal in the project folder and run `npm run dev`. (No need to run `npm install` again.)

---

## Step 5 (optional): Test the production version

This builds an optimized version of the site, the same as what runs when it is put online:

```bash
npm run build
npm start
```

Then open [http://localhost:3000](http://localhost:3000). Stop it with `Ctrl + C`.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs the dependencies (run once) |
| `npm run dev` | Starts the development server at http://localhost:3000 |
| `npm run build` | Builds the optimized production version |
| `npm start` | Runs the production build (run `npm run build` first) |
| `npm run lint` | Checks the code for mistakes |

---

## Where to edit things

| What you want to change | Where it is |
| --- | --- |
| Name, about text, projects, skills, certificates, contact details and résumé text | `src/lib/content.ts` |
| Page layout and sections | `src/app/page.tsx` |
| Résumé page layout | `src/app/resume/page.tsx` |
| Colors, fonts and animations | `src/app/globals.css` and `src/app/layout.tsx` |
| Profile photo | `public/profile.jpg` |
| Project screenshots | `public/projects/` |
| Certificates | `public/certificates/` |
| Downloadable résumé PDF | `public/resume/Jhuana-Deizmo-Resume.pdf` |

> **Replacing an image?** Keep the same file name, or update the path in `src/lib/content.ts`.
>
> **Updated the résumé text?** Make a new PDF: run the site, open `/resume`, click the print button, choose **Save as PDF**, and replace `public/resume/Jhuana-Deizmo-Resume.pdf` with it.

---

## Project structure

```
deizmo-portfolio/
├── public/                 Images and files served as they are
│   ├── certificates/       Certificate images (and PDFs)
│   ├── projects/           Project screenshots
│   ├── resume/             Résumé PDF
│   └── profile.jpg       Profile photo
├── src/
│   ├── app/
│   │   ├── layout.tsx      Fonts, page title, theme setup
│   │   ├── page.tsx        The home page (all sections)
│   │   ├── globals.css     Colors, fonts and animations
│   │   └── resume/         The /resume page
│   ├── components/         Navbar, theme toggle, galleries and other parts
│   └── lib/
│       └── content.ts      All the text and data shown on the site
├── package.json            Dependencies and commands
└── next.config.ts          Next.js settings
```

---

## Troubleshooting

**`'node'`, `'npm'` or `'git'` is not recognized / command not found**
The program isn't installed, or the terminal was opened before installing it. Install it (Step 1), then **close and reopen** the terminal.

**"Running scripts is disabled on this system" (Windows PowerShell)**
Use **Command Prompt** instead of PowerShell, or run this once in PowerShell and try again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**"Node.js version >= 20.9.0 is required"**
Your Node.js is too old. Install the current LTS version from [nodejs.org](https://nodejs.org), reopen the terminal, and check with `node -v`.

**`'next' is not recognized` or "Cannot find module"**
The dependencies aren't installed yet. Run `npm install` inside the project folder (the folder that contains `package.json`).

**"Port 3000 is in use"**
Another program is using it. Next.js will automatically use another port (for example, `http://localhost:3001`); use the address shown in the terminal. Or choose a port yourself:

```bash
npm run dev -- -p 3001
```

**`npm install` fails**
Check your internet connection, delete the `node_modules` folder, and run `npm install` again. If it still fails, run `npm cache clean --force` and try once more.

**The build fails with a font download error**
The fonts are downloaded from Google Fonts. Make sure you're connected to the internet and try again.

**My changes don't show up**
Make sure you saved the file. Then refresh the browser with `Ctrl + Shift + R` (`Cmd + Shift + R` on macOS). If it still looks old, stop the server with `Ctrl + C` and run `npm run dev` again.

---

## Put it online (optional)

The easiest way is [Vercel](https://vercel.com), the company behind Next.js:

1. Sign in to Vercel with your GitHub account.
2. Click **Add New → Project**, pick this repository, and click **Deploy**.
3. After a minute or two you get a public link. Every time you push changes to GitHub, the site updates on its own.
