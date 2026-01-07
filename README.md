# Study Timer ⏱️

This web app is for tracking the amount of time a student has spent, studying or working on assignments. 
This project was built to visualize workflow. Knowing how long something takes can help with knowing when to start to meet a deadline. 


---

## Overview

Study Timer allows users to log their start and stop time for study sessions. The user can also log what activity they are doing it for. 
All data is stored locally in the browser, allowing the app to function without a backend.

---

## Features

- Start / stop timer to record study sessions
- breaks can also be logged
- shows elapsed time spent on breaks and studying 
- Persistent storage using IndexedDB 
- View and copy/download study logs
- Simple, distraction-free UI optimized for focus

---

## Tech Stack

**Frontend**
- React (functional components, hooks)
- JavaScript (ES6+)
- HTML5 / CSS3

**Storage**
- IndexedDB (via custom wrapper functions)

**Tooling**
- Vite (development & build)
- Git & GitHub (version control)

---

## How It Works

1. User starts a study session using the timer
2. Session duration and metadata are recorded when the timer stops
3. Session data is persisted locally using IndexedDB
4. Logged sessions are displayed in the UI and can be copied or exported
5. Data remains available across page refreshes without requiring a backend

This architecture keeps the app fast, offline-capable, and privacy-friendly.

---

## Why This Project

This project focuses on:

- Real-world frontend state management
- Client-side data persistence without a server
- Designing features around actual user behavior
- Building a complete, usable product rather than isolated components


## Getting Started

```bash
git clone https://github.com/Mystt09/Study-Timer.git
cd study-timer
npm install
npm run dev

