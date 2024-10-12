import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { getCategories, getProducts, getProductsByCategory } from '../services/api';
import { useNavigation } from '@react-navigation/native';


const ProductList = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>(['All']);
    const [skip, setSkip] = useState<number>(0);
    const [limit] = useState<number>(30); // Keeping it static as per the API limit
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        fetchCategories(); // Fetch categories on mount
        fetchProducts(); // Fetch all products initially
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(['All', ...data]); // Add 'All' as the default category
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async (category = 'All', skipParam = 0, isLoadMore = false) => {
        if (!isLoadMore) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            let data;
            if (category === 'All') {
                data = await getProducts({ limit, skip: skipParam });
            }
            else {
                data = await getProductsByCategory(category, { limit, skip: skipParam });
            }

            // If we're loading more, append to the list; otherwise replace it
            setProducts((prevProducts) =>
                isLoadMore ? [...prevProducts, ...data.products] : data.products
            );
            setTotal(data.total);
            setSkip(skipParam + limit); // Increase the skip value for the next request
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSkip(0); // Reset skip when category changes
        fetchProducts(category);
    };

    const renderProduct = ({ item }: { item: Product; }) => (
        <ProductCard product={item} onPress={() => handleProductPress(item)} />
    );

    const handleProductPress = (product: Product) => {
        // Handle navigation to product details page here
        navigation.navigate('ProductDetail', { product });
    };

    const handleLoadMore = () => {
        if (products.length < total && !loadingMore) {
            fetchProducts(selectedCategory, skip, true); // Fetch more products
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <>
                    <CategoryTabs
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryChange}
                    />
                    <FlatList
                        data={products}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={handleLoadMore}  // Trigger fetching more items when list end is reached
                        onEndReachedThreshold={0.5}    // Trigger when the user scrolls 50% near the bottom
                        ListFooterComponent={
                            loadingMore && (
                                <View style={styles.loadingMore}>
                                    <ActivityIndicator size="small" />
                                </View>
                            )
                        }
                    />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#42b549',
    },
    loadingMore: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#42b549',
    },
});

export default ProductList;
