import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import COLORS from '@/app/shared/utils/colors';
import TableComponent from '@/app/shared/components/table/table';
import { fetchDataChampionship, fetchDataChampionshipTable } from '@/app/service/service-championship';
import HeaderComponent from '@/app/shared/components/header/header';
import MenuTabsComponent from '@/app/shared/components/menu-tabs/menu-tabs';
import { fetchDataChampionshipRound } from '@/app/service/service-round';
import ListComponent from '@/app/shared/components/list/list';
import { useLocalSearchParams } from 'expo-router';

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
    const { id } = useLocalSearchParams();
    const [ championshipId, setChampionshipId ] = useState<string>();
    const [ tabActive, setTabActive ] = useState(0);
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
      queryFn: () => fetchDataChampionshipTable(id as string),
    });

    const championshipQuery = useQuery({
      queryKey: ['championship'],
      queryFn: () => fetchDataChampionship(id as string),
    });

    const roundQuery = useQuery({
      queryKey: ['round'],
      queryFn: () => fetchDataChampionshipRound(id as string),
    });

    const getTableGroups = (tableData: any) => { 
      return Object.keys(tableData).map((key: any) =>  key );
    }

    let handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], { useNativeDriver: false });

    const tabChanged = (index: number) => {  
      setTabActive(index);
    }


    useEffect(() => {
      setChampionshipId(id as string);

      championshipQuery.refetch();
      championshipTableQuery.refetch();
      roundQuery.refetch();
    }, [id]);

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

                <MenuTabsComponent 
                  onTabChange={tabChanged}
                  tabsMenuOptions={['Tabela', 'Rodada atual']}
                />

                <Animated.ScrollView style={styles.container}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}>
                    {tabActive === 0 ? (
                        championshipTableQuery.data?.['primeira-fase'] ? (
                          getTableGroups(championshipTableQuery.data['primeira-fase']).map((data: any) => {
                            return (
                              <TableComponent 
                                key={data}
                                data={championshipTableQuery.data['primeira-fase'][data]}
                                header={['Clube','Pts', 'V', 'E', 'D','SG']} 
                              />
                            );
                          })
                        ) : (
                          <TableComponent 
                            key={'default-table'}
                            data={championshipTableQuery.data} 
                            header={['Clube','Pts', 'V', 'E', 'D','SG']} 
                          />
                        )
                      ) : (
                        <ListComponent data={roundQuery.data as []} />
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
  }
});