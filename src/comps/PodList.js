import React from 'react'
import AppContext from '../AppContext'
import PodCard from './PodCard'

function PodList() {
  return (
    <AppContext.Consumer>
        {(value) => {
            if(!value.podcast.list[0]) {
                return null
            }
            return (
                <article className='podcast_results'>
                    <ul className='podcast_list grid_list'>
                        {value.podcast.list.map((podcast, i) => {
                            return (
                                <li className='grid_item' key={i}>
                                    <PodCard key={i} podcast={podcast} />
                                </li>
                            )
                        })}
                    </ul>
                </article>
            )
        }}
    </AppContext.Consumer>
  )
}

export default PodList