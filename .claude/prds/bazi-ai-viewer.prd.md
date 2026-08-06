# BaZi AI Viewer

## Problem
Young professionals and couples want personalized, accurate Chinese metaphysics readings (BaZi, Wuxing, Xiu) but find traditional charts too confusing to interpret and professional masters too expensive. Existing platforms fail to provide accurate, hybrid system analysis and often generate generic, horoscope-like answers.

## Evidence
- Backtested data against existing platforms shows they fail to generate expected answers compared to manual calculations.
- Manual testing of the hybrid prompt formula achieved 3/3 accuracy.

## Users
- **Primary**: Young professionals interested in modern metaphysics, couples checking compatibility, and individuals wanting daily luck insights or personal answers.
- **Not for**: Users seeking traditional manual chart calculations or those unwilling to provide birth date/time.

## Hypothesis
We believe **an AI-powered hybrid BaZi+Wuxing+Xiu viewer** will **solve the pain of confusing/expensive readings** for **young professionals**.
We'll know we're right when **users actively engage with the chat and daily luck features**.

## Success Metrics
| Metric | Target | How measured |
|---|---|---|
| User Engagement | TBD | Daily Active Users checking "Today's Luck" |
| Chat Usage | TBD | Number of questions asked in AI chat per user |

## Scope
**MVP** — 
- Register and Login pages.
- User Profile (Full Name, Birthday full date, Birthday hour HH:MM in 24-hour format).
- Today's Luck dashboard.
- Chat interface with AI (using `prompt.txt`).
- High-end UI/UX theme inspired by `testing-project/index.html`, utilizing `ui-ux-pro-max` and `brandkit` skills.

**Out of scope**
- Payment gateway / Monetization.

## Delivery Milestones
| # | Milestone | Outcome | Status | Plan |
|---|---|---|---|---|
| 1 | Auth & Profile | Users can register, login, and input birth data | in-progress | [implementation_plan.md](../../.gemini/antigravity-ide/brain/7b216406-e303-4dd5-9b84-be6f189462e0/implementation_plan.md) |
| 2 | Core Layout | High-end oceanic theme and navbar applied | pending | — |
| 3 | Today's Luck | Users can view their daily luck | pending | — |
| 4 | AI Chat Interface | Users can query the AI engine | pending | — |

## Open Questions
- [ ] What AI provider will be used for the backend chat integration?
= Gemini 3.0 Flash

## Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Prompt token limit | Medium | High | Optimize context sent to the LLM |
| Hallucination | Low | High | Strict JSON output parsing and system prompts |

---
*Status: DRAFT — requirements only. Implementation planning pending via /plan.*
