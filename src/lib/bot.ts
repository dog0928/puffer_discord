import { ActivityType, type Client, PresenceUpdateStatus } from "discord.js";
import { Puffer } from "@/lib/puffer";
import { msg } from "@/lib/i18n";

const puffer = new Puffer();

let inFlight = false;

async function setBotActivity(client: Client<true>) {
	if (inFlight) return;
	inFlight = true;

	try {
		const status = await puffer.status();
		if (!status.running) {
			client.user.setActivity(msg("presence.activity.stopping"), {
				type: ActivityType.Watching,
			});
			client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
			return;
		}
		client.user.setActivity(msg("presence.activity.running"), {
			type: ActivityType.Watching,
		});
		client.user.setStatus(PresenceUpdateStatus.Online);
	} catch (error) {
		console.error("Error setting bot activity:", error);
		client.user.setActivity(msg("presence.activity.error"), {
			type: ActivityType.Watching,
		});
		client.user.setStatus(PresenceUpdateStatus.Idle);
	} finally {
		inFlight = false;
	}
}

export default setBotActivity;
