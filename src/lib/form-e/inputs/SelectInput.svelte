<script lang="ts">
    import type {ValidationResult} from "fluent-ts-validator";

    type Option = {
        value: string;
        label: string;
    };

    let {value, id, label, options, result, rightSide = false, full = false}: {
        value: string,
        id: string,
        label: string,
        options: Array<Option>,
	    result: ValidationResult | undefined,
        rightSide: boolean,
        full: boolean
    } = $props();

    let invalid:boolean = $state(false);

    $effect(()=> {
        if(result){
            invalid = result.getFailures().filter(failure => failure.propertyName === id).length > 0;
            setTimeout(() => {
                invalid = false;
            }, 5000);
        }
    })
</script>

<div class="d-block input-holder" class:ms-auto={rightSide} class:w-100={full}>
	<label for={id} class="form-label">
		<b>{label}</b>
	</label>
	<select class="form-select w-100" bind:value class:is-invalid={invalid}>
		<option value={undefined}>Válassz..</option>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
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