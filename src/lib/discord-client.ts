import { REST } from '@discordjs/rest';
import { APIEmbed, RESTPostAPIChannelMessageResult, RESTPostAPICurrentUserCreateDMChannelResult, Routes } from 'discord-api-types/v10';

export class DiscordClient {
    private rest: REST

    constructor(token: string) {
        this.rest = new REST({ version: "10" }).setToken(token)
    }

    async sendEmbed(channelId: string, embed: APIEmbed):
        Promise<RESTPostAPIChannelMessageResult> {

        return this.rest.post(
            Routes.channelMessages(channelId), {
            body: { embeds: [embed] }
        }) as Promise<RESTPostAPIChannelMessageResult>
    }
}