import { SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

// This is a sample test to show you how testing works in this project.
// SELF is a service binding to your worker — it lets you make HTTP requests
// to your API just like a real client would.
//
// Use this pattern to write your own tests for the vending machine API.

describe('Sample: machine status', () => {
	it('returns a JSON response from the worker', async () => {
		const res = await SELF.fetch('https://vending.machine/');
		expect(res.status).toBe(200);

		const body = (await res.json()) as { machine: string; status: string };
		expect(body.machine).toBe('Vending Machine 3000');
		expect(body.status).toBe('ready');
	});
});
