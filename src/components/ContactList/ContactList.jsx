import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          name={name}
          number={number}
          onDeleteContact={() => {
            onDeleteContact(id);
          }}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;

// const ContactList = ({ contacts, onDeleteContact }) => (
//   <ul className={css.ContactList}>
//     {contacts.map(({ id, name, number }) => (
//       <li key={id} className={css.ContactListItem}>
//         <p className={css.ContactListText}>
//           {name} : <span className={css.ContactListNumber}> {number} </span>
//         </p>
//         <button
//           className={css.ContactListButton}
//           type="button"
//           onClick={() => onDeleteContact(id)}
//         >
//           delete
//         </button>
//       </li>
//     ))}
//   </ul>
// );
