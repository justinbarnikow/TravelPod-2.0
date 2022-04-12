import React, { useState } from 'react'
import {FaDownload} from 'react-icons/fa'
import {IoMdArrowDropdown,IoMdArrowDropup} from 'react-icons/io'

function PodCard(props) {
    let title = props.podcast.title_original
    if(title.length > 75) {
      title = title.substring(0, 75) + '...'
    }
    const audio = props.podcast.audio
    const duration = Math.round(props.podcast.audio_length_sec / 60) + ' minutes'
    let description = props.podcast.description_highlighted
    if(description.length > 400) {
      description = description.substring(0, 400) + '...'
    }
    const link = props.podcast.link
    const listennotes = props.podcast.listennotes_url
    const image = props.podcast.image
    const [showDescription, setShowDescription] = useState(false)
    //<FaInfoCircle onClick={() => setShowDescription(true)}/>
  return (
    <div className='podcast_card'>
        <img className='thumbnail' src={image} alt='thumbnail' />
        <div  className='pod_title'><a href={link} target="_blank" rel="noreferrer"><h3>{title}</h3></a></div>
        <div className='podInfo'>
          <p>{duration}</p>
          <a className='listennotes' href={listennotes} target="_blank" rel="noreferrer">Listen Notes</a>
          <a href={audio} target="_blank" rel='noreferrer'><FaDownload className='download'/></a>
        </div>
        {
            showDescription ?
            <div className='descShowing'>
              <div className='descButton' onClick={() => setShowDescription(false)}><span className='hide'>Hide Description</span><IoMdArrowDropup className='dropdown_icon' /></div>
              <p className='description'>{description}</p>
            </div> :
            <div className='descHiding'>
              <div className='descButton' onClick={() => setShowDescription(true)}>Show Description<IoMdArrowDropdown className='dropdown_icon'/></div>
            </div>
          }
    </div>
  )
}

export default PodCard