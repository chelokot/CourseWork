import { Bot } from "grammy";
import { randomInteger } from "./utilites.js";
import { getUserById, updateUserLastMined } from "./database.js";

const bot = new Bot(process.env.TOKEN as string);

console.log("Bot created");

bot.command("start", (context) => {
  context.reply("Hello");
});

bot.command("mine", (context) => {
  if (context.message === undefined) {
    return;
  }
  const user = getUserById(context.message.from.id);
  if (Date.now() - Number(user.lastMined) < 10_000) {
    context.reply(`You have to wait more before you mine again`);
    return;
  }
  const gems = randomInteger(-1, 1);
  let result;
  if (gems < 0) {
    result = `lost ${-1 * gems} gems 💎`;
  } else if (gems === 0) {
    result = `got nothing`;
  } else {
    result = `got ${gems} gems 💎`;
  }
  context.reply(`User ${context.message.from.first_name} ${result}`);
  updateUserLastMined(context.message.from.id, new Date());
});

bot.on("message:text", (context) => {
  const text = context.message.text;
  const userId = context.message.from.id;
  context.reply(`You (${userId}) wrote: ${text}`);
});

bot.start();
console.log("Bot started");
