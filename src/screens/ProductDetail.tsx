import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type RootStackParamList = {
    ProductDetail: { product: Product; };
};

type ProductDetailProps = {
    route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const { width } = Dimensions.get('window');

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
    const { product } = route.params;
    const [loadingImages, setLoadingImages] = useState<boolean[]>(new Array(product.images.length).fill(true));
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageLoad = (index: number) => {
        setLoadingImages(prev => {
            const newLoadingImages = [...prev];
            newLoadingImages[index] = false;
            return newLoadingImages;
        });
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
                {loadingImages[currentIndex] && (
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
                />

                {currentIndex > 0 && (
                    <TouchableOpacity
                        onPress={handlePrevImage}
                        style={styles.arrowLeft}
                    >
                        <Text style={styles.arrowText}>{'<'}</Text>
                    </TouchableOpacity>
                )}
                {currentIndex < product.images.length - 1 && (
                    <TouchableOpacity
                        onPress={handleNextImage}
                        style={styles.arrowRight}
                    >
                        <Text style={styles.arrowText}>{'>'}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Product Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.category}>{product.category}</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${product.price}</Text>
                    <Text style={styles.discount}>-{product.discountPercentage}%</Text>
                </View>

                <View style={styles.stockContainer}>
                    <Text style={styles.stock}>Stock: {product.stock}</Text>
                    <Text style={styles.rating}>Rating: {product.rating} ⭐</Text>
                </View>

                <Text style={styles.description}>{product.description}</Text>
                {product.brand && <Text style={styles.brand}>Brand: {product.brand}</Text>}
                <Text style={styles.sku}>SKU: {product.sku}</Text>
                <Text style={styles.weight}>Weight: {product.weight} kg</Text>
                <Text style={styles.dimensions}>
                    Dimensions: {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                </Text>
                <Text style={styles.warranty}>Warranty: {product.warrantyInformation}</Text>
                <Text style={styles.shipping}>Shipping: {product.shippingInformation}</Text>
                <Text style={styles.availability}>Availability: {product.availabilityStatus}</Text>
                <Text style={styles.returnPolicy}>Return Policy: {product.returnPolicy}</Text>
                <Text style={styles.minOrder}>Minimum Order Quantity: {product.minimumOrderQuantity}</Text>
                <Text style={styles.tags}>{"\n"}Tags: {product.tags.join(', ')}</Text>
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
        overflow: 'hidden', // To prevent overflow issues
    },
    slideshowImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    arrowLeft: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -20 }],
        zIndex: 1,
    },
    arrowRight: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -20 }],
        zIndex: 1,
    },
    arrowText: {
        fontSize: 24,
        color: '#333',
    },
    detailsContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 2,
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
        color: '#E53935',
        marginRight: 10,
    },
    discount: {
        fontSize: 18,
        color: '#43A047',
        backgroundColor: '#E8F5E9',
        paddingVertical: 4,
        paddingHorizontal: 8,
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
});

export default ProductDetail;
