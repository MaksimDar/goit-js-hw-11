import axios from 'axios';

const API = '32407272-8586469b42e966f16f1a46a56';
const BASE_URL = 'https://pixabay.com/api/';

export default class findPhotos {
  constructor() {
    this.input = '';
    this.page = 1;
    this.totalLoadedPhoto = 0;
    this.totalHits = 0;
  }

  async searchPhotos() {
    const options = {
      parameters: {
        key: API,
        q: encodeURIComponent(this.input),
        image_type: photo,
        orientation: horizontal,
        safesearch: true,
        page: this.page,
      },
    };
    const answer = await axios.get(`${BASE_URL}`, options);
  }
}
