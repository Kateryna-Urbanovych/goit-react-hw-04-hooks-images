import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
    return (
        <ul className={s.ImageGallery}>
            {images.map(({ id, webformatURL, tag, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    tag={tag}
                    largeImageURL={largeImageURL}
                />
            ))}
        </ul>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object.isRequired),
    id: PropTypes.number.isRequired,
};
