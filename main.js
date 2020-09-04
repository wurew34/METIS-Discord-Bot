require('dotenv').config();
const cron = require('cron');
const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require('fs');
const commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));

const prefix = config.prefix;

client.once('ready', () => {
    console.log('Reminders are ready!');
    
    let scheduledMessage = new cron.CronJob('00 00 21 * * *', () => {
        var testChannel = client.channels.cache.get(config.channelid);
        testChannel.send("@Capstone 1 Members  @Capstone 2 Members @Senior Project Members Reminder for daily standups!");
    })
        
    scheduledMessage.start()
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

client.login(config.token);


