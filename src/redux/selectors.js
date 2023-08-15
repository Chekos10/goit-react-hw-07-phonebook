export const selectContacts = state => state.phonebook.contacts.items;
export const selectFilters = state => state.phonebook.filter;
export const selectLoading = state => state.phonebook.contacts.isLoading