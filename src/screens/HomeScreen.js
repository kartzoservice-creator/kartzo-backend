import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  // ... existing code ...
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cached = await AsyncStorage.getItem('products');
      if (cached && !cancelled) {
        setProducts(JSON.parse(cached));
        setLoading(false); // तुरंत cached दिखाएँ
      }
      try {
        const res = await fetch('https://kartzo-backend.onrender.com/api/products', { timeout: 15000 });
        const json = await res.json();
        if (!cancelled) {
          setProducts(json);
          AsyncStorage.setItem('products', JSON.stringify(json));
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        {/* Skeleton placeholders */}
        <View style={{ height: 80, backgroundColor: '#eee', marginBottom: 12, borderRadius: 8 }} />
        <View style={{ height: 80, backgroundColor: '#eee', marginBottom: 12, borderRadius: 8 }} />
        <ActivityIndicator style={{ marginTop: 8 }} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item, idx) => (item._id ?? idx.toString())}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text>{item.name}</Text>
          <Text>₹{item.price}</Text>
          <Text>{item.description}</Text>
        </View>
      )}
    />
  );
}