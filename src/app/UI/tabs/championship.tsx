import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Image } from 'expo-image';
import { useAuth0 } from 'react-native-auth0';
import TableChampionship from '@/app/shared/components/utils/championship';
import TableComponent from '@/app/shared/components/table/table';
import COLORS from '@/app/shared/components/utils/colors';

export default function Championship() {

    const [ championshipTable, setChampionshipTable ] = useState<TableChampionship[]>();
    const [ championship, setChampionship ] = useState<any[]>();
    const { authorize, clearSession, user, getCredentials } = useAuth0();

    useEffect(() => {
        const headers = { 'Authorization': 'Bearer live_378a59495af5df81988afefdc2cf99' };

        getChampionshipTable(headers);
    }, []);

    const getChampionshipTable = async (headers: any) => {
        await axios.get('https://api.api-futebol.com.br/v1/campeonatos/10/tabela', { headers } )
            .then(response => {
              setChampionshipTable(response.data as TableChampionship[]);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const getChampionship = async (headers: any) => {
      await axios.get('https://api.api-futebol.com.br/v1/campeonatos/10', { headers } )
                .then(response => {
                  // setChampionship(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
    };

    const logout = async () => {
        try {
          await clearSession();
        } catch (e) {
          console.log(e)
        }
      };

    const onLogout = async () => {
        if(!user) {
            logout();
        }
    };

    return (
        <View style={styles.container}>
            {championshipTable?.length === 0  ? (
                <Text>Carregando...</Text>
            ) : 
              <View style={styles.container}>
                <View style={styles.headerChampionship}>
                  <Image source={require('../../../../assets/soccer.png')} style={styles.championshipLogo}/>
                  <Text>{championship?.nome}</Text>
                </View>
                <TableComponent 
                    key={123}
                    data={championshipTable ? championshipTable : []}
                    header={['Clube','Pts', 'V', 'E', 'D','SG']} />
              </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  headerChampionship: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.dark_blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  championshipLogo: {
    width: 150,
    height: 150,
  }
});