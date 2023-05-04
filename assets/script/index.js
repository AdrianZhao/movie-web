
/*
  OOP JavaScript
  Yuhan Zhao

*/

'use strict';

function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
function select (selector, parent = document) {
  return parent.querySelector(selector);
}
function selectAll (selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
function print(arg) {
  console.log(arg);
}
function create(element, parent = document) {
  return parent.createElement(element);
}
const urlCities = './assets/script/cities.json';
const urlMovies = './assets/script/movies.json';
const droplistCities = select('.droplistCities');
const droplistMovies = select('.droplistMovies');
const moviesWrapper = select('.moviesWrapper');
const movieValue = select('#movie-name');
const cityValue = select('#city-name');
const options = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  mode: 'cors'
}
async function getCities() {
  try {
    const response = await fetch(urlCities, options);
    if(!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    checkCities(data.cities);
  }
  catch(error) {
    console.log(error.message);
  }
}
getCities();
function listMovies(array) {
  moviesWrapper.innerHTML = '';
  let movies = '';
  array.forEach(movie => {
    movies += `<div class="detail">
                <img src="${movie.poster}">
                <p>${movie.name}</p>
              </div>`;
  })
  moviesWrapper.innerHTML = `${movies}`;
}
async function getMovies() {
  try {
    const response = await fetch(urlMovies, options);
    if(!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    if (moviesWrapper.innerHTML === '') {
      listMovies(data.movies);
    }
    checkMovies(data.movies);
  }
  catch(error) {
    console.log(error.message);
  }
}
window.onload = function () {
  getMovies();
}
function checkMovies(array) {
  onEvent('keyup', movieValue, function() {
    let temp = movieValue.value.toLowerCase().trim();
    droplistMovies.innerHTML = '';
    let count = 0;
    let movies = '';
    if (temp.length > 1) {
      array.forEach((element) => {
        const name = element.name;
        const lowerName = name.toLowerCase();
        if (lowerName.includes(temp)) {
          movies += 
          `<div class="dropMovieDetail">
            <p class="movieInfo">${element.name}</p>
          </div>`;
          count++;
        }
      })
      if (count === 0) {
        movies = `<div>Movies not found</div>`;
      }
      droplistMovies.innerHTML = `${movies}`;
      const dropMovieDetail = selectAll('.dropMovieDetail');
      const movieInfo = selectAll('.movieInfo');
      for (let i = 0; i < dropMovieDetail.length; i++) {
        dropMovieDetail[i].addEventListener('click', () => {
          movieValue.value = movieInfo[i].innerText;
          droplistMovies.innerHTML = '';
        })
      }
    }
  })
}
function checkCities(array) {
  onEvent('keyup', cityValue, function() {
    let temp = cityValue.value.toLowerCase().trim();
    droplistCities.innerHTML = '';
    let count = 0;
    let cities = '';
    let name = '';
    if (temp.length > 1) {
      array.forEach((element) => {
        name = element.name;
        const lowerName = name.toLowerCase();
        if (lowerName.includes(temp)) {
          cities += 
          `<div class="dropCityDetail">
            <p class="cityInfo">${element.name}</p>
          </div>`;
          count++;
        }
      })
      if (count === 0) {
        cities = `<div>Cities not found</div>`;
      }
      droplistCities.innerHTML = `${cities}`;
      const dropCityDetail = selectAll('.dropCityDetail');
      const cityInfo = selectAll('.cityInfo');
      for (let i = 0; i < dropCityDetail.length; i++) {
        dropCityDetail[i].addEventListener('click', () => {
          cityValue.value = cityInfo[i].innerText;
          droplistCities.innerHTML = '';
        })
      }
    }
  })
}