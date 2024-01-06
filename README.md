# **Finance AI**

## **Descripción**

Finance AI es una aplicación web desarrollada en React con TypeScript, diseñada para ayudar a los usuarios a rastrear sus gastos e ingresos. Utiliza un modelo de lenguaje de OpenAI (como GPT-3) para analizar las entradas de texto y categorizar las transacciones financieras. Los datos se almacenan y recuperan de Firestore, proporcionando una experiencia de usuario en tiempo real.

## **Características**

- **Entrada de Texto en Lenguaje Natural**: Los usuarios pueden escribir sus transacciones en lenguaje natural.
- **Categorización Automática**: Utiliza OpenAI API para categorizar las transacciones como ingresos o gastos.
- **Almacenamiento en Firestore**: Almacena y recupera transacciones desde Firebase Firestore.
- **Actualización en Tiempo Real**: La aplicación actualiza automáticamente la lista de transacciones cuando se agregan nuevas entradas.

## **Tecnologías Utilizadas**

- React (con TypeScript)
- Firebase Firestore
- OpenAI API
- Axios para llamadas a la API
- HTML/CSS para el diseño de la interfaz

## **Instalación**

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    
    ```bash
    git clone https://github.com/NoeOsorio/finance-ai.git
    ```
    
2. Instala las dependencias:
    
    ```bash
    cd finance-ai
    npm install
    ```
    
3. Configura las variables de entorno para Firebase y OpenAI API en un archivo **`.env`** en la raíz del proyecto.
4. Ejecuta la aplicación:
    
    ```bash
    npm start
    ```
    

## **Uso**

Una vez que la aplicación esté en ejecución, puedes:

- Ingresar detalles de tus transacciones en el campo de texto.
- Hacer clic en enviar para que la transacción se categorice y almacene.
- Ver la lista actualizada de transacciones en tiempo real.

## **Contribuir**

Si deseas contribuir a este proyecto, considera lo siguiente:

- Realiza un fork del repositorio.
- Crea una nueva rama para tus cambios.
- Envía un pull request con tus mejoras o correcciones.

> Contacto: business@noeosorio.com
>