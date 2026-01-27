# Automatic Platform

This is a web application built with a modern tech stack.

## Tech Stack

### Frameworks & Libraries

- **[Next.js](https://nextjs.org/):** The React framework for production.
- **[React](https://react.dev/):** A JavaScript library for building user interfaces.
- **[tRPC](https://trpc.io/):** End-to-end typesafe APIs made easy.
- **[Prisma](https://www.prisma.io/):** Next-generation ORM for Node.js and TypeScript.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
- **[Radix UI](https://www.radix-ui.com/):** Unstyled, accessible components for building high-quality design systems.
- **[shadcn/ui](https://ui.shadcn.com/):** Re-usable components built using Radix UI and Tailwind CSS.
- **[TanStack Query](https://tanstack.com/query/latest):** Powerful asynchronous state management for TS/JS, React.
- **[Inngest](https://www.inngest.com/):** The developer platform for durable functions.
- **[Sentry](https://sentry.io/):** Application monitoring and error tracking software.
- **[AI SDK](https://sdk.vercel.ai/):** An open-source library for building AI-powered user interfaces.

### Key Dependencies

- `@polar-sh/better-auth`: For authentication.
- `react-hook-form` & `zod`: For robust and type-safe forms.
- `lucide-react`: For icons.
- `recharts`: For charts.
- `sonner`: For toast notifications.
- `embla-carousel-react`: For carousels.
- `vaul`: For drawers.

### Dev Dependencies & Tooling

- **[TypeScript](https://www.typescriptlang.org/):** Typed JavaScript at scale.
- **[Biome](https://biomejs.dev/):** A toolchain for web projects, designed to replace Babel, ESLint, webpack, Prettier, Jest, and others.
- **[PostgreSQL](https://www.postgresql.org/):** The World's Most Advanced Open Source Relational Database.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Set up your environment variables:**
    Create a `.env` file and add the necessary environment variables.

3.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Available Scripts

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts a production server.
- `lint`: Lints the codebase using Biome.
- `ingest`: Starts the Inngest development server.
- `format`: Formats the code using Prettier.
- `dev:all`: Runs all development processes using mprocs.
