<script lang="ts">
    import type Form from "$lib/form-e/class/form.svelte.js";
    import type {FieldRow} from "$lib/form-e/class/block.svelte.js";

    // eslint-disable-next-line no-undef
		type T = $$Generic;

    let {form}: { form: Form<T> } = $props();
    let formWidth: number | undefined = $state(undefined);
    let maxColumns: number = $derived(formWidth ?? 120 / 120 < 4 ? formWidth ?? 200 / 200 < 2 ? 1 : 2 : 4);

    function calculateSpacing(row: FieldRow, index: number): string {
        if (row.full || row.fields.length === 1 || maxColumns === 1) return 'width: 100%';
        if (row.fields.length > maxColumns && row.fields.length % maxColumns != 0 && index === row.fields.length - 1) return 'width: 100%';
        let type: number;
        if (row.fields.length < maxColumns) {
            type = row.fields.length;
        } else {
            type = maxColumns;
        }

        let width: string;

        let margin: number = 5;
        let position: 'left' | 'mid' | 'right';
        if (row.fields.length <= maxColumns) {
            position = index === 0 ? 'left' : index === type - 1 ? 'right' : 'mid';
        } else {
            if (index % maxColumns === 0) position = 'left';
            else if (index % maxColumns === maxColumns - 1) position = 'right';
            else position = 'mid';
        }

        if (position === 'left' || position === 'right') {
            width = `calc(100% - ${margin}px)`;
        } else {
            width = `calc(100% - ${margin * 2}px)`;
        }

        let coloring: boolean = false;
        if (position === 'left') return `width: ${width}; margin: 0 ${margin}px 0 0!important; ${coloring ? 'background-color: red;' : ''}`;
        if (position === 'right') return `width: ${width}; margin: 0 0 0 ${margin}px!important; ${coloring ? 'background-color: blue;' : ''}`;
        if (position === 'mid') return `width: ${width}; margin: 0 ${margin}px 0 ${margin}px!important; ${coloring ? 'background-color: green;' : ''}`;
				return '';
    }

    function calculateWidth(row: FieldRow, index: number): string {
        if (row.full) return 'col-12';
        if (row.fields.length > maxColumns) {
            if (row.fields.length % maxColumns === 0) {
                return `col-${12 / maxColumns}`;
            } else {
                if (index === row.fields.length - 1) return `col-12`;
                return `col-${12 / maxColumns}`;
            }
        }
        return `col-${12 / row.fields.length}`;
    }
</script>

<slot name="before"></slot>

<div class="form mt-3 mb-3" bind:clientWidth={formWidth}
     style="max-width: {form.maxWidth === 0 ? '100%' : form.maxWidth + 'px'}">
	{#each form.blocks as block}
		{#if block.dividerVisible}
			<hr>
		{/if}
		{#if block.nameVisible}
			<p class="mt-4 mb-3 text-center">{block.name}</p>
		{/if}
		{#each block.rows as row}
			<div class="d-flex flex-wrap">
				{#each row.fields as field, index}
					<div class="{calculateWidth(row, index)}">
						<div style={calculateSpacing(row, index)}>
							<svelte:component
									this={field.component}
									{...field.props}
									bind:result={field.result}
									bind:value={field.props.value}
							/>
						</div>
					</div>
				{/each}
			</div>
		{/each}
	{/each}
</div>

<slot name="after"></slot>

<style lang="scss">
  .form {
    max-width: 100%;
    min-width: 280px;
  }
</style>