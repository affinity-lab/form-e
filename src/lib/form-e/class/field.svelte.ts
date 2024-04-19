import  {ValidationResult} from "fluent-ts-validator";
import type { ComponentType } from 'svelte';

export default class Field {
    id: string = "";
    type: "string" | "number" = "string";
    component: ComponentType | undefined;
    result: ValidationResult | undefined = $state(new ValidationResult());
    props: Record<string, string | boolean | number> = {};
    full: boolean = false;
}