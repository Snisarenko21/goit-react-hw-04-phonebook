import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

const ContactItem = ({ name, number, onDeleteContact, id }) => {
  return (
    <>
      <li key={id} className={css.ContactListItem}>
        <p className={css.ContactListText}>
          {name} : <span className={css.ContactListNumber}> {number} </span>
        </p>
        <button
          className={css.ContactListButton}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          delete
        </button>
      </li>
    </>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
