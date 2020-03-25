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

    bot.user.setActivity("you", { type: "WATCHING" });
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

// bot.on("message", message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command === "args-info") {
//         if (!args.length) {
//             return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
//         } else if (args[0] === "foo") {
//             return message.channel.send("bar")
//         } else if (command === "kick") {
//             const taggedUser = message.mentions.users.first();
//             message.channel.send(`You wanted to kick: ${taggedUser.username}`)
//         }
//     }

//     if (command === "avatar") {
//         if (!message.mentions.users.size) {
//             return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`)
//         }

//         const avatarList = message.mentions.users.map(user => {
//             return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`
//         })

//         message.channel.send(avatarList)
//     }

//     if (command === "purge") {
//         const amount = parseInt(args[0]) + 1;

//         if (isNaN(amount)) {
//             return message.reply("That doesn't seem to bee a valid number.")
//         } else if (amount <= 1 || amount > 100) {
//             return message.reply("You need to input a number between 1 and 99.")
//         }

//         message.channel.bulkDelete(amount, true).catch(err => {
//             console.error(err);
//             message.channel.send("Error trying to purge messages on this channel.")
//         });
//     }

// })


// if (message.content === `${prefix}ping`) {
//     message.channel.send("Pong.");
// } else if (message.content.startsWith(`${prefix}destiny`)) {
//     message.channel.send("Trash game.")
// } else if (message.content === `${prefix}server`) {
//     message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
// } else if (message.content === `${prefix}user-info`) {
//     message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
// }