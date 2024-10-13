import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { getCategories, getProducts, getProductsByCategory, searchProducts } from '../services/api';

const ProductList = () => {
    const route = useRoute();
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
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [latestSearchQuery, setLatestSearchQuery] = useState<string>('');
    const [showSearch, setShowSearch] = useState<boolean>(false);

    // Ref for the TextInput
    const searchInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (route.params?.showSearch !== undefined) {
            setShowSearch(route.params.showSearch);
        }
    }, [route.params?.showSearch]);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (!showSearch) {
            setSearchQuery('');
            setLatestSearchQuery('');
            handleCategoryChange('All');
        }
        // Focus the search input when showSearch is true
        if (showSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showSearch]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(['All', ...data]);
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
            setSkip(skipParam + limit);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoadingProducts(false);
            setLoadingMore(false);
        }
    };

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
        setSkip(0);
        fetchProducts(category);
    }, []);

    const handleSearch = async () => {
        if (searchQuery) {
            setLoadingProducts(true);
            setSkip(0);
            try {
                const data = await searchProducts({ query: searchQuery, limit, skip: 0 });
                setProducts(data.products);
                setTotal(data.total);
                setLatestSearchQuery(searchQuery);
            } catch (error) {
                console.error('Error searching products:', error);
            } finally {
                setLoadingProducts(false);
            }
        } else {
            fetchProducts(selectedCategory);
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
            fetchProducts(selectedCategory, skip, true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Conditional rendering of Search Input */}
            {showSearch && (
                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            ref={searchInputRef}
                            style={styles.searchInput}
                            placeholder="Search products..."
                            placeholderTextColor="#aaa"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                        />
                        {
                            searchQuery != '' &&
                            <TouchableOpacity onPress={() => { setSearchQuery(''); (searchInputRef.current && searchInputRef.current.focus()); }}>
                                <Icon name="close" size={24} color="black" style={styles.closeIcon} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            )}

            {!loadingCategories && !showSearch && (
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}
                />
            )}
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
                            {
                                latestSearchQuery != '' &&
                                <Text style={styles.emptyText}>
                                    Cannot find product with keyword: {latestSearchQuery}
                                </Text>
                            }
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
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
    searchWrapper: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        color: '#333',
        height: 40,
        fontSize: 16,
    },
    closeIcon: {
        marginLeft: 10,
        backgroundColor: 'white',
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
        color: '#555',
    },
});

export default ProductList;
