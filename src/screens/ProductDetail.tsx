import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ActivityIndicator, Button, Image, Text, View } from 'react-native';

// Define the parameters for the stack
type RootStackParamList = {
    ProductDetail: { product: Product; };
};

// Define the props for the ProductDetail component
type ProductDetailProps = {
    route: RouteProp<RootStackParamList, 'ProductDetail'>;
    navigation: StackNavigationProp<RootStackParamList, 'ProductDetail'>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ route, navigation }) => {
    const { product } = route.params;
    const [loading, _setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const data = await getProductById(id);
    //         setProduct(data);
    //         setLoading(false);
    //     };
    //     fetchProduct();
    // }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            <Image source={{ uri: product.thumbnail }} style={{ width: 200, height: 200 }} />
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text>${product.price}</Text>
            <Button title="Back to Products" onPress={() => navigation.goBack()} />
        </View>
    );
};

export default ProductDetail;
