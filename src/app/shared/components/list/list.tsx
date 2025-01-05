import { Image } from "expo-image";
import { useEffect } from "react";
import { Text, StyleSheet, FlatList, View, ScrollView } from "react-native";

export interface ListProps {
    data: any;
}

export default function ListComponent({data}: ListProps) {

    return(
        <View style={styles.container}>
            <ScrollView>
                {data.partidas.map((item: any, index: number) => (
                    <View key={index} style={styles.gameMatch}>
                        <View style={styles.teamStatus}>
                            <Image style={{width: 50, height: 50}} source={{uri: item.time_mandante.escudo}}/>
                            <Text style={styles.teamName}>{item.time_mandante.sigla}</Text>
                        </View>
                        <Text>X</Text>
                        <View style={styles.teamStatus}>
                            <Image style={{width: 50, height: 50}} source={{uri: item.time_visitante.escudo}}/>
                            <Text style={styles.teamName}>{item.time_visitante.sigla}</Text>
                        </View>
                        <Text> Onde assistir o jogo</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 16,
      backgroundColor:'#FFFFFF',
    },
    gameMatch: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    teamStatus: {
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: 16,
      marginRight: 16
    },
    teamName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
});