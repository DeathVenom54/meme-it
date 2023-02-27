import { SlashCommand } from 'djs-marshal';

export default {
  name: 'delayedPing',
  description: 'Play ping pong with a slowpoke',
  deferEphemeral: true,
  execute(command) {
    setTimeout(() => command.editReply('Pong!'), 5001);
  },
} as SlashCommand;
