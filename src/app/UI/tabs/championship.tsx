import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useAuth0 } from 'react-native-auth0';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

import COLORS from '@/app/shared/components/utils/colors';
import TableComponent from '@/app/shared/components/table/table';
import { fetchDataChampionship, fetchDataChampionshipTable } from '@/app/service/fetchChampionship';


export interface Championship { 
  id: number;
  nome: string;
  nome_popular: string;
  logo: string;
}

export interface TableChampionship { 
  posicao: number;
  pontos: number;
  time: Team;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_pro: number;
  gols_contra: number;
  saldo_gols: number;
  aproveitamento: number;
  variacao_posicao: number;
  ultimos_jogos: string[];
  ['primeira-fase']?: PrimeiraFase;
}

export interface TableChampionshipGroups { 
  [key: string]: TableChampionship[];
}

export interface PrimeiraFase {
  [key: string]: TableChampionship[];
}

export interface Team { 
  time_id: number;
  nome_popular: string;
  sigla: string;
  escudo: string;
}

export default function Championship() {

    const [ championshipTable, setChampionshipTable ] = useState<TableChampionship[]>();
    const [ championship, setChampionship ] = useState<Championship>();
    const { authorize, clearSession, user, getCredentials } = useAuth0();

    const { data, isLoading } = useQuery({
      queryKey: ['championshipTable'],
      queryFn: () => fetchDataChampionshipTable(),
    });

    const result = useQuery({
      queryKey: ['championship'],
      queryFn: () => fetchDataChampionship(),
    });

    useEffect(() => {
      if(data) {
        setChampionshipTable(data);
      }

      if(result.data) {
        setChampionship(result.data);
      }
    }, [data, result.data]);

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
            {isLoading  ? (
                <Text>Carregando... { isLoading } {}</Text>
            ) : 
              <View style={styles.container}>
                <View style={styles.headerChampionship}>
                  <Image source={championship?.logo} style={styles.championshipLogo}/>
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
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  championshipLogo: {
    width: 150,
    height: 150,
  }
});