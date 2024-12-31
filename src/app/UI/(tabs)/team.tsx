import { View, Text, StyleSheet } from "react-native";

export default function Team() {
    return (
        <View style={styles.container}>
            <Text>Team tabs</Text>
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