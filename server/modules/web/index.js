import fetch from 'node-fetch';
import {
    create as createMessage,
    getMessageWithDiscordId,
    getMessageNotPosted
} from 'services/message';

export async function pullmessage() {
    console.log('======START PULL MESSAGES======');
    const headers = {
        'accept-language': 'en-US',
        'authorization': 'NDA4NTU4NTc0MTE4MzcxMzQ4.DVTA5A.9Nfuh0pLhJvamX-zlSkZ8ZI3Xyc'
    };

    const data = await fetch('https://discordapp.com/api/v6/channels/442243825272881155/messages?limit=50', {
        method: 'GET',
        headers: headers
    })

    const json = await data.json();
    json.forEach((message) => {
        create(message);
    })
}

export async function getMessages(req, res, next) {
    const messages = await getMessageNotPosted();
    res.json(messages);
}

async function create(message) {
    const data = await getMessageWithDiscordId(message.id);

    if (data) {
        return;
    }

    createMessage({
        attachments: JSON.stringify(message.attachments),
        timestamp: message.timestamp,
        mention_everyone: message.mention_everyone,
        discordId: message.id,
        pinned: message.pinned,
        edited_timestamp: message.edited_timestamp,
        author: JSON.stringify(message.author),
        content: message.content,
        channel_id: message.channel_id,
        created_date: new Date()
    });
}