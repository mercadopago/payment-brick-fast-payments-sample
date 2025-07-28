# Fast Payments com Checkout Bricks

[English](README.md) / [Español](README.es.md)

> **Nota:** Fast Payments está disponível apenas para comerciantes selecionados. Estamos trabalhando para disponibilizá-lo para todos em breve.

## :computer: Tecnologias

- Node.js
- [NPM](https://www.npmjs.com) (gerenciador de dependências)
- Express

## 💡 Requisitos

- Node.js v20.11.1 ou superior (você pode baixá-lo [aqui](https://nodejs.org/)).
- [Leia nossas instruções](https://www.mercadopago.com/developers/pt/docs/getting-started) sobre como criar uma aplicação no Painel do Desenvolvedor Mercado Pago para obter sua chave pública e token de acesso. Eles concederão acesso às APIs públicas do Mercado Pago.

## :gear: Instalação

1. Clone o projeto.

```bash
git clone https://github.com/mercadopago/payment-brick-fast-payments-sample.git
```

2. Acesse a pasta do projeto.

```bash
cd payment-brick-fast-payments-sample
```

3. Em seguida, instale as dependências.

```bash
npm install
```

## 🌟 Como executar

Fast Payments está disponível apenas em dispositivos móveis. Portanto, para testar esta integração, você deve usar um emulador Android/iOS ou acessá-la diretamente do seu dispositivo móvel. Para facilitar o acesso ao conteúdo deste projeto nesses dispositivos, usaremos o localtunnel.

1. Execute o seguinte comando para iniciar a aplicação:

```bash
MERCADO_PAGO_SAMPLE_PUBLIC_KEY=SUA_CHAVE_PUBLICA MERCADO_PAGO_SAMPLE_ACCESS_TOKEN=SEU_TOKEN_DE_ACESSO npm start
```

Lembre-se de substituir os valores de `SUA_CHAVE_PUBLICA` e `SEU_TOKEN_DE_ACESSO` com as [credenciais](https://www.mercadopago.com/developers/panel) correspondentes da sua conta.

2. Execute o seguinte comando em uma nova janela do terminal para criar um túnel:
```bash
npm run localtunnel
```

3. Acesse a URL pública gerada pelo comando anterior através do seu dispositivo móvel ou emulador.

### :video_camera: Exemplo

https://github.com/user-attachments/assets/38d59b78-04f6-4b12-9f17-8ddc01428774

## :handshake: Contribuindo

Você pode contribuir para este projeto reportando problemas e bugs. Antes de abrir uma issue, certifique-se de ler nosso [código de conduta](CODE_OF_CONDUCT.md).

## :bookmark: Licença

Licença MIT. Copyright (c) 2025 - Mercado Pago <br/>
Para mais informações, veja o arquivo [LICENSE](LICENSE).
