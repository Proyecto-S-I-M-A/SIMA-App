---
name: sima-app
description: "Guidelines for SIMA-App development: Expo/React Native/TypeScript stack, API queries in lib, components in components, custom hooks for page logic, and theme usage from constants. Use when adding screens, components, hooks, or backend calls."
---

# SIMA-App Development Guide

## When to Use
- Adding or updating screens and page logic
- Creating new components
- Adding backend/API requests
- Ensuring consistent theming

## Technologies to Consider
- Expo + React Native
- TypeScript
- Expo Router (app/ structure)
- ESLint config in eslint.config.js

## Project Rules
1. Backend requests: create or update query modules under lib/ (and lib/api/ when it fits).
2. New UI pieces: add a new folder under components/ with Component.tsx and style.ts.
3. Page-specific logic: create or extend custom hooks under hooks/ (e.g., useHome.ts).
4. Theming: always use styles and colors from constants/theme.ts.

## Conventions for Data Queries
- Use lib/api/ for domain-specific queries (e.g., QueryUsuario.ts), and lib/ for shared helpers.
- Name query files as Query<Domain>.ts and export clear functions (no default export).
- Keep API URLs and headers centralized in lib/apiClient.ts and config/ApiConfig.ts.
- Prefer returning typed models from types/.

### Query Template (lib/api/QueryExample.ts)
```ts
import { apiClient } from "../apiClient";
import type { Example } from "../../types/Example";

export async function fetchExamples(): Promise<Example[]> {
	const response = await apiClient.get<Example[]>("/examples");
	return response.data;
}
```

### Query Usage (hook)
```ts
import { useEffect, useState } from "react";
import { fetchExamples } from "../lib/api/QueryExample";
import type { Example } from "../types/Example";

export function useExamples() {
	const [data, setData] = useState<Example[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		fetchExamples()
			.then((items) => {
				if (isMounted) {
					setData(items);
				}
			})
			.finally(() => {
				if (isMounted) {
					setLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return { data, loading };
}
```

## Component Structure
- Each component lives in components/<Name>/ with Component.tsx and style.ts.
- Keep Component.tsx presentational; move data fetching to hooks.
- Use theme tokens from constants/theme.ts.

### Component Template (components/Example/Component.tsx)
```tsx
import { View, Text } from "react-native";
import { styles } from "./style";

type ExampleProps = {
	title: string;
	subtitle?: string;
};

export function Example({ title, subtitle }: ExampleProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
		</View>
	);
}
```

### Component Styles (components/Example/style.ts)
```ts
import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export const styles = StyleSheet.create({
	container: {
		padding: theme.spacing.md,
		backgroundColor: theme.colors.surface,
		borderRadius: theme.radius.md,
	},
	title: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSize.lg,
		fontWeight: "600",
	},
	subtitle: {
		color: theme.colors.textSecondary,
		marginTop: theme.spacing.xs,
	},
});
```

## Hooks for Page Logic
- Create one hook per page when logic is non-trivial (hooks/use<Page>.ts).
- Keep UI components stateless; let hooks manage data and effects.

### Hook Template (hooks/useExample.ts)
```ts
import { useMemo } from "react";
import { useExamples } from "./useExamples";

export function useExample() {
	const { data, loading } = useExamples();

	const sorted = useMemo(() => {
		return [...data].sort((a, b) => a.name.localeCompare(b.name));
	}, [data]);

	return { data: sorted, loading };
}
```

## Suggested Workflow
1. Identify whether the change is a page, component, or data request.
2. If it needs data from the backend, add a query module in lib/ and reuse apiClient.
3. If it needs reusable UI, build a component in components/ and expose props clearly.
4. If it needs page logic, add a custom hook in hooks/ and keep UI components presentational.
5. Apply theme tokens from constants/theme.ts for colors, spacing, typography.

## Quick Checklist
- New backend call added under lib/ or lib/api/ with typed return values.
- Component created under components/<Name>/ with Component.tsx and style.ts.
- Page logic extracted to hooks/use<Page>.ts if it goes beyond simple state.
- Theme tokens used from constants/theme.ts (no hardcoded colors).
- Imports and file paths match the project structure.

## References
- App entry points in app/
- Reusable UI in components/
- API and query helpers in lib/
- Theme tokens in constants/theme.ts
