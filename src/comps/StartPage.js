import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../AppContext'
import { FaRegArrowAltCircleRight, FaSearch } from 'react-icons/fa'

function StartPage() {
    const navigate = useNavigate()
  return (
    <AppContext.Consumer>
        {(value) => {
            const ifSearched = value.startingLocation.place_name
            return (
                <section className='startPage'>
                    <article className='startHeader heroSection'>
                        <Link to='/'><h1>TravelPod</h1></Link>
                        <div className='subtitle whereFrom'>where from?</div>
                    </article>
                    <article className='searchNav'>
                        <form className='searchForm' onSubmit={(e) => value.getStartingLocation(e)}>
                            <input required name='locStart' id='locStart' aria-label="start location input" className='locationStart searchInput' placeholder='starting location' type='text'  />
                            <button type="submit" className='Search navButton' >
                                <FaSearch />
                            </button>
                        </form>
                    </article>
                    <article className='locationConfirm'>
                        {ifSearched
                        ? <p className='locConfirmText'>Is <span className='location'>{value.startingLocation.place_name}</span> correct?<br /><button className='Confirm navButton' type='button' onClick={() => navigate('/end')}><FaRegArrowAltCircleRight /></button></p>
                        : <p className='cityDirections'>enter a city name, partial address, or full address</p>
                        }
                    </article>
                </section>
            )
        }}
    </AppContext.Consumer>
  )
}

export default StartPage