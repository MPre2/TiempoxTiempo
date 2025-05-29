# Tiempo x Tiempo

Tiempo x Tiempo es una plataforma innovadora que permite a los usuarios intercambiar servicios basados en tiempo, creando una economía colaborativa donde el tiempo es la moneda principal.

## 🌟 Características Principales

- **Intercambio de Servicios**: Ofrece y solicita servicios basados en tiempo
- **Sistema de Créditos**: Gana y gasta créditos de tiempo
- **Gamificación**: Sistema de niveles, insignias y logros
- **Chat en Tiempo Real**: Comunicación instantánea entre usuarios
- **Notificaciones**: Alertas en tiempo real de mensajes y actualizaciones
- **PWA**: Instalable en cualquier dispositivo
- **Modo Offline**: Funcionalidad básica sin conexión a internet

## 🚀 Tecnologías Utilizadas

- **Frontend**:
  - React + TypeScript
  - Vite
  - Material-UI (MUI)
  - React Router
  - Firebase (Authentication, Firestore, Cloud Messaging)
  - PWA (Progressive Web App)

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Firebase

## 🔧 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/MPre2/tiempoxtiempo.git
   cd tiempoxtiempo
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Firebase**:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Authentication con Email/Password
   - Crea una base de datos en Firestore
   - Habilita Cloud Messaging para las notificaciones
   - Obtén las credenciales de configuración

4. **Configurar variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto
   - Copia el contenido de `.env.example`
   - Completa las variables con tus credenciales de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu-api-key
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
   VITE_FIREBASE_APP_ID=tu-app-id
   VITE_FIREBASE_VAPID_KEY=tu-vapid-key
   ```

5. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

## 🛠️ Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter
- `npm run test`: Ejecuta las pruebas

## 📱 Instalación como PWA

1. Abre la aplicación en Chrome o Edge
2. Haz clic en el icono de instalación en la barra de direcciones
3. Sigue las instrucciones para instalar la aplicación

## 📁 Estructura del Proyecto

```
tiempoxtiempo/
├── public/
│   ├── icons/          # Iconos de la PWA
│   └── manifest.json   # Configuración PWA
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── config/        # Configuración de Firebase
│   ├── contexts/      # Contextos de React
│   ├── hooks/         # Hooks personalizados
│   ├── pages/         # Páginas de la aplicación
│   ├── services/      # Servicios de Firebase
│   ├── types/         # Definiciones de TypeScript
│   └── utils/         # Utilidades y helpers
```

## 🤝 Contribuir

1. Revisa los [issues existentes](https://github.com/MPre2/tiempoxtiempo/issues)
2. Haz un Fork del proyecto
3. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Matias Presta** - *Desarrollo inicial* - [MPre2](https://github.com/MPre2)

## 🙏 Agradecimientos

- Firebase por su excelente suite de servicios
- Material-UI por el increíble framework de componentes
- La comunidad de React por su excelente documentación

## 📞 Soporte

Si encuentras algún problema o tienes alguna sugerencia, por favor:
1. Revisa los [issues existentes](https://github.com/MPre2/tiempoxtiempo/issues)
2. Crea un nuevo issue si es necesario

## 🔄 Actualizaciones Futuras

- [ ] Implementación de sistema de pagos
- [ ] Integración con redes sociales
- [ ] Sistema de recomendaciones
- [ ] Aplicación móvil nativa
