import { useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, IconButton, Text, TextInput } from "react-native-paper";

import { useNoteList } from "../hooks/useNoteList";
import { Note } from "../types/note";
import { Vault } from "../types/vault";

export default function VaultSiteManager(vault: Vault) {
  const noteList = useNoteList(vault);

  return (
    <View style={styles.container}>
      <ScrollView>
        {noteList.map((item: Note) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <View style={styles.endIcon}>
                <Text>{item.label}</Text>
                <IconButton
                  mode="contained"
                  icon="open-in-new"
                  onPress={() => {
                    Linking.openURL(item.url);
                  }}
                />
              </View>
              <Divider style={styles.divider} />
              <View style={styles.endIcon}>
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  value={item.username || ""}
                />
              </View>
              <Password password={item.password || ""} />
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

function Password({ password }: { password: string }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.endIcon}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        value={password}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye" : "eye-off"}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 20,
  },
  endIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
  divider: {
    margin: 10,
  },
});
