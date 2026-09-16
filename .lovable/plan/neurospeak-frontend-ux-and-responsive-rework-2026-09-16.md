# NeuroSpeak Frontend UX and Responsive Rework

## Goal
Rework the existing NeuroSpeak frontend in place into one calm, accessible, role-aware application shell. Preserve all routes, integrations, authentication behavior, database behavior, and working browser features. No backend, schema, RLS, environment, or API changes.

## Audit Summary

### Highest-impact UX issues
- The current authenticated shell is a fixed 480px mobile column at every viewport, leaving desktop and tablet space unused.
- Fixed top controls and bottom navigation are not safe-area aware and rely on magic padding, so content can overlap or be hidden.
- Several pages use `100vh` or `min-h-screen`; chat also performs its own viewport calculation inside the shell, creating competing scroll containers.
- Page titles, back actions, cards, buttons, forms, and empty states are implemented inconsistently across screens.
- Communicator and caregiver navigation are only partially role-aware; caregiver chat currently renders the communicator shell.
- The communicator home prioritizes emergency and fabricated analytics over the primary communication task.
- The caregiver dashboard leads with hardcoded health/AI metrics rather than connected people and real alert state.
- Notification UI is a hand-built sheet without focus management, complete accessible names, or safe-area sizing.
- Login, signup, profile, and edit forms rely heavily on placeholders instead of persistent labels.
- Many icon buttons are below 44px and have no accessible name or visible keyboard focus.
- Global type scaling can enlarge content without a shell designed to reflow and scroll safely.
- Motion is applied broadly and does not consistently honor reduced-motion preferences.

### Misleading frontend states
The current frontend contains simulated notifications, contacts/messages, presence, alerts, health readings, AI scores, wearable results, location states, and emergency success messages. Since this task cannot add a backend and must not invent data, these areas will be presented as honest empty, unavailable, or pending states unless an existing real source supplies their data. Existing real actions such as speech synthesis, custom phrases, theme settings, haptics, and navigation will remain intact.

## Implementation

### 1. Establish the responsive app foundation
- Replace the fixed mobile frame with a `100dvh`, `min-h-0` app shell.
- Use a persistent labeled sidebar on desktop, a compact rail on tablet, and a safe-area-aware top header plus bottom navigation on mobile.
- Give the shell one dedicated internally scrollable content region; prevent body-level scrolling on authenticated screens.
- Define shared shell dimensions and safe-area variables so navigation never covers content.
- Keep public/auth/onboarding pages responsive without forcing them into a narrow phone frame on wide screens.
- Add `viewport-fit=cover`, correct app metadata, global overflow safeguards, wrapping rules, and reduced-motion CSS.

### 2. Consolidate shared frontend patterns
Create a small set of reusable application components:
- `PageHeader` for titles, descriptions, back navigation, and one contextual action.
- `AppButton`/existing Button variants for primary, secondary, tertiary, destructive, emergency, and icon actions.
- `AppCard`, `SectionHeader`, and `Avatar` for consistent grouping and typography.
- `EmptyState`, `LoadingState`, and `ErrorState` for honest data-dependent states.
- Shared responsive page and section containers.

Refactor repeated patterns without creating a large design-system framework.

### 3. Rework navigation and role presentation
- Keep every existing route path unchanged.
- Communicator navigation: Home, Communicate, Chat, Safety, Profile.
- Caregiver navigation: Dashboard, Connections, Chat, Safety, Profile.
- Reuse existing route destinations and reframe labels/layouts rather than adding unsupported routes.
- Keep notifications accessible from the header while preserving role filtering.
- Mark the active location clearly and ensure all destinations use the correct role shell.
- Replace human-facing “User” labels with “Communicator”; keep internal role values unchanged.

### 4. Rework communicator journeys
- Home: greeting, dominant Communicate action, quick phrases, saved phrases when present, then safety access. Remove fabricated analytics/health claims from the primary view.
- Communication board: persistent composed/current phrase area, large category and phrase targets, visible Type-to-Speak entry, and restrained motion.
- Voice/Type-to-Speak: composed text first, editing support second, large reachable Speak action last; keep speech synthesis intact and keyboard-safe.
- Custom phrases: clearer phrase/category rows, accessible edit/delete actions where already supported, confirmation for deletion, and actionable empty state.
- Safety/tracking: present real permission/location state only; use clear unavailable/denied states instead of simulated live location.

