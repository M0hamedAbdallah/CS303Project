import { StatusBar } from "expo-status-bar";
import auth from "../firebase/config/firebase-config.js";
import React, { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import cardArray from "../Middleware/carcard.js";
import BrandsArray from "../Middleware/brands.js";
import Footer from "../Layouts/Footer.js";
import Header from "../Layouts/Header.js";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";

function MainScreen({ navigation }) {
  const user = auth.currentUser;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
        <View style={styles.marks}>
          <ScrollView horizontal={true} contentContainerStyle={styles.marksscroll} >
            {BrandsArray.map((m) => {
              return (
                <TouchableOpacity key={m.id}>
                  <Image source={m.img} style={styles.marksicons} />
                  <Text style={styles.markstext}>{m.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.products}>
          {cardArray.map((o) => {
            return (
              <TouchableOpacity style={styles.card} key={o.id}>
                <Text style={styles.title}>{o.nameCar}</Text>
                <Image source={o.img} style={styles.image} />
                <View style={styles.info}>
                  {/* <Text style={styles.numofseats}>💺{o.seats} seats</Text> */}
                  <Text style={styles.price}>💳{o.rent}$/hour </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      <Footer navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(206, 158, 4)",
  },
  header: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "space-between",
    backgroundColor: "#fff",
  },
  searchbarview: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2.5,
    borderRadius: 70,
    width: "85%",
    height: "70%",
    fontFamily: "cairo",
    marginBottom: "5px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    alignContent: "flex-start",
    alignSelf: "center",
    marginLeft: "-10%",
  },
  searchbartext: {
    fontSize: "80%",
    width: "90%",
    height: "90%",
    textAlign: "left",
    color: "black",
    fontFamily: "cairo",
    fontWeight: "700",
    marginLeft: 9,
  },
  PhotoStyle: {
    width: 50,
    height: 50,
    bordertWidth: "5",
    borderRadius: "50%",
    marginLeft: "50%",
  },
  marksscroll:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:10,
    gap:15,
  },

  marks: {
    marginTop: 50,
    marginBottom: 0,
    // marginLeft:"-20%",
    display: "flex",
    flexWrap: "wrap",
    width: "auto",
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-evenly",

  },
  marksicons: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    marginRight:12,
  },
  markstext: {
    color: "black",
    fontFamily: "cairo",
    fontWeight: "800",
    alignSelf: "center",
    marginTop: "10%",
    marginBottom: "20%",
    marginRight:12,
    fontSize:15
  },
  products: {
    marginTop: "10%",
    marginBottom: "10%",
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "lightgray",
    padding: "auto",
    paddingRight: "1%",
    paddingTop: "10%",
    paddingBottom: 70,
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    gap: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "black",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.45,
    shadowRadius: 0.54,
    elevation: 5,
    padding: 5,
    height: "auto",
    width: "auto",
    minWidth: 250,
    minHeight: 300,
    marginLeft: "2%",
    marginBottom: "2%",
  },
  image: {
    minWidth: 190,
    minHeight: 190,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 15,
    height: "70%",
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-around",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "120%",
    fontWeight: "700",
    fontFamily: "cairo",
    marginTop: "3%",
    marginBottom: "3%",
    textAlign: "center",
  },
  price: {
    fontSize: "100%",
    fontWeight: "700",
    color: "black",
    fontFamily: "cairo",
    maxWidth: "100%",
    minWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  numofseats: {
    fontSize: "80%",
    fontWeight: "700",
    color: "black",
    fontFamily: "cairo",
    maxWidth: "50%",
    flexWrap: "wrap",
  },
});
export default MainScreen;
