# Clara

Clara is a lightweight project-first tracking and project management SaaS
designed for agencies and freelance teams.

## Goal
Build a simple, usable MVP to demonstrate:
- multi-tenant architecture
- role-based access
- project & task management
- time tracking

This project is also used as a learning playground for software engineering
and system architecture concepts.

## MVP Scope
Current MVP focuses on core workflows only:
- Authentication (OAuth-ready)
- Workspace & team management
- Projects & tasks
- Time tracking per task

Advanced features (invoice, analytics, AI insights) are intentionally excluded
and planned for future iterations.

## System Overview
- Multi-tenant architecture using Workspaces
- Users can belong to multiple workspaces
- Roles are scoped per workspace

## Database Design (MVP)
Main entities:
- Users
- Auth_Users
- Workspaces
- Workspace_Members
- Projects
- Tasks
- Time_Logs
- Milestones
- Invitations

The database is intentionally kept minimal to allow fast iteration
and future extensibility.

## Design Decisions
- Separate authentication and domain user data
- Workspace-based role management
- Minimal schema to support solo development
- Design for extension, not over-engineering

## Future Roadmap
- Client management
- Invoicing
- Advanced reporting & analytics
- AI-powered insights
- Enterprise-level permissions

## Tech Stack
- Frontend: Next.js, TypeScript
- Backend: Nest.js (TypeScript)
- Database: PostgreSQL, Redis
- ORM: Prisma
- Auth: OAuth + JWT

## Notes
This project prioritizes clarity, simplicity, and real-world usability
over premature enterprise complexity.