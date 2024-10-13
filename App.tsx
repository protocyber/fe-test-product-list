import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './src/context/FavoritesContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const App = () => {
    return (
        <FavoritesProvider>
            <NavigationContainer>
                <BottomTabNavigator />
            </NavigationContainer>
        </FavoritesProvider>
    );
};

export default App;
