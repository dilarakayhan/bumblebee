module.exports = {
    name: "create-sunday",
    description: "Create Sign Up",
    execute(message, args) {
        const avatar = message.author.displayAvatarURL({ format: "png", dynamic: true });

        message.channel.send({
            embed:
            {
                "title": "Scourge of the Past",
                "color": 0xfcc100,
                "timestamp": new Date(),
                "footer": {
                    text: "Golden Age Academy | Bumblebee"
                },
                "author": {
                    "name": `${message.author.username}`,
                    "icon_url": avatar
                },
                "fields": [
                    {
                        "name": "Sunday Raid",
                        "value": "usernames\nwill\ngo here"
                    }
                ]
            }
        })

    }
}
