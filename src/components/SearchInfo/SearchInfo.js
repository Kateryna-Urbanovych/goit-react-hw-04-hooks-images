import { useState, useEffect } from 'react';

import pixabayAPI from '../../servises/pixabay-api';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import LoaderSpinner from '../LoaderSpinner';
import s from './SearchInfo.module.css';
import PropTypes from 'prop-types';

export default function SearchInfo({ imageValue }) {
    const [status, setStatus] = useState('idle');
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setImages([]);
        setPage(1);
        setStatus('pending');

        pixabayAPI
            .fetchImage(imageValue, page)
            .then(images => {
                if (images.hits.length === 0) {
                    return Promise.reject(
                        new Error(`No images found on request ${imageValue}`),
                    );
                }

                setImages(images.hits);
                setStatus('resolved');
            })
            .catch(error => {
                setError(error);
                setStatus('rejected');
            })
            .finally(scroll);
    }, [imageValue, page]);

    useEffect(() => {
        setStatus('pending');

        pixabayAPI
            .fetchImage(imageValue, page)
            .then(images => {
                setImages(state => [...state, ...images.hits]);
                setStatus('resolved');
            })
            .catch(error => {
                setError(error);
                setStatus('rejected');
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

    if (status === 'idle') {
        return <p className={s.idleText}>What are we looking for?</p>;
    }

    if (status === 'pending') {
        return <LoaderSpinner />;
    }

    if (status === 'resolved') {
        return (
            <>
                <ImageGallery images={images} />
                <Button onClick={updatePage} />
            </>
        );
    }

    if (status === 'rejected') {
        return <p className={s.rejectedText}>{error.message}</p>;
    }
}

SearchInfo.propTypes = {
    imageValue: PropTypes.string.isRequired,
};

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
