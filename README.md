# API de URLs Pré-assinadas AWS S3

Esta API permite gerar URLs pré-assinadas para objetos armazenados no Amazon S3, facilitando o acesso temporário a arquivos privados sem a necessidade de autenticação adicional.

## Funcionalidades

- Geração de URLs pré-assinadas para objetos no S3
- Interface web simples para testar a geração de URLs
- Configuração flexível através de variáveis de ambiente

## Requisitos

- Node.js (versão 14 ou superior)
- Conta AWS com acesso ao serviço S3
- Bucket S3 configurado

## Instalação

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Copie o arquivo `.env.example` para `.env` e configure suas credenciais AWS:
   ```
   cp .env.example .env
   ```
4. Edite o arquivo `.env` com suas credenciais AWS e configurações

## Uso

### Iniciar o servidor

```
npm start
```

Ou para desenvolvimento com recarga automática:

```
npm run dev
```

### Endpoints da API

- `GET /`: Rota de teste para verificar se a API está funcionando
- `POST /generate-presigned-url`: Gera uma URL pré-assinada para um objeto no S3
  - Corpo da requisição: `{ "key": "caminho/do/arquivo.ext" }`
  - Resposta: `{ "url": "https://url-pre-assinada" }`

### Interface Web

Acesse `http://localhost:3000` para utilizar a interface web que permite testar a geração de URLs pré-assinadas.

## Segurança

- Nunca compartilhe ou cometa suas credenciais AWS no controle de versão
- As URLs pré-assinadas têm validade de 1 hora por padrão
- Utilize políticas de IAM adequadas para limitar o acesso aos recursos do S3

## Licença

MIT