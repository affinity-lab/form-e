<script lang="ts">
    let {value}: { value: string } = $props();
</script>

<div class="text-center">
	<input type="text" class="form-control search-bar mb-3" placeholder="Keresés" bind:value={value}>
</div>

<style lang="scss">
  .search-bar {
    width: 60%;
    margin: 0 auto;
  }
</style>