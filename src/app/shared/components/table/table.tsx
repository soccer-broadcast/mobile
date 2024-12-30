import React from 'react';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import TableChampionship from '../utils/championship';

export default function TableComponent({ data, header }: { data: TableChampionship[] | [], header: string[] }) {  
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.table}>
                    <View style={[styles.row, styles.header]}>
                        {header.map((item, index) => (
                            <Text key={index} style={styles.cell}>{item}</Text>
                        ))}
                    </View>
                    {data.length === 0 ? (
                        <Text>Carregando...</Text>
                    ) : (
                        data.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.cellPostition}>{item.posicao}</Text>
                                <Image  source={{ uri: item.time.escudo }} 
                                        style={styles.teamCrest}/>
                                <Text style={styles.cell}>{item.pontos}</Text>
                                <Text style={styles.cell}>{item.vitorias}</Text>
                                <Text style={styles.cell}>{item.empates}</Text>
                                <Text style={styles.cell}>{item.derrotas}</Text>
                                <Text style={styles.cell}>{item.saldo_gols}</Text>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
      },
      table: {
        flex: 1,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
      },
      header: {
        backgroundColor: '#f4f4f4',
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
      },
      cell: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cellPostition: {
        width: 20,
      },
      teamCrest: {
        width: 25,
        height: 25,
        marginRight: 20
      },
  });