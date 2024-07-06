<script lang="ts">
	// New Svelte 5 runes syntax
	let { data } = $props();
	let users = $derived(data.users);

	// Inspect = "console.log"
	// $inspect(users);

	// Enhance forms
	import { enhance } from '$app/forms';

	// UI Components
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
</script>

<div class="flex w-full flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-center text-3xl font-bold">Sveltekit + Payload CMS</h1>
	<Card.Root class="m-4 max-w-xs md:max-w-max">
		<Card.Header>
			<Card.Title class="text-xl font-semibold">User Table {users ? '🎉' : '⛔'}</Card.Title>
			<Card.Description
				>Doing a simple query to check if we can connect to Payload CMS.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			{#if users}
				<div>
					<h1 class="text-xl font-semibold">Create User</h1>
					<form
						method="post"
						action="?/create"
						use:enhance={() => {
							return async ({ result, update }) => {
								if (result.type === 'success') {
									if (result.data) {
										toast.success('User created successfully');
									} else {
										toast.error('User creation failed');
									}
									update();
								}
							};
						}}
						class="flex flex-row gap-2 py-2"
					>
						<Input type="email" name="email" placeholder="Email" class="max-w-xs" />
						<Button type="submit">Create</Button>
					</form>
				</div>
				<div>
					<h1 class="py-2 text-lg font-semibold">All Users</h1>
					<div
						class="mb-2 flex w-full items-center justify-between border-b p-1 text-sm text-muted-foreground"
					>
						<span>ID</span>
						<span>Email</span>
						<span>Delete</span>
					</div>
					{#each users.docs as user}
						<div class="flex flex-row items-center justify-between gap-2 px-1">
							<span class="font-semibold">{user.id}</span>
							<span>{user.email}</span>
							<AlertDialog.Root>
								<AlertDialog.Trigger>❌</AlertDialog.Trigger>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
										<AlertDialog.Description>
											This action cannot be undone. This will permanently delete `<span
												class="italic text-muted-foreground">{user.email}</span
											>` account from our servers.
										</AlertDialog.Description>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
										<form
											method="post"
											action="?/delete"
											use:enhance={() => {
												return async ({ result, update }) => {
													if (result.type === 'success') {
														if (result.data) {
															toast.success('User deleted successfully');
														} else {
															toast.error('User deletion failed');
														}
														update();
													}
												};
											}}
										>
											<input type="hidden" name="id" value={user.id} />
											<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
										</form>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
						</div>
					{/each}
				</div>
			{:else}
				<p>Can't connect to Payload CMS 😢</p>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
