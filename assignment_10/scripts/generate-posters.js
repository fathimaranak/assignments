// Generates a simple typographic SVG poster for every movie in data/movies.json.
// Replace posterUrl values with real image URLs whenever you like.
const fs = require('fs');
const path = require('path');
const movies = require('../data/movies.json');

const palette = {
  'Sci-Fi':    ['#1E3A8A', '#38BDF8'],
  'Drama':     ['#4C1D2E', '#E8A87C'],
  'Thriller':  ['#1F2937', '#84A98C'],
  'Animation': ['#7C3AED', '#FBCFE8'],
  'Action':    ['#9A3412', '#FDBA74'],
  'Romance':   ['#9F1239', '#FDA4AF'],
  'Fantasy':   ['#14532D', '#BEF264'],
  'Comedy':    ['#A16207', '#FDE68A']
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, max = 13) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max && line) { lines.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function poster(m) {
  const [a, b] = palette[m.genre] || ['#334155', '#CBD5E1'];
  const lines = wrap(m.movieName);
  const size = lines.length > 3 ? 42 : 52;
  const startY = 330 - ((lines.length - 1) * size * 1.05) / 2;
  const text = lines
    .map((l, i) => `<tspan x="40" y="${startY + i * size * 1.05}">${esc(l)}</tspan>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" role="img" aria-label="Poster for ${esc(m.movieName)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></linearGradient>
  </defs>
  <rect width="400" height="600" fill="url(#g)"/>
  <circle cx="320" cy="130" r="150" fill="#fff" fill-opacity="0.12"/>
  <circle cx="320" cy="130" r="90" fill="#fff" fill-opacity="0.12"/>
  <rect width="400" height="600" fill="url(#s)"/>
  <text font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${size}" fill="#fff">${text}</text>
  <text x="40" y="548" font-family="Helvetica, Arial, sans-serif" font-size="20" fill="#fff" fill-opacity="0.9">${esc(m.director)}</text>
  <text x="40" y="574" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#fff" fill-opacity="0.75">${m.releaseYear}</text>
</svg>
`;
}

const dir = path.join(__dirname, '..', 'public', 'posters');
fs.mkdirSync(dir, { recursive: true });
for (const m of movies) {
  const file = path.join(__dirname, '..', 'public', m.posterUrl);
  fs.writeFileSync(file, poster(m));
}

fs.writeFileSync(path.join(dir, 'placeholder.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><rect width="400" height="600" fill="#CBD2DD"/><text x="200" y="305" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#5B6579">Poster not available</text></svg>\n`);
console.log(`Generated ${movies.length} posters in public/posters`);
