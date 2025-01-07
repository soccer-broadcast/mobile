import { Image } from "expo-image";
import { Text, StyleSheet, View, ScrollView } from "react-native";

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
                            <Image style={{width: 50, height: 50}} contentFit="contain" source={{uri: item.time_visitante.escudo}}/>
                            <Text style={styles.teamName}>{item.time_visitante.sigla}</Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontWeight: 'bold', margin: 5}}>{item.data_realizacao}</Text>
                            <Text style={{fontWeight: 'bold', margin: 5}}>{item.hora_realizacao}</Text>
                            {data.roundBroadcasters?.map((broadcaster: any, index: number ) => (
                                (broadcaster.partida_id === item.partida_id) && (
                                    <View key={index} style={styles.broadcasters}>
                                        {broadcaster.broadcasters.map((broadcaster: any, idx: number) => (
                                            <Image key={idx} style={{width: 40, height: 40, margin: 5}} contentFit="contain" source={{uri: broadcaster}}/>
                                        ))}
                                    </View>
                                )
                            ))}
                        </View>
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
        marginRight: 25
    },
    teamName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    broadcasters: {
        width: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    }
});