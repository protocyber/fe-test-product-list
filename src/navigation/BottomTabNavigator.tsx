import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FavoritesStackNavigator from './FavoriteStackNavigator';
import ProductStackNavigator from './ProductStackNavigator';
import { Colors } from '../constants';

type TabParamList = {
    ProductsTab: undefined;
    FavoritesTab: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="ProductsTab"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName = '';

                    if (route.name === 'ProductsTab') {
                        iconName = 'grid';
                    } else if (route.name === 'FavoritesTab') {
                        iconName = 'heart';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.green,
                tabBarInactiveTintColor: '#999',
            })}
        >
            <Tab.Screen
                name="ProductsTab"
                component={ProductStackNavigator}
                options={{ tabBarLabel: 'Products' }}
            />
            <Tab.Screen
                name="FavoritesTab"
                component={FavoritesStackNavigator}
                options={{ tabBarLabel: 'Favorites' }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
