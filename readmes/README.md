# Feel Run - Assistente de Música para Corrida

Um aplicativo React Native que adiciona automaticamente músicas à fila do Spotify baseado no BPM (batimentos por minuto) ideal para corrida.

## 🏃 Funcionalidades

- 🎯 **BPM Personalizado**: Selecione o BPM ideal para seu ritmo de corrida (130-180 BPM)
- 🔄 **Adição Automática**: Músicas são adicionadas automaticamente à fila a cada minuto
- 🎵 **Busca Inteligente**: Encontra músicas com BPM similar ao selecionado
- 📱 **Interface Intuitiva**: Design moderno e fácil de usar durante a corrida
- 🔐 **Autenticação Spotify**: Conexão segura com sua conta do Spotify
- 📊 **Status em Tempo Real**: Acompanhe músicas adicionadas e BPM atual

## 🚀 Como Funciona

1. **Conecte-se ao Spotify**: Autorize o app para acessar sua conta
2. **Selecione seu BPM**: Escolha o BPM ideal para seu ritmo de corrida
3. **Toque em "COMEÇAR"**: Inicie a sessão de corrida
4. **Corra e Aproveite**: O app adiciona músicas automaticamente à sua fila a cada minuto

## ⚙️ Configuração

### 1. Criar App no Spotify Developer Dashboard

1. Acesse [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Faça login com sua conta do Spotify
3. Clique em "Create App"
4. Preencha as informações:
   - **App name**: Feel Run
   - **App description**: Assistente de música para corrida baseado em BPM
   - **Website**: `http://localhost:3000`
   - **Redirect URI**: `exp://localhost:8081`
   - **API/SDKs**: Web API
5. Clique em "Save"

### 2. Configurar Credenciais

1. Copie o **Client ID** e **Client Secret** do seu app
2. Abra o arquivo `src/config/spotify.ts`
3. Substitua os valores:
   ```typescript
   CLIENT_ID: 'SEU_CLIENT_ID_AQUI',
   CLIENT_SECRET: 'SEU_CLIENT_SECRET_AQUI',
   ```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar o Projeto

```bash
npm start
```

## 🎵 Guia de BPM para Corrida

| BPM     | Tipo de Corrida  | Intensidade                  |
| ------- | ---------------- | ---------------------------- |
| 130-140 | Corrida Leve     | Aquecimento, recuperação     |
| 140-150 | Corrida Moderada | Resistência, longa distância |
| 150-160 | Corrida Intensa  | Treino de velocidade         |
| 160-170 | Sprint           | Alta intensidade             |
| 170-180 | Competição       | Máximo esforço               |

## 📱 Como Usar

1. **Primeira Execução**:

   - Toque em "Conectar com Spotify"
   - Autorize o acesso na tela do Spotify
   - Retorne ao app

2. **Configurar Sessão**:

   - Selecione o BPM ideal para sua corrida
   - Toque em "COMEÇAR" para iniciar
   - Confirme a ação no popup

3. **Durante a Corrida**:

   - Mantenha o Spotify aberto e tocando música
   - O app adicionará músicas automaticamente a cada minuto
   - Acompanhe o status na tela

4. **Finalizar**:
   - Toque em "PARAR SESSÃO" quando terminar
   - Confirme a ação no popup

## 🔧 Requisitos

- **Spotify Premium**: Necessário para adicionar músicas à fila
- **Spotify Ativo**: Deve estar aberto e tocando música no dispositivo
- **Conexão com Internet**: Para buscar e adicionar músicas
- **Dispositivo Móvel**: Otimizado para uso durante corrida

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework mobile
- **Expo**: Plataforma de desenvolvimento
- **TypeScript**: Linguagem de programação
- **NativeWind**: Estilização com Tailwind CSS
- **Spotify Web API**: Integração com Spotify
- **Expo Auth Session**: Autenticação OAuth

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── index.tsx              # Tela principal
├── components/
│   └── RunningSession.tsx     # Componente principal de corrida
├── config/
│   └── spotify.ts             # Configurações do Spotify
├── hooks/
│   ├── useSpotifyAuth.ts      # Hook de autenticação
│   └── useRunningSession.ts   # Hook da sessão de corrida
└── services/
    ├── spotifyService.ts      # Serviço da API do Spotify
    └── authService.ts         # Serviço de autenticação
```

## 🔐 Permissões Necessárias

O app solicita as seguintes permissões do Spotify:

- `user-read-private`: Ler informações do perfil
- `user-read-email`: Ler email do usuário
- `user-modify-playback-state`: Modificar estado de reprodução
- `user-read-playback-state`: Ler estado de reprodução
- `user-read-currently-playing`: Ler música atual
- `user-read-recently-played`: Ler músicas recentes
- `user-top-read`: Ler músicas favoritas
- `streaming`: Reproduzir música

## 🚨 Solução de Problemas

### Erro ao adicionar músicas à fila

- ✅ Certifique-se de que o Spotify está aberto
- ✅ Verifique se há uma música tocando
- ✅ Confirme que você tem Spotify Premium
- ✅ Verifique sua conexão com a internet

### Erro de autenticação

- ✅ Verifique se as credenciais estão corretas
- ✅ Confirme se o Redirect URI está configurado
- ✅ Tente fazer logout e login novamente

### Músicas não encontradas para o BPM

- ✅ O app usa fallback para playlists de corrida
- ✅ Verifique se o BPM selecionado é adequado
- ✅ Tente um BPM diferente

## 🔮 Próximas Funcionalidades

- [ ] Integração com monitor cardíaco em tempo real
- [ ] Histórico de sessões de corrida
- [ ] Estatísticas de performance
- [ ] Playlists personalizadas por usuário
- [ ] Modo offline com músicas pré-carregadas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido para atletas que amam música e corrida! 🏃‍♂️🎵**
