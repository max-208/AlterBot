const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('resoundex')
        .setDescription('commande pour awing, permet de resoundex tout ou partie de la table')
        .addSubcommand(subcommand =>
            subcommand.setName('all')
                      .setDescription('attention risque de latence, resoundex toute la table')

        )
        .addSubcommand(subcommand =>
            subcommand.setName('byid')
                      .setDescription('ne resoundex qu\'un seul id')
                      .addIntegerOption(option=>
                        option.setName('id')
                              .setDescription('l\'id du mot à resoundex')
                              .setRequired(true)
                        )
            )
        .addSubcommand(subcommand =>
            subcommand.setName('search')
                      .setDescription('cherche quels sont les mots sans soundex')
                      .addIntegerOption(option=>
                        option.setName('offset')
                              .setDescription('décalage quand il y a trop de mot')
                        )
            ),

    async execute(interaction) {
        if (interaction.user.id == '361257883247050762'){
            if (interaction.options.getSubcommand() == 'all'){
                data.soundex.initSoundex();
                await interaction.reply('soundex réinitialisé');
            }
            else if (interaction.options.getSubcommand() == 'search'){
                let offset = interaction.options.getInteger('offset');
                if (offset == 'undefined' || offset == 'null' || offset == null) { offset = 0; }
                result = await data.soundex.searchNoSoundex(offset);
                let list = "id: ";
                for (const element of result){
                    list += `${element.id}, `;
                }
                await interaction.reply(list);
            }
            else if (interaction.options.getSubcommand() == 'byid'){
                const id = interaction.options.getInteger('id');
                data.soundex.soundexId(id);
                await interaction.reply('done');
            }
    }
    }
}