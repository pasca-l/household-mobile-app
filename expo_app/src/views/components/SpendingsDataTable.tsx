import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

export default function SpendingsDataTable({ expenseList }: any) {
  return (
    <DataTable style={styles.container}>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Value</DataTable.Title>
      </DataTable.Header>
      {expenseList.map((item: any) => (
        <DataTable.Row
          key={item.id}
          onPress={(e) => {
            console.log(e);
          }}
        >
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.value}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
