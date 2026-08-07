# Plan: Today's Luck

**Source PRD**: c:\Users\vince\Downloads\projek-trio-darksistem\.claude\prds\bazi-ai-viewer.prd.md
**Selected Milestone**: Today's Luck
**Complexity**: Medium

## Summary
Implement the "Today's Luck" dashboard where authenticated users can view a personalized daily metaphysics reading based on their birth date and time. This will fetch user data from the database, call an AI provider (Gemini 3.0 Flash) to generate the reading using `prompt.txt`, and display it in a high-end oceanic themed UI.

## Patterns to Mirror
| Category | Source | Pattern |
|---|---|---|
| Naming | `web/components/forms/ProfileForm.tsx` | PascalCase for components, descriptive form names |
| Data Access | `web/app/api/user/route.ts` | Drizzle ORM queries using `db.select().from(users).where(eq(users.id, session.userId))` |
| Error Handling | `web/app/api/user/route.ts` | Return standard `NextResponse.json({ error: 'message' }, { status: ... })` |
| UI/UX | `web/components/ui/SpotlightCard.tsx` | High-end, glassmorphism, glowing borders for the luck display card |
| Tests | N/A | No existing testing pattern found; will rely on manual testing |

## Files to Change
| File | Action | Why |
|---|---|---|
| `web/app/dashboard/page.tsx` | CREATE | Main page for "Today's Luck" dashboard |
| `web/app/api/luck/route.ts` | CREATE | API endpoint to fetch user data and generate the daily reading |
| `web/components/features/LuckDisplay.tsx` | CREATE | Component to visually present the AI reading with oceanic theme |

## Tasks
### Task 1: Create Dashboard Route & UI
- **Action**: Create `web/app/dashboard/page.tsx` and `web/components/features/LuckDisplay.tsx`.
- **Mirror**: Follow `ProfileForm.tsx` and `SpotlightCard.tsx` styles.
- **Validate**: Navigate to `/dashboard` and confirm layout renders.

### Task 2: Implement Luck Generation API
- **Action**: Create `web/app/api/luck/route.ts` that retrieves the user's birth info, uses it to prompt Gemini (following `prompt.txt`), and returns the daily reading.
- **Mirror**: Follow the authentication and error handling patterns in `web/app/api/user/route.ts`.
- **Validate**: Call `/api/luck` via curl or browser to receive a JSON reading.

### Task 3: Integrate API with Dashboard
- **Action**: Connect `LuckDisplay.tsx` to fetch from `/api/luck` and render the response elegantly. Add loading states (e.g., starry sky animations).
- **Mirror**: Standard React `useEffect` data fetching or React Query if available.
- **Validate**: Log in, visit `/dashboard`, wait for the AI to generate luck, and view the final UI.

## Validation
```bash
# Verify the API route functions
curl -X GET http://localhost:3000/api/luck -H "Cookie: bazi-auth-session=..."
# Run the Next.js dev server and check for type errors
pnpm run dev
```

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|
| High API Latency | High | Display a visually appealing loading animation (like `DynamicStarrySky`) while waiting for the Gemini API response. |
| Hallucinations | Low | Use strict system instructions (as per `prompt.txt`) to restrict Gemini from outputting generic astrology. |
| Rate Limits | Medium | Cache the daily reading in the database so the AI is only queried once per day per user. |

## Acceptance
- [x] All tasks complete
- [x] Validation passes
- [x] Patterns mirrored, not reinvented
- [x] Users can successfully read their daily luck after logging in

> [!IMPORTANT]
> **Open Question**: Should we cache the daily luck in the database to prevent querying the AI multiple times if the user refreshes the page on the same day? (Highly recommended to save tokens).
= Ofcourse, to make sure it's consistency!
