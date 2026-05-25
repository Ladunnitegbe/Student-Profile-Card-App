# Student-Profile-Card-App
Solution to KODECAMP 6.0 — STAGE 2 PROMOTIONAL TASKS

# KodeCamp 6.0 — Student Dashboard

Solution  to React Task 2

A React-based student dashboard that displays enrolled students, their performance scores, skill sets, and status — built with a component-driven architecture.

---

## Project Structure

```
src/
├── components/
│   ├── Badge.jsx
│   ├── Header.jsx
│   ├── StatBar.jsx
│   ├── StudentCard.jsx
│   └── StudentList.jsx
├── App.jsx
└── App.css
```

---

## Architectural Approach

### Component-Driven Design

The UI is broken into small, single-responsibility components that compose together to build the full dashboard. Each component receives data via props and is responsible for one discrete piece of the UI.

```
App
 └── Header
 └── StudentList
      └── StudentCard (×n)
           ├── Badge (track)
           ├── Badge (status)
           ├── Badge (grade)
           └── StatBar
```

### Data Flow

All student data is in `App.jsx` as a static array. Before rendering, `App` works on each student object with a computed `grade` field using a `getGrade()` helper, then passes the updated array down to child components via props — keeping data transformation logic in one place.

```jsx
// Grade computed once in App, passed down to children
const updatedStudents = students.map((student) => ({
  ...student,
  grade: getGrade(student.score),
}));
```

The class average is also derived in `App` using `Array.reduce()` and passed to the `Header` component.

---

## Component Breakdown

### `App.jsx`
The root component. Holds the student dataset, computes derived values (average score, grades), and renders the top-level layout by composing `Header` and `StudentList`.

### `Header.jsx`
A presentational component that displays the dashboard title, total student count, and class average. Receives all three as props. Uses `.toFixed(1)` to format the average to one decimal place.

### `StudentList.jsx`
Receives the enriched student array and maps over it to render a `StudentCard` for each student. Handles the empty-state case (`students.length === 0`). Also accepts a `children` prop, which `App` uses to render a footer note below the grid.

### `StudentCard.jsx`
The most feature-rich component. Destructures the full student object from its `student` prop and renders:
- An avatar image
- Full name
- Three `Badge` components (track, active status, grade)
- A `StatBar` for the score
- A skills list (with a fallback message for students with no skills)
- A conditional `inactive` CSS class when `isActive` is `false`

### `Badge.jsx`
A small, reusable label component. Accepts a `label` string and a `type` string (`"track"`, `"status"`, or `"grade"`). The `type` determines the CSS class applied, which controls the background color. Defaults to `"track"` if no type is provided.

### `StatBar.jsx`
Renders a labelled progress bar for a numeric score. The fill color changes dynamically based on the score value:
- **Green** (`#4caf50`) — score ≥ 80
- **Orange** (`#ff9800`) — score ≥ 60
- **Red** (`#f44336`) — score < 60

Color logic uses a ternary chain, and the bar width is set via an inline `style` prop (`width: ${score}%`).

---

## Styling Approach

All styles are in a single global `App.css` file. Key patterns:

- **CSS class variants** — components use dynamic `className` strings (e.g. `badge-${type}`, `student-card ${!isActive ? "inactive" : ""}`) to apply different visual states without conditional style objects.
- **Responsive grid** — the student cards use `display: grid` with `repeat(auto-fit, minmax(260px, 1fr))` so the layout adjusts to available screen width with no media queries.
- **Inactive state** — inactive student cards receive a reduced opacity and a red border via the `.student-card.inactive` selector.

---

## Key Patterns Used

| Pattern | Where Used |
|---|---|
| Props destructuring | `StudentCard`, `Header`, `StudentList` |
| Derived state (no `useState`) | Grade and average computed in `App` |
| Array `.map()` for rendering | `StudentList`, `App` |
| Conditional rendering | Skills list fallback, inactive card state |
| `children` prop | `StudentList` renders a footer passed from `App` |
| Dynamic `className` | `StudentCard` (inactive), `Badge` (type variants) |
| Inline styles | `StatBar` fill width and color |
| Default prop values | `Badge` (`type="track"`), `StudentList` (`title="All Students"`) |
