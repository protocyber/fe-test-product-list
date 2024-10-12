import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image style={styles.image} source={{ uri: product.thumbnail }} />
            <View style={styles.info}>
                <Text style={styles.title}>{product.id}</Text>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 7,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        fontSize: 12,
        color: '#777',
        marginVertical: 4,
    },
    price: {
        fontSize: 14,
        color: '#000',
        marginTop: 8,
    },
});

export default ProductCard;
