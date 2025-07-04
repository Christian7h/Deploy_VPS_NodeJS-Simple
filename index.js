const express = require('express');
const app = express();
const cors = require('cors');

// Middleware para JSON
app.use(express.json());
const allowedOrigin = 'http://localhost:5173';

// Sistema de caché simple en memoria
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en millisegundos

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin === allowedOrigin && req.path.startsWith('/brands')) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  }

  next();
});
// Middleware para medir tiempo de respuesta
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
});

// Middleware de caché
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  
  if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
    console.log(`Cache HIT para ${key}`);
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('X-Response-Time', '0ms');
    return res.json(cachedResponse.data);
  }
  
  console.log(`Cache MISS para ${key}`);
  res.setHeader('X-Cache', 'MISS');
  
  // Interceptar la respuesta para cachearla
  const originalJson = res.json;
  res.json = function(data) {
    // Guardar en caché
    cache.set(key, {
      data: data,
      timestamp: Date.now()
    });
    
    // Enviar respuesta original
    originalJson.call(this, data);
  };
  
  next();
};

// Datos de las marcas
const brands = [
  {
    id: 'bmw',
    name: 'BMW',
    description: 'The Ultimate Driving Machine',
    foundation: 1916,
    history: "Bayerische Motoren Werke AG, founded in Munich as an aircraft engine manufacturer. Transitioned to motorcycles (1923) and automobiles (1928).",
    trajectory: "Pioneer in electric mobility with the i-Series. Multiple victories in touring car championships.",
    translations: {
      es: {
        name: 'BMW',
        description: 'La máquina de conducir definitiva',
        foundation: '1916',
        history: "Bayerische Motoren Werke AG, fundada en Múnich como fabricante de motores para aviones. Transición a motocicletas (1923) y automóviles (1928).",
        trajectory: "Pionera en movilidad eléctrica con la serie i. Múltiples victorias en campeonatos de turismos."
      },
      en: {
        name: 'BMW',
        description: 'The Ultimate Driving Machine',
        foundation: '1916',
        history: "Bayerische Motoren Werke AG, founded in Munich as an aircraft engine manufacturer. Transitioned to motorcycles (1923) and automobiles (1928).",
        trajectory: "Pioneer in electric mobility with the i-Series. Multiple victories in touring car championships."
      }
    }
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    description: 'The Best or Nothing',
    foundation: 1926,
    history: "Formed by merger of Benz & Cie and Daimler-Motoren-Gesellschaft. Name origin from Mercedes Jellinek, daughter of an important business partner.",
    trajectory: "Inventor of the first gasoline-powered car (1886). Leader in safety innovations like ABS and airbags.",
    translations: {
      es: {
        name: 'Mercedes-Benz',
        description: 'Lo mejor o nada',
        foundation: '1926',
        history: "Nace de la fusión de Benz & Cie y Daimler-Motoren-Gesellschaft. El nombre Mercedes proviene de Mercedes Jellinek, hija de un importante socio comercial.",
        trajectory: "Inventor del primer automóvil a gasolina (1886). Líder en innovaciones de seguridad como ABS y airbags."
      },
      en: {
        name: 'Mercedes-Benz',
        description: 'The Best or Nothing',
        foundation: '1926',
        history: "Formed by merger of Benz & Cie and Daimler-Motoren-Gesellschaft. Name origin from Mercedes Jellinek, daughter of an important business partner.",
        trajectory: "Inventor of the first gasoline-powered car (1886). Leader in safety innovations like ABS and airbags."
      }
    }
  },
  {
    id: 'audi',
    name: 'Audi',
    description: 'Progress through Technology',
    foundation: 1909,
    history: "Founded by August Horch. Name 'Audi' comes from Latin translation of Horch ('listen'). Merged with Horch, DKW and Wanderer to form Auto Union (1932).",
    trajectory: "Pioneer in quattro all-wheel drive system. Multiple Le Mans 24h victories with diesel and hybrid technology.",
    translations: {
      es: {
        name: 'Audi',
        description: 'Progreso a través de la tecnología',
        foundation: '1909',
        history: "Fundada por August Horch. El nombre 'Audi' viene de la traducción al latín de Horch ('escuchar'). Fusión con Horch, DKW y Wanderer para formar Auto Union (1932).",
        trajectory: "Pionero en sistema de tracción total quattro. Múltiples victorias en las 24 Horas de Le Mans con tecnología diésel e híbrida."
      },
      en: {
        name: 'Audi',
        description: 'Progress through Technology',
        foundation: '1909',
        history: "Founded by August Horch. Name 'Audi' comes from Latin translation of Horch ('listen'). Merged with Horch, DKW and Wanderer to form Auto Union (1932).",
        trajectory: "Pioneer in quattro all-wheel drive system. Multiple Le Mans 24h victories with diesel and hybrid technology."
      }
    }
  },
  {
    id: 'porsche',
    name: 'Porsche',
    description: 'There is no substitute',
    foundation: 1931,
    history: "Founded by Ferdinand Porsche, designer of the original Volkswagen Beetle. First model: Porsche 64 (1938).",
    trajectory: "Dominance in endurance racing with 19 overall wins at Le Mans. Iconic 911 in continuous production since 1963.",
    translations: {
      es: {
        name: 'Porsche',
        description: 'No hay sustituto',
        foundation: '1931',
        history: "Fundada por Ferdinand Porsche, diseñador del Volkswagen Beetle original. Primer modelo: Porsche 64 (1938).",
        trajectory: "Dominio en resistencia con 19 victorias en Le Mans. El icónico 911 en producción continua desde 1963."
      },
      en: {
        name: 'Porsche',
        description: 'There is no substitute',
        foundation: '1931',
        history: "Founded by Ferdinand Porsche, designer of the original Volkswagen Beetle. First model: Porsche 64 (1938).",
        trajectory: "Dominance in endurance racing with 19 overall wins at Le Mans. Iconic 911 in continuous production since 1963."
      }
    }
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    description: 'Ferrari. Racing. Since 1947.',
    foundation: 1947,
    history: "Founded by Enzo Ferrari after leaving Alfa Romeo. First road car: 125 S (1947). Iconic prancing horse logo from WWI flying ace Francesco Baracca.",
    trajectory: "Most successful F1 team in history. Creator of legendary supercars like F40, Enzo, and LaFerrari.",
    translations: {
      es: {
        name: 'Ferrari',
        description: 'Ferrari. Carreras. Desde 1947.',
        foundation: '1947',
        history: "Fundada por Enzo Ferrari tras dejar Alfa Romeo. Primer auto de calle: 125 S (1947). Logo del caballo rampante del as de la aviación Francesco Baracca.",
        trajectory: "Equipo más exitoso en la historia de la F1. Creador de superdeportivos legendarios como F40, Enzo y LaFerrari."
      },
      en: {
        name: 'Ferrari',
        description: 'Ferrari. Racing. Since 1947.',
        foundation: '1947',
        history: "Founded by Enzo Ferrari after leaving Alfa Romeo. First road car: 125 S (1947). Iconic prancing horse logo from WWI flying ace Francesco Baracca.",
        trajectory: "Most successful F1 team in history. Creator of legendary supercars like F40, Enzo, and LaFerrari."
      }
    }
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    description: 'Power, beauty and soul',
    foundation: 1963,
    history: "Founded by Ferruccio Lamborghini as response to Enzo Ferrari. First car: 350 GT (1964). Miura (1966) defined the supercar category.",
    trajectory: "Revolutionized design with scissor doors (Countach). Current leader in V12 supercars with Aventador and Revuelto.",
    translations: {
      es: {
        name: 'Lamborghini',
        description: 'Potencia, belleza y alma',
        foundation: '1963',
        history: "Fundada por Ferruccio Lamborghini como respuesta a Enzo Ferrari. Primer auto: 350 GT (1964). Miura (1966) definió la categoría superdeportivo.",
        trajectory: "Revolucionó el diseño con puertas de tijera (Countach). Líder actual en superdeportivos V12 con Aventador y Revuelto."
      },
      en: {
        name: 'Lamborghini',
        description: 'Power, beauty and soul',
        foundation: '1963',
        history: "Founded by Ferruccio Lamborghini as response to Enzo Ferrari. First car: 350 GT (1964). Miura (1966) defined the supercar category.",
        trajectory: "Revolutionized design with scissor doors (Countach). Current leader in V12 supercars with Aventador and Revuelto."
      }
    }
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    description: 'Art, Forme, Technique',
    foundation: 1909,
    history: "Founded by Ettore Bugatti in Molsheim. Known for artistic designs and racing success. Revived in 1987 with EB110, later by Volkswagen Group.",
    trajectory: "Creator of fastest production cars: Veyron Super Sport (431 km/h) and Chiron Super Sport 300+ (490 km/h).",
    translations: {
      es: {
        name: 'Bugatti',
        description: 'Arte, Forma, Técnica',
        foundation: '1909',
        history: "Fundada por Ettore Bugatti en Molsheim. Conocida por diseños artísticos y éxitos en carreras. Revivida en 1987 con EB110, luego por Volkswagen Group.",
        trajectory: "Creador de los autos de producción más rápidos: Veyron Super Sport (431 km/h) y Chiron Super Sport 300+ (490 km/h)."
      },
      en: {
        name: 'Bugatti',
        description: 'Art, Forme, Technique',
        foundation: '1909',
        history: "Founded by Ettore Bugatti in Molsheim. Known for artistic designs and racing success. Revived in 1987 with EB110, later by Volkswagen Group.",
        trajectory: "Creator of fastest production cars: Veyron Super Sport (431 km/h) and Chiron Super Sport 300+ (490 km/h)."
      }
    }
  }
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Ruta para obtener todas las marcas (con caché)
app.get('/brands', cacheMiddleware, (req, res) => {
  const start = Date.now();
  
  // Simular algo de procesamiento
  setTimeout(() => {
    const responseTime = Date.now() - start;
    res.setHeader('X-Response-Time', `${responseTime}ms`);
    res.json({
      success: true,
      count: brands.length,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('X-Cache') === 'HIT',
      data: brands
    });
  }, 100); // Simular 100ms de procesamiento
});

// Ruta para obtener una marca específica por ID (con caché)
app.get('/brands/:id', cacheMiddleware, (req, res) => {
  const start = Date.now();
  
  const brand = brands.find(b => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({ 
      success: false,
      error: 'Marca no encontrada',
      responseTime: `${Date.now() - start}ms`
    });
  }
  
  // Simular algo de procesamiento
  setTimeout(() => {
    const responseTime = Date.now() - start;
    res.setHeader('X-Response-Time', `${responseTime}ms`);
    res.json({
      success: true,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('X-Cache') === 'HIT',
      data: brand
    });
  }, 50); // Simular 50ms de procesamiento
});

// Ruta para limpiar caché (útil para desarrollo)
app.delete('/cache', (req, res) => {
  cache.clear();
  res.json({ 
    success: true, 
    message: 'Caché limpiado',
    timestamp: new Date().toISOString()
  });
});

// Ruta para ver estadísticas del caché
app.get('/cache/stats', (req, res) => {
  const stats = {
    totalEntries: cache.size,
    entries: Array.from(cache.keys()).map(key => ({
      url: key,
      cachedAt: new Date(cache.get(key).timestamp).toISOString(),
      ageMs: Date.now() - cache.get(key).timestamp
    }))
  };
  
  res.json({
    success: true,
    cache: stats,
    cacheDurationMs: CACHE_DURATION
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en el puerto 3000 SALUDOS');
});
