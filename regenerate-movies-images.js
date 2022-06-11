const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Transform } = require('stream');
const { getPlaiceholder } = require('plaiceholder');

const IMAGES_FOLDER = './public/images/movies';

const selectors = {
  POSTER_IMAGE: '.ipc-image',
  MOVIE_TITLE: '[data-testid="hero-title-block__title"]',
  RELEASE_YEAR: '[data-testid="hero-title-block__metadata"] li a',
  GENRES: '[data-testid="genres"] .ipc-inline-list__item.ipc-chip__text',
};

const movies = fs.readFileSync('movies.txt', 'utf-8').split('\n');
const moviesInformation = [];

(async function fetchMovies() {
  for (const movieIdentifier of movies) {
    const { data } = await axios.get(`https://imdb.com/title/${movieIdentifier}`, {
      headers: { Cookie: 'lc-main=en_US' },
    });
    const dom = new JSDOM(data);

    const image = dom.window.document.querySelector(selectors.POSTER_IMAGE);
    const title = dom.window.document.querySelector(selectors.MOVIE_TITLE).textContent;
    const year = parseInt(dom.window.document.querySelector(selectors.RELEASE_YEAR).textContent);
    const genres = Array.from(dom.window.document.querySelectorAll(selectors.GENRES)).map(
      (genreElement) => genreElement.textContent.toLowerCase()
    );

    // Path to the movie image.
    const movieImageFile = `${IMAGES_FOLDER}/${movieIdentifier}.jpg`;

    const { base64 } = await getPlaiceholder(`/images/movies/${movieIdentifier}.jpg`);

    if (!fs.existsSync(movieImageFile)) {
      // Parse the srcset attribute to fetch the highest quality image.
      const srcSetRegex = new RegExp(/ \d+w,?/g);
      const moviePosterImage = image
        .getAttribute('srcset')
        .replaceAll(srcSetRegex, '')
        .split(' ')
        .at(-1);

      https
        .request(moviePosterImage, (response) => {
          const stream = new Transform();

          response.on('data', (chunk) => stream.push(chunk));
          response.on('end', () => {
            const fileImageName = path.resolve(movieImageFile);

            fs.writeFileSync(fileImageName, stream.read());
          });
        })
        .end();
    }

    console.log(`${title} - ${year} - ${genres}`);

    moviesInformation.push({
      year,
      title,
      movieIdentifier,
      image: `/images/movies/${movieIdentifier}.jpg`,
      imagePlaceholder: base64,
      genres,
    });

    // To avoid being rate-limited.
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  fs.writeFileSync(
    './public/movies.json',
    JSON.stringify(
      moviesInformation.sort((previousMovie, nextMovie) => nextMovie.year - previousMovie.year),
      null,
      2
    )
  );
})();
