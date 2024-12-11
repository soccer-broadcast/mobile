import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Table from '../../shared/components/table';
import { ChampionshipData } from '../../shared/Interface/championship';

export default function Championship() {

    const [champonship, setChamponship] = useState<ChampionshipData>();

    useEffect(() => {
        const headers = {
            'X-Auth-Token': 'd4ee753a174245c59ca450942d3e148d',
        };

        axios.get('https://api.football-data.org/v4/competitions/BSA/standings', { headers } )
            .then(response => {
                alert(response.data);
                setChamponship(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <View style={styles.container}>
            <Table 
                data={champonship?.standings}
                header={['POS', 'Time', 'Pontos']} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
  }
});