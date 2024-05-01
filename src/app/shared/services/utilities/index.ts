import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from "@angular/forms";

export const markValidateAllField = (
    controls: UntypedFormGroup | UntypedFormArray | UntypedFormControl
) => {
    if (controls instanceof UntypedFormControl) {
        controls.markAsTouched({ onlySelf: true });
        controls.markAsDirty();
        controls.updateValueAndValidity({ onlySelf: true });
        return;
    }
    Object.keys(controls.controls).forEach(key => {
        const control = controls.get(key);
        if (control instanceof UntypedFormControl) {
            control.markAsTouched({ onlySelf: true });
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
        } else if (
            control instanceof UntypedFormGroup ||
            control instanceof UntypedFormArray
        ) {
            markValidateAllField(control);
        }
    });
};