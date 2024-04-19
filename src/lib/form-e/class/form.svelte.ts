import Block from "$lib/form-e/class/block.svelte.js";
import {type AbstractValidator, ValidationResult} from "fluent-ts-validator";

/**
 * @class Form
 * @description A class that represents a form.
 * @template T where T is the type of the base object we want to display in the form inputs.
 * @property {string} id The id of the form.
 * @property {T} baseObject The base object we want to display in the form inputs.
 * @property {number} maxWidth The maximum width of the form container in pixels. If the value is 0, it is set 100% on default.
 * @property {Array<Block<T>>} blocks The blocks of the form.
 * @property {AbstractValidator<T> | undefined} validator The validator of the form.
 * @property {ValidationResult | undefined} validationResult The validation result of the form.
 */
export default class Form<T> {
    id: string;
    baseObject: T;
    maxWidth: number = 0;
    blocks: Array<Block<T>> = [];
    validator: AbstractValidator<T> | undefined = $state(undefined);
    validationResult: ValidationResult | undefined = $state(new ValidationResult());

    constructor(id: string, baseObject: T) {
        this.id = id;
        this.baseObject = baseObject;
    }

    addValidator(validator: AbstractValidator<T>){
        this.validator = validator;
        return this;
    }

    addNewBlock(name: string) {
        const block = new Block<T>(name);
        block.id = this.id + '_block_' + name;
        block.form = this;
        this.blocks.push(block);
        return block;
    }

    setMaxWidth(width: number) {
        this.maxWidth = width;
        return this;
    }

    export(){
        const result: {[key: string]: string | number | boolean} = {};
        this.blocks.forEach(block => {
            block.fields.forEach(field => {
                result[field.id] = field.props.value;
            });
        });
        this.validationResult = this.validator?.validate(result as T);
        this.blocks.forEach(block => {
            block.fields.forEach(field => {
                field.result = this.validator?.validate(result as T);
            });
        });
        return result as T;
    }
}