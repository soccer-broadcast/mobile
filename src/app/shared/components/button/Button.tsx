import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import COLORS from '../../utils/colors';

export default function ButtonComponent( { pressed, title, ...rest }: {pressed: () => void, title: string} & TouchableOpacityProps ) {
    return (
        <TouchableOpacity style={styles.button} onPress={() => pressed()} activeOpacity={rest.activeOpacity} {...rest}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 50,
        backgroundColor: COLORS.dark_blue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily:  'Helvetica',
    }
})