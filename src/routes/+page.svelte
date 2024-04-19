<script lang="ts">
	import '../app.scss';
	import { Form } from '$lib/index.js';
	import { FormComponent } from '$lib/index.js';

	type TestObjet = {
		name: string,
		location: string,
		age?: number,
	}

	let testObject: TestObjet = {
		name: '',
		location: '',
		age: undefined,
	};

	let baseForm = new Form('Base Form', testObject);
	baseForm.addNewBlock('Base Block')
		.addStringField('name', 'Name')
		.addStringField('location', 'Location')
		.addNumberField('age', 'Age');

	console.log(baseForm);
</script>

<h1 class="p-2">Affinity Works Form-e example and documentation</h1>
<hr>
<section class="p-2">
	<p>Here is a simple form with all the available inputs</p>
	<FormComponent form={baseForm} />
</section>
