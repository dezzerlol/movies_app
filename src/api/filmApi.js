import axios from 'axios'

//api key 802e8255c2c75a5ae870c415e53a3567

export const filmApi = {
  //films get
  getPopularFilms(currentPage) {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=${currentPage}`)
  },

  getTopRatedFilms(currentPage) {
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=${currentPage}`)
  },

  getNowInTheTheatres(currentPage) {
    return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=${currentPage}&region=ru`)
  },

  getUpcomingFilms(currentPage) {
    return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=${currentPage}&region=ru`)
  },

  //tv shows get
  getPopularTvShows(currentPage) {
    return axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=${currentPage}`)
  },

  getTopRatedTvShows(currentPage) {
    return axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&page=${currentPage}`)
  },

  //get film/tvshow page info
  getFilmItem(type, movie_id) {
    return axios.get(`https://api.themoviedb.org/3/${type}/${movie_id}?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US`)
  },

  //get actors for film/tvshow
  getActorsItem(type, movie_id) {
    return axios.get(`https://api.themoviedb.org/3/${type}/${movie_id}/credits?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US`)
  },

  ///search film
  searchForFilm(term) {
    return axios.get(`
    https://api.themoviedb.org/3/search/multi?api_key=802e8255c2c75a5ae870c415e53a3567&language=en-US&query=${term}&page=1&include_adult=false
    `)
  },
}
