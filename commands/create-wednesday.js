module.exports = {
    name: "create-wednesday",
    description: "Create Sign Up",
    execute(message, args) {
        const avatar = message.author.displayAvatarURL({ format: "png", dynamic: true });

        message.channel.send({
            embed:
            {
                "title": "Crown of Sorrow",
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
                        "name": "Wednesday Raid",
                        "value": "usernames\nwill\ngo here"
                    }
                ]
            }
        })

    }
}
