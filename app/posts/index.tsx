import { Text, View, StyleSheet } from 'react-native';

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Posts feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
  },
});
