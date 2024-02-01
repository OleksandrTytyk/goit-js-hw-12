import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41901135-804299004675a38bc43612a92';

const refs = {
  form: document.querySelector('.js-form'),
  input: document.querySelector('.js-form-input'),
  btn: document.querySelector('.js-form-btn'),
  card: document.querySelector('.js-card-container'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.load-more'),
};

const hiddenClass = 'is-hidden';
let page = 1;
let searchQuery = '';
let maxPage = 0;

refs.loader.style.display = 'none';

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', handleImageSearchSubmit);

async function handleImageSearchSubmit(event) {
  event.preventDefault();

  page = 1;

  clearGallery();

  refs.loader.style.display = 'block';

  const form = event.currentTarget;
  searchQuery = form.elements.query.value.trim();

  if (searchQuery === '') {
    refs.loader.style.display = 'none';
    refs.loadMore.classList.add(hiddenClass);

    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });

    return;
  }

  try {
    const { hits, totalHits } = await fetchData(searchQuery);

    maxPage = Math.ceil(totalHits / 40);

    createMarkup(hits);

    gallery.refresh();

    if (hits.length > 0 && hits.length !== totalHits) {
      refs.loadMore.classList.remove(hiddenClass);
      refs.loadMore.addEventListener('click', handleLoadMore);
    } else {
      refs.loadMore.classList.add(hiddenClass);
    }
  } catch (error) {
    console.error(error);
  } finally {
    refs.loader.style.display = 'none';
    refs.form.reset();
  }
}

async function fetchData(searchQuery, page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 40,
      },
    });

    if (!response.data.hits.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function handleLoadMore(event) {
  event.preventDefault();

  refs.loadMore.disabled = true;
  page += 1;

  try {
    const { hits } = await fetchData(searchQuery, page);

    createMarkup(hits);

    gallery.refresh();

    const elementRect = document
      .querySelector('.card-item')
      .getBoundingClientRect();

    window.scrollBy({
      top: elementRect.height * 2.0,
      left: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error);
  } finally {
    refs.loadMore.disabled = false;
    
    if (page === maxPage) {
      refs.loadMore.classList.add(hiddenClass);
      refs.loadMore.removeEventListener('click', handleLoadMore);
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  }
}

function createMarkup(imgCard) {
  const markup = imgCard
    .map(img => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;

      return `
        <li class="card-item">
          <div class="card-img js-card-img gallery">
            <a href="${largeImageURL}" class="big-img js-big-img">
              <img
                src="${webformatURL}"
                alt="${tags}"
                class="small-img js-small-img"
                width="360px"
                height="260px"
              />
            </a>
          </div>
          <div class="stats-container js-stats-container">
            <p class="stats"><b>Likes:</b> ${likes}</p>
            <p class="stats"><b>Views:</b> ${views}</p>
            <p class="stats"><b>Comments:</b> ${comments}</p>
            <p class="stats"><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>`;
    })
    .join('');

  refs.card.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.card.innerHTML = '';
}
