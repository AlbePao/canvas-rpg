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

The game uses an **ECS-inspired GameObject hierarchy** with a fixed 16.67ms timestep loop.

### GameObject Lifecycle
Every GameObject follows three phases:

```typescript
class MyGameObject extends GameObject {
  ready(): void {
    // Called ONCE on first frame after object is added to scene
    // Use for: event subscriptions, animation setup, initial state
  }

  step(delta: number, root: Main): void {
    // Called EVERY frame (16.67ms)
    // Use for: movement, state updates, collision checks
    // MUST be deterministic (same inputs = same outputs)
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Called EVERY frame for rendering
    // Draw at position (x + this.position.x, y + this.position.y)
    // x, y are camera-relative offsets
  }
}
```

### Composition Over Inheritance
- Extend `GameObject` for all game entities
- Nest GameObjects as children via `addChild()` to build complex behaviors
- Avoid deep inheritance chains; use composition for shared behavior
- Set `isSolid = true` only if the object blocks movement

### Grid System
- **Grid cell size**: 16 pixels (constant at `gridSize`)
- **Position storage**: Always store as grid cells (integers), not pixels
- **Rendering**: Use `gridCells(n)` helper to convert cells to pixels
- **Collision**: Use `isSpaceFree(x, y, walls)` from grid helpers; always check before moving

### Event Communication
- Use the global `Events.instance` singleton for inter-object communication
- Define event names in `src/constants/events.ts`
- Always unsubscribe from events in cleanup to prevent memory leaks
- Emit events with: `Events.instance.emit('EVENT_NAME', data)`
- Listen to events with: `Events.instance.on('EVENT_NAME', (data) => {...})`

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

## Game Object Implementation

### Required Pattern
Every GameObject subclass must:

1. **Define a config type** in `.types.ts` extending `GameObjectConfig`
2. **Accept config in constructor** and pass to parent
3. **Implement lifecycle methods** (`ready()` and/or `step()`)
4. **Implement drawing** via `drawImage()` method
5. **Handle cleanup** by unsubscribing from all events

### Example: Minimal GameObject
```typescript
import { GameObject } from 'src/lib/GameObject';
import type { GameObjectConfig } from 'src/lib/GameObject';

export interface MyObjectConfig extends GameObjectConfig {
  spriteId: string;
}

export class MyObject extends GameObject {
  private spriteId: string;

  constructor(x: number, y: number, config: MyObjectConfig) {
    super(x, y, config);
    this.spriteId = config.spriteId;
  }

  ready(): void {
    // Setup once
  }

  step(delta: number, root: Main): void {
    // Update every frame
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Render at (x + this.position.x, y + this.position.y)
  }
}
```

### Solid Objects (Blocking Movement)
If your object blocks movement (NPCs, walls, obstacles):
```typescript
constructor(x: number, y: number, config: MyObjectConfig) {
  super(x, y, config);
  this.isSolid = true;  // Prevents Hero from walking through
}
```

### Animated Objects
Use the `Animations` class to manage frame-based animations:

```typescript
import { Animations } from 'src/lib/Animations';
import { Sprite } from 'src/lib/Sprite';

export class MyAnimatedObject extends GameObject {
  private sprite: Sprite;
  private animations: Animations;

  ready(): void {
    this.animations = new Animations({
      idle: IDLE_ANIMATION,
      walk: WALK_ANIMATION,
    });
    this.sprite = new Sprite({ animations: this.animations });
    this.animations.play('idle');
  }

  step(delta: number, root: Main): void {
    this.animations.step(delta);
    if (/* condition */) {
      this.animations.play('walk');
    }
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    this.sprite.drawImage(ctx, x + this.position.x, y + this.position.y);
  }
}
```

### FrameIndexPattern Syntax
`FrameIndexPattern` defines which frames in a sprite sheet play in sequence:

