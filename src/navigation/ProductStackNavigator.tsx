import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductDetail from '../screens/ProductDetail';
import ProductList from '../screens/ProductList';
import { Colors } from '../constants';

export type RootStackParamList = {
    ProductList: undefined;
    ProductDetail: { product: Product; };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const SearchIcon = ({ navigation }: { navigation: any; }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleSearchToggle = () => {
        const newSearchVisibleState = !isSearchVisible;
        setIsSearchVisible(newSearchVisibleState);
        navigation.setParams({ showSearch: newSearchVisibleState });
    };

    return (
        <TouchableOpacity onPress={handleSearchToggle}>
            <View style={isSearchVisible ? styles.activeSearchIconWrapper : styles.searchIconWrapper}>
                {
                    isSearchVisible ?
                        <Icon name="filter-alt-off" size={18} color="white" />
                        :
                        <Icon name="filter-alt" size={24} color="black" />
                }
            </View>
        </TouchableOpacity>
    );
};

export default function App() {
    return (
        <Stack.Navigator initialRouteName="ProductList">
            <Stack.Screen
                name="ProductList"
                component={ProductList}
                options={({ navigation }) => ({
                    title: 'Products',
                    headerRight: () => <SearchIcon navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ title: 'Product Detail' }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    searchIconWrapper: {
        padding: 3,
    },
    activeSearchIconWrapper: {
        backgroundColor: Colors.green,
        padding: 5,
        borderRadius: 5,
    },
});
