module.exports = (client, editor, dir) => {
  client.on("messageCreate", async (message) => {
    if (message.type != 0) return;
    await require("../Handler/Chat/MessageCreate")(client, message, dir);
  });

  client.on("messageDelete", async (message) => {
    console.log(
      `Deleted Message Type: ${message.type} \nContent: ${message.content}`
    );
  });
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    const oldM = await oldMessage.fetch();
    const newM = await newMessage.fetch();
    // console.log(`Old Message${oldMessage} \n\nNew Message ${newMessage}`);
    console.log(oldMessage);
    console.log("\n\n\n");
    console.log(newM);
    // console.log(oldMessage.reactions.message.content, newMessage.reactions.message.content);
  });

  client.on("interactionCreate", async (interaction) => {
    console.log(
      `Interaction Type:${interaction.type} \nContent: ${interaction.content}`
    );
  });
};
