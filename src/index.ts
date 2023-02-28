import * as process from 'process';

import { config } from 'dotenv';
config();

import path from 'path';
import { initializeBot } from 'djs-marshal';
import { IntentsBitField } from 'discord.js';

const client = initializeBot({
  intents: [IntentsBitField.Flags.Guilds],
  slashCommandsPath: path.join(__dirname, 'commands'),
});

void client.login(process.env.NODE_ENV === 'prod' ? process.env.PROD_TOKEN : process.env.DEV_TOKEN);
