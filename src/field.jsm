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
    constructor(input) {
        this.input = input;
        this.pristine = true;

        this.messages = Object.assign({}, errorTypes);

        input.addEventListener('input', e => this._updateStatus(e));
        input.addEventListener('change', e => this._updateStatus(e));
        input.addEventListener('focus', e => (this.pristine = false));

        this._lastErrorType = this.errorType;
    }

    get valid() {
        return this.input.validity.valid;
    }

    get errorType() {
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

    get errorMessage() {
        const type = this.errorType;

        if (!type) {
            return '';
        }

        return this.messages[type] || this.input.validationMessage;
    }

    setErrorMessages(messages = {}) {
        Object.assign(this.messages, messages);

        return this;
    }

    on(event, callback) {
        this.input.addEventListener(event, callback);

        return this;
    }

    _updateStatus(e) {
        const errorType = this.errorType;

        if (this._lastErrorType !== errorType) {
            const detail = {
                pristine: this.pristine,
                valid: this.valid,
                errorType: errorType,
                errorMessage: this.errorMessage,
                originalEvent: e
            };

            this.input.dispatchEvent(
                createEvent('changeStatus', detail)
            );

            this.input.form.dispatchEvent(
                createEvent('inputChangeStatus', detail)
            );
        }

        this._lastErrorType = errorType;
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
