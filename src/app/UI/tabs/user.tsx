import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { router } from 'expo-router';

import { getValueStorage, removeStorage } from "@/app/service/service-storage";
import { fetchAllChampionships } from "@/app/service/service-championship";
import { fetchDataUser, updateDataUser } from "@/app/service/service-user";
import COLORS from "@/app/shared/utils/colors";
import ButtonCommon from "@/app/shared/components/button/Button-common";

export default function User() {
    const [ userData, setUserData ] = useState<any>();
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
          const { id } = await JSON.parse(await getValueStorage('user') as string);
          return fetchDataUser(id)
        }
    });

    const allChampionships = useQuery({
        queryKey: ['allChampionships'],
        queryFn: () => fetchAllChampionships(),
    });

    const addFavoriteChampionship = (id: string) => {
        if(data.favoriteChampionship === null) {
            data.favoriteChampionship = [];
        }

        const alreadyAdded = data.favoriteChampionship.filter((item: any) => item.id === id);

        (alreadyAdded.length > 0) ? data.favoriteChampionship = data?.favoriteChampionship.filter((item: any) => item.id !== id) : data.favoriteChampionship.push(allChampionships.data.find((item: any) => item.id === id))

        const user = {
            id: data?.id,
            name: data?.name,
            login: data?.login,
            favoriteChampionship: JSON.stringify(data.favoriteChampionship)
        };

        updateUser(user, alreadyAdded);
    }

    const updateUser = async (user: any, alreadyAdded: any[]) => {
        setUserData(user);
        updateDataUser(user).then(() => {
            if ( alreadyAdded.length > 0 ) {
                Alert.alert(`Campeonato`, `${alreadyAdded[0].name} removido com sucesso`);
                return;
            }
            
            Alert.alert('Campeonato', 'Favorito adicionado com sucesso');
        }).catch((error) => {
            console.log('error');
        });
    }

    const isFavorite = (id: string) => {
        if(!data?.favoriteChampionship) {
            return false;
        }

        return data?.favoriteChampionship.find((item: any) => item.id === id);
    }

    const onLogout = () => {
        removeStorage('token');
        router.replace("../login");
    }

    useEffect(() => {
        setUserData(data);
    }, [userData]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}> Informações do Usuário</Text>
            <View style={styles.card}>
                <Image style={styles.imageUserContainer} source={{ uri: 'https://placehold.co/50x50/png' }} contentFit="contain" />
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.text}> { data?.name }</Text>
                    <Text style={styles.text}> { data?.login }</Text>
                    <ButtonCommon title="Sair" activeOpacity={0.5} onPress={onLogout} width={150} marginLeft={8} />
                </View>
            </View>

            <View style={[styles.card, { flexDirection: 'column' }]}>
                <Text style={styles.text}> Campeonato(s) Favorito(s)</Text>

                { allChampionships?.data?.map((item: any, index: number) => (
                    <View key={index} style={[styles.card, { width: 200, backgroundColor: isFavorite(item.id) ? COLORS.green : COLORS.white }]}>
                        <TouchableOpacity style={[styles.buttonFavorite ]} onPress={() => addFavoriteChampionship(item.id)}>
                            <Image style={{width: 50, height: 50}} source={{ uri: JSON.parse(item.jsonFromExternalApi).logo }} contentFit="contain" />
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={styles.text}> { item.name }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )) }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 16,
      backgroundColor:'#FFFFFF',
    },
    title: {
        fontWeight: 'bold', 
        margin: 16,
        fontSize: 20
    },
    card: {
        width: 314,
        padding: 16,
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 5,
        shadowColor: COLORS.black,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: COLORS.white
    },
    imageUserContainer: {
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        marginRight: 16
    },
    text: {
        fontSize: 16,
        margin: 4
    },
    buttonFavorite: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    }
});