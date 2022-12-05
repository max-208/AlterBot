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
        ),
        
        async execute(interaction){
            let text = interaction.options.getString('text');
            let result = "";
            if (interaction.options.getSubcommand() === 'lat_to_georg'){
                text = text.toLowerCase();
                text = text.replace(/ts/, data.alphabet.georgian[0].ts).replace(/dz/, data.alphabet.georgian[0].dz).replace(/tš/, data.alphabet.georgian[0].tš).replace(/dž/, data.alphabet.georgian[0].dž);
                for (const iterator of text) {
                    if (data.alphabet.georgian[0][iterator] != undefined) {
                        result += data.alphabet.georgian[0][iterator];
                    }
                    else {
                        result += iterator;
                    }
                }
                await interaction.reply(result);
            }
            else if (interaction.options.getSubcommand() === 'lat_to_cyr'){
                text = text.replace(/ts/, data.alphabet.cyrilic[0].ts).replace(/dz/, data.alphabet.cyrilic[0].dz).replace(/tš/, data.alphabet.cyrilic[0].tš).replace(/dž/, data.alphabet.cyrilic[0].dž);
                for (const iterator of text) {
                    if (data.alphabet.cyrilic[0][iterator.toLowerCase()] != undefined) {
                        if (iterator.toUpperCase() == iterator) {
                            const inter = data.alphabet.cyrilic[0][iterator.toLowerCase()];
                            result += inter.toUpperCase();
                        }
                        else result += data.alphabet.cyrilic[0][iterator];
                    }
                    else {
                        result += iterator;
                    }
                }
                await interaction.reply(result);
            }
            else if (interaction.options.getSubcommand() === 'georg_to_lat'){
                text = text.replace(/\u10d3\u10ff/, 'ð').replace(/\u10e2\u10ff/, 'þ').replace(/\u10d0\u10fc/, 'ā').replace(/\u10dd\u10fc/, 'ō').replace(/\u10e3\u10fc/, 'ū');
                for (const iterator of text) {
                    if (data.alphabet.georgian[1][iterator] != undefined){
                        result += data.alphabet.georgian[1][iterator];
                    }
                    else {
                        result += iterator;
                    }
                }
                await interaction.reply(result);
            }
            else if (interaction.options.getSubcommand() == 'cyr_to_lat'){
                for (const iterator of text){
                    if (data.alphabet.cyrilic[1][iterator.toLowerCase()] != undefined) {
                        if (iterator.toUpperCase() == iterator) {
                            const inter = data.alphabet.cyrilic[1][iterator.toLowerCase()];
                            result += inter.toUpperCase();
                        }
                        else result += data.alphabet.cyrilic[1][iterator];
                    }
                    else {
                        result += iterator;
                    }
                }
                await interaction.reply(result);
            }
        }

}