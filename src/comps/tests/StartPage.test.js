import React from 'react';
import { shallow } from 'enzyme';
import StartPage from '../StartPage';
import { BrowserRouter } from 'react-router-dom';

describe('StartPage component', () => {
  it('renders StartPage component without crashing', () => {
    shallow(<BrowserRouter><StartPage /></BrowserRouter>)
  })
})