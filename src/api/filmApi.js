import axios from 'axios'

//api key 802e8255c2c75a5ae870c415e53a3567

export const filmApi = {
  getPopularFilms() {
    return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=1')
  },

  getFilmItem(movie_id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US`)
  },

  searchForFilm(term) {
    return axios.get(`
    https://api.themoviedb.org/3/search/movie?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&query=${term}&page=1&include_adult=false
    `)
  },
}
