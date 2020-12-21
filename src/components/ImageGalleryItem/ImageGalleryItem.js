import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, tag, largeImageURL }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(state => !state);
    };

    return (
        <>
            <li className={s.ImageGalleryItem}>
                <img
                    src={webformatURL}
                    alt={tag}
                    className={s.ImageGalleryItemImage}
                    onClick={toggleModal}
                />
                {showModal && (
                    <Modal
                        onClose={toggleModal}
                        tag={tag}
                        largeImageURL={largeImageURL}
                    />
                )}
            </li>
        </>
    );
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tag: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
};

// OLD CLASS
// class ImageGalleryItem extends PureComponent {
//     state = {
//         showModal: false,
//     };

//     toggleModal = () => {
//         this.setState(({ showModal }) => ({
//             showModal: !showModal,
//         }));
//     };

//     render() {
//         const { showModal } = this.state;
//         const { webformatURL, tag, largeImageURL } = this.props;

//         return (
//             <>
//                 <li className={s.ImageGalleryItem}>
//                     <img
//                         src={webformatURL}
//                         alt={tag}
//                         className={s.ImageGalleryItemImage}
//                         onClick={this.toggleModal}
//                     />
//                     {showModal && (
//                         <Modal
//                             onClose={this.toggleModal}
//                             tag={tag}
//                             largeImageURL={largeImageURL}
//                         />
//                     )}
//                 </li>
//             </>
//         );
//     }
// }
