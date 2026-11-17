# Approval Card

A human-in-the-loop approval card for React: **one question at a time**, the stack slides vertically as you move between questions, the card height animates to fit, the step counter rolls like an odometer, and the footer uses pill actions (a quiet **Skip** and an accent **Continue**).

Single-choice questions auto-advance; multi-select questions wait for an explicit Continue. Every question also accepts a free-text "something else" answer.

![preview](docs/preview.png)

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Build a static bundle:

```bash
npm run build    # outputs dist/
npm run preview
```

## What's in here

```
src/
├── components/
│   ├── ApprovalCard.tsx          # the card itself
│   ├── atoms/Button.tsx          # pill button (accent / ghost)
│   └── primitives/GlideMenu.tsx  # menu with one gliding highlight plate
├── index.css                     # design tokens + keyframes
├── App.tsx                       # demo harness
└── main.tsx
```

`ApprovalCard.tsx` is the component under review and is kept as close to the original as possible. `Button` and `GlideMenu` were written to satisfy its imports; `index.css` supplies the design tokens it references (`surface`, `canvas`, `ink`, `hover`, `accent`, `shadow-card`, `rounded-card`, …).

## Props

```ts
type ApprovalQuestion = {
  q: string;
  type: "radio" | "check";
  options: string[];
};

<ApprovalCard
  questions={questions}              // defaults to the 3-question ice-cream demo
  labels={{ skip, continue, send, customPlaceholder, sentMessage }}
  onSubmitted={(answers) => {}}      // Record<questionIndex, optionIndexes>
  onAnswerChange={(qi, answer) => {}} // fires on every toggle
  resettable={true}                  // show "Start over" after sending
/>
```

Answers are returned as `Record<number, number[]>` keyed by question index, holding the selected option indexes. Free-text answers are tracked separately inside the card and are not currently part of `onSubmitted` — wire that up if you need them.

## Implementation notes

Three details are worth calling out, because they are the parts that make the card feel right:

1. **Height animation without measuring every question.** Each question is a row in a flex column with a fixed gap. The card measures the active question's `offsetHeight` and `offsetTop`, then clips the viewport to that height and translates the column by `-offsetTop`. One measurement drives both the height and the slide, so the two stay in sync and the gap is accounted for.
2. **No flash on mount.** Before the first measurement, only the active question is mounted. If all questions mounted immediately the card would briefly render at full stacked height and then shrink.
3. **The odometer is per character.** `RollingDigits` splits the value into characters and animates only the ones that changed, using a two-cell vertical strip per digit. It also picks the direction from the numeric delta, so going back rolls downward.

`prefers-reduced-motion` is respected: the height and slide transitions are disabled, and only the state changes remain.

## Theming

All colors, radii and shadows live in the `@theme` block of `src/index.css`. Change them there and the whole card follows — nothing is hardcoded in the component.

Note the `--line-strong` alias at the top of that file: the component is written against the web-style token name `var(--line-strong)`, while Tailwind v4 exposes the same value as `--color-line-strong`. Both are kept in sync so the inline styles resolve.

## Accessibility

- The question is the heading of the card, and the question region is `aria-live="polite"`.
- Inactive questions are `aria-hidden` and their controls are `tabIndex={-1}`, so tab order only walks the visible question.
- Options use `aria-pressed`; the checkbox/radio marker is decorative and the label text carries the meaning.
- Keyboard: Enter submits the free-text answer, and the footer arrows step backward and forward.

## License

MIT — add a `LICENSE` file if you plan to publish this as a package.