### 5. Rework caregiver journeys
- Dashboard: prioritize connected communicators, important alerts, safety, communication, and available location information.
- Replace fabricated patient metrics, “live” wearable claims, AI confidence, and trends with honest empty/unavailable states unless existing state is real.
- Reframe the current caregiver tracking destination as the role-appropriate Connections/Safety surface while preserving its route.
- Keep AI/emotion/timeline routes, but clearly distinguish unavailable analysis from confirmed results.

### 6. Rework chat, contacts, alerts, and notifications
- Make chat accept the active role and render the correct navigation and terminology.
- Build a familiar list/conversation layout with search, responsive message wrapping, internal message scrolling, and a fixed-in-region composer.
- Remove unsupported call/video/presence/read-state claims and fabricated conversations; preserve actual local send/speech behavior only where meaningful.
- Use role-aware empty contact/conversation states rather than invented people or messages.
- Convert the notification overlay to an accessible Radix/shadcn sheet or dialog with focus trapping, Escape close, labeled controls, internal scrolling, safe-area padding, and non-overlapping mobile/desktop layouts.
- Remove automatic simulated emergency/health notifications and seeded fake alerts; retain the notification state API for real callers.
- Make alert severity use icon, label, and color; provide honest empty state when no real alerts exist.

### 7. Improve profile, settings, forms, and authentication presentation
- Profile: show role-aware identity and settings structure; never label a communicator as “User”. Do not display invented email/phone details.
- Settings: group accessibility, appearance, speech, and account options into clear rows; use proper Switch, segmented controls, and Slider only for existing settings.
- Add visible labels, helper/error placement, focus states, loading/disabled presentation, autocomplete attributes, and keyboard-safe layout to existing forms without changing submit/auth logic.
- Ensure session/role loading surfaces do not flash the wrong dashboard; presentation only, no auth logic changes.

### 8. Normalize visual design and accessibility
- Refine semantic light, dark, and high-contrast tokens for calm teal accents, neutral surfaces, readable borders, restrained shadows, and clear emergency red.
- Remove remote CSS font import and load the existing font safely from the document head.
- Standardize spacing to the 4/8/12/16/20/24/32/40/48 scale and card radius to 8px or less.
- Ensure 44px touch targets, visible `focus-visible` rings, accessible names, semantic headings/landmarks, wrapping for long text, and WCAG-aware contrast.
- Ensure M/L/XL text modes reflow instead of clipping.
- Reduce entrance animation volume; retain brief feedback/continuity motion and respect `prefers-reduced-motion` throughout.

### 9. Screen-by-screen responsive verification
Validate public, onboarding, communicator, caregiver, shared, wearable, and emergency screens at representative widths: 320, 390, 430, 768, 820, 1024, 1280, 1440, and 1920.

Checks include:
- no horizontal overflow;
- no body scroll for authenticated shell screens;
- intentional internal scrolling for long content;
- no fixed-control overlap;
- no clipped enlarged text or buttons;
- safe-area clearance;
- correct role labels and navigation;
- keyboard focus order and overlay behavior;
- dark and high-contrast readability;
- reduced-motion behavior.

## Technical Notes
- Frontend files only; no migrations, policies, functions, generated integration files, environment variables, or backend configuration.
- Existing route URLs remain unchanged.
- Existing real browser functionality remains intact.
- Use existing shadcn/Radix primitives for buttons, switches, sheets/dialogs, focus behavior, and form labels.
- Refactor by shared layout/pattern first, then major task screens, then remaining routes for consistency.
- Run focused tests and the project build after implementation; resolve all frontend TypeScript/build regressions.

## Expected Outcome
NeuroSpeak will behave as one viewport-aware application rather than disconnected mobile pages: efficient on desktop and tablet, safe and reachable on mobile, honest about unavailable data, clearly differentiated by role, and substantially easier to use with large text, high contrast, keyboard navigation, and reduced motion.
