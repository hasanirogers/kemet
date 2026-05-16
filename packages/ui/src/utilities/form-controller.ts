export class FormSubmitController {
  host: any;
  form: HTMLFormElement | null | undefined;
  options: {
    form: (input: any) => HTMLFormElement | null | undefined;
    name: (input: any) => string;
    value: (input: any) => any;
    disabled: (input: any) => boolean;
  };

  constructor(host: any, options: Partial<{
    form: (input: any) => HTMLFormElement | null | undefined;
    name: (input: any) => string;
    value: (input: any) => any;
    disabled: (input: any) => boolean;
  }> = {}) {
    (this.host = host).addController(this);

    this.options = {
      form: (input: any) => input.closest('form'),
      name: (input: any) => input.name,
      value: (input: any) => input.value,
      disabled: (input: any) => input.disabled,
      ...options,
    };

    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  hostConnected() {
    this.form = this.options.form(this.host);

    if (this.form) {
      this.form.addEventListener('formdata', this.handleFormData);
      this.form.addEventListener('submit', this.handleFormSubmit);
    }
  }

  hostDisconnected() {
    if (this.form) {
      this.form.removeEventListener('formdata', this.handleFormData);
      this.form.removeEventListener('submit', this.handleFormSubmit);
      this.form = undefined;
    }
  }

  handleFormData(event: FormDataEvent) {
    const disabled = this.options.disabled(this.host);
    const name = this.options.name(this.host);
    const value = this.options.value(this.host);

    if (!disabled && typeof name === 'string' && typeof value !== 'undefined') {
      // TODO recreate a scenario where value will be an array
      // if (Array.isArray(value)) {
      //   value.forEach((val) => {
      //     event.formData?.append(name, val.toString());
      //   });
      // } else {
      //   event.formData?.append(name, value.toString());
      // }
      event.formData?.append(name, value.toString());
    }
  }

  handleFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const disabled = this.options.disabled(this.host);
    this.form = this.options.form(this.host);

    if (this.form && !disabled) {
      const components = this.form.querySelectorAll('kemet-input, kemet-textarea, kemet-select, kemet-checkbox, kemet-radios');

      components.forEach((component: any) => {
        if (component.checkValidity) {
          component.checkValidity();

          if (!component.checkValidity()) {
            component.status = 'error';
            component.invalid = true;

            component.dispatchEvent(
              new CustomEvent('kemet-input-status', {
                bubbles: true,
                composed: true,
                detail: {
                  status: 'error',
                  validity: component.validity ? component.validity : {},
                  element: component,
                },
              }),
            );
          }

          if (component.checkLimitValidity && !component.checkLimitValidity()) {
            component.status = 'error';
            component.invalid = true;

            component.dispatchEvent(
              new CustomEvent('kemet-input-status', {
                bubbles: true,
                composed: true,
                detail: {
                  status: 'error',
                  validity: { passedLimit: true },
                  element: component,
                },
              }),
            );
          }
        }
      });
    }
  }

  submit() {
    const button = document.createElement('button');

    if (this.form) {
      button.type = 'submit';
      button.style.position = 'absolute';
      button.style.width = '0';
      button.style.height = '0';
      button.style.clip = 'rect(0 0 0 0)';
      button.style.clipPath = 'inset(50%)';
      button.style.overflow = 'hidden';
      button.style.whiteSpace = 'nowrap';
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
}
