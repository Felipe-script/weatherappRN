import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {Home} from './src/views';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const App: React.FC = () => {
  return <Home />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default App;
