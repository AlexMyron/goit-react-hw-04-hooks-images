import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn";
import { AppWrapper, ModalBtn } from "./App.styled";
import Modal from "./components/Modal";
import fetchImages from "./apiRequests/apiRequests";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [apiResult, setApiResult] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [currentImageURL, setCurrentImageURL] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });

  useEffect(() => {
    if (searchInput === "") return;
    fetchRequest(searchInput, currentPage);
  }, [searchInput, currentPage]);

  const getImageUrl = (imageId) => {
    const targetImage = apiResult.find((image) => {
      return image.id === imageId;
    });

    setCurrentImageURL(targetImage.largeImageURL);
    return targetImage.largeImageURL;
  };

  const showModal = (e) => {
    if (e.target.nodeName !== "IMG") return;
    const imageId = Number(e.target.dataset.id);

    getImageUrl(imageId);
    setOpenModal(true);
  };

  const fetchRequest = (query, page) => {
    setLoader(true);

    fetchImages(query, page)
      .then((data) => setApiResult((state) => [...state, ...data.hits]))
      .catch((error) => setError(error))
      .finally(() => setLoader(false));
  };

  const handleSearchinput = (searchInput) => {
    setApiResult([]);
    setCurrentPage(1);
    setSearchInput(searchInput);
  };

  const handleLoadMore = (e) => {
    setCurrentPage((state) => state + 1);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const closeModal = (e) => {
    if (e.target.nodeName === "IMG") return;
    toggleModal();
  };

  const isApiResult = apiResult.length > 0;

  return (
    <AppWrapper className="App">
      <Searchbar sendInputValue={handleSearchinput} />
      <ImageGallery queryResult={apiResult} getImage={showModal} />
      {loader && (
        <Loader
          className="loaderIcon"
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={300000}
        />
      )}
      {openModal && (
        <Modal handleOverlayClick={closeModal} handleKeycode={toggleModal}>
          <ModalBtn type="button">Close</ModalBtn>
          <img src={currentImageURL} alt="" key="null" />
        </Modal>
      )}
      {error && <p>Woops... {error.message}</p>}
      {isApiResult && <LoadMoreBtn handleClick={handleLoadMore} />}
    </AppWrapper>
  );
};

export default App;
