import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import SearchForm from './components/SearchForm';
import SearchInfo from './components/SearchInfo';

export default function App() {
    const [imageValue, setImageValue] = useState('');

    const handleFormSubmit = imageValue => {
        setImageValue(imageValue);
    };

    return (
        <>
            <ToastContainer />
            <Searchbar>
                <SearchForm onSubmit={handleFormSubmit} />
            </Searchbar>
            <SearchInfo imageValue={imageValue} />
        </>
    );
}

// OLD CLASS
// class App extends PureComponent {
//     state = {
//         imageValue: '',
//     };

//     handleFormSubmit = imageValue => {
//         this.setState({ imageValue });
//     };

//     render() {
//         return (
//             <>
//                 <ToastContainer />
//                 <Searchbar>
//                     <SearchForm onSubmit={this.handleFormSubmit} />
//                 </Searchbar>
//                 <SearchInfo imageValue={this.state.imageValue} />
//             </>
//         );
//     }
// }
