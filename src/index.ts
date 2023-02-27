require('dotenv').config();

import path from 'path';
import { initializeBot } from 'djs-marshal';
import { Intents } from 'discord.js';

const client = initializeBot({
  intents: [Intents.FLAGS.GUILDS],
  slashCommandsPath: path.join(__dirname, 'commands'),
});

void client.login(process.env.token);
