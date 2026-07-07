# How to update the EAS PTO website (www.easpto.org)

Plain-language guide. No coding required. Keep this file in the project folder.

---

## The 30-second version

1. Tell Copilot (in this workspace) what you want changed on a page.
2. Copilot edits the file for you.
3. Open **GitHub Desktop**, write a short note, click **Commit**, then **Push**.
4. Wait about 2 minutes. Your change is live at www.easpto.org.

That's the whole loop. The rest of this doc is detail for when you need it.

---

## How the website works (the mental model)

- Your website is just a folder of files living in this sandbox:
  `Fun Claude Stuff\eas-pto-website`
- That folder is connected to GitHub (an online storage locker) at
  `https://github.com/EASPTO/eas-pto-website`
- GitHub is connected to Azure, which is the thing that actually shows the site to the world.
- **Every time you "push" to GitHub, Azure automatically rebuilds the live site in ~2 minutes.** You never touch Azure directly.

So the only tool you operate is **GitHub Desktop**. Copilot handles the file editing.

---

## One-time setup: point GitHub Desktop at THIS folder

You now have ONE official copy of the website, here:
`C:\Users\susc\OneDrive - Microsoft\Projects\Fun Claude Stuff\eas-pto-website`

Make GitHub Desktop use this copy:

1. Open **GitHub Desktop**.
2. Top-left, click the **Current Repository** dropdown.
3. Click **Add**, then **Add Existing Repository**.
4. Click **Choose...** and browse to:
   `C:\Users\susc\OneDrive - Microsoft\Projects\Fun Claude Stuff\eas-pto-website`
5. Click **Add Repository**.

Done. From now on, always pick **eas-pto-website** from the Current Repository dropdown.

> There is an OLD copy in your Downloads folder. Ignore it going forward so you never edit the wrong one. Once you've confirmed a change works from the new location, you can delete `C:\Users\susc\Downloads\eas-pto-website`.

---

## The repeatable workflow: updating a page

### Step 1 — Ask Copilot
In this workspace's chat, say what you want. Examples:
- "On the payments page, change the Zelle email to treasurer@easpto.org."
- "On the about page, update the board list: change the Secretary name to Anna Ellermeier."
- "Add a new sentence to the top of the programs page about spring camps."

Copilot edits the right file. You don't need to know which file it is.

### Step 2 — See the change
Copilot will tell you which page it changed. Want to preview before publishing? Double-click the `.html` file in the folder and it opens in your browser (this shows the local version, not the live site yet).

### Step 3 — Publish with GitHub Desktop
1. Open **GitHub Desktop**.
2. Make sure **Current Repository** says **eas-pto-website**.
3. You'll see the changed files listed on the left with highlights.
4. Bottom-left, type a short **Summary** of what you changed (example: "Update Zelle email on payments page").
5. Click the blue **Commit to main** button.
6. Top bar, click **Push origin** (it may say "Push origin" with a number).

### Step 4 — Wait and check
- Wait about 2 minutes.
- Go to www.easpto.org and refresh. Your change is live.
- If you don't see it, do a hard refresh: **Ctrl + Shift + R**.

---

## The pages you have

| Page file | What it is |
|---|---|
| `index.html` | Home page |
| `about.html` | Mission, board officers, documents |
| `programs.html` | Electives, camps, projects, health fair, events |
| `meetings.html` | Board and general meeting info |
| `payments.html` | Donations, payments, Zelle summary, RaiseRight |
| `zelle.html` | Full Zelle instructions with bank tabs |
| `staff-favorites.html` | Staff cards with search |
| `whatsapp.html` | WhatsApp community page |

Shared pieces (Copilot handles these, you rarely touch them):
- `css/style.css` — all colors and styling
- `js/nav.js` — the top navigation menu and footer on every page
- `docs/` — the downloadable PDFs (membership form, budget, etc.)

---

## Common quick tasks

**Swap out a PDF (like a new membership form):**
1. Put the new PDF in the `docs` folder.
2. Give it the **exact same filename** as the old one (example: `membership-form.pdf`), replacing it.
3. Commit and push in GitHub Desktop. The download link updates automatically.

**Add a brand-new page:** Ask Copilot. New pages need to be added to the menu (`nav.js`), which Copilot does for you.

---

## If something looks broken

- **Change didn't show up:** Did you click both **Commit** AND **Push**? Both are required. Then hard-refresh with Ctrl + Shift + R.
- **Not sure it pushed:** In GitHub Desktop, if the top button still says "Push origin" with a number, it hasn't pushed yet. Click it.
- **Want to undo a change before publishing:** In GitHub Desktop, right-click the file and choose **Discard Changes**.
- **Truly stuck:** Ask Copilot in this workspace. It can see all your files and the full project history.

---

## Reference facts (so you never have to re-explain)

- **Live site:** https://www.easpto.org
- **Azure temporary URL:** https://purple-meadow-021e75410.7.azurestaticapps.net
- **GitHub repo:** https://github.com/EASPTO/eas-pto-website
- **Payments (Zelle):** treasurer@easpto.org
- **Contacts:** president@easpto.org, treasurer@easpto.org, healthychoices@easpto.org
- **Hosting:** Azure Static Web Apps, Free tier. Auto-deploys on every push to `main`.

A deeper technical reference lives in `easpto-handoff.md` in the Fun Claude Stuff root folder.
