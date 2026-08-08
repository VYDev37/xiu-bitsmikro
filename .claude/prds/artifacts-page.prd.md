# Artifacts Page (Dashboard Insight)

## Problem
Users currently only receive fragmented daily readings and lack a cohesive "big picture" view of their lives (e.g., career trajectories, romantic compatibility). This forces them to repeatedly prompt the chat for answers, which can yield inconsistent or hallucinated responses across sessions.

## Evidence
- Based on observed behavior, this is a common FAQ. Users frequently attempt to hack the chat to get this broad life information, even outside of this specific app.
- Competitors lack this integrated concept, presenting an opportunity for differentiation.

## Users
- **Primary**: Engaged users who have already seen their daily luck but want deeper, stable, long-term life insights.
- **Not for**: Users who just want a quick daily check-in without deeper analysis.

## Hypothesis
We believe **an interactive Artifacts Page (Dashboard Insight)** will **solve the fragmented reading problem** for **users wanting big-picture insights**.
We'll know we're right when **users frequently view these cards and ask fewer repetitive FAQ questions in the chat**.

## Success Metrics
| Metric | Target | How measured |
|---|---|---|
| Chat FAQ Frequency | Decrease | Analytics on chat topics |
| Dashboard Engagement | High | Page views and card expansions |

## Scope
**MVP** — 
- A monthly interactive calendar that highlights favorable/unfavorable dates in a single API call per month.
- A Notes Panel that updates on calendar tap (showing reason, favorable status, what to do, what to prevent).
- 6 lazy-loaded AI insight cards: Love, Career, Recommended Path, Wealth, Relationship, Compatibility (needs 2nd DOB).
- Database persistence for saved notes.
- Expanding the AI prompt schema in `data/prompt.txt` without breaking the existing BaZi schema.

**Out of scope**
- Social media sharing or PDF exports.
- Multi-user complex chat sessions (Compatibility will just be a static card requiring a second DOB).

## Delivery Milestones
<!-- Business outcomes, not engineering tasks. /plan turns each into a plan. -->
<!-- Status: pending | in-progress | complete -->

| # | Milestone | Outcome | Status | Plan |
|---|---|---|---|---|
| 1 | Database & Schema Extension | DB tables for notes/cards and safe `prompt.txt` JSON schema updates | pending | — |
| 2 | Calendar Widget & API | AI generates monthly date highlights in 1 call, UI renders calendar | pending | — |
| 3 | Notes Panel & DB Persistence | Tapping dates shows detailed advice, saving notes to DB | pending | — |
| 4 | 6 Lazy-Loaded Insight Cards | Components for Love, Career, Path, Wealth, Relationship, Compatibility | pending | — |
| 5 | Page Assembly & Polish | Artifacts Page layout, responsive UI, animations | pending | — |

## Open Questions
- [ ] How many dates per month should the AI return to prevent token bloat while still providing enough highlights?

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| JSON Schema Breakage | High | High | Append new optional keys to the prompt safely, test rigorously with Zod. |
| Token Limits on Monthly Call | Medium | Medium | Restrict the calendar AI response to max 10 dates per month. |

---
*Status: DRAFT — requirements only. Implementation planning pending via /plan.*
