import { TriviaRound, Category, RankInfo } from '../types/game';

export const RANKS: RankInfo[] = [
  { minLevel: 1, title: 'Novato Curioso', badge: '🌱', description: 'Empiezas a sospechar de lo que lees.' },
  { minLevel: 5, title: 'Detective de Mitos', badge: '🔍', description: 'Separas el grano de la paja con buen ojo.' },
  { minLevel: 10, title: 'Cazador de Fake News', badge: '🎯', description: 'Tu radar de mentiras empieza a afilarse.' },
  { minLevel: 16, title: 'Sabio Escéptico', badge: '🧠', description: 'No crees nada sin contrastar fuentes.' },
  { minLevel: 25, title: 'Oráculo de la Verdad', badge: '👁️', description: 'Identificas la falsedad entre la niebla.' },
  { minLevel: 35, title: 'Mente Maestra', badge: '⚡', description: 'Pocos humanos logran superar este umbral.' },
  { minLevel: 50, title: 'Leyenda del Saber Infinito', badge: '👑', description: 'Has trascendido todo engaño terrenal.' },
];

export function getRankForLevel(level: number): RankInfo {
  const sorted = [...RANKS].sort((a, b) => b.minLevel - a.minLevel);
  const matched = sorted.find((r) => level >= r.minLevel);
  return matched || RANKS[0];
}

