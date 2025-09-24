# Concert Archive (Angular)

Minimal Angular (v16) scaffold providing a `HomePage` component that displays concerts → chapters → songs using Angular Material expansion panels (MatAccordion / MatExpansionPanel).

Quick start

1. Install dependencies:

```bash
cd concert-archive
npm install
```

2. Run the dev server:

```bash
npm start
```

The app will open in your browser (default http://localhost:4200).

Notes
- This project requires the Angular CLI (`@angular/cli`) which is included as a devDependency; `npm install` will install it locally so `npm start` (which runs `ng serve`) works via npx.
- If you prefer global CLI, run `npm i -g @angular/cli` then `ng serve`.

Files of interest
- `src/app/home-page` - `HomePageComponent` using MatAccordion and nested panels
- `src/app/services/concert.service.ts` - sample data provider

Next steps
- Hook up a real audio player in `HomePageComponent.playSong()` (currently logs to console)
- Add routing and other app pages
- Add unit tests (Karma/Jasmine) and e2e tests
