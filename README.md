# Canvas RPG

A 2D role-playing game built with TypeScript, the HTML5 Canvas API, and Vite.
The project does not use a game engine. Gameplay is grid-based, uses 16-pixel
cells, and is driven by JSON configuration and level data.

## Features

- Fixed-timestep game loop with Canvas 2D rendering
- Grid-based exploration, collision detection, and camera follow
- Hero and NPC movement with interactions, dialogue, and story flags
- Collectible items, inventory, chests, menus, and save data
- Data-driven assets, animations, items, tiles, and levels
- Zod validation for configuration and level JSON files
- On-demand level loading and screen transitions

## Requirements

- Node.js
- npm

## Getting started

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in a browser.

## Available scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start the Vite development server        |
| `npm run build`    | Type-check and create a production build |
| `npm run preview`  | Preview the production build locally     |
| `npm run lint`     | Run ESLint on the source code            |
| `npm run lint:fix` | Automatically fix supported lint issues  |

## Controls

| Action                           | Keys                 |
| -------------------------------- | -------------------- |
| Move the hero and navigate menus | Arrow keys or `WASD` |
| Interact or confirm              | `Enter` or `Space`   |
| Open or close the pause menu     | `Escape`             |
| Leave a secondary screen         | `Q`                  |

## Architecture

The application starts in [`src/main.ts`](src/main.ts), which initializes the
game through `Game.initializeGame()`.

```text
main.ts
  -> Game
    -> GameLoader
      -> ConfigLoader / LevelLoader
        -> GameRegistry
    -> GameLoop
      -> Main
        -> LevelBuilder
          -> Level, Hero, NPCs, items, tiles, and UI
```

Key systems include:

- **Game loop:** `GameLoop` schedules updates and rendering using
  `requestAnimationFrame` and a fixed timestep.
- **Game objects:** Objects follow the `ready()` → `step()` → `drawImage()`
  lifecycle and are composed through parent/child relationships.
- **Events:** The shared event bus coordinates movement, interactions, level
  changes, dialogue, menus, and transitions.
- **Movement:** Hero and NPCs move on the grid, check walls and solid objects,
  and interpolate toward destination cells.
- **Persistence:** `Progress` stores save data in browser `localStorage`.
- **Shared state:** Inventory, story flags, level state, and team members are
  managed by dedicated library singletons.

For deeper architectural details, see
[`ARCHITECTURE.md`](ARCHITECTURE.md) and [`AGENTS.md`](AGENTS.md).

## Data and game content

The project keeps game content separate from TypeScript code:

- [`public/json/config/`](public/json/config/) contains global configuration
  for assets, animations, items, frame maps, tiles, and level IDs.
- [`public/json/levels/`](public/json/levels/) contains one JSON file per level,
  including tiles, walls, the default hero position, and game objects.
- [`public/sprites/`](public/sprites/) contains sprite sheets and image assets.

`ConfigLoader` and `LevelLoader` fetch and validate JSON data with the schemas
in [`src/lib/GameSchemas/`](src/lib/GameSchemas/). Validated data is exposed
through `GameRegistry`. Levels are loaded on demand, including levels connected
through exits.

### Adding a level

1. Create a JSON file in [`public/json/levels/`](public/json/levels/).
2. Add its ID to [`public/json/config/levelsIds.json`](public/json/config/levelsIds.json).
3. Ensure referenced asset, tile, item, animation, and destination-level IDs
   exist in the corresponding configuration files.

## Project structure

```text
src/
  lib/       Shared systems: game loop, input, events, loaders, registries, and state
  objects/   Game scenes and objects: hero, levels, NPCs, menus, dialogue, and more
  types/     Shared TypeScript types
public/
  json/      Configuration and level data
  sprites/   Graphics and sprite sheets
```

## Project status

Exploration, levels, interactive objects, menus, dialogue, inventory, and
local save data are implemented. The battle system is still a work in
progress.
