
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters } from 'redux/selectors';
import { filteredContacts } from 'redux/phonebookReducer';
import css from '../Filter/filter.module.css'
const Filter = () => {
    const filter = useSelector(selectFilters)
    const dispatch = useDispatch()

    const handleFilterChange = event => {
        dispatch(filteredContacts(event.target.value))
    }
    return (
        <label className={css.filterPart}>
        Filter contacts by name:
        <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
    );
};
export default Filter;