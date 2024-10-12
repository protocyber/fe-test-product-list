import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    // Format the price with thousand separators
    const formattedPrice = new Intl.NumberFormat().format(product.price);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* Render discount triangle if discountPercentage is greater than 10 */}
            {
            // product.discountPercentage > 10 && (
                // <View style={styles.discountTriangleContainer}>
                //     <View style={styles.discountTriangle} />
                //     <View style={styles.roundedCorner} />
                //     <Text style={styles.discountText}>{`${Math.round(product.discountPercentage)}%`}</Text>
                // </View>
            // )
            }
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: product.thumbnail }} />
            </View>
            <View style={styles.info}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <View style={styles.priceRatingContainer}>
                    <Text style={styles.price}>${formattedPrice}</Text>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" color="#FFD700" size={16} />
                        <Text style={styles.rating}>{product.rating}</Text>
                    </View>
                </View>
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
        position: 'relative', // For positioning discount triangle
    },
    imageContainer: {
        position: 'relative', // For absolute positioning of discount triangle and text
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    discountTriangleContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 1,
    },
    discountTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 15, // Adjust this to change the triangle width
        borderBottomWidth: 15, // Adjust this to change the triangle height
        borderLeftColor: '#34495e', // Color of the triangle
        borderBottomColor: 'transparent',
    },
    roundedCorner: {
        position: 'absolute',
        top: 0,
        left: 15, // Align with the right edge of the triangle
        width: 5, // Width of the rounded corner
        height: 5, // Height of the rounded corner
        backgroundColor: '#34495e', // Same color as the triangle
        borderRadius: 2.5, // Half of the width/height for a rounded effect
    },
    discountText: {
        position: 'absolute',
        top: 2,
        left: 2,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    info: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        fontSize: 12,
        color: '#777',
        marginVertical: 4,
    },
    priceRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 14,
        color: '#000',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#000',
        marginLeft: 4, // Space between the star icon and the rating number
    },
});

export default ProductCard;
