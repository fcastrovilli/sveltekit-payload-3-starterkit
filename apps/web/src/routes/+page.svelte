<script lang="ts">
	export let data;
	$: users = data.users;
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex flex-col items-center justify-center gap-4 p-4">
	<h1 class="text-3xl font-bold">Sveltekit + Payload CMS</h1>
	<Card.Root>
		<Card.Header>
			<Card.Title>User Table {users ? '🎉' : '⛔'}</Card.Title>
			<Card.Description>Doing a simple query to get all users</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if users}
				<pre>{JSON.stringify(users.docs, null, 2)}</pre>
				<div>
					<h1 class="text-3xl font-semibold">Create User</h1>
					<form method="post">
						<input type="email" name="email" placeholder="Email" />
						<button type="submit">Submit</button>
					</form>
				</div>
			{:else}
				<p>Can't connect to Payload CMS 😢</p>
			{/if}
		</Card.Content>
	</Card.Root>
</div>
