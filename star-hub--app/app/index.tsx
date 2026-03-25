import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { InstagramScreen } from '../components/InstagramScreen';
import { WhatsAppScreen } from '../components/WhatsAppScreen';


export default function MainScreen() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {/* WhatsApp */}
        <View style={{ width, flex: 1 }}>
          <WhatsAppScreen />
        </View>

        {/* Instagram */}
        <View style={{ width, flex: 1 }}>
          <InstagramScreen />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});