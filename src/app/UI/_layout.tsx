import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

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
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="tabs" options={{ headerShown: false }} />
            </Stack>
        </QueryClientProvider>
    )
}