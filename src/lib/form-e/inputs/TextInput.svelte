<script lang="ts">
    import ValidatorShell from "$lib/form-e/validation/ValidatorShell.svelte";
    import type {ValidationResult} from "fluent-ts-validator";

    let {label, value = $bindable(), id, disabled = $bindable(), result = $bindable(), propertyName}: {
        label: string,
        value: string,
        id: string,
        invalid: boolean,
        disabled: boolean,
        propertyName: string,
        result: ValidationResult,
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
		<input type="text" class="form-control" placeholder={label} id={id} bind:value
		       class:is-invalid={invalid} disabled={disabled}>
	</div>
</ValidatorShell>