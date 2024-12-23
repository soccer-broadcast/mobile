import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Standings } from '../../Interface/championship';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default function Table({ data, header }: { data: Standings[] | [], header: string[] }) {
;    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.table}>
                    <View style={[styles.row, styles.header]}>
                        {header.map((item, index) => (
                            <Text key={index} style={styles.cell}>{item}</Text>
                        ))}
                    </View>
                    {data === undefined ? (
                        <Text>Carregando...</Text>
                    ) : (
                        data[0].table.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.cellPostition}>{item.position}</Text>
                                <Image  source={{ uri: item.team.crest }} 
                                        style={styles.teamCrest}/>
                                <Text style={styles.cell}>{item.points}</Text>
                                <Text style={styles.cell}>{item.won}</Text>
                                <Text style={styles.cell}>{item.draw}</Text>
                                <Text style={styles.cell}>{item.lost}</Text>
                                <Text style={styles.cell}>{item.goalDifference}</Text>
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