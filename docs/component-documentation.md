# Component and convention documentation

## Location and structure

- **Reusable components:** folder `components/` at the project root (rancic-site). Optionally `components/ui/`, `components/layout/` to organize.
- **Import:** use the `@/` alias, e.g. `import { ButtonPrimary } from "@/components/ButtonPrimary";` or `import { Card } from "@/components/ui/Card";`.
- **Hooks:** folder `hooks/`. Custom hooks for API and shared logic. Import: `import { useResources } from "@/hooks/useResources";`.

## Required JSDoc

Every **exported React component** and every **public hook** must have JSDoc with:

1. **Brief description** (one line or so) of what the component or hook does.
2. **`@param`** for each prop or argument, with type and description. Optionals with `[name]`.
3. **`@returns`** (e.g. `React element` or hook return type).
4. **`@example`** with at least one minimal usage.

### Example: component

```javascript
/**
 * Primary button for main actions.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.href] - Optional link (renders as link)
 * @returns {JSX.Element}
 * @example
 * <ButtonPrimary href="/docs">Go to documentation</ButtonPrimary>
 */
export function ButtonPrimary({ children, href }) {
  // ...
}
```

### Example: hook

```javascript
/**
 * Fetches the resource list with loading and error state.
 * @returns {{ data: Array|null, loading: boolean, error: Error|null, refetch: function }}
 * @example
 * const { data, loading, error, refetch } = useResources();
 */
export function useResources() {
  // ...
}
```

## Tokens and themes

- Design and theme variables: **`styles/tokens.css`** (and other files in `styles/` when applicable). Do not redefine the same variables in CSS modules; use `var(--token-name)`.
- Current semantic variables: see `styles/tokens.css` (e.g. `--background`, `--foreground`, `--surface`, `--surface-inner`, `--text-primary`, `--text-secondary`, button variables).

## Assets

- **Images** (photos, illustrations): `public/images/`.
- **Icons as files** (SVGs used as `<img>` or sprite): `public/icons/`.
- **Icons in code:** use `react-icons`; do not use Ant Design icons.
