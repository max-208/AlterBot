const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('translitterate')
        .setDescription("permet de changer d'alphabet un mot ou une expression")
        .addSubcommand(subcommand => 
                subcommand.setName("lat_to_georg")
                          .setDescription("translittère de l'alphabet latin vers l'alphabet georgien")
                          .addStringOption(option => 
                                option.setName('text')
                                      .setDescription("le mot ou l'expression que vous souhaitez translittérer")
                                      .setRequired(true)
                            )
            )
        .addSubcommand(subcommand => 
            subcommand.setName("lat_to_cyr")
                      .setDescription("translittère de l'alphabet latin vers l'alphabet cyrillique")
                      .addStringOption(option => 
                            option.setName('text')
                                  .setDescription("le mot ou l'expression que vous souhaitez translittérer")
                                  .setRequired(true)
                        )
        )
        .addSubcommand(subcommand => 
            subcommand.setName("georg_to_lat")
                      .setDescription("translittère de l'alphabet georgien vers l'alphabet latin")
                      .addStringOption(option => 
                            option.setName('text')
                                  .setDescription("le mot ou l'expression que vous souhaitez translittérer")
                                  .setRequired(true)
                        )
        )
        .addSubcommand(subcommand => 
            subcommand.setName("cyr_to_lat")
                      .setDescription("translittère de l'alphabet cyrillique vers l'alphabet latin")
                      .addStringOption(option => 
                            option.setName('text')
                                  .setDescription("le mot ou l'expression que vous souhaitez translittérer")
                                  .setRequired(true)
                        )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("kor_to_lat")
                      .setDescription("translittère de l'alphabet coréen vers l'alphabet latin")
                      .addStringOption(option =>
                            option.setName('text')
                                    .setDescription("le mot ou l'expression que vous souhaitez translittérer")
                                    .setRequired(true)
                      )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("lat_to_kor")
                      .setDescription("translittère de l'alphabet latin vers l'alphabet coréen")
                      .addStringOption(option =>
                            option.setName('text')
                                  .setDescription("le mot ou l'expression que vous souhaitez translittérer")
                                  .setRequired(true)
                        )
        ),
        
        async execute(interaction){
            let text = interaction.options.getString('text');
            if (interaction.options.getSubcommand() === 'lat_to_georg'){
                await interaction.reply(data.translitterate.lat_to_georg(text));
            }
            else if (interaction.options.getSubcommand() === 'lat_to_cyr'){
                await interaction.reply(data.translitterate.lat_to_cyr(text));
            }
            else if (interaction.options.getSubcommand() === 'georg_to_lat'){
                await interaction.reply(data.translitterate.georg_to_lat(text));
            }
            else if (interaction.options.getSubcommand() == 'cyr_to_lat'){
                await interaction.reply(data.translitterate.cyr_to_lat(text));
            }
            else if (interaction.options.getSubcommand() == 'kor_to_lat'){
                await interaction.reply(data.translitterate.kor_to_lat(text));
            }
            else if (interaction.options.getSubcommand() == 'lat_to_kor'){
                await interaction.reply(data.translitterate.lat_to_kor(text));
            }
        }

}