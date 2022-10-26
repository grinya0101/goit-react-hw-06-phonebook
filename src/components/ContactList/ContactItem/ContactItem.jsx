import css from './ContactItem.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

export default function ContactItem({ id, name, number }) {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button
          className={css.button}
          type="button"
          onClick={() => handleDeleteContact(id)}
        >
          X
        </button>
      </td>
    </>
  );
}

ContactItem.prototype = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
