# scramble-ticker

## Overview

A small Electron desktop app to display a fresh WCA scramble on an interval.

It is meant to be tiny and sit on the corner of the screen as a ticker, not to be a full application window.

## Commands

- `pnpm dev`: Run the development server with HMR
- `pnpm build`: Build the production version of the app
- `pnpm lint`: Run the linter
- `pnpm format`: Format the code
- `pnpm reset`: Nuke temporary files and reinstall dependencies

## Coding Guidelines

- Use whitespace between chunks of code that are not related
- Before returning code to the user, run `pnpm format` and `pnpm lint:fix`
- No comments

## Component Guidelines

- If a component is solo in a folder, name it `index.tsx`
- If it has helper sub-components, those are named in their own file and imported into the main component
- For a component named "Foo", the props are called "FooProps"

## Accessiblity

- No need for aria-labels anywhere to reduce code bloat