```typescript
// FrameIndexPattern(frames, frameDuration)
// frames: Array of frame indices in the sprite sheet (0-indexed)
// frameDuration: How many update cycles each frame displays (16.67ms per cycle)

export const HERO_WALK_DOWN = new FrameIndexPattern(
  [0, 1, 0, 2],  // Cycles through frames 0 → 1 → 0 → 2
  8              // Each frame displays for 8 cycles (≈ 133ms per frame)
);

export const IDLE = new FrameIndexPattern([0], 1); // Single frame, stationary

export const COMPLEX_ANIMATION = new FrameIndexPattern(
  [0, 1, 2, 3, 4, 5],  // Multi-frame sequence
  4                     // 4 cycles per frame = faster animation
);
```

Use `FrameIndexPattern` in animation config files (e.g., `heroAnimations.ts`):
```typescript
export const ANIMATIONS_CONFIG = {
  walkDown: HERO_WALK_DOWN,
  walkUp: HERO_WALK_UP,
  idle: IDLE,
};
```

## State Management & Movement

### Position Storage
- Always store `this.position` as grid cells (integers 0–99)
- Use `Vector2` for all position math
- Never hardcode pixel values; use `gridCells()` helper

### Deterministic Movement
- Use `moveTowards(current, destination, speed)` for smooth movement
- Set `destinationPosition` and let `moveTowards` interpolate
- Movement must be reproducible with same timestep and inputs
- Avoid `Math.random()` unless seeded for predictability

### State Pattern
For complex objects with multiple behaviors:
```typescript
private state: 'idle' | 'moving' | 'interacting' = 'idle';

step(delta: number, root: Main): void {
  if (this.state === 'idle') {
    // Handle idle logic
  } else if (this.state === 'moving') {
    // Handle movement logic
  }
}
```

## Drawing & Rendering

### Drawing Rules
- Use `drawImage()` method; canvas context is passed in
- Position is passed as `(x, y)` — camera offset
- Draw your object at `(x + this.position.x, y + this.position.y)`
- Only draw if within camera bounds (optimization)
- Use `drawLayer` to control sort order ('HUD', 'FLOOR', or `null`)

### Collision Visualization (Debug)
For debugging, draw collision boxes:
```typescript
drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  if (this.isSolid) {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x + this.position.x, y + this.position.y, 16, 16);
  }
}
```

## Camera & Viewport Management

### Camera Behavior
The `Camera` GameObject automatically follows the hero and manages the viewport:

- **Follows hero** via `HERO_POSITION` events
- **Triggered by** `HERO_POSITION` and `CHANGE_LEVEL` events
- **Canvas transform**: Applies integer pixel quantization to prevent jitter
- **Auto-managed**: Created in `Main.ts`; no manual intervention needed

### Using Camera for Optimization
The camera offset `(x, y)` passed to `drawImage()` is camera-relative. Optimize rendering:

```typescript
drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  const screenX = x + this.position.x;
  const screenY = y + this.position.y;

  // Skip drawing if off-screen (outside camera bounds)
  if (screenX < -16 || screenX > 320 || screenY < -16 || screenY > 240) {
    return; // Not visible
  }

  // Draw expensive sprite only if on-screen
  const sprite = Resources.instance.getSpriteImage(this.spriteId);
  if (sprite) {
    ctx.drawImage(sprite, screenX, screenY, 16, 16);
  }
}
```

### Canvas Resolution
- **Canvas size**: Typically 320×240 pixels (or configured in `main.ts`)
- **Grid cell size**: 16 pixels = 1 grid cell
- **Visible area**: ~20×15 grid cells on screen at once
- **HUD layer**: Always drawn last, always visible (not camera-relative)

### Draw Layer Ordering
Objects are drawn in this order:
1. `drawLayer: null` (default, world layer)
2. `drawLayer: 'FLOOR'` (below hero)
3. `drawLayer: 'HUD'` (UI, always visible)

## Levels & Level Transitions

### Creating a Level
Levels are built with `LevelBuilder` from JSON:

```typescript
const level = new LevelBuilder({
  id: 'levelName',
  // LevelBuilder loads from public/json/levelName.json
});
```

### Level JSON Structure
```json
{
  "id": "levelName",
  "tiles": {
    "0,0": { "spriteId": "grass", "collider": false },
    "1,0": null
  },
  "walls": ["0,1", "1,1"],
  "gameObjects": [
    { "type": "Npc", "x": 5, "y": 5, "config": {...} }
  ],
  "exits": [{ "x": 10, "y": 10, "newLevelId": "otherLevel" }]
}
```

