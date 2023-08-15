import css from '../ContactsList/contactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectContacts, selectFilters } from 'redux/selectors';
import { fetchContactsDataThunk, removeContact } from 'redux/phonebookReducer';
import { useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilters);
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchContactsDataThunk())
  },[dispatch])


  const filterContacts = (filter) => {
    return contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = filterContacts(filter);

  const removeContactById = id => dispatch(removeContact(id));

  return (
    <div>
    {isLoading && <Loader/>}
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