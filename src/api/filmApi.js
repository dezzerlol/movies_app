import axios from 'axios'

//api key 802e8255c2c75a5ae870c415e53a3567

export const filmApi = {
  getPopularFilms() {
    return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=1')
  },

  getTopRatedFilms() {
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=1`)
  },

  getNowInTheTheatres() {
    return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=1&region=ru')
  },

  getUpcomingFilms() {
    return axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=1&region=ru')
  },

  getPopularTvShows() {
    return axios.get('https://api.themoviedb.org/3/tv/popular?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=1')
  },

  getFilmItem(type, movie_id) {
    return axios.get(`https://api.themoviedb.org/3/${type}/${movie_id}?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US`)
  },

  getActorsItem(type, movie_id) {
    return axios.get(`https://api.themoviedb.org/3/${type}/${movie_id}/credits?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US`)
  },

  searchForFilm(term) {
    return axios.get(`
    https://api.themoviedb.org/3/search/multi?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&query=${term}&page=1&include_adult=false
    `)
  },
}
