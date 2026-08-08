# Plan: Artifacts Page Refactor

**Source PRD**: None (Direct Refactor)
**Selected Milestone**: Refactor
**Complexity**: Low

## Summary
The current `page.tsx` is a monolithic Client Component (`"use client"`) that handles state, data fetching (via `useEffect`), and UI rendering all at once. Based on `react-patterns.md` and Next.js App Router best practices, we will establish clear boundaries, separate concerns, and improve maintainability by separating Server/Client components, extracting sub-components, and isolating side-effects into custom hooks.

## Patterns to Mirror
| Category | Source | Pattern |
|---|---|---|
| Boundaries | `react-patterns.md` | Server/Client Component Boundary (Keep `page.tsx` as Server Component, move client logic to `ArtifactsClient.tsx`) |
| Composition | `frontend-patterns.md` | Component Composition (Extract Alert and Grid sections into Presentational components) |
| Hooks | `frontend-patterns.md` | Custom Hooks for side effects (Extract `useEffect` fetching into a `useArtifactData` hook) |

## Files to Change
| File | Action | Why |
|---|---|---|
| `web/app/artifacts/page.tsx` | UPDATE | Remove `"use client"`. Make it a Server Component that renders `<ArtifactsClient />`. |
| `web/components/features/artifacts/ArtifactsClient.tsx` | CREATE | Contains all client-side logic (`useUserStore`, fetching, interactivity) shifted from the page. |

## Tasks
### Task 1: Create Client Component (`ArtifactsClient.tsx`)
- **Action**: Move all client-side layout and logic from `page.tsx` into `ArtifactsClient.tsx`.
- **Mirror**: Client Component pattern (`"use client"`).
- **Validate**: Component compiles successfully.

### Task 2: Sub-component & Hook Extraction
- **Action**: Inside `ArtifactsClient.tsx` (or adjacent files), extract the `ProfileRequiredAlert` and the `DeepLifeInsights` grid into functional components. Create a `useArtifactsInit` hook for the data-fetching `useEffect`.
- **Mirror**: Composition over inheritance & custom hooks.
- **Validate**: UI renders correctly without monolithic bloat.

### Task 3: Refactor Server Page (`page.tsx`)
- **Action**: Clean `page.tsx` to only import and render `<ArtifactsClient />` without `"use client"`.
- **Mirror**: Server Component default pattern.
- **Validate**: `pnpm dev` shows no Next.js boundary errors.

## Validation
```bash
# Verify there are no typescript or build errors
pnpm run build
```

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|
| Import path mismatches when moving code | Low | Rely on TypeScript and IDE feedback to fix imports immediately. |

## Acceptance
- [ ] All tasks complete
- [ ] Validation passes
- [ ] Patterns mirrored, not reinvented
