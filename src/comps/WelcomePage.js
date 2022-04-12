import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../AppContext';
import { FaQuestion, FaRegArrowAltCircleRight } from 'react-icons/fa'

function WelcomePage() {
    const navigate = useNavigate();

  return (
    <AppContext.Consumer>
        {(value) => {
            return (
                <section className='welcomePage'>
                    <article className='welcomeHeader heroSection'>
                        <h1>TravelPod</h1>
                        <div className='subtitle welcomeTo'>welcome to</div>
                    </article>
                    <article className='welcomeNav'>
                        <form className='welcomeForm' onSubmit={(e) => {
                            value.getVehicle(e)
                            navigate('/start')
                        }}>
                            <label htmlFor='vehicle'>To begin, choose a travel type:</label>
                            <br />
                            <div className='dropdownNav'>
                                <div className='vehicleDropdown'>
                                    <select id="vehicle" name="vehicle">
                                            <option value="walking">Walking</option>
                                            <option value="driving">Driving</option>
                                    </select>
                                </div>
                                <button className='Begin navButton' type='submit'>
                                    <FaRegArrowAltCircleRight />
                                </button>    
                            </div>
                        </form>
                    </article>
                </section>
            )
        }}
    </AppContext.Consumer>
  )
}

export default WelcomePage