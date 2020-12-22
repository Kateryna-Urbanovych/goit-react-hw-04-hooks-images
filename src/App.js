import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import pixabayAPI from './servises/pixabay-api';
import Searchbar from './components/Searchbar';
import SearchForm from './components/SearchForm';

import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import LoaderSpinner from './components/LoaderSpinner';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

export default function App() {
    const [imageValue, setImageValue] = useState('');
    const [status, setStatus] = useState(Status.IDLE);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    const handleFormSubmit = imageValue => {
        setImageValue(imageValue);
        setPage(1);
        setImages([]);
        setError(null);
    };

    useEffect(() => {
        if (imageValue === '') {
            return;
        }

        setStatus(Status.PENDING);

        pixabayAPI
            .fetchImage(imageValue, page)
            .then(images => {
                // if (images.hits.length === 0) {
                //     return Promise.reject(
                //         new Error(`No images found on request ${imageValue}`),
                //     );
                // }

                if (images.hits.length === 0) {
                    setStatus(Status.IDLE);
                    return toast.error(
                        `No images found on request ${imageValue}`,
                    );
                }

                setImages(state => [...state, ...images.hits]);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                setError(error);
                setStatus(Status.REJECTED);
            })
            .finally(scroll);
    }, [imageValue, page]);

    const updatePage = () => {
        setPage(state => state + 1);
    };

    const scroll = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight - 1500,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <ToastContainer />
            <Searchbar>
                <SearchForm onSubmit={handleFormSubmit} />
            </Searchbar>

            {status === Status.IDLE && (
                <p className="idleText"> What are we looking for?</p>
            )}

            {status === Status.PENDING && <LoaderSpinner />}

            {status === Status.RESOLVED && (
                <>
                    <ImageGallery images={images} />
                    <Button onClick={updatePage} />
                </>
            )}

            {status === Status.REJECTED && (
                <p className="rejectedText">{error.message}</p>
            )}
        </>
    );
}

// images.length > 0 &&

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

//+

// OLD CLASS
// class SearchInfo extends PureComponent {
//     state = {
//         status: 'idle',
//         images: [],
//         error: null,
//         page: 1,
//     };

//     componentDidUpdate(prevProps, prevState) {
//         const prevImageValue = prevProps.imageValue;
//         const nextImageValue = this.props.imageValue;
//         const prevPage = prevState.page;
//         const nextPage = this.state.page;

//         if (prevImageValue !== nextImageValue) {
//             this.setState({
//                 status: 'pending',
//                 images: [],
//                 page: 1,
//             });

//             pixabayAPI
//                 .fetchImage(nextImageValue, nextPage)
//                 .then(images => {
//                     if (images.hits.length === 0) {
//                         return Promise.reject(
//                             new Error(
//                                 `No images found on request ${nextImageValue}`,
//                             ),
//                         );
//                     }

//                     this.setState({
//                         images: images.hits,
//                         status: 'resolved',
//                     });
//                 })
//                 .catch(error => this.setState({ error, status: 'rejected' }))
//                 .finally(this.scroll);
//         }

//         if (prevPage !== nextPage && prevPage < nextPage) {
//             this.setState({ status: 'pending' });

//             pixabayAPI
//                 .fetchImage(nextImageValue, nextPage)
//                 .then(images => {
//                     this.setState(prevState => ({
//                         images: [...prevState.images, ...images.hits],
//                         status: 'resolved',
//                     }));
//                 })
//                 .catch(error => this.setState({ error, status: 'rejected' }))
//                 .finally(this.scroll);
//         }
//     }

//     updatePage = () => {
//         this.setState(({ page }) => ({
//             page: page + 1,
//         }));
//     };

//     scroll = () => {
//         window.scrollTo({
//             top: document.documentElement.scrollHeight - 1500,
//             behavior: 'smooth',
//         });
//     };

//     render() {
//         const { status, error, images } = this.state;

//         if (status === 'idle') {
//             return <p className={s.idleText}>What are we looking for?</p>;
//         }

//         if (status === 'pending') {
//             return <LoaderSpinner />;
//         }

//         if (status === 'resolved') {
//             return (
//                 <>
//                     <ImageGallery images={images} />
//                     <Button onClick={this.updatePage} />
//                 </>
//             );
//         }

//         if (status === 'rejected') {
//             return <p className={s.rejectedText}>{error.message}</p>;
//         }
//     }
// }
