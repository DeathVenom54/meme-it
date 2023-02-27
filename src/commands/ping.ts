import { SlashCommand } from 'djs-marshal';

export default {
  name: 'ping',
  description: 'Check the ping',
  execute(command) {
    void command.reply({
      content: `Pong!\nBot latency: ${command.client.ws.ping}ms`,
      ephemeral: true,
    });
  },
} as SlashCommand;
