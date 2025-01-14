import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import COLORS from "../../utils/colors";

type ButtonProps = TouchableOpacityProps & {
    title: string;
    width?: any;
    marginLeft?: number;
    marginTop?: number;
}

export default function ButtonCommon({ title, width = 100, marginLeft = 0, marginTop = 0, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity 
            {...rest}
            style={[styles.button, { width, marginLeft, marginTop }]} >
            <Text style={styles.text}>{title}</Text>
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