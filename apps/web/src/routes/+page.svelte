<script lang="ts">
	export let data;
	$: users = data.users;
</script>

<div>
	<h1>Create User</h1>
	<form method="post">
		<input type="email" name="email" placeholder="Email" />
		<button type="submit">Submit</button>
	</form>
</div>

{#if users}
	<h1>Users</h1>
	<pre>{JSON.stringify(users?.docs, null, 2)}</pre>
{/if}
