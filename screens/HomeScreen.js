import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { useClick } from "../context/ClickContext";
import RectButton from "../components/RectButton";
import RectCard from "../components/RectCard";

const HomeScreen = ({route}) => {
  const [joke, setJoke] = useState("");
  const [items, setItems] = useState([]);
  const { clickCount, incrementClick } = useClick();
   const { email } = route.params || {}

  const fetchJoke = async () => {
    try {
      const response = await axios.get("https://api.chucknorris.io/jokes/random");
      setJoke(response.data.value);
    } catch (error) {
      console.error("Error fetching the joke:", error);
      setJoke("Failed to load a joke.");
    }
  };

  const fetchItems = async () => {
    const data = [
      {
        id: "1",
        image: "https://resizing.flixster.com/tdMXmsVnR-vIj4Q5IACpEZ7O1ak=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15987_v_h8_au.jpg",
        status: "Available",
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      },
      {
        id: "2",
        image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
        status: "Classic",
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      },
      {
        id: "3",
        image: "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
        status: "Available",
        title: "The Dark Knight",
        description: "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      },
      {
        id: "4",
        image: "https://m.media-amazon.com/images/M/MV5BNTQxNzU4NTY2OF5BMl5BanBnXkFtZTcwNzQ2NTI3Ng@@._V1_.jpg",
        status: "Family",
        title: "The Lion King",
        description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
      },
    ];
    setItems(data);

  };

  useEffect(() => {
    fetchJoke();
    fetchItems();
  }, []);

  const handleRefreshJoke = () => {
    incrementClick();
    fetchJoke();
  };

  const renderItem = ({ item }) => (
    <RectCard
      title={item.title}
      content={item.description}
      image={item.image}
      status={item.status}
    />
  );

  return (
    <View style={styles.container}>
    <Text style={styles.welcomeTitle}> Welcome!{email} </Text>
      <RectCard title="Joke for the Day" content={joke || "Loading..."} />
      <RectButton title="Get Another Joke" onPress={handleRefreshJoke} />
        <Text style={styles.watchTitle}> Movies to Watch</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.clickCountContainer}>
              <Text style={styles.clickCountText}>Clicks: {clickCount}</Text>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e6ffe6",
  },
  clickCountContainer: {
     position: "absolute",
        bottom: 10,
        right: 16,
        backgroundColor:"rgba(0, 0, 51, 0.9)",
        padding: 12,
        borderRadius: 70,
        shadowColor: "#000",
        shadowOpacity: 0.9,
        shadowRadius: 8,


  },
  clickCountText: {
    fontSize: 16,
    color: "#d9fdd9",
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "bold"
  },
  watchTitle:
   {
    marginTop: 16,
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "bold",
   },
   welcomeTitle:
      {
       marginTop: 8,
       marginBottom: 16,
       fontSize: 20,
       color: "rgba(0, 0, 51)",
       fontWeight: "bold",
      },
  list: {
    marginTop: 16,
  },
});

export default HomeScreen;
