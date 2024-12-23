import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import { COLORS } from '../../utils/color-system';
import { FONTS } from '../../utils/fonts-system';

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
        backgroundColor: COLORS.blue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: FONTS.regular,
    }
})