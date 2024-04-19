<script lang="ts">
    import type {ValidationResult} from "fluent-ts-validator";

    let {label, id, result, value, disabled, rightSide, full}: {
        label: string,
        id: string,
	    result: ValidationResult | undefined,
        value: string,
        disabled: boolean,
        rightSide: boolean,
        full: boolean
    } = $props();

    let invalid:boolean = $state(false);
</script>

<div class="input-holder" class:ms-auto={rightSide} class:w-100={full}>
	<label for={id} class="form-label">
		<b>{label}</b>
	</label>
	<input type="date" class="form-control" id={id} bind:value={value} disabled={disabled} class:is-invalid={invalid}/>
	{#if invalid}
		<div class="invalid-feedback text-danger" style="font-size: 11px">
			<small>{result?.getFailures().filter(failure => failure.propertyName === id)[0].message}</small>
		</div>
	{/if}
</div>

<style>
    .input-holder {
        width: 96%;
    }
</style>