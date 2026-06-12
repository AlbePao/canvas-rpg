import { StoryFlags } from '../StoryFlags';

const SAVE_FILE_KEY = 'saveData';

export class Progress {
  private readonly _storage = window.localStorage;

  async save(): Promise<void> {
    // TODO: track hero current map, coordinates and facing direction data
    // TODO: track hero current inventory and its state and current team and its state
    // TODO: track current story flags
    this._storage.setItem(
      SAVE_FILE_KEY,
      JSON.stringify({
        hero: {},
        storyFlags: StoryFlags.flags,
      }),
    );
    return Promise.resolve();
  }

  getSaveFile(): unknown {
    const saveFile = this._storage.getItem(SAVE_FILE_KEY);
    return saveFile ? JSON.parse(saveFile) : null;
  }

  async load(): Promise<unknown> {
    // const savedFile = await this.getSaveFile();

    // Set saved file data to Hero class, Inventory, Team and Story flags and set hero position and map
    return Promise.resolve(this.getSaveFile());
  }
}
