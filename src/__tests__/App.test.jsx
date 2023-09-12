import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsProvider, settingsContext } from './SettingsProvider'; // Adjust the import path as needed
import List from '../Components/List'; // Import your List component

describe('List Component', () => {
  // Mock the context value with default values
  const contextValue = {
    values: {
      itemsInPage: 3,
      showCompleted: true,
      sort: 'difficulty',
    },
    updateItemsInPage: jest.fn(),
    toggleShowCompleted: jest.fn(),
    currentPage: 1,
    setCurrentPage: jest.fn(),
    list: [],
    setList: jest.fn(),
    incomplete: [],
    setIncomplete: jest.fn(),
  };

  // Wrap your List component with the SettingsProvider for testing
  const renderWithProvider = (component) => {
    return render(
      <settingsContext.Provider value={contextValue}>
        {component}
      </settingsContext.Provider>
    );
  };

  it('renders List component with context values', () => {
    renderWithProvider(<List />);
    // Add your assertions here to check if List renders correctly with context values
    // For example, you can expect certain elements to be in the rendered output.
  });

  it('updates itemsInPage when input value changes', () => {
    renderWithProvider(<List />);
    const itemsInPageInput = screen.getByLabelText('Items In Page:');
    
    fireEvent.change(itemsInPageInput, { target: { value: '5' } });
    
    expect(contextValue.updateItemsInPage).toHaveBeenCalledWith(5);
  });

  it('toggles showCompleted when checkbox is clicked', () => {
    renderWithProvider(<List />);
    const showCompletedCheckbox = screen.getByLabelText('Show Completed:');
    
    fireEvent.click(showCompletedCheckbox);
    
    expect(contextValue.toggleShowCompleted).toHaveBeenCalled();
  });
});
