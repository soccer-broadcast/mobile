import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import COLORS from "../shared/utils/colors";

export default function RootLayout() {
    const MINUTE = 1000 * 60;

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 60 * MINUTE,
                staleTime: 59 * MINUTE
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{
                    title: "Cadastro",
                    headerLeft: () => (
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={COLORS.dark_blue}
                            onPress={() => router.back()}
                        />
                    )
                }} />
                <Stack.Screen name="tabs" options={{ headerShown: false }} />
            </Stack>
        </QueryClientProvider>
    )
}