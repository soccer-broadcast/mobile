import { Tabs } from "expo-router";
import IonIcons  from "@expo/vector-icons/Ionicons" 
import { View } from "react-native";

export default function Layout() {
    return(
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen
                name="home"
                options={{ href: './home', title: "Home", headerShown: false,
                    tabBarIcon: ( { focused }) => (
                        <View>
                             <IonIcons
                                 name={focused ? "home-sharp" : "home-outline"}
                                 size={30}
                                 color={focused ? '#1E90FF': "#000000"}
                             />  
                         </View>
                     ),
                 }}
            />
            <Tabs.Screen
                name="championship"
                options={{ href: './championship', title: "Campeonato", headerShown: false,
                    tabBarIcon: ( { focused }) => (
                       <View>
                            <IonIcons
                                name={focused ? "trophy-sharp" : "trophy-outline"}
                                size={30}
                                color={focused ? '#1E90FF': "#000000"}
                            />  
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="user"
                options={{ href: './user', title: "Usuário", headerShown: false,
                    tabBarIcon: ( { focused }) => (
                        <View>
                             <IonIcons
                                 name={focused ? "person-sharp" : "person-outline"}
                                 size={30}
                                 color={focused ? '#1E90FF': "#000000"}
                             />  
                         </View>
                     ),
                 }}
            />
        </Tabs>
    )
}