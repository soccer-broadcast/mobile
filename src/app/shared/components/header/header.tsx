import { View, Text, StyleSheet, Animated } from "react-native";
import { Image } from 'expo-image';
import COLORS from '@/app/shared/components/utils/colors';
import { useEffect, useRef, useState } from "react";

export interface HeaderComponentProps {
    imageSource: string;
    title: string;
    headerScrollHeight: Animated.AnimatedInterpolation<string | number>;
}

export default function HeaderComponent({ imageSource, title, headerScrollHeight }: HeaderComponentProps) {
    const [ isRow, setIsRow ] = useState<boolean>(false);
    
    useEffect(() => {
        const listener = headerScrollHeight.addListener((event) => {
            const currentOffset = event.value;

            (currentOffset > 100)? setIsRow(false) : setIsRow(true);
        });

        return () => { headerScrollHeight.removeListener(listener); };
    }, [isRow]);

    return (
        <Animated.View 
            key={isRow ? 'row' : 'column'}
            style={[
                {   width: '100%',
                    height: headerScrollHeight,
                    backgroundColor: COLORS.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: isRow ? 'row' : 'column'
                },
            ]}>
            <Image source={imageSource} style={styles.logo} contentFit="contain"/>
            <Text>{title}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 150,
    }
});
