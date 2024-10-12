import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/AntDesign';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    // Format the price with thousand separators
    const formattedPrice = new Intl.NumberFormat().format(product.price);

    const [loadingImage, setLoadingImage] = useState<boolean>(true);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                {loadingImage && (
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item
                            width={100}
                            height={100}
                        />
                    </SkeletonPlaceholder>
                )}
                <FastImage
                    style={styles.image}
                    source={{
                        uri: product.thumbnail,
                        priority: FastImage.priority.high,
                    }}
                    onLoadEnd={() => setLoadingImage(false)}
                />
            </View>
            {/* Red Discount Rectangle */}
            {product.discountPercentage > 10 && (
                <View style={styles.discountContainer}>
                    <Text style={styles.discountText}>
                        {`${Math.round(product.discountPercentage)}% OFF`}
                    </Text>
                </View>
            )}
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
        position: 'relative', // For positioning discount
    },
    imageContainer: {
        position: 'relative', // For absolute positioning of discount
        overflow: 'hidden', // To prevent overflow issues
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    discountContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        backgroundColor: '#FF0000',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        elevation: 3, // Elevation effect
    },
    discountText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
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
