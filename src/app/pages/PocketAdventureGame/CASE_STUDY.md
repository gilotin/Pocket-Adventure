## Case Study

*This section focuses on the decisions made during development and what I learned while building the project.*

---

### Problem

I wanted to build something more interactive than a typical frontend project. Instead of building another e-commerce or content-based app, I chose to focus on systems that evolve over time.

---

### Goal

* Build a small game-like application in the browser
* Practice structuring a growing project
* Understand how different parts of the app share and update state
* Improve problem-solving and analytical thinking

---

### Approach

I started by building simple systems (inventory, missions, character stats) and connecting them to the UI.

Instead of focusing only on visuals, I tried to keep logic separated and reusable by organizing code into folders like systems, services, and hooks.

---

### State & Data

The app is currently frontend-only, with data stored in localStorage.
This allowed me to focus on how the UI reacts to state changes without dealing with backend complexity yet.

---

### Key Decisions

#### State Management (Current Approach)

State is currently managed locally within components and persisted using localStorage.

At this stage, this keeps the application simple and easy to follow. I can track how data flows without introducing additional abstraction.

I considered using a state management library like Zustand, but decided not to introduce it yet, since the current structure is still manageable.

This is something I plan to revisit as the project grows and state becomes harder to maintain.

---

The project currently runs entirely on the frontend, with no real backend.

This decision allows me to focus on UI behavior, state management, and system interactions before introducing additional complexity.

Later, I plan to integrate Firebase for backend services and eventually build a custom backend to gain deeper understanding of server-side architecture.

---

#### Project Structure

The project is organized into modules such as systems and services to separate logic from UI.

This makes the codebase easier to navigate and prepares it for future growth. As the project evolves, I plan to introduce custom hooks to better encapsulate reusable logic.

---

### What I Learned

* Structuring the project early helps avoid confusion later
* Even simple features become complex when they interact with each other
* Keeping state consistent across different parts of the app is harder than expected
* Understanding component responsibilities and how data flows between them
