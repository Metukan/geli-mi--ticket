module.exports = {
	name: "ping",
	description: "Bot'un ping durumunu gör.",
	options: [],

	run: async(client, interaction) => {
		await interaction.deferReply();
    const { user, option, guild } = interaction;
    
	}
}