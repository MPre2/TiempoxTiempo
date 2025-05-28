export const BADGES = {
  // Insignias de servicio
  SERVICE_PROVIDER: {
    id: 'service_provider',
    name: 'Proveedor de Servicios',
    description: 'Ofrece tu primer servicio',
    imageUrl: '/badges/service-provider.svg',
    category: 'service',
    requirements: {
      type: 'transactions',
      value: 1
    }
  },
  SERVICE_MASTER: {
    id: 'service_master',
    name: 'Maestro de Servicios',
    description: 'Completa 10 servicios',
    imageUrl: '/badges/service-master.svg',
    category: 'service',
    requirements: {
      type: 'transactions',
      value: 10
    }
  },

  // Insignias de comunidad
  COMMUNITY_BUILDER: {
    id: 'community_builder',
    name: 'Constructor de Comunidad',
    description: 'Recibe 5 reseñas positivas',
    imageUrl: '/badges/community-builder.svg',
    category: 'community',
    requirements: {
      type: 'reviews',
      value: 5
    }
  },
  COMMUNITY_LEADER: {
    id: 'community_leader',
    name: 'Líder de Comunidad',
    description: 'Alcanza una calificación de 4.5 o más',
    imageUrl: '/badges/community-leader.svg',
    category: 'community',
    requirements: {
      type: 'rating',
      value: 4.5
    }
  },

  // Insignias de tiempo
  TIME_SAVER: {
    id: 'time_saver',
    name: 'Ahorrador de Tiempo',
    description: 'Acumula 10 horas en tu banco de tiempo',
    imageUrl: '/badges/time-saver.svg',
    category: 'time',
    requirements: {
      type: 'hours',
      value: 10
    }
  },
  TIME_MASTER: {
    id: 'time_master',
    name: 'Maestro del Tiempo',
    description: 'Acumula 50 horas en tu banco de tiempo',
    imageUrl: '/badges/time-master.svg',
    category: 'time',
    requirements: {
      type: 'hours',
      value: 50
    }
  },

  // Insignias especiales
  EARLY_ADOPTER: {
    id: 'early_adopter',
    name: 'Adoptante Temprano',
    description: 'Únete a la plataforma en su primer mes',
    imageUrl: '/badges/early-adopter.svg',
    category: 'special',
    requirements: {
      type: 'join_date',
      value: 30 // días desde el lanzamiento
    }
  },
  PERFECT_STREAK: {
    id: 'perfect_streak',
    name: 'Racha Perfecta',
    description: 'Mantén una racha de actividad de 7 días',
    imageUrl: '/badges/perfect-streak.svg',
    category: 'special',
    requirements: {
      type: 'streak',
      value: 7
    }
  }
}; 