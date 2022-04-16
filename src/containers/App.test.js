import { render, screen, fireEvent, getByText } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom'

// import pages 
import SiteFlowProductList from "./pages/SiteFlowProductList";
import SiteFlowSKUList from "./pages/SiteFlowSKUList";
import SiteFlowTemplateList from "./pages/SiteFlowTemplateList";
import LocalTemplateList from './pages/LocalTemplateList';

describe('testing SiteFlowProductList page', () => {
  
  test("SiteFlowProductList page renders correctly", () => {
    const {queryByPlaceholderText, getByText} = render(<SiteFlowProductList/>);
    // page renders correctly
    expect(getByText('Site Flow Products')).toBeTruthy();
    // test dropdown component
    expect(queryByPlaceholderText('FactoryId')).toBeTruthy();
  });
  
})

describe('testing SiteFlowSKUList page', () => {
  
  test("SiteFlowSKUList page renders correctly", () => {
    const {queryByPlaceholderText, getByText} = render(<SiteFlowSKUList/>, {wrapper: MemoryRouter});
    // page renders correctly
    expect(getByText('Site Flow SKUs')).toBeTruthy();
    // test dropdown component
    expect(queryByPlaceholderText('FactoryId')).toBeTruthy();
  });

})

describe('testing SiteFlowTemplateList page', () => {
  
  test("SiteFlowTemplateList page renders correctly", () => {
    const {queryByPlaceholderText, getByText} = render(<SiteFlowTemplateList/>);
    // page renders correctly
    expect(getByText('Site Flow Templates')).toBeTruthy();
    // test dropdown component
    expect(queryByPlaceholderText('FactoryId')).toBeTruthy();
  });

})

describe('testing LocalTemplateList page', () => {
  
  test("LocalTemplateList page renders correctly", () => {
    const {getByText} = render(<LocalTemplateList/>, {wrapper: MemoryRouter});
    // page renders correctly
    expect(getByText('Local Templates')).toBeTruthy();
  });
  
})

