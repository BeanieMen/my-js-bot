const { Client, Message } = require('discord.js');

describe('add command', () => {
  let client;
  let message;

  beforeEach(() => {
    client = new Client({ intents: 7796 });
    message = {
      content: '!add 2 3',
      reply: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add two numbers', () => {
    // Your bot's code
    const prefix = '!';
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(' ');
      const command = args.shift().toLowerCase();

      if (command === 'add') {
        const num1 = parseInt(args[0]);
        const num2 = parseInt(args[1]);

        if (isNaN(num1) || isNaN(num2)) {
          message.reply('Please provide two numbers.');
        } else {
          const result = num1 + num2;
          message.reply(`The result is ${result}`);
        }
      }
    }

    expect(message.reply).toHaveBeenCalledWith('The result is 5');
  });
});
