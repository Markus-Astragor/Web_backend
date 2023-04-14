const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const { Telegraf } = require('telegraf');
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const baseUrl = process.env.BASE_URL;
const bot = new Telegraf(telegramBotToken);

module.exports = async(app, emitter) => {
  const router = await bot.createWebhook({
    domain: baseUrl
  })

  bot.start((ctx) => {
    ctx.reply('Hi, user. Use command "/login" to use your auth token \n\nExample: /login 12345-54645-564564...')
  })
  
  bot.command('login', (ctx) => {
    const [command, id] = ctx.message.text.split(' ');
    const eventName = `login-${id}`;
    console.log(`Try to login id:${id}`);
    const userInfo = {
      fistName: ctx.from.first_name,
      lastName: ctx.from.last_name || ''
    };
  console.log(userInfo);
    if (!Object.values(userInfo).find(e => e.length)) {
      userInfo.firstName = ctx.from.username || ctx.from.id;
     }
   
     emitter.emit(eventName, userInfo); 
  });
  
  app.use(router);
};

