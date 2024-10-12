import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { getCategories, getProducts, getProductsByCategory } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>(['All']);
    const [skip, setSkip] = useState<number>(0);
    const [limit] = useState<number>(30);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        fetchCategories(); // Fetch categories on mount
        fetchProducts();   // Fetch all products initially
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(['All', ...data]); // Add 'All' as the default category
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoadingCategories(false);
        }
    };

    const fetchProducts = async (category = 'All', skipParam = 0, isLoadMore = false) => {
        if (!isLoadMore) {
            setLoadingProducts(true);
        } else {
            setLoadingMore(true);
        }

        try {
            let data;
            if (category === 'All') {
                data = await getProducts({ limit, skip: skipParam });
            } else {
                data = await getProductsByCategory(category, { limit, skip: skipParam });
            }

            setProducts((prevProducts) =>
                isLoadMore ? [...prevProducts, ...data.products] : data.products
            );
            setTotal(data.total);
            setSkip(skipParam + limit); // Increase the skip value for the next request
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoadingProducts(false);
            setLoadingMore(false);
        }
    };

    const handleCategoryChange = useCallback((category: string) => {
        if (category !== selectedCategory) { // Prevent unnecessary fetch
            setSelectedCategory(category);
            setSkip(0); // Reset skip when category changes
            fetchProducts(category); // Fetch products for the selected category
        }
    }, [selectedCategory]); // Include selectedCategory to avoid stale closure

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
            {!loadingCategories && (
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange} // Use the updated handler
                />
            )}
            {loadingProducts || loadingCategories ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={handleLoadMore}  // Trigger fetching more items when list end is reached
                    onEndReachedThreshold={0.5}    // Trigger when the user scrolls 50% near the bottom
                    ListFooterComponent={loadingMore && (
                        <View style={styles.loadingMore}>
                            <ActivityIndicator size="small" />
                        </View>
                    )}
                />
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
    },
    loadingMore: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductList;
