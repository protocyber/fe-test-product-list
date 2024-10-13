import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Favorites from '../screens/Favorites';

const Stack = createNativeStackNavigator();

const FavoritesStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Favorites"
                component={Favorites}
                options={{ title: 'Favorites' }}
            />
        </Stack.Navigator>
    );
};

export default FavoritesStackNavigator;
