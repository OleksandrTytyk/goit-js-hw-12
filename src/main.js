import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '41901135-804299004675a38bc43612a92';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.form-input'),
  searchBtn: document.querySelector('.form-btn'),
  loader: document.querySelector('.loader'),
  card: document.querySelector('.card-container'),
};

const { form, input, searchBtn, loader, card } = refs;

let searchQuery = '';
let page = 1;

form.addEventListener('submit', handleImageSearchSubmit);

function handleImageSearchSubmit(event) {
  event.preventDefault();

  const formQuery = event.currentTarget;
  searchQuery = formQuery.elements.query.value.trim();
  fetchData(searchQuery);
}

function fetchData(searchQuery) {
  return axios
    .get(`${BASE_URL}/`, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 15,
      },
    })
    .then({data} => console.log(data.data.hits));
}
