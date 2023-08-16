
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectError } from 'redux/selectors';

const App = () => {

  const error = useSelector(selectError)
  useEffect(()=>{
    if(!error) return;
    toast.error(error)
  },[error])

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter/>
      <ContactsList/>
      <Toaster />
    </>
  );
};
export default App;
