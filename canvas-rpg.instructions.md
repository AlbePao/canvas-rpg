---
applyTo: 'src/**/*.ts'
---

# Canvas RPG - TypeScript Instructions

You are an expert in TypeScript, game development, and 2D Canvas graphics. Write functional, maintainable, and performant game code following Canvas RPG conventions.

## TypeScript Fundamentals

- **Strict mode**: All code must pass `strict: true` TypeScript checking
- **No `any` type**: Use `unknown` for uncertain types, let inference work otherwise
- **Explicit returns**: All functions must have explicit return type annotations
- **No unused code**: Remove unused variables, parameters, and imports (enforced by linter)
- **Prefer `const`**: Use `const` by default; use `let` only when reassignment is necessary
- **Type imports**: Always use `import type { ... }` for types and interfaces

## Architecture & Entity System

See [AGENTS.md](AGENTS.md#core-game-loop) for complete architecture overview.

**Quick reference**: The game uses an **ECS-inspired GameObject hierarchy** with a fixed 16.67ms (60fps) timestep loop. Every GameObject implements `ready()` (once), `step(delta)` (every frame), and `drawImage()` (every frame).

Key principles:

- Composition over inheritance: nest GameObjects via `addChild()`
- Deterministic gameplay: same inputs = same outputs
- Grid-based movement: store positions as grid cells (integers), render as pixels via `gridCells(n)` helper
- Event-driven communication: use `Events.instance` singleton for inter-object messaging

## File Organization

### Naming Conventions

- **Classes**: PascalCase file names matching class name (`Hero.ts`)
- **Types/Interfaces**: Separate `.types.ts` file with lowercase prefix (`hero.types.ts`)
- **Constants**: UPPER_SNAKE_CASE in constants files (`GRID_SIZE`, `HERO_WALK_SPEED`)
- **Helpers/Utilities**: camelCase file names (`createItemSprite.ts`, `moveTowards.ts`)
- **Private members**: Use `#privateField` syntax or `_underscorePrefix`

### Directory Structure

```
src/objects/MyObject/
  ├── index.ts                 # Re-exports MyObject and types
  ├── MyObject.ts              # Main class definition
  ├── myObject.types.ts        # MyObjectConfig, MyObjectState, etc.
  └── myObjectAnimations.ts    # Frame patterns and animation data (if applicable)
```

### Import Organization

Group imports in this order:

1. Absolute imports from `src/lib`, `src/types`, `src/constants`
2. Absolute imports from `src/helpers`
3. Relative imports from same or parent directories
4. Type imports at the end (with `import type`)

```typescript
import { Events } from 'src/lib/Events';
import { GameObject } from 'src/lib/GameObject';
import { HERO_POSITION } from 'src/constants/events';
import { gridCells } from 'src/helpers/grid';
import { HeroAnimations } from './heroAnimations';
import type { HeroConfig } from './hero.types';
```

## GameObject Implementation

See [AGENTS.md - Adding Game Content](AGENTS.md#adding-game-content) for comprehensive examples and patterns.

**Quick checklist** for every GameObject:

1. ✅ Define config type in `.types.ts` extending `GameObjectConfig`
2. ✅ Implement `ready()`, `step(delta, root)`, and `drawImage(ctx, x, y)`
3. ✅ Unsubscribe from events in cleanup to prevent memory leaks
4. ✅ Store positions as grid cells (integers), not pixels
5. ✅ Set `isSolid = true` only if object blocks movement

See [AGENTS.md - State Management](AGENTS.md#state-management) for position, movement, and state patterns.
See [AGENTS.md - Drawing & Rendering](AGENTS.md#drawing--rendering) for rendering rules and camera optimization.

## Performance & Optimization

See [AGENTS.md - Troubleshooting Guide](AGENTS.md#troubleshooting-guide) for detailed strategies.

**Key principles**:

- Minimize redraws: only draw within camera viewport
- Batch collision checks: check once per step, cache results
- Lazy load assets: use `Resources.instance` for caching
- Profile rendering: monitor `Main.ts` draw performance
- Avoid allocations: reuse Vector2 instances when possible

## Code Quality Checklist

Before committing code:

- ✅ All TypeScript strict checks pass (`npm run lint`)
- ✅ No unused variables or imports
- ✅ All functions have explicit return types
- ✅ Events are unsubscribed in cleanup
- ✅ No hardcoded pixel values (use `gridCells()`)
- ✅ All types extracted to `.types.ts` file
- ✅ Deterministic gameplay (no time-dependent logic)
- ✅ Memory leaks addressed (event cleanup, child disposal)

## Debugging & Troubleshooting

See [AGENTS.md - Troubleshooting Guide](AGENTS.md#troubleshooting-guide) for comprehensive issue diagnosis and solutions.

**Quick reference**:

- **Movement issues**: Check `Input.ts`, `HeroSnappedMovement.ts`, `destinationPosition`
- **Sprite problems**: Verify sprite ID in `ASSETS_TO_LOAD`, check frame indices bounds
- **Event not firing**: Confirm event name in `events.ts`, subscriber in `ready()` (not constructor)
- **Memory leaks**: Ensure `destroy()` called, event subscribers cleaned up
- **Collision issues**: Check `isSolid = true`, walls in level, `isSpaceFree()` logic

## Where to Find Things

| Need                | Location                                                                           |
| ------------------- | ---------------------------------------------------------------------------------- |
| Full architecture   | [AGENTS.md](AGENTS.md)                                                             |
| GameObject examples | [AGENTS.md - Adding Game Content](AGENTS.md#adding-game-content)                   |
| Event patterns      | [src/constants/events.ts](src/constants/events.ts)                                 |
| Level structure     | [public/json/](public/json/)                                                       |
| Story flags         | [src/constants/storyFlags.ts](src/constants/storyFlags.ts)                         |
| Animations          | [src/objects/Hero/heroAnimations.ts](src/objects/Hero/heroAnimations.ts) (example) |
