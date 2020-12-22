import PropTypes from 'prop-types';

const KEY = '18986249-8b68234fd669e826bdba5acf0';

function fetchImage(imageValue, page) {
    return fetch(
        `https://pixabay.com/api/?q=${imageValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(
            new Error(`No images found on request ${imageValue}`),
        );
    });
}

const pixabayAPI = {
    fetchImage,
};

fetchImage.propTypes = {
    imageValue: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
};

export default pixabayAPI;
