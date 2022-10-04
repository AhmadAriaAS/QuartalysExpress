module.exports = async (client, message, dir) => {
  const JsonEditor = require("edit-json-file");

  console.log(message);

  const author = message.author.id;
  const authorName = message.author.username;
  const id = message.id;
  const content = message.content;
  const createAt = new Date().getTime();
  const type = message.type;

  const Editor = JsonEditor(
    `${dir}/../Chat Resource/chatHistory${author}.json`
  );

  Editor.append(`chats`, {
    id: id,
    author_di: author,
    author_username: authorName,
    content: content,
    createAt: createAt,
    type: type,
    isEdited: false,
    isDeleted: false,
  });
  Editor.set(`replied`, { isReplied: true });
  Editor.save();

  if (Editor.get(`replied.isReplied`) == true) return;
  const msg = await message.reply({
    content: `Selamat ${require("../../../Function/Clock/TimeDefine")(id)} ${
      message.author.username
    }! \nMohon tunggu, Staff kami akan segera menghubungi anda.`,
  });
};
