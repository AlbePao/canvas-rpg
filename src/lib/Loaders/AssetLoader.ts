import { isUnsafeObjectKey } from '../Game';
import type { AssetLoaded, AssetsRegistry, AssetsToLoad } from '../GameRegistry';
import { Vector2 } from '../Vector2';

export function loadAssetResources(data: AssetsToLoad): AssetsRegistry {
  const result: Record<string, AssetLoaded> = {};

  for (const [key, assetData] of Object.entries(data)) {
    if (isUnsafeObjectKey(key)) {
      continue;
    }

    const { src, frameSize, position, ...otherData } = assetData;
    const img = new Image();

    const loadedAsset: AssetLoaded = {
      ...otherData,
      frameSize: frameSize ? new Vector2(frameSize.x, frameSize.y) : undefined,
      position: position ? new Vector2(position.x, position.y) : undefined,
      resource: {
        image: img,
        isLoaded: false,
      },
    };

    img.onload = (): void => {
      loadedAsset.resource.isLoaded = true;
    };
    img.src = src;

    result[key] = loadedAsset;
  }

  return result;
}
