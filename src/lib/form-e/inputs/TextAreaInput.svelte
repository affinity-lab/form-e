<script lang="ts">
    let {label, value, id, rows}: { label: string, value: string, id: string, rows: number } = $props();
</script>

<label for={id} class="form-label form-label-sm">
	<b>{label}</b>
</label>
<textarea rows={rows} class="form-control form-control-sm" placeholder={label} id={id} bind:value={value}/>