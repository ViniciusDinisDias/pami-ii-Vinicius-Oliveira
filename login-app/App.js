import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Box } from './components/ui/box';
import { Center } from './components/ui/center';
import { Text } from './components/ui/text';
import { Input, InputField } from './components/ui/input';
import { Button, ButtonText } from './components/ui/button';
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import "./global.css"; 

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    alert(`Entrando com: ${email}`);
  };

  return (
    <GluestackUIProvider mode="light">
      <Center className="flex-1 bg-slate-50 p-4">
        <StatusBar style="auto" />
        
        {/* Container do Formulário */}
        <Box className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
          
          {/* Componente 1: Text */}
          <Text className="text-3xl font-bold text-slate-800 text-center mb-2">
            Login
          </Text>
          <Text className="text-sm text-slate-400 text-center mb-6">
            Insira suas credenciais para acessar
          </Text>

          {/* Componente 2: Input de E-mail */}
          <Box className="mb-4">
            <Text className="text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              E-mail
            </Text>
            <Input size="md" variant="outline" className="rounded-xl h-12 border-slate-200 focus:border-blue-500">
              <InputField 
                placeholder="exemplo@email.com" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-slate-700"
              />
            </Input>
          </Box>

          {/* Componente 2: Input de Senha */}
          <Box className="mb-6">
            <Text className="text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              Senha
            </Text>
            <Input size="md" variant="outline" className="rounded-xl h-12 border-slate-200 focus:border-blue-500">
              <InputField 
                placeholder="Digite sua senha" 
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
                className="text-slate-700"
              />
            </Input>
          </Box>

          {/* Componente 3: Button */}
          <Button size="md" variant="solid" action="primary" className="rounded-xl h-12 bg-blue-600 active:bg-blue-700" onPress={handleLogin}>
            <ButtonText className="text-white font-bold text-base">Entrar</ButtonText>
          </Button>

        </Box>
      </Center>
    </GluestackUIProvider>
  );
}