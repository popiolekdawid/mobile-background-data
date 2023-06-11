import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const fetchData = () => {
    fetch('https://api.github.com/users/popiolekdawid/repos').then(
      resp => resp.json() // this returns a promise
    ).then(repos => {
      for (const repo of repos) {
        console.log(repo.name);
      }
    }).catch(ex => {
      console.error(ex);
    })
  }

  fetchData();

  return (
    <View style={styles.container}>
      <Text>Fetch</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
