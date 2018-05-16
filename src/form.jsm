import Field from './field.jsm';

export default class Form {
    constructor(form) {
        this.form = form;
        this.form.addEventListener('input', e => this._updateStatus(e), true);
        this.form.addEventListener('change', e => this._updateStatus(e), true);
        this.fields = Array.from(
            form.querySelectorAll('input,select,textarea')
        ).map(input => new Field(input));

        setTimeout(() => this.checkStatus(), 0);
    }

    get valid() {
        return this.fields.every(field => field.valid);
    }

    disableNativeValidation() {
        this.form.setAttribute('novalidate', true);

        this.form.addEventListener('submit', e => {
            if (!this.valid) {
                e.preventDefault();
            }
        });

        return this;
    }

    on(event, callback) {
        this.form.addEventListener(event, callback);

        return this;
    }

    checkStatus(forceStatus) {
        const status =
            typeof forceStatus === 'boolean' ? forceStatus : this.valid;

        if (status) {
            if (!this._wasValid) {
                this.form.dispatchEvent(
                    createEvent('changeStatus', { valid: true })
                );
            }

            this._wasValid = true;
        } else {
            if (this._wasValid || this._wasValid === undefined) {
                this.form.dispatchEvent(
                    createEvent('changeStatus', { valid: false })
                );
            }

            this._wasValid = false;
        }
    }

    _updateStatus(e) {
        const input = e.target;

        if (!input.validity.valid) {
            if (this._wasValid) {
                this.checkStatus(false);
            }
        } else if (!this._wasValid) {
            this.checkStatus();
        }
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
