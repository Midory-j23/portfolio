# Portfolio

A personal portfolio website built with Next.js, React, and TypeScript. It presents an introduction, background, experience, projects, skills, and contact information in a single-page experience.

## Features

- Hero and navigation sections
- About, experience, projects, and skills sections
- Contact section
- Motion effects with Framer Motion
- Responsive styling with Tailwind CSS

## Tech stack

- [Next.js](https://nextjs.org/) 15
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting started

### Prerequisites

Install a recent version of [Node.js](https://nodejs.org/) and npm.

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run typecheck` — run the TypeScript compiler without emitting files

## Project structure

```text
src/
├── app/          # Next.js app entry point and global styles
├── components/   # Portfolio page sections and UI components
└── data/         # Portfolio content
```

## Customization

Update the components and data under `src/components/` and `src/data/` to personalize the portfolio content. Global styles are in `src/app/globals.css`.
