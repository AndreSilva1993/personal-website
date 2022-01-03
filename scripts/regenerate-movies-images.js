const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Transform } = require('stream');

const movies = require('../public/movies.json');

const IMDB_TITLES_URL = 'https://imdb.com/title';
const IMDB_PAGE_IMAGE_SELECTOR = '.ipc-image';
const IMDB_IMAGES_FOLDER = '../public/images/movies';

let skippedCount = 0,
  downloadedCount = 0;

const promises = movies.map(
  ({ imdbIdentifier, title }) =>
    new Promise(async (resolve) => {
      const fileImageName = path.resolve(
        __dirname,
        `${IMDB_IMAGES_FOLDER}/${title.split('.').at(-1)}.jpg`
      );

      // Check if the file already exists.
      if (fs.existsSync(fileImageName)) {
        skippedCount++;
        resolve();
      } else {
        // Fetch the IMDb page and parse it using JSDOM.
        const { data } = await axios.get(`${IMDB_TITLES_URL}/${imdbIdentifier}`);
        const imageElement = new JSDOM(data).window.document.querySelector(
          IMDB_PAGE_IMAGE_SELECTOR
        );

        // Parse the srcset attribute to fetch the highest quality image.
        const srcSetRegex = new RegExp(/ \d+w,?/g);
        const moviePosterImage = imageElement
          .getAttribute('srcset')
          .replaceAll(srcSetRegex, '')
          .split(' ')
          .at(-1);

        https
          .request(moviePosterImage, (response) => {
            const stream = new Transform();

            response.on('data', (chunk) => stream.push(chunk));
            response.on('end', () => {
              downloadedCount++;

              fs.writeFileSync(fileImageName, stream.read());
              resolve();
            });
          })
          .end();
      }
    })
);

Promise.all(promises).then(() => {
  console.log(`Found ${movies.length} movies.`);
  console.log(`Downloaded ${downloadedCount} movie poster(s)`);
  console.log(`Skipped ${skippedCount} movie poster(s) since they've been previously downloaded.`);
});
