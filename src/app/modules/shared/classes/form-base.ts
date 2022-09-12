import { UntypedFormGroup } from '@angular/forms';

export abstract class FormBase {
  public form: UntypedFormGroup = new UntypedFormGroup({});
  public submitted = false;
  public loading = false;

  protected constructor() {
  }

  submit(): void {
    this.submitted = true;
    if (this.form?.valid) {
      const formValue = this.form.value;
      this.setLoading(true);
      this.onValidSubmit(formValue);
    }
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
    if (this.loading) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  handleError(error: any): void {
    this.setLoading(false);
    console.log(error);
  }

  hasError(errorName?: string): boolean {
    if (errorName) {
      return (this.form?.errors?.[errorName] != null || false) && (this.submitted);
    } else {
      return (this.form?.invalid || false) && (this.submitted);
    }
  }

  fieldHasErrors(fieldName: string, errorName?: string): boolean {
    const field = this.form?.get(fieldName);
    return this.submitted && field?.invalid && (errorName ? field?.errors?.[errorName] : true);
  }

  protected abstract onValidSubmit(formValue: any): void;
}
