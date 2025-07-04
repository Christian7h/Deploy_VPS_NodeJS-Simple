const express = require('express');
const app = express();
const cors = require('cors');
const apicache = require('apicache');

// Configurar apicache
const cacheMiddleware = apicache.middleware;
app.use(cors({
  origin: 'https://frontvpsapi.pages.dev', // o '*' para todos los orígenes (no recomendado en producción)
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Middleware para JSON
app.use(express.json());

// Middleware para medir tiempo de respuesta
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const cached = res.getHeader('apicache-store') ? 'HIT' : 'MISS';
    console.log(`🚀 ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms - Cache: ${cached}`);
  });
  
  next();
});

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
  // Resto de marcas (Mercedes, Audi, Porsche, Ferrari, etc.)
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
  },
  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    logo: '/koeni/koeni.png',
    description: 'Breaking Boundaries',
    foundation: 1994,
    history: "Founded by Christian von Koenigsegg at age 22. First prototype: Koenigsegg CC (1996). Revolutionized hypercar industry with innovative engineering.",
    trajectory: "Multiple speed records. First production car with 1:1 power-to-weight ratio (One:1).",
    translations: {
      es: {
        name: 'Koenigsegg',
        description: 'Rompiendo límites',
        foundation: '1994',
        history: "Fundada por Christian von Koenigsegg a los 22 años. Primer prototipo: Koenigsegg CC (1996). Revolucionó la industria con ingeniería innovadora.",
        trajectory: "Múltiples récords de velocidad. Primer auto de producción con relación 1:1 potencia/peso (One:1)."
      },
      en: {
        name: 'Koenigsegg',
        description: 'Breaking Boundaries',
        foundation: '1994',
        history: "Founded by Christian von Koenigsegg at age 22. First prototype: Koenigsegg CC (1996). Revolutionized hypercar industry with innovative engineering.",
        trajectory: "Multiple speed records. First production car with 1:1 power-to-weight ratio (One:1)."
      }
    }
  },
  {
    id: 'toyota',
    name: 'Toyota',
    logo: '/toyota/toyota.png',
    description: "Let's Go Places",
    foundation: 1937,
    history: "Founded by Kiichiro Toyoda. Revolutionized manufacturing with the Toyota Production System. First passenger car: Model AA (1936).",
    trajectory: "World's largest automaker by production. Pioneer in hybrid technology with Prius (1997).",
    translations: {
      es: {
        name: 'Toyota',
        description: 'Hagámoslo posible',
        foundation: '1937',
        history: "Fundada por Kiichiro Toyoda. Revolucionó la manufactura con el Sistema de Producción Toyota. Primer auto: Modelo AA (1936).",
        trajectory: "Mayor fabricante automotriz por producción. Pionera en tecnología híbrida con Prius (1997)."
      },
      en: {
        name: 'Toyota',
        description: "Let's Go Places",
        foundation: '1937',
        history: "Founded by Kiichiro Toyoda. Revolutionized manufacturing with the Toyota Production System. First passenger car: Model AA (1936).",
        trajectory: "World's largest automaker by production. Pioneer in hybrid technology with Prius (1997)."
      }
    }
  },
  {
    id: 'ford',
    name: 'Ford',
    logo: '/ford/ford.png',
    description: 'Built Ford Tough',
    foundation: 1903,
    history: "Founded by Henry Ford. Revolutionized manufacturing with moving assembly line (1913). First mass-produced car: Model T (1908).",
    trajectory: "F-150 truck best-selling vehicle in USA for 40+ years. First to introduce V8 engine (1932).",
    translations: {
      es: {
        name: 'Ford',
        description: 'Construido para resistir',
        foundation: '1903',
        history: "Fundada por Henry Ford. Revolucionó la manufactura con línea de ensamblaje móvil (1913). Primer auto masivo: Modelo T (1908).",
        trajectory: "Camioneta F-150 más vendida en EE.UU. por 40+ años. Primera en motor V8 (1932)."
      },
      en: {
        name: 'Ford',
        description: 'Built Ford Tough',
        foundation: '1903',
        history: "Founded by Henry Ford. Revolutionized manufacturing with moving assembly line (1913). First mass-produced car: Model T (1908).",
        trajectory: "F-150 truck best-selling vehicle in USA for 40+ years. First to introduce V8 engine (1932)."
      }
    }
  },
  {
    id: 'tesla',
    name: 'Tesla',
    logo: '/tesla/tesla.png',
    description: 'Accelerating the World\'s Transition to Sustainable Energy',
    foundation: 2003,
    history: "Founded by Martin Eberhard and Marc Tarpenning. Elon Musk joined in 2004. First car: Roadster (2008) with Lotus chassis.",
    trajectory: "Pioneer in over-the-air updates. Autopilot system leader. Cybertruck revealed in 2019 with 1M+ pre-orders.",
    translations: {
      es: {
        name: 'Tesla',
        description: 'Acelerando la transición mundial a energía sustentable',
        foundation: '2003',
        history: "Fundada por Martin Eberhard y Marc Tarpenning. Elon Musk se unió en 2004. Primer auto: Roadster (2008) con chasis Lotus.",
        trajectory: "Pionera en actualizaciones por aire. Líder en sistema Autopilot. Cybertruck revelado en 2019 con 1M+ reservas."
      },
      en: {
        name: 'Tesla',
        description: 'Accelerating the World\'s Transition to Sustainable Energy',
        foundation: '2003',
        history: "Founded by Martin Eberhard and Marc Tarpenning. Elon Musk joined in 2004. First car: Roadster (2008) with Lotus chassis.",
        trajectory: "Pioneer in over-the-air updates. Autopilot system leader. Cybertruck revealed in 2019 with 1M+ pre-orders."
      }
    }
  },
  {
    id: 'rolls-royce',
    name: 'Rolls-Royce',
    logo: '/rollsroyce/rollsroyce.png',
    description: 'Strive for perfection',
    foundation: 1906,
    history: "Founded by Charles Rolls and Henry Royce. Spirit of Ecstasy mascot created in 1911. Acquired by BMW in 1998.",
    trajectory: "Supplier of aircraft engines during WWII. Phantom VII (2003) revived brand under BMW ownership.",
    translations: {
      es: {
        name: 'Rolls-Royce',
        description: 'Perseguir la perfección',
        foundation: '1906',
        history: "Fundada por Charles Rolls y Henry Royce. Mascota Spirit of Ecstasy creada en 1911. Adquirida por BMW en 1998.",
        trajectory: "Proveedor de motores de avión en la WWII. Phantom VII (2003) revivió la marca bajo BMW."
      },
      en: {
        name: 'Rolls-Royce',
        description: 'Strive for perfection',
        foundation: '1906',
        history: "Founded by Charles Rolls and Henry Royce. Spirit of Ecstasy mascot created in 1911. Acquired by BMW in 1998.",
        trajectory: "Supplier of aircraft engines during WWII. Phantom VII (2003) revived brand under BMW ownership."
      }
    }
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    logo: '/mclaren/mclaren.png',
    description: 'Track-bred technology',
    foundation: 1963,
    history: "Founded by Bruce McLaren. Initially racing team, entered road cars with F1 (1992). Carbon fiber pioneers.",
    trajectory: "12 F1 constructors' championships. Speedtail (2019) reaches 403 km/h. Artura launched as first hybrid (2021).",
    translations: {
      es: {
        name: 'McLaren',
        description: 'Tecnología de pista',
        foundation: '1963',
        history: "Fundada por Bruce McLaren. Inició como equipo de carreras, autos de calle con F1 (1992). Pioneros en fibra de carbono.",
        trajectory: "12 campeonatos de constructores F1. Speedtail (2019) alcanza 403 km/h. Artura primer híbrido (2021)."
      },
      en: {
        name: 'McLaren',
        description: 'Track-bred technology',
        foundation: '1963',
        history: "Founded by Bruce McLaren. Initially racing team, entered road cars with F1 (1992). Carbon fiber pioneers.",
        trajectory: "12 F1 constructors' championships. Speedtail (2019) reaches 403 km/h. Artura launched as first hybrid (2021)."
      }
    }
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    logo: '/volkswagen/volkswagen.png',
    description: 'Das Auto',
    foundation: 1937,
    history: "Founded by German Labour Front. Original design by Ferdinand Porsche. Beetle became world's best-selling car (21.5M units).",
    trajectory: "Owns 12 brands including Audi, Porsche. Dieselgate scandal (2015). ID.4 first global electric SUV (2020).",
    translations: {
      es: {
        name: 'Volkswagen',
        description: 'El auto',
        foundation: '1937',
        history: "Fundada por el Frente Laboral Alemán. Diseño original de Ferdinand Porsche. Beetle fue auto más vendido (21.5M).",
        trajectory: "Dueña de 12 marcas incluyendo Audi, Porsche. Escándalo Dieselgate (2015). ID.4 primer SUV eléctrico global (2020)."
      },
      en: {
        name: 'Volkswagen',
        description: 'Das Auto',
        foundation: '1937',
        history: "Founded by German Labour Front. Original design by Ferdinand Porsche. Beetle became world's best-selling car (21.5M units).",
        trajectory: "Owns 12 brands including Audi, Porsche. Dieselgate scandal (2015). ID.4 first global electric SUV (2020)."
      }
    }
  },
  // Continúa con más marcas...
  {
    id: 'hyundai',
    name: 'Hyundai',
    logo: '/hyundai/hyundai.png',
    description: 'New Thinking. New Possibilities.',
    foundation: 1967,
    history: "Founded by Chung Ju-yung. First model: Cortina (1968) with Ford partnership. Entered US market in 1986.",
    trajectory: "World's first mass-produced fuel cell vehicle (Tucson FCEV 2013). Acquired 33% of Kia Motors (1998).",
    translations: {
      es: {
        name: 'Hyundai',
        description: 'Nuevo pensamiento. Nuevas posibilidades.',
        foundation: '1967',
        history: "Fundada por Chung Ju-yung. Primer modelo: Cortina (1968) con Ford. Entró a EE.UU. en 1986.",
        trajectory: "Primer vehículo de celdas de combustible masivo (Tucson FCEV 2013). Adquirió 33% de Kia (1998)."
      },
      en: {
        name: 'Hyundai',
        description: 'New Thinking. New Possibilities.',
        foundation: '1967',
        history: "Founded by Chung Ju-yung. First model: Cortina (1968) with Ford partnership. Entered US market in 1986.",
        trajectory: "World's first mass-produced fuel cell vehicle (Tucson FCEV 2013). Acquired 33% of Kia Motors (1998)."
      }
    }
  },
  {
    id: 'pagani',
    name: 'Pagani',
    logo: '/pagani/pagani.png',
    description: 'Art and science',
    foundation: 1992,
    history: "Founded by Horacio Pagani. First hypercar: Zonda (1999). Uses Mercedes-AMG V12 engines. Only produces 40 cars/year.",
    trajectory: "Huayra (2011) first hypercar with active aerodynamics. Utopia revealed in 2022 as ultimate analog hypercar.",
    translations: {
      es: {
        name: 'Pagani',
        description: 'Arte y ciencia',
        foundation: '1992',
        history: "Fundada por Horacio Pagani. Primer hiperauto: Zonda (1999). Usa motores Mercedes-AMG V12. Produce solo 40 autos/año.",
        trajectory: "Huayra (2011) primer hiperauto con aerodinámica activa. Utopia presentado en 2022 como hiperauto analógico definitivo."
      },
      en: {
        name: 'Pagani',
        description: 'Art and science',
        foundation: '1992',
        history: "Founded by Horacio Pagani. First hypercar: Zonda (1999). Uses Mercedes-AMG V12 engines. Only produces 40 cars/year.",
        trajectory: "Huayra (2011) first hypercar with active aerodynamics. Utopia revealed in 2022 as ultimate analog hypercar."
      }
    }
  },
  {
    id: 'honda',
    name: 'Honda',
    logo: '/honda/honda.png',
    description: 'The Power of Dreams',
    foundation: 1948,
    history: "Founded by Soichiro Honda. Started with motorcycles (1949). First car: T360 truck (1963). Revolutionized F1 with turbo engines in 1980s.",
    trajectory: "Most successful motorcycle manufacturer. NSX as first mass-produced supercar with hybrid tech.",
    translations: {
      es: {
        name: 'Honda',
        description: 'El poder de los sueños',
        foundation: '1948',
        history: "Fundada por Soichiro Honda. Inició con motocicletas (1949). Primer auto: camión T360 (1963). Revolucionó la F1 con motores turbo en los 80s.",
        trajectory: "Mayor fabricante de motocicletas. NSX como primer superdeportivo masivo con tecnología híbrida."
      },
      en: {
        name: 'Honda',
        description: 'The Power of Dreams',
        foundation: '1948',
        history: "Founded by Soichiro Honda. Started with motorcycles (1949). First car: T360 truck (1963). Revolutionized F1 with turbo engines in 1980s.",
        trajectory: "Most successful motorcycle manufacturer. NSX as first mass-produced supercar with hybrid tech."
      }
    }
  },
  {
    id: 'chevrolet',
    name: 'Chevrolet',
    logo: '/chevrolet/chevrolet.png',
    description: 'Find New Roads',
    foundation: 1911,
    history: "Founded by Louis Chevrolet and William C. Durant. First car: Classic Six (1911). Became GM's volume leader in 1930s.",
    trajectory: "Corvette: America's sports car since 1953. 8 NASCAR manufacturers' championships.",
    translations: {
      es: {
        name: 'Chevrolet',
        description: 'Encuentra nuevos caminos',
        foundation: '1911',
        history: "Fundada por Louis Chevrolet y William C. Durant. Primer auto: Classic Six (1911). Líder de volumen de GM en los 1930s.",
        trajectory: "Corvette: El auto deportivo americano desde 1953. 8 campeonatos de constructores NASCAR."
      },
      en: {
        name: 'Chevrolet',
        description: 'Find New Roads',
        foundation: '1911',
        history: "Founded by Louis Chevrolet and William C. Durant. First car: Classic Six (1911). Became GM's volume leader in 1930s.",
        trajectory: "Corvette: America's sports car since 1953. 8 NASCAR manufacturers' championships."
      }
    }
  },
  {
    id: 'maserati',
    name: 'Maserati',
    logo: '/maserati/maserati.png',
    description: 'Luxury, sports and style cast in exclusive cars',
    foundation: 1914,
    history: "Founded by Alfieri Maserati in Bologna. Known for racing heritage with the Tipo 26 (1926). Iconic trident logo from Bologna's Neptune statue.",
    trajectory: "Creator of the first GT car (A6 1500). Revived with MC20 supercar (2020) using Nettuno V6 engine.",
    translations: {
      es: {
        name: 'Maserati',
        description: 'Lujo, deportividad y estilo en autos exclusivos',
        foundation: '1914',
        history: "Fundada por Alfieri Maserati en Bolonia. Conocida por herencia en carreras con el Tipo 26 (1926). Logo del tridente de la estatua de Neptuno en Bolonia.",
        trajectory: "Creador del primer auto GT (A6 1500). Relanzamiento con el superdeportivo MC20 (2020) usando motor V6 Nettuno."
      },
      en: {
        name: 'Maserati',
        description: 'Luxury, sports and style cast in exclusive cars',
        foundation: '1914',
        history: "Founded by Alfieri Maserati in Bologna. Known for racing heritage with the Tipo 26 (1926). Iconic trident logo from Bologna's Neptune statue.",
        trajectory: "Creator of the first GT car (A6 1500). Revived with MC20 supercar (2020) using Nettuno V6 engine."
      }
    }
  },
  {
    id: 'lotus',
    name: 'Lotus',
    logo: '/lotus/lotus.png',
    description: 'Simplify, then add lightness',
    foundation: 1952,
    history: "Founded by Colin Chapman. Pioneer in lightweight chassis design. First F1 victory with Stirling Moss (1960).",
    trajectory: "7 F1 constructors' titles. Emira (2021) as last combustion model. Transition to electric with Eletre SUV.",
    translations: {
      es: {
        name: 'Lotus',
        description: 'Simplifica, luego agrega ligereza',
        foundation: '1952',
        history: "Fundada por Colin Chapman. Pionera en chasis ligeros. Primera victoria en F1 con Stirling Moss (1960).",
        trajectory: "7 títulos de constructores en F1. Emira (2021) como último modelo de combustión. Transición a eléctricos con SUV Eletre."
      },
      en: {
        name: 'Lotus',
        description: 'Simplify, then add lightness',
        foundation: '1952',
        history: "Founded by Colin Chapman. Pioneer in lightweight chassis design. First F1 victory with Stirling Moss (1960).",
        trajectory: "7 F1 constructors' titles. Emira (2021) as last combustion model. Transition to electric with Eletre SUV."
      }
    }
  },
  {
    id: 'alfa-romeo',
    name: 'Alfa Romeo',
    logo: '/alfa-romeo/alfa-romeo.png',
    description: 'La meccanica delle emozioni',
    foundation: 1910,
    history: "Founded in Milan as A.L.F.A. (Anonima Lombarda Fabbrica Automobili). Iconic Quadrifoglio badge from racing driver Ugo Sivocci.",
    trajectory: "11 victories at Le Mans. Giulia Quadrifoglio (2016) revived performance legacy. Stellantis era since 2021.",
    translations: { 
      es: {
        name: 'Alfa Romeo',
        description: 'La mecánica de las emociones',
        foundation: '1910',
        history: "Fundada en Milán como A.L.F.A. (Anónima Lombarda Fábrica Automóviles). Emblema Quadrifoglio del piloto Ugo Sivocci.",
        trajectory: "11 victorias en Le Mans. Giulia Quadrifoglio (2016) revivió el legado deportivo. Era Stellantis desde 2021."
      },
      en: {
        name: 'Alfa Romeo',
        description: 'The mechanics of emotion',
        foundation: '1910',
        history: "Founded in Milan as A.L.F.A. (Anonymous Lombard Automobile Factory). Iconic Quadrifoglio badge from racing driver Ugo Sivocci.",
        trajectory: "11 victories at Le Mans. Giulia Quadrifoglio (2016) revived performance legacy. Stellantis era since 2021."
      }
    }
  },
  {
    id: 'genesis',
    name: 'Genesis',
    logo: '/genesis/genesis.png',
    description: 'Luxury of the new age',
    foundation: 2015,
    history: "Hyundai's luxury division. First model: Genesis G90 (2015). Became standalone brand in 2017 with Manfred Fitzgerald as design chief.",
    trajectory: "2022 MotorTrend Car of the Year (GV70). Electrified GV60 launched in 2022 with facial recognition entry.",
    translations: {
      es: {
        name: 'Genesis',
        description: 'Lujo de la nueva era',
        foundation: '2015',
        history: "División de lujo de Hyundai. Primer modelo: Genesis G90 (2015). Marca independiente en 2017 con Manfred Fitzgerald como jefe de diseño.",
        trajectory: "Auto del Año 2022 por MotorTrend (GV70). GV60 eléctrico lanzado en 2022 con reconocimiento facial."
      },
      en: {
        name: 'Genesis',
        description: 'Luxury of the new age',
        foundation: '2015',
        history: "Hyundai's luxury division. First model: Genesis G90 (2015). Became standalone brand in 2017 with Manfred Fitzgerald as design chief.",
        trajectory: "2022 MotorTrend Car of the Year (GV70). Electrified GV60 launched in 2022 with facial recognition entry."
      }
    }
  },
  {
    id: 'Genesis',
    name: 'Rivian',
    logo: '/rivian/rivian.png',
    description: 'Adventure vehicles for the planet',
    foundation: 2009,
    history: "Founded by RJ Scaringe. Focused on electric adventure vehicles. Backed by Amazon and Ford. First models: R1T (truck) and R1S (SUV) in 2021.",
    trajectory: "First EV pickup to market (R1T). Partnership with Amazon for 100k electric delivery vans.",
    translations: {
      es: {
        name: 'Rivian',
        description: 'Vehículos de aventura para el planeta',
        foundation: '2009',
        history: "Fundada por RJ Scaringe. Enfocada en vehículos eléctricos de aventura. Respaldada por Amazon y Ford. Primeros modelos: R1T (camioneta) y R1S (SUV) en 2021.",
        trajectory: "Primera camioneta eléctrica en el mercado (R1T). Alianza con Amazon para 100k furgonetas eléctricas."
      },
      en: {
        name: 'Rivian',
        description: 'Adventure vehicles for the planet',
        foundation: '2009',
        history: "Founded by RJ Scaringe. Focused on electric adventure vehicles. Backed by Amazon and Ford. First models: R1T (truck) and R1S (SUV) in 2021.",
        trajectory: "First EV pickup to market (R1T). Partnership with Amazon for 100k electric delivery vans."
      }
    }
  },
  {
    id: 'lexus',
    name: 'Lexus',
    logo: '/lexus/lexus.png',
    description: 'The Pursuit of Perfection',
    foundation: 1989,
    history: "Founded as Toyota's luxury division to compete with European premium brands. Revolutionized luxury car reliability standards.",
    trajectory: "Pioneer in hybrid luxury vehicles with the RX 400h. Multiple J.D. Power awards for quality and reliability.",
    translations: {
      es: {
        name: 'Lexus',
        description: 'La búsqueda de la perfección',
        foundation: '1989',
        history: "Fundada como división de lujo de Toyota para competir con marcas premium europeas. Revolucionó los estándares de confiabilidad en autos de lujo.",
        trajectory: "Pionera en vehículos híbridos de lujo con el RX 400h. Múltiples premios J.D. Power por calidad y confiabilidad."
      },
      en: {
        name: 'Lexus',
        description: 'The Pursuit of Perfection',
        foundation: '1989',
        history: "Founded as Toyota's luxury division to compete with European premium brands. Revolutionized luxury car reliability standards.",
        trajectory: "Pioneer in hybrid luxury vehicles with the RX 400h. Multiple J.D. Power awards for quality and reliability."
      }
    }
  },
  {
    id: 'aston-martin',
    name: 'Aston Martin',
    logo: '/aston-martin/aston-martin.png',
    description: 'Power, Beauty and Soul',
    foundation: 1913,
    history: "British luxury sports car manufacturer famous for its association with James Bond. Survived multiple bankruptcies to become symbol of British automotive excellence.",
    trajectory: "Multiple class wins at 24 Hours of Le Mans. Valkyrie hypercar developed with Red Bull Racing F1 technology.",
    translations: {
      es: {
        name: 'Aston Martin',
        description: 'Poder, Belleza y Alma',
        foundation: '1913',
        history: "Fabricante británico de deportivos de lujo famoso por su asociación con James Bond. Sobrevivió múltiples bancarrotas para convertirse en símbolo de excelencia automotriz británica.",
        trajectory: "Múltiples victorias de clase en las 24 Horas de Le Mans. Hypercar Valkyrie desarrollado con tecnología de Red Bull Racing de F1."
      },
      en: {
        name: 'Aston Martin',
        description: 'Power, Beauty and Soul',
        foundation: '1913',
        history: "British luxury sports car manufacturer famous for its association with James Bond. Survived multiple bankruptcies to become symbol of British automotive excellence.",
        trajectory: "Multiple class wins at 24 Hours of Le Mans. Valkyrie hypercar developed with Red Bull Racing F1 technology."
      }
    }
  },
  {
    id: 'rimac',
    name: 'Rimac',
    logo: '/rimac/rimac.png',
    description: 'The Future of Performance',
    foundation: 2009,
    history: "Croatian electric hypercar manufacturer founded by Mate Rimac at 21. Revolutionizing EV performance with record-breaking acceleration.",
    trajectory: "Nevera holds 23 performance records. Strategic partnership with Porsche. Battery tech supplier to major OEMs.",
    translations: {
      es: {
        name: 'Rimac',
        description: 'El Futuro del Rendimiento',
        foundation: '2009',
        history: "Fabricante croata de hypercars eléctricos fundado por Mate Rimac a los 21 años. Revolucionando el rendimiento EV con aceleración récord.",
        trajectory: "Nevera posee 23 récords de rendimiento. Alianza estratégica con Porsche. Proveedor de tecnología de baterías para grandes fabricantes."
      },
      en: {
        name: 'Rimac',
        description: 'The Future of Performance',
        foundation: '2009',
        history: "Croatian electric hypercar manufacturer founded by Mate Rimac at 21. Revolutionizing EV performance with record-breaking acceleration.",
        trajectory: "Nevera holds 23 performance records. Strategic partnership with Porsche. Battery tech supplier to major OEMs."
      }
    }
  },
  {
    id: 'cadillac-v',
    name: 'Cadillac V-Series',
    logo: '/cadillac-v/cadillac-v.png',
    description: 'The Cadillac of Performance',
    foundation: 2004,
    history: "Performance division combining American luxury with track capabilities. Developed at GM's Milford Proving Grounds.",
    trajectory: "Multiple SCCA championships. CT5-V Blackwing: último sedán manual con motor V8 supercargado.",
    translations: {
      es: {
        name: 'Cadillac V-Series',
        description: 'El Máximo Rendimiento de Cadillac',
        foundation: '2004',
        history: "División de rendimiento que combina lujo americano con capacidades de pista. Desarrollado en los Milford Proving Grounds de GM.",
        trajectory: "Múltiples campeonatos SCCA. CT5-V Blackwing: último sedán manual con motor V8 supercargado."
      },
      en: {
        name: 'Cadillac V-Series',
        description: 'The Cadillac of Performance',
        foundation: '2004',
        history: "Performance division combining American luxury with track capabilities. Developed at GM's Milford Proving Grounds.",
        trajectory: "Multiple SCCA championships. CT5-V Blackwing: Last manual transmission V8 supercharged sedan."
      }
    }
  },
  {
    id: 'noble',
    name: 'Noble',
    logo: '/noble/noble.png',
    description: 'Pure Driving Thrill',
    foundation: 1999,
    history: "British sports car manufacturer specializing in lightweight, driver-focused vehicles. Gained fame with the M600 supercar.",
    trajectory: "M600 held Lotus Exige lap record at Top Gear track. Pioneer in analog supercar philosophy.",
    translations: {
      es: {
        name: 'Noble',
        description: 'Emoción de Conducción Pura',
        foundation: '1999',
        history: "Fabricante británico de deportivos especializado en vehículos ligeros centrados en el conductor. Fama con el superdeportivo M600.",
        trajectory: "M600 mantuvo récord de vuelta de Lotus Exige en pista de Top Gear. Pionero en filosofía de superdeportivos analógicos."
      },
      en: {
        name: 'Noble',
        description: 'Pure Driving Thrill',
        foundation: '1999',
        history: "British sports car manufacturer specializing in lightweight, driver-focused vehicles. Gained fame with the M600 supercar.",
        trajectory: "M600 held Lotus Exige lap record at Top Gear track. Pioneer in analog supercar philosophy."
      }
    }
  },
  {
    id: 'gumpert',
    name: 'Gumpert',
    logo: '/gumpert/gumpert.png',
    description: 'Engineered for Extremes',
    foundation: 2004,
    history: "German sports car manufacturer founded by Roland Gumpert, former Audi Sport director. Designed specifically for Nürburgring performance.",
    trajectory: "Apollo Sport held Nürburgring production car record (7:11.57) in 2009. Featured in Top Gear's 'Star in a Reasonably Priced Car'.",
    translations: {
      es: {
        name: 'Gumpert',
        description: 'Ingeniería para Extremos',
        foundation: '2004',
        history: "Fabricante alemán de deportivos fundado por Roland Gumpert, ex director de Audi Sport. Diseñados específicamente para rendimiento en Nürburgring.",
        trajectory: "Apollo Sport mantuvo récord de Nürburgring para autos de producción (7:11.57) en 2009. Presentado en 'Star in a Reasonably Priced Car' de Top Gear."
      },
      en: {
        name: 'Gumpert',
        description: 'Engineered for Extremes',
        foundation: '2004',
        history: "German sports car manufacturer founded by Roland Gumpert, former Audi Sport director. Designed specifically for Nürburgring performance.",
        trajectory: "Apollo Sport held Nürburgring production car record (7:11.57) in 2009. Featured in Top Gear's 'Star in a Reasonably Priced Car'."
      }
    }
  }
];

