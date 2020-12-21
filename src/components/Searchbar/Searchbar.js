import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ children }) {
    return <header className={s.Searchbar}>{children}</header>;
}

Searchbar.propTypes = {
    children: PropTypes.node,
};
