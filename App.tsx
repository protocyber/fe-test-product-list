import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ProductDetail from './src/screens/ProductDetail';
import ProductList from './src/screens/ProductList';

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
                        <Icon name="search1" size={18} color="white" />
                        :
                        <Icon name="search1" size={24} color="black" />
                }
            </View>
        </TouchableOpacity>
    );
};

export default function App() {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    searchIconWrapper: {
        padding: 3,
    },
    activeSearchIconWrapper: {
        backgroundColor: '#555',
        padding: 5,
        borderRadius: 5,
    },
});

export const imagePlaceholder = 'data:image/png;base64,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';
