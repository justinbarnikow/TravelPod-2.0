import React from 'react';
import { shallow } from 'enzyme';
import EndPage from '../EndPage';
import { BrowserRouter } from 'react-router-dom';

describe('EndPage component', () => {
  it('renders EndPage component without crashing', () => {
    shallow(<BrowserRouter><EndPage /></BrowserRouter>)
  })
})