<script lang="ts">
	let {id, label, value}: {id: string, label: string, value: boolean} = $props();
</script>

<div class="justify-content-center text-center">
	<input type="checkbox" id={id} class="form-check-input me-1" bind:checked={value}/>
	<label for={id} class="form-label form-label-sm">
		<b class="me-1">{label}</b>
	</label>
	<p class="text-muted small-text">
		<slot></slot>
	</p>
</div>

<style lang="scss">
	.small-text{
	  font-size: 12px;
	}
</style>