import css from '../ContactsList/contactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilters } from 'redux/selectors';
import { fetchContactsDataThunk, removeContact } from 'redux/phonebookReducer';
import { useEffect } from 'react';
const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filtered =useSelector(selectFilters)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchContactsDataThunk())
  },[dispatch])

  const filterContacts = () => {
    return contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(filtered.toLowerCase())
    );
  };
  const filteredContacts = filterContacts();

  const removeContactById = id => dispatch(removeContact(id));

  return (
    <div>
    <ul className={css.contactList}>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.phone}
          <button
            type="button"
            onClick={() => removeContactById(contact.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default ContactsList;