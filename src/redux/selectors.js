export const selectContacts = state => state.phonebook.contacts.items;
export const selectFilters = state => state.phonebook.filter;
export const selectError = state => state.phonebook.contacts.error
export const selectIsLoading = state => state.phonebook.contacts.isLoading;