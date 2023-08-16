import css from '../ContactsList/contactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilters, selectIsLoading } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContactsDataThunk, removeContact } from 'redux/operations';
import { Loader } from 'components/Loader/Loader';
const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filtered =useSelector(selectFilters)
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
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
    {isLoading && <Loader/>}
    </div>
  );
};

export default ContactsList;