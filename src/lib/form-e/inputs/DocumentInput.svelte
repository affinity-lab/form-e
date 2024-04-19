<script lang="ts">
    let {acceptedFileTypes = ['pdf','docx','xlsx']} : {acceptedFileTypes: string[]} = $props();
</script>

<div class="upload-space text-center">
	<div class="file-pack d-flex justify-content-center">
		{#if acceptedFileTypes.includes('docx')}
			<div class="left-icon icon">
				<i class="bi bi-filetype-docx text-muted"></i>
			</div>
		{/if}
		{#if acceptedFileTypes.includes('pdf')}
			<div class="mid-icon icon">
				<i class="bi bi-file-earmark-pdf text-muted"></i>
			</div>
		{/if}
		{#if acceptedFileTypes.includes('xlsx')}
			<div class="right-icon icon">
				<i class="bi bi-filetype-xlsx text-muted"></i>
			</div>
		{/if}
	</div>

	Húzd ide
	<p class="p-0 m-0">
		vagy tölts fel
		<span class="badge bg-dark">
			 új dokumentumot
		</span>
	</p>
</div>

<style lang="scss">
  .upload-space {
    background-color: #f8f8f8;
    border: 2px dashed #dadada;
    height: 150px;
    border-radius: 5px;
  }

  .file-pack {
    position: relative;

    i {
      font-size: 50px;
      position: relative;
    }
  }

  $icon-transition-in: all 0.1s linear;
  $icon-transition-out: all 0.3s linear;

  .icon {
    -webkit-transition: $icon-transition-in;
    -moz-transition: $icon-transition-in;
    -o-transition: $icon-transition-in;
    transition: $icon-transition-in;
  }

  .left-icon {
    position: relative;
    right: -5px;
    top: 5px;
    transform: rotate(-20deg);
  }

  .right-icon {
    position: relative;
    left: -5px;
    top: 5px;
    transform: rotate(20deg);
  }

  .mid-icon {
    position: relative;
    top: 0;
  }

  .upload-space:hover {
    .left-icon {
      top: 0;
      transform: rotate(-25deg);
      transition: $icon-transition-out;
    }

    .right-icon {
      top: 0;
      transform: rotate(25deg);
      transition: $icon-transition-out;
    }

    .mid-icon{
      top: -5px;
      transition: $icon-transition-out;
    }
  }
</style>