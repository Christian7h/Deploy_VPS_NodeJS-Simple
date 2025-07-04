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

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor escuchando en el puerto 3000 SALUDOS');
});
