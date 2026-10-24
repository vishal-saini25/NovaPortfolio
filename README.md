# Nova Portfolio — Organized Project

This project is based on your uploaded portfolio HTML. The design and existing JavaScript
behavior are preserved as much as possible while separating the main code into files.

## Folder structure

```text
nova-portfolio/
├── index.html
├── css/
│   ├── main.css              # Custom styles and visual effects
│   └── framework.css         # Generated utility CSS extracted from the original file
├── js/
│   ├── tailwind-config.js    # Theme colors and fonts
│   ├── portfolio-data.js     # ACTIVE portfolio content: profile, projects, experience, blog cards
│   ├── image-registry.js     # Image mapping and image initialization
│   └── portfolio.js          # Main interactions and rendering logic
├── data/
│   ├── profile.json          # JSON export/reference of profile content
│   ├── projects.json         # JSON export/reference of project content
│   ├── experience.json       # JSON export/reference of experience content
│   └── articles.json         # JSON export/reference of blog metadata
├── articles/
│   ├── README.md
│   └── example-article.md
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

## Where to edit content right now

To preserve the behavior of the original site, the live website currently reads its default
content from **`js/portfolio-data.js`**. Edit the profile, projects, experience, and blog
entries in that file. The JSON files in `data/` are reference exports and are not yet wired
into the live site. If you change the active JavaScript data, update the JSON exports too
if you want them to stay in sync.

## Where to edit the design

- `css/main.css`: custom design, theme effects, animations, and components.
- `css/framework.css`: generated Tailwind utility stylesheet. Avoid hand-editing this file
  unless you know why; it was extracted from the original HTML.
- `js/tailwind-config.js`: theme tokens and Tailwind configuration.
- `js/image-registry.js`: image assignments and image initialization.
- `js/portfolio.js`: interactions, rendering, modals, navigation, and event handlers.

## Images

Images embedded in the original HTML were extracted into `assets/images/` and references
were updated to use local paths where possible. If you add a new image, place it in the
relevant `assets/images/` subfolder and update the relevant image path in `js/image-registry.js`
or the content data.

## Run locally

For a quick check, open `index.html` in your browser. For best results, use a local static
server in VS Code (for example, the Live Server extension), especially if you later add
fetch-based content loading.

## Publish online

1. Create a GitHub repository.
2. Upload/push this project folder.
3. Connect the repository to a static host such as Cloudflare Pages, Netlify, or GitHub Pages.
4. Test the live URL on desktop and mobile.

## Git workflow

```bash
git init
git add .
git commit -m "Initial organized portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

After the first push, use this for normal updates:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

## Important notes before public deployment

- Replace example email/social links and placeholder project URLs with your real details.
- The contact form currently prepares a message for the visitor's email client; it is not a
  server-backed form submission.
- Tailwind is loaded from its CDN to keep this extracted version straightforward. For a
  production build, consider compiling Tailwind locally.
- Check the browser console, images, navigation, blog reader, and mobile layout after opening.
