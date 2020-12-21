import { useState } from 'react';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
    const [imageValue, setImageValue] = useState('');

    const handleImageValueChange = ({ target }) => {
        setImageValue(target.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (imageValue.trim() === '') {
            return toast.info('Please, write some request');
        }

        onSubmit(imageValue);
        // По превью дз запрос остается!!!
        // setImageValue('');
    };

    return (
        <form onSubmit={handleSubmit} className={s.SearchForm}>
            <button type="submit" className={s.SearchFormButton}>
                <span className={s.SearchFormButtonLabel}>Search</span>
            </button>

            <input
                className={s.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={imageValue}
                onChange={handleImageValueChange}
            />
        </form>
    );
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

// OLD CLASS
// class SearchForm extends PureComponent {
//     state = {
//         imageValue: '',
//     };

//     handleImageValueChange = event => {
//         this.setState({ imageValue: event.currentTarget.value.toLowerCase() });
//     };

//     handleSubmit = event => {
//         event.preventDefault();

//         if (this.state.imageValue.trim() === '') {
//             return toast.info('Please, write some request');
//         }

//         this.props.onSubmit(this.state.imageValue);
//         // По превью дз запрос остается!!!
//         // this.setState({ imageValue: '' });
//     };

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit} className={s.SearchForm}>
//                 <button type="submit" className={s.SearchFormButton}>
//                     <span className={s.SearchFormButtonLabel}>Search</span>
//                 </button>

//                 <input
//                     className={s.SearchFormInput}
//                     type="text"
//                     autoComplete="off"
//                     autoFocus
//                     placeholder="Search images and photos"
//                     value={this.state.imageValue}
//                     onChange={this.handleImageValueChange}
//                 />
//             </form>
//         );
//     }
// }
