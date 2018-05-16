import FormValidator from '../src/form.jsm';

const form = new FormValidator(document.getElementById('my-form'));
const message = document.getElementById('form-message');

form
    .on('changeStatus', e => {
        if (e.detail.valid) {
            message.innerHTML = '';
        } else {
            message.innerHTML = 'The form has errors';
        }
    })
    .on('inputChangeStatus', e => {
        console.log(e);
    });