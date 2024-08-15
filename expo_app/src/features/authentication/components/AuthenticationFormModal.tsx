import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Divider, Portal, TextInput } from "react-native-paper";

import { signInFirebaseAuth } from "../utils/firebaseAuth";

export default function AuthenticationFormModal({
  showForm,
  setShowForm,
}: {
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;
}) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  return (
    <Portal>
      <Dialog
        visible={showForm}
        onDismiss={() => {
          setShowForm(false);
        }}
      >
        <Dialog.Content>
          <Button
            onPress={() => {
              signInFirebaseAuth({ method: "google" });
              setShowForm(false);
            }}
          >
            Sign in with Google
          </Button>
          <Divider style={styles.divider} />
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
              signInFirebaseAuth({
                method: "email",
                email: inputEmail,
                password: inputPassword,
              });
              setShowForm(false);
            }}
          >
            Sign in with email and password
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  divider: {
    margin: 10,
  },
});
