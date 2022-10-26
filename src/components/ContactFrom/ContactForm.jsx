import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css/animate.min.css';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import css from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const inputNameRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const number = form.elements.number.value;
    let name = form.elements.name.value;

    name = name[0].toUpperCase() + name.substring(1);

    const warnToastId = 'toast-id';
    const bounce = cssTransition({
      enter: 'animate__animated animate__bounceIn',
      exit: 'animate__animated animate__bounceOut',
    });

    if (contacts.find(contact => contact.name === name)) {
      toast.warn(`${name} is already in contacts`, {
        transition: bounce,
        dragable: true,
        position: toast.POSITION.TOP_RIGHT,
        toastId: warnToastId,
        autoClose: 2000,
      });

      return;
    }

    dispatch(addContact({ name, number }));

    inputNameRef.current.focus();
    form.reset();
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.form__wrap}>
          <label className={css.form__label}>
            Name
            <input
              className={css.form__input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              ref={inputNameRef}
            />
          </label>

          <label className={css.form__label}>
            Number
            <input
              className={css.form__input}
              type="tel"
              name="number"
              pattern="\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
        </div>

        <button className={css.form__button} type="submit">
          Add contact
        </button>
      </form>
      <ToastContainer style={{ fontSize: '18px' }} />
    </>
  );
}
