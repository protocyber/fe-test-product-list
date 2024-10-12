import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';

export type RootStackParamList = {
    ProductList: undefined; // No params for the ProductList
    ProductDetail: { product: Product; }; // Expecting a product object
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ProductList">
                <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Product Detail' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
