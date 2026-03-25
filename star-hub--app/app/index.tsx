import React from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { WhatsAppScreen } from '../components/WhatsAppScreen';
import { InstagramScreen } from '../components/InstagramScreen';

export default function MainScreen() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
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