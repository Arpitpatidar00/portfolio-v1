You’re right—what you need is **one clean, unified, zero-duplication skill file** that encodes everything you said without repetition or noise.

Here it is. This is the **final version**—tight, enforceable, and usable.

---

## 🔥 SINGLE SKILL FILE (NO DUPLICATION, CLEAN)

```md
---
name: nextjs-ui-system-enforcer
description: Enforce UI-first architecture, strict TypeScript usage, reusable component patterns, and clean folder structure in Next.js App Router projects using Tailwind CSS.
---

# Next.js UI System Enforcer

## When to use

- Creating or refactoring features
- Reviewing PRs
- Enforcing consistency and scalability

---

# System Rules

## 1. Tech Stack Constraints

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS only
- No UI libraries

---

## 2. Architecture Overview

The system follows strict separation:

- `/app` → entry (server pages only)
- `/modules` → UI sections (main structure)
- `/components` → reusable UI
- `/types` → global types
- `/utils` → reusable functions

---

## 3. App Layer (`/app`)

- Contains only:
  - `page.tsx`
  - `layout.tsx`
- No UI or logic allowed

### Rule:

Only imports modules

---

## 4. Modules Layer (`/modules`)

- Built strictly based on UI sections
- Controls full UI composition

### Example:
```

/modules
/home
/Hero
/Projects
index.tsx

```

---

## 5. UI Structure (Hierarchy-Based)

Each UI section must follow:

```

/Section
index.tsx
/SubSection
index.tsx
Component.tsx

```

### Example:
```

/Projects
index.tsx
/ProjectList
index.tsx
ProjectCard.tsx
/ProjectDetailsPage
index.tsx

````

### Rules:
- Folder = UI block
- Nesting = UI hierarchy
- No flat or mixed structure

---

## 6. Components (`/components`)

- Only reusable components
- Must be used in multiple places

### Examples:
- AppNavbar
- AppSidebar
- AppProfileDialog

### Rule:
If used once → keep inside module

---

## 7. Index File System (MANDATORY)

Every folder must contain:

```ts
export * from "./<file-or-folder>"
````

### Purpose:

- Clean imports
- No deep import paths

---

## 8. Type System (`/types`)

- No `any`
- Types must be centralized and reusable

### Exception:

- Small local props types allowed inline

---

## 9. Utils (`/utils`)

- Only pure reusable functions
- No UI logic
- No side effects

---

## 10. UI Philosophy

Structure must match actual UI:

Section → Subsection → Component

### Good:

```
/Hero
/HeroContent
/HeroCTA
```

### Bad:

```
/misc
/data
/stuff
```

---

## 11. Naming Rules

- PascalCase for folders and components
- Folder name = component name
- No generic names

---

## 12. Violations to Detect

### Structure

- Missing index.ts
- Wrong placement
- Flat hierarchy

### Types

- Usage of `any`
- Non-centralized types

### Architecture

- UI inside `/app`
- Logic inside UI components
- Non-reusable components in `/components`

---

## 13. Output Requirements

When enforcing or auditing:

### Issues

- Categorized: Structure / Types / Architecture

### Severity

- HIGH / MEDIUM / LOW

### Fix

- Exact folder structure
- File movement
- Code-level correction

---

## 14. Non-Negotiable Rules

- `/app` must stay clean
- Modules control UI
- Components must be reusable
- No deep imports
- No `any`

```

---

# ⚠️ Final Reality Check

This is now:
- **Minimal**
- **Non-duplicated**
- **Strict**
- **Actually usable by an agent**

If your codebase doesn’t follow this, the skill will constantly flag issues—which is exactly what you want.

---

If you want to go beyond this:
Next step is not more rules.

👉 It’s building a **repo scanner skill that auto-detects violations from your actual codebase**.
```
