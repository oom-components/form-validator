const errorTypes = {
    valueMissing: '',
    typeMismatch: '',
    tooShort: '',
    tooLong: '',
    badInput: '',
    stepMismatch: '',
    rangeOverflow: '',
    rangeUnderflow: '',
    patternMismatch: ''
};

export default class Field {
    constructor(input, form) {
        this.input = input;
        this.form = form;
        this.pristine = true;

        this.messages = Object.assign({}, errorTypes);

        input.addEventListener('input', e => this.checkStatus(e));
        input.addEventListener('change', e => this.checkStatus(e));
        input.addEventListener('focus', e => (this.pristine = false));

        setTimeout(() => this.checkStatus(), 0);
    }

    isPristine() {
        return this.pristine;
    }

    isDirty() {
        return !this.pristine;
    }

    isValid() {
        return this.input.validity.valid;
    }

    getErrorType() {
        const validity = this.input.validity;

        if (validity.valid) {
            return;
        }

        for (let type in this.messages) {
            if (validity[type]) {
                return type;
            }
        }
    }

    setErrorMessages(messages = {}) {
        Object.assign(this.messages, messages);

        return this;
    }

    getErrorMessage(type) {
        if (!type) {
            return '';
        }

        return this.messages[type] || this.input.validationMessage;
    }

    checkStatus(e) {
        const errorType = this.getErrorType();

        if (this.lastErrorType !== errorType) {
            this.input.dispatchEvent(
                createEvent('changeStatus', {
                    valid: !errorType,
                    errorType: errorType,
                    originalEvent: e
                })
            );
            this.form.checkStatus();
        }

        this.lastErrorType = errorType;
    }

    on(event, callback) {
        this.input.addEventListener(event, callback);

        return this;
    }

    updateError(text) {
        let message;

        if (!text) {
            message = this.getErrorMessage(this.getErrorType());
        } else {
            message = this.getErrorMessage(text) || text;
        }

        if (message) {
            return this.showError(message);
        }

        this.hideError();
    }

    hideError() {
        if (this.errorLabel) {
            this.errorLabel.remove();
            delete this.errorLabel;
        }

        this.input.dispatchEvent(createEvent('hideError'));
    }

    showError(message) {
        if (!this.errorLabel) {
            this.errorLabel = document.createElement('label');
            this.errorLabel.for = this.input.id;
            this.input.parentElement.append(this.errorLabel);
        }

        this.errorLabel.innerText = message;
        this.input.dispatchEvent(
            createEvent('showError', { errorLabel: this.errorLabel })
        );
    }
}

function createEvent(type, data) {
    if (typeof window.CustomEvent === 'function') {
        return new CustomEvent(type, { detail: data });
    }

    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);

    return event;
}
