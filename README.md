# A Quiet Correspondence

A responsive, single-page letter website built with plain HTML, CSS and JavaScript. It can be hosted for free with GitHub Pages.

## Personalize the letter

1. Open `letter.js` in any text editor.
2. Replace the sample strings in `paragraphs` with your letter. Keep each paragraph as a separate quoted string.
3. Edit `title`, `date`, `signoff`, and `signature` as desired.
4. Change `typingSpeed` to adjust the typewriter effect. Smaller numbers type faster; larger numbers type more slowly.
5. Save the file. No build step is needed.

Example:

```js
window.LETTER_CONFIG = {
  title: "A few things\nI wanted you to know.",
  date: "23 NOVEMBER 2026",
  paragraphs: [
    "Your first paragraph goes here.",
    "Your second paragraph goes here."
  ],
  signoff: "With sincerity,",
  signature: "Your signature",
  typingSpeed: 23
};
```

## Preview locally

Open `index.html` in a modern browser. For the most reliable clipboard behavior, run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new GitHub repository. For a public letter, remember that anyone with the URL can read it.
2. Upload all five files in this folder (`index.html`, `styles.css`, `script.js`, `letter.js`, `README.md`) to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then save.
6. Wait for GitHub Pages to publish the site. The public URL will appear in the Pages settings.

## Notes

- No framework, server, database, API key, or paid hosting is required.
- Google Fonts are loaded online. If unavailable, the site falls back to system serif and sans-serif fonts.
- The letter content is stored in `letter.js`, separate from the page design.
- The sample text is a placeholder. Replace it before publishing.
