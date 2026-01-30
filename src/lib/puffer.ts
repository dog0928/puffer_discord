export class Puffer {
	async get() {
		const body = new URLSearchParams({
			grant_type: "client_credentials",
			client_id: process.env.PUFFER_CLIENT_ID ?? "",
			client_secret: process.env.PUFFER_CLIENT_SECRET ?? "",
		}).toString();

		if (!process.env.PUFFER_CLIENT_ID || !process.env.PUFFER_CLIENT_SECRET) {
			throw new Error("Missing env: PUFFER_CLIENT_ID / PUFFER_CLIENT_SECRET");
		}

		const response = await fetch(
			`http://${process.env.PUFFER_SERVER_URL}:8080/oauth2/token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json",
				},
				body,
			},
		);

		if (!response.ok) {
			throw new Error(`Error fetching token: ${response.statusText}`);
		}

		const data = await response.json();
		return { token: data.access_token, statusCode: response.status };
	}

	async status() {
		const getToken = await this.get();

		const response = await fetch(
			`http://${process.env.PUFFER_SERVER_URL}:8080/api/servers/${process.env.PUFFER_SERVER_ID}/status`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Bearer ${getToken.token}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(`Error fetching server status: ${response.statusText}`);
		}

		const data = await response.json();
		return { running: data.running, statusCode: response.status };
	}

	async start() {
		const getToken = await this.get();

		const response = await fetch(
			`http://${process.env.PUFFER_SERVER_URL}:8080/api/servers/${process.env.PUFFER_SERVER_ID}/start`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Bearer ${getToken.token}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(`Error starting server: ${response.statusText}`);
		}

		const statusCode = await response.status;
		return { statusCode };
	}

	async stop() {
		const getToken = await this.get();

		const response = await fetch(
			`http://${process.env.PUFFER_SERVER_URL}:8080/api/servers/${process.env.PUFFER_SERVER_ID}/stop`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `Bearer ${getToken.token}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error(`Error stopping server: ${response.statusText}`);
		}

		const statusCode = await response.status;
		return { statusCode };
	}
}
