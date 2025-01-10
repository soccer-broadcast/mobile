import React, { useState } from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Controller, UseControllerProps } from 'react-hook-form';

export interface InputProps {
    placeholder: string;
    secureTextEntry?: boolean;
    isRequired?: boolean;
    icon: keyof typeof Feather.glyphMap,
    inputProps?: TextInputProps,
    formProps?: UseControllerProps
}

export default function InputComponent({ placeholder, secureTextEntry, inputProps, icon, formProps }: InputProps) {
    const [value, setValue] = useState('');

    return (
        <Controller 
            render={({ field }) => (
                <View style={styles.group}>
                    <View style={styles.icon} >
                        <Feather name={icon} size={24} color="black" />
                    </View>
                    <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={field.onChange}
                    value={field.value}
                    {...inputProps}
                />
                </View>
            )}
            {...formProps}
        />
    )
}

const styles = StyleSheet.create({
    group: {
        width: '100%',
        flexDirection: 'row',
        height: 46,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 20
    },
    icon: {
        width: 46,
        height: 46,
        overflow: 'hidden',
        borderRightWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        height: 46,
        padding: 16,
        backgroundColor:'#FFFFFF'
    }
});