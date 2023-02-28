import path from 'path';
import * as fs from 'fs';

const cachePath = path.join(__dirname, '..', 'images', 'cache.json');

/** Check the meme cache and return the id if found */
export const checkCache = async (meme: string, text: string) => {
  if (!fs.existsSync(cachePath)) {
    // make cache file
    fs.writeFileSync(cachePath, '{"megamind":{}}');
    return null;
  }

  const cache = await import(cachePath);
  console.log(cache);
  const foundMeme = cache[meme][text];
  return !!foundMeme ? foundMeme : null;
};

/** Save a meme id to the cache */
export const saveToCache = async (meme: string, text: string, id: string) => {
  const cache = (await import(cachePath)).default;
  console.log(cache);
  if (cache[meme]) {
    cache[meme][text] = id;
    fs.writeFileSync(cachePath, JSON.stringify(cache));
  }
};
