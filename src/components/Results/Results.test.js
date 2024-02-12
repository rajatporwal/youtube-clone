import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from './Results';
import useFetch from '../../hooks/useFetch';

jest.mock('../../hooks/useFetch');

describe('Results component', () => {
  // Define mock data for testing
  const mockData = {
    videos: [
      { id: { videoId: '2zqnGUY9eZs' }, title: 'Redux Flow' },
      { id: { videoId: 'knqz3_rPcKk' }, title: 'React Typescript' },
    ],
    totalResults: 2,
    query: 'search_query',
  };

  beforeEach(() => {
    useFetch.mockReturnValue({
      data: mockData,
      isPageLoading: false,
      getYouTubeData: jest.fn(),
    });
    window.scrollTo = jest.fn();
  });

  test('renders loading message when page is loading', () => {
    useFetch.mockReturnValue({
      data: { videos: [], totalResults: 0, query: '' },
      isPageLoading: true,
      getYouTubeData: jest.fn(),
    });

    render(<Results />, { wrapper: MemoryRouter });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders video list and playback when data is loaded', () => {
    render(<Results />, { wrapper: MemoryRouter });
    expect(screen.queryByTestId('video-list')).toBeInTheDocument();
  });

  test('should not render the video list component when there are no videos', () => {
    useFetch.mockReturnValue({
      data: { videos: [], totalResults: 0, query: '' },
      isPageLoading: true,
      getYouTubeData: jest.fn(),
    });

    render(<Results />, { wrapper: MemoryRouter });

    expect(screen.queryByTestId('video-list')).not.toBeInTheDocument();
  });
});