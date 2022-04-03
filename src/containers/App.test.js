import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import FactorySelectDropdown from './components/FactorySelectDropdown'; 

describe('test basic rendering of site components', () => {

  test('renders whole app', () => {
    render(<App />);
    screen.debug();
  });
  
  test("factory select dropdown renders correctly", () => {
    const {queryByPlaceholderText} = render(<FactorySelectDropdown />);
    expect(queryByPlaceholderText('FactoryId')).toBeTruthy();
  });

})



