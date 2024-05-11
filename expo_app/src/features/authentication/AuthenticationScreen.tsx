import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import {
  signInFirebaseAuth,
  signOutFirebaseAuth,
} from "./functions/firebaseAuth";
import { useFirebaseAuth } from "./hooks/useFirebaseAuth";

export default function AuthenticationScreen() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const user = useFirebaseAuth();

  return (
    <View>
      <Text>{user ? user.email : "undefined"}</Text>
      <Text>{user ? user.uid : "undefined"}</Text>
      <Button onPress={signInFirebaseAuth({ method: "google" })}>
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
        onPress={signInFirebaseAuth({
          method: "email",
          email: inputEmail,
          password: inputPassword,
        })}
      >
        Sign in with email and password
      </Button>
      <Button onPress={signOutFirebaseAuth}>Sign out</Button>
    </View>
  );
}
