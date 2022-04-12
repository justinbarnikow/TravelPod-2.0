import React from 'react'
import AppContext from '../AppContext'
import PodList from './PodList'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function PodcastPage() {
  return (
    <AppContext.Consumer>
      {(value) => {
        if(!value.travel.time) {
          return (
            <article className='podcastHeader heroSection'>
              <Link to='/'><h1>TravelPod</h1></Link>
                <div className='subtitle whatsOn'>what's on?</div>
            </article>
          )
        }
        return (
          <section className='podcastPage'>
            <article className='userData'>
              <p className='userStart'>From: {value.startingLocation.place_name}</p><br />
              <p className='userEnd'>To: {value.endingLocation.place_name}</p><br />
              <p className='userDuration'>{value.travel.miles} miles, {value.travel.time} minutes, {value.travel.vehicle} </p>
            </article>
            <article className='podcastHeader heroSection'>
              <Link to='/'><h1>TravelPod</h1></Link>
                <div className='subtitle whatsOn'>what's on?</div>
            </article>
            <article className='searchNav'>
                <form className='searchForm' onSubmit={(e) => {
                  value.getPodcasts(e)
                }}>
                    <input required name='podcast' id='podcast' aria-label="podcast input" className='podcastInput searchInput' placeholder='what kind of podcast?' type='text'  />
                    <button type='submit' className='Search navButton'>
                        <FaSearch />
                    </button>
                </form>
            </article>
            <PodList />
        </section>
        )
      }}
    </AppContext.Consumer>
  )
}

export default PodcastPage