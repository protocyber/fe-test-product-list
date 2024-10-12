import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View, TextInput, Text } from 'react-native';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { getCategories, getProducts, getProductsByCategory, searchProducts } from '../services/api'; // Ensure you have searchProducts function
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
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

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
        setSelectedCategory(category);
        setSkip(0); // Reset skip when category changes
        fetchProducts(category);
    }, []);

    const handleSearch = async () => {
        if (searchQuery) {
            setLoadingProducts(true);
            setSkip(0);
            try {
                const data = await searchProducts({ query: searchQuery, limit, skip }); // Make sure this function is defined
                setProducts(data.products);
                setTotal(data.total);
                // setSkip(skip + limit); // Update skip for future requests
            } catch (error) {
                console.error('Error searching products:', error);
            } finally {
                setLoadingProducts(false);
            }
        } else {
            fetchProducts(selectedCategory); // Fetch products again if search is cleared
        }
    };

    const renderProduct = ({ item }: { item: Product; }) => (
        <ProductCard product={item} onPress={() => handleProductPress(item)} />
    );

    const handleProductPress = (product: Product) => {
        navigation.navigate('ProductDetail', { product });
    };

    const handleLoadMore = () => {
        if (products.length < total && !loadingMore) {
            fetchProducts(selectedCategory, skip, true); // Fetch more products
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Bar at the top */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch} // Trigger search on submit
                />
            </View>
            {/* Category Tabs */}
            {!loadingCategories && !searchQuery && (
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}
                />
            )}
            {/* Loading Indicator */}
            {loadingProducts || loadingCategories ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    {products.length > 0 ? (
                        <FlatList
                            data={products}
                            renderItem={renderProduct}
                            keyExtractor={(item) => item.id.toString()}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={
                                loadingMore && (
                                    <View style={styles.loadingMore}>
                                        <ActivityIndicator size="small" />
                                    </View>
                                )
                            }
                        />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                Cannot find product with keyword: {searchQuery}
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    },
});

export default ProductList;
