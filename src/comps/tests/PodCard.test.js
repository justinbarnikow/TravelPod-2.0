import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import PodCard from '../PodCard';

describe('PodCard component', () => {
  it('renders PodCard component without crashing', () => {
    shallow(<BrowserRouter><PodCard /></BrowserRouter>)
  })
})