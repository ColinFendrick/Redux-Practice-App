import ReactDOM from 'react-dom'
import React, {Component } from 'react'
import SearchBar from './components/search_bar'
import YTSearch from 'youtube-api-search'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail.js'
import _ from 'lodash'

const API_KEY = 'AIzaSyADIVkalal0IyMkRmyNltXBDHh7xdzqS6A'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [] ,
      selectedVideo: null
    }

    this.videoSearch('surfboards')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    })
  }
  
  render() {
    const videoSearch = _.debounce(term => { this.videoSearch(term) }, 300)

    return <div>
    <SearchBar onSearchTermChange={videoSearch} />
    <VideoDetail video={this.state.selectedVideo} />
    <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
       videos={this.state.videos} />
  </div>
  }
}


ReactDOM.render(<App />, document.querySelector('.container'))
