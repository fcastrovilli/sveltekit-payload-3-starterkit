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
	default: async ({ request }) => {
		if (!payload) return;
		const form = await request.formData();
		const email: string = form.get('email') as string;
		try {
			const user = await payload.create({
				collection: 'users',
				data: {
					email: email,
					password: 'password'
				}
			});
			return {
				user
			};
		} catch (error) {
			console.log(error);
		}
	}
};