// Datos de vehículos
const vehicles = [
  {
    id: 'm4-csl',
    brandId: 'bmw',
    name: 'BMW M4 CSL',
    image: '/bmw/m4cls/bmwm4cls (20).jpg',
    images: [
      '/bmw/m4cls/bmwm4cls (20).jpg', '/bmw/m4cls/bmwm4cls (19).jpg', '/bmw/m4cls/bmwm4cls (18).jpg',
      '/bmw/m4cls/bmwm4cls (17).jpg', '/bmw/m4cls/bmwm4cls (16).jpg', '/bmw/m4cls/bmwm4cls (15).jpg',
      '/bmw/m4cls/bmwm4cls (14).jpg', '/bmw/m4cls/bmwm4cls (13).jpg', '/bmw/m4cls/bmwm4cls (12).jpg',
      '/bmw/m4cls/bmwm4cls (11).jpg', '/bmw/m4cls/bmwm4cls (10).jpg', '/bmw/m4cls/bmwm4cls (9).jpg',
      '/bmw/m4cls/bmwm4cls (8).jpg', '/bmw/m4cls/bmwm4cls (7).jpg', '/bmw/m4cls/bmwm4cls (6).jpg',
      '/bmw/m4cls/bmwm4cls (5).jpg', '/bmw/m4cls/bmwm4cls (4).jpg', '/bmw/m4cls/bmwm4cls (3).jpg',
      '/bmw/m4cls/bmwm4cls (2).jpg', '/bmw/m4cls/bmwm4cls (1).jpg'
    ],
    price: '139900',
    description: 'Competition. Sport. Lightweight.',
    year: 2024,
    type: 'Coupe',
    specs: {
      power: '550 HP',
      acceleration: '3.6s',
      topSpeed: '191 mph'
    },
    stock: 14,
    translations: {
      es: {
        name: 'BMW M4 CSL',
        description: 'Competición. Deporte. Ligero.',
        type: 'Coupe',
      },
      en: {
        name: 'BMW M4 CSL',
        description: 'Competition. Sport. Lightweight.',
        type: 'Coupe'
      },
    },
  },
  {
    id: 'm5-cs',
    brandId: 'bmw',
    name: 'BMW M5 CS',
    image: '/bmw/m5cs/m5cs.jpg',
    images: ['/bmw/m5cs/bmwm5cs1.jpg', '/bmw/m5cs/bmwm5cs2.jpg', '/bmw/m5cs/bmwm5cs3.jpg', '/bmw/m5cs/bmwm5cs4.jpg',
      '/bmw/m5cs/bmwm5cs5.jpg', '/bmw/m5cs/bmwm5cs6.jpg', '/bmw/m5cs/bmwm5cs7.jpg', '/bmw/m5cs/bmwm5cs8.jpg',
      '/bmw/m5cs/bmwm5cs9.jpg', '/bmw/m5cs/bmwm5cs10.jpg', '/bmw/m5cs/bmwm5cs11.jpg', '/bmw/m5cs/bmwm5cs12.jpg',
      '/bmw/m5cs/bmwm5cs13.jpg', '/bmw/m5cs/bmwm5cs14.jpg', '/bmw/m5cs/bmwm5cs15.jpg', '/bmw/m5cs/bmwm5cs16.jpg',
      '/bmw/m5cs/bmwm5cs17.jpg', '/bmw/m5cs/bmwm5cs18.jpg', '/bmw/m5cs/bmwm5cs19.jpg', '/bmw/m5cs/bmwm5cs20.jpg',
      '/bmw/m5cs/bmwm5cs21.jpg', '/bmw/m5cs/bmwm5cs22.jpg', '/bmw/m5cs/bmwm5cs23.jpg', '/bmw/m5cs/bmwm5cs24.jpg',
      '/bmw/m5cs/bmwm5cs25.jpg', '/bmw/m5cs/bmwm5cs26.jpg', '/bmw/m5cs/bmwm5cs27.jpg', '/bmw/m5cs/bmwm5cs28.jpg',
      '/bmw/m5cs/bmwm5cs29.jpg', '/bmw/m5cs/bmwm5cs30.jpg', '/bmw/m5cs/bmwm5cs31.jpg', '/bmw/m5cs/bmwm5cs32.jpg',],
    price: '142000',
    description: 'The most powerful M car ever.',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '627 HP',
      acceleration: '2.9s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'BMW M5 CS',
        description: 'El coche M más potente de todos los tiempos.',
        type: 'Sedan'
      },
      en: {
        name: 'BMW M5 CS',
        description: 'The most powerful M car ever.',
        type: 'Sedan'
      },
    },
  },
  {
    id: 'm8-competition',
    brandId: 'bmw',
    name: 'BMW ALPINA B8',
    image: '/bmw/b8/1.jpg',
    images: ['/bmw/b8/1.jpg', '/bmw/b8/2.jpg', '/bmw/b8/3.jpg',
      '/bmw/b8/4.jpg', '/bmw/b8/5.jpg', '/bmw/b8/6.jpg', '/bmw/b8/7.jpg', '/bmw/b8/8.jpg',
      '/bmw/b8/9.jpg', '/bmw/b8/10.jpg', '/bmw/b8/11.jpg', '/bmw/b8/12.jpg', '/bmw/b8/13.jpg',
      '/bmw/b8/14.jpg', '/bmw/b8/15.jpg', '/bmw/b8/16.jpg', '/bmw/b8/17.jpg', '/bmw/b8/18.jpg',
      '/bmw/b8/19.jpg', '/bmw/b8/20.jpg', '/bmw/b8/21.jpg', '/bmw/b8/22.jpg', '/bmw/b8/23.jpg',
      '/bmw/b8/24.jpg', '/bmw/b8/25.jpg', '/bmw/b8/26.jpg', '/bmw/b8/27.jpg', '/bmw/b8/28.jpg',],
    price: '146000',
    description: 'The Ultimate Driving Machine',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '617 HP',
      acceleration: '3.0s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'BMW ALPINA B8',
        description: 'La máquina de conducción definitiva',
        type: 'Sedan',

      },
      en: {
        name: 'BMW ALPINA B8',
        description: 'The Ultimate Driving Machine',
        type: 'Sedan',
      },
    },
  },
  {
    id: 'amg-gt-black-series',
    brandId: 'mercedes',
    name: 'Mercedes-AMG GT Black Series',
    image: '/mb/amg-gt-black/12.jpg',
    images: [
      '/mb/amg-gt-black/1.jpg',
      '/mb/amg-gt-black/2.jpg',
      '/mb/amg-gt-black/3.jpg',
      '/mb/amg-gt-black/4.jpg',
      '/mb/amg-gt-black/5.jpg',
      '/mb/amg-gt-black/6.jpg',
      '/mb/amg-gt-black/7.jpg',
      '/mb/amg-gt-black/8.jpg',
      '/mb/amg-gt-black/9.jpg',
      '/mb/amg-gt-black/10.jpg',
      '/mb/amg-gt-black/11.jpg',
      '/mb/amg-gt-black/12.jpg',
    ],
    price:'325000',
    description: 'The ultimate AMG performance machine.',
    type: 'Coupe',
    year: 2025,
    specs: {
      power: '720 HP',
      acceleration: '3.2s',
      topSpeed: '202 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Mercedes-AMG GT Black Series',
        description: 'La máquina de rendimiento definitiva de AMG.',
        type: 'Coupe',
      },
      en: {
        name: 'Mercedes-AMG GT Black Series',
        description: 'The ultimate AMG performance machine.',
        type: 'Coupe',
      },
    },
  },
  {
    id: 's-class-maybach',
    brandId: 'mercedes',
    name: 'Mercedes-Maybach S-Class',
    image: '/mb/s-class-maybach/23.jpg',
    images: [
      '/mb/s-class-maybach/1.jpg', '/mb/s-class-maybach/2.jpg', '/mb/s-class-maybach/3.jpg', '/mb/s-class-maybach/4.jpg',
      '/mb/s-class-maybach/5.jpg', '/mb/s-class-maybach/6.jpg', '/mb/s-class-maybach/7.jpg', '/mb/s-class-maybach/8.jpg',
      '/mb/s-class-maybach/9.jpg', '/mb/s-class-maybach/10.jpg', '/mb/s-class-maybach/11.jpg', '/mb/s-class-maybach/12.jpg',
      '/mb/s-class-maybach/13.jpg', '/mb/s-class-maybach/14.jpg', '/mb/s-class-maybach/15.jpg', '/mb/s-class-maybach/16.jpg',
      '/mb/s-class-maybach/17.jpg', '/mb/s-class-maybach/18.jpg', '/mb/s-class-maybach/19.jpg', '/mb/s-class-maybach/20.jpg',
      '/mb/s-class-maybach/21.jpg', '/mb/s-class-maybach/22.jpg', '/mb/s-class-maybach/23.jpg', '/mb/s-class-maybach/24.jpg',
      '/mb/s-class-maybach/25.jpg', '/mb/s-class-maybach/26.jpg', '/mb/s-class-maybach/28.jpg',
      '/mb/s-class-maybach/29.jpg',
    ],
    price: '185000',
    description: 'A pinnacle of luxury and comfort.',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '496 HP',
      acceleration: '4.4s',
      topSpeed: '155 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Mercedes-Maybach S-Class',
        description: 'La cima del lujo y la comodidad.',
        type: 'Sedan',
      },
      en: {
        name: 'Mercedes-Maybach S-Class',
        description: 'A pinnacle of luxury and comfort.',
        type: 'Sedan',
      },
    },
  },
  {
    id: 'eqs-580',
    brandId: 'mercedes',
    name: 'Mercedes-Benz EQS 580',
    image: '/mb/eqs-580/1.jpg',
    images: [
      '/mb/eqs-580/1.jpg',
      '/mb/eqs-580/2.jpg',
      '/mb/eqs-580/3.jpg',
      '/mb/eqs-580/4.jpg',
      '/mb/eqs-580/5.jpg',
      '/mb/eqs-580/6.jpg',
      '/mb/eqs-580/7.jpg',
      '/mb/eqs-580/8.jpg',
      '/mb/eqs-580/9.jpg',
      '/mb/eqs-580/10.jpg',
      '/mb/eqs-580/11.jpg',
      '/mb/eqs-580/12.jpg',
      '/mb/eqs-580/13.jpg'
    ],
    price: '125000',
    description: 'The future of luxury electric mobility.',
    type: 'Electric',
    year: 2025,
    specs: {
      power: '516 HP',
      acceleration: '4.1s',
      topSpeed: '130 mph'
    },
    stock: 2,

    translations: {
      es: {
        name: 'Mercedes-Benz EQS 580',
        description: 'El futuro de la movilidad eléctrica de lujo.',
        type: 'Electric',

      },
      en: {
        name: 'Mercedes-Benz EQS 580',
        description: 'The future of luxury electric mobility.',
        type: 'Electric',
      },
    }
  },
  {
    id: 'rs7-performance',
    brandId: 'audi',
    name: 'Audi RS7 Performance',
    image: '/audi/rs7/11.jpg',
    images: [
      '/audi/rs7/9.avif', '/audi/rs7/11.jpg','/audi/rs7/7.avif', '/audi/rs7/8.avif', '/audi/rs7/12.webp'

      , '/audi/rs7/5.avif', '/audi/rs7/6.avif',
      '/audi/rs7/2.avif', '/audi/rs7/3.avif', '/audi/rs7/4.avif',
    ],
    price: '121000',
    description: 'Dynamic design and thrilling performance.',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '591 HP',
      acceleration: '3.5s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Audi RS7 Performance',
        description: 'Diseño dinámico y rendimiento emocionante.',
        type: 'Sedan',

      },
      en: {
        name: 'Audi RS7 Performance',
        description: 'Dynamic design and thrilling performance.',
        type: 'Sedan',
      },
    }
  },
  {
    id: 'e-tron-gt',
    brandId: 'audi',
    name: 'Audi e-tron GT',
    image: '/audi/e-tron/9.jpg',
    images: [
      '/audi/e-tron/1.jpg', '/audi/e-tron/2.jpg', '/audi/e-tron/3.jpg', '/audi/e-tron/4.jpg',
      '/audi/e-tron/5.jpg', '/audi/e-tron/6.jpg', '/audi/e-tron/7.jpg', '/audi/e-tron/8.jpg',
      '/audi/e-tron/9.jpg', '/audi/e-tron/10.jpg', '/audi/e-tron/11.jpg'
    ],
    price: '105000',
    description: 'A fully electric masterpiece of engineering.',
    type: 'Coupe',
    year: 2025,
    specs: {
      power: '469 HP',
      acceleration: '3.9s',
      topSpeed: '152 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Audi e-tron GT',
        description: 'Una obra maestra completamente eléctrica de ingeniería.',
        type: 'Coupe',

      },
      en: {
        name: 'Audi e-tron GT',
        description: 'A fully electric masterpiece of engineering.',
        type: 'Coupe',
      },
    }
  },
  {
    id: 'r8-v10-performance',
    brandId: 'audi',
    name: 'Audi R8 V10 Performance',
    image: '/audi/r8/1.jpg',
    images: [
      '/audi/r8/1.jpg', '/audi/r8/2.jpg', '/audi/r8/3.jpg', '/audi/r8/4.jpg',
      '/audi/r8/5.jpg', '/audi/r8/6.jpg', '/audi/r8/7.jpg', '/audi/r8/8.jpg',
      '/audi/r8/9.jpg', '/audi/r8/10.jpg', '/audi/r8/11.jpg', '/audi/r8/12.jpg',
      '/audi/r8/13.jpg', '/audi/r8/14.jpg', '/audi/r8/15.jpg', '/audi/r8/16.jpg',
      '/audi/r8/17.jpg', '/audi/r8/18.jpg', '/audi/r8/19.jpg', '/audi/r8/20.jpg',
      '/audi/r8/21.jpg', '/audi/r8/22.jpg', '/audi/r8/23.jpg', '/audi/r8/24.jpg',
      '/audi/r8/25.jpg'
    ],
    price: '211000',
    description: 'The ultimate mid-engine supercar.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '602 HP',
      acceleration: '3.1s',
      topSpeed: '205 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Audi R8 V10 Performance',
        description: 'El superdeportivo de motor central definitivo.',
        type: 'Supercar',
      },
      en: {
        name: 'Audi R8 V10 Performance',
        description: 'The ultimate mid-engine supercar.',
        type: 'Supercar',
      },
    }
  },
  {
    id: '911-turbo-s',
    brandId: 'porsche',
    name: 'Porsche 911 Turbo S',
    image: '/por/911/6.jpg',
    images: [
      '/por/911/1.jpg', '/por/911/2.jpg', '/por/911/3.jpg', '/por/911/4.jpg',
      '/por/911/5.jpg', '/por/911/6.jpg', '/por/911/7.jpg', '/por/911/8.jpg',
      '/por/911/9.jpg', '/por/911/10.jpg', '/por/911/11.jpg', '/por/911/12.jpg',
      '/por/911/13.jpg', '/por/911/14.jpg', '/por/911/15.jpg', '/por/911/16.jpg',
      '/por/911/17.jpg', '/por/911/18.jpg', '/por/911/19.jpg', '/por/911/20.jpg',
      '/por/911/21.jpg'
    ],
    price: '204000',
    description: 'The iconic Porsche 911 Turbo S, designed for pure performance.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '640 HP',
      acceleration: '2.7s',
      topSpeed: '205 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Porsche 911 Turbo S',
        description: 'El icónico Porsche 911 Turbo S, diseñado para un rendimiento puro.',
        type: 'Supercar',
      },
      en: {
        name: 'Porsche 911 Turbo S',
        description: 'The iconic Porsche 911 Turbo S, designed for pure performance.',
        type: 'Supercar',
      },
    }
  },
  {
    id: '718-cayman-gt4',
    brandId: 'porsche',
    name: 'Porsche 718 Cayman GT4',
    image: '/por/718/1.jpg',
    images: [
      '/por/718/1.jpg', '/por/718/2.jpg', '/por/718/3.jpg', '/por/718/4.jpg',
      '/por/718/5.jpg'
    ],
    price: '99000',
    description: 'A perfect balance of power and handling in a compact form.',
    type: 'Sports Car',
    year: 2025,
    specs: {
      power: '420 HP',
      acceleration: '3.8s',
      topSpeed: '188 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Porsche 718 Cayman GT4',
        description: 'Un equilibrio perfecto de potencia y manejo en una forma compacta.',
        type: 'Coche Deportivo',
      },
      en: {
        name: 'Porsche 718 Cayman GT4',
        description: 'A perfect balance of power and handling in a compact form.',
        type: 'Sports Car',
      },
    }
  },
  {
    id: 'panamera-turbo-s',
    brandId: 'porsche',
    name: 'Porsche Panamera Turbo S',
    image: '/por/panamera/1.webp',
    images: [
      '/por/panamera/1.webp', '/por/panamera/2.webp', '/por/panamera/3.webp', '/por/panamera/4.webp',
      '/por/panamera/5.webp', '/por/panamera/6.webp', '/por/panamera/7.webp', '/por/panamera/8.webp',
      '/por/panamera/9.webp', '/por/panamera/10.webp', '/por/panamera/11.webp', '/por/panamera/12.webp',
    ],
    price: '182000',
    description: 'The perfect combination of luxury and performance in a sedan.',
    type: 'Luxury Sedan',
    year: 2025,
    specs: {
      power: '620 HP',
      acceleration: '3.1s',
      topSpeed: '196 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Porsche Panamera Turbo S',
        description: 'La combinación perfecta de lujo y rendimiento en una berlina.',
        type: 'Sedán de lujo',
      },
      en: {
        name: 'Porsche Panamera Turbo S',
        description: 'The perfect combination of luxury and performance in a sedan.',
        type: 'Luxury Sedan',
      },
    }
  },
  {
    id: 'sf90-stradale',
    brandId: 'ferrari',
    name: 'Ferrari SF90 Stradale',
    image: '/fer/sf90/12.webp',
    images: [
      '/fer/sf90/1.jpg', '/fer/sf90/2.jpg', '/fer/sf90/3.jpg', '/fer/sf90/4.jpg',
      '/fer/sf90/5.jpg', '/fer/sf90/6.jpg', '/fer/sf90/7.jpg', '/fer/sf90/8.jpg',
      '/fer/sf90/9.webp', '/fer/sf90/10.webp', '/fer/sf90/11.webp', '/fer/sf90/12.webp',
      '/fer/sf90/13.webp', '/fer/sf90/14.webp', '/fer/sf90/15.webp', '/fer/sf90/16.webp',
      '/fer/sf90/17.webp', '/fer/sf90/18.webp', '/fer/sf90/19.webp', '/fer/sf90/20.webp',
      '/fer/sf90/21.webp', '/fer/sf90/22.webp', '/fer/sf90/23.webp', '/fer/sf90/24.webp',
      '/fer/sf90/25.webp', '/fer/sf90/26.webp'

    ],
    price: '625000',
    description: 'Ferrari’s most powerful and fastest road car, combining cutting-edge hybrid technology.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '986 HP',
      acceleration: '2.5s',
      topSpeed: '211 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Ferrari SF90 Stradale',
        description: 'El coche de carretera más potente y rápido de Ferrari, combinando tecnología híbrida de vanguardia.',
        type: 'Superdeportivo',
      },
      en: {
        name: 'Ferrari SF90 Stradale',
        description: 'Ferrari’s most powerful and fastest road car, combining cutting-edge hybrid technology.',
        type: 'Supercar',
      },
    }
  },
  {
    id: '812-superfast',
    brandId: 'ferrari',
    name: 'Ferrari 812 Superfast',
    image: '/fer/812/1.jpg',
    images: [
      '/fer/812/1.jpg', '/fer/812/2.jpg', '/fer/812/3.jpg', '/fer/812/4.jpg',
      '/fer/812/5.jpg', '/fer/812/6.jpg', '/fer/812/7.jpg', '/fer/812/8.jpg',
      '/fer/812/9.jpg', '/fer/812/10.jpg', '/fer/812/12.jpg', '/fer/812/13.jpg',
      '/fer/812/14.jpg', '/fer/812/15.jpg', '/fer/812/16.jpg'
    ],
    price: '335000',
    description: 'A naturally aspirated V12 engine delivering breathtaking performance and an unmatched driving experience.',
    type: 'Grand Tourer',
    year: 2025,
    specs: {
      power: '789 HP',
      acceleration: '2.9s',
      topSpeed: '211 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'fer 812 Superfast',
        description: 'Un motor V12 naturalmente aspirado que ofrece un rendimiento impresionante y una experiencia de conducción inigualable.',
        type: 'Gran Turismo',
      },
      en: {
        name: 'fer 812 Superfast',
        description: 'A naturally aspirated V12 engine delivering breathtaking performance and an unmatched driving experience.',
        type: 'Grand Tourer',
      },
    }
  },
  {
    id: 'portofino-m',
    brandId: 'ferrari',
    name: 'fer Portofino M',
    image: '/fer/portofino/1.jpg',
    images: [
      '/fer/portofino/1.jpg', '/fer/portofino/2.jpg', '/fer/portofino/3.jpg', '/fer/portofino/4.webp',
      '/fer/portofino/5.webp', '/fer/portofino/6.webp', '/fer/portofino/7.webp', '/fer/portofino/8.webp',
      '/fer/portofino/9.webp', '/fer/portofino/10.webp', '/fer/portofino/11.webp', '/fer/portofino/12.webp',
      '/fer/portofino/13.webp', '/fer/portofino/14.webp', '/fer/portofino/15.webp', '/fer/portofino/16.webp',
      '/fer/portofino/17.webp', '/fer/portofino/18.webp', '/fer/portofino/19.webp', '/fer/portofino/20.webp',
      '/fer/portofino/21.webp'
    ],
    price: '250000',
    description: 'The perfect blend of sportiness and elegance, combining a powerful twin-turbo V8 with an open-top design.',
    type: 'Convertible',
    year: 2025,
    specs: {
      power: '620 HP',
      acceleration: '3.5s',
      topSpeed: '199 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'fer Portofino M',
        description: 'La mezcla perfecta de deportividad y elegancia, combinando un potente V8 biturbo con un diseño de techo abierto.',
        type: 'Convertible',
      },
      en: {
        name: 'fer Portofino M',
        description: 'The perfect blend of sportiness and elegance, combining a powerful twin-turbo V8 with an open-top design.',
        type: 'Convertible',
      },
    }
  },
  {
    id: 'aventador-lp-780-4-ultimae',
    brandId: 'lamborghini',
    name: 'Lamborghini Aventador LP 780-4 Ultimae',
    image: '/lambo/aventador/5.jpg',
    images: [
      '/lambo/aventador/1.jpg', '/lambo/aventador/2.jpg', '/lambo/aventador/3.jpg',
      '/lambo/aventador/4.jpg', '/lambo/aventador/5.jpg', '/lambo/aventador/6.jpg',
      '/lambo/aventador/7.jpg', '/lambo/aventador/8.jpg', '/lambo/aventador/9.jpg',
      '/lambo/aventador/10.jpg', '/lambo/aventador/11.jpg', '/lambo/aventador/12.jpg',
      '/lambo/aventador/13.jpg', '/lambo/aventador/14.jpg', '/lambo/aventador/15.jpg',
      '/lambo/aventador/16.jpg', '/lambo/aventador/17.jpg', '/lambo/aventador/18.jpg',
      '/lambo/aventador/19.jpg', '/lambo/aventador/20.jpg', '/lambo/aventador/21.jpg',
      '/lambo/aventador/22.jpg', '/lambo/aventador/23.jpg', '/lambo/aventador/24.jpg',
      '/lambo/aventador/25.jpg', '/lambo/aventador/26.jpg', '/lambo/aventador/27.jpg',
      '/lambo/aventador/28.jpg', '/lambo/aventador/29.jpg', '/lambo/aventador/30.jpg',
      '/lambo/aventador/31.jpg', '/lambo/aventador/32.jpg', '/lambo/aventador/33.jpg',
      '/lambo/aventador/34.jpg'
    ],
    price: '498000',
    description: 'A celebration of the Aventador legacy with unmatched performance and design.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '780 HP',
      acceleration: '2.8s',
      topSpeed: '221 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Lamborghini Aventador LP 780-4 Ultimae',
        description: 'Una celebración del legado Aventador con un rendimiento y diseño incomparables.',
        type: 'Superdeportivo',
      },
      en: {
        name: 'Lamborghini Aventador LP 780-4 Ultimae',
        description: 'A celebration of the Aventador legacy with unmatched performance and design.',
        type: 'Supercar',
      },
    }
  },
  {
    id: 'huracan-sto',
    brandId: 'lamborghini',
    name: 'Lamborghini Huracán STO',
    image: '/lambo/huracan/30.jpg',
    images: [
      '/lambo/huracan/1.avif', '/lambo/huracan/2.avif', '/lambo/huracan/3.avif',
      '/lambo/huracan/4.avif', '/lambo/huracan/5.avif', '/lambo/huracan/6.avif',
      '/lambo/huracan/7.avif', '/lambo/huracan/8.avif', '/lambo/huracan/9.avif',
      '/lambo/huracan/10.avif', '/lambo/huracan/11.jpg', '/lambo/huracan/12.avif',
      '/lambo/huracan/13.jpg', '/lambo/huracan/14.avif', '/lambo/huracan/15.avif',
      '/lambo/huracan/16.webp', '/lambo/huracan/17.webp', '/lambo/huracan/18.webp',
      '/lambo/huracan/19.jpg', '/lambo/huracan/20.avif', '/lambo/huracan/21.jpg',
      '/lambo/huracan/22.avif', '/lambo/huracan/23.avif', '/lambo/huracan/24.avif',
      '/lambo/huracan/25.avif', '/lambo/huracan/26.avif', '/lambo/huracan/27.avif',
      '/lambo/huracan/28.avif', '/lambo/huracan/29.webp', '/lambo/huracan/30.avif',
      '/lambo/huracan/31.avif'
    ],
    price: '327000',
    description: 'Track-inspired engineering for the ultimate performance.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '640 HP',
      acceleration: '3.0s',
      topSpeed: '193 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Lamborghini Huracán STO',
        description: 'Ingeniería inspirada en la pista para el máximo rendimiento.',
        type: 'Superdeportivo',
      },
      en: {
        name: 'Lamborghini Huracán STO',
        description: 'Track-inspired engineering for the ultimate performance.',
        type: 'Supercar',
      },
    }
  },
  {
    id: 'urus-performante',
    brandId: 'lamborghini',
    name: 'Lamborghini Urus Performante',
    image: '/lambo/urus/1.jpg',
    images: [
      '/lambo/urus/1.jpg', '/lambo/urus/2.jpg', '/lambo/urus/3.jpg',
      '/lambo/urus/4.jpg', '/lambo/urus/5.jpg', '/lambo/urus/6.jpg',
      '/lambo/urus/7.jpg', '/lambo/urus/8.jpg', '/lambo/urus/9.jpg',
      '/lambo/urus/10.jpg', '/lambo/urus/11.jpg', '/lambo/urus/12.jpg',
       '/lambo/urus/14.jpg', '/lambo/urus/15.jpg',
      '/lambo/urus/16.jpg', '/lambo/urus/17.jpg',
    ],
    price: '260000',
    description: 'The pinnacle of high-performance SUVs.',
    type: 'SUV',
    year: 2025,
    specs: {
      power: '657 HP',
      acceleration: '3.3s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Lamborghini Urus Performante',
        description: 'El pináculo de los SUV de alto rendimiento.',
        type: 'SUV',
      },
      en: {
        name: 'Lamborghini Urus Performante',
        description: 'The pinnacle of high-performance SUVs.',
        type: 'SUV',
      },
    }
  },
  {
    id: 'chiron-super-sport',
    brandId: 'bugatti',
    name: 'Bugatti Chiron Super Sport 300+',
    image: '/bugatti/chiron/1.jpg',
    images: [
      '/bugatti/chiron/1.jpg', '/bugatti/chiron/2.jpg', '/bugatti/chiron/3.jpg',
      '/bugatti/chiron/4.jpg', '/bugatti/chiron/5.jpg', '/bugatti/chiron/6.jpg',
      '/bugatti/chiron/7.jpg', '/bugatti/chiron/8.jpg', '/bugatti/chiron/9.jpg',
      '/bugatti/chiron/10.jpg', '/bugatti/chiron/11.jpg', '/bugatti/chiron/12.jpg'
    ],
    price: '3800000',
    description: 'El hiperdeportivo más rápido del mundo con tecnología de punta',
    type: 'Hiperdeportivo',
    year: 2024,
    specs: {
      power: '1600 HP',
      acceleration: '2.4s',
      topSpeed: '304 mph'
    },
    stock: 3,
    translations: {
      es: {
        name: 'Bugatti Chiron Super Sport 300+',
        description: 'El hiperdeportivo más rápido del mundo con tecnología de punta',
        type: 'Hiperdeportivo',
      },
      en: {
        name: 'Bugatti Chiron Super Sport 300+',
        description: 'The world\'s fastest hypercar with cutting-edge technology',
        type: 'Hypercar',
      }
    }
  },
  {
    id: 'divo',
    brandId: 'bugatti',
    name: 'Bugatti Divo',
    image: '/bugatti/divo/1.jpg',
    images: [
      '/bugatti/divo/1.jpg', '/bugatti/divo/2.jpg', '/bugatti/divo/3.jpg',
      '/bugatti/divo/4.jpg', '/bugatti/divo/5.jpg', '/bugatti/divo/6.jpg',
      '/bugatti/divo/7.jpg', '/bugatti/divo/8.jpg', '/bugatti/divo/9.jpg'
    ],
    price: '5800000',
    description: 'Pura expresión de arte automotriz y rendimiento extremo',
    type: 'Hiperdeportivo',
    year: 2024,
    specs: {
      power: '1500 HP',
      acceleration: '2.4s',
      topSpeed: '236 mph'
    },
    stock: 1,
    translations: {
      es: {
        name: 'Bugatti Divo',
        description: 'Pura expresión de arte automotriz y rendimiento extremo',
        type: 'Hiperdeportivo',
      },
      en: {
        name: 'Bugatti Divo',
        description: 'Pure expression of automotive art and extreme performance',
        type: 'Hypercar',
      }
    }
  },
  {
    id: 'bolide',
    brandId: 'bugatti',
    name: 'Bugatti Bolide',
    image: '/bugatti/bolide/1.jpg',
    images: [
      '/bugatti/bolide/1.jpg', '/bugatti/bolide/2.jpg', '/bugatti/bolide/3.jpg',
      '/bugatti/bolide/4.jpg', '/bugatti/bolide/5.jpg', '/bugatti/bolide/6.jpg',
      '/bugatti/bolide/7.jpg', '/bugatti/bolide/8.jpg'
    ],
    price: '4200000',
    description: 'El track weapon definitivo con tecnología de F1',
    type: 'Track Car',
    year: 2025,
    specs: {
      power: '1825 HP',
      acceleration: '2.17s',
      topSpeed: '310 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Bugatti Bolide',
        description: 'El track weapon definitivo con tecnología de F1',
        type: 'Auto de pista',
      },
      en: {
        name: 'Bugatti Bolide',
        description: 'The ultimate track weapon with F1 technology',
        type: 'Track Car',
      }
    }
  },
  {
    id: 'jesko-absolut',
    brandId: 'koenigsegg',
    name: 'Koenigsegg Jesko Absolut',
    image: '/koenigsegg/jesko/1.jpg',
    images: [
      '/koenigsegg/jesko/1.jpg', '/koenigsegg/jesko/2.jpg', '/koenigsegg/jesko/3.jpg',
      '/koenigsegg/jesko/4.jpg', '/koenigsegg/jesko/5.jpg', '/koenigsegg/jesko/6.jpg',
      '/koenigsegg/jesko/7.jpg', '/koenigsegg/jesko/8.jpg', '/koenigsegg/jesko/9.jpg'
    ],
    price: '3000000',
    description: 'El auto de producción más rápido del mundo',
    type: 'Hiperdeportivo',
    year: 2024,
    specs: {
      power: '1600 HP',
      acceleration: '2.5s',
      topSpeed: '330 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Koenigsegg Jesko Absolut',
        description: 'El auto de producción más rápido del mundo',
        type: 'Hiperdeportivo',
      },
      en: {
        name: 'Koenigsegg Jesko Absolut',
        description: 'The world\'s fastest production car',
        type: 'Hypercar',
      }
    }
  },
  {
    id: 'gemera',
    brandId: 'koenigsegg',
    name: 'Koenigsegg Gemera',
    image: '/koenigsegg/gemera/1.jpg',
    images: [
      '/koenigsegg/gemera/1.jpg', '/koenigsegg/gemera/2.jpg', '/koenigsegg/gemera/3.jpg',
      '/koenigsegg/gemera/4.jpg', '/koenigsegg/gemera/5.jpg', '/koenigsegg/gemera/6.jpg',
      '/koenigsegg/gemera/7.jpg', '/koenigsegg/gemera/8.jpg'
    ],
    price: '1700000',
    description: 'El primer Mega-GT híbrido del mundo para 4 pasajeros',
    type: 'Gran Turismo',
    year: 2024,
    specs: {
      power: '1700 HP',
      acceleration: '1.9s',
      topSpeed: '248 mph'
    },
    stock: 5,
    translations: {
      es: {
        name: 'Koenigsegg Gemera',
        description: 'El primer Mega-GT híbrido del mundo para 4 pasajeros',
        type: 'Gran Turismo',
      },
      en: {
        name: 'Koenigsegg Gemera',
        description: 'World\'s first 4-seater hybrid Mega-GT',
        type: 'Grand Tourer',
      }
    }
  },
  {
    id: 'regera',
    brandId: 'koenigsegg',
    name: 'Koenigsegg Regera',
    image: '/koenigsegg/regera/1.jpg',
    images: [
      '/koenigsegg/regera/1.jpg', '/koenigsegg/regera/2.jpg', '/koenigsegg/regera/3.jpg',
      '/koenigsegg/regera/4.jpg', '/koenigsegg/regera/5.jpg', '/koenigsegg/regera/6.jpg',
      '/koenigsegg/regera/7.jpg', '/koenigsegg/regera/8.jpg'
    ],
    price: '2100000',
    description: 'Híbrido enchufable con transmisión directa revolucionaria',
    type: 'Hiperdeportivo',
    year: 2024,
    specs: {
      power: '1500 HP',
      acceleration: '2.8s',
      topSpeed: '255 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Koenigsegg Regera',
        description: 'Híbrido enchufable con transmisión directa revolucionaria',
        type: 'Hiperdeportivo',
      },
      en: {
        name: 'Koenigsegg Regera',
        description: 'Plug-in hybrid with revolutionary direct drive',
        type: 'Hypercar',
      }
    }
  },
  {
    id: 'ford-gt',
    brandId: 'ford',
    name: 'Ford GT',
    image: '/ford/gt/1.jpg',
    images: [
      '/ford/gt/1.jpg', '/ford/gt/2.jpg', '/ford/gt/3.jpg',
      '/ford/gt/4.jpg', '/ford/gt/5.jpg', '/ford/gt/6.jpg'
    ],
    price: '500000',
    description: 'Superdeportivo heredero del legendario ganador de Le Mans',
    year: 2024,
    type: 'Superdeportivo',
    specs: {
      power: '660 HP',
      acceleration: '2.8s 0-60 mph',
      topSpeed: '216 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Ford GT',
        description: 'Superdeportivo heredero del legendario ganador de Le Mans',
        type: 'Superdeportivo'
      },
      en: {
        name: 'Ford GT',
        description: 'Successor to the legendary Le Mans winner',
        type: 'Supercar'
      }
    }
  },
  {
    id: 'f150-raptor',
    brandId: 'ford',
    name: 'Ford F-150 Raptor',
    image: '/ford/raptor/1.jpg',
    images: [
      '/ford/raptor/1.jpg', '/ford/raptor/2.jpg', '/ford/raptor/3.jpg',
      '/ford/raptor/4.jpg', '/ford/raptor/5.jpg', '/ford/raptor/6.jpg'
    ],
    price: '78995',
    description: 'Pickup de alto desempeño para terrenos extremos',
    year: 2024,
    type: 'Pickup Off-Road',
    specs: {
      power: '450 HP',
      acceleration: '4.5s 0-60 mph',
      topSpeed: '107 mph'
    },
    stock: 15,
    translations: {
      es: {
        name: 'Ford F-150 Raptor',
        description: 'Pickup de alto rendimiento para terrenos extremos',
        type: 'Pickup Off-Road'
      },
      en: {
        name: 'Ford F-150 Raptor',
        description: 'High-performance off-road terrain truck',
        type: 'Off-Road Pickup'
      }
    }
  },
  {
    id: 'mustang-mach-e',
    brandId: 'ford',
    name: 'Ford Mustang Mach-E GT',
    image: '/ford/mach-e/1.jpg',
    images: [
      '/ford/mach-e/1.jpg', '/ford/mach-e/2.jpg', '/ford/mach-e/3.jpg',
      '/ford/mach-e/4.jpg', '/ford/mach-e/5.jpg', '/ford/mach-e/6.jpg'
    ],
    price: '69900',
    description: 'SUV eléctrico con ADN Mustang',
    year: 2024,
    type: 'SUV Eléctrico',
    specs: {
      power: '480 HP',
      acceleration: '3.5s 0-60 mph',
      topSpeed: '124 mph'
    },
    stock: 8,
    translations: {
      es: {
        name: 'Ford Mustang Mach-E GT',
        description: 'SUV eléctrico con ADN Mustang',
        type: 'SUV Eléctrico'
      },
      en: {
        name: 'Ford Mustang Mach-E GT',
        description: 'Electric SUV with Mustang DNA',
        type: 'Electric SUV'
      }
    }
  },
  {
    id: 'hyundai-genesis-gt3-rsr',
    brandId: 'hyundai',
    name: 'Hyundai Genesis Coupe GT3 RS-R',
    image: '/hyundai/gt3-rsr/1.jpg',
    images: [
      '/hyundai/gt3-rsr/1.jpg', '/hyundai/gt3-rsr/2.jpg', '/hyundai/gt3-rsr/3.jpg',
      '/hyundai/gt3-rsr/4.jpg', '/hyundai/gt3-rsr/5.jpg', '/hyundai/gt3-rsr/6.jpg'
    ],
    price: '450000',
    description: 'Edición limitada para pista con motor twin-turbo V6',
    year: 2024,
    type: 'Coupé Deportivo',
    specs: {
      power: '650 HP',
      acceleration: '2.9s 0-60 mph',
      topSpeed: '211 mph'
    },
    stock: 3,
    translations: {
      es: {
        name: 'Hyundai Genesis Coupe GT3 RS-R',
        description: 'Edición limitada para pista con motor twin-turbo V6',
        type: 'Coupé Deportivo'
      },
      en: {
        name: 'Hyundai Genesis Coupe GT3 RS-R',
        description: 'Track-only limited edition with twin-turbo V6 engine',
        type: 'Sports Coupe'
      }
    }
  },
  {
    id: 'hyundai-n-vision-2025',
    brandId: 'hyundai',
    name: 'Hyundai N 2025 Vision GT',
    image: '/hyundai/vision-gt/1.jpg',
    images: [
      '/hyundai/vision-gt/1.jpg', '/hyundai/vision-gt/2.jpg', '/hyundai/vision-gt/3.jpg',
      '/hyundai/vision-gt/4.jpg', '/hyundai/vision-gt/5.jpg', '/hyundai/vision-gt/6.jpg'
    ],
    price: '2800000',
    description: 'Hypercar conceptual con motor H6 de hidrógeno y transmisión híbrida',
    year: 2024,
    type: 'Hypercar',
    specs: {
      power: '887 HP',
      acceleration: '2.5s 0-60 mph',
      topSpeed: '248 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Hyundai N 2025 Vision GT',
        description: 'Hypercar conceptual con motor H6 de hidrógeno y transmisión híbrida',
        type: 'Hypercar'
      },
      en: {
        name: 'Hyundai N 2025 Vision GT',
        description: 'Concept hypercar with hydrogen H6 engine and hybrid transmission',
        type: 'Hypercar'
      }
    }
  },
  {
    id: 'hyundai-i20n-rally1',
    brandId: 'hyundai',
    name: 'Hyundai i20 N Rally1',
    image: '/hyundai/rally1/1.jpg',
    images: [
      '/hyundai/rally1/1.jpg', '/hyundai/rally1/2.jpg', '/hyundai/rally1/3.jpg',
      '/hyundai/rally1/4.jpg', '/hyundai/rally1/5.jpg', '/hyundai/rally1/6.jpg'
    ],
    price: '675000',
    description: 'Versión legal para calle del campeón del WRC 2023',
    year: 2024,
    type: 'Berlina Deportiva',
    specs: {
      power: '510 HP',
      acceleration: '3.1s 0-60 mph',
      topSpeed: '186 mph'
    },
    stock: 12,
    translations: {
      es: {
        name: 'Hyundai i20 N Rally1',
        description: 'Versión legal para calle del campeón del WRC 2023',
        type: 'Berlina Deportiva'
      },
      en: {
        name: 'Hyundai i20 N Rally1',
        description: 'Street-legal version of 2023 WRC champion',
        type: 'Sports Sedan'
      }
    }
  },
  {
    id: 'mclaren-f1-2024',
    brandId: 'mclaren',
    name: 'McLaren F1 LM Edition',
    image: '/mclaren/f1-lm/1.jpg',
    images: [
      '/mclaren/f1-lm/1.jpg', '/mclaren/f1-lm/2.jpg', '/mclaren/f1-lm/3.jpg',
      '/mclaren/f1-lm/4.jpg', '/mclaren/f1-lm/5.jpg', '/mclaren/f1-lm/6.jpg'
    ],
    price: '21000000',
    description: 'Reedición moderna del hiperdeportivo más puro de la historia',
    year: 2024,
    type: 'Hypercar',
    specs: {
      power: '627 HP',
      acceleration: '3.2s 0-60 mph',
      topSpeed: '240 mph'
    },
    stock: 5,
    translations: {
      es: {
        name: 'McLaren F1 Edición LM',
        description: 'Reedición moderna del hiperdeportivo más puro de la historia',
        type: 'Hiperdeportivo'
      },
      en: {
        name: 'McLaren F1 LM Edition',
        description: 'Modern reissue of the purest hypercar in history',
        type: 'Hypercar'
      }
    }
  },
  {
    id: 'mclaren-senna-gtr',
    brandId: 'mclaren',
    name: 'McLaren Senna GTR',
    image: '/mclaren/senna-gtr/1.jpg',
    images: [
      '/mclaren/senna-gtr/1.jpg', '/mclaren/senna-gtr/2.jpg', '/mclaren/senna-gtr/3.jpg',
      '/mclaren/senna-gtr/4.jpg', '/mclaren/senna-gtr/5.jpg', '/mclaren/senna-gtr/6.jpg'
    ],
    price: '1650000',
    description: 'Versión legal para calle del monstruo de pista',
    year: 2024,
    type: 'Track Hypercar',
    specs: {
      power: '825 HP',
      acceleration: '2.4s 0-60 mph',
      topSpeed: '211 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'McLaren Senna GTR',
        description: 'Versión legal para calle del monstruo de pista',
        type: 'Hiperdeportivo de Pista'
      },
      en: {
        name: 'McLaren Senna GTR',
        description: 'Street-legal version of the track monster',
        type: 'Track Hypercar'
      }
    }
  },
  {
    id: 'mclaren-765lt-spider',
    brandId: 'mclaren',
    name: 'McLaren 765LT Spider',
    image: '/mclaren/765lt-spider/1.jpg',
    images: [
      '/mclaren/765lt-spider/1.jpg', '/mclaren/765lt-spider/2.jpg', '/mclaren/765lt-spider/3.jpg',
      '/mclaren/765lt-spider/4.jpg', '/mclaren/765lt-spider/5.jpg', '/mclaren/765lt-spider/6.jpg'
    ],
    price: '498000',
    description: 'Descapotable más rápido de McLaren con aerodinámica activa',
    year: 2024,
    type: 'Supercar',
    specs: {
      power: '765 HP',
      acceleration: '2.7s 0-60 mph',
      topSpeed: '205 mph'
    },
    stock: 7,
    translations: {
      es: {
        name: 'McLaren 765LT Spider',
        description: 'Descapotable más rápido de McLaren con aerodinámica activa',
        type: 'Superdeportivo'
      },
      en: {
        name: 'McLaren 765LT Spider',
        description: 'Fastest McLaren convertible with active aerodynamics',
        type: 'Supercar'
      }
    }
  },
  
  {
    id: 'pagani-zonda-r',
    brandId: 'pagani',
    name: 'Pagani Zonda R',
    image: '/pagani/zonda-r/1.jpg',
    images: [
      '/pagani/zonda-r/1.jpg', '/pagani/zonda-r/2.jpg', '/pagani/zonda-r/3.jpg',
      '/pagani/zonda-r/4.jpg', '/pagani/zonda-r/5.jpg', '/pagani/zonda-r/6.jpg'
    ],
    price: '16500000',
    description: 'La esencia pura de las carreras en versión legal para calle',
    year: 2024,
    type: 'Track Hypercar',
    specs: {
      power: '750 HP',
      acceleration: '2.7s 0-60 mph',
      topSpeed: '217 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Pagani Zonda R',
        description: 'La esencia pura de las carreras en versión legal para calle',
        type: 'Hiperdeportivo de Pista'
      },
      en: {
        name: 'Pagani Zonda R',
        description: 'Pure racing essence in street-legal form',
        type: 'Track Hypercar'
      }
    }
  },
  {
    id: 'pagani-huayra-bc',
    brandId: 'pagani',
    name: 'Pagani Huayra BC',
    image: '/pagani/huayra-bc/1.jpg',
    images: [
      '/pagani/huayra-bc/1.jpg', '/pagani/huayra-bc/2.jpg', '/pagani/huayra-bc/3.jpg',
      '/pagani/huayra-bc/4.jpg', '/pagani/huayra-bc/5.jpg', '/pagani/huayra-bc/6.jpg'
    ],
    price: '3500000',
    description: 'Edición especial con aerodinámica activa y motor twin-turbo',
    year: 2024,
    type: 'Hypercar',
    specs: {
      power: '802 HP',
      acceleration: '2.8s 0-60 mph',
      topSpeed: '238 mph'
    },
    stock: 3,
    translations: {
      es: {
        name: 'Pagani Huayra BC',
        description: 'Edición especial con aerodinámica activa y motor twin-turbo',
        type: 'Hiperdeportivo'
      },
      en: {
        name: 'Pagani Huayra BC',
        description: 'Special edition with active aerodynamics and twin-turbo engine',
        type: 'Hypercar'
      }
    }
  },
  {
    id: 'pagani-imola',
    brandId: 'pagani',
    name: 'Pagani Imola',
    image: '/pagani/imola/1.jpg',
    images: [
      '/pagani/imola/1.jpg', '/pagani/imola/2.jpg', '/pagani/imola/3.jpg',
      '/pagani/imola/4.jpg', '/pagani/imola/5.jpg', '/pagani/imola/6.jpg'
    ],
    price: '5400000',
    description: '5 unidades existentes, motor V12 6.0L con 827 HP',
    year: 2024,
    type: 'Hypercar',
    specs: {
      power: '827 HP',
      acceleration: '2.6s 0-60 mph',
      topSpeed: '242 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Pagani Imola',
        description: '5 unidades existentes, motor V12 6.0L con 827 HP',
        type: 'Hiperdeportivo'
      },
      en: {
        name: 'Pagani Imola',
        description: 'Only 5 units, 6.0L V12 engine with 827 HP',
        type: 'Hypercar'
      }
    }
  },
  {
    id: 'pagani-utopia',
    brandId: 'pagani',
    name: 'Pagani Utopia',
    image: '/pagani/utopia/1.jpg',
    images: [
      '/pagani/utopia/1.jpg', '/pagani/utopia/2.jpg', '/pagani/utopia/3.jpg',
      '/pagani/utopia/4.jpg', '/pagani/utopia/5.jpg', '/pagani/utopia/6.jpg'
    ],
    price: '7200000',
    description: 'Hiperdeportivo analógico definitivo con manual de 7 velocidades',
    year: 2024,
    type: 'Hypercar',
    specs: {
      power: '864 HP',
      acceleration: '2.9s 0-60 mph',
      topSpeed: '230 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Pagani Utopia',
        description: 'Hiperdeportivo analógico definitivo con manual de 7 velocidades',
        type: 'Hiperdeportivo'
      },
      en: {
        name: 'Pagani Utopia',
        description: 'Ultimate analog hypercar with 7-speed manual',
        type: 'Hypercar'
      }
    }
  },
  {
    id: 'pagani-zonda-hp-barchetta',
    brandId: 'pagani',
    name: 'Pagani Zonda HP Barchetta',
    image: '/pagani/zonda-barchetta/1.jpg',
    images: [
      '/pagani/zonda-barchetta/1.jpg', '/pagani/zonda-barchetta/2.jpg', '/pagani/zonda-barchetta/3.jpg',
      '/pagani/zonda-barchetta/4.jpg', '/pagani/zonda-barchetta/5.jpg', '/pagani/zonda-barchetta/6.jpg'
    ],
    price: '17500000',
    description: 'Edición sin techo limitada a 3 unidades mundialmente',
    year: 2024,
    type: 'Roadster Hypercar',
    specs: {
      power: '789 HP',
      acceleration: '3.0s 0-60 mph',
      topSpeed: '220 mph'
    },
    stock: 1,
    translations: {
      es: {
        name: 'Pagani Zonda HP Barchetta',
        description: 'Edición sin techo limitada a 3 unidades mundialmente',
        type: 'Roadster Hiperdeportivo'
      },
      en: {
        name: 'Pagani Zonda HP Barchetta',
        description: 'Roofless edition limited to 3 units worldwide',
        type: 'Hypercar Roadster'
      }
    }
  },
  {
    id: 'rolls-royce-phantom-serie-viii',
    brandId: 'rolls-royce',
    name: 'Rolls-Royce Phantom VIII',
    image: '/rolls-royce/phantom/1.jpg',
    images: [
      '/rolls-royce/phantom/1.jpg', '/rolls-royce/phantom/2.jpg', '/rolls-royce/phantom/3.jpg',
      '/rolls-royce/phantom/4.jpg', '/rolls-royce/phantom/5.jpg', '/rolls-royce/phantom/6.jpg'
    ],
    price: '460000',
    description: 'El epítome del lujo automotriz con techo estrellado personalizable',
    year: 2024,
    type: 'Sedán de Lujo',
    specs: {
      power: '563 HP',
      acceleration: '5.1s 0-60 mph',
      topSpeed: '155 mph'
    },
    stock: 9,
    translations: {
      es: {
        name: 'Rolls-Royce Phantom VIII',
        description: 'El epítome del lujo automotriz con techo estrellado personalizable',
        type: 'Sedán de Lujo'
      },
      en: {
        name: 'Rolls-Royce Phantom VIII',
        description: 'Epitome of automotive luxury with customizable starlight headliner',
        type: 'Luxury Sedan'
      }
    }
  },
  {
    id: 'rolls-royce-cullinan-black-badge',
    brandId: 'rolls-royce',
    name: 'Rolls-Royce Cullinan Black Badge',
    image: '/rolls-royce/cullinan/1.jpg',
    images: [
      '/rolls-royce/cullinan/1.jpg', '/rolls-royce/cullinan/2.jpg', '/rolls-royce/cullinan/3.jpg',
      '/rolls-royce/cullinan/4.jpg', '/rolls-royce/cullinan/5.jpg', '/rolls-royce/cullinan/6.jpg'
    ],
    price: '387000',
    description: 'SUV más lujoso del mundo con detalles en fibra de carbono',
    year: 2024,
    type: 'SUV de Lujo',
    specs: {
      power: '600 HP',
      acceleration: '4.8s 0-60 mph',
      topSpeed: '155 mph'
    },
    stock: 5,
    translations: {
      es: {
        name: 'Rolls-Royce Cullinan Black Badge',
        description: 'SUV más lujoso del mundo con detalles en fibra de carbono',
        type: 'SUV de Lujo'
      },
      en: {
        name: 'Rolls-Royce Cullinan Black Badge',
        description: 'World\'s most luxurious SUV with carbon fiber accents',
        type: 'Luxury SUV'
      }
    }
  },
  {
    id: 'rolls-royce-ghost-ewb',
    brandId: 'rolls-royce',
    name: 'Rolls-Royce Ghost Extended Wheelbase',
    image: '/rolls-royce/ghost/1.jpg',
    images: [
      '/rolls-royce/ghost/1.jpg', '/rolls-royce/ghost/2.jpg', '/rolls-royce/ghost/3.jpg',
      '/rolls-royce/ghost/4.jpg', '/rolls-royce/ghost/5.jpg', '/rolls-royce/ghost/6.jpg'
    ],
    price: '345000',
    description: 'Versión alargada con butacas reclinables masajeadoras',
    year: 2024,
    type: 'Sedán Ejecutivo',
    specs: {
      power: '563 HP',
      acceleration: '4.6s 0-60 mph',
      topSpeed: '155 mph'
    },
    stock: 12,
    translations: {
      es: {
        name: 'Rolls-Royce Ghost EWB',
        description: 'Versión alargada con butacas reclinables masajeadoras',
        type: 'Sedán Ejecutivo'
      },
      en: {
        name: 'Rolls-Royce Ghost Extended Wheelbase',
        description: 'Long-wheelbase version with massage reclining seats',
        type: 'Executive Sedan'
      }
    }
  },
  {
    id: 'rolls-royce-wraith-black-badge',
    brandId: 'rolls-royce',
    name: 'Rolls-Royce Wraith Black Badge',
    image: '/rolls-royce/wraith/1.jpg',
    images: [
      '/rolls-royce/wraith/1.jpg', '/rolls-royce/wraith/2.jpg', '/rolls-royce/wraith/3.jpg',
      '/rolls-royce/wraith/4.jpg', '/rolls-royce/wraith/5.jpg', '/rolls-royce/wraith/6.jpg'
    ],
    price: '330000',
    description: 'Coupé biplaza con techo panorámico estrellado y motor V12 biturbo',
    year: 2024,
    type: 'Gran Turismo',
    specs: {
      power: '624 HP',
      acceleration: '4.3s 0-60 mph',
      topSpeed: '155 mph'
    },
    stock: 3,
    translations: {
      es: {
        name: 'Rolls-Royce Wraith Black Badge',
        description: 'Coupé biplaza con techo panorámico estrellado y motor V12 biturbo',
        type: 'Gran Turismo'
      },
      en: {
        name: 'Rolls-Royce Wraith Black Badge',
        description: 'Two-seater coupé with starlight headliner and twin-turbo V12',
        type: 'Grand Tourer'
      }
    }
  },
  {
    id: 'rolls-royce-sweptail',
    brandId: 'rolls-royce',
    name: 'Rolls-Royce Sweptail',
    image: '/rolls-royce/sweptail/1.jpg',
    images: [
      '/rolls-royce/sweptail/1.jpg', '/rolls-royce/sweptail/2.jpg', '/rolls-royce/sweptail/3.jpg',
      '/rolls-royce/sweptail/4.jpg', '/rolls-royce/sweptail/5.jpg', '/rolls-royce/sweptail/6.jpg'
    ],
    price: '12800000',
    description: 'Coupé único hecho a mano inspirado en yates clásicos',
    year: 2024,
    type: 'Coupé Bespoke',
    specs: {
      power: '593 HP',
      acceleration: '4.8s 0-60 mph',
      topSpeed: '155 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Rolls-Royce Sweptail',
        description: 'Coupé único hecho a mano inspirado en yates clásicos',
        type: 'Coupé Personalizado'
      },
      en: {
        name: 'Rolls-Royce Sweptail',
        description: 'One-off handbuilt coupé inspired by classic yachts',
        type: 'Bespoke Coupé'
      }
    }
  },
  {
    id: 'tesla-roadster-2024',
    brandId: 'tesla',
    name: 'Tesla Roadster 2024',
    image: '/tesla/roadster/1.jpg',
    images: [
      '/tesla/roadster/1.jpg', '/tesla/roadster/2.jpg', '/tesla/roadster/3.jpg',
      '/tesla/roadster/4.jpg', '/tesla/roadster/5.jpg', '/tesla/roadster/6.jpg'
    ],
    price: '250000',
    description: 'El deportivo eléctrico más rápido del mundo con paquete SpaceX',
    year: 2024,
    type: 'Hiperdeportivo Eléctrico',
    specs: {
      power: '1500 HP',
      acceleration: '1.9s 0-60 mph',
      topSpeed: '250 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Tesla Roadster 2024',
        description: 'El deportivo eléctrico más rápido del mundo con paquete SpaceX',
        type: 'Hiperdeportivo Eléctrico'
      },
      en: {
        name: 'Tesla Roadster 2024',
        description: 'World\'s fastest electric sports car with SpaceX package',
        type: 'Electric Hypercar'
      }
    }
  },
  {
    id: 'cybertruck-tri-motor',
    brandId: 'tesla',
    name: 'Tesla Cybertruck Tri Motor',
    image: '/tesla/cybertruck/1.jpg',
    images: [
      '/tesla/cybertruck/1.jpg', '/tesla/cybertruck/2.jpg', '/tesla/cybertruck/3.jpg',
      '/tesla/cybertruck/4.jpg', '/tesla/cybertruck/5.jpg', '/tesla/cybertruck/6.jpg'
    ],
    price: '89900',
    description: 'Pickup todoterreno con exoesqueleto de acero inoxidable',
    year: 2024,
    type: 'Pickup Eléctrica',
    specs: {
      power: '845 HP',
      acceleration: '2.6s 0-60 mph',
      topSpeed: '130 mph'
    },
    stock: 15,
    translations: {
      es: {
        name: 'Tesla Cybertruck Tri Motor',
        description: 'Pickup todoterreno con exoesqueleto de acero inoxidable',
        type: 'Pickup Eléctrica'
      },
      en: {
        name: 'Tesla Cybertruck Tri Motor',
        description: 'All-terrain truck with stainless steel exoskeleton',
        type: 'Electric Pickup'
      }
    }
  },
  {
    id: 'model-s-plaid-plus',
    brandId: 'tesla',
    name: 'Tesla Model S Plaid+',
    image: '/tesla/model-s/1.jpg',
    images: [
      '/tesla/model-s/1.jpg', '/tesla/model-s/2.jpg', '/tesla/model-s/3.jpg',
      '/tesla/model-s/4.jpg', '/tesla/model-s/5.jpg', '/tesla/model-s/6.jpg'
    ],
    price: '149990',
    description: 'Sedán eléctrico con pantalla táctil giratoria y autonomía de 640 km',
    year: 2024,
    type: 'Sedán Ejecutivo',
    specs: {
      power: '1100 HP',
      acceleration: '1.99s 0-60 mph',
      topSpeed: '200 mph'
    },
    stock: 8,
    translations: {
      es: {
        name: 'Tesla Model S Plaid+',
        description: 'Sedán eléctrico con pantalla táctil giratoria y autonomía de 640 km',
        type: 'Sedán Ejecutivo'
      },
      en: {
        name: 'Tesla Model S Plaid+',
        description: 'Executive sedan with rotating touchscreen and 400-mile range',
        type: 'Executive Sedan'
      }
    }
  },
  {
    id: 'tesla-semi',
    brandId: 'tesla',
    name: 'Tesla Semi',
    image: '/tesla/semi/1.jpg',
    images: [
      '/tesla/semi/1.jpg', '/tesla/semi/2.jpg', '/tesla/semi/3.jpg',
      '/tesla/semi/4.jpg', '/tesla/semi/5.jpg', '/tesla/semi/6.jpg'
    ],
    price: '250000',
    description: 'Camión eléctrico con 800 km de autonomía y carga Megawatt',
    year: 2024,
    type: 'Camión de Carga',
    specs: {
      power: '1200 HP',
      acceleration: '20s 0-60 mph (con carga)',
      topSpeed: '65 mph'
    },
    stock: 25,
    translations: {
      es: {
        name: 'Tesla Semi',
        description: 'Camión eléctrico con 800 km de autonomía y carga Megawatt',
        type: 'Camión de Carga'
      },
      en: {
        name: 'Tesla Semi',
        description: 'Electric truck with 500-mile range and Megawatt charging',
        type: 'Freight Truck'
      }
    }
  },
  {
    id: 'tesla-model-r',
    brandId: 'tesla',
    name: 'Tesla Model R',
    image: '/tesla/model-r/1.jpg',
    images: [
      '/tesla/model-r/1.jpg', '/tesla/model-r/2.jpg', '/tesla/model-r/3.jpg',
      '/tesla/model-r/4.jpg', '/tesla/model-r/5.jpg', '/tesla/model-r/6.jpg'
    ],
    price: '299000',
    description: 'Supercar con batería estructural de 4680 cells y 4 motores',
    year: 2024,
    type: 'Supercar Eléctrica',
    specs: {
      power: '1600 HP',
      acceleration: '1.7s 0-60 mph',
      topSpeed: '265 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Tesla Model R',
        description: 'Supercar con batería estructural de 4680 cells y 4 motores',
        type: 'Supercar Eléctrica'
      },
      en: {
        name: 'Tesla Model R',
        description: 'Supercar with 4680 structural battery and quad motors',
        type: 'Electric Supercar'
      }
    }
  },
  {
    id: 'toyota-gr-supra-grnm',
    brandId: 'toyota',
    name: 'Toyota GR Supra GRMN',
    image: '/toyota/gr-supra-grmn/1.jpg',
    images: [
      '/toyota/gr-supra-grmn/1.jpg', '/toyota/gr-supra-grmn/2.jpg', '/toyota/gr-supra-grmn/3.jpg',
      '/toyota/gr-supra-grmn/4.jpg', '/toyota/gr-supra-grmn/5.jpg', '/toyota/gr-supra-grmn/6.jpg'
    ],
    price: '145000',
    description: 'Edición limitada con motor BMW B58 mejorado y aerodinámica de competición',
    year: 2024,
    type: 'Coupé Deportivo',
    specs: {
      power: '510 HP',
      acceleration: '3.5s 0-60 mph',
      topSpeed: '180 mph'
    },
    stock: 8,
    translations: {
      es: {
        name: 'Toyota GR Supra GRMN',
        description: 'Edición limitada con motor BMW B58 mejorado y aerodinámica de competición',
        type: 'Coupé Deportivo'
      },
      en: {
        name: 'Toyota GR Supra GRMN',
        description: 'Limited edition with upgraded BMW B58 engine and race aerodynamics',
        type: 'Sports Coupe'
      }
    }
  },
  {
    id: 'toyota-gr-yaris-rally1',
    brandId: 'toyota',
    name: 'Toyota GR Yaris Rally1',
    image: '/toyota/gr-yaris-rally1/1.jpg',
    images: [
      '/toyota/gr-yaris-rally1/1.jpg', '/toyota/gr-yaris-rally1/2.jpg', '/toyota/gr-yaris-rally1/3.jpg',
      '/toyota/gr-yaris-rally1/4.jpg', '/toyota/gr-yaris-rally1/5.jpg', '/toyota/gr-yaris-rally1/6.jpg'
    ],
    price: '98000',
    description: 'Versión legal para calle del campeón del WRC 2023, tracción integral GR-FOUR',
    year: 2024,
    type: 'Hatchback Deportivo',
    specs: {
      power: '310 HP',
      acceleration: '4.6s 0-60 mph',
      topSpeed: '149 mph'
    },
    stock: 15,
    translations: {
      es: {
        name: 'Toyota GR Yaris Rally1',
        description: 'Versión legal para calle del campeón del WRC 2023, tracción integral GR-FOUR',
        type: 'Hatchback Deportivo'
      },
      en: {
        name: 'Toyota GR Yaris Rally1',
        description: 'Street-legal version of 2023 WRC champion, GR-FOUR all-wheel drive',
        type: 'Sports Hatchback'
      }
    }
  },
  {
    id: 'toyota-gr-corolla-morizo',
    brandId: 'toyota',
    name: 'Toyota GR Corolla Morizo',
    image: '/toyota/gr-corolla-morizo/1.jpg',
    images: [
      '/toyota/gr-corolla-morizo/1.jpg', '/toyota/gr-corolla-morizo/2.jpg', '/toyota/gr-corolla-morizo/3.jpg',
      '/toyota/gr-corolla-morizo/4.jpg', '/toyota/gr-corolla-morizo/5.jpg', '/toyota/gr-corolla-morizo/6.jpg'
    ],
    price: '82000',
    description: 'Edición especial sin asientos traseros y peso reducido, 1.6L turbo 3 cilindros',
    year: 2024,
    type: 'Hot Hatch',
    specs: {
      power: '310 HP',
      acceleration: '4.8s 0-60 mph',
      topSpeed: '145 mph'
    },
    stock: 5,
    translations: {
      es: {
        name: 'Toyota GR Corolla Morizo',
        description: 'Edición especial sin asientos traseros y peso reducido, 1.6L turbo 3 cilindros',
        type: 'Hot Hatch'
      },
      en: {
        name: 'Toyota GR Corolla Morizo',
        description: 'Special edition with no rear seats and reduced weight, 1.6L turbo 3-cylinder',
        type: 'Hot Hatch'
      }
    }
  },
  {
    id: 'toyota-gr86-gt4',
    brandId: 'toyota',
    name: 'Toyota GR86 GT4',
    image: '/toyota/gr86-gt4/1.jpg',
    images: [
      '/toyota/gr86-gt4/1.jpg', '/toyota/gr86-gt4/2.jpg', '/toyota/gr86-gt4/3.jpg',
      '/toyota/gr86-gt4/4.jpg', '/toyota/gr86-gt4/5.jpg', '/toyota/gr86-gt4/6.jpg'
    ],
    price: '135000',
    description: 'Versión de pista homologada con motor boxer 2.4L y caja secuencial',
    year: 2024,
    type: 'Coupé de Competición',
    specs: {
      power: '270 HP',
      acceleration: '4.1s 0-60 mph',
      topSpeed: '158 mph'
    },
    stock: 3,
    translations: {
      es: {
        name: 'Toyota GR86 GT4',
        description: 'Versión de pista homologada con motor boxer 2.4L y caja secuencial',
        type: 'Coupé de Competición'
      },
      en: {
        name: 'Toyota GR86 GT4',
        description: 'Homologated track version with 2.4L boxer engine and sequential gearbox',
        type: 'Race Coupe'
      }
    }
  },
  {
    id: 'toyota-land-cruiser-gr-sport',
    brandId: 'toyota',
    name: 'Toyota Land Cruiser GR Sport',
    image: '/toyota/land-cruiser-gr/1.jpg',
    images: [
      '/toyota/land-cruiser-gr/1.jpg', '/toyota/land-cruiser-gr/2.jpg', '/toyota/land-cruiser-gr/3.jpg',
      '/toyota/land-cruiser-gr/4.jpg', '/toyota/land-cruiser-gr/5.jpg', '/toyota/land-cruiser-gr/6.jpg'
    ],
    price: '118000',
    description: 'SUV de lujo con suspensión reforzada y motor Twin-Turbo V6',
    year: 2024,
    type: 'SUV de Alto Rendimiento',
    specs: {
      power: '415 HP',
      acceleration: '5.7s 0-60 mph',
      topSpeed: '130 mph'
    },
    stock: 10,
    translations: {
      es: {
        name: 'Toyota Land Cruiser GR Sport',
        description: 'SUV de lujo con suspensión reforzada y motor Twin-Turbo V6',
        type: 'SUV de Alto Rendimiento'
      },
      en: {
        name: 'Toyota Land Cruiser GR Sport',
        description: 'Luxury SUV with reinforced suspension and Twin-Turbo V6 engine',
        type: 'Performance SUV'
      }
    }
  },
  {
    id: 'vw-golf-gti-clubsport',
    brandId: 'volkswagen',
    name: 'Volkswagen Golf GTI Clubsport',
    image: '/volkswagen/gti-clubsport/1.jpg',
    images: [
      '/volkswagen/gti-clubsport/1.jpg', '/volkswagen/gti-clubsport/2.jpg', '/volkswagen/gti-clubsport/3.jpg',
      '/volkswagen/gti-clubsport/4.jpg', '/volkswagen/gti-clubsport/5.jpg', '/volkswagen/gti-clubsport/6.jpg'
    ],
    price: '48900',
    description: 'Edición especial para pista con aerodinámica mejorada y motor 2.0L TSI',
    year: 2024,
    type: 'Hot Hatch',
    specs: {
      power: '300 HP',
      acceleration: '5.6s 0-60 mph',
      topSpeed: '155 mph'
    },
    stock: 12,
    translations: {
      es: {
        name: 'Volkswagen Golf GTI Clubsport',
        description: 'Edición especial para pista con aerodinámica mejorada y motor 2.0L TSI',
        type: 'Hatchback Deportivo'
      },
      en: {
        name: 'Volkswagen Golf GTI Clubsport',
        description: 'Track-focused special edition with enhanced aerodynamics and 2.0L TSI engine',
        type: 'Hot Hatch'
      }
    }
  },
  {
    id: 'vw-arteon-r-line',
    brandId: 'volkswagen',
    name: 'Volkswagen Arteon R-Line',
    image: '/volkswagen/arteon-r/1.jpg',
    images: [
      '/volkswagen/arteon-r/1.jpg', '/volkswagen/arteon-r/2.jpg', '/volkswagen/arteon-r/3.jpg',
      '/volkswagen/arteon-r/4.jpg', '/volkswagen/arteon-r/5.jpg', '/volkswagen/arteon-r/6.jpg'
    ],
    price: '62900',
    description: 'Fastback de lujo con motor VR6 3.0L y tracción 4Motion',
    year: 2024,
    type: 'Gran Turismo',
    specs: {
      power: '360 HP',
      acceleration: '4.8s 0-60 mph',
      topSpeed: '168 mph'
    },
    stock: 8,
    translations: {
      es: {
        name: 'Volkswagen Arteon R-Line',
        description: 'Fastback de lujo con motor VR6 3.0L y tracción 4Motion',
        type: 'Gran Turismo'
      },
      en: {
        name: 'Volkswagen Arteon R-Line',
        description: 'Luxury fastback with 3.0L VR6 engine and 4Motion AWD',
        type: 'Grand Tourer'
      }
    }
  },
  {
    id: 'vw-id4-gtx',
    brandId: 'volkswagen',
    name: 'Volkswagen ID.4 GTX',
    image: '/volkswagen/id4-gtx/1.jpg',
    images: [
      '/volkswagen/id4-gtx/1.jpg', '/volkswagen/id4-gtx/2.jpg', '/volkswagen/id4-gtx/3.jpg',
      '/volkswagen/id4-gtx/4.jpg', '/volkswagen/id4-gtx/5.jpg', '/volkswagen/id4-gtx/6.jpg'
    ],
    price: '58900',
    description: 'SUV eléctrico de alto rendimiento con doble motor y tracción total',
    year: 2024,
    type: 'SUV Eléctrico',
    specs: {
      power: '340 HP',
      acceleration: '5.2s 0-60 mph',
      topSpeed: '112 mph'
    },
    stock: 15,
    translations: {
      es: {
        name: 'Volkswagen ID.4 GTX',
        description: 'SUV eléctrico de alto rendimiento con doble motor y tracción total',
        type: 'SUV Eléctrico'
      },
      en: {
        name: 'Volkswagen ID.4 GTX',
        description: 'High-performance electric SUV with dual motors and AWD',
        type: 'Electric SUV'
      }
    }
  },
  {
    id: 'vw-touareg-r-line',
    brandId: 'volkswagen',
    name: 'Volkswagen Touareg R-Line',
    image: '/volkswagen/touareg-r/1.jpg',
    images: [
      '/volkswagen/touareg-r/1.jpg', '/volkswagen/touareg-r/2.jpg', '/volkswagen/touareg-r/3.jpg',
      '/volkswagen/touareg-r/4.jpg', '/volkswagen/touareg-r/5.jpg', '/volkswagen/touareg-r/6.jpg'
    ],
    price: '78500',
    description: 'SUV premium con motor V6 TDI y sistema de suspensión adaptable',
    year: 2024,
    type: 'SUV de Lujo',
    specs: {
      power: '286 HP',
      acceleration: '6.5s 0-60 mph',
      topSpeed: '130 mph'
    },
    stock: 10,
    translations: {
      es: {
        name: 'Volkswagen Touareg R-Line',
        description: 'SUV premium con motor V6 TDI y sistema de suspensión adaptable',
        type: 'SUV de Lujo'
      },
      en: {
        name: 'Volkswagen Touareg R-Line',
        description: 'Premium SUV with V6 TDI engine and adaptive suspension',
        type: 'Luxury SUV'
      }
    }
  },
  {
    id: 'vw-idr-supercar',
    brandId: 'volkswagen',
    name: 'Volkswagen ID.R Supercar',
    image: '/volkswagen/idr-supercar/1.jpg',
    images: [
      '/volkswagen/idr-supercar/1.jpg', '/volkswagen/idr-supercar/2.jpg', '/volkswagen/idr-supercar/3.jpg',
      '/volkswagen/idr-supercar/4.jpg', '/volkswagen/idr-supercar/5.jpg', '/volkswagen/idr-supercar/6.jpg'
    ],
    price: '2200000',
    description: 'Concept eléctrico inspirado en el récord de Pikes Peak, 4 motores y tracción integral',
    year: 2024,
    type: 'Hiperdeportivo Eléctrico',
    specs: {
      power: '680 HP',
      acceleration: '2.2s 0-60 mph',
      topSpeed: '220 mph'
    },
    stock: 0,
    translations: {
      es: {
        name: 'Volkswagen ID.R Supercar',
        description: 'Concept eléctrico inspirado en el récord de Pikes Peak, 4 motores y tracción integral',
        type: 'Hiperdeportivo Eléctrico'
      },
      en: {
        name: 'Volkswagen ID.R Supercar',
        description: 'Electric concept inspired by Pikes Peak record, quad motors and AWD',
        type: 'Electric Hypercar'
      }
    }
  },
  {
    id: 'maserati-mc20',
    brandId: 'maserati',
    name: 'Maserati MC20',
    image: '/maserati/mc20/1.jpg',
    images: [
      '/maserati/mc20/1.jpg', '/maserati/mc20/2.jpg', '/maserati/mc20/3.jpg',
      '/maserati/mc20/4.jpg', '/maserati/mc20/5.jpg', '/maserati/mc20/6.jpg'
    ],
    price: '215000',
    description: 'Superdeportivo con motor Nettuno V6 de 621 HP y chasis de fibra de carbono',
    year: 2024,
    type: 'Superdeportivo',
    specs: {
      power: '621 HP',
      acceleration: '2.9s 0-60 mph',
      topSpeed: '202 mph'
    },
    stock: 8,
    translations: {
      es: {
        name: 'Maserati MC20',
        description: 'Superdeportivo con motor Nettuno V6 de 621 HP y chasis de fibra de carbono',
        type: 'Superdeportivo'
      },
      en: {
        name: 'Maserati MC20',
        description: 'Supercar with Nettuno V6 engine and carbon fiber chassis',
        type: 'Supercar'
      }
    }
  },
  {
    id: 'maserati-quattroporte-gt',
    brandId: 'maserati',
    name: 'Maserati Quattroporte GT',
    image: '/maserati/quattroporte/1.jpg',
    images: [
      '/maserati/quattroporte/1.jpg', '/maserati/quattroporte/2.jpg', '/maserati/quattroporte/3.jpg',
      '/maserati/quattroporte/4.jpg', '/maserati/quattroporte/5.jpg', '/maserati/quattroporte/6.jpg'
    ],
    price: '145000',
    description: 'Berlina de lujo con motor V8 biturbo y transmisión Q4 AWD',
    year: 2024,
    type: 'Berlina de Lujo',
    specs: {
      power: '572 HP',
      acceleration: '4.5s 0-60 mph',
      topSpeed: '203 mph'
    },
    stock: 12,
    translations: {
      es: {
        name: 'Maserati Quattroporte GT',
        description: 'Berlina de lujo con motor V8 biturbo y transmisión Q4 AWD',
        type: 'Berlina de Lujo'
      },
      en: {
        name: 'Maserati Quattroporte GT',
        description: 'Luxury sedan with twin-turbo V8 engine and Q4 AWD',
        type: 'Luxury Sedan'
      }
    }
  },
  {
    id: 'maserati-levante-trofeo',
    brandId: 'maserati',
    name: 'Maserati Levante Trofeo',
    image: '/maserati/levante/1.jpg',
    images: [
      '/maserati/levante/1.jpg', '/maserati/levante/2.jpg', '/maserati/levante/3.jpg',
      '/maserati/levante/4.jpg', '/maserati/levante/5.jpg', '/maserati/levante/6.jpg'
    ],
    price: '178000',
    description: 'SUV de alto rendimiento con motor Ferrari-derived V8',
    year: 2024,
    type: 'SUV Deportivo',
    specs: {
      power: '580 HP',
      acceleration: '3.9s 0-60 mph',
      topSpeed: '187 mph'
    },
    stock: 6,
    translations: {
      es: {
        name: 'Maserati Levante Trofeo',
        description: 'SUV de alto rendimiento con motor V8 derivado de Ferrari',
        type: 'SUV Deportivo'
      },
      en: {
        name: 'Maserati Levante Trofeo',
        description: 'High-performance SUV with Ferrari-derived V8 engine',
        type: 'Performance SUV'
      }
    }
  },
  {
    id: 'maserati-ghibli-trofeo',
    brandId: 'maserati',
    name: 'Maserati Ghibli Trofeo',
    image: '/maserati/ghibli/1.jpg',
    images: [
      '/maserati/ghibli/1.jpg', '/maserati/ghibli/2.jpg', '/maserati/ghibli/3.jpg',
      '/maserati/ghibli/4.jpg', '/maserati/ghibli/5.jpg', '/maserati/ghibli/6.jpg'
    ],
    price: '112000',
    description: 'Sedán deportivo con motor V8 3.8L y modo Corsa para pista',
    year: 2024,
    type: 'Sedán Deportivo',
    specs: {
      power: '572 HP',
      acceleration: '4.1s 0-60 mph',
      topSpeed: '203 mph'
    },
    stock: 9,
    translations: {
      es: {
        name: 'Maserati Ghibli Trofeo',
        description: 'Sedán deportivo con motor V8 3.8L y modo Corsa para pista',
        type: 'Sedán Deportivo'
      },
      en: {
        name: 'Maserati Ghibli Trofeo',
        description: 'Sports sedan with 3.8L V8 engine and Corsa track mode',
        type: 'Sports Sedan'
      }
    }
  },
  {
    id: 'maserati-granturismo-modena',
    brandId: 'maserati',
    name: 'Maserati GranTurismo Modena',
    image: '/maserati/granturismo/1.jpg',
    images: [
      '/maserati/granturismo/1.jpg', '/maserati/granturismo/2.jpg', '/maserati/granturismo/3.jpg',
      '/maserati/granturismo/4.jpg', '/maserati/granturismo/5.jpg', '/maserati/granturismo/6.jpg'
    ],
    price: '195000',
    description: 'Coupé GT con motor V6 biturbo y transmisión de 8 velocidades',
    year: 2024,
    type: 'Gran Turismo',
    specs: {
      power: '490 HP',
      acceleration: '3.9s 0-60 mph',
      topSpeed: '186 mph'
    },
    stock: 5,
    translations: {
      es: {
        name: 'Maserati GranTurismo Modena',
        description: 'Coupé GT con motor V6 biturbo y transmisión de 8 velocidades',
        type: 'Gran Turismo'
      },
      en: {
        name: 'Maserati GranTurismo Modena',
        description: 'GT coupé with twin-turbo V6 engine and 8-speed transmission',
        type: 'Grand Tourer'
      }
    }
  },
  {
    id: 'chevrolet-corvette-z06',
    brandId: 'chevrolet',
    name: 'Chevrolet Corvette Z06',
    image: '/chevrolet/corvette-z06/1.jpg',
    images: [
      '/chevrolet/corvette-z06/1.jpg', '/chevrolet/corvette-z06/2.jpg', '/chevrolet/corvette-z06/3.jpg',
      '/chevrolet/corvette-z06/4.jpg', '/chevrolet/corvette-z06/5.jpg', '/chevrolet/corvette-z06/6.jpg'
    ],
    price: '125000',
    description: 'Superdeportivo con motor LT6 V8 de 670 HP y tracción trasera',
    year: 2024,
    type: 'Superdeportivo',
    specs: {
      power: '670 HP',
      acceleration: '2.6s 0-60 mph',
      topSpeed: '195 mph'
    },
    stock: 10,
    translations: {
      es: {
        name: 'Chevrolet Corvette Z06',
        description: 'Superdeportivo con motor LT6 V8 de 670 HP y tracción trasera',
        type: 'Superdeportivo'
      },
      en: {
        name: 'Chevrolet Corvette Z06',
        description: 'Supercar with LT6 V8 engine and rear-wheel drive',
        type: 'Supercar'
      }
    }
  },
  {
    id: 'chevrolet-camaro-zl1',
    brandId: 'chevrolet',
    name: 'Chevrolet Camaro ZL1',
    image: '/chevrolet/camaro-zl1/1.jpg',
    images: [
      '/chevrolet/camaro-zl1/1.jpg', '/chevrolet/camaro-zl1/2.jpg', '/chevrolet/camaro-zl1/3.jpg',
      '/chevrolet/camaro-zl1/4.jpg', '/chevrolet/camaro-zl1/5.jpg', '/chevrolet/camaro-zl1/6.jpg'
    ],
    price: '75000',
    description: 'Muscle car con supercargador TVS 2650 y 650 HP',
    year: 2024,
    type: 'Muscle Car',
    specs: {
      power: '650 HP',
      acceleration: '3.5s 0-60 mph',
      topSpeed: '175 mph'
    },
    stock: 15,
    translations: {
      es: {
        name: 'Chevrolet Camaro ZL1',
        description: 'Muscle car con supercargador TVS 2650 y 650 HP',
        type: 'Muscle Car'
      },
      en: {
        name: 'Chevrolet Camaro ZL1',
        description: 'Muscle car with TVS 2650 supercharger and 650 HP',
        type: 'Muscle Car'
      }
    }
  },
  {
    id: 'chevrolet-silverado-high-country',
    brandId: 'chevrolet',
    name: 'Chevrolet Silverado High Country',
    image: '/chevrolet/silverado/1.jpg',
    images: [
      '/chevrolet/silverado/1.jpg', '/chevrolet/silverado/2.jpg', '/chevrolet/silverado/3.jpg',
      '/chevrolet/silverado/4.jpg', '/chevrolet/silverado/5.jpg', '/chevrolet/silverado/6.jpg'
    ],
    price: '78000',
    description: 'Pickup de lujo con motor Duramax Turbo-Diesel 3.0L y tecnología Multi-Flex Tailgate',
    year: 2024,
    type: 'Pickup de Lujo',
    specs: {
      power: '305 HP',
      acceleration: '6.8s 0-60 mph',
      topSpeed: '115 mph'
    },
    stock: 20,
    translations: {
      es: {
        name: 'Chevrolet Silverado High Country',
        description: 'Pickup de lujo con motor Duramax Turbo-Diesel 3.0L y tecnología Multi-Flex Tailgate',
        type: 'Pickup de Lujo'
      },
      en: {
        name: 'Chevrolet Silverado High Country',
        description: 'Luxury pickup with 3.0L Duramax Turbo-Diesel engine and Multi-Flex Tailgate',
        type: 'Luxury Pickup'
      }
    }
  },
  {
    id: 'chevrolet-tahoe-z71',
    brandId: 'chevrolet',
    name: 'Chevrolet Tahoe Z71',
    image: '/chevrolet/tahoe-z71/1.jpg',
    images: [
      '/chevrolet/tahoe-z71/1.jpg', '/chevrolet/tahoe-z71/2.jpg', '/chevrolet/tahoe-z71/3.jpg',
      '/chevrolet/tahoe-z71/4.jpg', '/chevrolet/tahoe-z71/5.jpg', '/chevrolet/tahoe-z71/6.jpg'
    ],
    price: '82000',
    description: 'SUV todoterreno con suspensión Off-Road y motor EcoTec3 V8 6.2L',
    year: 2024,
    type: 'SUV Off-Road',
    specs: {
      power: '420 HP',
      acceleration: '5.7s 0-60 mph',
      topSpeed: '120 mph'
    },
    stock: 12,
    translations: {
      es: {
        name: 'Chevrolet Tahoe Z71',
        description: 'SUV todoterreno con suspensión Off-Road y motor EcoTec3 V8 6.2L',
        type: 'SUV Off-Road'
      },
      en: {
        name: 'Chevrolet Tahoe Z71',
        description: 'Off-road SUV with specialized suspension and 6.2L EcoTec3 V8 engine',
        type: 'Off-Road SUV'
      }
    }
  },
  {
    id: 'chevrolet-colorado-zr2',
    brandId: 'chevrolet',
    name: 'Chevrolet Colorado ZR2',
    image: '/chevrolet/colorado-zr2/1.jpg',
    images: [
      '/chevrolet/colorado-zr2/1.jpg', '/chevrolet/colorado-zr2/2.jpg', '/chevrolet/colorado-zr2/3.jpg',
      '/chevrolet/colorado-zr2/4.jpg', '/chevrolet/colorado-zr2/5.jpg', '/chevrolet/colorado-zr2/6.jpg'
    ],
    price: '48000',
    description: 'Pickup mediana con bloqueo diferencial y motor Turbo 2.7L High-Output',
    year: 2024,
    type: 'Pickup Off-Road',
    specs: {
      power: '310 HP',
      acceleration: '6.2s 0-60 mph',
      topSpeed: '110 mph'
    },
    stock: 18,
    translations: {
      es: {
        name: 'Chevrolet Colorado ZR2',
        description: 'Pickup mediana con bloqueo diferencial y motor Turbo 2.7L High-Output',
        type: 'Pickup Off-Road'
      },
      en: {
        name: 'Chevrolet Colorado ZR2',
        description: 'Midsize truck with differential lock and 2.7L Turbo High-Output engine',
        type: 'Off-Road Pickup'
      }
    }
  },
  {
    id: 'lcs-500-sport-Convertible',
    brandId: 'lexus',
    name: 'Lexus LC 500 Sport Convertible',
    image: '/lexus/lc/1.jpg',
    images: [
      '/lexus/lc/1.jpg', 
      '/lexus/lc/2.jpg', 
      '/lexus/lc/3.jpg'
    ],
    price: '1200000',
    description: 'El coche de lujo más elegante y potente que puedes imaginar',
    type: 'Coupé Convertible',
    year: 2024,
    specs: {
      power: '520 HP',
      acceleration: '3.5s',
      topSpeed: '260 mph'
    },
    stock: 5,
    translations: {
      en: {
        name: 'Lexus LC 500 Sport Convertible',
        description: 'The most elegant and powerful luxury car you can imagine',
        type: 'Coupe Convertible'
      },
      es: {
        name: 'Lexus LC 500 Sport Convertible',
        description: 'El coche de lujo más elegante y potente que puedes imaginar',
        type: 'Coupé Convertible'
      }
    }
  },

  // Segundo vehículo de Lexus:
  {
    id: 'es-300-sedan',
    brandId: 'lexus',
    name: 'Lexus ES 300 Sedán',
    image: '/lexus/es/1.jpg',
    images: [
      '/lexus/es/1.jpg', 
      '/lexus/es/2.jpg', 
      '/lexus/es/3.jpg'
    ],
    price: '45000',
    description: 'El sedan de lujo más confiable y cómodo para viajar',
    type: 'Sedán',
    year: 2024,
    specs: {
      power: '302 HP',
      acceleration: '6.7s',
      topSpeed: '180 mph'
    },
    stock: 8,
    translations: {
      en: {
        name: 'Lexus ES 300 Sedán',
        description: 'The most comfortable and reliable luxury sedan for travel',
        type: 'Sedan'
      },
      es: {
        name: 'Lexus ES 300 Sedán',
        description: 'El sedan de lujo más confiable y cómodo para viajar',
        type: 'Sedán'
      }
    }
  },
  {
    id: 'db-11-v12-sports-coupe',
    brandId: 'aston-martin',
    name: 'Aston Martin DB 11 V12 Coupe Sport',
    image: '/aston-martin/db/1.jpg',
    images: [
      '/aston-martin/db/1.jpg', 
      '/aston-martin/db/2.jpg', 
      '/aston-martin/db/3.jpg'
    ],
    price: '1800000',
    description: 'El coche deportivo más erótico y potente que has ever seen',
    type: 'Coupe Sport',
    year: 2024,
    specs: {
      power: '608 HP',
      acceleration: '3.6s',
      topSpeed: '296 mph'
    },
    stock: 7,
    translations: {
      en: {
        name: 'Aston Martin DB 11 V12 Coupe Sport',
        description: 'The most sexy and powerful sports car you\'ve ever seen',
        type: 'Coupe Sport'
      },
      es: {
        name: 'Aston Martin DB 11 V12 Coupe Deportivo',
        description: 'El coche deportivo más erótico y potente que has ever seen',
        type: 'Coupé Deportivo'
      }
    }
  },

  // Segundo vehículo de Aston Martin:
  {
    id: 'dbs-superlegger-convertible',
    brandId: 'aston-martin',
    name: 'Aston Martin DBS Superlegger Convertible',
    image: '/aston-martin/dbs/1.jpg',
    images: [
      '/aston-martin/dbs/1.jpg', 
      '/aston-martin/dbs/2.jpg', 
      '/aston-martin/dbs/3.jpg'
    ],
    price: '3200000',
    description: 'El hiperdeportivo más erótico y lujoso del mundo',
    type: 'Convertible Sport',
    year: 2024,
    specs: {
      power: '715 HP',
      acceleration: '4.1s',
      topSpeed: '328 mph'
    },
    stock: 6,
    translations: {
      en: {
        name: 'Aston Martin DBS Superlegger Convertible',
        description: 'The most sexy and luxurious hypercar in the world',
        type: 'Convertible Sport'
      },
      es: {
        name: 'Aston Martin DBS Superlegger Convertible',
        description: 'El hiperdeportivo más erótico y lujoso del mundo',
        type: 'Coupé Deportivo'
      }
    }
  },
  {
    id: 'alfa-romeo-gulia-quadrifoglio-sedan',
    brandId: 'alfa-romeo',
    name: 'Alfa Romeo Giulia Quadrifoglio Sedán',
    image: '/alfa-romeo/gulia/1.jpg', 
    images: [
      '/alfa-romeo/gulia/2.jpg',
      '/alfa-romeo/gulia/3.jpg'
    ],
    price: '1200000',
    description: 'El sedán más deportivo de Alfa Romeo, con una potencia considerable y rendimiento excepcional.',
    type: 'Sports Sedán',
    year: 2016,
    specs: {
      power: '280 HP',
      acceleration: '5.1 seconds (0-60 mph)', 
      topSpeed: '155 mph'
    },
    stock: 5,
    translations: {
      en: {
        name: 'Alfa Romeo Giulia Quadrifoglio Sedan',
        description: 'The most powerful sedan from Alfa Romeo, with considerable power and exceptional performance.',
        type: 'Performance Sedan'
      },
      es: {
        name: 'Alfa Romeo Giulia Quadrifoglio Sedán',
        description: 'El sedán más deportivo de Alfa Romeo, con una potencia considerable y rendimiento excepcional.',
        type: 'Sports Sedán'
      }
    }
  },
  {
    id: 'alfa-romeo-8c-45-deportivo', 
    brandId: 'alfa-romeo',
    name: 'Alfa Romeo 8C 45° Deportivo',
    image: '/alfa-romeo/8c/1.jpg',
    images: [
      '/alfa-romeo/8c/2.jpg',
      '/alfa-romeo/8c/3.jpg'
    ],
    price: '1800000',
    description: 'Un coche clásico de gran potencia y estilo, ideal para los amantes de la velocidad.',
    type: 'Coupé Deportivo',
    year: 2019,
    specs: {
      power: '450 HP',
      acceleration: '3.9 seconds (0-60 mph)',
      topSpeed: '174 mph'
    },
    stock: 6,
    translations: {
      en: {
        name: 'Alfa Romeo 8C 45° Sports Car',
        description: 'A classic car with great power and style, perfect for speed enthusiasts.',
        type: 'Sports Car'
      },
      es: {
        name: 'Alfa Romeo 8C 45° Deportivo',
        description: 'Un coche clásico de gran potencia y estilo, ideal para los amantes de la velocidad.',
        type: 'Coupé Deportivo'
      }
    }
  }
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Ruta para obtener todas las marcas (con caché de 5 minutos)
app.get('/brands', cacheMiddleware('5 minutes'), (req, res) => {
  const start = Date.now();
  
  // Simular algo de procesamiento
  setTimeout(() => {
    const responseTime = Date.now() - start;
    res.json({
      success: true,
      count: brands.length,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('apicache-store') ? true : false,
      timestamp: new Date().toISOString(),
      data: brands
    });
  }, 100); // Simular 100ms de procesamiento
});

