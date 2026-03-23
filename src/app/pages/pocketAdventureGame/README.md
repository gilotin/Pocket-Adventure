
> ⚠️ This project is currently part of my portfolio repository and will be extracted into a standalone project in the future.

# Pocket Adventure

Pocket Adventure is a browser-based RPG where I build and experiment with game systems like missions, inventory, and progression.

I started it because I wanted something more interesting than a typical app, and it gradually turned into a project where I explore structure, state management, and how a system grows over time.

## Table of Contents

* [Tech Stack](#tech-stack)
* [Purpose](#purpose)
* [Features](#features)
* [Development Focus](#development-focus)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Implemented Features](#implemented-features)
* [Roadmap](#roadmap)
* [Contact](#contact)
<!-- * [Case Study](./CASE_STUDY.md) -->

## Tech Stack

* **React** — component-based UI architecture
* **TypeScript** — type safety and maintainability
* **Vite** — fast development and optimized builds
* **CSS (custom)** — full control over styling and layout
* **Firebase Hosting** — deployment and hosting

## Purpose

This project started as a way to build something more interesting than a typical frontend app.

Over time, it became a place where I experiment with structuring a larger application — from folder organization to system design — and learn how different decisions affect the project as it grows.

The main goal is to improve how I think about problems, architecture, and trade-offs while building something that evolves over time.

> ⚠️ Note: AI tools are used mainly for discussing ideas, debugging, and architecture decisions.

## Features

* **Time-based game loop**
  Asynchronous gameplay with mission progression

* **Accessibility Focused**

  * Semantic HTML structure
  * ARIA attributes
  * Improved keyboard navigation
  * Lighthouse score: ~95 accessibility

* **Performance Optimizations**

  * Fast builds with Vite
  * Optimized asset loading

## Development Focus

* Clean and maintainable component structure
* Strong TypeScript usage
* Accessibility best practices
* Scalable architecture and system design

## Project Structure

```
src/
 └── pocket-adventure/
      ├── components/
      ├── systems/
      ├── services/
      ├── hooks/
      ├── types/
      ├── utils/
      └── styles/
```

## Getting Started

To run this project locally:

Clone the repository and install dependencies:

```
npm install
npm run dev
```

You can also check the live demo:
👉 <https://nikolaytoshev.dev/game>

## Implemented Features

> ⚠️ The project currently runs entirely on the frontend with data persisted locally (localStorage).

* UI system for rendering game state (inventory, missions, character stats)
* Basic authentication flow (frontend-only)
* Local persistence layer (localStorage)
* Inventory management system
* Mission progression system
* Character stats and progression

## Roadmap

*The project will continue evolving with new features and technologies, focusing on expanding both functionality and architectural complexity.*

### Planned Features

* **Testing**
  * Introduce unit tests for core systems (inventory, missions, state logic)  

* **Architecture Improvements**
  * Introduce custom hooks to better separate and reuse logic across components  

* **Responsive Design**
  * Desktop-first layout with consistent experience across devices

* **Backend & Infrastructure**

  * Firebase serverless functions
  * Proper authentication system

* **State Management**

  * Global state handling (Context API → future Zustand/Redux)

* **Game Systems**

  * Crafting
  * Garden
  * Shop
  * Mocked “real” shop (UI themes, cosmetics)

* **UI & UX**

  * Improved interface and interactions
  * Drag-and-drop inventory (React DnD)

* **Content**

  * Profile panel
  * Story and library system

## Contact

Feel free to reach out:

* GitHub: <https://github.com/your-username>
* Email: [your@email.com](mailto:your@email.com)
