import React from 'react';
import { shallow } from 'enzyme';
import WelcomePage from '../WelcomePage';
import { BrowserRouter } from 'react-router-dom';

describe('WelcomePage component', () => {
  it('renders WelcomePage component without crashing', () => {
    shallow(<BrowserRouter><WelcomePage /></BrowserRouter>)
  })
})