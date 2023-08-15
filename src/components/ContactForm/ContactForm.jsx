import { useState } from "react";
import css from '../ContactForm/contactForm.module.css'
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "redux/selectors";
import { nanoid } from "nanoid";
import { createContact } from "redux/phonebookReducer";

const ContactForm = () =>{
    const [name,setName] = useState('');
    const [number, setNumber] = useState('')
    const contacts = useSelector(selectContacts)

    const dispatch = useDispatch()
    
    const handleChange = e =>{
        const {name,value} = e.target
        if(name === 'name') setName(value);
        if(name ==='number') setNumber(value)
    }

    const handleSubmit = event =>{
        event.preventDefault()
        addContact(name,number)
        setName('')
        setNumber('')
    }
    const addContact = (name,phone) => {
        const isDuplicate = contacts.some(
            contact => contact.name.toLowerCase === name.toLowerCase()
        )
        if(isDuplicate) {
            alert("Is already created")
            return;
        }
        const newContact = {
            name,
            phone,
            id:nanoid(),
        }
        dispatch(createContact(newContact))
    }
    return (
        <form onSubmit ={handleSubmit} className={css.phonebookForm}>
        <div className={css.nameArea}>
        <label >Name</label>
        <input
            className={css.inputName}
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"            
            required
        />
        </div>
        <div className={css.phoneArea}>
        <label>Phone</label>
        <input
            className={css.inputPhone}
            type="tel"
            name="number"
            onChange={handleChange}
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            required
        />
        </div>
        <button type="submit" className={css.submitButton}>Add contact</button>
        </form>
    );
}
export default ContactForm;
