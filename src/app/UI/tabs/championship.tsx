import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';
import TableChampionship from '@/app/shared/components/utils/championship';
import { Image } from 'expo-image';
import TableComponent from '@/app/shared/components/table/table';

// export interface ChampionshipData {
//     filters: { season: string };
//     area: Area;
//     competitions: Competition;
//     season: Season;
//     standings: Standings[];
//  }
 
//  export interface Area { 
//      id: number;   
//      name: string;
//      code: string;
//      flag: string;
//  }
 
//  export interface Competition {
//      id: number;
//      name: string;
//      code: string;
//      type: string;
//      emblem: string;
//  }
 
//  export interface Season {
//      id: number;
//      startDate: string;
//      endDate: string;
//      currentMatchday: number;
//      winner: string;
//  }
 
//  export interface Standings {
//      stage: string;
//      group: string;
//      type: string;
//      table: TableChampionship[];
//  }
 

export default function Championship() {

    const [champonship, setChamponship] = useState<TableChampionship[]>();
    const [headersTable, setHeadersTable ]  = useState<string[]>([]);
    const { authorize, clearSession, user, getCredentials } = useAuth0();

    useEffect(() => {
        // const headers = {
        //     'X-Auth-Token': 'd4ee753a174245c59ca450942d3e148d',
        // };

        // axios.get('https://api.football-data.org/v4/competitions/BSA/standings', { headers } )
        //     .then(response => {
        //         setChamponship(response.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        const headers = {
            'Authorization': 'Bearer live_378a59495af5df81988afefdc2cf99',
        };

        axios.get('https://api.api-futebol.com.br/v1/campeonatos/10/tabela', { headers } )
            .then(response => {
                console.log(response.data.length);
                setChamponship(response.data);
                setHeadersTable(['Clube','Pts', 'V', 'E', 'D','SG']);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const logout = async () => {
        try {
          await clearSession();
        } catch (e) {
          console.log(e)
        }
      };

    const onLogout = async () => {

        console.log(user)

        if(!user) {
            logout();
        }
    };

    return (
        <View style={styles.container}>
            {champonship?.length === undefined ? (
                <Text>Carregando...</Text>
            ) : 
                <TableComponent 
                    key={123}
                    data={champonship?.length > 0 ? champonship : []}
                    header={['Clube','Pts', 'V', 'E', 'D','SG']} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor:'#FFFFFF',
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