import { Text, StyleSheet, Animated, View } from "react-native";
import { useEffect, useState } from "react";

import COLORS from '@/app/shared/utils/colors';

export interface HeaderComponentProps {
    imageSource: string;
    title: string;
    headerScrollHeight: Animated.AnimatedInterpolation<string | number>;
    imageScaleHight: Animated.AnimatedInterpolation<string | number>;
}

export default function HeaderComponent({ imageSource, title, headerScrollHeight, imageScaleHight }: HeaderComponentProps) {
    const [ isRow, setIsRow ] = useState<boolean>(false);
    const [ currentOffset, setCurrentOffset ] = useState<number>(0);
    
    useEffect(() => {
        const listener = headerScrollHeight.addListener((event) => {
            const currentOffset = event.value;

            (currentOffset > 100)? setIsRow(false) : setIsRow(true);
            setCurrentOffset(currentOffset);
        });

        return () => { headerScrollHeight.removeListener(listener); };
    }, [isRow, headerScrollHeight, imageScaleHight]);

    return (
        <Animated.View 
            key={isRow ? 'row' : 'column'}
            style={[
                {   width: '100%',
                    height: headerScrollHeight,
                    backgroundColor: COLORS.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            ]}>
            
                <View style={styles.container}>
                { (!isRow ) && (
                    <Animated.Image source={{uri: imageSource}} style={{
                            width: imageScaleHight,
                            height: imageScaleHight
                        }} resizeMode="contain"/>
                    )}
                    <Text style={styles.title}>{title}</Text>
                </View>
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
    title: {
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 'bold'
    }
});
