import { defineSlashCommand } from 'djs-marshal';
import { ApplicationCommandOptionType } from 'discord.js';
import path from 'path';
import sharp from 'sharp';
import { nanoid } from 'nanoid';
import { checkCache, saveToCache } from '../cache';

export default defineSlashCommand({
  name: 'meme',
  description: 'meme',
  options: [
    {
      name: 'meme',
      description: 'meme',
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: 'Megamind',
          value: 'megamind',
        },
      ],
    },
    {
      name: 'text',
      description: 'text',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  commandType: 'global',
  async execute(command) {
    const meme = <string>command.options.get('meme')?.value;
    const text = <string>command.options.get('text')?.value;

    if (!meme || !text) {
      await command.reply({
        ephemeral: true,
        content: 'Options meme and text are required',
      });
      return;
    }

    const cacheId = await checkCache(meme, text);
    if (cacheId) {
      await command.reply({
        files: [path.join('images', `${cacheId}.png`)],
      });
      return;
    }

    const meta = await sharp(`templates/${meme}.png`).metadata();

    const svgImage = `
    <svg width="${meta.width}" height="${meta.height}">
    <style>
      .title { fill: #fff; font-size: 36px; font-weight: bold; font-family: sans-serif;}
    </style>
    <text x="50%" y="10%" text-anchor="middle" class="title">${text}</text>
    </svg>`;

    const svgBuffer = Buffer.from(svgImage);
    const id = nanoid(10);

    await sharp('templates/megamind.png')
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(`images/${id}.png`);

    // save to cache
    await saveToCache(meme, text, id);

    await command.reply({
      files: [path.join('images', `${id}.png`)],
    });
  },
});
