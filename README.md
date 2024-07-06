# Sveltekit + Payload CMS Starter Kit

This is a simple boilerplate to get started with Sveltekit & Payload CMS 3.0.

## Features

- [Turborepo](https://turbo.build/repo) for local development
- [Sveltekit](https://kit.svelte.dev/) for frontend (`apps/web`)
  - TypeScript
  - Svelte 5
  - Tailwind CSS & [shadcn-svelte](https://shadcn-svelte.com/)
- [Payload CMS](https://payloadcms.com/) for backend (`apps/cms`)
  - TypeScript
  - Next.js
  - Payload CMS 3.0
- Postgres DB for local development
- Docker Compose for production

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [pnpm](https://pnpm.io/installation)
- [Node.js](https://nodejs.org/en/download/) (>= 20)

### Installation

Clone or fork this repository to your local machine.
Then, run the following commands to install dependencies and start the local development server.

```bash
pnpm install
```

### Development

```bash
pnpm db && pnpm dev
```

### Production Testing

```bash
pnpm prod
```
