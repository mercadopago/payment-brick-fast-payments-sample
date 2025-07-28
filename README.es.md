# Fast Payments con Checkout Bricks

[English](README.md) / [Português](README.pt.md)

> **Nota:** Fast Payments está disponible solo para comerciantes seleccionados. Estamos trabajando para hacerlo disponible para todos pronto.

## :computer: Tecnologías

- Node.js
- [NPM](https://www.npmjs.com) (gestor de dependencias)
- Express

## 💡 Requisitos

- Node.js v20.11.1 o superior (puedes descargarlo [aquí](https://nodejs.org/)).
- [Lee nuestras instrucciones](https://www.mercadopago.com/developers/es/docs/getting-started) sobre cómo crear una aplicación en el Panel de Desarrolladores de Mercado Pago para obtener tu clave pública y token de acceso. Estos te darán acceso a las APIs públicas de Mercado Pago.

## :gear: Instalación

1. Clona el proyecto.

```bash
git clone https://github.com/mercadopago/payment-brick-fast-payments-sample.git
```

2. Ve a la carpeta del proyecto.

```bash
cd payment-brick-fast-payments-sample
```

3. Luego instala las dependencias.

```bash
npm install
```

## 🌟 Cómo ejecutarlo

Fast Payments solo están disponibles en dispositivos móviles. Por lo tanto, para probar esta integración, debes usar un emulador Android/iOS o acceder directamente desde tu dispositivo móvil. Para facilitar el acceso al contenido de este proyecto en estos dispositivos, usaremos localtunnel.

1. Ejecuta el siguiente comando para iniciar la aplicación:

```bash
MERCADO_PAGO_SAMPLE_PUBLIC_KEY=TU_CLAVE_PUBLICA MERCADO_PAGO_SAMPLE_ACCESS_TOKEN=TU_TOKEN_DE_ACCESO npm start
```

Recuerda reemplazar los valores de `TU_CLAVE_PUBLICA` y `TU_TOKEN_DE_ACCESO` con las [credenciales](https://www.mercadopago.com/developers/panel) correspondientes de tu cuenta.

2. Ejecuta el siguiente comando en una nueva ventana de terminal para crear un túnel:
```bash
npm run localtunnel
```

3. Accede a la URL pública generada por el comando anterior a través de tu dispositivo móvil o emulador.

### :video_camera: Ejemplo

https://github.com/user-attachments/assets/38d59b78-04f6-4b12-9f17-8ddc01428774

## :handshake: Contribuyendo

Puedes contribuir a este proyecto reportando problemas y bugs. Antes de abrir un issue, asegúrate de leer nuestro [código de conducta](CODE_OF_CONDUCT.md).

## :bookmark: Licencia

Licencia MIT. Copyright (c) 2025 - Mercado Pago <br/>
Para más información, consulta el archivo [LICENSE](LICENSE).
