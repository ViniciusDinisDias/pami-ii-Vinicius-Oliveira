import React from 'react';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import { WhatsAppScreen } from '../src/screens/WhatsAppScreen';
import { InstagramScreen } from '../src/screens/InstagramScreen';

const { width } = Dimensions.get('window');

export default function Main() {
  return (
    <ScrollView 
      horizontal 
      pagingEnabled 
      showsHorizontalScrollIndicator={false}
      bounces={false}
      style={styles.container}
    >
      <WhatsAppScreen />
      <InstagramScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' }
});