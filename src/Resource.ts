export interface Resource {
  image: HTMLImageElement;
  isLoaded: boolean;
}

class Resources {
  // Every image we want to download
  toLoad = {
    hero: '/sprites/hero-sheet.png',
    shadow: '/sprites/shadow.png',
    rod: '/sprites/rod.png',
    exit: '/sprites/exit.png',
    // Outdoor
    sky: '/sprites/sky.png',
    ground: '/sprites/ground.png',
    // Cave
    cave: '/sprites/cave.png',
    caveGround: '/sprites/cave-ground.png',
    // NPCs
    knight: '/sprites/knight-sheet-1.png',
  } as const;

  // A bucket to keep all of our images
  images: Record<string, Resource> = {};

  constructor() {
    Object.keys(this.toLoad).forEach((key) => {
      const imageKey = key as keyof typeof this.toLoad;
      const img = new Image();
      img.src = this.toLoad[imageKey];
      this.images[imageKey] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[imageKey].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
