import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { FavoritesContext } from '../context/FavoritesContext';
import { RootStackParamList } from '../navigation/StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const Favorites: React.FC = () => {
    const { favorites, removeFromFavorites } = useContext(FavoritesContext);
    const navigation = useNavigation<NavigationProp>();

    const renderItem = ({ item }: { item: Product; }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            {item.thumbnail && (
                <FastImage source={{ uri: item.thumbnail }} style={styles.image} />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity
                onPress={() => removeFromFavorites(item.id)}
                style={styles.removeButton}
            >
                <Icon name="trash" size={24} color="gray" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorite products yet.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default Favorites;

const styles = StyleSheet.create({
    listContainer: {
        padding: 14,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2, // for Android
        shadowColor: '#000', // for iOS
        shadowOffset: { width: 0, height: 1 }, // for iOS
        shadowOpacity: 0.3, // for iOS
        shadowRadius: 1, // for iOS
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeButton: {
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    },
});
