import { SlashCommandBuilder } from 'discord.js';

const builder = new SlashCommandBuilder()
    .setName('head')
    .setDescription('Post given minecraft player\'s mc head')
    .addStringOption(
        (option) =>
        option 
            .setName('player')
            .setDescription('Used to get MC-Head image.')
            .setRequired(true)
    )
    .addStringOption(
        (option) =>
        option
        .setName('type')
        .setDescription('Type of MC-Head image.')
        .setRequired(true)
        .addChoices(
            {
                name: 'head',
                value: 'head'
            },
            {
                name: 'body',
                value: 'body'
            },
            {
                name: 'skin',
                value: 'player'
            },
            {
                name: 'avatar',
                value: 'avatar'
            },
        )
    )
    .addIntegerOption(
        (option) =>
        option
        .setName('size')
        .setDescription('Size for MC-Head image.')
        .setRequired(true)
        .setMinValue(100)
        .setMaxValue(500)
    )

export default builder.toJSON()

//['Head', 'head'], ['Body', 'body'],['Skin', 'skin'], ['Avatar', 'avatar']