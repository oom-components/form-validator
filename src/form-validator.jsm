import Field from './field.jsm';

export default class FormValidator {
    constructor(form, handler) {
        this.form = form;
        this.form.setAttribute('novalidate', true);
        this.form.addEventListener('submit', e => {
            if (!this.isValid()) {
                e.preventDefault();
            }
        });

        this.fields = [];
        this.handler = handler;

        setTimeout(() => this.checkStatus(), 0);
    }

    addField(input) {
        if (typeof input === 'string') {
            input = this.form.querySelector(input);
        }

        if (!input) {
            throw new Error('No input provided');
        }

        const field = new Field(input, this);

        this.fields.push(field);

        return field;
    }

    isPristine() {
        return this.fields.every(field => field.isPristine());
    }

    isDirty() {
        return this.fields.some(field => field.isDirty());
    }

    isValid() {
        return this.fields.every(field => field.isValid());
    }

    checkStatus(forceStatus) {
        const status =
            typeof forceStatus === 'boolean' ? forceStatus : this.isValid();

        if (status) {
            if (!this.wasValid) {
                this.form.dispatchEvent(
                    createEvent('changeStatus', { valid: true })
                );
            }

            this.wasValid = true;
        } else {
            if (this.wasValid || this.wasValid === undefined) {
                this.form.dispatchEvent(
                    createEvent('changeStatus', { valid: false })
                );
            }

            this.wasValid = false;
        }
    }

    on(event, callback) {
        this.form.addEventListener(event, callback);
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
