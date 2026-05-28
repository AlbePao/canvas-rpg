# Canvas RPG - AI Agent Guidelines

A TypeScript-based 2D RPG game built with HTML5 Canvas and Vite. This document helps AI agents quickly understand the project structure, conventions, and how to make productive contributions.

## Quick Start for Agents

**Tech Stack**: TypeScript 6 + Vite + Canvas 2D API (no game engine)

**Key Commands**:

- `npm run dev` - Start dev server (http://localhost:5173)
- `npm run build` - TypeScript check + Vite build
- `npm run lint` - Run ESLint type checking
- `npm run lint:fix` - Auto-fix linting issues

**Essential Directories**:

- `src/objects/` - All game objects (Hero, NPCs, Items, etc.)
- `src/lib/` - Core game systems (GameLoop, Events, Input, etc.)
- `src/constants/` - Events, story flags, grid size
- `src/helpers/` - Utilities (grid collision, movement, etc.)
- `public/json/` - Level definitions (JSON-based levels)
- `public/sprites/` - Sprite sheet assets

**For New Agents**:

1. **Understanding patterns?** → See [Adding Game Content](#adding-game-content) for full examples
2. **Creating a GameObject?** → Check [Full Example: Creating a New GameObject](#1-full-example-creating-a-new-gameobject)
3. **Need debugging help?** → Go to [Troubleshooting Guide](#troubleshooting-guide)
4. **TypeScript rules?** → See [canvas-rpg.instructions.md](canvas-rpg.instructions.md)
5. **Known issues blocking work?** → See [Known TODOs & Blockers](#known-todos--blockers)

## Project Architecture

### Core Game Loop

The game uses a **fixed timestep (16.67ms/frame)** update/render cycle:

1. **main.ts**: Canvas setup and game initialization
2. **GameLoop.ts**: Manages update and draw phases
3. **Main.ts**: Root scene container (manages levels, camera, HUD)

**Pattern**: Every frame calls `step(delta, root)` on all GameObjects for deterministic gameplay.

### Entity System (ECS-inspired)

All game objects extend [GameObject](src/lib/GameObject/GameObject.ts):

```typescript
class GameObject {
  id: string;
  position: Vector2; // 16px grid cells
  children: GameObject[] = []; // Composition > inheritance
  isSolid = false; // Affects collision
  drawLayer: GameObjectDrawLayer | null = null; // 'HUD', 'FLOOR', or null

  ready(): void; // Called once on first frame
  step(delta: number, root: Main): void; // Called every frame
  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void;
}
```

**Key principle**: Composition over inheritance. Nest GameObjects to build complex behaviors.

### Event System (Singleton)

Global event bus at [Events.ts](src/lib/Events.ts). Subscribe with:

```typescript
Events.instance.on('HERO_EXITS', (level: Level) => {...});
```

Common events (see [events.ts](src/constants/events.ts)):

- `HERO_POSITION` - Hero moved (emits {x, y})
- `HERO_REQUESTS_ACTION` - Hero pressed Space
- `HERO_PICKS_UP_ITEM` - Item collected
- `START_TEXT_BOX` / `END_TEXT_BOX` - Dialogue
- `HERO_EXITS` - Level transition trigger

Events auto-cleanup when GameObjects are destroyed.

### Grid System

**Grid size**: 16px cells

Helpers in [grid.ts](src/helpers/grid.ts):

- `gridCells(n)` - Converts grid cells to pixels (n \* 16)
- `isSpaceFree(x, y, walls)` - Collision detection
- `Vector2` - Position math for grid movement

Movement uses **destination-based interpolation** (not frame-by-frame):

```typescript
destinationPosition = new Vector2(target.x, target.y);
moveTowards(current, destination, speed); // Smooth lerp
```

## File Organization Conventions

### Naming & File Structure

1. **One class per file**: `MyClass.ts`
2. **Types separate**: `myClass.types.ts` (TypeScript interfaces/types)
3. **Index exports**: `index.ts` re-exports for cleaner imports

**Example**:

```
Npc/
  ├── index.ts              # Exports Npc and types
  ├── Npc.ts                # Main class
  ├── npc.types.ts          # NpcConfig, NpcScenario, etc.
  └── npcAnimations.ts      # Animation frame data
```

## GameObject Lifecycle

Every GameObject follows this pattern (**called in order each frame**):

```
Frame 1 → ready() [once] → step(delta) → drawImage(ctx, x, y) → Frame 2 → step(delta) → drawImage(ctx, x, y) → ...
```

- **`ready()`**: Called once on first frame. Subscribe to events, initialize animations, set initial state.
- **`step(delta, root)`**: Called every frame (delta=16.67ms). Update position, state, collision checks.
- **`drawImage(ctx, x, y)`**: Called every frame for rendering. Draw sprite at (x + position.x, y + position.y).
- **`destroy()`**: Called on cleanup. Auto-unsubscribes from all events, removes from parent.

## Adding Game Content

### 1. Full Example: Creating a New GameObject

Complete walkthrough of adding a `Trap` object that damages the hero:

**Step 1: Create type definitions** (`src/objects/Trap/trap.types.ts`):

```typescript
import type { GameObjectConfig } from 'src/lib/GameObject';

export interface TrapConfig extends GameObjectConfig {
  spriteId: string; // Sprite key in Resources
  damageAmount: number;
}
```

**Step 2: Create the class** (`src/objects/Trap/Trap.ts`):

```typescript
import { GameObject } from 'src/lib/GameObject';
import { Events } from 'src/lib/Events';
import { HERO_POSITION } from 'src/constants/events';
import type { TrapConfig } from './trap.types';

export class Trap extends GameObject {
  private spriteId: string;
  private damageAmount: number;
  private isTriggered = false;

  constructor(x: number, y: number, config: TrapConfig) {
    super(x, y, config);
    this.spriteId = config.spriteId;
    this.damageAmount = config.damageAmount;
  }

  ready(): void {
    // Subscribe to hero position to detect overlap
    Events.instance.on(HERO_POSITION, ({ x, y }: { x: number; y: number }) => {
      this.checkHeroCollision(x, y);
    });
  }

  step(_delta: number, _root): void {
    // Could add animation/state updates here
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const sprite = Resources.instance.getSpriteImage(this.spriteId);
    if (sprite) {
      ctx.drawImage(sprite, x + this.position.x * 16, y + this.position.y * 16, 16, 16);
    }
  }

  private checkHeroCollision(heroX: number, heroY: number): void {
    if (this.position.x === heroX && this.position.y === heroY && !this.isTriggered) {
      this.isTriggered = true;
      Events.instance.emit('HERO_DAMAGED', { damage: this.damageAmount });
    }
  }
}
```

**Step 3: Create exports** (`src/objects/Trap/index.ts`):

```typescript
export { Trap } from './Trap';
export type { TrapConfig } from './trap.types';
```

**Step 4: Register the event** (in `src/constants/events.ts`):

```typescript
export const HERO_DAMAGED = 'HERO_DAMAGED';
```

**Step 5: Use it in a level** (in [src/objects/Level/Level.ts](src/objects/Level/Level.ts)):

```typescript
const trap = new Trap(5, 8, { spriteId: 'spike-trap', damageAmount: 10 });
this.addChild(trap);
```

### 2. Adding a New GameObject Type (Generic)

1. Create directory in [src/objects/](src/objects/)
2. Extend [GameObject](src/lib/GameObject/GameObject.ts)
3. Implement `ready()` and/or `step()` lifecycle methods
4. Implement `drawImage()` for rendering
5. Define types in a `.types.ts` file
6. Create `index.ts` with exports

**Example** (simplified):

```typescript
// src/objects/MyThing/MyThing.ts
export class MyThing extends GameObject {
  ready() {
    // One-time setup
  }

  step(delta: number, root: Main) {
    // Update logic
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Render logic
  }
}
```

### 2. Adding NPCs with Dialogue

[Npc.ts](src/objects/Npc/Npc.ts) handles:

- Solid collision (blocks hero movement)
- Dialogue triggered by Hero pressing Space
- Story flag conditions (`requires`, `bypass`, `addsFlag`)
- NPC animations via frame patterns

**Usage**:

```typescript
new Npc(5, 10, {
  spriteId: 'npc-name',
  scenarios: [
    {
      requires: [], // Only show if these flags are set
      bypass: ['flag_talked_npc'], // Skip if this flag is set
      content: [...], // SpriteTextBox content (dialogue)
      addsFlag: 'flag_talked_npc', // Set this flag after dialogue
    },
  ],
});
```

**Important**: Always define flags in [storyFlags.ts](src/constants/storyFlags.ts) first.

### 3. Adding Collectible Items

Use [CollectibleItem.ts](src/objects/Item/CollectibleItem.ts) or [Item.ts](src/objects/Item/Item.ts):

```typescript
const rod = new CollectibleItem(3, 3, { spriteId: 'rod' });
level.addChild(rod);

// Listen for pickup events
Events.instance.on('HERO_PICKS_UP_ITEM', (item: Item) => {
  console.log(`Picked up: ${item.spriteId}`);
  // Add to inventory
  inventory.addItem(item);
});
```

### 4. Adding Animations

Animation system uses frame patterns from [FrameIndexPattern](src/lib/FrameIndexPattern/FrameIndexPattern.ts):

1. Define keyframes in animation config (e.g., [heroAnimations.ts](src/objects/Hero/heroAnimations.ts))
2. Create [Animations](src/lib/Animations/Animations.ts) object
3. Pass to [Sprite](src/objects/Sprite/Sprite.ts)
4. Call `animations.play('name')` to switch

**Frame pattern example**:

```typescript
// In heroAnimations.ts
export const WALK_DOWN = new FrameIndexPattern(
  [0, 1, 0, 2], // Frame indices in sprite sheet
  8, // Duration (in frames) per frame
);
export const WALK_UP = new FrameIndexPattern([4, 5, 4, 6], 8);

// In Hero.ts
this.sprite.animations.play('WALK_DOWN');

// After 0.5s, play idle
this.sprite.animations.play('IDLE_DOWN');
```

**Tips**:

- Frame indices refer to positions in the sprite sheet (top-left = 0)
- Duration is in frames (60fps = 16.67ms per frame)
- Create separate animations for each direction to support 4-directional movement

### 5. Adding JSON-based Levels

Level system uses [LevelsMapper](src/lib/LevelsMapper/LevelsMapper.ts) for JSON loading:

1. Create JSON file in `public/json/{levelName}.json`
2. Register in `LevelsMapper._levelFiles`
3. Create level with `new LevelBuilder({ id: 'levelName' })`

**JSON structure** (see existing levels in `public/json/`):

```json
{
  "id": "levelName",
  "tiles": {
    "0,0": { "spriteId": "grass", "collider": false },
    "1,0": null
  },
  "walls": ["0,1", "1,1"],
  "gameObjects": [
    { "type": "Decoration", "x": 5, "y": 5, "spriteId": "tree" },
    { "type": "CollectibleItem", "x": 3, "y": 3, "spriteId": "rod" }
  ],
  "exits": [{ "x": 10, "y": 10, "newLevelId": "otherLevel" }]
}
```

## Undocumented Systems

These systems are fully functional but not described in existing docs. They're important for understanding the full architecture:

### Camera System

**File**: [src/objects/Camera/Camera.ts](src/objects/Camera/Camera.ts)

The camera follows the hero and manages the viewport. It's a child GameObject of [Main](src/objects/Main/Main.ts).

- **Triggered by**: `HERO_POSITION` and `CHANGE_LEVEL` events
- **Updates**: Canvas transform to keep hero centered (with slight offset)
- **Performance**: Uses integer pixel quantization (`Math.floor()`) to prevent jitter

**Usage** (automatic):

```typescript
Events.instance.emit('HERO_POSITION', { x: 5, y: 10 });
// Camera auto-follows
```

### Inventory System

**File**: [src/objects/Inventory/Inventory.ts](src/objects/Inventory/Inventory.ts)

Manages items collected by the hero. Displays in HUD layer.

- **Methods**: `addItem(item)`, `removeItem(itemId)`, `hasItem(spriteId)`
- **Rendering**: Custom canvas rendering of inventory grid
- **Lifecycle**: Created in Main, renders in `drawLayer: 'HUD'`

**Usage**:

```typescript
const inventory = new Inventory();
inventory.addItem(new Item(0, 0, { spriteId: 'rod' }));
```

### Level Transition

**File**: [src/lib/LevelTransition.ts](src/lib/LevelTransition.ts)

Manages fade-out/fade-in CSS animations when changing levels.

- **Triggered by**: `HERO_EXITS` event (with `{ newLevelId }`parameter)
- **Mechanism**: Creates HTML overlay with CSS animation, waits for `animationend` event
- **Important**: This is a CSS-based animation, **not** Canvas-based

**Usage**:

```typescript
Events.instance.emit('HERO_EXITS', { newLevelId: 'forest' });
// LevelTransition handles the fade
```

### Resource Loading

**File**: [src/lib/Resources/Resources.ts](src/lib/Resources/Resources.ts)

Singleton that loads and caches sprite images.

- **Assets mapping**: [main.ts line 44+](src/main.ts#L44) defines `ASSETS_TO_LOAD`
- **Loading**: Synchronous after image `onload` event
- **Caveat**: No preload confirmation—race condition possible if accessing before load completes

**Usage**:

```typescript
const sprite = Resources.instance.getSpriteImage('hero');
ctx.drawImage(sprite, x, y, 16, 16);
```

**Warning**: Always check `if (sprite)` before drawing.

## Events vs Direct References

When should you use events vs direct function calls?

| Scenario                        | Use                                            | Reason                                                     |
| ------------------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| Hero position changes           | Events: `HERO_POSITION`                        | Multiple objects need to know (Camera, NPC triggers, etc.) |
| Item pickup                     | Events: `HERO_PICKS_UP_ITEM`                   | Inventory and UI both listen                               |
| Button click in local component | Direct call                                    | Only affects that component                                |
| Level transition                | Events: `HERO_EXITS`                           | Multiple systems coordinate cleanup                        |
| Sprite animation frame change   | Direct call to `sprite.animations.play()`      | Local to that GameObject                                   |
| Global flag update              | Direct call to `StoryFlags.instance.setFlag()` | Not event-driven by design                                 |

**Pattern**:

- **Broadcast events** for things that affect game state or multiple objects
- **Direct calls** for local object behavior
- **Avoid** circular event subscriptions (A triggers B which triggers A)

## Troubleshooting Guide

### Issue: Hero moves slowly or feels unresponsive

**Check**:

1. [Input.ts](src/lib/Input.ts) - Direction queue might be full (known TODO)
2. [HeroSnappedMovement.ts](src/objects/Hero/HeroSnappedMovement.ts) - Movement speed constants
3. `destinationPosition` - Might be set to same as current position

**Solution**:

```typescript
// In Hero.step(), add logging
console.log(`Current: ${this.position.x}, Destination: ${this.destinationPosition.x}`);
```

### Issue: Sprite sheet shows wrong image

**Check**:

1. [Resources.ts](src/lib/Resources/Resources.ts) - Is the sprite ID registered?
2. [main.ts](src/main.ts#L44) - Is it in `ASSETS_TO_LOAD`?
3. Frame indices in animation - Are they within sprite sheet bounds?

**Solution**:

```typescript
console.log(Resources.instance.getSpriteImage('your-sprite-id'));
// Should log Image object, not undefined
```

### Issue: Animation stutters or loops wrong

**Check**:

1. Frame indices might repeat incorrectly
2. Duration too short or too long
3. Animation not transitioning properly

**Solution**:

```typescript
// Log current animation state
console.log(this.sprite.animations.currentAnimation);
console.log(this.sprite.animations.currentFrame);
```

### Issue: Collision doesn't work

**Check**:

1. Set `isSolid = true` on blocking objects
2. Walls registered in level
3. `isSpaceFree()` called with correct parameters

**Solution**:

```typescript
// In Level.ts, verify walls are set
console.log('Walls:', this.walls); // Should be Set<string> of "x,y" coords
```

### Issue: Event subscribers not firing

**Check**:

1. Event name matches exactly (check [events.ts](src/constants/events.ts))
2. Subscriber created in `ready()`, not constructor
3. Data format matches what emitter sends

**Solution**:

```typescript
// Debug all events
Events.instance.on('*', (eventName: string) => {
  console.log(`EVENT: ${eventName}`);
});
```

### Issue: Memory leak or object doesn't cleanup

**Check**:

1. GameObject not calling `destroy()` or not removed from parent
2. Event subscribers not auto-cleaned

**Solution**:

```typescript
// GameObject.destroy() auto-unsubscribes all events
// Ensure parent calls removeChild() or destroy() on children
this.removeChild(gameObject);
```

## Known TODOs & Blockers

These are documented TODOs in the codebase that may affect development:

| File                                                            | Issue                                    | Impact                  | Status            |
| --------------------------------------------------------------- | ---------------------------------------- | ----------------------- | ----------------- |
| [main.ts#L18](src/main.ts#L18)                                  | Async level initialization commented out | JSON levels not loading | ⚠️ Blocks feature |
| [Hero.ts#L253](src/objects/Hero/Hero.ts#L253)                   | State machine refactor                   | Code clarity issue      | 📋 Enhancement    |
| [Input.ts#L9](src/lib/Input.ts#L9)                              | Responsive key taps (tap vs hold)        | UX improvement          | 📋 Enhancement    |
| [LevelBuilder.ts#L34](src/lib/LevelBuilder/LevelBuilder.ts#L34) | Uncomment JSON loading logic             | JSON levels not loading | ⚠️ Blocks feature |
| [LevelsMapper.ts#L27](src/lib/LevelsMapper/LevelsMapper.ts#L27) | Load level IDs from config               | Data-driven design      | 📋 Enhancement    |

## Testing Strategy

Currently, **no tests exist** in this project. Here's how to add tests:

### Recommended Setup: Vitest

```bash
npm install -D vitest @vitest/ui
```

**Example test** (create `src/helpers/__tests__/grid.test.ts`):

```typescript
import { describe, it, expect } from 'vitest';
import { isSpaceFree } from '../grid';

describe('grid.ts', () => {
  it('should detect free space', () => {
    const walls = new Set(['0,0', '1,0']);
    expect(isSpaceFree(2, 2, walls)).toBe(true);
  });

  it('should detect occupied space', () => {
    const walls = new Set(['0,0', '1,0']);
    expect(isSpaceFree(0, 0, walls)).toBe(false);
  });
});
```

### What to Test First

1. **Collision detection** ([grid.ts](src/helpers/grid.ts)) - Critical game logic
2. **Event system** ([Events.ts](src/lib/Events.ts)) - Core architecture
3. **Movement math** ([moveTowards.ts](src/helpers/moveTowards.ts)) - Determinism required
4. **Animation timing** ([FrameIndexPattern.ts](src/lib/FrameIndexPattern/FrameIndexPattern.ts)) - Frame accuracy
5. **Story flags** ([StoryFlags.ts](src/lib/StoryFlags/StoryFlags.ts)) - State correctness

## TypeScript & Code Quality

### Strict Settings Enforced

- `strict: true` - All null/undefined safety
- `noUnusedLocals` / `noUnusedParameters` - Dead code detection
- `noImplicitReturns` - All code paths must return
- `noImplicitOverride` - Methods must explicitly use `override`

**When modifying code**: Clean up unused variables, add explicit return types, handle all cases.

### Naming Conventions

- **Classes**: PascalCase (`Hero`, `Npc`, `GameLoop`)
- **Functions/variables**: camelCase (`moveTowards`, `isSpaceFree`)
- **Constants**: UPPER_SNAKE_CASE (`GRID_SIZE`, `HERO_POSITION`)
- **Private members**: `#privateField` or prefixed with `_`

### File Naming

- **Classes**: `MyClass.ts`
- **Types**: `myClass.types.ts` (lowercase with `.types`)
- **Modules**: `myModule.ts` or `index.ts`
- **Constants**: `myConstants.ts` or `CONSTANT_NAME.ts`

### Imports Organization

Always organize imports in this order:

```typescript
// 1. External packages
import type { SomeType } from 'zod';

// 2. Absolute imports from lib/
import { Events } from 'src/lib/Events';
import type { GameObjectConfig } from 'src/lib/GameObject';

// 3. Constants and helpers
import { HERO_POSITION } from 'src/constants/events';
import { isSpaceFree } from 'src/helpers/grid';

// 4. Relative imports (from same directory or parents)
import type { MyThingConfig } from './myThing.types';
```

## Common Patterns to Follow

### 1. GameObject Lifecycle Pattern

```typescript
export class MyThing extends GameObject {
  private state = 'idle';

  ready() {
    // Setup events, animations, initial state
    Events.instance.on('SOME_EVENT', () => this.onEvent());
  }

  step(delta: number, root: Main) {
    // Update state, move, animate
    if (this.state === 'moving') {
      // ...
    }
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Draw at (x + this.position.x, y + this.position.y)
  }

  private onEvent() {
    this.state = 'idle';
  }
}
```

### 2. Type Safety Pattern

```typescript
// Always define types in .types.ts
export interface MyThingConfig extends GameObjectConfig {
  spriteId: string;
  data: Record<string, unknown>;
}

// Import types with `type` keyword
import type { MyThingConfig } from './myThing.types';
```

### 3. Event Communication Pattern

```typescript
// Emit event
Events.instance.emit('MY_EVENT', { value: 42 });

// Listen in another object
Events.instance.on('MY_EVENT', (data: { value: number }) => {
  console.log(data.value);
});
```

### 4. Child Component Pattern

```typescript
export class Container extends GameObject {
  ready() {
    const child = new SomeGameObject({
      /* config */
    });
    this.addChild(child);
  }
}
```

## Data Sources & Resources

### Constants

- [events.ts](src/constants/events.ts) - Event names
- [animationDirections.ts](src/constants/animationDirections.ts) - Direction enums
- [gridSize.ts](src/constants/gridSize.ts) - Grid/sizing constants
- [storyFlags.ts](src/constants/storyFlags.ts) - Global story flags

### Helpers

- [grid.ts](src/helpers/grid.ts) - Grid utilities, collision
- [moveTowards.ts](src/helpers/moveTowards.ts) - Smooth movement
- [createItemSprite.ts](src/helpers/createItemSprite.ts) - Item sprite factory

### Singletons

- `Events.instance` - Global event bus
- `Resources.instance` - Sprite sheet loader
- `StoryFlags.instance` - Game state flags

## Debugging Tips

### Logging Position/State

```typescript
step(delta, root) {
  console.log(`Hero at (${this.position.x}, ${this.position.y})`);
  console.log(`Facing: ${this.facingDirection}`);
}
```

### Visual Debug (Collision Boxes)

Add to `drawImage()`:

```typescript
if (this.isSolid) {
  ctx.strokeStyle = 'red';
  ctx.strokeRect(x, y, 16, 16);
}
```

### Event Debugging

```typescript
Events.instance.on('*', (eventName, data) => {
  console.log(`EVENT: ${eventName}`, data);
});
```

## Common Mistakes to Avoid

1. **Forgot `type` keyword**: Always use `import type { ... }` for types
2. **Direct field mutation**: Use `set()` on signals, not direct assignment
3. **Hardcoded positions**: Use `gridCells()` helper or constants
4. **Missing grid coordinates**: Store positions as grid cells (0-indexed), render as pixels
5. **Forgetting `.types.ts`**: Always extract types to separate file
6. **Non-deterministic logic**: Fixed timestep expects reproducible behavior; use fixed deltas
7. **Memory leaks**: Always unsubscribe from events in cleanup
8. **Drawing outside bounds**: Check camera viewport before rendering expensive objects

## Where to Make Changes

### For Bug Fixes

- Check [Hero.ts](src/objects/Hero/Hero.ts) for movement issues
- Check [Npc.ts](src/objects/Npc/Npc.ts) for dialogue problems
- Check [Level.ts](src/objects/Level/Level.ts) for level/collision issues

### For New Features

- **New game object**: Add in [src/objects/](src/objects/)
- **New animation**: Add to respective `.ts` file (e.g., `heroAnimations.ts`)
- **New event**: Add to [events.ts](src/constants/events.ts) and emit/listen as needed
- **New level**: Create JSON in `public/json/` and use LevelBuilder

### For Optimization

- Profile rendering in [Main.ts](src/objects/Main/Main.ts) draw method
- Check collision detection performance in [grid.ts](src/helpers/grid.ts)
- Optimize sprite batching in [Sprite.ts](src/lib/Sprite/Sprite.ts)

## Architecture Documentation

For deeper architectural details, see [memories/repo/canvas-rpg-architecture.md](/memories/repo/canvas-rpg-architecture.md).
