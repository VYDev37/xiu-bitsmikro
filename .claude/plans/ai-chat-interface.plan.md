# Plan: AI Chat Interface

**Source PRD**: .claude/prds/bazi-ai-viewer.prd.md
**Selected Milestone**: 4 (AI Chat Interface)
**Complexity**: Medium

## Summary
Implement a real-time AI Chat interface where users can query the celestial engine based on their BaZi and Wuxing logic. The frontend will be a sleek, dark-tech Chat UI matching the `brandkit` guidelines. The backend will integrate with Gemini 3.1 Flash Lite using the exact JSON payload format (`action: "ASK_ANY"`) mandated by `prompt.txt`.

## User Review Required
> [!IMPORTANT]
> The `prompt.txt` enforces a strict JSON output (`action: "ASK_ANY"`). This means the AI won't behave like a standard unstructured chatbot (e.g. streaming text). Instead, it will return a structured JSON response containing `personal_analysis`, `direct_answer`, and `dynamic_question_answer`. 
> 
> **Design Decision**: The chat UI will display the user's message normally. When the AI responds, it will display the `dynamic_question_answer` or `direct_answer` field as the chat bubble. To preserve conversational memory, the frontend will serialize previous chat history and append it into the `dynamic_question` field sent to the backend. Is this acceptable?

## Patterns to Mirror
| Category | Source | Pattern |
|---|---|---|
| Naming | `web/app/api/luck/route.ts` | Backend API using Next.js App Router API route format (`GET/POST`). |
| Data access | `web/app/api/luck/route.ts` | Retrieving session via `getSession()`, fetching user via `db.select().from(users).where(eq(users.id, session.userId))`. |
| Errors | `web/app/api/luck/route.ts` | Wrapping AI calls in try/catch and returning `{ error: message }` with appropriate HTTP status. |
| AI Integration | `web/app/api/luck/route.ts` | Using `@google/genai` with `systemInstruction` loaded from `prompt.txt` and `responseMimeType: 'application/json'`. |

## Files to Change
| File | Action | Why |
|---|---|---|
| `web/app/api/chat/route.ts` | CREATE | Backend endpoint to process chat requests, format the JSON payload, and call Gemini API. |
| `web/app/chat/page.tsx` | CREATE | Frontend chat page layout and server component wrapper. |
| `web/app/chat/ChatClient.tsx` | CREATE | Interactive client component for the chat interface (messages, input, loading state). |
| `web/components/ui/chat-message.tsx` | CREATE | Reusable chat message bubble component styled according to `brandkit` (Dark Developer/Builder theme). |
| `.claude/prds/bazi-ai-viewer.prd.md` | UPDATE | Mark Milestone 4 as `in-progress` and link this plan. |

## Tasks
### Task 1: Create Backend API Route (`/api/chat`)
- **Action**: Create `POST` handler that takes `{ message: string, history: {role, content}[] }`. Validate session, fetch user birth data. Format the payload as `{ action: "ASK_ANY", user_a: {...}, current_date, dynamic_question: ... }`. Inject history into `dynamic_question` for context. Call Gemini and parse the JSON.
- **Mirror**: `web/app/api/luck/route.ts`

### Task 2: Create Chat UI Components
- **Action**: Implement `ChatClient.tsx` with a scrollable message list and fixed bottom input bar. Style it with deep indigo glassmorphism (`bg-white/[0.02]`, monospace accents, subtle glow) based on `brandkit`.
- **Mirror**: `ui-ux-pro-max` Dark Developer mode.

### Task 3: Integrate and Test
- **Action**: Wire the frontend to the backend `/api/chat`. Handle loading states, error toasts, and smooth scroll-to-bottom behavior.

## Validation
```bash
# Ensure it builds
pnpm build

# Ensure no lint errors
pnpm lint
```

## Risks
| Risk | Likelihood | Mitigation |
|---|---|---|
| Gemini JSON parsing fails | Medium | Add robust error handling and regex cleanup for markdown backticks (like in `luck/route.ts`). |
| Chat history gets too large | Low | Slice history to the last 5-10 messages before sending to API. |

## Acceptance
- [ ] All tasks complete
- [ ] Validation passes
- [ ] Patterns mirrored, not reinvented
