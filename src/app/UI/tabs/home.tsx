import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import COLORS from "@/app/shared/utils/colors";
import { fetchAllChampionships } from "@/app/service/service-championship";

export default function Home() {

    const { data, isLoading, error} = useQuery({
        queryKey: ['championships'],
        queryFn: () => fetchAllChampionships(),
    });

    const iconsFav = [ '2ff7dec9-2bd5-4c23-9d94-ddb7d5ff9bf5', 'acdc645a-5a26-48eb-b94b-4a3e03a86e1d' ];

    return (
        <View style={styles.container}>
            { isLoading ? (
                <Text>Carregando...</Text>
            ) : 
                <View style={styles.container}>  
                    <Text style={styles.title}>Nossos campeonatos</Text>
                    {data && data?.map((item: any) => (
                        <View key={item.id} style={styles.cardChampionship}>
                            <Link href={{ pathname: './championship', params: { id: item.id }}} asChild>
                                <TouchableOpacity style={styles.buttonChampionship}>
                                    <View style={styles.imageChampionship}>
                                        <Image style={styles.imageChampionship} source={{ uri: JSON.parse(item.jsonFromExternalApi).logo }} contentFit="contain" />
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        { iconsFav.filter((id) => id === item.id).length > 0 ? (<Ionicons name="heart-sharp" size={24} color={COLORS.light_green} />) : <Ionicons name="heart-outline" size={24} color={COLORS.black} /> }
                                        <Text> {JSON.parse(item.jsonFromExternalApi).fase_atual.nome}</Text>
                                        <Text> Acesse a tabela</Text>
                                    </View>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    ))}
                </View> 
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 16,
      backgroundColor: COLORS.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardChampionship: {
        width: '100%',
        height: 100,
        padding: 16,
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
    buttonChampionship: {
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    imageChampionship: {
        width: 85,
        height: 85,
        marginRight: 16
    },
    title: {
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        marginBottom: 16
    }
});