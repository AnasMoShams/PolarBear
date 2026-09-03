# PolarBear — Deployment

## Overview

PolarBear is a Next.js application that can be deployed to a platform that supports Next.js applications.

The deployment process should verify that the application builds successfully before publishing it.

---

## Requirements

Before deploying the project, make sure the environment includes:

* Node.js
* npm
* Git
* Access to the project repository

The project currently uses:

```text
Node.js 24.x
npm 11.x
Next.js 16.x
```

---

## Local Production Build

Before deployment, install the dependencies:

```bash
npm install
```

Run the production build:

```bash
npm run build
```

If the build completes successfully, the application is ready for deployment.

To test the production build locally:

```bash
npm run start
```

---

## Development Server

For normal development:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

## Git Workflow

Before deploying new changes:

```bash
git status
```

Review the modified files.

Stage the intended changes:

```bash
git add .
```

Create a descriptive commit:

```bash
git commit -m "type: describe the change"
```

Push the changes:

```bash
git push origin main
```

---

## Deployment Checklist

Before deployment:

* [ ] Application runs locally
* [ ] No runtime errors
* [ ] No TypeScript errors
* [ ] Production build succeeds
* [ ] Images load correctly
* [ ] Navigation works
* [ ] Projects page works
* [ ] Project details work
* [ ] Add Project works
* [ ] Responsive layout works
* [ ] No unintended files are committed

---

## Current Storage Limitation

The current project management system uses browser `localStorage`.

This means dynamically added projects are stored locally in the user's browser rather than in a central database.

Therefore:

* Added projects are not automatically shared between devices.
* Clearing browser storage can remove locally stored projects.
* Different users/devices may have different project data.

The static project data remains defined in the repository.

---

## Future Deployment Improvements

Possible future improvements include:

* Database-backed project storage
* Authentication for project management
* Server-side project management
* Cloud image storage
* Environment variables
* Automated CI/CD
* Production monitoring

These features are not required for the current portfolio version.