### Story Flags
- Define all story flags in `src/constants/storyFlags.ts` as string literals
- Access via `StoryFlags.instance.hasFlag(flag)` and `addFlag(flag)`
- Use flags to control NPC dialogue and conditional logic
- Never hardcode flag strings; always reference constants

## NPC Dialogue & Scenarios

### NPC Configuration
`Npc` objects handle solid collision, character interaction, and branching dialogue:

```typescript
import { Npc } from 'src/objects/Npc';
import type { NpcConfig } from 'src/objects/Npc/npc.types';

const npc = new Npc(5, 10, {
  spriteId: 'npc-elder',
  scenarios: [
    { /* First scenario */ },
    { /* Second scenario (fallback) */ },
  ],
});
level.addChild(npc);
```

### Scenario Structure
Each scenario is a conditional block:

```typescript
{
  requires: [],                           // Story flags that MUST be set
  bypass: [],                             // Story flags that SKIP this scenario
  content: [/* SpriteTextBox content */],  // Dialogue text to display
  addsFlag: 'npc_elder_greeted',         // Flag to set after dialogue
}
```

### Full NPC Example
```typescript
const npc = new Npc(5, 10, {
  spriteId: 'npc-merchant',
  scenarios: [
    {
      // First time greeting (default)
      requires: [],                    // No requirements
      bypass: ['FLAG_MET_MERCHANT'],   // Skip if already met
      content: [
        { text: 'Welcome, traveler!' },
        { text: 'I sell rare items.' },
      ],
      addsFlag: 'FLAG_MET_MERCHANT',
    },
    {
      // After hero has the key
      requires: ['FLAG_HAS_KEY'],
      bypass: ['FLAG_MERCHANT_UNLOCKED_CHEST'],
      content: [
        { text: 'I see you have the key!' },
        { text: 'My chest is yours.' },
      ],
      addsFlag: 'FLAG_MERCHANT_UNLOCKED_CHEST',
    },
    {
      // Fallback: default dialogue if no scenarios match
      requires: [],
      bypass: [],
      content: [
        { text: 'Come back later.' },
      ],
      addsFlag: undefined, // No flag change
    },
  ],
});
```

### Dialogue Rules
- **Scenario matching**: NPC plays the FIRST scenario whose `requires` are met AND `bypass` are NOT set
- **Content format**: Array of text objects (see `SpriteTextBox` for full format)
- **Flag timing**: `addsFlag` is set AFTER dialogue completes
- **Hero interaction**: Player presses Space on NPC; dialogue triggers automatically
- **Solid collision**: NPCs block hero movement (`isSolid: true` by default)

## Common Patterns

### Pattern: Event-Driven Behavior
```typescript
ready(): void {
  Events.instance.on('HERO_POSITION', (data) => {
    this.onHeroMoved(data);
  });
}

private onHeroMoved(data: { x: number; y: number }): void {
  // React to hero movement
}
```

### Pattern: Inventory & Items
- Use `Inventory` class to manage items
- `CollectibleItem` triggers `HERO_PICKS_UP_ITEM` event
- Check `item.id` in event handlers to identify item type

### Pattern: Dialogue System
- `Npc` class handles dialogue with scenario-based conditions
- Use `requires` and `bypass` for conditional dialogue
- `addsFlag` automatically updates story flags after dialogue

### Pattern: Collision Detection
```typescript
import { isSpaceFree } from 'src/helpers/grid';

const canMove = isSpaceFree(newX, newY, walls);
if (canMove) {
  this.position.x = newX;
  this.position.y = newY;
}
```

## Performance & Optimization

- **Minimize redraws**: Only draw within camera viewport
- **Batch collision checks**: Check collisions once per step, cache results
- **Lazy load assets**: Use `Resources.instance` for sprite sheet caching
- **Profile rendering**: Monitor `Main.ts` draw method performance
- **Avoid allocations**: Reuse Vector2 instances when possible

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

## Debugging Tips & Common Issues

