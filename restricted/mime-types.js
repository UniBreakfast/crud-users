module.exports = { guessType };

const { extname } = require("path");
const utf = '; charset=utf-8';

const mimeTypeDict = {
  html: 'text/html ' + utf,
  htm: 'text/html ' + utf,
  css: 'text/css ' + utf,
  js: 'text/javascript ' + utf,
  json: 'application/json ' + utf,
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  pdf: 'application/pdf',
  zip: 'application/zip',
  txt: 'text/plain ' + utf,

}

function guessType(path) {
  const ext = extname(path).slice(1);

  return mimeTypeDict[ext] || mimeTypeDict.txt;
}
