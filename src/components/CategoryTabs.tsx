import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface CategoryTabsProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.tabItem,
                            selectedCategory === category ? styles.selectedTab : null,
                        ]}
                        onPress={() => onSelectCategory(category)}
                    >
                        <Text style={[styles.tabText, selectedCategory === category ? styles.selectedText : null]}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    tabItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        justifyContent: 'center',
    },
    selectedTab: {
        borderBottomColor: '#4f9d4d',
    },
    tabText: {
        fontSize: 16,
        color: '#333',
    },
    selectedText: {
        color: '#4f9d4d',
        fontWeight: 'bold',
    },
});

export default CategoryTabs;
