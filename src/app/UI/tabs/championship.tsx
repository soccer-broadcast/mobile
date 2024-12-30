import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth0 } from 'react-native-auth0';
import { router } from 'expo-router';

export interface ChampionshipData {
    filters: { season: string };
    area: Area;
    competitions: Competition;
    season: Season;
    standings: Standings[];
 }
 
 export interface Area { 
     id: number;   
     name: string;
     code: string;
     flag: string;
 }
 
 export interface Competition {
     id: number;
     name: string;
     code: string;
     type: string;
     emblem: string;
 }
 
 export interface Season {
     id: number;
     startDate: string;
     endDate: string;
     currentMatchday: number;
     winner: string;
 }
 
 export interface Standings {
     stage: string;
     group: string;
     type: string;
     table: TableChampionship[];
 }
 
 export interface TableChampionship {
     name: string,
     position: number;
     team: Team;
     playedGames: number;
     won: number;
     draw: number;
     lost: number;
     points: number;
     goalsFor: number;
     goalsAgainst: number;
     goalDifference: number;
 }
 
 export interface Team { 
     id: number;
     name: string;
     shortName: string;
     tla: string;
     crest: string;
 }

export default function Championship() {

    const [champonship, setChamponship] = useState<ChampionshipData>();
    const { authorize, clearSession, user, getCredentials } = useAuth0();

    useEffect(() => {
        const headers = {
            'X-Auth-Token': 'd4ee753a174245c59ca450942d3e148d',
        };

        axios.get('https://api.football-data.org/v4/competitions/BSA/standings', { headers } )
            .then(response => {
                setChamponship(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const logout = async () => {
        console.log('logout');
        try {
          await clearSession();
        } catch (e) {
        //   Alert.alert('Error logout: ' + e);
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
            {champonship?.standings === undefined ? (
                <Text>Carregando...</Text>
            ) : 
            <View>
                <Text>Championship tabs</Text>
            </View>
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
  }
});