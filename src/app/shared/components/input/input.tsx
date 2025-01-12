import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, View, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Controller, FieldError, FieldErrorsImpl, Merge, UseControllerProps } from 'react-hook-form';
import COLORS from '../../utils/colors';

export interface InputProps {
    secureTextEntry?: boolean;
    isRequired?: boolean;
    icon: keyof typeof Feather.glyphMap,
    inputProps: TextInputProps,
    formProps: UseControllerProps,
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>   
}

const InputComponent = forwardRef<TextInput, InputProps>(({ inputProps, icon, formProps, error } , ref) =>  {
    return (
        <Controller 
            name={formProps.name}
            control={formProps.control}
            rules={formProps.rules}

            render={({ field: { onChange, value } }) => (
                <View style={styles.container}>
                    <View style={[styles.group, { borderColor: error ? 'red' : COLORS.light_green }]}>
                        <View style={[styles.icon, { borderColor: error ? 'red' : COLORS.light_green }]} >
                            <Feather name={icon} size={24} color={error ? 'red' : COLORS.light_green} />
                        </View>
                        <TextInput
                            ref={ref}
                            style={styles.input}
                            placeholder={inputProps.placeholder}
                            secureTextEntry={inputProps.secureTextEntry}
                            onChangeText={onChange}
                            value={value}
                            {...inputProps}
                        />
                    </View>
                    {error && <Text style={styles.error}>{error as string}</Text>}
                </View>
            )}
        />
    )
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    group: {
        width: '100%',
        flexDirection: 'row',
        height: 46,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: COLORS.light_green, 
        borderWidth: 1,
        marginBottom: 15
    },
    icon: {
        width: 46,
        height: 46,
        overflow: 'hidden',
        borderRightWidth: 1,
        borderColor: COLORS.light_green,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        height: 46,
        padding: 16,
        backgroundColor:'#FFFFFF'
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 5
    }
});

export default InputComponent;