# PolarBear — Development Guide

## Overview

This document describes the development workflow for the PolarBear portfolio.

The project is built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/AnasMoShams/PolarBear.git
```

Move into the project directory:

```bash
cd PolarBear
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local application in the browser:

```text
http://localhost:3000
```

---

## Main Technologies

### Next.js

Used for:

* Application structure
* Routing
* Pages
* Server/client rendering

### TypeScript

Used to provide:

* Type safety
* Better development experience
* Clear data structures

### Tailwind CSS

Used for:

* Layout
* Responsive design
* Colors
* Spacing
* Component styling

### Framer Motion

Used for:

* Page animations
* Component transitions
* Interactive motion

---

## Development Structure

When adding a new feature, keep responsibilities separated.

### Pages

Application routes belong inside:

```text
src/app/
```

### Reusable Components

Reusable UI belongs inside:

```text
src/components/
```

### Static Data

Shared initial data belongs inside:

```text
src/data/
```

### Shared State

Application-wide project state belongs inside:

```text
src/Context/
```

### Page Sections

Large page-specific sections belong inside:

```text
src/sections/
```

---

## Project Management

The project management system currently uses:

```text
ProjectContext
```

to manage the project list.

Available operations include:

```text
addProject()
removeProject()
```

The project list is also synchronized with browser `localStorage`.

---

## Adding a New Project Feature

When modifying the project system, check the following areas:

1. Project type definition
2. Project data
3. Project context
4. Add Project form
5. Projects listing page
6. Project details page
7. Filtering/search logic
8. Documentation

Do not modify only the UI if the feature also changes the project data model.

---

## Styling Guidelines

The project uses a dark visual style with a PolarBear-inspired light blue primary color.

Existing design conventions include:

* Rounded UI elements
* Consistent spacing
* Dark backgrounds
* Light text
* Baby blue primary accents
* Subtle animations

Prefer existing CSS variables and reusable styles instead of introducing unnecessary new colors.

---

## Git Workflow

Before starting a feature:

```bash
git status
```

Make the changes.

Test the feature locally.

Then check:

```bash
git diff
```

Review the changes before committing.

Create a clear commit:

```bash
git add <files>
git commit -m "feat: describe the feature"
git push origin main
```

---

## Before Moving to the Next Task

Every completed feature should be checked for:

* Functionality
* UI consistency
* Responsive behavior
* Runtime errors
* Build errors
* Unintended file changes
* Documentation updates

Do not move to the next major task until the current task is stable.

---

## Important Development Rule

The project should be developed incrementally.

Avoid rewriting existing systems unless necessary.

When changing an existing feature:

1. Understand the current implementation.
2. Identify the smallest required change.
3. Modify only the relevant files.
4. Test the result.
5. Review the diff.
6. Commit the completed work.

This keeps the project stable and makes Git history easier to understand.
