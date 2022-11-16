import { 
    Client, 
    EmbedBuilder, 
    GatewayIntentBits,
    REST,
    Routes
} from 'discord.js';
import { config } from 'dotenv';
import HeadCommand from '../src/commands/HeadCommand.js';

//config process.env
config()

//vars
const token = process.env.TOKEN
const client_id = process.env.CLIENT_ID
const guild_id = process.env.GUILD_ID
const client = new Client({
    intents:
    [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
const rest = new REST({version: '10'}).setToken(token)
function errorEmbed(err = 'Unexpected Error') {
    let embed = new EmbedBuilder()
        .setTitle('Error')
        .setColor(0xf54242)
        .addFields({
            name: 'Error:',
            value: err
        })
    return embed
}
//main
client.on('ready', () => console.log(`MC-Head Bot is ready! ${client.user.tag}`))

client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
        if(interaction.commandName === 'head') {
            //embed
            let embed = new EmbedBuilder()
            .setTitle(interaction.options.getString('player'))
            .setImage(`https://mc-heads.net/${interaction.options.getString('type')}/${interaction.options.getString('player')}/${interaction.options.getInteger('size')}`)
            //reply
            interaction.reply({
                embeds: [embed]
            })
        } else {
            interaction.reply({
                embeds: [errorEmbed('Something went wrong.')]
            })
        }
    }
})

async function main() {
    const commands = [
        HeadCommand
    ]
    try{
        console.log('Started refreshing (/) commands')
        await rest.put(Routes.applicationGuildCommands(client_id, guild_id),
        {
            body: commands,
        })
        client.login(token)
    } catch (error) {
        console.error(error);
    }
}

main()