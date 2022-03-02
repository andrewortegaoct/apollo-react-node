import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';

describe('<App/> Component', () => {
  const mocks: any[] = [];
  it('render attributes', () => {
      const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>,
      );
      const testInstance = component.root;
      expect( testInstance.findByType('select') ).not.toBe(null);
      expect( testInstance.findByType('select').children.length ).toBe(4);
    }
  );
})
