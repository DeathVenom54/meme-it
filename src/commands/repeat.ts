import { SlashCommand } from 'djs-marshal';

export default {
  name: 'repeat',
  description: 'Repeat what you said',
  execute(command) {
    const text = command.options.getString('text');
    if (text) void command.reply({ content: text });
  },
  options: [
    {
      name: 'text',
      description: 'the text to repeat',
      type: 'STRING',
      required: true,
    },
  ],
} as SlashCommand;
