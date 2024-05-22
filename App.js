import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator
} from "react-native";
import { useEffect, useState } from "react";

const API_URL = "https://arrivelah2.busrouter.sg/?id=84221";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [timing, setTiming] = useState("");

  function fetchData() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const myBus = data.services.filter((bus) => bus.no === "14")[0];
        console.log(myBus);
        setTiming(myBus.next.time);
      });
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : timing}
      </Text>
      <Pressable style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Refresh</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  arrivalTime: {
    fontSize: 40,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    color: "white"
  }
});
