import PropTypes from "prop-types";
import { GalleryItemStyles, GalleryItemImg } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ queryResult }) => {
  return (
    <>
      {queryResult.map(({ id, webformatURL, tags }) => {
        return (
          <GalleryItemStyles key={id}>
            <GalleryItemImg src={webformatURL} alt={tags} data-id={id} />
          </GalleryItemStyles>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  queryResult: PropTypes.array.isRequired,
};

export default ImageGalleryItem;
