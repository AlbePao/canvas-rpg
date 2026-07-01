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
- `src/lib/` - Core game systems (Game, GameLoop, Events, Input, etc.)
- `src/constants/` - Items registry and standing directions (events live in feature directories)
- `src/helpers/` - Utilities (text rendering, typed `Object.keys`)
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

1. **main.ts**: Entry point — calls `Game.initializeGame()`
2. **[Game.ts](src/lib/Game/Game.ts)**: High-level singleton — loads levels, creates canvas, sets up `Main`, starts `GameLoop`
3. **[GameLoop.ts](src/lib/GameLoop.ts)**: Low-level frame scheduler — drives fixed-timestep updates and render
4. **[Main.ts](src/objects/Main/Main.ts)**: Root scene — manages levels, camera, HUD, pause, dialogue, title screen

**Flow**: `main.ts → Game.initializeGame() → GameLoop → Main.stepEntry()` each frame.

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
// Requires caller (GameObject) for automatic cleanup on destroy()
Events.on(HERO_EXITS, this, (data: { newLevelId: string }) => { ... });

// Emit globally
Events.emit(HERO_POSITION, { x, y });
```

**Important**: `Events.on()` requires `this` (the calling GameObject) as the second argument. This enables automatic cleanup when the object is destroyed.

Common events (each defined in the relevant feature's `*.constants.ts` file):

- `HERO_POSITION` ([hero.constants.ts](src/objects/Hero/hero.constants.ts)) - Hero moved (emits {x, y})
- `HERO_REQUESTS_ACTION` ([hero.constants.ts](src/objects/Hero/hero.constants.ts)) - Hero pressed Space
- `HERO_COLLECTS_ITEM` ([hero.constants.ts](src/objects/Hero/hero.constants.ts)) - Item collected
- `HERO_EXITS` ([hero.constants.ts](src/objects/Hero/hero.constants.ts)) - Level transition trigger
- `HERO_OPENS_CHEST` ([hero.constants.ts](src/objects/Hero/hero.constants.ts)) - Chest opened
- `CHANGE_LEVEL` ([level.constants.ts](src/objects/Level/level.constants.ts)) - New level loaded
- `TEXT_BOX_OPEN` / `TEXT_BOX_CLOSE` / `TEXT_BOX_END` ([textBox.constants.ts](src/objects/TextBox/textBox.constants.ts)) - Dialogue lifecycle
- `PAUSE_ON` / `PAUSE_OFF` ([pauseMenu.constants.ts](src/objects/PauseMenu/pauseMenu.constants.ts)) - Pause toggle

Events auto-cleanup when `GameObject.destroy()` is called.

### Grid System

**Grid size**: 16px cells (defined in [game.constants.ts](src/lib/Game/game.constants.ts))

Grid/movement utilities live on the **[Game singleton](src/lib/Game/Game.ts)**:

- `Game.instance.toGridSize(n)` - Converts grid cells to pixels (n × GRID_SIZE)
- `Game.instance.fromGridSize(n)` - Converts pixels back to grid cells
- `Game.instance.isSpaceFree(walls, x, y)` - Collision detection against wall set
- `Game.instance.detectOverlap(heroPos, objPos)` - Positional overlap check
- `Game.instance.moveTowards(obj, dest, speed)` - Smooth lerp toward destination
- [Vector2.ts](src/lib/Vector2.ts) - Position math and neighbor coordinate helpers

Movement uses **destination-based interpolation** (not frame-by-frame):

```typescript
const dest = new Vector2(target.x, target.y);
Game.instance.moveTowards(hero, dest, speed); // Smooth lerp
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
import { Events } from 'src/lib/Events';
import { GameObject } from 'src/lib/GameObject';
import { HERO_POSITION } from '../Hero/hero.constants';
import type { TrapConfig } from './trap.types';

export class Trap extends GameObject {
  private readonly _spriteId: string;
  private readonly _damageAmount: number;
  private _isTriggered = false;

  constructor(config: TrapConfig) {
    super(config);
    this._spriteId = config.spriteId;
    this._damageAmount = config.damageAmount;
  }

  override ready(): void {
    // Subscribe to hero position to detect overlap (auto-cleaned on destroy)
    Events.on(HERO_POSITION, this, ({ x, y }: { x: number; y: number }) => {
      this._checkHeroCollision(x, y);
    });
  }

