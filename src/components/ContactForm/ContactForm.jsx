import { useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './contact-form.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ name: '', number: '' });
  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor={nameId} className={styles.label}>
          Name
        </label>
        <input
          value={state.name}
          type="text"
          name="name"
          id={nameId}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor={numberId} className={styles.label}>
          Number
        </label>
        <input
          value={state.number}
          type="tel"
          name="number"
          id={numberId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.btn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
