const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { getPlaiceholder } = require('plaiceholder');

const IMAGES_FOLDER = './public/images/movies';

const selectors = {
  POSTER_IMAGE: '.ipc-image',
  GENRES: '[data-testid="genres"] a span',
  MOVIE_TITLE: '[data-testid="hero-title-block__title"]',
  RELEASE_DATE: '[data-testid="title-details-section"] .ipc-metadata-list-item__list-content-item',
};

const imdbIdentifiers = fs.readFileSync('movies.txt', 'utf-8').split('\n');
const movies = [];
const movieReleaseDates = {};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

(async function fetchMovies() {
  for (const imdbIdentifier of imdbIdentifiers) {
    const { data } = await axios.get(`https://imdb.com/title/${imdbIdentifier}`, {
      headers: { Cookie: 'lc-main=en_US' },
    });

    const { window } = new JSDOM(data);

    const image = window.document.querySelector(selectors.POSTER_IMAGE);
    const title = window.document.querySelector(selectors.MOVIE_TITLE).textContent;
    const genres = Array.from(window.document.querySelectorAll(selectors.GENRES)).map(
      (genreElement) => genreElement.textContent.toLowerCase()
    );

    const [_, monthName, day, year] = window.document
      .querySelector(selectors.RELEASE_DATE)
      .textContent.match(/(\w+) (\d{1,2}), (\d{4})/);

    // Parse the srcset attribute to fetch the highest quality image.
    const srcSetRegex = new RegExp(/ \d+w,?/g);
    const moviePosterImage = image
      .getAttribute('srcset')
      .replaceAll(srcSetRegex, '')
      .split(' ')
      .at(-1);

    // Download the image and generate the low-quality image placeholder.
    const imageResponse = await axios.get(moviePosterImage, {
      responseType: 'stream',
    });

    await new Promise((resolve) => {
      imageResponse.data
        .pipe(fs.createWriteStream(path.resolve(`${IMAGES_FOLDER}/${imdbIdentifier}.jpg`)))
        .on('finish', () => resolve());
    });

    // Path to the movie image.
    const { base64 } = await getPlaiceholder(`/images/movies/${imdbIdentifier}.jpg`);

    movieReleaseDates[imdbIdentifier] = new Date(
      parseInt(year),
      monthNames.indexOf(monthName),
      parseInt(day)
    ).getTime();

    movies.push({
      title,
      imdbIdentifier,
      year: parseInt(year),
      image: `/images/movies/${imdbIdentifier}.jpg`,
      imagePlaceholder: base64,
      genres,
    });

    // To avoid being rate-limited.
    console.log(`${title} - ${year} - ${genres}`);
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  fs.writeFileSync(
    './public/movies.json',
    JSON.stringify(
      movies.sort(
        (previousMovie, nextMovie) =>
          movieReleaseDates[nextMovie.imdbIdentifier] -
          movieReleaseDates[previousMovie.imdbIdentifier]
      ),
      null,
      2
    )
  );
})();
