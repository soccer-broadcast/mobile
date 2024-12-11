import React, { useEffect } from 'react';
import { Standings, TableChampionship } from '../Interface/championship';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
// import { Table, Row, Rows } from 'react-native-table-component';

// { data } : { data: TableChampionship[] }, { header} : { header: string[] }
export default function Table({ data, header }: { data: Standings[], header: string[] }) {
    const tableData = [
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Smith', age: 34 },
        { id: 3, name: 'Sam Johnson', age: 23 },
      ];

    useEffect(() => {    
        alert(JSON.stringify(data[0].table[0]));
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.table}>
                {/* Header */}
                <View style={[styles.row, styles.header]}>
                    {header.map((item, index) => (
                        <Text style={styles.cell}>{item}</Text>
                    ))}
                </View>
                {data[0].table.map((item) => (
                    <View key={item.id} style={styles.row}>
                        <Text style={styles.cell}>{item.position}</Text>
                        <Text style={styles.cell}>{item.team.tla}</Text>
                        <Text style={styles.cell}>{item.points}</Text>
                    </View>
                ))}
            </View>
            </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // O contêiner ocupa toda a tela
        backgroundColor: '#fff',
        padding: 10,
      },
      table: {
        flex: 1, // A tabela ocupa todo o espaço disponível
      },
      row: {
        flexDirection: 'row',
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
        textAlign: 'center',
        fontSize: 16,
      },
  });