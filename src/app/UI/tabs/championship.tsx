import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth0 } from 'react-native-auth0';
import TableChampionship from '@/app/shared/components/utils/championship';
import TableComponent from '@/app/shared/components/table/table';
import COLORS from '@/app/shared/components/utils/colors';


export default function Championship() {

    const [champonship, setChamponship] = useState<TableChampionship[]>();
    const { authorize, clearSession, user, getCredentials } = useAuth0();

    useEffect(() => {

        const headers = {
            'Authorization': 'Bearer live_378a59495af5df81988afefdc2cf99',
        };

        axios.get('https://api.api-futebol.com.br/v1/campeonatos/10/tabela', { headers } )
            .then(response => {
                setChamponship(response.data);
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
    backgroundColor: COLORS.white,
  },
  table: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    padding: 10,
  },
  header: {
    backgroundColor: COLORS.light_gray,
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