import { objectKeys } from '../Game';
import { Singleton } from '../Singleton';
import { ASSETS_TO_LOAD } from './resources.constants';
import type { Resource, ResourceKey } from './resources.types';

class ResourcesSingleton extends Singleton<ResourcesSingleton>() {
  // A bucket to keep all of our images
  readonly images: Record<ResourceKey, Resource> = {} as Record<ResourceKey, Resource>;

  constructor() {
    super();
    objectKeys(ASSETS_TO_LOAD).forEach((key) => {
      const img = new Image();
      img.src = ASSETS_TO_LOAD[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = (): void => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const Resources = ResourcesSingleton.getInstance();
