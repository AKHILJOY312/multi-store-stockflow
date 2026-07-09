# Multi-Store Stock Movement (MERN)

## Overview
Build a small full-stack web application (MongoDB, Express, React, Node) to manage product stock across multiple stores. The app is intentionally small in terms of screens — we are interested in how correctly you handle stock updates and transfers, not in how much UI you build.

**Scope:** roughly 4–6 hours of work.
**Deadline:** 3 days from receipt.

## Roles
- **Admin:** manages products and stock — can adjust a product's stock in a store and transfer stock between stores.
- **Shopper:** can view products and the stock available at each store. Cannot change stock.

## What It Does
- An admin creates products (name, unique SKU) and stores.
- Stock is tracked per product, per store.
- Two stock operations, both admin-only:
  1. **Adjust** — change the quantity of a product at one store (e.g. restock +50, or correct −5).
  2. **Transfer** — move a quantity of a product from one store to another. The source store must have enough stock; the transfer must decrement the source and increment the destination as a single, all-or-nothing operation.
- A shopper browses products and sees stock levels per store (read-only).

## Requirements
- **Auth & roles:** register/login with JWT; passwords must be securely hashed. Every stock-changing endpoint must reject non-admins. Viewing products/stock is allowed for any logged-in user.
- **Stock must never go negative** — an adjustment or transfer must never drive a store's stock below zero, even when two admins act on the last units at the same time. This must be enforced reliably at the data layer, not with a read-then-write check in application code.
- **Transfers must be atomic** — a transfer must never remove stock from the source without adding it to the destination (or vice versa). It fully succeeds or fully fails, even on error. Explain how you guarantee this in your `DESIGN.md`.
- **SKU uniqueness** must be guaranteed at the data layer.
- **Server-side validation:** reject non-positive transfer quantities, transfers to the same store, adjustments/transfers against a non-existent product or store, and transfers exceeding available source stock — each with an appropriate HTTP status code and a structured JSON error.
- **Low-stock filter:** listing stock supports filtering to entries at or below a given threshold (passed as a query parameter), computed on the backend.
- Sensible project structure (routes / controllers / services / models), configuration via environment variables (provide a `.env.example`, never commit real secrets), a consistent error format, and the app must run locally from a clean clone.

## Frontend (Minimal, Functional)
A working UI is required; polish is secondary to correctness.
- **Admin:** create products and stores, adjust stock, transfer stock between stores, and see updated per-store levels.
- **Shopper:** browse products and per-store stock, read-only.

Clean and usable is enough — please do not spend time on visual design at the expense of the backend.

## What to Deliver
Submit a link to a **public Git repository** (GitHub/GitLab) containing:

1. **Source code** for the backend and frontend.
2. **A meaningful Git history** — incremental, logically-scoped commits with clear messages, rather than a single commit. Your commit history is part of the assessment.
3. **`README.md`** — prerequisites; exact setup and run instructions for the backend, frontend, and database (including any seeding); required environment variables (with a `.env.example`); how to run the tests; and any assumptions or trade-offs you made.
4. **API specification** — a complete OpenAPI (Swagger) 3.x document (`openapi.yaml` or `openapi.json`) describing every endpoint: paths, methods, request/response schemas, authentication requirements, and status codes.
5. **`DESIGN.md`** (about half a page) — your data model, how you keep stock from going negative under concurrent requests, and how you make transfers atomic.
6. **Automated tests** for the core logic — at minimum: the never-negative guarantee (ideally a test that issues concurrent requests), a correct end-to-end transfer, and rejection of a transfer that exceeds available stock.

## How to Submit
Reply with the public repository link before the deadline. Please make sure the repository is accessible and that the app sets up and runs from a clean clone using only your README.

Shortlisted candidates will be invited to a short technical call to walk us through the code and design decisions, and to make a small live change.

---

## ⚠️ Important — Individual Work Only

**This assignment must be completed entirely by you, without the use of AI coding assistants or code-generation tools of any kind** (including but not limited to ChatGPT, Claude, GitHub Copilot, Gemini, Cursor, or similar).

**Any submission found to have used such tools will be disqualified immediately, without further review or discussion.** The purpose of this exercise is to assess your own reasoning and coding ability. In the follow-up call you will be asked to explain and modify any part of your submission on the spot; an inability to do so will be treated as a violation of this rule.

By submitting, you confirm that all work is your own.
