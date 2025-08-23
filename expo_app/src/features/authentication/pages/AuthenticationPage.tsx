import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Divider, FAB, Text } from "react-native-paper";

import { useFirebaseAuth } from "@/utils/firebase/hooks/useFirebaseAuth";

import AuthenticationFormModal from "../components/AuthenticationFormModal";
import AuthenticationServiceList from "../components/AuthenticationServiceList";
import { signOutFirebaseAuth } from "../utils/firebaseAuth";

export default function AuthenticationPage({
  handleSpendingsRoute,
  handleVaultRoute,
}: {
  handleSpendingsRoute: (spendingsId: string) => void;
  handleVaultRoute: (vaultsId: string) => void;
}) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const user = useFirebaseAuth();

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>{user.email}</Text>
          <Text>{user.uid}</Text>
          <Divider style={styles.divider} />
          <AuthenticationServiceList
            handleSpendingsRoute={handleSpendingsRoute}
            handleVaultRoute={handleVaultRoute}
          />
          <Divider style={styles.divider} />
          <Button
            onPress={() => {
              signOutFirebaseAuth();
            }}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Text>Not logged in</Text>
        </>
      )}

      <FAB
        icon={"login"}
        style={styles.fab}
        onPress={() => {
          setShowForm(true);
        }}
      />
      <AuthenticationFormModal showForm={showForm} setShowForm={setShowForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    margin: 10,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
