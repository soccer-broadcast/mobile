import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useQuery } from '@tanstack/react-query';

import COLORS from '@/app/shared/components/utils/colors';
import TableComponent from '@/app/shared/components/table/table';
import { fetchDataChampionship, fetchDataChampionshipTable } from '@/app/service/fetchChampionship';
import HeaderComponent from '@/app/shared/components/header/header';

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
  fases: [];
}

export interface FaseChampionship { 
  fase_id: number;
  edicao: Edicao;  
  nome: string;
  slug: string;
  status: string;
  decisivo: string;
  ida_e_volta: string;
  tipo: string;
  grupos: [];
  chaves: [];
  proxima_fase: Fase;
  fase_anterior: Fase;
  _link: string
}

export interface Edicao {
  edicao_id: number;
  temporada: string;
  nome: string;
  nome_popular: string;
  slug: string;
}

export interface Fase {
  fase_id: number;
  nome: string;
  slug: string;
  tipo: string;
  _link: string;
}

export interface Team { 
  time_id: number;
  nome_popular: string;
  sigla: string;
  escudo: string;
}

const H_MAX_HEIGHT = 250;
const H_MIN_HEIGHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

export default function Championship() {
    const { authorize, clearSession, user, getCredentials } = useAuth0();
    const scrollOffsetY = useRef(new Animated.Value(0)).current;

    const headerScrollHeight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
        extrapolate: 'clamp'
    });

    const imageScaleHight = scrollOffsetY.interpolate({
        inputRange: [0, H_SCROLL_DISTANCE],
        outputRange: [150, 50],
        extrapolate: 'clamp'
    });

    const championshipTableQuery = useQuery({
      queryKey: ['championshipTable'],
      queryFn: () => fetchDataChampionshipTable(),
    });

    const championshipQuery = useQuery({
      queryKey: ['championship'],
      queryFn: () => fetchDataChampionship(),
    });

    const getTableGroups = (tableData: any) => { 
      return Object.keys(tableData).map((key: any) =>  key );
    }

    const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], { useNativeDriver: false });

    // const logout = async () => {
    //     try {
    //       await clearSession();
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   };

    // const onLogout = async () => {
    //     if(!user) {
    //         logout();
    //     }
    // };

    return (
        <View style={styles.container}>
            { championshipTableQuery.isLoading || championshipQuery.isLoading ? (
                <Text>Carregando...</Text>
            ) : 
              <>
                <HeaderComponent 
                  imageSource={championshipQuery.data.logo} 
                  title={championshipQuery.data.nome_popular} 
                  headerScrollHeight={headerScrollHeight} 
                  imageScaleHight={imageScaleHight}/>

                <Animated.ScrollView style={styles.container}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}>
                    {championshipTableQuery.data['primeira-fase'] ? (
                      getTableGroups(championshipTableQuery.data['primeira-fase']).map((data: any) => {
                        return (
                          <TableComponent 
                          key={data}
                          data={championshipTableQuery.data['primeira-fase'][data]}
                          header={['Clube','Pts', 'V', 'E', 'D','SG']} />
                        )
                      })
                    ) : (
                      <TableComponent 
                      key={123}
                      data={championshipTableQuery.data}
                      header={['Clube','Pts', 'V', 'E', 'D','SG']} />
                    )}
                </Animated.ScrollView>
              </>
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
    alignItems: 'center'
  },
  championshipLogo: {
    width: 150,
    height: 200
  }
});