import type { ResourceFetcher } from './gameLoader.types';

export class HttpResourceFetcher implements ResourceFetcher {
  async fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new DOMException(`Failed to fetch resource at ${url}: ${response.statusText}`, 'NetworkError');
    }
    return response.json();
  }
}
