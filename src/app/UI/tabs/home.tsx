import { fetchAllChampionships } from "@/app/service/service-championship";
import COLORS from "@/app/shared/utils/colors";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Home() {

    const { data, isLoading, error} = useQuery({
        queryKey: ['championships'],
        queryFn: () => fetchAllChampionships(),
    });

    return (
            
        <View style={styles.container}>
            { isLoading ? (
                <Text>Carregando...</Text>
            ) : 
                <>
                    {data && data?.map((item: any) => (
                        <View key={item.id} style={styles.cardChampionship}>
                            <Link href={{ pathname: './championship', params: { id: item.id }}} asChild>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text>{JSON.parse(item.jsonFromExternalApi).edicao_atual.nome_popular}</Text>
                                    <Image source={{ uri: JSON.parse(item.jsonFromExternalApi).edicao_atual.logo }} />
                                </TouchableOpacity>
                            </Link>
                        </View>
                    ))}
                </> 
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
        elevation: 5
    }
});