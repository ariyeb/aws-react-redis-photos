import './App.css';
import { useState } from 'react';
import { fetchPhotos } from './server/photos';

function App() {
  const [photos, setPhotos] = useState([]);
  const [photosSuggetions, setPhotosSuggetions] = useState(["cat"]);

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log(event.target.children[0].value);
    fetchPhotos(event.target.children[0].value)
      .then(photosData => setPhotos(photosData));
  };

  const onClickSuggestion = (suggestion) => {
    fetchPhotos(suggestion)
      .then(photosData => {
        setPhotosSuggetions([]);
        setPhotos(photosData);
      });
  };

  return (
    <div>
      <h1>Photos Searcher</h1>
      <form onSubmit={ onSubmitForm }>
        <input type="text" placeholder="Search photo" />
        { photosSuggetions.length > 0 && <div className="suggetions-container">
          { photosSuggetions.map(suggestion => (
            <p onClick={ () => { onClickSuggestion(suggestion); } }>{ suggestion }</p>
          )) }
        </div> }
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
}

export default App;
