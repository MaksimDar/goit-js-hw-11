import axios from 'axios';

const API = '32407272-8586469b42e966f16f1a46a56';
const BASE_URL = `https://pixabay.com/api/`;

export default class searchPhotos {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalLoadedPhoto = 0;
    this.totalHits = 0;
  }

  async fetch() {
    const config = {
      params: {
        key: API,
        q: `${encodeURIComponent(this.searchQuery)}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 40,
      },
    };

    const response = await axios.get(`${BASE_URL}`, config);
    const photosData = response.data;
    const photosArray = photosData.hits;
    this.incrementPage();
    this.incrementQuantityLoadedPhoto(photosArray.length);
    this.totalHits = photosData.totalHits;
    return photosData;
  }

  incrementPage() {
    this.page += 1;
  }

  incrementQuantityLoadedPhoto(value) {
    this.totalLoadedPhoto += value;
  }

  resetPage() {
    this.page = 1;
  }

  resetTotalLoadedPhoto() {
    this.totalLoadedPhoto = 0;
  }

  resetHits() {
    this.totalHits = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
