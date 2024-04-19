import Field from "$lib/form-e/class/field.svelte.js";
import TextInput from "$lib/form-e/inputs/TextInput.svelte";
import NumberInput from '$lib/form-e/inputs/NumberInput.svelte';
import type Form from "$lib/form-e/class/form.svelte.js";

export type FieldRow = {
    fields: Array<Field>;
    full: boolean;
}

export default class Block<T> {
    id: string = "";
    name: string;
    columns: number = 1;
    form: Form<T> | undefined = $state(undefined);
    fields: Array<Field> = [];
    rows: Array<FieldRow> = [];
    nameVisible: boolean = false;
    dividerVisible: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    setColumns(columns: number) {
        this.columns = columns;
        return this;
    }

    setNameVisible() {
        this.nameVisible = true;
        return this;
    }

    setDividerVisible() {
        this.dividerVisible = true;
        return this;
    }

    addFieldToRow(field: Field, full: boolean) {
        if(full){
            this.rows.push({fields: [field], full: full});
        }else{
            if(this.rows.length === 0){
                this.rows.push({fields: [field], full: full});
            }else{
                if(!this.rows[this.rows.length - 1].full && this.rows[this.rows.length - 1].fields.length < this.columns) {
                    this.rows[this.rows.length - 1].fields.push(field);
                }else{
                    this.rows.push({fields: [field], full: full});
                }
            }
        }
    }

    addStringField(id: string, label: string, full: boolean = false) {
        const stringField = new Field();
        stringField.id = id;
        stringField.type = "string";
        stringField.full = full;
        stringField.component = TextInput;
        stringField.props.label = label;
        // eslint-disable-next-line no-undef,@typescript-eslint/ban-ts-comment
        //@ts-expect-error
        if(this.form) stringField.props.value = this.form.baseObject[id] ?? "";
        stringField.props.id = this.id + '_' + id;
        stringField.props.propertyName = id;
        if(this.form) stringField.result = this.form.validationResult;
        stringField.props.disabled = false;
        this.fields.push(stringField);
        this.addFieldToRow(stringField, full);

        return this;
    }

    addNumberField(id: string, label: string, full: boolean = false){
        const numberField = new Field();
        numberField.id = id;
        numberField.type = "number";
        numberField.full = full;
        numberField.component = NumberInput;
        numberField.props.label = label;
        // eslint-disable-next-line no-undef,@typescript-eslint/ban-ts-comment
        //@ts-expect-error
        if(this.form) numberField.props.value = this.form.baseObject[id] ?? "";
        numberField.props.id = this.id + '_' + id;
        numberField.props.propertyName = id;
        if(this.form) numberField.result = this.form.validationResult;
        numberField.props.disabled = false;
        this.fields.push(numberField);
        this.addFieldToRow(numberField, full);

        return this;
    }
}