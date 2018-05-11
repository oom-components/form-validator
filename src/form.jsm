import Field from './field.jsm';

export default class Form {
    constructor(form, handler, fields = 'input:not([type="hidden"]):not([type="submit"]),select,textarea') {
        this.form = form;
        this.form.setAttribute('novalidate', true);
        this.form.addEventListener('submit', e => {
            if (!this.isValid()) {
                e.preventDefault();
            }
        });

        this.fields = Array.from(this.form.querySelectorAll(fields)).map(input => new Field(input, this));
        this.handler = handler;

        setTimeout(() => this.checkStatus(), 0);
    }

    isValid() {
        return this.fields.every(field => field.isValid());
    }

    checkStatus(forceStatus) {
        const status = (typeof forceStatus === 'boolean') ? forceStatus : this.isValid();

        if (status) {
            if (!this.wasValid) {
                this.form.dispatchEvent(createEvent('changeValidity', {valid: true}))
            }

            this.wasValid = true;
        } else {
            if (this.wasValid || this.wasValid === undefined) {
                this.form.dispatchEvent(createEvent('changeValidity', {valid: false}))
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
