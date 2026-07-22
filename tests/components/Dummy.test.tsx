import React from 'react';
import { View, Text } from 'react-native';
import { render } from '@testing-library/react-native';

const DummyComponent = () => (
  <View>
    <Text>Dummy Test</Text>
  </View>
);

describe('DummyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DummyComponent />);
    expect(getByText('Dummy Test')).toBeTruthy();
  });
});
