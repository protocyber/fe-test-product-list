import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import ProductCard from './src/components/ProductCard';
import CategoryTabs from './src/components/CategoryTabs';
import { getCategories, getProducts, getProductsByCategory } from './src/services/api';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [categories, setCategories] = useState<string[]>(['All']);

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

    const fetchProducts = async (category = 'All') => {
        setLoading(true);
        try {
            let data;
            if (category === 'All') {
                data = await getProducts();
            }
            else {
                data = await getProductsByCategory(category);
            }
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        fetchProducts(category);
    };

    const renderProduct = ({ item }: { item: Product; }) => (
        <ProductCard product={item} onPress={() => handleProductPress(item)} />
    );

    const handleProductPress = (product: Product) => {
        // Handle navigation to product details page here
        console.log('Product pressed:', product);
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#007BFF" />
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
    },
});

export default App;
