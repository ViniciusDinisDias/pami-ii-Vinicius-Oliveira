import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function WhatsApp() {
  const chats = [
    { id: 1, name: 'Neymar Jr', msg: 'Bora pro treino amanhã?', time: '21:45', img: 'https://img.a.transfermarkt.technology/portrait/big/68290-1692601435.jpg?lm=1' },
    { id: 2, name: 'Cristiano Ronaldo', msg: 'O treino de hoje foi pesado! SIUUU', time: '20:30', img: 'https://media.fstatic.com/OINkROEpIXatCIRBTL9uw98skWg=/full-fit-in/290x478/filters:format(webp)/media/artists/avatar/2020/04/cristiano-ronaldo_a336212.jpg' },
    { id: 3, name: 'Lionel Messi', msg: '¿Viste el partido de ayer?', time: '19:15', img: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>WhatsApp</Text>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Ionicons name="camera-outline" size={26} color="white" />
          <Ionicons name="search" size={26} color="white" />
          <Ionicons name="ellipsis-vertical" size={26} color="white" />
        </View>
      </View>
      <ScrollView>
        <View style={styles.searchBar}><Text style={{color: '#888'}}>Pergunte à Meta AI ou pesquise</Text></View>
        {chats.map(chat => (
          <View key={chat.id} style={styles.chatRow}>
            <Image source={{ uri: chat.img }} style={styles.avatar} />
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              <Text style={styles.chatMsg}>✓✓ {chat.msg}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.fab}><MaterialIcons name="add-comment" size={24} color="black" /></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b141a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 50 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  searchBar: { backgroundColor: '#202c33', margin: 15, padding: 12, borderRadius: 30 },
  chatRow: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 15 },
  chatName: { color: 'white', fontWeight: 'bold', fontSize: 17 },
  chatMsg: { color: '#888', marginTop: 3 },
  chatTime: { color: '#888', fontSize: 12 },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#25D366', width: 60, height: 60, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }
});