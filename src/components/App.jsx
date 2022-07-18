import { Component } from 'react';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const ifExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (ifExist) {
      Notify.failure(`${name} is already in contacts`, {
        clickToClose: true,
        distance: '20px',
        fontFamily: 'inherit',
      });
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = Id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== Id),
      filter: '',
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={css.Container}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2> Contacts : </h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
