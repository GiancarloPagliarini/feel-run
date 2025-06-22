# Guia de Solução de Problemas - Erro 401

## 🚨 Erro 401: Unauthorized

O erro 401 indica que a autenticação com o Spotify não está funcionando corretamente. Aqui estão as soluções:

## 🔧 Soluções Passo a Passo

### 1. Verificar Configuração do Spotify Developer Dashboard

1. **Acesse** [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. **Selecione seu app** "Feel Run"
3. **Verifique as configurações**:
   - **Redirect URIs**: Deve conter `exp://localhost:8081`
   - **Client ID**: Deve estar correto no arquivo `src/config/spotify.ts`
   - **Client Secret**: Deve estar correto no arquivo `src/config/spotify.ts`

### 2. Verificar Credenciais no Código

Abra o arquivo `src/config/spotify.ts` e confirme:

```typescript
export const SPOTIFY_CONFIG = {
  CLIENT_ID: "SEU_CLIENT_ID_REAL", // ← Verifique se está correto
  CLIENT_SECRET: "SEU_CLIENT_SECRET_REAL", // ← Verifique se está correto
  REDIRECT_URI: "exp://localhost:8081",
  // ...
};
```

### 3. Testar Autenticação

1. **Use o modo Debug**:

   - Toque em "Debug (Temporário)" na tela de login
   - Toque em "Testar Conexão Spotify"
   - Verifique a mensagem de erro detalhada

2. **Verifique o console**:
   - Abra o console do Expo/React Native
   - Procure por mensagens de erro detalhadas

### 4. Problemas Comuns e Soluções

#### ❌ "Invalid client" ou "Invalid client_secret"

- **Causa**: Credenciais incorretas
- **Solução**: Verifique se copiou corretamente do Spotify Dashboard

#### ❌ "Invalid redirect_uri"

- **Causa**: URI de redirecionamento não configurado
- **Solução**: Adicione `exp://localhost:8081` no Spotify Dashboard

#### ❌ "Authorization code expired"

- **Causa**: Código de autorização expirou
- **Solução**: Tente fazer login novamente

#### ❌ "Invalid authorization code"

- **Causa**: Problema na troca do código por token
- **Solução**: Verifique se o Client Secret está correto

### 5. Configuração Completa do Spotify Dashboard

1. **Criar novo app** (se necessário):

   ```
   App name: Feel Run
   App description: Assistente de música para corrida
   Website: http://localhost:3000
   Redirect URI: exp://localhost:8081
   ```

2. **Adicionar Redirect URIs**:

   - `exp://localhost:8081`
   - `exp://192.168.1.X:8081` (seu IP local)
   - `exp://localhost:19000`

3. **Verificar permissões**:
   - O app deve ter acesso às permissões necessárias
   - Verifique se não há restrições de IP

### 6. Teste Manual da API

Você pode testar manualmente usando curl:

```bash
# 1. Obter código de autorização (faça login no navegador)
# 2. Trocar código por token
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=SEU_CODIGO&redirect_uri=exp://localhost:8081&client_id=SEU_CLIENT_ID&client_secret=SEU_CLIENT_SECRET" \
  https://accounts.spotify.com/api/token

# 3. Testar API com token
curl -H "Authorization: Bearer SEU_TOKEN" \
  https://api.spotify.com/v1/me
```

### 7. Soluções Alternativas

#### Usar IP Local

Se `localhost` não funcionar, tente usar seu IP local:

```typescript
REDIRECT_URI: "exp://192.168.1.X:8081", // Substitua X pelo seu IP
```

#### Verificar Rede

- Certifique-se de que está na mesma rede WiFi
- Tente desativar VPN se estiver usando

#### Limpar Cache

```bash
npx expo start --clear
```

### 8. Debug Avançado

Adicione logs detalhados no hook de autenticação:

```typescript
// Em src/hooks/useSpotifyAuth.ts
console.log("Auth URL:", authUrl);
console.log("Result:", result);
console.log("Code:", code);
console.log("Token Response:", tokenResponse);
```

### 9. Contato e Suporte

Se o problema persistir:

1. **Verifique os logs** do console
2. **Teste com um app simples** primeiro
3. **Consulte a documentação** do Spotify Web API
4. **Verifique se o Spotify Premium** está ativo

## ✅ Checklist de Verificação

- [ ] Credenciais corretas no `spotify.ts`
- [ ] Redirect URI configurado no Dashboard
- [ ] App criado no Spotify Developer Dashboard
- [ ] Permissões necessárias concedidas
- [ ] Spotify Premium ativo
- [ ] Rede estável
- [ ] Expo Go atualizado

## 🔄 Próximos Passos

Após resolver o erro 401:

1. **Teste a busca de músicas**
2. **Teste a adição à fila**
3. **Configure o BPM desejado**
4. **Inicie uma sessão de corrida**

---

**Se ainda tiver problemas, compartilhe os logs de erro detalhados para análise adicional.**