// Ruta para obtener una marca específica por ID (con caché de 3 minutos)
app.get('/brands/:id', cacheMiddleware('3 minutes'), (req, res) => {
  const start = Date.now();
  
  const brand = brands.find(b => b.id === req.params.id);
  if (!brand) {
    return res.status(404).json({ 
      success: false,
      error: 'Marca no encontrada',
      responseTime: `${Date.now() - start}ms`,
      timestamp: new Date().toISOString()
    });
  }
  
  // Simular algo de procesamiento
  setTimeout(() => {
    const responseTime = Date.now() - start;
    res.json({
      success: true,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('apicache-store') ? true : false,
      timestamp: new Date().toISOString(),
      data: brand
    });
  }, 50); // Simular 50ms de procesamiento
});

// Ruta para limpiar TODO el caché
app.delete('/cache', (req, res) => {
  apicache.clear();
  res.json({ 
    success: true, 
    message: 'Todo el caché ha sido limpiado',
    timestamp: new Date().toISOString()
  });
});

// Ruta para limpiar caché específico
app.delete('/cache/:key', (req, res) => {
  const key = req.params.key;
  apicache.clear(key);
  res.json({ 
    success: true, 
    message: `Caché para "${key}" ha sido limpiado`,
    timestamp: new Date().toISOString()
  });
});

