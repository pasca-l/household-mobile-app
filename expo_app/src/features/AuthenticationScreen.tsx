import { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";

import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AUTHENTICATION } from "@/utils/firebase/firebaseUtils";
import { GOOGLE_PROVIDER } from "@/utils/firebase/authentiation/authProviders";
import { View } from "react-native";

export default function AuthenticationScreen() {
  const [userName, setUserName] = useState("");
  const [userUID, setUserUID] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTHENTICATION, async (user) => {
      if (user) {
        setUserName(String(user.email));
        setUserUID(String(user.uid));
      } else {
        setUserName("undefined");
        setUserUID("undefined");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>{userName}</Text>
      <Text>{userUID}</Text>
      <Button
        onPress={() => {
          setPersistence(AUTHENTICATION, browserSessionPersistence).then(
            async () => {
              await signInWithPopup(AUTHENTICATION, GOOGLE_PROVIDER);
            }
          );
        }}
      >
        Sign in with Google
      </Button>
      <TextInput
        mode="flat"
        label="email"
        value={inputEmail}
        onChangeText={setInputEmail}
        placeholder="abc@gmail.com"
      />
      <TextInput
        mode="flat"
        label="password"
        value={inputPassword}
        onChangeText={setInputPassword}
        secureTextEntry={true}
      />
      <Button
        onPress={() => {
          signInWithEmailAndPassword(AUTHENTICATION, inputEmail, inputPassword);
        }}
      >
        Sign in with email and password
      </Button>
      <Button
        onPress={() => {
          signOut(AUTHENTICATION);
        }}
      >
        Sign out
      </Button>
    </View>
  );
}
