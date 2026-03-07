import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export const InstagramScreen = () => {
  const [flow, setFlow] = useState('home');

  const stories = [
    { id: 1, name: 'Seu story', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1gInfFk_8jNrCa44YITdQvf7uRWxh2PPAqg&s' },
    { id: 2, name: 'cristiano', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYBa3FIV64J21BBnDNvcjDh1CUNdqGXChsg&s' },
    { id: 3, name: 'leomessi', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HkKoiNrH0xCuKPNBVdcO595WFVKzLsHQnw&s' },
    { id: 4, name: 'neymarjr', img: 'https://s.rfi.fr/media/display/8bfde6de-10c3-11ea-97f9-005056bf7c53/w:1024/p:16x9/2019-07-05t161338z_1568878747_rc1815237950_rtrmadp_3_soccer-spain-fcb-neymar_0.jpg' },
  ];

  const goBack = () => setFlow('home');

  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" />
      
      {flow === 'home' && (
        <View style={{ flex: 1 }}>
          <View style={styles.igHeader}>
            <Text style={styles.igLogo}>Instagram</Text>
            <View style={{ flexDirection: 'row', gap: 22 }}>
              <TouchableOpacity onPress={() => setFlow('notif')}>
                <Ionicons name="heart-outline" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFlow('direct')}>
                <Ionicons name="chatbubble-ellipses-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* STORIES */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyBar}>
              {stories.map(s => (
                <View key={s.id} style={styles.storyBox}>
                  <View style={[styles.storyCircle, s.id !== 1 && styles.activeStory]}>
                    <Image source={{ uri: s.img }} style={styles.storyImg} />
                  </View>
                  <Text style={styles.storyName} numberOfLines={1}>{s.name}</Text>
                </View>
              ))}
            </ScrollView>

            {/* POST FEED */}
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: stories[1].img }} style={styles.miniAvatar} />
                <Text style={styles.userName}>cristiano</Text>
              </View>
              <Image 
                source={{ uri: 'https://diariodepernambuco.com.br/dpmais/wp-content/uploads/2026/02/Cristiano-Ronaldo-CR7.webp' }} 
                style={styles.postImage} 
              />
              <View style={styles.postActions}>
                <View style={{ flexDirection: 'row', gap: 18 }}>
                  <Ionicons name="heart-outline" size={26} color="white" />
                  <Ionicons name="chatbubble-outline" size={26} color="white" />
                  <Ionicons name="paper-plane-outline" size={26} color="white" />
                </View>
                <Ionicons name="bookmark-outline" size={26} color="white" />
              </View>

              {/* LEGENDA E CURTIDAS*/}
              <View style={styles.captionArea}>
                <Text style={styles.boldText}>10.254.321 curtidas</Text>
                <Text style={styles.captionText}>
                  <Text style={styles.boldText}>cristiano</Text> Mais uma do Robozão SIUUU 🤖
                </Text>
                <Text style={styles.postTime}>HÁ 2 HORAS</Text>
              </View>
            </View>
          </ScrollView>

          {/* FOOTER FIXO NA HOME */}
          <View style={styles.footer}>
            <Ionicons name="home" size={28} color="white" />
            <Ionicons name="search" size={28} color="white" />
            <Ionicons name="add-circle-outline" size={28} color="white" />
            <Ionicons name="play-circle-outline" size={28} color="white" />
            <Image source={{ uri: stories[0].img }} style={styles.footerUser} />
          </View>
        </View>  
      )}

      {/* --- MODAL DE NOTIFICAÇÕES --- */}
      {flow === 'notif' && (
        <View style={styles.overlay}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={goBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notificações</Text>
          </View>
          <ScrollView>
            <View style={styles.notifRow}>
              <Image source={{ uri: stories[2].img }} style={styles.miniAvatar} />
              <Text style={styles.whiteText}>
                <Text style={{ fontWeight: 'bold' }}>leomessi</Text> curtiu sua foto. <Text style={{ color: '#888' }}>10 min</Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      )}

      {/* --- MODAL DE DIRECT --- */}
      {flow === 'direct' && (
        <View style={styles.overlay}>
          <View style={styles.subHeader}>
            <TouchableOpacity onPress={goBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>vini_oddias</Text>
            <Ionicons name="create-outline" size={26} color="white" />
          </View>
          <View style={styles.searchContainer}>
            <Text style={{ color: '#888' }}>Pesquise ou pergunte à Meta AI</Text>
          </View>
          <ScrollView>
            <View style={styles.directRow}>
              <Image source={{ uri: stories[1].img }} style={styles.avatarLarge} />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={styles.whiteTextBold}>Cristiano Ronaldo</Text>
                <Text style={{ color: '#888' }}>O millior, amanhã é nois mané 🤖• 2 h</Text> 
              </View>
              <Ionicons name="camera-outline" size={24} color="#888" />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: { 
    width: width, 
    height: '100%', 
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'ios' ? 50 : 40 
  },
  igHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  igLogo: { color: 'white', fontSize: 28, fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Arial' : 'serif' },
  storyBar: { borderBottomWidth: 0.2, borderBottomColor: '#333', paddingVertical: 10 },
  storyBox: { alignItems: 'center', marginHorizontal: 10, width: 75 },
  storyCircle: { width: 68, height: 68, borderRadius: 34, padding: 3, justifyContent: 'center', alignItems: 'center' },
  activeStory: { borderWidth: 2, borderColor: '#d62976' },
  storyImg: { width: 60, height: 60, borderRadius: 30 },
  storyName: { color: 'white', fontSize: 11, marginTop: 4 },
  postCard: { width: width, marginTop: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  userName: { color: 'white', fontWeight: 'bold', marginLeft: 10 },
  postImage: { width: width, height: width },
  postActions: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  overlay: { 
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: '#000', 
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 40 
  },
  subHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 50 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', flex: 1, marginLeft: 20 },
  backBtn: { padding: 5 },
  searchContainer: { backgroundColor: '#262626', margin: 15, padding: 12, borderRadius: 12 },
  notifRow: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  directRow: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  miniAvatar: { width: 32, height: 32, borderRadius: 16 },
  avatarLarge: { width: 56, height: 56, borderRadius: 28 },
  whiteText: { color: 'white', marginLeft: 12, flex: 1 },
  whiteTextBold: { color: 'white', fontWeight: 'bold' },
  footer: { 
    height: 60, 
    borderTopWidth: 0.3, 
    borderColor: '#333', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  footerUser: { width: 28, height: 28, borderRadius: 14 },
  // NOVOS ESTILOS PARA A LEGENDA
  captionArea: { paddingHorizontal: 15, marginTop: -5 },
  boldText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  captionText: { color: 'white', fontSize: 14, marginTop: 3 },
  postTime: { color: '#888', fontSize: 11, marginTop: 5, textTransform: 'uppercase' }
});