  override step(_delta: number, _root: Main): void {
    // Could add animation/state updates here
  }

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const sprite = Resources.instance.getSpriteImage(this._spriteId);
    if (sprite) {
      ctx.drawImage(sprite, x + this.position.x * 16, y + this.position.y * 16, 16, 16);
    }
  }

  private _checkHeroCollision(heroX: number, heroY: number): void {
    if (this.position.x === heroX && this.position.y === heroY && !this._isTriggered) {
      this._isTriggered = true;
      Events.emit(HERO_DAMAGED, { damage: this._damageAmount });
    }
  }
}
```

**Step 3: Create exports** (`src/objects/Trap/index.ts`):

```typescript
export { Trap } from './Trap';
export type { TrapConfig } from './trap.types';
```

**Step 4: Register the event** (in `src/objects/Trap/trap.constants.ts`):

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

**Important**: Always define flags in [storyFlags.constants.ts](src/lib/StoryFlags/storyFlags.constants.ts) first.

### 3. Adding Collectible Items

Use [CollectibleItem.ts](src/objects/Item/CollectibleItem.ts) or [Item.ts](src/objects/Item/Item.ts):

```typescript
const rod = new CollectibleItem({ spriteId: 'rod' });
level.addChild(rod);

// Listen for item collection events
Events.on(HERO_COLLECTS_ITEM, this, (itemKey: ItemKey) => {
  Inventory.add(itemKey);
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
Events.emit(HERO_POSITION, { x: 5, y: 10 });
// Camera auto-follows
```

### Inventory System

**File**: [src/lib/Inventory/Inventory.ts](src/lib/Inventory/Inventory.ts)

Singleton that tracks collected items by `ItemKey`. Not a rendered GameObject.

- **Methods**: `Inventory.add(itemKey)`, `Inventory.get(itemKey)`, `Inventory.getAll()`
- **Items registry**: [src/constants/itemsRegistry.ts](src/constants/itemsRegistry.ts) maps `ItemKey → ItemStat`
- **UI rendering**: [src/objects/InventoryMenu/](src/objects/InventoryMenu/) (pause sub-screen)

**Usage**:

```typescript
Inventory.add('hammer1'); // Add item by key
const all = Inventory.getAll(); // Sorted array of InventoryItem
```

### Screen Transition

**File**: [src/lib/ScreenTransition/ScreenTransition.ts](src/lib/ScreenTransition/ScreenTransition.ts)

Manages fade-out/fade-in CSS animations between scenes.

- **Triggered by**: `HERO_EXITS` event or title screen navigation
- **Mechanism**: Creates HTML overlay with CSS animation, emits `SCREEN_TRANSITION_START` / `SCREEN_TRANSITION_END`
- **Important**: This is a CSS-based animation, **not** Canvas-based

### Progress & Save System

**File**: [src/lib/Progress/Progress.ts](src/lib/Progress/Progress.ts)

Singleton for localStorage-based game persistence.

- **Save**: `Progress.save(data: ProgressData)` — serializes to `localStorage['saveData']`
- **Load**: `Progress.saveFile: ProgressData | null` — returns parsed save or `null`
- **Data**: `{ levelId, storyFlags, levelsState, hero: { position, direction, inventory } }`
- **Triggered by**: `PAUSE_SAVE_GAME` event from PauseMenu

### LevelStateManager

**File**: [src/lib/LevelStateManager/LevelStateManager.ts](src/lib/LevelStateManager/LevelStateManager.ts)

Tracks per-level object state across level transitions (e.g. opened chests remain open).

- **Set**: `LevelStateManager.setObjectState(levelId, objectId, state)`
- **Get**: `LevelStateManager.getObjectState(levelId, objectId): LevelObjectState | null`
- **Shape**: `LevelsState = Record<levelId, Record<objectId, LevelObjectState>>`

### TitleScreen

**File**: [src/objects/TitleScreen/TitleScreen.ts](src/objects/TitleScreen/TitleScreen.ts)

Start-up menu shown before gameplay begins. Extends `SelectionBox`.

- **Options**: Load Game (only when `Progress.saveFile` exists), New Game, Options (TODO)
- **Started by**: `Main.startTitleScreen()`
- **Transition**: Emits a `ScreenTransition` then switches to gameplay

### PauseMenu

**File**: [src/objects/PauseMenu/PauseMenu.ts](src/objects/PauseMenu/PauseMenu.ts)

In-game pause overlay. Extends `SelectionBox`.

- **Toggle**: `PAUSE_ON` / `PAUSE_OFF` events (Escape key)
- **Options**: Inventory, Team, Save, Options, Exit
- **Save flow**: `PAUSE_SAVE_GAME` → `Progress.save()` → confirmation TextBox
- **Sub-menu**: `PAUSE_SUB_MENU_OPEN` / `PAUSE_SUB_MENU_CLOSE` prevents closing while sub-menu is open

### Behavior System

GameObjects support sequenced async behaviors via `behaviorConfig: GameObjectBehavior[]`.

- **Define**: Pass `behaviorConfig` array in the constructor config
- **Delays**: Use `scheduleTimeout()` (protected method on GameObject) — tracked and cleared on `destroy()`
- **Completion**: Emits `BEHAVIOR_END` ([gameObject.constants.ts](src/lib/GameObject/gameObject.constants.ts)) when the full sequence finishes
- **Usage**: NPCs use this for walk/stand/patrol behavior loops

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

| Scenario                        | Use                                       | Reason                                                     |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| Hero position changes           | Events: `HERO_POSITION`                   | Multiple objects need to know (Camera, NPC triggers, etc.) |
| Item pickup                     | Events: `HERO_PICKS_UP_ITEM`              | Inventory and UI both listen                               |
| Button click in local component | Direct call                               | Only affects that component                                |
| Level transition                | Events: `HERO_EXITS`                      | Multiple systems coordinate cleanup                        |
| Sprite animation frame change   | Direct call to `sprite.animations.play()` | Local to that GameObject                                   |
| Global flag update              | Direct call to `StoryFlags.add(flag)`     | Not event-driven by design                                 |

**Pattern**:

- **Broadcast events** for things that affect game state or multiple objects
- **Direct calls** for local object behavior
- **Avoid** circular event subscriptions (A triggers B which triggers A)

## Troubleshooting Guide

### Issue: Hero moves slowly or feels unresponsive

**Check**:

1. [Input.ts](src/lib/Input/Input.ts) - Check `HOLD_THRESHOLD` (120ms) and direction hold vs tap logic
2. [Hero.ts](src/objects/Hero/Hero.ts) - `destinationPosition` may be set to same as current position

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

1. Event name matches exactly (check the relevant feature's `*.constants.ts` file)
2. Subscriber created in `ready()`, not constructor
3. `caller` (second arg to `Events.on`) is `this` — required for auto-cleanup
4. Data format matches what emitter sends

**Solution**:

```typescript
// Debug all events — note: requires a valid caller GameObject
Events.on('*', this, (eventName: string) => {
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

| File                                                                   | Issue                                          | Impact                                 | Status         |
| ---------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------- | -------------- |
| [LevelStateManager.ts](src/lib/LevelStateManager/LevelStateManager.ts) | Save hero data in state for battle transitions | Battle system can't restore hero state | 📋 Enhancement |
| [TitleScreen.ts](src/objects/TitleScreen/TitleScreen.ts)               | Options menu not implemented                   | Options unavailable                    | 📋 Enhancement |

## Testing Strategy

Currently, **no tests exist** in this project. Here's how to add tests:

### Recommended Setup: Vitest

```bash
npm install -D vitest @vitest/ui
```

**Example test** (create `src/lib/__tests__/storyFlags.test.ts`):

```typescript
import { describe, it, expect } from 'vitest';
import { StoryFlags } from 'src/lib/StoryFlags';

describe('StoryFlags', () => {
  it('should add and detect a flag', () => {
    StoryFlags.add('talked_to_npc');
    expect(StoryFlags.has('talked_to_npc')).toBe(true);
  });

  it('should not find a missing flag', () => {
    expect(StoryFlags.has('nonexistent')).toBe(false);
  });
});
```

### What to Test First

1. **Collision detection** (`Game.instance.isSpaceFree()`) - Critical game logic
2. **Event system** ([Events.ts](src/lib/Events.ts)) - Core architecture
3. **Movement math** (`Game.instance.moveTowards()`) - Determinism required
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
- **Private members**: `_underscorePrefix` (required by ESLint — `@typescript-eslint/naming-convention`)

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
import { HERO_POSITION } from '../Hero/hero.constants'; // feature-scoped constants
import { objectKeys } from 'src/helpers/objectKeys';

// 4. Relative imports (from same directory or parents)
import type { MyThingConfig } from './myThing.types';
```

## Common Patterns to Follow

### 1. GameObject Lifecycle Pattern

```typescript
export class MyThing extends GameObject {
  private _state = 'idle';

  override ready(): void {
    // Setup events, animations, initial state
    Events.on(SOME_EVENT, this, () => this._onEvent());
  }

  override step(delta: number, root: Main): void {
    // Update state, move, animate
    if (this._state === 'moving') {
      // ...
    }
  }

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Draw at (x + this.position.x, y + this.position.y)
  }

  private _onEvent(): void {
    this._state = 'idle';
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
Events.emit(MY_EVENT, { value: 42 });

// Listen in another object (requires 'this' for auto-cleanup on destroy)
Events.on(MY_EVENT, this, (data: { value: number }) => {
  console.log(data.value);
});
```

### 4. Child Component Pattern

```typescript
export class Container extends GameObject {
  ready() {
    const child = new SomeGameObject({/* config */});
    this.addChild(child);
  }
}
```

## Data Sources & Resources

### Constants

Events and constants are **scoped to their feature directory** — not centralized:

- [src/objects/Hero/hero.constants.ts](src/objects/Hero/hero.constants.ts) - Hero events
- [src/objects/Level/level.constants.ts](src/objects/Level/level.constants.ts) - Level events
- [src/objects/TextBox/textBox.constants.ts](src/objects/TextBox/textBox.constants.ts) - Dialogue events
- [src/objects/PauseMenu/pauseMenu.constants.ts](src/objects/PauseMenu/pauseMenu.constants.ts) - Pause events
- [src/lib/StoryFlags/storyFlags.constants.ts](src/lib/StoryFlags/storyFlags.constants.ts) - Global story flags
- [src/lib/GameObject/gameObject.constants.ts](src/lib/GameObject/gameObject.constants.ts) - Behavior end event
- [src/constants/itemsRegistry.ts](src/constants/itemsRegistry.ts) - Items registry (ItemKey → ItemStat)
- [src/constants/standingDirections.ts](src/constants/standingDirections.ts) - Direction constants

### Helpers

- [src/helpers/objectKeys.ts](src/helpers/objectKeys.ts) - Type-safe `Object.keys()` wrapper
- [src/helpers/spriteText.ts](src/helpers/spriteText.ts) - Character frame/width mapping for text

### Singletons

- `Events` ([src/lib/Events.ts](src/lib/Events.ts)) - Global event bus
- `Game` ([src/lib/Game/Game.ts](src/lib/Game/Game.ts)) - Game init, grid/movement utilities
- `Resources` ([src/lib/Resources/Resources.ts](src/lib/Resources/Resources.ts)) - Sprite image loader
- `StoryFlags` ([src/lib/StoryFlags/StoryFlags.ts](src/lib/StoryFlags/StoryFlags.ts)) - Game state flags
- `Inventory` ([src/lib/Inventory/Inventory.ts](src/lib/Inventory/Inventory.ts)) - Item collection
- `Progress` ([src/lib/Progress/Progress.ts](src/lib/Progress/Progress.ts)) - Save/load to localStorage
- `LevelStateManager` ([src/lib/LevelStateManager/LevelStateManager.ts](src/lib/LevelStateManager/LevelStateManager.ts)) - Per-level object state

### Debugging Tips

### Logging Position/State

```typescript
override step(delta: number, root: Main): void {
  console.log(`Hero at (${this.position.x}, ${this.position.y})`);
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
Events.on('*', this, (eventName: string) => {
  console.log(`EVENT: ${eventName}`);
});
```

## Common Mistakes to Avoid

1. **Forgot `type` keyword**: Always use `import type { ... }` for types
2. **Wrong Events API**: Use `Events.on(event, this, cb)` with `this` as caller — not `Events.instance.on(event, cb)`
3. **Wrong events import**: Import event constants from the feature's `*.constants.ts`, not a central `events.ts`
4. **Hardcoded pixel positions**: Use `Game.instance.toGridSize(n)` for grid-to-pixel conversion
5. **Missing grid coordinates**: Store positions as grid cells (0-indexed), render as pixels
6. **Forgetting `.types.ts`**: Always extract types to separate file
7. **Non-deterministic logic**: Fixed timestep expects reproducible behavior; use fixed deltas
8. **Memory leaks**: Event auto-cleanup requires `caller` (pass `this`), but also ensure `destroy()` is called on removed children
9. **Private field naming**: Private members MUST use `_` prefix (enforced by ESLint `@typescript-eslint/naming-convention`)
10. **Drawing outside bounds**: Check camera viewport before rendering expensive objects

## Where to Make Changes

### For Bug Fixes

- Check [Hero.ts](src/objects/Hero/Hero.ts) for movement issues
- Check [Npc.ts](src/objects/Npc/Npc.ts) for dialogue problems
- Check [Level.ts](src/objects/Level/Level.ts) for level/collision issues

### For New Features

- **New game object**: Add in [src/objects/](src/objects/)
- **New animation**: Add to respective animations file (e.g., `heroAnimations.ts`)
- **New event**: Define in the feature's `*.constants.ts` and emit/listen as needed
- **New level**: Create JSON in `public/json/`, add ID to `public/json/levelsIds.json`

### For Optimization

- Profile rendering in [Main.ts](src/objects/Main/Main.ts) draw method
- Check collision detection via `Game.instance.isSpaceFree()`
- Optimize sprite batching in [Sprite.ts](src/objects/Sprite/Sprite.ts)

## Architecture Documentation

For deeper architectural details, see [memories/repo/canvas-rpg-architecture.md](/memories/repo/canvas-rpg-architecture.md).
