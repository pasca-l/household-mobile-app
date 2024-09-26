import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Linking, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Card,
  Divider,
  IconButton,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";

import { useNoteList } from "../hooks/useNoteList";
import { AdditionalNote, Note } from "../types/note";
import { Vault } from "../types/vault";

export default function VaultSiteManager(vault: Vault) {
  const { noteList, isLoading } = useNoteList(vault);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <ScrollView>
          {noteList.map((item: Note) => (
            <Card key={item.id} style={styles.card}>
              <Card.Content>
                <View style={styles.endIcon}>
                  <Text variant="bodyLarge">{item.label}</Text>
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
                  <Text>{item.username}</Text>
                  <IconButton
                    icon="content-copy"
                    onPress={() => {
                      Clipboard.setStringAsync(item.username);
                      setShowSnackbar(true);
                    }}
                  />
                </View>
                <View style={styles.endIcon}>
                  <Password password={item.password || ""} />
                  <IconButton
                    icon="content-copy"
                    onPress={() => {
                      Clipboard.setStringAsync(item.password);
                      setShowSnackbar(true);
                    }}
                  />
                </View>
                {item.other.length > 0 ? (
                  <View>
                    <Divider style={styles.divider} />
                    {item.other.map((other: AdditionalNote) => (
                      <View key={other.label} style={styles.endIcon}>
                        <Text>{other.content}</Text>
                        <IconButton
                          icon="content-copy"
                          onPress={() => {
                            Clipboard.setStringAsync(other.content);
                            setShowSnackbar(true);
                          }}
                        />
                      </View>
                    ))}
                  </View>
                ) : (
                  <></>
                )}
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => {
          setShowSnackbar(false);
        }}
        duration={750}
      >
        Copied!
      </Snackbar>
    </View>
  );
}

function Password({ password }: { password: string }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    height: "100%",
    alignItems: "center",
  },
  card: {
    margin: 20,
  },
  endIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
  divider: {
    margin: 10,
  },
});
