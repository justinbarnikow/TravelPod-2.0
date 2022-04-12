import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import PodList from '../PodList';

describe('PodList component', () => {
  it('renders PodList component without crashing', () => {
    shallow(<BrowserRouter><PodList /></BrowserRouter>)
  })
})