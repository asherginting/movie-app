import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { FavoritesProvider } from './src/context/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <PaperProvider>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </PaperProvider>
  );
};

export default App;
