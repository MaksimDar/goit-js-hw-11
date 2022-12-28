import './css/styles.css';
import searchPhotos from './photo-service';
import LoadMorePhotosBtn from './load-more-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const photoService = new searchPhotos();

function renderPhotos(photos) {
  const instance = photos
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `<div class="photo">
      <div class='thumb'>
      <a class="link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b> <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b> <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b> <span>${downloads}</span>
        </p>
      </div>
    </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', instance);
  lightbox.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

const loadMoreBtn = new LoadMorePhotosBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const lightbox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onClick);

async function onSearch(e) {
  e.preventDefault();
  if (
    photoService.query === e.currentTarget.elements.searchQuery.value.trim()
  ) {
    return;
  } else if (
    photoService.query !== e.currentTarget.elements.searchQuery.value.trim() &&
    !photoService.query
  ) {
    Notify.failure('Sorry, but you must enter a value');
    return;
  }

  gallery.innerHTML = '';

  photoService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (photoService.query) {
    photoService.resetPage();
    photoService.resetTotalLoadedPhoto();
    photoService.resetHits();
    loadMoreBtn.hide();
  } else {
    Notify.failure('Sorry, but you must enter a value');
    loadMoreBtn.hide();
    return;
  }

  try {
    const response = await photoService.fetch();
    const array = response.hits;

    if (array.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${response.totalHits} images.`);

    renderPhotos(array);

    if (photoService.totalLoadedPhoto >= photoService.totalHits) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    loadMoreBtn.show();
  } catch (err) {
    console.log(err);
  }
}

async function onClick() {
  try {
    const response = await photoService.fetch();
    const array = await response.hits;

    renderPhotos(array);
    if (photoService.totalLoadedPhoto >= photoService.totalHits) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.hide();
      return;
    }
  } catch (err) {
    console.log(err);
  }
}

glglglglglggl;
