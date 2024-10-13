import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePlaceholder from 'react-native-image-placeholder';
import Icon from 'react-native-vector-icons/AntDesign';
import { FavoritesContext } from '../context/FavoritesContext';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    const formattedPrice = new Intl.NumberFormat().format(product.price);
    const [loadingImage, setLoadingImage] = useState<boolean>(true);

    const { isFavorite } = useContext(FavoritesContext);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={[styles.imageContainer, loadingImage && styles.imageContainerLoading]}>
                {loadingImage && (
                    <ImagePlaceholder
                        style={styles.imagePlaceholder}
                        placeholderStyle={styles.placeholderStyle}
                        source={{
                            uri: product.thumbnail,
                        }}
                    />
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
            {product.discountPercentage >= 10 && (
                <View style={styles.discountContainer}>
                    <Text style={styles.discountText}>
                        {`${Math.round(product.discountPercentage)}% OFF`}
                    </Text>
                </View>
            )}
            <View style={styles.info}>
                <View style={styles.flexTitle}>
                    <Text style={styles.title}>{product.title}</Text>
                    {
                        isFavorite(product.id) && <Icon
                            name="heart"
                            size={14}
                            color="red"
                        />
                    }
                </View>
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
        position: 'relative',
    },
    imageContainer: {
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Set a fixed height for the image container during loading
    imageContainerLoading: {
        height: 100, // Matches the size of the image placeholder
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    imagePlaceholder: {
        position: 'absolute',
        height: 100,
        width: 100,
        top: -2,
    },
    placeholderStyle: {
        backgroundColor: '#f0f0f0',
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
        elevation: 3,
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
    flexTitle: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        marginLeft: 4,
    },
});

export default ProductCard;