// 25 RONDAS CURADAS: Hechos extraordinarios, divertidos, bizarros y mentiras convincentes
export const CURATED_ROUNDS: TriviaRound[] = [
  // NIVEL 1 - CINE & SERIES (Secretos Absurdos de Rodaje)
  {
    id: 'round-1',
    level: 1,
    category: 'cine',
    themeTitle: 'Secretos Desopilantes de Rodaje',
    facts: [
      {
        id: 'f-1-1',
        text: 'En "Star Wars: El Imperio Contraataca", en la escena del campo de asteroides, uno de los asteroides flotantes es literalmente una patata real y otro es un zapato de tenis.',
        isLie: false,
        explanation: '¡VERDAD! Los animadores de efectos especiales de Industrial Light & Magic estaban agotados por las exigencias de George Lucas y colaron una patata y una zapatilla en las tomas. Lucas nunca lo notó y quedaron en el montaje final.',
        category: 'cine',
        difficulty: 1,
      },
      {
        id: 'f-1-2',
        text: 'Los chillidos y gruñidos con los que se comunican los velocirraptores en "Jurassic Park" fueron creados grabando el audio de tortugas marinas gigantes apareándose.',
        isLie: false,
        explanation: '¡VERDAD! El diseñador de sonido Gary Rydstrom pasó meses grabando animales; descubrió que las tortugas de Galápagos copulando en un zoológico producían el sonido alienígena perfecto para los velocirraptores.',
        category: 'cine',
        difficulty: 1,
      },
      {
        id: 'f-1-3',
        text: 'En "Titanic", Leonardo DiCaprio se negó a entrar al agua porque padecía una alergia extrema al cloro, por lo que usaron un maniquí animatrónico en todas las tomas bajo el agua.',
        isLie: true,
        explanation: '¡MENTIRA! DiCaprio estuvo incontables horas en los tanques de agua (que estaban climatizados a 27°C). Lo irónico es que DiCaprio se quejaba del calor del agua y James Cameron bromeaba con despedirlo si seguía protestando.',
        category: 'cine',
        difficulty: 1,
      },
    ],
  },

  // NIVEL 2 - HISTORIA BIZARRA (Leyes y Juicios Insólitos)
  {
    id: 'round-2',
    level: 2,
    category: 'historia',
    themeTitle: 'Leyes y Trámites Absurdos del Pasado',
    facts: [
      {
        id: 'f-2-1',
        text: 'En 1974, la momia de 3.000 años del faraón egipcio Ramsés II tuvo que tramitar un pasaporte oficial legal con foto para viajar a París... y en la casilla de profesión decía: "Rey (fallecido)".',
        isLie: false,
        explanation: '¡VERDAD! La ley francesa prohíbe el ingreso de cualquier persona viva o muerta sin pasaporte vigente. Además, al aterrizar en París, los restos de la momia fueron recibidos con honores militares oficiales de jefe de Estado.',
        category: 'historia',
        difficulty: 1,
      },
      {
        id: 'f-2-2',
        text: 'En la Edad Media, los animales eran llevados a juicio formal con jueces y abogados defensores: en 1474 en Suiza, un gallo fue condenado a morir quemado en la hoguera por poner un huevo.',
        isLie: false,
        explanation: '¡VERDAD! Los aldeanos creían que un huevo puesto por un gallo engendraría un basilisco demoníaco. A pesar de que su abogado argumentó que el animal actuó sin malicia, el tribunal lo declaró culpable de hechicería.',
        category: 'historia',
        difficulty: 1,
      },
      {
        id: 'f-2-3',
        text: 'En 1923 durante la hiperinflación en Alemania, el correo postal permitía legalmente franquear cartas pegando salchichas secas sobre el sobre como moneda de cambio oficial.',
        isLie: true,
        explanation: '¡MENTIRA! La inflación era tan surrealista que un sello postal costaba miles de millones de marcos y la gente cargaba billetes en carretillas para comprar pan, pero jamás se aceptaron embutidos como franqueo postal.',
        category: 'historia',
        difficulty: 1,
      },
    ],
  },

  // NIVEL 3 - NATURALEZA Y CIENCIA LOCA (Animales Asombrosos)
  {
    id: 'round-3',
    level: 3,
    category: 'geografia',
    themeTitle: 'Caprichos de la Madre Naturaleza',
    facts: [
      {
        id: 'f-3-1',
        text: 'Los wombats de Australia son los únicos animales del planeta cuyas heces tienen forma perfectamente cúbica; hacen hasta 100 cubos al día y los apilan sobre piedras para que no rueden.',
        isLie: false,
        explanation: '¡VERDAD! Su intestino tiene ranuras elásticas alternadas que moldean la materia fecal en cubos casi matemáticos. Los usan como pirámides aromáticas en rocas elevadas para delimitar su territorio sin que rueden cuesta abajo.',
        category: 'geografia',
        difficulty: 1,
      },
      {
        id: 'f-3-2',
        text: 'Las nutrias marinas tienen un bolsillo de piel debajo de sus axilas donde guardan durante toda su vida su piedra favorita para abrir moluscos y almejas.',
        isLie: false,
        explanation: '¡VERDAD! Tienen un pliegue anatómico en el pecho donde almacenan su piedra predilecta y bocadillos de emergencia para no perderlos mientras flotan relajadas boca arriba en el agua.',
        category: 'geografia',
        difficulty: 1,
      },
      {
        id: 'f-3-3',
        text: 'Los camellos almacenan hasta 40 litros de agua líquida pura dentro de sus jorobas para sobrevivir semanas enteras bajo el sol del desierto.',
        isLie: true,
        explanation: '¡MENTIRA! Las jorobas de los camellos no contienen agua: contienen hasta 35 kilos de grasa concentrada. Esta grasa les sirve de reserva calórica y evita que el calor corporal se acumule en el resto del cuerpo.',
        category: 'geografia',
        difficulty: 1,
      },
    ],
  },

  // NIVEL 4 - MÚSICA Y ROCK STARS (Locuras de Leyendas)
  {
    id: 'round-4',
    level: 4,
    category: 'musica',
    themeTitle: 'Excentricidades de Íconos Musicales',
    facts: [
      {
        id: 'f-4-1',
        text: 'Ozzy Osbourne intentó esnifar una fila de hormigas vivas del suelo con una pajita tras perder una apuesta con los integrantes de la banda Mötley Crüe junto a la piscina de un hotel.',
        isLie: false,
        explanation: '¡VERDAD! En la gira de 1984, Tommy Lee y Nikki Sixx desafiaron a Ozzy a demostrar quién era el más desquiciado; Ozzy se agachó y aspiró las hormigas vivas sin pestañear ante el asombro del grupo.',
        category: 'musica',
        difficulty: 2,
      },
      {
        id: 'f-4-2',
        text: 'Michael Jackson y Freddie Mercury nunca terminaron su dueto porque Mercury abandonó el estudio enfurecido cuando Michael insistió en meter a su llama mascota al cuarto de grabación.',
        isLie: false,
        explanation: '¡VERDAD! Freddie llamó desesperado a su mánager Jim Beach diciendo: "¿Puedes sacarme de aquí? Estoy grabando entre una llama y Michael Jackson y ya no puedo más".',
        category: 'musica',
        difficulty: 2,
      },
      {
        id: 'f-4-3',
        text: 'Los miembros de Kiss patentaron la tinta roja mezclada con su propia sangre para imprimir su primer cómic, pero la imprenta perdió los frascos y usó témpera roja común.',
        isLie: true,
        explanation: '¡MENTIRA! La sangre sí se mezcló ante notario público con los tambores de tinta en la imprenta de Marvel en Buffalo, y los cómics de 1977 fueron impresos con sangre auténtica de Gene Simmons, Paul Stanley, Ace Frehley y Peter Criss.',
        category: 'musica',
        difficulty: 2,
      },
    ],
  },

  // NIVEL 5 - CINE Y ACCIDENTES ÉPICOS
  {
    id: 'round-5',
    level: 5,
    category: 'cine',
    themeTitle: 'Dolor y Sangre Real en la Gran Pantalla',
    facts: [
      {
        id: 'f-5-1',
        text: 'En "El Señor de los Anillos: Las Dos Torres", cuando Aragorn patea con furia un casco de orco y suelta un desgarrador grito de agonía, Viggo Mortensen se fracturó dos dedos del pie en ese segundo.',
        isLie: false,
        explanation: '¡VERDAD! Tras varias tomas insatisfactorias, Mortensen pateó el pesado casco de hierro con todas sus fuerzas. El director Peter Jackson pensó que era una actuación magistral, pero eran alaridos de auténtica fractura.',
        category: 'cine',
        difficulty: 2,
      },
      {
        id: 'f-5-2',
        text: 'En "Django Unchained", Leonardo DiCaprio rompió sin querer una copa de cristal con la mano, se abrió la carne y sangró a chorros, pero continuó actuando y le untó su sangre real en la cara a Kerry Washington.',
        isLie: false,
        explanation: '¡VERDAD! Tarantino nunca detuvo la toma. DiCaprio ignoró el dolor y el charco de sangre, continuó su feroz monólogo y al terminar la escena todo el set lo ovacionó antes de llevarlo a urgencias.',
        category: 'cine',
        difficulty: 2,
      },
      {
        id: 'f-5-3',
        text: 'Arnold Schwarzenegger dobló su propia voz al alemán en "Terminator", pero los cines usaron subtítulos porque su acento sonaba incomprensible por el sonido de los disparos.',
        isLie: true,
        explanation: '¡MENTIRA! Arnold habla alemán nativo, pero los productores contrataron a un actor de doblaje profesional porque el marcado acento austríaco rural de Arnold sonaba demasiado cómico y campechano para un temible cíborg asesino.',
        category: 'cine',
        difficulty: 2,
      },
    ],
  },

  // NIVEL 6 - HISTORIA BIZARRA (Batallas y Proyectos Ridículos)
  {
    id: 'round-6',
    level: 6,
    category: 'historia',
    themeTitle: 'Guerras y Proyectos Espías Disparatados',
    facts: [
      {
        id: 'f-6-1',
        text: 'En 1932, el ejército de Australia declaró la guerra y desplegó soldados armados con ametralladoras pesadas contra 20.000 emúes... y los emúes ganaron la guerra.',
        isLie: false,
        explanation: '¡VERDAD! En la célebre "Guerra del Emú", las aves corrían a 50 km/h en zig-zag y resistían múltiples impactos. El ejército gastó miles de proyectiles con resultados tan pobres que se retiró derrotado.',
        category: 'historia',
        difficulty: 2,
      },
      {
        id: 'f-6-2',
        text: 'Durante la Guerra Fría, la CIA gastó 20 millones de dólares en el "Proyecto Acoustic Kitty" para convertir a un gato en espía implantándole un micrófono y una antena en la cola... pero fue atropellado por un taxi en su primera misión.',
        isLie: false,
        explanation: '¡VERDAD! Tras años de cirugías complejas para ocultar los cables dentro del felino, lo soltaron en un parque para espiar a diplomáticos soviéticos en un banco; el gato cruzó la calle, un taxi lo arrolló y la CIA canceló el proyecto.',
        category: 'historia',
        difficulty: 2,
      },
      {
        id: 'f-6-3',
        text: 'Napoleón Bonaparte padecía una fobia extrema y paralizante a los gatos que le provocaba ataques de pánico y desmayos cada vez que un felino entraba en su tienda de campaña.',
        isLie: true,
        explanation: '¡MENTIRA! No existe ni un solo registro histórico de la época que mencione que Napoleón temiera a los gatos. Es un mito propagado en el siglo XX inventado por biógrafos sensacionalistas británicos.',
        category: 'historia',
        difficulty: 2,
      },
    ],
  },

  // NIVEL 7 - CIENCIA Y REINO ANIMAL (Comportamientos Alucinantes)
  {
    id: 'round-7',
    level: 7,
    category: 'geografia',
    themeTitle: 'Conductas Sorprendentes del Mundo Vivo',
    facts: [
      {
        id: 'f-7-1',
        text: 'Las abejas pueden emborracharse con néctar fermentado; si una abeja borracha intenta entrar a la colmena, las abejas guardianas la muelen a golpes y le arrancan las patas para proteger la miel.',
        isLie: false,
        explanation: '¡VERDAD! El alcohol desorienta el vuelo de las abejas y fermenta la miel. Las abejas centinela patrullan la entrada como guardias de seguridad implacables contra obreras ebrias.',
        category: 'geografia',
        difficulty: 3,
      },
      {
        id: 'f-7-2',
        text: 'Si iluminas un plátano maduro con luz ultravioleta (luz negra) en una habitación completamente oscura, la cáscara brilla intensamente de color azul fluorescente.',
        isLie: false,
        explanation: '¡VERDAD! A medida que la clorofila se descompone durante la maduración, se forman metabolitos fluorescentes que desprenden un resplandor azul neón bajo los rayos ultravioleta.',
        category: 'geografia',
        difficulty: 3,
      },
      {
        id: 'f-7-3',
        text: 'Los pulpos tienen tres corazones y sangre azul porque su organismo sintetiza microcristales de titanio absorbidos del lecho oceánico.',
        isLie: true,
        explanation: '¡MENTIRA! Los pulpos sí poseen 3 corazones y sangre azulada, pero NO por titanio: es por la hemocianina, una proteína respiratoria basada en cobre (a diferencia de nuestra hemoglobina con base de hierro).',
        category: 'geografia',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 8 - CINE Y DETRÁS DE ESCENA DIVERTIDO
  {
    id: 'round-8',
    level: 8,
    category: 'cine',
    themeTitle: 'Anécdotas Curiosas de Películas de Culto',
    facts: [
      {
        id: 'f-8-1',
        text: 'Daniel Radcliffe rompió más de 80 varitas mágicas durante los rodajes de Harry Potter porque las utilizaba compulsivamente como baquetas de batería contra los muebles.',
        isLie: false,
        explanation: '¡VERDAD! El equipo de utilería tenía que fabricar constantemente repuestos porque el joven actor tamborileaba sin parar sobre sus piernas, focos y mesas entre toma y toma.',
        category: 'cine',
        difficulty: 3,
      },
      {
        id: 'f-8-2',
        text: 'En "Shrek", los animadores de DreamWorks se dieron duchas reales de barro vestidos con ropa de trabajo para estudiar con precisión cómo se escurría el lodo por los pliegues de la piel.',
        isLie: false,
        explanation: '¡VERDAD! Para que la famosa escena inicial de Shrek bañándose en barro fuera viscosa y creíble, los programadores se embadurnaron enteros de fango en el estacionamiento del estudio.',
        category: 'cine',
        difficulty: 3,
      },
      {
        id: 'f-8-3',
        text: 'En "Matrix", la mítica lluvia de caracteres verdes que cae por la pantalla es un código binario clasificado de misiles balísticos desclasificado por el Pentágono.',
        isLie: true,
        explanation: '¡MENTIRA! El diseñador visual Simon Whiteley escaneó los libros de recetas de sushi y fideos japoneses de su esposa y mezcló los símbolos katakana al revés con números comunes.',
        category: 'cine',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 9 - HISTORIA Y GASTRONOMÍA INSÓLITA
  {
    id: 'round-9',
    level: 9,
    category: 'historia',
    themeTitle: 'Orígenes Ridículos de Cosas Cotidianas',
    facts: [
      {
        id: 'f-9-1',
        text: 'En 1834 en Estados Unidos, el kétchup de tomate se vendía y recetaba en frascos de farmacia como medicina patentada para curar la diarrea, el cólera y la indigestión.',
        isLie: false,
        explanation: '¡VERDAD! El doctor John Cook Bennett comercializó píldoras y salsa concentrada de kétchup de tomate afirmando que aliviaban trastornos gástricos, hasta que el negocio colapsó por fraudes de competidores.',
        category: 'historia',
        difficulty: 3,
      },
      {
        id: 'f-9-2',
        text: 'En el siglo XVIII en Londres, si no tenías dinero para pagar la entrada al zoológico de la Torre de Londres, el cartel oficial permitía pagar entregando un perro o un gato callejero vivo para alimentar a los leones.',
        isLie: false,
        explanation: '¡VERDAD! La tarifa de entrada era de tres peniques y medio o, alternativamente, "un perro o gato para alimentar a las fieras reales de Su Majestad".',
        category: 'historia',
        difficulty: 3,
      },
      {
        id: 'f-9-3',
        text: 'El algodón de azúcar fue inventado por un payaso de circo ambulante que buscaba fabricar nubes artificiales comestibles para su espectáculo infantil.',
        isLie: true,
        explanation: '¡MENTIRA! Lo más irónico del mundo: el algodón de azúcar fue inventado en 1897 por un DENTISTA llamado William Morrison junto al pastelero John C. Wharton, bajo el nombre de "Fairy Floss".',
        category: 'historia',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 10 - MÚSICA Y CULTURA POP DELIRANTE
  {
    id: 'round-10',
    level: 10,
    category: 'musica',
    themeTitle: 'Guitarras, Monedas y Errores Históricos',
    facts: [
      {
        id: 'f-10-1',
        text: 'Brian May, legendario guitarrista de Queen y doctor en astrofísica, no usa una púa de plástico tradicional: toca todos sus solos con una moneda británica de seis peniques de 1970.',
        isLie: false,
        explanation: '¡VERDAD! May descubrió que el borde dentado y la rigidez del metal de la moneda de seis peniques le permitían rasguear armónicos únicos y conseguir el timbre inconfundible de su guitarra "Red Special".',
        category: 'musica',
        difficulty: 3,
      },
      {
        id: 'f-10-2',
        text: 'En 1962, los ejecutivos de Decca Records rechazaron contratar a The Beatles afirmando formalmente: "Los grupos que tocan guitarras están pasados de moda; no tienen ningún futuro en el mundo del espectáculo".',
        isLie: false,
        explanation: '¡VERDAD! Considerado el peor juicio comercial de la historia discográfica. En su lugar ficharon a "Brian Poole and the Tremeloes" porque residían cerca del estudio y gastaban menos en viáticos.',
        category: 'musica',
        difficulty: 3,
      },
      {
        id: 'f-10-3',
        text: 'La canción "Macarena" de Los del Río fue compuesta originalmente como marcha militar para los soldados de la marina española durante unas maniobras en Cádiz.',
        isLie: true,
        explanation: '¡MENTIRA! Fue improvisada en una fiesta privada en Caracas en 1992 al contemplar el baile de la bailaora de flamenco venezolana Diana Patricia Cubillán, a quien dedicaron la rumba.',
        category: 'musica',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 11 - GEOGRAFÍA Y CIUDADES SINGULARES
  {
    id: 'round-11',
    level: 11,
    category: 'geografia',
    themeTitle: 'Alcaldes Insólitos y Fronteras Surreales',
    facts: [
      {
        id: 'f-11-1',
        text: 'En Alaska existe un pueblo llamado Talkeetna donde un gato atigrado llamado Stubbs fue elegido alcalde honorario y gobernó pacíficamente durante 20 años consecutivos (1997 a 2017).',
        isLie: false,
        explanation: '¡VERDAD! Los ciudadanos, aburridos de los candidatos humanos, votaron al gato como broma electoral. Stubbs ganó, recibía turistas a diario en la tienda local y bebía agua con hierba gatera en copas de vino.',
        category: 'geografia',
        difficulty: 4,
      },
      {
        id: 'f-11-2',
        text: 'En Noruega, un pingüino rey del zoológico de Edimburgo llamado Sir Nils Olav ostenta el rango militar de General de Brigada de la Guardia Real Noruega e inspecciona a las tropas en formación.',
        isLie: false,
        explanation: '¡VERDAD! El rey de Noruega lo armó caballero formalmente; cada pocos años, los soldados de la Guardia Real viajan a Escocia, forman en fila de honor y el pingüino pasa revista caminando erguido con su insignia militar.',
        category: 'geografia',
        difficulty: 4,
      },
      {
        id: 'f-11-3',
        text: 'En el desierto de Atacama en Chile existe un pueblo minero donde las casas están construidas con techos de azúcar prensada porque no llueve hace 400 años.',
        isLie: true,
        explanation: '¡MENTIRA! Aunque Atacama es el desierto no polar más árido de la Tierra, las viviendas se construyen con adobe, madera y chapas de cinc; la leyenda de los techos de azúcar es un disparate humorístico.',
        category: 'geografia',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 12 - CINE Y TRUCOS VISUALES
  {
    id: 'round-12',
    level: 12,
    category: 'cine',
    themeTitle: 'Peluquines, Juguetes y Sangre de Chocolate',
    facts: [
      {
        id: 'f-12-1',
        text: 'Sean Connery usó peluquín postizo en absolutamente todas y cada una de sus películas como James Bond, ya que comenzó a quedarse calvo a los 21 años de edad.',
        isLie: false,
        explanation: '¡VERDAD! Incluso en su debut en "Dr. No" (1962), el departamento de peluquería le diseñaba tupés a medida que aguantaban inmersiones marinas y persecuciones sin moverse un milímetro.',
        category: 'cine',
        difficulty: 4,
      },
      {
        id: 'f-12-2',
        text: 'El personaje de Buzz Lightyear en "Toy Story" se iba a llamar originalmente "Lunar Larry" y tenía aspecto de militar bajito con escafandra roja.',
        isLie: false,
        explanation: '¡VERDAD! Los bocetos tempranos de Pixar lo bautizaban Lunar Larry, hasta que decidieron homenajear al astronauta Buzz Aldrin (segundo hombre en pisar la Luna) y darle aspecto de astronauta de vanguardia.',
        category: 'cine',
        difficulty: 4,
      },
      {
        id: 'f-12-3',
        text: 'En "Psicosis", Alfred Hitchcock usó sangre real de cordero recién extraída para la escena de la ducha porque la sangre artificial salía transparente en blanco y negro.',
        isLie: true,
        explanation: '¡MENTIRA! Hitchcock utilizó jarabe de chocolate Bosco comercial, cuya viscosidad y densidad en fotografía blanco y negro lucían mucho más realistas y tétricas que cualquier colorante rojo.',
        category: 'cine',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 13 - HISTORIA Y PARADOJAS DEL TIEMPO
  {
    id: 'round-13',
    level: 13,
    category: 'historia',
    themeTitle: 'Paradojas y Desfases Temporales Sorprendentes',
    facts: [
      {
        id: 'f-13-1',
        text: 'La Universidad de Oxford es más antigua que el Imperio Azteca: ya se dictaban clases en Oxford en 1096, mientras que los aztecas fundaron Tenochtitlán en 1325.',
        isLie: false,
        explanation: '¡VERDAD! La universidad británica llevaba más de dos siglos formando estudiantes y doctores cuando la civilización azteca recién comenzaba a asentarse en el lago de Texcoco.',
        category: 'historia',
        difficulty: 4,
      },
      {
        id: 'f-13-2',
        text: 'Cleopatra vivió cronológicamente más cerca del aterrizaje en la Luna y del primer iPhone que de la construcción de la Gran Pirámide de Guiza.',
        isLie: false,
        explanation: '¡VERDAD! La Gran Pirámide se erigió hacia el 2560 a.C. y Cleopatra murió en el 30 a.C. (2.500 años después), mientras que el alunizaje del Apolo 11 ocurrió en 1969 (solo 2.000 años después de su muerte).',
        category: 'historia',
        difficulty: 4,
      },
      {
        id: 'f-13-3',
        text: 'En la antigua Grecia, los jueces olímpicos castigaban con azotes a cualquier atleta que sonriera durante una prueba por considerar la alegría un sacrilegio contra Zeus.',
        isLie: true,
        explanation: '¡MENTIRA! No existía tal absurdo; los atletas competían desnudos untados en aceite de oliva y eran coronados con ramas de olivo entre vítores populares y banquetes fastuosos.',
        category: 'historia',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 14 - CIENCIA Y MEDICINA INSÓLITA
  {
    id: 'round-14',
    level: 14,
    category: 'geografia',
    themeTitle: 'Herramientas Quirúrgicas y Animales Ancestrales',
    facts: [
      {
        id: 'f-14-1',
        text: 'Las motosierras fueron inventadas originalmente en 1785 por dos médicos cirujanos escoceses como herramienta médica para cortar el hueso de la pelvis en partos difíciles.',
        isLie: false,
        explanation: '¡VERDAD! Los doctores John Aitken y James Jeffray diseñaron una sierra de cadena giratoria accionada por manivela manual para facilitar la extracción del feto antes del auge de la cesárea moderna.',
        category: 'geografia',
        difficulty: 4,
      },
      {
        id: 'f-14-2',
        text: 'El tiburón de Groenlandia puede superar los 400 años de vida y no alcanza la pubertad y madurez reproductora hasta que cumple aproximadamente 150 años de edad.',
        isLie: false,
        explanation: '¡VERDAD! Su metabolismo en las gélidas aguas polares es extremadamente pausado, creciendo apenas 1 cm al año. ¡Existen ejemplares nadando hoy que nacieron antes de la invención del telescopio!',
        category: 'geografia',
        difficulty: 4,
      },
      {
        id: 'f-14-3',
        text: 'Las cebras no pueden ser domesticadas ni montadas porque sus espinas dorsales son huecas y colapsan si un humano de más de 45 kilos se sube a su lomo.',
        isLie: true,
        explanation: '¡MENTIRA! El esqueleto de la cebra es tan robusto como el del caballo, pero su temperamento salvaje es indomable: no tienen instinto de sumisión, agachan la cabeza y muerden salvajemente para defenderse de depredadores.',
        category: 'geografia',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 15 - MÚSICA Y CANCIONES MÍTICAS
  {
    id: 'round-15',
    level: 15,
    category: 'musica',
    themeTitle: 'Desodorantes, Guitarras y Risas de Ultratumba',
    facts: [
      {
        id: 'f-15-1',
        text: 'La canción "Smells Like Teen Spirit" de Nirvana se llama así porque una amiga de Kurt Cobain escribió con spray en su habitación: "Kurt smells like Teen Spirit", refiriéndose a una marca de desodorante femenino.',
        isLie: false,
        explanation: '¡VERDAD! Cobain no conocía el desodorante y creyó ingenuamente que su amiga Kathleen Hanna había formulado una consigna política rebelde ("Kurt huele a espíritu adolescente").',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-15-2',
        text: 'Leo Fender, el mítico inventor de guitarras icónicas como la Stratocaster y el bajo Precision que marcaron la historia del rock, jamás en su vida supo tocar la guitarra ni afinarla.',
        isLie: false,
        explanation: '¡VERDAD! Fender era técnico contable y radioaficionado. Su maestría residía en la electrónica acústica y los circuitos, pero para probar sus instrumentos siempre contrataba a guitarristas locales.',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-15-3',
        text: 'La risa tenebrosa que retumba al final del videoclip "Thriller" de Michael Jackson fue interpretada por Tim Burton cuando tenía 24 años y trabajaba como aprendiz en Disney.',
        isLie: true,
        explanation: '¡MENTIRA! La legendaria locución y la risa macabra fueron grabadas por Vincent Price, el monarca histórico del cine clásico de terror, quien registró la pista en el estudio en apenas dos tomas magistrales.',
        category: 'musica',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 16 - GEOGRAFÍA Y LÍMITES PLANETARIOS
  {
    id: 'round-16',
    level: 16,
    category: 'geografia',
    themeTitle: 'Fronteras de Salón y Salto en el Tiempo',
    facts: [
      {
        id: 'f-16-1',
        text: 'Rusia y Estados Unidos están separados en su punto más cercano por apenas 3,8 kilómetros de agua en el estrecho de Bering, pero tienen 21 horas de diferencia horaria entre sí.',
        isLie: false,
        explanation: '¡VERDAD! Entre las islas Diómedes Mayor (Rusia) y Diómedes Menor (EE.UU.) hay menos de 4 km; como la Línea Internacional de Cambio de Fecha cruza entre ambas, desde una isla puedes mirar directamente a la tarde del día siguiente.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-16-2',
        text: 'En el pueblo de Baarle-Nassau, la frontera entre Holanda y Bélgica cruza por el medio de comedores, dormitorios y cafeterías señalizada con cruces blancas en el suelo.',
        isLie: false,
        explanation: '¡VERDAD! Es el rompecabezas fronterizo más complejo del mundo: según en qué lado caiga la puerta de entrada de tu casa, pagas los impuestos de un país u otro, aunque duermas con los pies en el país vecino.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-16-3',
        text: 'Islandia es el único país del mundo sin mosquitos gracias a que sus manantiales geotérmicos desprenden vapores sulfurosos que asfixian a las larvas al instante.',
        isLie: true,
        explanation: '¡MENTIRA! En efecto Islandia casi carece de mosquitos, pero no es por vapores de azufre: se debe a sus oscilaciones térmicas polares repentinas, que congelan y rompen el ciclo de maduración de las pupas.',
        category: 'geografia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 17 - CINE Y MAQUILLAJES BRUTALES
  {
    id: 'round-17',
    level: 17,
    category: 'cine',
    themeTitle: 'Cabezas Reales y Voces Inesperadas',
    facts: [
      {
        id: 'f-17-1',
        text: 'En "El Padrino", para la icónica escena de la cabeza de caballo decapitada en la cama, la producción usó una cabeza real de caballo conseguida en una fábrica de alimento para perros.',
        isLie: false,
        explanation: '¡VERDAD! El actor John Marley esperaba una cabeza falsa de utilería; cuando Coppola rodó la toma real sin advertirle y Marley se topó con la sangre y vísceras verdaderas, sus gritos de histeria fueron auténticos.',
        category: 'cine',
        difficulty: 5,
      },
      {
        id: 'f-17-2',
        text: 'David Prowse, el fornido actor que se enfundó el traje de Darth Vader en "Star Wars", grabó todos sus diálogos creyendo sinceramente que su voz campesina se oiría en los cines.',
        isLie: false,
        explanation: '¡VERDAD! Prowse hablaba con un marcado acento rural del suroeste inglés (en el set le llamaban en secreto "Darth Farmer"). George Lucas jamás le reveló que contrataría la voz profunda de James Earl Jones.',
        category: 'cine',
        difficulty: 5,
      },
      {
        id: 'f-17-3',
        text: 'En "Matrix Reloaded", la gigantesca autopista de 2 kilómetros construida para la escena de persecución fue asfaltada e inaugurada como vía pública rápida de Los Ángeles tras el rodaje.',
        isLie: true,
        explanation: '¡MENTIRA! La autopista se construyó sobre una base militar en desuso en Alameda y, al terminar las filmaciones, fue triturada y reciclada en un 97% para no infringir leyes ambientales federales.',
        category: 'cine',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 18 - HISTORIA Y JUERGAS POLÍTICAS
  {
    id: 'round-18',
    level: 18,
    category: 'historia',
    themeTitle: 'Cacao Falso y Adquines Voladores',
    facts: [
      {
        id: 'f-18-1',
        text: 'Karl Marx y Friedrich Engels se emborracharon tanto una noche de tabernas en Londres que la policía metropolitana los persiguió por la calle tras romper farolas de gas a pedradas.',
        isLie: false,
        explanation: '¡VERDAD! El político Wilhelm Liebknecht narró en sus memorias cómo él y Marx acabaron una juerga por Tottenham Court Road lanzando adoquines contra las farolas hasta que tuvieron que huir a toda prisa de los agentes.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-18-2',
        text: 'Los mayas y aztecas utilizaban granos de cacao como dinero, y existían estafadores que vaciaban la cáscara del fruto y la rellenaban con barro o cera para timar en los mercados.',
        isLie: false,
        explanation: '¡VERDAD! Fray Bernardino de Sahagún registró minuciosamente cómo los inspectores de los mercados vigilaban a los falsificadores que teñían cáscaras huecas con ceniza para simular granos de cacao legítimos.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-18-3',
        text: 'Durante la Edad Media en Francia, la corona cobraba un impuesto formal a la risa ruidosa en tabernas para desalentar las fiestas populares pecaminosas.',
        isLie: true,
        explanation: '¡MENTIRA! Aunque los sermones religiosos exaltaban la templanza y el recogimiento espiritual, jamás se promulgó un gravamen o tasa fiscal sobre las carcajadas o el bullicio de las tabernas.',
        category: 'historia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 19 - CIENCIA Y REINO ANIMAL BIZARRO
  {
    id: 'round-19',
    level: 19,
    category: 'geografia',
    themeTitle: 'Cuervos Rencorosos y Leche Roja',
    facts: [
      {
        id: 'f-19-1',
        text: 'Los cuervos pueden recordar con rencor el rostro de un humano específico durante más de 5 años y enseñar a sus crías a atacar y picotear a esa misma persona.',
        isLie: false,
        explanation: '¡VERDAD! Científicos de la Universidad de Washington usaron máscaras faciales para molestarlos temporalmente; años más tarde, cuervos jóvenes que ni siquiera habían nacido reconocían la máscara y la atacaban en bandada.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-19-2',
        text: 'Los flamencos segregan una sustancia lechosa de color rojo sangre por el pico para alimentar a sus pichones, y tanto los machos como las hembras la producen.',
        isLie: false,
        explanation: '¡VERDAD! Se conoce como "leche de buche", está cargada de proteínas y antioxidantes carotenoides que le confieren ese intenso color carmesí, dando la escalofriante impresión de que alimentan a la cría con sangre.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-19-3',
        text: 'Los koalas comen hojas de eucalipto porque sus toxinas les provocan un efecto estupefaciente narcótico que amortigua su dolor articular.',
        isLie: true,
        explanation: '¡MENTIRA! Los koalas no viven drogados: el eucalipto aporta tan ínfimas calorías y es tan difícil de digerir que deben dormir 20 horas al día para preservar su energía metabólica.',
        category: 'geografia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 20 - MÚSICA Y CURIOSIDADES ASOMBROSAS
  {
    id: 'round-20',
    level: 20,
    category: 'musica',
    themeTitle: 'Zurderas Prohibidas y Baños de Espuma',
    facts: [
      {
        id: 'f-20-1',
        text: 'Jimi Hendrix aprendió a tocar la guitarra con la mano izquierda a escondidas porque su padre creía que ser zurdo era una influencia satánica y lo golpeaba si lo veía tocando así.',
        isLie: false,
        explanation: '¡VERDAD! Cuando su padre merodeaba por la casa, Hendrix tocaba con la diestra; en cuanto se descuidaba, volteaba la guitarra y practicaba como zurdo natural, alcanzando una técnica ambidiestra sin igual.',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-20-2',
        text: 'Freddie Mercury compuso la mítica canción "Crazy Little Thing Called Love" en apenas 10 minutos mientras se daba un baño de espuma en un hotel de Múnich.',
        isLie: false,
        explanation: '¡VERDAD! Solicitó que le acercaran una guitarra española a la bañera, improvisó la melodía rocanrolera en una toalla mojada y marchó directo a los estudios Musicland a plasmarla de inmediato.',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-20-3',
        text: 'En "Bohemian Rhapsody", el coro campanil de apertura se grabó en vivo dentro de la torre del reloj Big Ben de Londres tras una autorización firmada por la Reina Isabel II.',
        isLie: true,
        explanation: '¡MENTIRA! Queen jamás grabó en el Big Ben; las campanas y complejas capas polifónicas se gestaron pacientemente en los estudios Rockfield de Gales utilizando cintas analógicas multipista desgastadas de tanto regrabar.',
        category: 'musica',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 21 - CINE Y TELEVISIÓN (Detalles Ocultos)
  {
    id: 'round-21',
    level: 21,
    category: 'cine',
    themeTitle: 'Chupetes, Morfología y Máscaras de Rebaja',
    facts: [
      {
        id: 'f-21-1',
        text: 'En "Los Simpson", el característico sonido de succión del chupete de Maggie Simpson fue grabado por el mismísimo creador de la serie, Matt Groening, chupándose el dedo frente al micrófono.',
        isLie: false,
        explanation: '¡VERDAD! En los primeros cortos de The Tracey Ullman Show no encontraban un sonido de utilería adecuado, así que Groening se acercó al micro y emitió el sonido con su propio dedo y labios.',
        category: 'cine',
        difficulty: 5,
      },
      {
        id: 'f-21-2',
        text: 'La aterradora máscara blanca de Michael Myers en la película clásica "Halloween" era simplemente una máscara barata de 2 dólares del Capitán Kirk de Star Trek pintada con aerosol.',
        isLie: false,
        explanation: '¡VERDAD! Con un presupuesto ridículamente bajo, el director de arte Tommy Lee Wallace compró la máscara de látex de William Shatner, le ensanchó las cuencas oculares y la cubrió con pintura blanca mate.',
        category: 'cine',
        difficulty: 5,
      },
      {
        id: 'f-21-3',
        text: 'En "Alien: El octavo pasajero", el robot androide Ash estaba construido con piezas mecánicas de un cajero automático desmantelado de Londres.',
        isLie: true,
        explanation: '¡MENTIRA! Para simular las entrañas sintéticas de Ash cuando es decapitado, Ridley Scott utilizó leche cuajada, pasta de espagueti blanco, aros de cebolla frita y bulbos de cristal.',
        category: 'cine',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 22 - HISTORIA BIZARRA (Treguas e Impuestos)
  {
    id: 'round-22',
    level: 22,
    category: 'historia',
    themeTitle: 'Orina Fiscal y Fútbol en Tierra de Nadie',
    facts: [
      {
        id: 'f-22-1',
        text: 'En la antigua Roma, la orina humana era tan cotizada para blanquear togas y enjuagar dientes que el emperador Vespasiano le aplicó un impuesto oficial (origen de "el dinero no huele").',
        isLie: false,
        explanation: '¡VERDAD! El amoníaco de la orina era indispensable para tintoreros y lavanderías (fullónicas). Cuando su hijo Tito le reprochó cobrar por algo tan asqueroso, Vespasiano le acercó una moneda de oro y exclamó: "Pecunia non olet" (el dinero no huele).',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-22-2',
        text: 'Durante la Primera Guerra Mundial, en la Nochebuena de 1914, soldados alemanes y británicos pactaron un alto el fuego espontáneo, cantaron villancicos y jugaron al fútbol en tierra de nadie.',
        isLie: false,
        explanation: '¡VERDAD! La legendaria Tregua de Navidad vio a enemigos mortales emerger desarmados de las trincheras, compartir cigarrillos y disputar partidos improvisados con latas y pelotas de tela.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-22-3',
        text: 'La guillotina fue prohibida definitivamente en Francia en 1899 tras una conferencia de derechos civiles en París.',
        isLie: true,
        explanation: '¡MENTIRA! La guillotina siguió siendo el método oficial de pena capital en Francia hasta... ¡1977! (El último ejecutado fue Hamida Djandoubi, el mismo año en que se estrenó la primera película de Star Wars).',
        category: 'historia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 23 - CIENCIA Y NATURALEZA (Anomalías Cósmicas y Terrestres)
  {
    id: 'round-23',
    level: 23,
    category: 'geografia',
    themeTitle: 'Nubes de Ron y Palmeras que Caminan',
    facts: [
      {
        id: 'f-23-1',
        text: 'En el centro de la Vía Láctea flota una gigantesca nube cósmica de gas (Sagittarius B2) que contiene billones de litros de alcohol etílico y huele químicamente a ron y frambuesas.',
        isLie: false,
        explanation: '¡VERDAD! Radioastrónomos detectaron en esa descomunal nube molecular formiato de etilo, el compuesto químico que le da su aroma característico al ron y el sabor a las frambuesas silvestres.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-23-2',
        text: 'En las selvas tropicales existe una palmera llamada "Socratea exorrhiza" que puede desplazarse hasta 20 metros a lo largo de los años gracias al brote continuo de raíces aéreas.',
        isLie: false,
        explanation: '¡VERDAD! Conocida popularmente como la "palmera caminante", produce raíces adventicias hacia la luz del sol mientras las viejas raíces mueren, desplazando su tronco poco a poco por el sotobosque.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-23-3',
        text: 'El monte Everest es el punto geográfico de la superficie terrestre cuya cima se encuentra físicamente más próxima al espacio exterior y a la Luna.',
        isLie: true,
        explanation: '¡MENTIRA! El Everest es el pico más alto sobre el nivel del mar, pero debido al ensanchamiento del ecuador terrestre, la cima del volcán Chimborazo en Ecuador está 2 kilómetros más cerca del espacio que la del Everest.',
        category: 'geografia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 24 - MÚSICA Y SECRETOS DE ESTUDIO
  {
    id: 'round-24',
    level: 24,
    category: 'musica',
    themeTitle: 'Huevos Revueltos y Pianos Silenciosos',
    facts: [
      {
        id: 'f-24-1',
        text: 'La canción "Yesterday" de The Beatles tuvo como letra provisional versos improvisados sobre huevos revueltos con mantequilla ("Scrambled Eggs, oh my baby how I love your legs").',
        isLie: false,
        explanation: '¡VERDAD! Paul McCartney soñó la melodía al despertar, pero como aún no tenía la letra definitiva, cantaba esa letra cómica provisional para no olvidar las notas mientras desayunaba.',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-24-2',
        text: 'Ludwig van Beethoven mordía una varilla de madera apoyada contra la caja de resonancia de su piano para poder percibir las notas musicales mediante conducción ósea cuando quedó sordo.',
        isLie: false,
        explanation: '¡VERDAD! Al apretar la vara de madera con sus dientes, las vibraciones del instrumento viajaban a través de los huesos de su mandíbula y cráneo directo a su oído interno.',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-24-3',
        text: 'El célebre álbum "The Dark Side of the Moon" de Pink Floyd fue deliberadamente compuesto compás a compás para sincronizarse con la película "El Mago de Oz" de 1939.',
        isLie: true,
        explanation: '¡MENTIRA! La supuesta sincronización es una gigantesca casualidad amplificada por sugestión de fanáticos; los miembros de la banda y el ingeniero Alan Parsons han reiterado que jamás tuvieron un proyector en Abbey Road.',
        category: 'musica',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 25 - DESAFÍO DEFINITIVO (Mente Maestra)
  {
    id: 'round-25',
    level: 25,
    category: 'mix',
    themeTitle: 'El Umbral del Saber Supremo',
    facts: [
      {
        id: 'f-25-1',
        text: 'Los tiburones aparecieron en el registro fósil de los océanos de la Tierra antes de que evolucionaran los primeros árboles en tierra firme.',
        isLie: false,
        explanation: '¡VERDAD! Los primeros tiburones primitivos surcaban los mares hace más de 400 millones de años, mientras que los árboles más antiguos conocidos (como el Archaeopteris) surgieron hace unos 350 millones de años.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-25-2',
        text: 'El "Punto Nemo" en el océano Pacífico está tan desoladamente apartado de cualquier costa que los seres humanos más cercanos con frecuencia son los astronautas a bordo de la Estación Espacial Internacional.',
        isLie: false,
        explanation: '¡VERDAD! La isla desierta más próxima dista a más de 2.688 km, mientras que la órbita de la Estación Espacial Internacional pasa a apenas 400 km de altura sobre ese punto.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-25-3',
        text: 'Albert Einstein suspendió matemáticas en la escuela secundaria porque sus maestros no toleraban sus métodos poco ortodoxos de cálculo mental.',
        isLie: true,
        explanation: '¡MENTIRA! Es un rumor famosísimo pero falso. Cuando le mostraron ese titular en 1935, Einstein se echó a reír y aclaró: "Nunca suspendí matemáticas; antes de los quince años ya dominaba a la perfección el cálculo diferencial e integral".',
        category: 'historia',
        difficulty: 5,
      },
    ],
  },
];

// BANCO MODULAR PARA EL GENERADOR INFINITO
export const INFINITE_POOL = {
  trueFacts: [
    {
      id: 'tp-1',
      text: 'Existe más distancia temporal entre la existencia del Stegosaurus y el Tyrannosaurus Rex que entre el T-Rex y nosotros los humanos actuales.',
      explanation: '¡VERDAD! Unos 83 millones de años separan al Stegosaurus del T-Rex, mientras que solo unos 66 millones de años separan la extinción del T-Rex de la era humana contemporánea.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-2',
      text: 'Frank Sinatra fue el primer actor al que se le ofreció el papel de John McClane en "Duro de Matar" (Die Hard)... cuando Sinatra tenía ya 73 años de edad.',
      explanation: '¡VERDAD! Por cláusulas legales de la película "The Detective" (1968), el estudio estaba contractualmente obligado a ofrecerle la secuela a Sinatra antes que a Bruce Willis.',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-3',
      text: 'En "El Caballero de la Noche", Heath Ledger diseñó y se aplicó él mismo el caótico maquillaje del Joker usando cosméticos baratos comprados en una farmacia.',
      explanation: '¡VERDAD! Ledger quería transmitir que el propio villano se pintaba a las apuradas frente a un espejo sucio, sin el pulcro acabado de un maquillador profesional de Hollywood.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-4',
      text: 'El término inalámbrico "Bluetooth" proviene del rey vikingo Harald Blåtand (Diente Azul), célebre por unir a las tribus de Noruega y Dinamarca en el siglo X.',
      explanation: '¡VERDAD! Los ingenieros de Intel y Ericsson escogieron el nombre porque la tecnología se concibió para unir dispositivos de comunicación sin cables.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-5',
      text: 'En Suiza es ilegal por ley de bienestar animal tener una sola cobaya o conejillo de indias, porque se consideran animales gregarios que sufren depresión por soledad.',
      explanation: '¡VERDAD! La ley suiza exige tener al menos dos ejemplares, e incluso existen servicios de alquiler de cobayas para acompañar a una sobreviviente en caso de fallecimiento de su compañera.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-6',
      text: 'El logotipo original de la golosina Chupa Chups fue dibujado en 1969 por el mismísimo pintor surrealista Salvador Dalí en servilletas de papel mientras tomaba un café.',
      explanation: '¡VERDAD! El fundador de la marca le pagó una gran suma a Dalí, quien diseñó la icónica margarita amarilla y recomendó colocarla arriba del caramelo para que fuera visible.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-7',
      text: 'Las huellas dactilares de los koalas son tan idénticas a las humanas que peritos forenses de la policía han sido confundidos en escenas de crimen en Australia.',
      explanation: '¡VERDAD! Incluso bajo el microscopio electrónico de barrido, los bucles y arcos de las crestas papilares de las patas de los koalas son prácticamente indistinguibles de las huellas de un ser humano.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-8',
      text: 'Existe un hongo parásito (Ophiocordyceps unilateralis) que infecta hormigas, toma el control de su sistema motor y las obliga a trepar a una hoja alta antes de brotar de su cabeza.',
      explanation: '¡VERDAD! Es el hongo zombi real que inspiró la historia de "The Last of Us". Obliga a la hormiga a fijar sus mandíbulas en una nervadura elevada para dispersar esporas sobre el hormiguero.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-9',
      text: 'En "Alien: El octavo pasajero", la reacción de terror histérico de los actores en la escena del quebrantapechos fue real porque Ridley Scott no les avisó que saldría sangre volando.',
      explanation: '¡VERDAD! Scott mantuvo en estricto secreto la cantidad de sangre artificial y vísceras que salpicarían sobre Sigourney Weaver y Veronica Cartwright para capturar conmoción genuina.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-10',
      text: 'El actor Sean Bean ha muerto en pantalla en más de 20 películas y series diferentes, al punto de suplicar formalmente a los guionistas que dejen con vida a sus personajes.',
      explanation: '¡VERDAD! Tras sufrir muertes trágicas en El Señor de los Anillos, GoldenEye y Juego de Tronos, el actor comenzó a rechazar proyectos si su personaje moría a mitad del metraje.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-11',
      text: 'Los plátanos son naturalmente radiactivos debido a su contenido de potasio-40; necesitarías comer 10 millones de plátanos de golpe para recibir una dosis mortal de radiación.',
      explanation: '¡VERDAD! En física nuclear existe informalmente la "Dosis Equivalente a un Plátano" (BED) para ilustrar cantidades minúsculas e inofensivas de radiación natural ambiental.',
      category: 'geografia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-12',
      text: 'El rey de corazones en la baraja francesa de póquer es el único rey que no tiene bigote y parece estar clavándose una espada a través de su propia cabeza.',
      explanation: '¡VERDAD! Es conocido como el "Rey Suicida". Copistas medievales dibujaron de forma descuidada un hacha de guerra levantada, convirtiéndola accidentalmente en una espada atravesando su sien.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-13',
      text: 'En la ciudad de Whittier en Alaska, casi la totalidad de sus 300 habitantes vive dentro de un único edificio residencial de 14 pisos llamado Begich Towers.',
      explanation: '¡VERDAD! Debido a las brutales ventiscas bajo cero, el edificio cuenta con comisaría, escuela conectada por túnel subterráneo, supermercado, iglesia y centro de salud propios.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-14',
      text: 'Canadá alberga aproximadamente el 60% de todos los lagos naturales de agua dulce existentes en la superficie de la Tierra.',
      explanation: '¡VERDAD! Se estima que Canadá cuenta con cerca de 2 millones de lagos; su superficie lacustre supera la de todos los demás países del planeta combinados.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-15',
      text: 'El papel de Neo en "The Matrix" fue ofrecido en primer lugar a Will Smith, quien lo rechazó para protagonizar la comedia "Wild Wild West".',
      explanation: '¡VERDAD! Will Smith admitió en varias entrevistas que no comprendió el concepto de los hermanos Wachowski durante la reunión y tomó la que consideró la peor decisión de su carrera.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-16',
      text: 'La canción de Queen "Radio Ga Ga" inspiró directamente el nombre artístico de la cantante Stefani Germanotta: Lady Gaga.',
      explanation: '¡VERDAD! El productor Rob Fusari solía tararearle "Radio Ga Ga" al verla llegar; un error de autocorrector en un mensaje de texto transformó la frase en "Lady Gaga" y ella decidió adoptarlo.',
      category: 'musica' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-17',
      text: 'Los flamencos se alimentan sumergiendo la cabeza completamente al revés en el agua debido a la anatomía invertida de su pico filtrador.',
      explanation: '¡VERDAD! Su mandíbula superior es móvil y la inferior fija; al meter la cabeza boca abajo pueden bombear agua y lodo para atrapar camarones y algas con sus laminillas.',
      category: 'geografia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-18',
      text: 'En "El Caballero de la Noche Asciende", Christian Bale no requirió prótesis para el cuello de Batman: aumentó 15 kilos de masa muscular pura en 4 meses para el papel.',
      explanation: '¡VERDAD! Bale es legendario por sus transformaciones extremas, habiendo subido de los esqueléticos 55 kilos de "El Maquinista" a más de 86 kilos para personificar a Bruce Wayne.',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-19',
      text: 'El primer dominio comercial de internet registrado en la historia de la red fue Symbolics.com el 15 de marzo de 1985.',
      explanation: '¡VERDAD! La compañía informática Symbolics registró el primer dominio .com años antes de que Tim Berners-Lee desarrollara la World Wide Web en el CERN.',
      category: 'historia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-20',
      text: 'La canción "Wonderwall" de Oasis originalmente se iba a llamar "Wishing Stone", pero Noel Gallagher cambió el título inspirado por un disco experimental de George Harrison.',
      explanation: '¡VERDAD! Gallagher tomó el término de "Wonderwall Music", el álbum solista que George Harrison editó en 1968 como banda sonora de una película psicodélica.',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
  ],

  convincingLies: [
    {
      id: 'lp-1',
      text: 'Walt Disney tenía un miedo patológico a los ratones de alcantarilla, por lo que ordenó que Mickey Mouse llevara guantes blancos y zapatos gigantes para disimular su fisonomía de roedor.',
      explanation: '¡MENTIRA! A Walt Disney le encantaban los ratones; incluso tuvo a un ratón silvestre viviendo pacíficamente en su mesa de dibujo de Kansas City al que bautizó "Mortimer".',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-2',
      text: 'En "Matrix", Keanu Reeves donó el 70% de sus ganancias salariales a un fondo hospitalario de investigación para la cura definitiva de la leucemia infantil.',
      explanation: '¡MENTIRA! Keanu sí respalda causas benéficas debido a la enfermedad de su hermana, pero la cifra viral del 70% fue un bulo de internet. Lo que sí regaló fueron bonos económicos y motos Harley-Davidson a su equipo de dobles de riesgo.',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-3',
      text: 'En Francia existe una ley centenaria que prohíbe terminantemente a los granjeros bautizar a un cerdo con el nombre de "Napoleón", bajo pena de arresto.',
      explanation: '¡MENTIRA! Es una de las leyendas urbanas jurídicas más populares de internet, popularizada a raíz de la novela "Rebelión en la Granja" de George Orwell, pero jamás existió semejante artículo en el Código Civil francés.',
      category: 'historia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-4',
      text: 'El acorde célebre de apertura de "A Hard Day\'s Night" de The Beatles surgió por accidente cuando Ringo Starr tropezó sobre los cables de los amplificadores en el estudio.',
      explanation: '¡MENTIRA! El acorde Fadd9 fue meticulosamente orquestado y ejecutado al unísono por George Harrison con su Rickenbacker de 12 cuerdas, John Lennon en acústica y George Martin al piano.',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-5',
      text: 'La risa icónica del Emperador Palpatine en Star Wars fue inspirada por el sonido de una hiena sedada que el diseñador de sonido grabó en el zoológico de San Diego.',
      explanation: '¡MENTIRA! La risa y cadencia vocal fueron una creación interpretativa pura del veterano actor teatral escocés Ian McDiarmid, con apenas un sutil realce de graves en consola.',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-6',
      text: 'Beethoven dedicó originalmente su famosa pieza "Para Elisa" a la emperatriz austríaca María Teresa para agradecer su mecenazgo financiero.',
      explanation: '¡MENTIRA! "Para Elisa" (Für Elise) fue dedicada a Therese Malfatti, una joven de quien Beethoven estaba profundamente enamorado y a quien le propuso matrimonio en 1810 (siendo rechazado).',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-7',
      text: 'En "Volver al Futuro", el DeLorean fue seleccionado porque la compañía automotriz financió la mitad del presupuesto de la película a cambio de publicidad encubierta.',
      explanation: '¡MENTIRA! La empresa DeLorean ya estaba en bancarrota cuando se rodó el filme. Robert Zemeckis lo eligió porque sus puertas de ala de gaviota hacían verosímil que una familia granjera lo confundiera con un OVNI.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'lp-8',
      text: 'Durante la época victoriana en Inglaterra, la reina Victoria prohibió que las patas de las mesas de comedor estuvieran al descubierto por considerarlas sugerentes y eróticas.',
      explanation: '¡MENTIRA! Es una sátira inventada por el escritor Frederick Marryat en sus crónicas de viaje por Norteamérica como mofa exagerada del puritanismo de la sociedad de la época.',
      category: 'historia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-9',
      text: 'El cantante Bob Dylan cambió su apellido legal de Zimmerman a Dylan en homenaje a Dylan Thomas durante una solemne audiencia en el ayuntamiento de Londres.',
      explanation: '¡MENTIRA! Dylan tramitó el cambio legal de su apellido en la Corte Suprema de Minneapolis (EE.UU.) en agosto de 1962, no en Inglaterra.',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-10',
      text: 'En "El Padrino II", Robert De Niro aprendió el dialecto siciliano en tan solo cuatro días gracias a un método experimental de memorización bajo hipnosis.',
      explanation: '¡MENTIRA! De Niro se trasladó a Sicilia durante cuatro meses reales, conviviendo con los lugareños y pescadores para asimilar de forma orgánica la entonación y los gestos.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'lp-11',
      text: 'La Gran Muralla China es la única construcción humana que puede divisarse a simple vista sin binoculares desde la Luna.',
      explanation: '¡MENTIRA! Los astronautas de las misiones Apolo han aclarado que es imposible verla a simple vista desde la Luna ni desde la órbita terrestre baja, ya que sus tonalidades se mimetizan con el terreno circundante.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'lp-12',
      text: 'El cantante Eminem fue demandado en 2002 por su abuela materna por mencionar en un rap que ella le preparaba spaghetti frío en su infancia.',
      explanation: '¡MENTIRA! Eminem fue demandado por su madre (por declaraciones en prensa) y por su expareja, pero su abuela materna siempre mantuvo una estrecha y afectuosa relación con el rapero.',
      category: 'musica' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'lp-13',
      text: 'En Japón existen semáforos especiales para ciervos en la ciudad de Nara que detectan su temperatura corporal para detener los coches cuando van a cruzar.',
      explanation: '¡MENTIRA! Los ciervos sagrados de Nara cruzan las calles por costumbre y los conductores frenan por precaución cívica, pero los semáforos son convencionales y peatonales para humanos.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-14',
      text: 'El famoso juego de mesa Monopoly fue inventado originalmente por la CIA para enseñar nociones de capitalismo financiero a agentes encubiertos en Europa del Este.',
      explanation: '¡MENTIRA! Monopoly se basó en "The Landlord\'s Game", patentado en 1904 por la activista feminista Elizabeth Magie para demostrar los peligros y la crueldad de los monopolios inmobiliarios.',
      category: 'historia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-15',
      text: 'En los Juegos Olímpicos de París 1900, la competencia de tiro al pichón utilizó más de 300 palomas mecánicas de vapor porque las aves vivas estaban protegidas por ley.',
      explanation: '¡MENTIRA! Trágicamente, fue la única edición olímpica donde se sacrificaron animales reales deliberadamente: se abatieron más de 300 palomas vivas en pleno parque olímpico, dejando el césped ensangrentado.',
      category: 'historia' as Category,
      difficulty: 5 as const,
    },
  ],
};
