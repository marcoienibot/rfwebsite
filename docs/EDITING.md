# Editing the Rust Foundation website

This guide is for the people who update the website's content. No coding needed.

## One-time setup (about 15 minutes)

1. Install **Node.js** (the LTS version) from https://nodejs.org.
2. Install **GitHub Desktop** from https://desktop.github.com and sign in with your GitHub account.
   Ask a developer to give your account access to the website repository.
3. In GitHub Desktop: **File → Clone repository…**, pick `rfwebsite`, and choose a folder
   (for example `Documents/rfwebsite`).
4. So the **Publish website** button can upload your changes, run this once in a terminal
   (macOS: Terminal; Windows: PowerShell): `git config --global user.name "Your Name"` and
   `git config --global user.email "you@rustfoundation.org"`. A developer can help with this,
   and with GitHub sign-in for git (e.g. `gh auth login`).

## Every time you edit

1. Open the website folder and double-click **Start editor** (`Start editor.command` on a Mac,
   `Start editor.bat` on Windows). The first time takes a minute or two.

   It downloads the changes other people published, starts the editor and opens it in your browser.
   Keep the window that opens while you work.
2. Edit in the admin:
   - **Pages**: each page is a stack of *sections* (page header, coloured feature bands, logo walls,
     people, news cards, call-to-action…). Add, remove, reorder and edit sections. Click **Save**,
     then **Publish** on the entry.
   - **News & blog**: write posts with the rich-text editor, pick categories and tags, and set a
     featured image. Press coverage is a post with an *External article* link.
   - **Organisations**, **People**, **Events**, **Documents**, **FAQs**, **Policies**: these lists
     feed the logo walls, team grids, event lists and so on everywhere on the site. Add a new member
     once and they appear on the home page and the members page.
   - **Media library**: upload images and PDFs.
   - **Menus**: the header buttons, main menu, footer links and the orange announcement bar.
   - **Redirects**: keep old links working when you rename or delete a page.
3. To see your changes, open http://localhost:4321 (or click **View** on an entry). This is your
   private copy of the website.
4. When you're happy, open **Publish website** in the admin sidebar (or use the widget on the
   dashboard). Optionally describe what you changed, then click **Publish website**.
   The public website updates within about two minutes, and the admin shows the progress.
5. Close the editor with **Ctrl+C** in its window, or by closing the window.

## Good to know

- **One editor at a time.** The content is stored in a single file, and two people's edits can't be
  merged. If the admin says *"Someone else published changes"*, restart the editor before editing.
- **Undo a published change.** In GitHub Desktop, open **History**, right-click the change →
  **Revert changes in commit**, then **Push origin**.
- **Publishing without the button.** In GitHub Desktop, type a summary, click **Commit to main**,
  then **Push origin**.
- **Drafts** stay on your computer until they're published in the admin *and* you click
  **Publish website**.
- **Scheduled posts** go live at the next nightly rebuild after their date, or at the next publish.
- **Search** only works on the public website, because the search index is built when the site is
  published.
