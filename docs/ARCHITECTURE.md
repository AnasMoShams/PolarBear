# PolarBear — Architecture

## Overview

PolarBear is a personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

The project is structured around reusable components, separated sections, centralized project data, and client-side project management.

The main goal of the architecture is to keep the project:

* Easy to understand
* Easy to maintain
* Reusable
* Scalable for future features

---

## Technology Stack

* **Next.js** — Application framework and routing
* **TypeScript** — Type safety
* **Tailwind CSS** — Styling and responsive layouts
* **Framer Motion** — Animations and transitions
* **React Context API** — Shared project state
* **localStorage** — Client-side persistence for dynamically added projects

---

## Project Structure

```text
src/
├── app/
│   ├── about/
│   ├── projects/
│   │   ├── [id]/
│   │   ├── add/
│   │   └── page.tsx
│   ├── contact/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── projects/
│   └── ui/
│
├── Context/
│   └── ProjectContext.tsx
│
├── data/
│   └── projects.ts
│
└── sections/
    ├── about/
    ├── contact/
    └── hero/
```

---

## Application Layers

### App Layer

The `src/app` directory contains application routes and page-level components.

Examples:

* `/`
* `/about`
* `/projects`
* `/projects/[id]`
* `/projects/add`
* `/contact`

Next.js App Router is responsible for routing between these pages.

---

### Component Layer

Reusable UI components are stored inside `src/components`.

Examples include:

* Navbar
* Buttons
* Project cards
* Add Project form
* Other reusable interface elements

The purpose of this layer is to avoid duplicating UI logic between pages.

---

### Data Layer

Project information is initially defined in:

```text
src/data/projects.ts
```

This provides the initial project dataset used by the application.

---

### State Management Layer

Project state is handled through:

```text
src/Context/ProjectContext.tsx
```

The context provides:

* Project list
* Add project functionality
* Remove project functionality

Components can access the shared project state through the `useProjects` hook.

---

## Project Model

Projects follow a shared TypeScript structure.

A project can contain:

* ID
* Name
* Type
* Category
* Tags
* Description
* Technologies
* Cover image
* Gallery images
* GitHub URL
* Optional case study information

Project types currently include:

```text
professional
learning
```

Optional case study fields include:

```text
problem
whatIDid
whatCameOfIt
```

---

## Project Data Flow

The current project flow is:

```text
Initial Project Data
        ↓
ProjectContext
        ↓
Projects Page
        ↓
Project Card
        ↓
Project Details Page
```

For newly created projects:

```text
Add Project Form
        ↓
ProjectContext
        ↓
localStorage
        ↓
Projects Page
```

---

## Persistence

The current dynamic project system uses browser `localStorage`.

The initial project data comes from:

```text
src/data/projects.ts
```

Projects created through the Add Project interface are stored under:

```text
polarbear-projects
```

This allows projects to remain available after refreshing the browser on the same device.

---

## Client-Side Considerations

Project management currently runs on the client because it depends on:

* React state
* Context API
* Browser localStorage
* Client-side image handling

Uploaded images are converted into Data URLs before being stored.

This approach is suitable for the current personal portfolio stage.

A future backend/database implementation may replace localStorage when persistent multi-device or server-side project management is required.

---

## Design Principles

The project follows several architectural principles:

1. **Reusable components**
2. **Separation of concerns**
3. **Centralized project state**
4. **Type-safe data structures**
5. **Minimal duplication**
6. **Clear routing**
7. **Scalable structure**

The architecture may evolve as new portfolio features are introduced.
