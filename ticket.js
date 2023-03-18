const Discord = require("discord.js");

module.exports = {
	name: "ticket",
	description: "...",
	options: [
    {
      type: 1,
      name: "setup",
      description: "Dropper sizler için bir destek sistemi aktif eder."
    }
  ],

	run: async(client, interaction, db) => {
		
    await interaction.deferReply();
    const { user, options, guild } = interaction;
    
    if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
          return interaction.followUp({ content: "<:onaylama:1049697470973747230> **|** Bu komutu kullanmak için gerekli izinleri karşılayamıyorsun.", ephemeral: true })
        }
    
    const synCmd = options.getSubcommand()
    
    switch(synCmd) {
      case "setup": {
        const ticketSystem = db.fetch(`ticketSystem_${guild.id}`);
        if(ticketSystem) return interaction.followUp({ embeds: [{ description: "<:onaylama:1049697470973747230> **|** Destek sistemi bu sunucuda zaten `aktif` hale getirilmiş." }] })
    
        const row = new Discord.ActionRowBuilder()
          .addComponents(
            new Discord.ButtonBuilder()
              .setCustomId(`onayla_${user.id}`)
              .setLabel('Onaylıyorum, sistemi kur.')
              .setEmoji("<:onayla:1049697468637528074>")
              .setStyle(Discord.ButtonStyle.Primary),
              new Discord.ButtonBuilder()
              .setCustomId(`reddet_${user.id}`)
              .setLabel('Hayır, sistemi kurma.')
              .setEmoji("<:onaylama:1049697470973747230>")
              .setStyle(Discord.ButtonStyle.Secondary),
          );

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username} | Ticket Setup`, iconURL: `${client.user.displayAvatarURL({ dynmaic: true })} ` })
        .setTitle(`❔ | Bir dakika, emin misin?`)
        .setDescription(`\`-\` Şuan destek sistemini kurmak üzeresiniz ama kurmadan önece bilgilendirmeyi okumanızı tavsiye ederiz:\n\n**Bilgilendirme:** Dropper sistemi kurarken ping yiyebilir buda işlemin yarıda kalmasına sebep olabilir oluşacak herhangi bir sorundan sorumlu değiliz.\n\n`)
        .setFooter({ text: `Sorgulayan: ${user.tag}`, iconURL: `${user.displayAvatarURL({ dynmaic: true })}` })
        .setTimestamp()


        return interaction.followUp({ embeds: [embed], components: [row], fetchReply: true });
      }
    }
	}
}