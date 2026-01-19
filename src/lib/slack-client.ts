import { WebClient } from '@slack/web-api';

class SlackClient {
    private client: WebClient;

    constructor(token: string) {
        this.client = new WebClient(token);
    }

    async sendEmbed(channel: string, embedData: {
        title: string;
        color?: string;
        description?: string;
        fields?: Array<{ name: string; value: string; inline?: boolean }>;
        timestamp?: string;
    }) {
        const blocks: any[] = [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: embedData.title,
                    emoji: true
                }
            }
        ];

        if (embedData.description) {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `_${embedData.description}_`
                }
            });
        }

        if (embedData.fields && embedData.fields.length > 0) {
            blocks.push({ type: 'divider' });

            for (let i = 0; i < embedData.fields.length; i += 2) {
                const fieldGroup = embedData.fields.slice(i, i + 2).map(field => ({
                    type: 'mrkdwn',
                    text: `*${field.name}*\n${field.value}`
                }));

                blocks.push({
                    type: 'section',
                    fields: fieldGroup
                });
            }
        }

        if (embedData.timestamp) {
            blocks.push({
                type: 'context',
                elements: [{
                    type: 'mrkdwn',
                    text: `🕒 ${new Date(embedData.timestamp).toLocaleString()}`
                }]
            });
        }

        return this.client.chat.postMessage({
            channel,
            text: embedData.title,
            blocks: blocks,
            attachments: embedData.color ? [{
                color: embedData.color,
                blocks: []
            }] : undefined
        });
    }
}

export const slackClient = new SlackClient(process.env.SLACK_BOT_USER_TOKEN as string);