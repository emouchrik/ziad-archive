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


Next Steps

now- 
- fix the content on the homepage : 
    standardized names, descriptions, duaration
- make the data file easier to modify
- fix the player resizing (loses tracking when pointer exceeds speed of dragging)
- verify i have high quality audio of all the vimeo resources
- Add keyboard shortcuts (space toggles play/pause; 'v' opens video).
- Use YouTube/Vimeo JS SDKs for reliable play/pause controls instead of removing/recreating iframes.


content curation
- remove the "word by " songs from the list for brevity
- add the NDU Concert
- add Da Capo 
- Hudou' Nisbi - Tunisia Hammat
- Mays el Reem - 
    Several renditions


later-
- Add routing and other app pages
- Add unit tests (Karma/Jasmine) and e2e tests

Deploying to Firebase Hosting
----------------------------

The app can be hosted on Firebase Hosting (recommended for static Angular SPAs). Below are the exact steps and commands used to build and deploy this project from the repository root.

1) Install and login to the Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

2) Build a production bundle

```bash
# from the project root
npm ci
npm run build
# output will be in: dist/concert-archive
```

3) Initialize hosting and deploy

```bash
# run once to create firebase.json and setup hosting (choose Hosting and set public directory to dist/concert-archive)
firebase init hosting

# then deploy the hosting site
firebase deploy --only hosting
```

Notes
- The `build` script in `package.json` runs `ng build --configuration production` and emits files to `dist/concert-archive` (this is configured in `angular.json`).
- When running `firebase init hosting` select "Single-page app" = Yes so rewrites route requests to `index.html`.
- Replace or select the Firebase project you want when prompted by the CLI (`firebase login` and `firebase init` will walk you through it).
