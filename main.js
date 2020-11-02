require('dotenv').config();
const cron = require('cron');
const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require('fs');
const commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));

const prefix = process.env.PREFIX;
const roleId = process.env.ROLE_ID;
client.once('ready', () => {
    console.log('Reminders are ready!');
    
    let scheduledMessage = new cron.CronJob('00 00 19 * * 1-5', () => {
        var testChannel = client.channels.cache.get(process.env.CHANNEL_ID);
        testChannel.send("<@&" + roleId + "> One hour reminder for daily standups!");
    })

    let scheduledMessage1 = new cron.CronJob('00 00 20 * * 1-5', () => {
        var testChannel = client.channels.cache.get(process.env.CHANNEL_ID);
        testChannel.send("<@&" + roleId + "> It's about that time! Turn in daily standups!");
    })
        
    scheduledMessage.start()
    scheduledMessage1.start()
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        const embed = new Discord.MessageEmbed()
            .setColor(0x1D8286)
            let commandsFound = 0;

             for(var cmd in commands){
             commandsFound++;
             embed.setTitle('Commands available: ' + commandsFound);
             embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`);
             embed.setFooter('Currently showing user commands.');

            }

            message.channel.send(embed);
    }

    if(command === 'ppt'){
        message.channel.send('https://youtu.be/Rzcspt0Y9zk');
    }
    else if(command === 'optimize'){
        message.channel.send('https://www.youtube.com/watch?v=8pMc3ULw2ZI&feature=youtu.be');
    }
})

client.login(process.env.CLIENT_TOKEN);


