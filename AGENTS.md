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

- `src/objects/` - All game objects (Hero, NPCs, Items, Battle, menus, etc.)
- `src/lib/` - Core game systems (Game, GameLoop, Events, Input, GameRegistry, Loaders, GameSchemas, etc.)
- `src/types/` - Shared cross-cutting types (`directions.ts`, `baseOption.ts`, `readonlyRecord.ts`)
- `public/json/config/` - Data-driven config JSON (assets, animations, items, frame maps) validated by [GameSchemas](src/lib/GameSchemas/) and loaded into [GameRegistry](src/lib/GameRegistry/GameRegistry.ts)
- `public/json/levels/` - One JSON file per level, validated by [levelMap.schema.ts](src/lib/GameSchemas/levelMap.schema.ts)
- `public/sprites/` - Sprite sheet assets

**No `src/constants/` or `src/helpers/` directories anymore** — item registries, frame maps, and standing directions are all data-driven through `GameRegistry` (see [Data-Driven Architecture](#data-driven-architecture-configlevels)).

**For New Agents**:

1. **Understanding patterns?** → See [Adding Game Content](#adding-game-content) for full examples
2. **Creating a GameObject?** → Check [Full Example: Creating a New GameObject](#1-full-example-creating-a-new-gameobject)
3. **Need debugging help?** → Go to [Troubleshooting Guide](#troubleshooting-guide)
4. **TypeScript rules?** → See [canvas-rpg.instructions.md](canvas-rpg.instructions.md)
5. **Known issues blocking work?** → See [Known TODOs & Blockers](#known-todos--blockers)

## Project Architecture

### Core Game Loop

The game uses a **fixed timestep (16.67ms/frame)** update/render cycle:

1. **main.ts**: Entry point — calls `Game.initializeGame({ containerId })` (async)
2. **[Game.ts](src/lib/Game/Game.ts)**: High-level singleton — awaits [GameLoader](src/lib/Loaders/GameLoader.ts) (which loads+validates all config/level JSON into [GameRegistry](src/lib/GameRegistry/GameRegistry.ts)), then creates the canvas, sets up `Main`, starts `GameLoop`
3. **[GameLoop.ts](src/lib/GameLoop.ts)**: Low-level frame scheduler — drives fixed-timestep updates and render
4. **[Main.ts](src/objects/Main/Main.ts)**: Root scene — manages levels, camera, HUD, pause, dialogue, title screen

**Flow**: `main.ts → Game.initializeGame() → GameLoader (async config/level load) → GameLoop → Main.stepEntry()` each frame.

**Pattern**: Every frame calls `step(delta)` on all GameObjects for deterministic gameplay. GameObjects no longer receive a `root`/`Main` argument — reach shared state through singletons (`Events`, `GameRegistry`, `Game`, `StoryFlags`, etc.) instead.

### Entity System (ECS-inspired)

All game objects extend [GameObject](src/lib/GameObject/GameObject.ts):

```typescript
class GameObject {
  readonly id: string;
  position: Vector2; // 16px grid cells
  children: GameObject[] = []; // Composition > inheritance
  parent: GameObject | null = null;
  isSolid = false; // Affects collision
  drawLayer: GameObjectDrawLayer | null = null; // 'floor' | 'worldTop' | 'hud' | null

  ready(): void; // Called once on first frame
  step(delta: number): void; // Called every frame — NO root/Main param, use singletons
  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void;
  protected scheduleTimeout(callback: () => void, delay: number): number; // auto-cleared on destroy()
}
```

**Key principle**: Composition over inheritance. Nest GameObjects to build complex behaviors.

**Base class hierarchy for interactive/movable objects**: `GameObject` → [InteractiveObject](src/objects/InteractiveObject/InteractiveObject.ts) (dialogue/content via `interactionConfig`, used by `Npc`/`Chest`) → [MovableObject](src/objects/MovableObject/MovableObject.ts) (adds `facingDirection`, `destinationPosition`, optional `behaviorConfig` patrol loop, used by `Hero`/`Npc`).

### Event System (Singleton)

Global event bus at [Events.ts](src/lib/Events.ts). Subscribe with:

```typescript
// Requires caller (GameObject) for automatic cleanup on destroy()
Events.on(HERO_EXITS, this, (data: { newLevelId: string }) => { ... });

// Emit globally
Events.emit(HERO_POSITION, { x, y });
```

**Important**: `Events.on()` requires `this` (the calling GameObject) as the second argument. This enables automatic cleanup when the object is destroyed. `Events.on()` returns a listener `id` you can pass to `Events.off(id)` to unsubscribe a single listener manually (rarely needed — `destroy()` handles the common case).

Events live in [src/lib/Events/Events.ts](src/lib/Events/Events.ts) (a directory, not a single file).

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

**Grid size**: 16px cells (`GRID_SIZE` in [game.constants.ts](src/lib/Game/game.constants.ts))

Grid/movement utilities are **plain exported functions**, not methods on a `Game` instance — import them from where they're defined:

- `toGridSize(n)` / `fromGridSize(n)` - [src/lib/Game/game.utils.ts](src/lib/Game/game.utils.ts) — convert grid cells ⇄ pixels
- `isSpaceFree(x, y, walls)` - [src/objects/Level/level.utils.ts](src/objects/Level/level.utils.ts) — collision detection against a `Walls` (`Set<string>`) set
- `moveTowards(gameObject, destinationPosition, speed)` - [src/objects/MovableObject/movableObject.utils.ts](src/objects/MovableObject/movableObject.utils.ts) — smooth lerp toward destination, returns remaining distance
- [Vector2.ts](src/lib/Vector2/Vector2.ts) - Position math and neighbor coordinate helpers

Movement uses **destination-based interpolation** (not frame-by-frame):

```typescript
import { moveTowards } from '../MovableObject';

const distance = moveTowards(this, this.destinationPosition, this.walkingSpeed); // Smooth lerp
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
  spriteId: string; // Key in GameRegistry.assets (see public/json/config/assets.json)
  damageAmount: number;
}
```

**Step 2: Create the class** (`src/objects/Trap/Trap.ts`):

```typescript
import { Events } from 'src/lib/Events';
import { GameObject } from 'src/lib/GameObject';
import { GameRegistry } from 'src/lib/GameRegistry';
import { HERO_POSITION } from '../Hero/hero.constants';
import { HERO_DAMAGED } from './trap.constants';
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

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const { resource } = GameRegistry.assets.get(this._spriteId);
    if (resource.isLoaded) {
      ctx.drawImage(resource.image, x + this.position.x, y + this.position.y, 16, 16);
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

**Step 5: Use it in a level** (in [src/objects/LevelBuilder/LevelBuilder.ts](src/objects/LevelBuilder/LevelBuilder.ts), or as a `gameObjects` entry in a level JSON file once registered there):

```typescript
const trap = new Trap({ id: 'trap1', x: 5, y: 8, spriteId: 'spike-trap', damageAmount: 10 });
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
  override ready(): void {
    // One-time setup
  }

  override step(delta: number): void {
    // Update logic — reach shared state via singletons (Events, GameRegistry, Game), no root param
  }

  override drawImage(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Render logic
  }
}
```

### 2. Adding NPCs with Dialogue

[Npc.ts](src/objects/Npc/Npc.ts) extends [MovableObject](src/objects/MovableObject/MovableObject.ts) and handles:

- Solid collision (blocks hero movement)
- Dialogue triggered by Hero pressing Space (via inherited `InteractiveObject.getContent()`)
- Story flag conditions (`requires`, `bypass`, `addsFlag`) matched by `StoryFlags.getRelevantScenario()`
- Optional patrol/walk `behaviorConfig` loop and NPC animations via frame patterns

**Usage**:

```typescript
new Npc({
  id: 'npc-name',
  x: 5,
  y: 10,
  spriteId: 'npc-name',
  interactionConfig: {
    content: [
      {
        text: ['Hello there!'],
        requires: [], // Only show if these flags are set
        bypass: ['flag_talked_npc'], // Skip if this flag is set
        addsFlag: 'flag_talked_npc', // Set this flag after dialogue
      },
    ],
  },
});
```

**Important**: Always define flags in [storyFlags.constants.ts](src/lib/StoryFlags/storyFlags.constants.ts) first. A content entry can carry `addsFlag`, `itemKey`, `options` (opens a `SelectionBox`), or `battle` (starts a `Battle`) — these are mutually exclusive per the `InteractionContentConfig` union.

### 3. Adding Collectible Items

Use [CollectibleItem.ts](src/objects/Item/CollectibleItem.ts) or [Item.ts](src/objects/Item/Item.ts):

```typescript
const rod = new CollectibleItem({ id: 'rod1', x: 3, y: 3, itemKey: 'rod' });
level.addChild(rod);

// Listen for item collection events
Events.on(HERO_COLLECTS_ITEM, this, (itemKey: string) => {
  Inventory.add(itemKey);
});
```

Item definitions themselves (name, type, frame) live in [public/json/config/items.json](public/json/config/items.json) and are loaded into `GameRegistry.items` — there is no `itemsRegistry.ts` file anymore.

### 4. Adding Animations

Animations are **data-driven**, not defined per-object in TypeScript files:

1. Add/edit keyframes in [public/json/config/animations.json](public/json/config/animations.json) (validated by `createAnimationsSchema()` in [config.schema.ts](src/lib/GameSchemas/config.schema.ts))
2. `ConfigLoader` loads this into `GameRegistry`'s animation registry at startup
3. GameObjects with a body `Sprite` create an [Animations](src/lib/Animations/Animations.ts) object from `GameRegistry`-provided [FrameIndexPattern](src/lib/FrameIndexPattern/FrameIndexPattern.ts) data
4. Call `this.body.animations.play('name')` to switch

**Tips**:

- Frame indices refer to positions in the sprite sheet (top-left = 0)
- Duration is in frames (60fps = 16.67ms per frame)
- Create separate animations for each direction to support 4-directional movement
- There is no more `heroAnimations.ts`-style per-object animation file — edit the JSON config instead

### 5. Adding JSON-based Levels

Levels are loaded automatically at startup — there is no `LevelsMapper` class anymore:

1. Create one JSON file per level: `public/json/levels/{levelId}.json`
2. Add `"{levelId}"` to [public/json/config/levelsIds.json](public/json/config/levelsIds.json)
3. On boot, `GameLoader` → `LevelLoader` reads every ID in `levelsIds.json`, fetches the matching file, and validates it against `createLevelMapSchema()` ([levelMap.schema.ts](src/lib/GameSchemas/levelMap.schema.ts)) before registering it in `GameRegistry.levels`
4. Instantiate the level anywhere with `new LevelBuilder({ id: 'levelId' })` — it reads the validated data straight from `GameRegistry.levels.get(id)`

**JSON structure** (see [public/json/levels/tilesetLevel.json](public/json/levels/tilesetLevel.json) for a full example):

```json
{
  "id": "levelName",
  "heroDefaultPosition": { "x": 1, "y": 5 },
  "background": { "resource": "bgWoods" },
  "tiles": {
    "0,0": "grassCliffBorderUpperLeft",
    "1,0": "grass"
  },
  "walls": ["0,1", "1,1"],
  "gameObjects": [
    { "type": "Decoration", "id": "tree1", "x": 5, "y": 5, "spriteId": "treeSmGreenLower" },
    {
      "type": "Chest",
      "id": "chest1",
      "x": 2,
      "y": 0,
      "interactionConfig": { "content": [{ "text": [], "itemKey": "slingshot2" }] }
    },
    { "type": "Exit", "id": "exit1", "x": 1, "y": 4, "newLevelId": "otherLevel", "newHeroPosition": { "x": 0, "y": 0 } }
  ]
}
```

Note: `tiles` values are plain tile-registry key strings (looked up in `GameRegistry.tiles`), not `{ spriteId, collider }` objects; exits are `gameObjects` entries of `"type": "Exit"`, not a separate top-level `exits` array.

## Data-Driven Architecture (Config/Levels)

Asset/level/animation data is no longer hardcoded in TypeScript — it flows through a load → validate → register pipeline:

1. **[Loaders](src/lib/Loaders/)**: `GameLoader` (singleton, called by `Game.initializeGame()`) orchestrates loading:
   - `ConfigLoader.loadAll()` fetches and validates all `public/json/config/*.json` files in parallel (animations, assets, items, frame maps, `levelsIds.json`)
   - `AssetLoader` turns validated asset entries into `Image` objects (`{ resource: { image, isLoaded } }`), loaded asynchronously
   - `LevelLoader.loadLevels()` fetches + validates each level listed in `levelsIds.json` from `public/json/levels/{id}.json`
   - `ResourceFetcher` is the underlying `fetchJson(url)` HTTP abstraction
2. **[GameSchemas](src/lib/GameSchemas/)**: Zod schemas validate every config/level file at load time (errors are logged, not silently ignored) — see `config.schema.ts` (one `createXSchema()` per config file) and `levelMap.schema.ts`/`levelObjects.schema.ts`/`interactions.schema.ts` for level data
3. **[GameRegistry](src/lib/GameRegistry/GameRegistry.ts)**: Singleton holding one `Registry<T>` ([Registry.ts](src/lib/Registry/Registry.ts), a generic keyed data container with `load()`/`get()`/`getOptional()`/`has()`) per data type: `levels`, `assets`, `items`, `tiles`, `chars`, `chestStatuses`, `decorations`, `arrowDirections`, plus a private animations registry. All game objects read data through `GameRegistry`, e.g. `GameRegistry.assets.get('hero')`, `GameRegistry.items.get(itemKey)`.

**There is no `Resources` singleton and no `LevelsMapper` class anymore** — both were replaced by the Loaders + GameRegistry pipeline above.

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
- **Item definitions**: loaded from [public/json/config/items.json](public/json/config/items.json) into `GameRegistry.items` (no more `itemsRegistry.ts` file)
- **UI rendering**: [src/objects/InventoryScreen/](src/objects/InventoryScreen/) (pause sub-screen; renamed from the old "InventoryMenu")

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

`scheduleTimeout()` (protected method on `GameObject`, tracked and auto-cleared on `destroy()`) underlies delayed actions. On top of it, [MovableObject](src/objects/MovableObject/MovableObject.ts) (not every `GameObject`) supports a sequenced patrol loop via `behaviorConfig: MovableObjectBehavior[]` in its constructor config.

- **Define**: Pass `behaviorConfig` array to `Npc`'s constructor (Hero explicitly omits it via `Omit<MovableObjectConfig, 'behaviorConfig'>`)
- **Completion**: Emits `BEHAVIOR_END` ([movableObject.constants.ts](src/objects/MovableObject/movableObject.constants.ts)) when the full sequence finishes
- **Usage**: NPCs use this for walk/stand/patrol behavior loops (see [Npc.ts](src/objects/Npc/Npc.ts))

### Battle, Combatant & TeamMembers (work in progress)

- **[Battle](src/objects/Battle/Battle.ts)**: Turn-based battle scene — background sprite, opponent/player `Combatant[]` teams, `ArrowIndicator` for selection. Started via an `InteractionContentConfig.battle` entry in NPC/Chest dialogue.
- **[Combatant](src/objects/Combatant/Combatant.ts)**: A single battle participant (hp/maxHp/xp/maxXp, `side: 'player' | 'opponent'`). Does **not** yet render on the battlefield — see [Known TODOs](#known-todos--blockers).
- **[TeamMembers](src/lib/TeamMembers/TeamMembers.ts)** (lib singleton): Tracks party member order/positions for battle team initialization; has no backing registry yet (TODO).
- **[TeamScreen](src/objects/TeamScreen/TeamScreen.ts)**: Pause sub-menu for viewing party composition; extends `MenuScreen`.

### Menu System

- **[MenuScreen](src/objects/MenuScreen/MenuScreen.ts)** (abstract base): Generic menu shell with `SelectionBox` navigation, item list, and close-transition animation. `PauseMenu`, `InventoryScreen`, `TeamScreen`, and `SettingsMenu` all extend it.
- **[SelectionBox](src/objects/SelectionBox/SelectionBox.ts)** (abstract base): Arrow-indicator-driven menu selection UI (up/down/left/right navigation, open/close/selection events). Used directly by `TitleScreen`/`PauseMenu` and indirectly via `MenuScreen`.
- **[SettingsMenu](src/objects/SettingsMenu/SettingsMenu.ts)**: Options sub-menu (fills the old "Options menu not implemented" gap — see [Known TODOs](#known-todos--blockers) for what's still missing).
- **[BoxBackdrop](src/objects/BoxBackdrop/BoxBackdrop.ts)**: Procedural 3×3 sprite compositor for UI box borders + tiled center, used by menus/dialogue boxes.
- **[ArrowIndicator](src/objects/ArrowIndicator/ArrowIndicator.ts)**: Directional pointer sprite, used for menu selection and Battle team targeting.

### Interaction Base Classes

- **[InteractiveObject](src/objects/InteractiveObject/InteractiveObject.ts)**: Base for anything with dialogue (`interactionConfig`), used by `Npc` and `Chest`. `getContent()` resolves the active scenario via `StoryFlags.getRelevantScenario()`.
- **[MovableObject](src/objects/MovableObject/MovableObject.ts)**: Extends `InteractiveObject`; adds `facingDirection`, `destinationPosition`, `walkingSpeed`, and the optional patrol `behaviorConfig`. Shared base for `Hero` and `Npc` — see [Grid System](#grid-system) for `moveTowards`.
- **[Chest](src/objects/Chest/Chest.ts)**: Extends `InteractiveObject`; opens on interaction (frame swap via `GameRegistry.chestStatuses`), emits `HERO_OPENS_CHEST`, optionally removed after loot.
- **[LevelTile](src/objects/LevelTile/LevelTile.ts)**: Renders a single map tile (optionally animated) from `GameRegistry.tiles`; instantiated per-cell by `LevelBuilder`.

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

1. [GameRegistry.ts](src/lib/GameRegistry/GameRegistry.ts) - Is the sprite ID registered in `assets`?
2. [public/json/config/assets.json](public/json/config/assets.json) - Is the sprite defined there?
3. Frame indices in animation - Are they within sprite sheet bounds?

**Solution**:

```typescript
console.log(GameRegistry.assets.get('your-sprite-id'));
// Should log { resource: { image, isLoaded: true }, ... }, not throw
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
2. Walls registered in level (`walls` array in the level JSON)
3. `isSpaceFree()` ([level.utils.ts](src/objects/Level/level.utils.ts)) called with correct parameters

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

| File                                                                 | Issue                                                             | Impact                                        | Status         |
| -------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------- | -------------- |
| [TeamMembers.ts](src/lib/TeamMembers/TeamMembers.ts)                 | Needs a backing registry of team members                          | Party members are effectively hardcoded/empty | 📋 Enhancement |
| [Battle.ts](src/objects/Battle/Battle.ts)                            | Selection box doesn't auto-open when battle/turn starts (2 TODOs) | Combat can't be driven through to completion  | 🚧 WIP         |
| [Combatant.ts](src/objects/Combatant/Combatant.ts)                   | Should carry full combat state and render on the battlefield      | Combatants are invisible during battle        | 🚧 WIP         |
| [InventoryScreen.ts](src/objects/InventoryScreen/InventoryScreen.ts) | Should draw item icon/quantity next to text                       | Inventory list is text-only                   | 📋 Enhancement |

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

1. **Collision detection** (`isSpaceFree()` in [level.utils.ts](src/objects/Level/level.utils.ts)) - Critical game logic
2. **Event system** ([Events.ts](src/lib/Events/Events.ts)) - Core architecture
3. **Movement math** (`moveTowards()` in [movableObject.utils.ts](src/objects/MovableObject/movableObject.utils.ts)) - Determinism required
4. **Animation timing** ([FrameIndexPattern.ts](src/lib/FrameIndexPattern/FrameIndexPattern.ts)) - Frame accuracy
5. **Story flags** ([StoryFlags.ts](src/lib/StoryFlags/StoryFlags.ts)) - State correctness
6. **Schema validation** ([GameSchemas](src/lib/GameSchemas/)) - Malformed config/level JSON should fail loudly, not silently

## TypeScript & Code Quality

### Strict Settings Enforced

- `strict: true` / `strictNullChecks` - All null/undefined safety
- `noUnusedLocals` / `noUnusedParameters` - Dead code detection
- `noImplicitReturns` - All code paths must return
- `noImplicitOverride` - Methods must explicitly use `override`
- `noPropertyAccessFromIndexSignature` / `noFallthroughCasesInSwitch` - stricter object/switch handling
- ESLint (`eslint.config.mjs`) additionally enforces: `@typescript-eslint/naming-convention` (private members require `_` prefix), `explicit-function-return-type`, `no-explicit-any`, `consistent-type-imports`, `prefer-readonly`, `curly`, `eqeqeq`

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
import { objectKeys } from 'src/lib/Game'; // grid/object utilities now live in src/lib/Game/game.utils.ts

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

  override step(delta: number): void {
    // Update state, move, animate — reach shared state via singletons, no root param
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
- [src/objects/MovableObject/movableObject.constants.ts](src/objects/MovableObject/movableObject.constants.ts) - Behavior end / lock-source events
- [src/lib/StoryFlags/storyFlags.constants.ts](src/lib/StoryFlags/storyFlags.constants.ts) - Global story flags
- [public/json/config/items.json](public/json/config/items.json) - Item definitions (loaded into `GameRegistry.items`, no more `itemsRegistry.ts`)
- [src/types/directions.ts](src/types/directions.ts) - Direction constants (`DIRECTIONS`, `Directions`)

### Helpers

- [src/lib/Game/game.utils.ts](src/lib/Game/game.utils.ts) - `toGridSize`/`fromGridSize`/`objectKeys`/`checkDuplicateIds` (no more `src/helpers/` directory)
- [src/lib/Text/text.utils.ts](src/lib/Text/text.utils.ts) - Sprite-text width calculation and line/word wrapping

### Singletons

- `Events` ([src/lib/Events/Events.ts](src/lib/Events/Events.ts)) - Global event bus
- `Game` ([src/lib/Game/Game.ts](src/lib/Game/Game.ts)) - Game init and canvas container sizing
- `GameRegistry` ([src/lib/GameRegistry/GameRegistry.ts](src/lib/GameRegistry/GameRegistry.ts)) - Central data registry (assets, levels, items, tiles, animations, etc.)
- `GameLoader` ([src/lib/Loaders/GameLoader.ts](src/lib/Loaders/GameLoader.ts)) - Orchestrates config/level loading + validation into `GameRegistry`
- `StoryFlags` ([src/lib/StoryFlags/StoryFlags.ts](src/lib/StoryFlags/StoryFlags.ts)) - Game state flags
- `Inventory` ([src/lib/Inventory/Inventory.ts](src/lib/Inventory/Inventory.ts)) - Item collection
- `Progress` ([src/lib/Progress/Progress.ts](src/lib/Progress/Progress.ts)) - Save/load to localStorage
- `LevelStateManager` ([src/lib/LevelStateManager/LevelStateManager.ts](src/lib/LevelStateManager/LevelStateManager.ts)) - Per-level object state
- `TeamMembers` ([src/lib/TeamMembers/TeamMembers.ts](src/lib/TeamMembers/TeamMembers.ts)) - Party member tracking for Battle (WIP)

### Debugging Tips

### Logging Position/State

```typescript
override step(delta: number): void {
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
4. **Hardcoded pixel positions**: Use `toGridSize(n)` (from [src/lib/Game](src/lib/Game/game.utils.ts)) for grid-to-pixel conversion
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
- **New animation**: Add keyframes to [public/json/config/animations.json](public/json/config/animations.json) (no per-object animation file anymore)
- **New event**: Define in the feature's `*.constants.ts` and emit/listen as needed
- **New level**: Create JSON in `public/json/levels/{levelId}.json`, add the ID to [public/json/config/levelsIds.json](public/json/config/levelsIds.json)

### For Optimization

- Profile rendering in [Main.ts](src/objects/Main/Main.ts) draw method
- Check collision detection via `isSpaceFree()` ([level.utils.ts](src/objects/Level/level.utils.ts))
- Optimize sprite batching in [Sprite.ts](src/objects/Sprite/Sprite.ts)

## Architecture Documentation

For deeper architectural details (MovableObject inheritance decisions, data flow examples, decoration tiling constraints), see [ARCHITECTURE.md](ARCHITECTURE.md).
