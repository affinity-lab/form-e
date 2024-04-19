<script lang="ts">
	import ValidatorShell from '$lib/form-e/validation/ValidatorShell.svelte';

	let { id, label, propertyName, value = $bindable(), disabled = $bindable(), result = $bindable() } : {
		id: string,
		label: string,
		propertyName: string,
		value: number,
		disabled: boolean,
		result: string
	} = $props();

	let invalid: boolean = $state(false);
</script>

<ValidatorShell {propertyName} bind:result bind:invalid>
	<div class="input-holder">
		<div class="w-100 overflow-hidden">
			<label for={id} class="form-label" style="white-space: nowrap">
				<b>{label}</b>
			</label>
		</div>
		<input type="number" id={id} bind:value disabled={disabled} class:is-invalid={invalid} class="form-control" style="width: 100%" />
	</div>
</ValidatorShell>