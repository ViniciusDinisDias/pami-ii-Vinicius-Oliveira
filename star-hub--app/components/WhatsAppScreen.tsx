import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const WhatsAppScreen = () => {
  const [tab, setTab] = useState('conversas');

  const contatos = [
    { id: 1, nome: 'Cristiano Ronaldo', msg: '✓✓ O treino de hoje foi pesado!', time: '20:26', img: 'https://sm.mashable.com/mashable_id/photo/default/cristiano-ronaldo_bc96.jpg' },
    { id: 2, nome: 'Lionel Messi', msg: 'Ganamos otra vez, Leo!', time: '19:45', img: 'https://img.a.transfermarkt.technology/portrait/big/28003-1771694720.jpg?lm=1' },
    { id: 3, nome: 'Neymar Jr', msg: 'Bora que hoje é Tabajaras 🤪', time: '18:10', img: 'https://assets.goal.com/images/v3/blt47f09058442f3c14/neymar-close.jpg?auto=webp&format=pjpg&width=3840&quality=60' },
    { id: 4, nome: 'Mbappé', msg: 'Tortuguita? est fou 🤬', time: '15:20', img: 'https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg?lm=1' },
    { id: 5, nome: 'Macae', msg: 'Macaé craque de bola 😎', time: '10:05', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS7sWAu7z9S3YVJzguCv_s6NgvAH_0jFXbsg&s' },
  ];

  const renderContent = () => {
    if (tab === 'conversas') {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchBar}>
            <Text style={{ color: '#888' }}>Pergunte à Meta AI ou pesquise</Text>
          </View>
          {contatos.map((item) => (
            <TouchableOpacity key={item.id} style={styles.chatRow}>
              <Image source={{ uri: item.img }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.name}>{item.nome}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.msg} numberOfLines={1}>{item.msg}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }

    if (tab === 'atualizacoes') {
      return (
        <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            <View style={styles.statusItem}>
              <Image source={{ uri: 'https://assets.propmark.com.br/uploads/2025/02/Captura-de-tela-2025-02-03-152701.jpg' }} style={styles.statusCircle} />
              <Text style={styles.statusName}>Meu status</Text>
            </View>
            {contatos.slice(1, 4).map((c) => (
              <View key={c.id} style={styles.statusItem}>
                <View style={styles.statusBorder}>
                  <Image source={{ uri: c.img }} style={styles.statusCircleImg} />
                </View>
                <Text style={styles.statusName}>{c.nome.split(' ')[0]}</Text>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Canais</Text>
          <View style={styles.channelRow}>
            <Image 
              source={{ uri: 'https://diariodepernambuco.com.br/dpmais/wp-content/uploads/2026/02/Selecao-Brasileira.jpg' }} 
              style={styles.avatar} 
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Seleção Brasileira</Text>
              <Text style={styles.msg}>Convocação amanhã!</Text>
            </View>
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.callHeaderIcons}>
          <View style={styles.callCircle}><Ionicons name="link" size={24} color="white" /></View>
          <View style={styles.callCircle}><Ionicons name="calendar" size={24} color="white" /></View>
          <View style={styles.callCircle}><Ionicons name="grid" size={24} color="white" /></View>
          <View style={styles.callCircle}><Ionicons name="heart" size={24} color="white" /></View>
        </View>
        <Text style={[styles.sectionTitle, { marginLeft: 15 }]}>Recentes</Text>
        {contatos.slice(0, 3).map((c) => (
          <View key={c.id} style={styles.chatRow}>
            <Image source={{ uri: c.img }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{c.nome}</Text>
              <Text style={styles.msg}>↗ {c.time}</Text>
            </View>
            <Ionicons name="call-outline" size={24} color="#25D366" />
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={{ width, flex: 1, backgroundColor: '#0b141a' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {tab === 'conversas' ? 'WhatsApp' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
          <View style={styles.headerIcons}>
            <Ionicons name="camera-outline" size={26} color="white" />
            <Ionicons name="search" size={26} color="white" />
            <Ionicons name="ellipsis-vertical" size={26} color="white" />
          </View>
        </View>

        {renderContent()}

        <TouchableOpacity style={styles.fab}>
          <MaterialIcons name={tab === 'ligacoes' ? "add-call" : "add-comment"} size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => setTab('conversas')} style={styles.tabItem}>
            <Ionicons name="chatbubbles" size={24} color={tab === 'conversas' ? 'white' : '#888'} />
            <Text style={[styles.tabText, { color: tab === 'conversas' ? 'white' : '#888' }]}>Conversas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab('atualizacoes')} style={styles.tabItem}>
            <Ionicons name="ellipse-outline" size={24} color={tab === 'atualizacoes' ? 'white' : '#888'} />
            <Text style={[styles.tabText, { color: tab === 'atualizacoes' ? 'white' : '#888' }]}>Atualizações</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab('ligacoes')} style={styles.tabItem}>
            <Ionicons name="call-outline" size={24} color={tab === 'ligacoes' ? 'white' : '#888'} />
            <Text style={[styles.tabText, { color: tab === 'ligacoes' ? 'white' : '#888' }]}>Ligações</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    paddingTop: Platform.OS === 'ios' ? 20 : 50 
  },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', gap: 20 },
  searchBar: { backgroundColor: '#202c33', margin: 15, padding: 12, borderRadius: 30 },
  chatRow: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 15 },
  name: { color: 'white', fontWeight: 'bold', fontSize: 17 },
  msg: { color: '#888', marginTop: 3 },
  time: { color: '#888', fontSize: 12 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  statusItem: { alignItems: 'center', marginRight: 15 },
  statusCircle: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#333' },
  statusBorder: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    borderWidth: 2, 
    borderColor: '#25D366', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  statusCircleImg: { width: 62, height: 62, borderRadius: 31 },
  statusName: { color: 'white', fontSize: 12, marginTop: 5 },
  channelRow: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  callHeaderIcons: { flexDirection: 'row', justifyContent: 'space-around', padding: 20 },
  callCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#202c33', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  fab: { 
    position: 'absolute', 
    bottom: 100, 
    right: 20, 
    backgroundColor: '#25D366', 
    padding: 15, 
    borderRadius: 30, 
    elevation: 5 
  },
  footer: { 
    height: 80, 
    borderTopWidth: 0.5, 
    borderColor: '#222', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    backgroundColor: '#0b141a' 
  },
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 11, marginTop: 4 }
});