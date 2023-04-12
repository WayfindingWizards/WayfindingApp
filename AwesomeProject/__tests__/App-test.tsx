/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import testingLibraryJestNative from '@testing-library/jest-native';
import { render, fireEvent, cleanup } from '@testing-library/react-native';

afterEach(() => {
  cleanup();
});

function enterDestinationAndRoute(text: string) {
  const { getByTestId } = render(<App />);
  expect(getByTestId('goButton')).toBeDisabled;
  expect(getByTestId('destinationInput')).toBeFalsy;
  fireEvent.changeText(getByTestId('destinationInput'), text);
  expect(getByTestId('goButton')).toBeEnabled;
  fireEvent.press(getByTestId('goButton'));
}

function enterDestinationAndRouteWithInvalidDestination() {
  const { getByTestId } = render(<App />);
  enterDestinationAndRoute('XXX');
  expect(getByTestId('invalidDestinationPopup')).toBeVisible;
  fireEvent.press(getByTestId('okButton'));
  expect(getByTestId('homePage')).toBeVisible;
}

function reenterDestinationAndRoute(text: string) {
  const { getByTestId } = render(<App />);
  expect(getByTestId('goButton')).toBeEnabled;
  expect(getByTestId('destinationInput')).toBeTruthy;
  fireEvent.changeText(getByTestId('destinationInput'), text);
  fireEvent.press(getByTestId('goButton'));
  mapScreenVisible();
}

function mapScreenVisible() {
  const { getByTestId } = render(<App />);
  expect(getByTestId('mapVisiblePage')).toBeVisible;
  expect(getByTestId('destinationInput')).toBeDisabled;
  expect(getByTestId('startOverButton')).toBeVisible;
  fireEvent.press(getByTestId('startOverButton'));
}

describe('app is rendering', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy;
  });
});


describe('background is visible', () => {
  it('should be visible', () => {
    const { getByTestId } = render(<App />);
    const component = getByTestId('backgroundImage');
    expect(component).toBeVisible;
  });
});

describe('valid destination test', () => {
  it('should route', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('homePage')).toBeVisible;
    enterDestinationAndRoute('TN141');
    mapScreenVisible();
  });
});

describe('invalid destination test', () => {
  it('invalid destination popup should appear', () => {
    const {getByTestId} = render(<App />);
    expect(render(<App />)).toBeTruthy;
    expect(getByTestId('stomperImage')).toBeVisible;
  });
});

