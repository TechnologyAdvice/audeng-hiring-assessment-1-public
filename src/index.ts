export default {
	async fetch(request, env, ctx): Promise<Response> {
		return Response.json({ machine: 'Vending Machine 3000', status: 'ready' });
	},
} satisfies ExportedHandler<Env>;
