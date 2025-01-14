import { useRef } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";

import InputComponent from "../shared/components/input/input";
import COLORS from "../shared/utils/colors";
import ButtonComponent from "../shared/components/button/Button";
import { fetchSignup } from "../service/service-login";

export default function SignUp() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const emailRef = useRef<TextInput>(null);
    const nameRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const passwordConfirmationRef = useRef<TextInput>(null);

    const passwordValue = watch('password');

    const onSignup = async (data: any) => {
        const { name, login, password } = data;

        try {
            const res = await fetchSignup({ login, password, name });
            if(res) {
                Alert.alert('Cadastro', 'Cadastro efetuado com sucesso');
                router.back();
            }
          } catch (error) {    
            Alert.alert('Cadastro', 'Erro ao cadastrar');
          }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Criar cadastro</Text>
            <InputComponent 
                icon='user' 
                ref={nameRef} 
                error={errors.login?.message}
                inputProps={{
                    secureTextEntry: false,
                    placeholder: 'Nome',
                }}
                formProps={{
                    name: 'name',
                    control,
                    rules: {
                    required: 'Nome é obrigatório',
                    }
                }} 
            />
            <InputComponent 
                icon='mail' 
                ref={emailRef} 
                error={errors.login?.message}
                inputProps={{
                    secureTextEntry: false,
                    placeholder: 'Email',
                    autoCapitalize: 'none',
                }}
                formProps={{
                    name: 'login',
                    control,
                    rules: {
                    required: 'Email é obrigatório',
                    }
                }} 
            />
            <InputComponent 
                icon='lock' 
                ref={passwordRef}
                error={errors.password?.message}
                inputProps={{
                    secureTextEntry: true,
                    placeholder: 'Senha',
                    // autoCapitalize: 'none'
                }}
                formProps={{
                    name: 'password',
                    control,
                    rules: {
                        required: 'Senha é obrigatório',
                    }
                }}
            />
            <InputComponent 
                icon='lock' 
                ref={passwordConfirmationRef}
                error={errors.passwordConfirmationRef?.message}
                inputProps={{
                    secureTextEntry: true,
                    placeholder: 'Confirme a Senha',
                    // autoCapitalize: 'none',
                }}
                formProps={{
                    name: 'passwordConfirmation',
                    control,
                    rules: {
                        required: 'Confimração de senha é obrigatório',
                        validate: (value) => value === passwordValue || 'Tem que serem igual a sua senha.',
                    }
                }}
            />
            <ButtonComponent onPress={handleSubmit(onSignup)} title='Cadastrar' activeOpacity={0.5} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: COLORS.white
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    }
});