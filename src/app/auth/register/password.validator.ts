import { FormGroup } from '@angular/forms';

export class PasswordValidator {
    static validate(form: FormGroup) {
        const password = form.controls.password.value;
        const passwordConfirm = form.controls.passwordConfirm.value;

        if (passwordConfirm.length <= 0) {
            return null;
        }

        if (passwordConfirm !== password) {
            return {
                doesMatchPassword: true
            };
        }
        return null;
    }
}
