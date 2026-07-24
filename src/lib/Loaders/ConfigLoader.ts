import { GameRegistry } from '../GameRegistry';
import {
  createAnimationsSchema,
  createArrowDirectionFrameMapSchema,
  createAssetsSchema,
  createCharsFrameMapSchema,
  createChestStatusFrameMapSchema,
  createDecorationsFrameMapSchema,
  createItemsRegistrySchema,
  createTilesFrameMapSchema,
  LevelsIdsSchema,
} from '../GameSchemas';
import { loadAssetResources } from './AssetLoader';
import type { LoadedConfigResult, ResourceFetcher } from './gameLoader.types';

export class ConfigLoader {
  constructor(private readonly _fetcher: ResourceFetcher) {}

  /**
   * Fetches, validates and registers all the global game configurations.
   */
  async loadAll(): Promise<LoadedConfigResult> {
    const [
      animationsData,
      arrowDirectionData,
      assetsData,
      charsData,
      chestStatusData,
      decorationsData,
      itemsData,
      levelsIdsData,
      tilesData,
    ] = await Promise.all([
      this._fetcher.fetchJson('/json/config/animations.json'),
      this._fetcher.fetchJson('/json/config/arrowDirectionFrameMap.json'),
      this._fetcher.fetchJson('/json/config/assets.json'),
      this._fetcher.fetchJson('/json/config/charsFrameMap.json'),
      this._fetcher.fetchJson('/json/config/chestStatusFrameMap.json'),
      this._fetcher.fetchJson('/json/config/decorationsFrameMap.json'),
      this._fetcher.fetchJson('/json/config/items.json'),
      this._fetcher.fetchJson('/json/config/levelsIds.json'),
      this._fetcher.fetchJson('/json/config/tilesFrameMap.json'),
    ]);

    // Validation and schema generation
    const { schema: AnimationsSchema } = createAnimationsSchema(animationsData);
    const { schema: ArrowDirectionSchema } = createArrowDirectionFrameMapSchema(arrowDirectionData);
    const { schema: AssetsSchema } = createAssetsSchema(assetsData);
    const { schema: CharsSchema } = createCharsFrameMapSchema(charsData);
    const { schema: ChestStatusSchema } = createChestStatusFrameMapSchema(chestStatusData);
    const { schema: DecorationsSchema, keys: decorationKeys } = createDecorationsFrameMapSchema(decorationsData);
    const { schema: ItemsSchema, keys: itemKeys } = createItemsRegistrySchema(itemsData);
    const levelsIds = LevelsIdsSchema.parse(levelsIdsData);
    const { schema: TilesSchema, keys: tileKeys } = createTilesFrameMapSchema(tilesData);

    const processedAssets = loadAssetResources(AssetsSchema.parse(assetsData));

    // Load the validated data into the GameRegistry
    GameRegistry.loadAnimationsRegistry(AnimationsSchema.parse(animationsData));
    GameRegistry.loadLevelsIdsRegistry(levelsIds);

    // Load the validated data into their respective registries. Note: The levels registry is loaded separately in the LevelLoader, so we don't load it here.
    GameRegistry.arrowDirections.load(ArrowDirectionSchema.parse(arrowDirectionData));
    GameRegistry.assets.load(processedAssets);
    GameRegistry.chars.load(CharsSchema.parse(charsData));
    GameRegistry.chestStatuses.load(ChestStatusSchema.parse(chestStatusData));
    GameRegistry.decorations.load(DecorationsSchema.parse(decorationsData));
    GameRegistry.items.load(ItemsSchema.parse(itemsData));
    GameRegistry.tiles.load(TilesSchema.parse(tilesData));

    return {
      levelSchemas: {
        decorationKeys,
        itemKeys,
        levelsIds,
        tileKeys,
      },
    };
  }
}
