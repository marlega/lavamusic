import { Command, Lavamusic, Context } from "../../structures/index.js";


export default class Skipto extends Command {
    constructor(client: Lavamusic) {
        super(client, {
            name: "skipto",
            description: {
                content: "Skips to a specific song in the queue",
                examples: ["skipto 3"],
                usage: "skipto <number>"
            },
            category: "music",
            aliases: ["st"],
            cooldown: 3,
            args: true,
            player: {
                voice: true,
                dj: false,
                active: true,
                djPerm: null
            },
            permissions: {
                dev: false,
                client: ["SendMessages", "ViewChannel", "EmbedLinks"],
                user: []
            },
            slashCommand: true,
            options: []
        });
    };
    public async run(client: Lavamusic, ctx: Context, args: string[]): Promise<void> {

        const player = client.queue.get(ctx.guild.id);
        const embed = this.client.embed();
        if (!player.queue.length) return ctx.sendMessage({ embeds: [embed.setColor(this.client.color.red).setDescription("There are no songs in the queue.")] });
        if (isNaN(Number(args[0]))) return ctx.sendMessage({ embeds: [embed.setColor(this.client.color.red).setDescription("Please provide a valid number.")] });
        if (Number(args[0]) > player.queue.length) return ctx.sendMessage({ embeds: [embed.setColor(this.client.color.red).setDescription("Please provide a valid number.")] });
        if (Number(args[0]) < 1) return ctx.sendMessage({ embeds: [embed.setColor(this.client.color.red).setDescription("Please provide a valid number.")] });
        player.skip(Number(args[0]) - 1);

        return ctx.sendMessage({ embeds: [embed.setColor(this.client.color.main).setDescription(`Skipped to song number ${args[0]}`)] });
    }
}

/**
 * Project: lavamusic
 * Author: Blacky
 * Company: Coders
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */