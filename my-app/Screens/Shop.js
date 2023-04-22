
import auth from "../firebase/config/firebase-config.js";
import React from "react";
import Footer from "../Layouts/Footer.js";
import Header from "../Layouts/Header.js";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import userCardArray from "../Middleware/inUserCard.js";

function Shop({ navigation }) {
    const user = auth.currentUser;
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView style={{ width: "100%", height: "100%" }}>
                <View style={styles.products}>
                    {userCardArray.map((o) => {
                        return (
                            <TouchableOpacity style={styles.card} key={o.id}>
                                <Text style={styles.title}>{o.nameCar}</Text>
                                <Image resizeMode="contain" resizeMethod="scale" source={o.img} style={styles.image} />
                                <View style={styles.info}>
                                    <Text style={styles.price}>💳{o.rent}$/hour </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(206, 158, 4)",
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
        marginLeft: "6%",
        marginBottom: "2%",
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 10,
        minWidth: 310,
        minHeight: 300,
        right: -15,
        height: "70%",
        resizeMode: "contain",
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
        position: 'absolute',
        bottom: -230,
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
export default Shop;