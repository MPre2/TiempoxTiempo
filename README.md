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
  - Redux Toolkit
  - Socket.IO Client
  - PWA (Progressive Web App)

- **Backend**:
  - Node.js
  - Express
  - Socket.IO
  - MongoDB
  - JWT Authentication

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- MongoDB
- Cuenta de Google Cloud (para autenticación)

## 🔧 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/tiempox-tiempo.git
   cd tiempox-tiempo
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto
   - Copia el contenido de `.env.example`
   - Completa las variables con tus credenciales

4. **Iniciar el servidor de desarrollo**:
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

## 🔐 Variables de Entorno

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=tu-client-id
VITE_SOCKET_URL=http://localhost:3000
```

## 📁 Estructura del Proyecto

```
tiempox-tiempo/
├── public/
│   ├── icons/          # Iconos de la PWA
│   └── manifest.json   # Configuración PWA
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── services/      # Servicios y APIs
│   ├── store/         # Estado global (Redux)
│   ├── types/         # Definiciones de TypeScript
│   └── utils/         # Utilidades y helpers
├── scripts/           # Scripts de utilidad
└── tests/            # Pruebas
```

## 🤝 Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Matias Presta** - *Desarrollo inicial* - [MPre2](https://github.com/MPre2)

## 🙏 Agradecimientos

- Material-UI por el increíble framework de componentes
- Socket.IO por la implementación de tiempo real
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
