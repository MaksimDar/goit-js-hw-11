import searchPhotos from './searchPhotos';
import Notiflix from 'notiflix';
import findPhotos from './searchPhotos';

import './css/styles.css';
const searchForm = document.querySelector('#search-form');
const submitButton = document.querySelector('.submit');

function renderPhotos(photos) {
  const list = photos
    .map(
      (
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
      ) => {
        return `<li class = "photo"><a class = "galerry-item" href = "${largeImageURL}"> <img src = "${webformatURL}" alt = "${tags}"></a>
      <div class = "main-info"><p class = "info-item" <b>LIKES<b> <span>${likes}</span></p>
      <p class = "info-item" <b>VIEWS<b> <span>${views}</span></p>
      <p class = "info-item" <b>COMMENTS<b> <span>${comments}</span></p>
      <p class = "info-item" <b>DOWNLOADS<b> <span>${downloads}</span></p>
      </div>
      </li>`;
      }
    )
    .join('');
  console.log(list);
  searchForm.innerHTML(list);
}
