<script lang="ts">
	import type { ValidationResult } from 'fluent-ts-validator';

	let { propertyName, invalid = $bindable(), result = $bindable(undefined) }: {
		propertyName: string,
		invalid: boolean,
		result: ValidationResult | undefined
	} = $props();

	$effect(() => {
		if (result) {
			invalid = result.getFailures().filter(failure => failure.propertyName === propertyName).length > 0;
			setTimeout(() => {
				invalid = false;
			}, 5000);
		}
	});
</script>

<slot/>
{#key result}
	{#if invalid && result}
		<div class="text-danger" style="font-size: 12px; height: 15px; line-height: 15px">
			<small>{result.getFailures().filter(failure => failure.propertyName === propertyName)[0].message}</small>
		</div>
	{:else}
		<div class="w-100" style="height: 15px;">

		</div>
	{/if}
{/key}