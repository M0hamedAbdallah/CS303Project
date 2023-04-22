import { StatusBar } from "expo-status-bar";
import auth from "../firebase/config/firebase-config.js";
import {
    signInWithEmailAndPassword,
    signOut,
    deleteUser,
    sendPasswordResetEmail,
    updateProfile,
    updatePhoneNumber,
} from "firebase/auth";
import { getDatabase, child, get } from "firebase/database";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    ImageBackground,
    ScrollView,
} from "react-native";
import {
    doc,
    setDoc,
    getFirestore,
    updateDoc,
    getDoc,
    addDoc,
    deleteDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { firebase } from "../firebase/config/firebase-config.js";
import Footer from "../Layouts/Footer.js";

const Admin = ({ navigation }) => {
    const user = auth.currentUser;
    const db = getFirestore();
    const UserRef = doc(db, "users", user.uid);
    const [urlPhoto, setUrlPhoto] = useState(null);


    //to get user info
    const GetUserInfo = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            
        } else {

        }
    };

    //get user info when the screen is loaded
    useEffect(() => {
        GetUserInfo();
    }, []);

    //to update First Name
    const UpdateFirstName = async () => {
        if (firstName == "") {
            alert("Please enter your First Name");
        } else {
            await updateDoc(UserRef, {
                firstName: firstName,
            });
            setFirstNameMode(false);
            alert("First Name Updated");
        }
    };



  
    const DeleteUser = async () => {

        await deleteDoc(UserRef)
            .then(() => {
                // User deleted.
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
        window.location.reload(true);
    };

    

    //to PickImage
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            console.log("permission to access media library is required");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();
        console.log(result);
        if (!result.canceled) {
            return result.uri;
        }
    };

    //to update Photo
    const updatePhoto = async () => {
        const uri = await pickImage();
        console.log(uri);
        setUrlPhoto(uri);
        const filename = user.uid;
        const ref = firebase
            .storage()
            .ref()
            .child("images/" + filename);

        const response = await fetch(uri);
        const blob = await response.blob();
        const snapshot = await ref.put(blob);
        console.log("Image uploaded successfully");

        const downloadURL = await snapshot.ref.getDownloadURL();

        setUrlPhoto(downloadURL);

        await updateProfile(auth.currentUser, {
            photoURL: downloadURL,
        })
            .then(() => {
                console.log("user profile added");
            })
            .catch((error) => {
                alert(error.message);
            });

        window.location.reload(true);
    };
    

    return (
        <ImageBackground
            source={require("../assets/Image/reg3.jpg")}
            style={styles.container}
        >
            <StatusBar style="auto" />

            <Image
                style={styles.PhotoStyle}
                source={{
                    uri: user.photoURL,
                }}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={updatePhoto}>
                    selectImage
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={null}>
                    add
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={null}>
                    update
                </Text>
            </TouchableOpacity>


            <Footer navigation={navigation} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: "95%",
        width: "100%",
    },
    PhotoStyle: {
        width: "200px",
        height: "100px",
        // backgroundColor:"blue",
        borderRightWidth: "0px",
        // borderColor:"blue",
        // borderRadius: "50%",
        // marginTop: 0,
    },
    textStyle: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#d8d8d8",
        fontFamily: "cairo",
    },
    button: {
        width: "70%",
        borderRadius: 18,
        height: 40,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "black",
        display: "flex",
        marginTop: 3,
        backgroundColor: "#ce9e04",
    },
    buttonText: {
        color: "black",
        fontWeight: "bold",
        textTransform: "capitalize",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "cairo",
    },
});
export default Admin;
