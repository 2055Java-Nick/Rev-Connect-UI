import { render, screen, fireEvent, waitFor, act, findByText } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import BusinessProfile from './BusinessProfile';
import axios from 'axios';
import '@testing-library/jest-dom';

vi.mock('../Context/UserContext', () => ({
  useUser: () => ({
    user: { id: "1" },
    setUser: vi.fn(),
  }),
}));

vi.mock('axios');

// Helper function to mock axios responses
const mockAxiosResponse = (data: any) => {
  axios.get = vi.fn().mockResolvedValue({ data });
  axios.patch = vi.fn().mockResolvedValue({ data });
  axios.post = vi.fn().mockResolvedValue({ data });
  axios.delete = vi.fn().mockResolvedValue({});
};

// BusinessProfile Tests
describe('BusinessProfile Component', () => {

// Test for rendering basic profile elements
  it('should render the profile information', () => {
    mockAxiosResponse({
      BIO_TEXT: 'Tell Everyone About Yourself!',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: false,
      USER_ID: 1,
    });

    render(<BusinessProfile />);

    expect(screen.getByAltText('RevConnect Logo')).toBeInTheDocument();
    expect(screen.getByText('Tell Everyone About Yourself!')).toBeInTheDocument();
  });

// Testing where id check for user and profile match to allow editing bio
  it('should show edit form when Edit button is clicked', async () => {
    render(<BusinessProfile />);
    mockAxiosResponse({
      BIO_TEXT: '',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: false,
      USER_ID: 1,
      });
    await waitFor((() =>fireEvent.click(screen.getByText('Edit'))));

    waitFor(() => expect(screen.getByPlaceholderText('Tell Us About Yourself!')).toBeInTheDocument());
  });

// Testing user input validation by disabling submit button if text is longer than 500 characters
  it('should disable submit button if bio text length exceeds limit', async () => {
    render(<BusinessProfile />);
    act(() => mockAxiosResponse({
      BIO_TEXT: 'Tell Everyone About Yourself!',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: false,
      USER_ID: 1,
    }));

    waitFor(() =>fireEvent.click(screen.getByText('Edit')));
    
    waitFor(() =>fireEvent.change(screen.getByPlaceholderText('Tell Everyone About Yourself!'), { target: { value: 'a'.repeat(501) } }));

    waitFor(() => expect(screen.getByText('Submit')).toBeDisabled());
  });

// Cancel button should hide the textarea input field of the form
  it('should hide edit form when Cancel button is clicked', async () => {
    render(<BusinessProfile />);
    mockAxiosResponse({
      BIO_TEXT: 'Tell Everyone About Yourself!',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: false,
      USER_ID: 1,
    });

    waitFor(()=>fireEvent.click(screen.getByText('Edit')));

    waitFor(()=>fireEvent.click(screen.getByText('Cancel')));

    waitFor(()=>expect(screen.queryByPlaceholderText('Tell Everyone About Yourself!')).not.toBeInTheDocument());
  });


// Test checking error is displayed when a profile doesn't exist for an id
  it('should display an error message when there is a network error', async () => {
    axios.get = vi.fn().mockRejectedValue(new Error('Network Error'));

    render(<BusinessProfile />);

    expect(await screen.findByText('No Profile For This User')).toBeInTheDocument();
  });

// testing successful bio update, should display updated bio
  it('should update bio when submit button is clicked', async () => {
    mockAxiosResponse({
      BIO_TEXT: 'Updated bio',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: false,
      USER_ID: 1,
    });

    render(<BusinessProfile />);

    waitFor(()=>fireEvent.click(screen.getByText('Edit')));

    waitFor(()=> fireEvent.change(screen.getByPlaceholderText('Tell Everyone About Yourself!'), { target: { value: 'Updated bio' } }));

    waitFor(()=> fireEvent.click(screen.getByText('Submit')));

    waitFor(() => {
      expect(screen.getByText('Updated bio')).toBeInTheDocument();
    });
  });

// Testing display of links if present
  it('should render endorsement links when available', async () => {
    mockAxiosResponse({
      BIO_TEXT: 'Tell Everyone About Yourself!',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: true,
      USER_ID: 1,
    });

    axios.get = vi.fn().mockResolvedValue({
      data: [
        { id: 1, userId: 1, link: 'http://example.com', linkText: 'Example Link' },
      ],
    });

    render(<BusinessProfile />);

    waitFor(() => expect(screen.findByText('Example Link')).toBeInTheDocument());
  });

// Testing successful link creation
  it('should add a new endorsement link', async () => {
    mockAxiosResponse({
      BIO_TEXT: 'Tell Everyone About Yourself!',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: true,
      USER_ID: 1,
    });

    axios.post = vi.fn().mockResolvedValue({
      data: { id: 2, userId: 1, link: 'http://newlink.com', linkText: 'New Link' },
    });

    render(<BusinessProfile />);

    waitFor(() =>fireEvent.click(screen.getByText('Edit')));

    waitFor(() =>fireEvent.change(screen.getByPlaceholderText('Enter link text'), { target: { value: 'New Link' } }));
    
    waitFor(() =>fireEvent.change(screen.getByPlaceholderText('Enter link URL'), { target: { value: 'http://newlink.com' } }));

    waitFor(() =>fireEvent.click(screen.getByText('Submit')));

    waitFor(() => {
      expect(screen.getByText('New Link')).toBeInTheDocument();
    });
  });

  // Testing Links call errors
  it('should handle network errors for endorsement link operations', async () => {
    mockAxiosResponse({
      BIO_TEXT: 'Tell Everyone About Yourself!',
      USERNAME: 'testuser',
      FIRSTNAME: 'John',
      LASTNAME: 'Doe',
      EMAIL: 'john.doe@example.com',
      IS_BUSINESS: true,
      USER_ID: 1,
    });

    axios.post = vi.fn().mockRejectedValue(new Error('Network Error'));

    render(<BusinessProfile />);

    waitFor(() => fireEvent.click(screen.getByText('Edit')));

    waitFor(() => fireEvent.change(screen.getByPlaceholderText('Enter link text'), { target: { value: 'New Link' } }));

    waitFor(() => fireEvent.change(screen.getByPlaceholderText('Enter link URL'), { target: { value: 'http://newlink.com' } }));

    waitFor(() => fireEvent.click(screen.getByText('Submit')));

    waitFor(() => expect(screen.findByText('Error adding or updating link')));
  });
});
