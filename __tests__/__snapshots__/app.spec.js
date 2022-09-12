import * as React from 'react';
import App from '../../App';
import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   const tree = renderer.create(<App />);
//   expect(tree).toMatchSnapshot();
// });

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree.children.length).toBe(1);
});
