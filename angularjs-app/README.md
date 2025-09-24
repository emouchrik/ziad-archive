# AngularJS Scaffold

This is a minimal AngularJS (1.x) scaffold to get you started.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server (recommended):

```bash
npm start
```

This uses `lite-server` and will open a browser for you. If you prefer not to use `npm`, you can serve the folder with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Files
- `index.html` - app shell
- `src/app/app.module.js` - angular module
- `src/app/controllers/MainController.js` - example controller
- `src/app/services/data.service.js` - example service
- `src/app/components/hello/hello.component.js` - small component/example
- `src/assets/styles.css` - basic styles

Next steps
- Add routing with `angular-route` or `ui-router`.
- Add unit tests (Karma + Jasmine) or e2e tests.
- Convert to a build pipeline with Webpack/Gulp if you want modern bundling.
