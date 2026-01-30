import { expect, test } from "bun:test";
import { Puffer } from "@/lib/puffer";

const puffer = new Puffer();

test("get token", async () => {
	const response = await puffer.get();
	expect(response.statusCode).toBe(200);
});

