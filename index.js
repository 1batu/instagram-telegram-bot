const telegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;
const token = '';
const bot = new telegramBot(token, { polling: true });

bot.on('message', msg => {
    const chatId = msg.chat.id;
    const message = msg.text;
    axios.get("https://api.bhawanigarg.com/social/instagram/?url=" + message).then(res => {
        if (res.data.graphql.video_versions) {
            bot.sendVideo(chatId, res.data.graphql.video_versions[0].url);
            bot.sendMessage(chatId, res.data.graphql.caption.text);
        }
        else {
            res.data.graphql.shortcode_media.edge_sidecar_to_children.edges.forEach((element) => {
                bot.sendPhoto(chatId, element.node.display_resources[0].src);
            });
        }
    })
});