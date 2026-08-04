# Canvas RPG - Deep Architecture Notes

This file covers implementation details and design decisions that are too deep for [AGENTS.md](AGENTS.md) but useful when working on the systems below. Start with AGENTS.md for the general architecture, data-driven config/level pipeline, and lifecycle basics — this file assumes that context.

## Hero & MovableObject Inheritance Decision

`src/objects/MovableObject/MovableObject.ts`: `abstract class MovableObject extends InteractiveObject`

Introduced to deduplicate identical logic between `Hero.ts` and `Npc.ts`. Houses:

- `facingDirection: Directions` (mutable, default `'down'`)
- `destinationPosition: Vector2` (mutable, NOT readonly — Hero swaps the whole reference on item pickup; Npc only mutates `.x`/`.y`)
- `protected abstract readonly body: Sprite` — subclasses must supply their own body sprite
- `protected isLocked` / `protected walkingSpeed` (mutable — Npc changes `walkingSpeed` per behavior)
- `override ready()`: subscribes to `PAUSE_ON/OFF`, `TEXT_BOX_OPEN/CLOSE`, `SCREEN_TRANSITION_START/END` to toggle `isLocked` and pause/resume `body.animations`. Subclasses MUST call `super.ready()` first.
- `protected changeFacingDirection(direction)`: updates `facingDirection` + plays the matching standing-direction animation
- `protected createShadowSprite(id)`: shared shadow Sprite factory (frameSize 32x32, offset `(-8,-19)`)

**Inheritance direction decision**: `MovableObject extends InteractiveObject` (not the reverse) so that `Chest` (which extends `InteractiveObject` directly, and is stationary) is NOT polluted with movement fields. Tradeoff: `Hero` inherits dialogue capability (`getContent()`) it doesn't use, but doesn't need to pass a dummy `interactionConfig` anymore — `interactionConfig` is optional on `InteractiveObjectConfig` and defaults to empty content.

Npc keeps its own `_isWalking`, `_isAwaitingTextBoxClose` fields and `step()`/`startBehavior()` methods (not shared, behavior-driven walk logic differs from Hero's input-driven `tryMove()`).

## Data Flow Examples

### Player Input → Movement

1. `Input.keydown` → direction queue updated
2. `Hero.step()` calls `tryMove()`
3. Next grid position calculated, checked against `isSpaceFree()`
4. `moveTowards()` smoothly interpolates position
5. Emits `HERO_POSITION` event when the grid cell changes

### Hero Action → Dialogue

1. Hero presses Space
2. `step()` checks adjacent position for solid `InteractiveObject`s, emits `HERO_REQUESTS_ACTION`
3. `Main` (or the relevant listener) calls `npc.getContent()` / `chest.getContent()`
4. `InteractiveObject.getContent()` resolves via `StoryFlags.getRelevantScenario()`
5. `TextBox` opens (`TEXT_BOX_OPEN`), Hero is locked via `MovableObject`'s pause/lock subscriptions
6. On close (`TEXT_BOX_END`), `addsFlag`/`itemKey`/`options`/`battle` from the matched scenario is applied

### Level Transition

1. Hero walks onto an `Exit` gameObject
2. `Exit` detects collision via `HERO_POSITION`, emits `HERO_EXITS` with `newLevelId`/`newHeroPosition`
3. Listener destroys the current `LevelBuilder` instance and creates `new LevelBuilder({ id: newLevelId })`
4. `Camera` resets position on `CHANGE_LEVEL`

## Decorations bigger than 16x16 (GRID_SIZE)

- `Sprite`/`Decoration` frame math assumes every frame in a tileset frame map is a 16x16 cell. Changing `frameSize` on `Decoration`'s body Sprite to anything other than 16x16 breaks the frame offset math (it misreads the sheet) — do NOT do this.
- Instead, tall/wide decorations are pre-split in the tileset into 16x16 pieces named with `Upper`/`Middle`/`Lower` and `Left`/`Right` suffixes (e.g. `treeSmGreenUpper` + `treeSmGreenLower`, `spruceGreenUpperLeft/Right` + `MiddleLeft/Right` + `LowerLeft/Right`). Compose a bigger decoration by placing one `Decoration` JSON entry PER 16x16 piece, at adjacent grid coords.
- Collision only checks direct children of `Level` (top-level siblings) for `isSolid` + exact position match — nested children inside a `Decoration` are invisible to collision. So each piece that should block movement must be its own top-level `Decoration` (e.g. base/trunk tile: `isSolid: true`, default drawLayer).
- The `worldTop` draw layer bucket only guarantees "always drawn above Hero" when the item is a top-level sibling of Hero in `Level`'s children (Level buckets `floor` → Y-sorted default → `worldTop`, drawn in that order). Nesting a `worldTop` child inside a `Decoration` only affects draw order within that Decoration's own subtree, NOT relative to Hero — so canopy/upper pieces must ALSO be separate top-level `Decoration` entries with `drawLayer: 'worldTop'` (non-solid, purely visual), not nested Sprite children.
- Example (small tree = 2 tiles tall): base piece at (x,y) `key: treeSmGreenLower`, `isSolid: true`; canopy piece at (x, y-1) `key: treeSmGreenUpper`, `drawLayer: 'worldTop'`, no `isSolid`.

## Key Design Principles

- **Composition over inheritance**: Use GameObject nesting (`addChild()`)
- **Events over direct references**: Decouple systems via `Events`
- **Singletons for globals**: `GameRegistry`, `Events`, `StoryFlags`, `GameLoader`, `Inventory`, `Progress`
- **Fixed timestep**: Deterministic gameplay (16.67ms/frame)
- **Declarative animations**: `FrameIndexPattern` + `public/json/config/animations.json` define timing, not per-object TypeScript files
- **Grid-based spatial structure**: Simple collision detection via `isSpaceFree()` and `Set<string>` wall coordinates
- **Data-driven over hardcoded**: assets/items/levels/animations are JSON validated by Zod (`GameSchemas`) and loaded into `GameRegistry` — see [AGENTS.md - Data-Driven Architecture](AGENTS.md#data-driven-architecture-configlevels)
