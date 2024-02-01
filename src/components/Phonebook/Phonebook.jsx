import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import styles from './phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('tel-numbers'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('tel-numbers', JSON.stringify(this.state.contacts));
    }
  }

  filteredContact = ({ name }) => {
    const { contacts } = this.state;
    const normalizeName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizeName;
    });

    return Boolean(dublicate);
  };

  addContact = data => {
    if (this.filteredContact(data)) {
      return alert(`Contact ${data.name} already in list`);
    }

    this.setState(({ contacts }) => {
      const newContacts = {
        id: nanoid(),
        ...data,
      };

      return {
        contacts: [...contacts, newContacts],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  changeFitler = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();

      return normalizedName.includes(normalizedFilter);
    });

    return filteredContacts;
  }

  render() {
    const { addContact, deleteContact, changeFitler } = this;
    const contacts = this.getFilteredContacts();
    return (
      <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <p className={styles.text}>Find contact by name</p>
        <input
          type="text"
          name="filter"
          onChange={changeFitler}
          className={styles.filter}
        />
        {/* <Filter /> */}
        <ContactList items={contacts} deleteContact={deleteContact} />
      </div>
    );
  }
}

export default Phonebook;
