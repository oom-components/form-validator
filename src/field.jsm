
const errorTypes = {
    valueMissing: 'Please fill out this field.',
    typeMismatch: 'Please use the correct input type.',
    tooShort: 'Please lengthen this text.',
    tooLong: 'Please shorten this text.',
    badInput: 'Please enter the correct value type.',
    stepMismatch: 'Please select a valid value.',
    rangeOverflow: 'Please select a smaller value.',
    rangeUnderflow: 'Please select a larger value.',
    patternMismatch: 'Please match the requested format.',
};

export default class Field {
    constructor(input, form) {
        this.input = input;
        this.form = form;

        this.messages = Object({}, errorTypes);

        input.addEventListener('input', e => this.checkStatus(e));
        input.addEventListener('change', e => this.checkStatus(e));

        setTimeout(() => this.checkStatus(), 0);
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

        return 'unknownError';
    }

    checkStatus() {
        if (this.isValid()) {
            if (!this.wasValid) {
                this.input.dispatchEvent(createEvent('changeValidity', {valid: true}));
                this.form.checkStatus();
            }

            this.wasValid = true;
        } else {
            if (this.wasValid || this.wasValid === undefined) {
                this.input.dispatchEvent(createEvent('changeValidity', {valid: false}))
                this.form.checkStatus(false);
            }

            this.wasValid = false;
        }
    }

    on(event, callback) {
        this.input.addEventListener(event, callback);
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
