import { ActivityType, Client, PresenceUpdateStatus } from 'discord.js';
import { Puffer } from '@/lib/puffer';

const puffer = new Puffer();

let inFlight = false;

async function setBotActivity(client: Client<true>) {
	if (inFlight) return;
  inFlight = true;

	try {
		const status = await puffer.status();
		if (!status.running) {
			client.user.setActivity("🛑サーバー停止中",
				{
					type: ActivityType.Watching
				}
			);
			client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
			return;
		}
		client.user.setActivity("🟢サーバー稼働中",
			{
				type: ActivityType.Playing,
			}
		);
		client.user.setStatus(PresenceUpdateStatus.Online);
	} catch (error) {
		console.error('Error setting bot activity:', error);
		client.user.setActivity(`ステータス取得エラー`,
			{
				type: ActivityType.Playing,
			}
		);
		client.user.setStatus(PresenceUpdateStatus.Idle);
	} finally {
		inFlight = false;
	}
}

export default setBotActivity;