// Ruta para ver estadísticas del caché
app.get('/cache/stats', (req, res) => {
  const performance = apicache.getPerformance();
  const index = apicache.getIndex();
  
  res.json({
    success: true,
    performance: performance,
    index: index,
    timestamp: new Date().toISOString()
  });
});

// === RUTAS DE VEHÍCULOS ===

// Ruta para obtener todos los vehículos (con caché de 3 minutos)
app.get('/vehicles', cacheMiddleware('3 minutes'), (req, res) => {
  const start = Date.now();
  
  setTimeout(() => {
    const responseTime = Date.now() - start;
    res.json({
      success: true,
      count: vehicles.length,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('apicache-store') ? true : false,
      timestamp: new Date().toISOString(),
      data: vehicles
    });
  }, 50);
});

// Ruta para obtener un vehículo específico por ID (con caché de 5 minutos)
app.get('/vehicles/:id', cacheMiddleware('5 minutes'), (req, res) => {
  const start = Date.now();
  
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) {
    return res.status(404).json({ 
      success: false,
      error: 'Vehículo no encontrado',
      responseTime: `${Date.now() - start}ms`,
      timestamp: new Date().toISOString()
    });
  }
  
  setTimeout(() => {
    const responseTime = Date.now() - start;
    res.json({
      success: true,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('apicache-store') ? true : false,
      timestamp: new Date().toISOString(),
      data: vehicle
    });
  }, 30);
});

