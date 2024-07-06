<script lang="ts">
	// New Svelte 5 runes syntax
	let { data } = $props();
	let users = $derived(data.users);

	// Enhanced forms
	import { enhance } from '$app/forms';

	// UI Components
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex w-full flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-center text-3xl font-bold">Sveltekit + Payload CMS</h1>
	<Card.Root class="m-4 max-w-xs md:max-w-max">
		<Card.Header>
			<Card.Title class="text-xl font-semibold">User Table {users ? '🎉' : '⛔'}</Card.Title>
			<Card.Description
				>Doing a simple query to check if we can connect to Payload CMS</Card.Description
			>
		</Card.Header>
		<Card.Content>
			{#if users}
				<div>
					<h1 class="text-xl font-semibold">Create User</h1>
					<form method="post" use:enhance class="flex flex-row gap-2 py-2">
						<Input type="email" name="email" placeholder="Email" class="max-w-xs" />
						<Button type="submit">Create</Button>
					</form>
				</div>
				<pre class="overflow-auto py-2">{JSON.stringify(users.docs, null, 2)}</pre>
			{:else}
				<p>Can't connect to Payload CMS 😢</p>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
