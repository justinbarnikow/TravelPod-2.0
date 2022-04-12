import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import PodcastPage from '../PodcastPage';

describe('PodcastPage component', () => {
  it('renders PodcastPage component without crashing', () => {
    shallow(<BrowserRouter><PodcastPage /></BrowserRouter>)
  })
})