import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { getProducts } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ProductListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<ProductListScreenNavigationProp>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderProduct = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item.id })}>
            <Image source={{ uri: item.thumbnail }} style={{ width: 100, height: 100 }} />
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item: Product) => item.id.toString()}
            />
        </View>
    );
};

export default ProductList;
