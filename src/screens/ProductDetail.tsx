import { RouteProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/AntDesign';
import { FavoritesContext } from '../context/FavoritesContext';

type ProductDetailProps = {
    route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const { width } = Dimensions.get('window');

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
    const { product } = route.params;
    const [loadingImages, setLoadingImages] = useState<boolean[]>(new Array(product.images.length).fill(true));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [firstImageLoading, setFirstImageLoading] = useState(true);

    const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);

    const toggleFavorite = () => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    const handleImageLoad = (index: number) => {
        setLoadingImages(prev => {
            const newLoadingImages = [...prev];
            newLoadingImages[index] = false;
            return newLoadingImages;
        });
        if (index === 0) {
            setFirstImageLoading(false);
        }
    };

    const handleNextImage = () => {
        if (currentIndex < product.images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Image slideshow with left and right arrows */}
            <View style={styles.imageContainer}>
                {/* If it's the first image and it's loading, show the thumbnail */}
                {currentIndex === 0 && firstImageLoading && (
                    <>
                        <FastImage
                            style={[styles.slideshowImage, styles.thumbnail]}
                            source={{
                                uri: product.thumbnail,
                                priority: FastImage.priority.low,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                            blurRadius={5} // Blurred thumbnail
                        />
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#555" />
                        </View>
                    </>
                )}
                {currentIndex > 0 && loadingImages[currentIndex] && (
                    <SkeletonPlaceholder borderRadius={8}>
                        <SkeletonPlaceholder.Item
                            width={width - 32}
                            height={300}
                            borderRadius={8}
                        />
                    </SkeletonPlaceholder>
                )}
                <FastImage
                    style={styles.slideshowImage}
                    source={{
                        uri: product.images[currentIndex],
                        priority: FastImage.priority.high,
                    }}
                    onLoadEnd={() => handleImageLoad(currentIndex)}
                    resizeMode={FastImage.resizeMode.contain}
                />

                {currentIndex > 0 && (
                    <TouchableOpacity
                        onPress={handlePrevImage}
                        style={styles.arrowLeft}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="left" size={30} color="#fff" />
                        </View>
                    </TouchableOpacity>
                )}
                {currentIndex < product.images.length - 1 && (
                    <TouchableOpacity
                        onPress={handleNextImage}
                        style={styles.arrowRight}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="right" size={30} color="#fff" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            {/* Product Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.productHeader}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${product.price}</Text>
                        {product.discountPercentage >= 10 && (
                            <>
                                <Text style={styles.normalPrice}>${(product.price * 100 / (100 - product.discountPercentage)).toFixed(2)}</Text>
                                <Text style={styles.discount}>{Math.round(product.discountPercentage)}%</Text>
                            </>
                        )}
                    </View>
                    <View>
                        <TouchableOpacity onPress={toggleFavorite}>
                            <Icon
                                name={isFavorite(product.id) ? 'heart' : 'hearto'}
                                size={20}
                                color={isFavorite(product.id) ? 'red' : 'gray'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.category}>{product.category}</Text>

                <View style={styles.stockContainer}>
                    <Text style={styles.stock}>Stock: {product.stock}</Text>
                    <Text style={styles.rating}><Icon name="star" style={styles.ratingIcon} /> {product.rating}</Text>
                </View>

                <Text style={styles.description}>{product.description}</Text>

                <View style={styles.table}>
                    {product.brand && (
                        <View style={styles.row}>
                            <Text style={styles.label}>Brand:</Text>
                            <Text style={styles.value}>{product.brand}</Text>
                        </View>
                    )}
                    <View style={styles.row}>
                        <Text style={styles.label}>SKU:</Text>
                        <Text style={styles.value}>{product.sku}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Weight:</Text>
                        <Text style={styles.value}>{product.weight} kg</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Dimensions:</Text>
                        <Text style={styles.value}>
                            {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Warranty:</Text>
                        <Text style={styles.value}>{product.warrantyInformation}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Shipping:</Text>
                        <Text style={styles.value}>{product.shippingInformation}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Availability:</Text>
                        <Text style={styles.value}>{product.availabilityStatus}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Return Policy:</Text>
                        <Text style={styles.value}>{product.returnPolicy}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Minimum Order Quantity:</Text>
                        <Text style={styles.value}>{product.minimumOrderQuantity}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    imageContainer: {
        position: 'relative',
        width: width - 32,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden', // Prevent overflow issues
    },
    productHeader: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    slideshowImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    thumbnail: {
        opacity: 0.6,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent overlay to contrast the ActivityIndicator
    },
    arrowLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '25%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 1,
    },
    arrowRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '25%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 1,
    },
    iconContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 5,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    detailsContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        paddingTop: 30,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 2,
        position: 'relative', // For positioning discount
    },
    discountContainer: {
        position: 'absolute',
        top: 10,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    category: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#888',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginRight: 10,
    },
    normalPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888',
        marginRight: 10,
        textDecorationLine: 'line-through',
    },
    discount: {
        fontSize: 14,
        color: 'white',
        backgroundColor: 'red',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
    },
    stockContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    stock: {
        fontSize: 16,
        color: '#555',
    },
    rating: {
        fontSize: 16,
        color: '#555',
        verticalAlign: 'middle',
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: '#666',
        marginBottom: 20,
    },
    brand: {
        fontSize: 16,
        color: '#555',
    },
    sku: {
        fontSize: 16,
        color: '#555',
    },
    weight: {
        fontSize: 16,
        color: '#555',
    },
    dimensions: {
        fontSize: 16,
        color: '#555',
    },
    warranty: {
        fontSize: 16,
        color: '#555',
    },
    shipping: {
        fontSize: 16,
        color: '#555',
    },
    availability: {
        fontSize: 16,
        color: '#555',
    },
    returnPolicy: {
        fontSize: 16,
        color: '#555',
    },
    minOrder: {
        fontSize: 16,
        color: '#555',
    },
    tags: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    meta: {
        fontSize: 14,
        color: '#aaa',
    },
    table: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        flex: 2,
        color: '#555',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    ratingIcon: {
        fontSize: 18,
        color: '#ffaf3a',
    },
});

export default ProductDetail;
