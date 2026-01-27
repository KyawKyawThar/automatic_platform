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

## Design & Architectural Patterns

This project follows a collection of modern design patterns and practices to ensure scalability, maintainability, and a high-quality developer experience.

### Architectural Pattern

- **Full-stack Monorepo:** The frontend and backend code reside in a single repository, simplifying development and deployment.
- **Feature-Sliced Design (FSD):** The application is structured around business features (e.g., `src/app/feature/auth`, `src/app/feature/workflows`). This improves modularity and makes the codebase easier to navigate and maintain.
- **Layered Architecture:**
  - **Presentation Layer:** Handled by React components within the Next.js App Router (`src/app` and `src/components`). It distinguishes between Server Components for data fetching and Client Components for interactivity.
  - **API Layer:** Primarily built with tRPC for end-to-end type-safe communication between the client and server.
  - **Data Access Layer:** Managed by Prisma ORM, which provides a type-safe API for database operations.
  - **Background Jobs:** Asynchronous tasks and workflows are handled by Inngest.

### Component & UI Pattern

- **Component-Based Architecture:** Following React's core principles, the UI is built as a composition of reusable components.
- **Atomic Design Principles:**
  - **Atoms:** Basic UI elements are located in `src/components/ui` (e.g., `Button`, `Input`, `Card`).
  - **Molecules & Organisms:** These base components are composed into more complex, feature-specific components inside `src/app/feature/*` and `src/components`.
- **Styling:** The project uses **Tailwind CSS** for utility-first styling, with `clsx` and `tailwind-merge` for managing conditional classes.

### State Management

- **Server State:** Managed by **TanStack Query** (`@tanstack/react-query`), which handles data fetching, caching, and synchronization of server data.
- **Client State:** Primarily managed by local component state (`useState`, `useReducer`) and encapsulated within custom hooks (`src/hooks`) for reusability.
