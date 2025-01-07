import { View, Text, StyleSheet } from "react-native";

export default function User() {
    return (
        <View style={styles.container}>
            <Text>User tabs</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 16,
      backgroundColor:'#FFFFFF',
    }
});