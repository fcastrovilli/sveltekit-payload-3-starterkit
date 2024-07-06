import type { PageServerLoad } from './$types';
import { payload } from '$lib/server/payload';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	if (!payload) return;
	const users = await payload.find({
		collection: 'users'
	});
	return {
		users: users
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		if (!payload) return;
		const form = await request.formData();
		const email: string = form.get('email') as string;
		try {
			const user = await payload.create({
				collection: 'users',
				data: {
					email: email,
					password: crypto.randomUUID()
				}
			});
			return {
				user
			};
		} catch (error) {
			console.log(error);
		}
	},
	delete: async ({ request }) => {
		if (!payload) return;
		const form = await request.formData();
		const id: string = form.get('id') as string;
		try {
			const user = await payload.delete({
				collection: 'users',
				id: id
			});
			return {
				user
			};
		} catch (error) {
			console.log(error);
		}
	}
};
