import './App.css';
import { useState } from 'react';
import { fetchPhotos, getSearchSuggestions } from './server/photos';

function App() {
  const [photos, setPhotos] = useState([]);
  const [photosSuggetions, setPhotosSuggetions] = useState([]);
  let requestTimeout;

  const onSubmitForm = (event) => {
    event.preventDefault();
    const searchValue = event.target.children[0].value;
    if (searchValue.length === 0) return;

    fetchPhotos(searchValue)
      .then(photosData => {
        setPhotos(photosData);
        setPhotosSuggetions([]);
      });
  };

  const onClickSuggestion = (suggestion) => {
    console.log("onClickSuggestion", suggestion);
    fetchPhotos(suggestion)
      .then(photosData => {
        setPhotosSuggetions([]);
        setPhotos(photosData);
      });
  };

  const onKeyupSearchInput = (event) => {
    clearTimeout(requestTimeout);
    const searchValue = event.target.value;
    if (searchValue.length === 0) return setPhotosSuggetions([]);
    requestTimeout = setTimeout(() => {
      getSearchSuggestions(searchValue)
        .then(suggestions => {
          setPhotosSuggetions(suggestions);
        });
    }, 500);
  };

  const onfocusSearchInput = (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) return;
    getSearchSuggestions(searchValue)
      .then(suggestions => {
        setPhotosSuggetions(suggestions);
      });
  };

  const onBlurSearchInput = () => {
    setTimeout(() => setPhotosSuggetions([]), 500);
  };

  return (
    <div>
      <h1>Photos Searcher</h1>
      <form onSubmit={ onSubmitForm }>
        <input
          type="text"
          placeholder="Search photo"
          onKeyUp={ onKeyupSearchInput }
          onFocus={ onfocusSearchInput }
          onBlur={ onBlurSearchInput }
        />
        { photosSuggetions.length > 0 &&
          <div className="suggetions-container">
            <p>Suggetions:</p>
            { photosSuggetions.map(suggestion => (
              <p
                key={ suggestion } onClick={ (event) => {
                  event.stopPropagation();
                  onClickSuggestion(suggestion);
                } }
                className="suggestion"
              >
                { suggestion }
              </p>
            )) }
          </div>
        }
      </form>
      <div className="photos-container">
        {
          photos.map(photo => (
            <img
              key={ photo.id }
              src={ photo.url }
              alt={ photo.alt }
            />
          ))
        }
      </div>
    </div>
  );
};

export default App;
