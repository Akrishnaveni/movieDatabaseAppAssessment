import {Component} from 'react'
import MovieItem from '../MovieItem'
import Header from '../Header'

import './index.css'

class UpComing extends Component {
  state = {upComingMovies: []}

  componentDidMount() {
    this.getTopMoviesURL()
  }

  getTopMoviesURL = async () => {
    const apiKey = '63b96bbc81217f2e35fb4a9acca608f9'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
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
    const details = data.results

    if (response.ok === true) {
      const updateData = details.map(eachC => ({
        movieId: eachC.id,
        movieName: eachC.title,
        imagePath: eachC.backdrop_path,
        posterImage: eachC.poster_path,
        releaseDate: eachC.release_date,
        movieRating: eachC.vote_average,
        overview: eachC.overview,
        popularity: eachC.popularity,
      }))
      console.log(updateData)
      this.setState({
        upComingMovies: updateData,
      })
    }
  }

  render() {
    const {upComingMovies} = this.state

    return (
      <div className="home-container">
        <Header />
        <ul className="popular-list">
          {upComingMovies.map(eachM => (
            <MovieItem key={eachM.movieId} details={eachM} />
          ))}
        </ul>
      </div>
    )
  }
}
export default UpComing
