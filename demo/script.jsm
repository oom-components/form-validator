import FormValidator from '../src/form-validator.jsm';

const el = document.getElementById('my-form');
const form = new FormValidator(el);
const message = document.getElementById('form-message');

form.on('changeStatus', e => {
    if (e.detail.valid) {
        message.innerHTML = '';
    } else {
        message.innerHTML = 'The form has errors';
    }
});

el.querySelectorAll('input').forEach(input => {
    const field = form.addField(input);

    field.on('changeStatus', e => {
        field.updateError();
    });
});
