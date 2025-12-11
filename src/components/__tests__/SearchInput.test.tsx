import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    onClear: vi.fn(),
    totalResults: 100,
    filteredResults: 100
  };

  it('should render search input with placeholder', () => {
    render(<SearchInput {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Search by song name or album name...');
    expect(input).toBeInTheDocument();
  });

  it('should display current search term', () => {
    render(<SearchInput {...defaultProps} searchTerm="Taylor Swift" />);
    
    const input = screen.getByDisplayValue('Taylor Swift');
    expect(input).toBeInTheDocument();
  });

  it('should call onSearchChange when input value changes', () => {
    const onSearchChange = vi.fn();
    
    render(<SearchInput {...defaultProps} onSearchChange={onSearchChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test search' } });
    
    expect(onSearchChange).toHaveBeenCalledWith('test search');
    expect(onSearchChange).toHaveBeenCalledTimes(1);
  });

  it('should show clear button when there is search term', () => {
    render(<SearchInput {...defaultProps} searchTerm="test" />);
    
    const clearButton = screen.getByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when search term is empty', () => {
    render(<SearchInput {...defaultProps} searchTerm="" />);
    
    const clearButton = screen.queryByLabelText('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should call onClear when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    
    render(<SearchInput {...defaultProps} searchTerm="test" onClear={onClear} />);
    
    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);
    
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('should display total results when no search term', () => {
    render(<SearchInput {...defaultProps} totalResults={50} />);
    
    expect(screen.getByText('Total: 50 songs')).toBeInTheDocument();
  });

  it('should display filtered results when searching', () => {
    render(<SearchInput {...defaultProps} searchTerm="test" totalResults={100} filteredResults={25} />);
    
    expect(screen.getByText('Showing 25 of 100 songs')).toBeInTheDocument();
  });

  it('should display no results message when filtered results is 0', () => {
    render(<SearchInput {...defaultProps} searchTerm="test" totalResults={100} filteredResults={0} />);
    
    expect(screen.getByText(/Try a different search term/)).toBeInTheDocument();
  });
});
