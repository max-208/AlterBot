const { SlashCommandBuilder } = require('@discordjs/builders');
const data = require('data');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('translitterate')
        .setDescription("permet de changer d'alphabet un mot ou une expression")
        .addStringOption(option =>
                option.setName('langages')
                      .setDescription("les langages à utiliser en entrée et en sortie")
                      .setRequired(true)
                      .addChoices(
                        {name : "latin vers géorgien", value : "lat_to_georg"},
                        {name : "latin vers cyrillique", value : "lat_to_cyr"},
                        {name : "latin vers coréen", value : "lat_to_kor"},
                        {name : "géorgien vers latin", value : "georg_to_lat"},
                        {name : "cyrillique vers latin", value : "cyr_to_lat"},
                        {name : "coréen vers latin", value : "kor_to_lat"}
                      )
            )
        .addStringOption(option =>
                option.setName('text')
                        .setDescription("le texte à translittérer")
                        .setRequired(true)
        ),
        
        async execute(interaction){
            let text = interaction.options.getString('text');
            if (interaction.options.getString('langages') === 'lat_to_georg'){
                await interaction.reply(data.translitterate.lat_to_georg(text));
            }
            else if (interaction.options.getString('langages') === 'lat_to_cyr'){
                await interaction.reply(data.translitterate.lat_to_cyr(text));
            }
            else if (interaction.options.getString('langages') === 'georg_to_lat'){
                await interaction.reply(data.translitterate.georg_to_lat(text));
            }
            else if (interaction.options.getString('langages') == 'cyr_to_lat'){
                await interaction.reply(data.translitterate.cyr_to_lat(text));
            }
            else if (interaction.options.getString('langages') == 'kor_to_lat'){
                await interaction.reply(data.translitterate.kor_to_lat(text));
            }
            else if (interaction.options.getString('langages') == 'lat_to_kor'){
                await interaction.reply(data.translitterate.lat_to_kor(text));
            }
        }

}