import { useState, useEffect, Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import styles from './phonebook.module.css';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('tel-numbers'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('tel-numbers', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContact = ({ name }) => {
    const normalizeName = name.toLowerCase();
    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizeName;
    });
    return Boolean(dublicate);
  };

  const addContact = data => {
    if (filteredContact(data)) {
      return alert(`Contact ${data.name} already in list`);
    }

    setContacts(() => {
      const newContacts = {
        id: nanoid(),
        ...data,
      };
      return [...contacts, newContacts];
    });
  };

  const deleteContact = id => setContacts(newContacts => newContacts.filter(item => item.id !== id));

  const changeFitler = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilter);
    });
    return filteredContacts;
  };

  const phonebook = getFilteredContacts();
  return (
    <div className={styles.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <p className={styles.text}>Find contact by name</p>
      <input type="text" name="filter" onChange={changeFitler} className={styles.filter} />

      <ContactList items={phonebook} deleteContact={deleteContact} />
    </div>
  );
};

export default Phonebook;