// Ruta para obtener vehículos por marca (con caché de 4 minutos)
app.get('/brands/:brandId/vehicles', cacheMiddleware('4 minutes'), (req, res) => {
  const start = Date.now();
  const brandId = req.params.brandId;
  
  // Verificar que la marca existe
  const brand = brands.find(b => b.id === brandId);
  if (!brand) {
    return res.status(404).json({ 
      success: false,
      error: 'Marca no encontrada',
      responseTime: `${Date.now() - start}ms`,
      timestamp: new Date().toISOString()
    });
  }
  
  const brandVehicles = vehicles.filter(v => v.brandId === brandId);
  
  setTimeout(() => {
    const responseTime = Date.now() - start;
    res.json({
      success: true,
      brand: brand.name,
      count: brandVehicles.length,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('apicache-store') ? true : false,
      timestamp: new Date().toISOString(),
      data: brandVehicles
    });
  }, 40);
});

// Ruta para obtener vehículos con sus datos de marca (JOIN simulado)
app.get('/vehicles-with-brands', cacheMiddleware('5 minutes'), (req, res) => {
  const start = Date.now();
  
  setTimeout(() => {
    const vehiclesWithBrands = vehicles.map(vehicle => {
      const brand = brands.find(b => b.id === vehicle.brandId);
      return {
        ...vehicle,
        brand: brand ? {
          id: brand.id,
          name: brand.name,
          description: brand.description,
          foundation: brand.foundation
        } : null
      };
    });
    
    const responseTime = Date.now() - start;
    res.json({
      success: true,
      count: vehiclesWithBrands.length,
      responseTime: `${responseTime}ms`,
      cached: res.getHeader('apicache-store') ? true : false,
      timestamp: new Date().toISOString(),
      data: vehiclesWithBrands
    });
  }, 60);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en el puerto 3000 SALUDOS');
});
