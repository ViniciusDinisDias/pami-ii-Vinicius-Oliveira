import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Instagram() {
  const stories = [
    { id: 1, name: 'Seu story', img: 'https://github.com/identicons/jason.png' },
    { id: 2, name: 'cristiano', img: 'https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-portugal-2024-1718116346-139363.jpg' },
    { id: 3, name: 'leomessi', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg' },
    { id: 4, name: 'neymarjr', img: 'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2023/10/18/1487265932-neymar-selecao.jpg' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Ionicons name="heart-outline" size={28} color="white" />
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="white" />
        </View>
      </View>
      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyBar}>
          {stories.map((s) => (
            <View key={s.id} style={{alignItems: 'center', marginHorizontal: 10}}>
              <Image source={{ uri: s.img }} style={[styles.storyCircle, s.id !== 1 && {borderColor: '#d62976'}]} />
              <Text style={{color: 'white', fontSize: 11}}>{s.name}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Image source={{ uri: stories[1].img }} style={styles.miniAvatar} />
            <Text style={{color:'white', fontWeight:'bold'}}>cristiano</Text>
          </View>
          {/* IMAGEM DO CR7 E MESSI XADREZ */}
          <Image 
            source={{ uri: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/02/cristiano-ronaldo-al-nassr-e1738614469513.jpeg?w=1200&h=1200&crop=1' }} 
            style={styles.postImage} 
            resizeMode="cover"
          />
          <View style={{padding: 10}}>
            <Text style={{color: 'white'}}><Text style={{fontWeight: 'bold'}}>cristiano</Text> Victory is a State of Mind. ♟️</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingTop: 50 },
  logo: { color: 'white', fontSize: 26, fontWeight: 'bold' },
  storyBar: { padding: 10, borderBottomWidth: 0.5, borderBottomColor: '#222' },
  storyCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#333', marginBottom: 5 },
  post: { marginTop: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  miniAvatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  postImage: { width: '100%', height: 400 },
});