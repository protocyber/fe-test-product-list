import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorites from '../screens/Favorites';
import StackNavigator from './StackNavigator';
import { Colors } from '../constants';

type TabParamList = {
    ProductsTab: undefined;
    Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="ProductsTab"
            screenOptions={({ route }) => ({
                headerShown: false, // Hide headers in bottom tabs
                tabBarIcon: ({ color, size }) => {
                    let iconName = '';

                    if (route.name === 'ProductsTab') {
                        iconName = 'grid';
                    } else if (route.name === 'Favorites') {
                        iconName = 'heart';
                    }

                    return <Icon name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: Colors.green,
                tabBarInactiveTintColor: '#999',
            })}
        >
            <Tab.Screen
                name="ProductsTab"
                component={StackNavigator}
                options={{ tabBarLabel: 'Products' }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{ tabBarLabel: 'Favorites' }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