### Issue: Hero Movement Feels Slow
**Check**:
1. `Input.ts` — direction queue might be congested
2. `HeroSnappedMovement.ts` — movement speed constants
3. `destinationPosition` — verify it's being updated correctly

**Debug**:
```typescript
step(delta: number, root: Main): void {
  console.log(`Position: (${this.position.x}, ${this.position.y})`);
  console.log(`Destination: (${this.destinationPosition.x}, ${this.destinationPosition.y})`);
}
```

### Issue: Sprite Displays Incorrectly
**Check**:
1. `Resources.ts` — is the sprite ID registered in `ASSETS_TO_LOAD`?
2. Frame indices — are they within sprite sheet bounds?
3. Animation timing — frame duration too short/long?

**Debug**:
```typescript
const sprite = Resources.instance.getSpriteImage('sprite-id');
console.log('Sprite loaded:', sprite ? 'YES' : 'NO');
```

### Issue: Events Not Firing
**Check**:
1. Event name matches `src/constants/events.ts` exactly
2. Subscribers created in `ready()`, not constructor
3. Data format matches what emitter sends

**Debug**:
```typescript
ready(): void {
  Events.instance.on('*', (eventName: string) => {
    console.log(`[EVENT] ${eventName}`);
  });
}
```

### Issue: NPC Dialogue Not Showing
**Check**:
1. Story flags set correctly via `StoryFlags.instance`
2. Scenario `requires` and `bypass` conditions evaluated
3. NPC added to level as child

**Debug**:
```typescript
// In NPC.ts or manually
const hasFlag = StoryFlags.instance.hasFlag('MY_FLAG');
console.log('Flag set:', hasFlag);
```

### Issue: Collision Not Working
**Check**:
1. Set `isSolid = true` on blocking objects
2. Walls registered in level JSON or Level code
3. `isSpaceFree()` called with correct wall set

**Debug**:
```typescript
const canMove = isSpaceFree(x, y, walls);
console.log(`Can move to (${x}, ${y}):`, canMove);
if (!canMove) {
  console.log('Walls:', [...walls].slice(0, 5)); // Show first 5 walls
}
```

### Issue: Memory Leak or Objects Not Cleaning Up
**Check**:
1. Event subscribers unsubscribe (auto-cleanup via `destroy()`)
2. Objects removed from parent via `removeChild()` or `destroy()`
3. No circular references between GameObjects

**Debug**:
```typescript
destroy(): void {
  console.log('Destroying:', this.constructor.name);
  super.destroy(); // Auto-unsubscribes all events
}
```

### Issue: Level Transition Hangs
**Check**:
1. `LevelTransition.ts` — CSS animation completes
2. `HERO_EXITS` event emitted with `newLevelId`
3. Target level exists in levels mapper

**Debug**:
```typescript
Events.instance.emit('HERO_EXITS', { newLevelId: 'forest' });
console.log('Level transition triggered');
```

### Console Logging Best Practices
```typescript
// Group related logs
console.group('Hero Movement');
console.log('From:', this.position);
console.log('To:', this.destinationPosition);
console.groupEnd();

// Use console.table for arrays/objects
const walls = ['0,0', '1,0', '2,0'];
console.table(walls);

// Avoid logs in main game loop (causes spam)
// Use conditional logs with counters instead:
if (this.step_counter % 60 === 0) {
  console.log('Frame 60: performance check');
}
```

### Performance Profiling
```typescript
// Measure render time
const start = performance.now();
// ... rendering code ...
const elapsed = performance.now() - start;
console.log(`Draw time: ${elapsed.toFixed(2)}ms`);
```

## Where to Add New Features

| Feature | Location |
|---------|----------|
| New game object | `src/objects/MyObject/` |
| New animation | `src/objects/{Object}/{object}Animations.ts` |
| New event | `src/constants/events.ts` (emit + listen) |
| New level | `public/json/{levelName}.json` + `LevelBuilder` |
| New story flag | `src/constants/storyFlags.ts` |
| Helper function | `src/helpers/{helper}.ts` |
| Type definition | `src/{module}/{module}.types.ts` |
