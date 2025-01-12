import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import COLORS from "../../utils/colors";

type ButtonProps = TouchableOpacityProps & {
    title: string;
    width?: number;
    marginLeft?: number
}

export default function ButtonCommon({ title, width = 100, marginLeft = 0, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity 
            {...rest}
            style={[styles.button, { width, marginLeft }]} >
            <Text style={styles.text}> Sair</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: COLORS.light_green, 
        borderWidth: 1
    },
    text: {
        color: COLORS.dark_blue,
        fontSize: 17,
        fontFamily:  'Helvetica',
    }
})