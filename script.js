const fs = require("fs");
const Discord = require('discord.js');
const winston = require("winston");
const { prefix, token } = require("./config.json");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}


bot.once("ready", () => {
    console.log("Connected as " + bot.user.tag);

    bot.user.setActivity("!destiny", { type: "WATCHING" });
})

bot.on("message", message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;
    const command = bot.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command. Bzz")
    }


})

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log' }),
    ],
    format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

bot.on('ready', () => logger.log('info', `${bot.user.tag} is online!`));
bot.on('debug', m => logger.log('debug', m));
bot.on('warn', m => logger.log('warn', m));
bot.on('error', m => logger.log('error', m));

process.on('uncaughtException', error => logger.log('error', error));

bot.login(token);