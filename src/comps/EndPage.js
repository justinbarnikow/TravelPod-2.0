import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../AppContext'
import { FaSearch, FaRegArrowAltCircleRight } from 'react-icons/fa'


function EndPage() {
    const navigate = useNavigate()
    return (
      <AppContext.Consumer>
          {(value) => {
            const ifSearched = value.endingLocation.place_name
              return (
                <section className='endPage'>
                    <article className='endHeader heroSection'>
                        <Link to='/'><h1>TravelPod</h1></Link>
                        <div className='subtitle whereTo'>where to?</div>
                    </article>
                    <article className='searchNav'>
                        <form className='searchForm' onSubmit={(e) => value.getEndingLocation(e)}>
                            <input required name='locEnd' id='locEnd' aria-label="end location input" className='locationEnd searchInput' placeholder='ending location' type='text'  />
                            <button type='submit' className='Search navButton'>
                                <FaSearch />
                            </button>
                        </form>
                    </article>
                    <article className='locationConfirm'>
                        {ifSearched
                        ? <p className='locConfirmText'>Is <span className='location'>{value.endingLocation.place_name}</span> correct?<br />
                            <button className='Confirm navButton' type='button' onClick={() => {
                                value.getDistance()
                                navigate('/podcast')}}><FaRegArrowAltCircleRight />
                            </button></p>
                        : <p className='cityDirections'>enter a city name, partial address, or full address</p>
                        }
                    </article>
                </section>
              )
          }}
      </AppContext.Consumer>
  )
}

export default EndPage