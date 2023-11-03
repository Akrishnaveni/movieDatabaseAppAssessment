import {Component} from 'react'
import MovieItem from '../MovieItem'
import Header from '../Header'
import './index.css'

class TopRated extends Component {
  state = {topMovies: []}

  componentDidMount() {
    this.getTopMoviesURL()
  }

  getTopMoviesURL = async () => {
    const apiKey = '63b96bbc81217f2e35fb4a9acca608f9'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2I5NmJiYzgxMjE3ZjJlMzVmYjRhOWFjY2E2MDhmOSIsInN1YiI6IjY1NDEyYjk4MzNhNTMzMDEwYjJlZjJlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3bUAYmhsynW7yc_IVTyQ2XB2Zf0YDxG4u55iyGXlxOE',
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      console.log(data)

      const updateData = data.results.map(eachPopular => ({
        movieId: eachPopular.id,
        movieName: eachPopular.title,
        imagePath: eachPopular.backdrop_path,
        posterImage: eachPopular.poster_path,
        releaseDate: eachPopular.release_date,
        movieRating: eachPopular.vote_average,
        overview: eachPopular.overview,
        popularity: eachPopular.popularity,
      }))
      console.log(updateData)
      this.setState({
        topMovies: updateData,
      })
    }
  }

  render() {
    const {topMovies} = this.state

    return (
      <div className="home-container">
        <Header />
        <ul className="popular-list">
          {topMovies.map(eachM => (
            <MovieItem key={eachM.movieId} details={eachM} />
          ))}
        </ul>
      </div>
    )
  }
}
export default TopRated
