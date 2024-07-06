import type { PageServerLoad } from './$types';
import { payload } from '$lib/server/payload';
import type { Actions } from '@sveltejs/kit';
import type { PaginatedDocs } from 'payload';
import type { User } from '$payload/payload-types.ts';

export const load: PageServerLoad = async () => {
	if (!payload) return;
	const users: PaginatedDocs<User> = await payload.find({
		collection: 'users',
		limit: 10
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
		const username: string = form.get('username') as string;
		const password: string = form.get('password') as string;
		try {
			const user: User = await payload.create({
				collection: 'users',
				data: {
					email: email,
					username: username,
					password: password
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
			const user: User = await payload.delete({
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
