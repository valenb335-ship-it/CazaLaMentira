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

// 25 Rondas curadas con hechos extraordinarios y mentiras calibradas por dificultad
export const CURATED_ROUNDS: TriviaRound[] = [
  // NIVEL 1 - CINE Y SERIES (Fácil / Sorprendente)
  {
    id: 'round-1',
    level: 1,
    category: 'cine',
    themeTitle: 'Secretos de la Pantalla Grande',
    facts: [
      {
        id: 'f-1-1',
        text: 'En "El Padrino", el gato que acaricia Marlon Brando en la primera escena era un callejero encontrado en los estudios y no estaba en el guion.',
        isLie: false,
        explanation: '¡VERDAD! El director Francis Ford Coppola encontró al gato vagando por los estudios Paramount y se lo puso en el regazo a Brando antes de rodar. El ronroneo era tan fuerte que tuvieron que doblar el audio.',
        category: 'cine',
        difficulty: 1,
      },
      {
        id: 'f-1-2',
        text: 'El sonido del rugido del T-Rex en "Jurassic Park" fue creado combinando sonidos de un cachorro de elefante, un tigre y un cocodrilo.',
        isLie: false,
        explanation: '¡VERDAD! El diseñador de sonido Gary Rydstrom mezcló un cachorro de elefante jugando, con respiraciones de cocodrilo y rugidos de tigre para lograr el mítico bramido.',
        category: 'cine',
        difficulty: 1,
      },
      {
        id: 'f-1-3',
        text: 'Tom Hanks rechazó originalmente interpretar a Forrest Gump porque creía que nadie creería la historia de un hombre aficionado a los bombones.',
        isLie: true,
        explanation: '¡MENTIRA! Quien rechazó el papel protagónico de Forrest Gump fue John Travolta (decisión de la que siempre se arrepintió). Tom Hanks aceptó el papel hora y media después de leer el guión.',
        category: 'cine',
        difficulty: 1,
      },
    ],
  },

  // NIVEL 2 - HISTORIA (Fascinante)
  {
    id: 'round-2',
    level: 2,
    category: 'historia',
    themeTitle: 'Anécdotas Insólitas de la Historia',
    facts: [
      {
        id: 'f-2-1',
        text: 'Cleopatra vivió cronológicamente más cerca de la invención del iPhone y del aterrizaje en la Luna que de la construcción de las Grandes Pirámides de Guiza.',
        isLie: false,
        explanation: '¡VERDAD! La Gran Pirámide fue terminada cerca del 2560 a.C. y Cleopatra murió en el 30 a.C. (unos 2.500 años después), mientras que el alunizaje ocurrió en 1969 (unos 2.000 años después).',
        category: 'historia',
        difficulty: 1,
      },
      {
        id: 'f-2-2',
        text: 'En 1932, el ejército de Australia declaró formalmente la guerra a una población de más de 20.000 emúes... y los emúes ganaron.',
        isLie: false,
        explanation: '¡VERDAD! La conocida "Guerra del Emú" vio a soldados australianos armados con ametralladoras pesadas retirarse tras semanas de fallar en contener las maniobras evasivas de las aves.',
        category: 'historia',
        difficulty: 1,
      },
      {
        id: 'f-2-3',
        text: 'Napoleón Bonaparte padecía una fobia paralizante hacia los gatos llamada ailurofobia, que le provocaba ataques de pánico.',
        isLie: true,
        explanation: '¡MENTIRA! No existe ni un solo registro histórico de la época que demuestre que Napoleón temía a los gatos. Es un mito moderno que también se le adjudicó falsamente a Julio César y Hitler.',
        category: 'historia',
        difficulty: 1,
      },
    ],
  },

  // NIVEL 3 - GEOGRAFÍA (Curiosidades del Planeta)
  {
    id: 'round-3',
    level: 3,
    category: 'geografia',
    themeTitle: 'Rincones y Fronteras del Mundo',
    facts: [
      {
        id: 'f-3-1',
        text: 'El país con la mayor cantidad de islas en todo el planeta no es Indonesia ni Filipinas, sino Suecia, con más de 267.000 islas.',
        isLie: false,
        explanation: '¡VERDAD! Suecia lidera el mundo con 267.570 islas registradas, aunque menos de mil están habitadas.',
        category: 'geografia',
        difficulty: 1,
      },
      {
        id: 'f-3-2',
        text: 'Rusia es tan extensa geográficamente que comparte frontera terrestre oficial con 24 países soberanos distintos.',
        isLie: true,
        explanation: '¡MENTIRA! Aunque Rusia es gigante y tiene 11 husos horarios, comparte frontera terrestre oficial con 14 países (16 si se cuentan regiones parcialmente reconocidas como Osetia del Sur), muy lejos de 24.',
        category: 'geografia',
        difficulty: 1,
      },
      {
        id: 'f-3-3',
        text: 'En la Antártida existe una cascada que fluye con agua de color rojo sangre llamada "Blood Falls", debido a minerales de hierro bajo el glaciar.',
        isLie: false,
        explanation: '¡VERDAD! Las cataratas Blood Falls del glaciar Taylor emanan agua salada subterránea rica en hierro ferroso que se oxida instantáneamente al entrar en contacto con el aire.',
        category: 'geografia',
        difficulty: 1,
      },
    ],
  },

  // NIVEL 4 - MÚSICA (Íconos y Melodías)
  {
    id: 'round-4',
    level: 4,
    category: 'musica',
    themeTitle: 'Misterios del Pentagrama',
    facts: [
      {
        id: 'f-4-1',
        text: 'Freddie Mercury compuso la exitosa canción "Crazy Little Thing Called Love" en apenas 10 minutos mientras se daba un baño de espuma en un hotel.',
        isLie: false,
        explanation: '¡VERDAD! Ocurrió en el Hotel Bayerischer Hof de Múnich. Pidió una guitarra acústica directo al baño y escribió los acordes y la melodía casi instantáneamente.',
        category: 'musica',
        difficulty: 2,
      },
      {
        id: 'f-4-2',
        text: 'Wolfgang Amadeus Mozart compuso su primera sinfonía orquestal completa a los tres años, antes de aprender a escribir palabras.',
        isLie: true,
        explanation: '¡MENTIRA! Mozart era un genio prodigio, pero compuso sus primeros minuetos a los 5 años y su primera sinfonía a los 8 años. A los 3 años apenas comenzaba a imitar notas al clavecín.',
        category: 'musica',
        difficulty: 2,
      },
      {
        id: 'f-4-3',
        text: 'La canción "Yesterday" de The Beatles originalmente tenía como letra provisional versos sobre huevos revueltos con mantequilla ("Scrambled Eggs").',
        isLie: false,
        explanation: '¡VERDAD! Paul McCartney soñó la melodía, pero para no olvidarla mientras encontraba la letra definitiva cantaba: "Scrambled eggs, oh my baby how I love your legs...".',
        category: 'musica',
        difficulty: 2,
      },
    ],
  },

  // NIVEL 5 - HISTORIA (Épocas Doradas)
  {
    id: 'round-5',
    level: 5,
    category: 'historia',
    themeTitle: 'Emperadores y Reinas',
    facts: [
      {
        id: 'f-5-1',
        text: 'Durante la Edad Media, los animales podían ser formalmente juzgados y condenados en tribunales humanos con abogados defensores.',
        isLie: false,
        explanation: '¡VERDAD! Se conservan actas de juicios reales a cerdos, ratas e insectos por daños a cosechas o ataques, con alegatos jurídicos y sentencias de excomunión o ejecución.',
        category: 'historia',
        difficulty: 2,
      },
      {
        id: 'f-5-2',
        text: 'Los vikingos utilizaban cascos ceremoniales decorados con grandes cuernos de toro para intimidar a sus enemigos en el campo de batalla.',
        isLie: true,
        explanation: '¡MENTIRA! Los vikingos jamás usaron cuernos en sus cascos de combate; habrían sido un estorbo peligroso. La imagen surgió en el siglo XIX por el diseñador de vestuario Carl Emil Doepler para la ópera de Wagner.',
        category: 'historia',
        difficulty: 2,
      },
      {
        id: 'f-5-3',
        text: 'El emperador romano Calígula llegó a nombrar a su caballo favorito, Incitatus, como sacerdote y le acondicionó una caballeriza de mármol con pesebre de marfil.',
        isLie: false,
        explanation: '¡VERDAD! El historiador Suetonio relató cómo Calígula colmaba a Incitatus de sirvientes, mantas púrpuras y joyas para ridiculizar al mismísimo Senado romano.',
        category: 'historia',
        difficulty: 2,
      },
    ],
  },

  // NIVEL 6 - CINE Y SERIES (Engaños de Hollywood)
  {
    id: 'round-6',
    level: 6,
    category: 'cine',
    themeTitle: 'Detrás de Cámaras en Hollywood',
    facts: [
      {
        id: 'f-6-1',
        text: 'Para la escena del caballo decapitado en "El Padrino", la producción utilizó una cabeza real de caballo conseguida en una fábrica de alimentos para perros.',
        isLie: false,
        explanation: '¡VERDAD! Coppola no estaba conforme con la cabeza de utilería de goma, así que envió a un asistente a conseguir una cabeza real de un caballo que ya había sido sacrificado legalmente.',
        category: 'cine',
        difficulty: 2,
      },
      {
        id: 'f-6-2',
        text: 'El cuerpo de Walt Disney fue sometido a criogenización y descansa en una cámara frigorífica secreta bajo la atracción de Piratas del Caribe en Disneyland.',
        isLie: true,
        explanation: '¡MENTIRA! Uno de los mitos urbanos más persistentes del cine. Walt Disney fue incinerado dos días después de morir en diciembre de 1966 y sus cenizas descansan en el Forest Lawn Memorial Park de Glendale.',
        category: 'cine',
        difficulty: 2,
      },
      {
        id: 'f-6-3',
        text: 'En "Django Unchained", Leonardo DiCaprio se cortó profundamente la mano con un vaso roto real durante su monólogo y siguió actuando sangrando.',
        isLie: false,
        explanation: '¡VERDAD! Al golpear la mesa con furia, un vaso se rompió y le abrió la palma. DiCaprio ignoró el dolor y la sangre real, Tarantino nunca cortó la toma y esa escena quedó en el corte final.',
        category: 'cine',
        difficulty: 2,
      },
    ],
  },

  // NIVEL 7 - GEOGRAFÍA (Límites Extremos)
  {
    id: 'round-7',
    level: 7,
    category: 'geografia',
    themeTitle: 'Anomalías del Mapa Terrestre',
    facts: [
      {
        id: 'f-7-1',
        text: 'La distancia en línea recta entre París y la Guayana Francesa es considerada formalmente un vuelo nacional dentro de la Unión Europea.',
        isLie: false,
        explanation: '¡VERDAD! La Guayana Francesa es un departamento de ultramar plenamente integrado a Francia y a la UE, por lo que su moneda oficial es el euro y sus vuelos internos no requieren visados especiales.',
        category: 'geografia',
        difficulty: 3,
      },
      {
        id: 'f-7-2',
        text: 'Canadá posee más de la mitad de todos los lagos naturales de agua dulce existentes en la superficie de la Tierra.',
        isLie: false,
        explanation: '¡VERDAD! Canadá alberga cerca de 2 millones de lagos; aproximadamente el 60% de todos los lagos naturales del planeta están dentro de sus fronteras.',
        category: 'geografia',
        difficulty: 3,
      },
      {
        id: 'f-7-3',
        text: 'El monte Everest es el punto del planeta cuya cima está más cercana al espacio exterior y a la Luna.',
        isLie: true,
        explanation: '¡MENTIRA! El Everest es el más alto respecto al nivel del mar (8.848 m), pero debido al abultamiento ecuatorial de la Tierra, la cima del volcán Chimborazo en Ecuador está más alejada del centro terrestre y más cerca del espacio.',
        category: 'geografia',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 8 - MÚSICA (Mitos del Rock y Pop)
  {
    id: 'round-8',
    level: 8,
    category: 'musica',
    themeTitle: 'Leyendas de la Industria Musical',
    facts: [
      {
        id: 'f-8-1',
        text: 'La canción "White Christmas" de Irving Berlin es el sencillo físico más vendido de todos los tiempos, con más de 50 millones de copias certificadas.',
        isLie: false,
        explanation: '¡VERDAD! Interpretada por Bing Crosby en 1942, el Libro Guinness reconoce a White Christmas como el récord absoluto de ventas físicas.',
        category: 'musica',
        difficulty: 3,
      },
      {
        id: 'f-8-2',
        text: 'Eminem escribió la letra de su aclamada canción "Lose Yourself" de una sola sentada en un cuaderno durante los descansos del rodaje de la película 8 Mile.',
        isLie: false,
        explanation: '¡VERDAD! En el set de filmación de 8 Mile, Eminem aprovechaba cada pausa de iluminación para garabatear rimas continuas en un cuaderno desgastado sin borrar una sola palabra.',
        category: 'musica',
        difficulty: 3,
      },
      {
        id: 'f-8-3',
        text: 'Michael Jackson patentó los zapatos especiales para inclinarse 45 grados en "Smooth Criminal" a nombre de un científico de la NASA para no arruinar la magia.',
        isLie: true,
        explanation: '¡MENTIRA! El invento sí fue patentado en EE.UU. (patente US5255452A), pero los titulares registrados oficialmente fueron el propio Michael Jackson junto a Michael Bush y Dennis Tompkins, no un científico de la NASA.',
        category: 'musica',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 9 - HISTORIA (Guerra y Política Insólita)
  {
    id: 'round-9',
    level: 9,
    category: 'historia',
    themeTitle: 'Tratados y Batallas Improbables',
    facts: [
      {
        id: 'f-9-1',
        text: 'La guerra más corta documentada en la historia humana duró exactamente entre 38 y 45 minutos entre Gran Bretaña y el Sultanato de Zanzíbar en 1896.',
        isLie: false,
        explanation: '¡VERDAD! La Guerra Anglo-Zanzibariana estalló el 27 de agosto de 1896 tras la muerte del sultán. Los buques británicos bombardearon el palacio y el sucesor izó la bandera blanca a los 38 minutos.',
        category: 'historia',
        difficulty: 3,
      },
      {
        id: 'f-9-2',
        text: 'Albert Einstein fue invitado formalmente por el gobierno en 1952 para convertirse en el segundo presidente de la historia del Estado de Israel.',
        isLie: false,
        explanation: '¡VERDAD! Tras la muerte de Chaim Weizmann, el primer ministro David Ben-Gurión le ofreció la presidencia. Einstein declinó educadamente alegando falta de aptitud natural para tratar con personas.',
        category: 'historia',
        difficulty: 3,
      },
      {
        id: 'f-9-3',
        text: 'La Gran Muralla China es la única construcción arquitectónica hecha por el ser humano que puede distinguirse a simple vista desde la órbita baja espacial.',
        isLie: true,
        explanation: '¡MENTIRA! Astronautas de la NASA y la ESA han confirmado reiteradamente que la muralla se mimetiza con el terreno y no se ve a simple vista. Desde el espacio se ven con más facilidad autopistas iluminadas y las pirámides con lentes telescópicas.',
        category: 'historia',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 10 - CINE Y SERIES (Producciones Extremas)
  {
    id: 'round-10',
    level: 10,
    category: 'cine',
    themeTitle: 'Trucos y Pesadillas del Rodaje',
    facts: [
      {
        id: 'f-10-1',
        text: 'El actor que interpretó a Darth Vader en el set (David Prowse) dijo todas sus líneas durante la filmación creyendo sinceramente que su voz saldría en el cine.',
        isLie: false,
        explanation: '¡VERDAD! Prowse hablaba con un marcado acento del suroeste de Inglaterra. George Lucas nunca le avisó que sería doblado posteriormente por la imponente voz de James Earl Jones.',
        category: 'cine',
        difficulty: 3,
      },
      {
        id: 'f-10-2',
        text: 'En "Titanic", la famosa escena donde Jack dibuja a Rose desnuda muestra en realidad las manos del director James Cameron sosteniendo el carboncillo.',
        isLie: false,
        explanation: '¡VERDAD! Cameron es un talentoso dibujante e ilustrador. Como Cameron es zurdo y DiCaprio diestro, invirtieron la imagen digitalmente en postproducción.',
        category: 'cine',
        difficulty: 3,
      },
      {
        id: 'f-10-3',
        text: 'Keanu Reeves donó el 70% de sus ganancias salariales de "The Matrix" a un fondo de investigación para la cura definitiva de la leucemia infantil.',
        isLie: true,
        explanation: '¡MENTIRA! Si bien Keanu apoya causas benéficas tras la leucemia de su hermana, el mito de que donó el 70% de su salario a hospitales fue un rumor de internet viralizado. Lo que sí hizo fue repartir bonos y motos Harley a su equipo de efectos especiales.',
        category: 'cine',
        difficulty: 3,
      },
    ],
  },

  // NIVEL 11 - GEOGRAFÍA (Climas y Límites)
  {
    id: 'round-11',
    level: 11,
    category: 'geografia',
    themeTitle: 'Climas Extremos y Fronteras Ocultas',
    facts: [
      {
        id: 'f-11-1',
        text: 'El desierto del Sahara no es el desierto más grande del mundo; la Antártida y el Ártico lo superan en superficie desértica polar.',
        isLie: false,
        explanation: '¡VERDAD! Un desierto se define por su escasa precipitación anual (<250 mm). La Antártida es el desierto más grande y seco del planeta, con 14 millones de km².',
        category: 'geografia',
        difficulty: 4,
      },
      {
        id: 'f-11-2',
        text: 'Existe una ciudad en Alaska llamada Whittier donde casi el 90% de sus 300 habitantes vive en un único edificio de 14 pisos llamado Begich Towers.',
        isLie: false,
        explanation: '¡VERDAD! Debido a las brutales tormentas de nieve, dentro del edificio hay comisaría, escuela conectada por túnel subterráneo, iglesia, supermercado y centro de salud.',
        category: 'geografia',
        difficulty: 4,
      },
      {
        id: 'f-11-3',
        text: 'La frontera terrestre más larga del mundo entre dos países soberanos es la que separa a Rusia de la República Popular China.',
        isLie: true,
        explanation: '¡MENTIRA! La frontera binacional más larga del mundo es la frontera entre Estados Unidos y Canadá, que mide 8.891 kilómetros de longitud.',
        category: 'geografia',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 12 - MÚSICA (Curiosidades Acústicas)
  {
    id: 'round-12',
    level: 12,
    category: 'musica',
    themeTitle: 'Sonidos Ocultos y Récords',
    facts: [
      {
        id: 'f-12-1',
        text: 'La canción de 1982 "Billie Jean" de Michael Jackson fue la primera canción de un artista afroamericano en emitirse con alta rotación en el canal MTV.',
        isLie: false,
        explanation: '¡VERDAD! El presidente de CBS Records amenazó a MTV con retirar todo el catálogo de la discográfica si se negaban a pasar el video de Michael Jackson.',
        category: 'musica',
        difficulty: 4,
      },
      {
        id: 'f-12-2',
        text: 'Beethoven mordía una varilla de madera apoyada en la tapa de su piano para sentir las vibraciones óseas cuando ya estaba completamente sordo.',
        isLie: false,
        explanation: '¡VERDAD! Gracias a la conducción ósea del cráneo a través de la mandíbula, Beethoven lograba percibir frecuencias fundamentales de las notas que ejecutaba.',
        category: 'musica',
        difficulty: 4,
      },
      {
        id: 'f-12-3',
        text: 'El cantante Freddie Mercury poseía un rango vocal único de 5 octavas completas certificado por el Conservatorio Real de Londres.',
        isLie: true,
        explanation: '¡MENTIRA! Un estudio bioacústico exhaustivo de 2016 demostró que su rango documentado era de algo más de 3 octavas (F2 a E5), pero destacaba por un vibrato inusualmente rápido y uso de subarmónicos, no por 5 octavas.',
        category: 'musica',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 13 - HISTORIA (Mundo Antiguo)
  {
    id: 'round-13',
    level: 13,
    category: 'historia',
    themeTitle: 'Secretos de las Civilizaciones',
    facts: [
      {
        id: 'f-13-1',
        text: 'Las famosas estatuas de mármol blanco de la Antigua Grecia y Roma estaban originalmente pintadas con colores chillones, dorados y patrones llamativos.',
        isLie: false,
        explanation: '¡VERDAD! Análisis químicos con luz ultravioleta han demostrado que el Partenón y las estatuas tenían colores vibrantes como rojo, azul brillante y amarillo, desgastados con los siglos.',
        category: 'historia',
        difficulty: 4,
      },
      {
        id: 'f-13-2',
        text: 'El rey Luis XIV de Francia, conocido como el Rey Sol, se bañó únicamente dos veces en toda su vida por prescripción de sus médicos de cabecera.',
        isLie: true,
        explanation: '¡MENTIRA! Es una leyenda exagerada sobre la higiene versallesca. Luis XIV no se sumergía diariamente en tinas completas, pero sus sirvientes lo frotaban a diario con paños empapados en alcohol y perfumes de flores.',
        category: 'historia',
        difficulty: 4,
      },
      {
        id: 'f-13-3',
        text: 'La compañía automotriz Nintendo fue fundada originalmente en Kioto en el año 1889 como fabricante artesanal de cartas de juego japonesas (Hanafuda).',
        isLie: false,
        explanation: '¡VERDAD! Fusajiro Yamauchi fundó Nintendo Koppai en 1889 para fabricar naipes tradicionales de corteza de morera, mucho antes de ingresar a los videojuegos en los años 70.',
        category: 'historia',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 14 - CINE Y SERIES (Premios y Escenas Épicas)
  {
    id: 'round-14',
    level: 14,
    category: 'cine',
    themeTitle: 'Joyas del Celuloide',
    facts: [
      {
        id: 'f-14-1',
        text: 'En "Psycho" de Alfred Hitchcock, el sonido del cuchillo apuñalando en la escena de la ducha fue grabado acuchillando un melón cantaloupe.',
        isLie: false,
        explanation: '¡VERDAD! El utilero probó apuñalando sandías, tomates y carnes, pero Hitchcock con los ojos cerrados dictaminó que el melón cantaloupe producía el sonido más visceral.',
        category: 'cine',
        difficulty: 4,
      },
      {
        id: 'f-14-2',
        text: 'La máscara icónica del asesino Michael Myers en "Halloween" era en realidad una máscara de 2 dólares del capitán Kirk (William Shatner de Star Trek) pintada de blanco.',
        isLie: false,
        explanation: '¡VERDAD! Con un presupuesto diminuto, el director artístico Tommy Lee Wallace compró la máscara de Star Trek, le agrandó los agujeros de los ojos y le quitó las patillas.',
        category: 'cine',
        difficulty: 4,
      },
      {
        id: 'f-14-3',
        text: 'Christopher Nolan mandó a plantar y cosechar 500 acres reales de maíz para "Interstellar", logrando vender el grano con ganancias millonarias tras el rodaje.',
        isLie: true,
        explanation: '¡MENTIRA! Es una verdad distorsionada: sí plantaron 500 acres de maíz cerca de Calgary (inspirados en Zack Snyder), pero la venta del maíz apenas cubrió los costos agrícolas de la producción, no dejó ganancias millonarias extras.',
        category: 'cine',
        difficulty: 4,
      },
    ],
  },

  // NIVEL 15 - GEOGRAFÍA (Curiosidades Cartográficas)
  {
    id: 'round-15',
    level: 15,
    category: 'geografia',
    themeTitle: 'Territorios Desconcertantes',
    facts: [
      {
        id: 'f-15-1',
        text: 'En el pueblo de Baarle-Nassau, la frontera entre Holanda y Bélgica cruza por el medio de casas, cafeterías y salas de estar, delimitada con cruces blancas en el suelo.',
        isLie: false,
        explanation: '¡VERDAD! Es uno de los enclaves más intrincados del mundo, con 22 fragmentos de territorio belga dentro de los Países Bajos.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-15-2',
        text: 'Australia es geográficamente más ancha de este a oeste que el diámetro total visible de la Luna.',
        isLie: false,
        explanation: '¡VERDAD! Australia mide cerca de 4.000 km de costa a costa este-oeste, mientras que el diámetro lunar es de aproximadamente 3.474 km.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-15-3',
        text: 'Islandia no tiene mosquitos en absoluto debido a su alto contenido de azufre geotérmico en el agua subterránea que inhibe las larvas.',
        isLie: true,
        explanation: '¡MENTIRA! Es verdad que Islandia casi no tiene mosquitos, pero NO es por azufre geotérmico: se debe a sus ciclos climáticos donde el deshielo repentino congela y rompe el ciclo biológico larval antes de que maduren.',
        category: 'geografia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 16 - MÚSICA (Nivel Experto)
  {
    id: 'round-16',
    level: 16,
    category: 'musica',
    themeTitle: 'Controversias y Récords Melódicos',
    facts: [
      {
        id: 'f-16-1',
        text: 'La canción instrumental "4\'33\'\'" de John Cage consiste en 4 minutos y 33 segundos de silencio absoluto donde los músicos no tocan sus instrumentos.',
        isLie: false,
        explanation: '¡VERDAD! La obra estrenada en 1952 invita al público a escuchar los sonidos ambientales accidentales de la propia sala de conciertos.',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-16-2',
        text: 'David Bowie tenía una pupila permanentemente dilatada debido a un golpe en el ojo recibido durante una pelea juvenil por una chica.',
        isLie: false,
        explanation: '¡VERDAD! Su amigo George Underwood le dio un puñetazo en 1962 que le causó anisocoria permanente, dándole la apariencia de tener ojos de diferente color.',
        category: 'musica',
        difficulty: 5,
      },
      {
        id: 'f-16-3',
        text: 'El disco "The Dark Side of the Moon" de Pink Floyd fue deliberadamente grabado para sincronizarse nota por nota con "El Mago de Oz" de 1939.',
        isLie: true,
        explanation: '¡MENTIRA! El célebre fenómeno "Dark Side of the Rainbow" es pura coincidencia estadística y sugestión psicológica. Los propios miembros de Pink Floyd y el ingeniero Alan Parsons han confirmado que jamás tuvieron una videocasetera en Abbey Road.',
        category: 'musica',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 17 - HISTORIA (Nivel Maestro)
  {
    id: 'round-17',
    level: 17,
    category: 'historia',
    themeTitle: 'Diplomacia y Coincidencias Insólitas',
    facts: [
      {
        id: 'f-17-1',
        text: 'Thomas Jefferson y John Adams, dos de los principales padres fundadores de EE.UU., murieron el mismo día: el 4 de julio de 1826, justo en el 50 aniversario de la Independencia.',
        isLie: false,
        explanation: '¡VERDAD! Una de las coincidencias más asombrosas de la historia. Las últimas palabras de Adams fueron "Thomas Jefferson aún sobrevive", sin saber que Jefferson había muerto unas horas antes.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-17-2',
        text: 'Durante la Primera Guerra Mundial, la tregua navideña de 1914 incluyó partidos de fútbol no oficiales entre soldados alemanes y británicos en tierra de nadie.',
        isLie: false,
        explanation: '¡VERDAD! Hubo cánticos de villancicos, intercambio de cigarrillos y botones de uniformes, e incluso partidos improvisados con pelotas de trapo.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-17-3',
        text: 'La guillotina fue prohibida definitivamente en Francia en el año 1899 tras una convención de derechos civiles en París.',
        isLie: true,
        explanation: '¡MENTIRA! La guillotina siguió siendo el método oficial de ejecución en Francia hasta 1977 (Hamida Djandoubi fue el último ejecutado), ¡el mismo año en que se estrenó Star Wars!',
        category: 'historia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 18 - CINE Y SERIES (Nivel Maestro)
  {
    id: 'round-18',
    level: 18,
    category: 'cine',
    themeTitle: 'Magia Visual y Curiosidades',
    facts: [
      {
        id: 'f-18-1',
        text: 'Sean Connery usó peluquín en todas y cada una de sus películas como James Bond, ya que comenzó a quedarse calvo a los 21 años.',
        isLie: false,
        explanation: '¡VERDAD! Incluso en "Dr. No" (1962), Connery ya utilizaba tupés a medida elaborados por el departamento de peluquería.',
        category: 'cine',
        difficulty: 5,
      },
      {
        id: 'f-18-2',
        text: 'En "Pulp Fiction", el misterioso maletín de Marsellus Wallace contenía según el guion original la auténtica alma del gánster vendida al diablo.',
        isLie: true,
        explanation: '¡MENTIRA! Es una famosa teoría de fanáticos pero Quentin Tarantino y el coguionista Roger Avary aclararon que en el guión original eran diamantes, y decidieron dejarlo como un MacGuffin sin contenido específico para generar misterio.',
        category: 'cine',
        difficulty: 5,
      },
      {
        id: 'f-18-3',
        text: 'El papel de Neo en "The Matrix" fue ofrecido formalmente a Will Smith, quien lo rechazó para protagonizar la fallida comedia "Wild Wild West".',
        isLie: false,
        explanation: '¡VERDAD! El propio Will Smith ha confesado en múltiples entrevistas que no entendió el concepto de los Wachowski durante la reunión y eligió Wild Wild West.',
        category: 'cine',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 19 - GEOGRAFÍA (Nivel Infinito / Desafiante)
  {
    id: 'round-19',
    level: 19,
    category: 'geografia',
    themeTitle: 'Puntos Ciegos del Globo',
    facts: [
      {
        id: 'f-19-1',
        text: 'El "Punto Nemo" en el océano Pacífico está tan apartado de tierra firme que las personas más cercanas suelen ser los astronautas de la Estación Espacial Internacional.',
        isLie: false,
        explanation: '¡VERDAD! La costa más cercana está a más de 2.688 km, mientras que la EEI pasa en órbita a solo 400 km por encima.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-19-2',
        text: 'África es el único continente del planeta que cuenta con territorios en los cuatro hemisferios terrestres (norte, sur, este y oeste).',
        isLie: false,
        explanation: '¡VERDAD! Es atravesado tanto por la línea del Ecuador como por el meridiano de Greenwich.',
        category: 'geografia',
        difficulty: 5,
      },
      {
        id: 'f-19-3',
        text: 'La ciudad de Estambul es la única metrópoli mundial con más de 10 millones de personas que no posee ninguna estación de metro subterránea por riesgo sísmico.',
        isLie: true,
        explanation: '¡MENTIRA! Estambul cuenta con una de las redes de metro más modernas de Europa y Asia (Metro de Estambul, con más de 10 líneas subterráneas y el túnel submarino Marmaray bajo el Bósforo).',
        category: 'geografia',
        difficulty: 5,
      },
    ],
  },

  // NIVEL 20 - HISTORIA (Nivel Infinito / Desafiante)
  {
    id: 'round-20',
    level: 20,
    category: 'historia',
    themeTitle: 'Misterios y Paradojas del Pasado',
    facts: [
      {
        id: 'f-20-1',
        text: 'Los antiguos romanos utilizaban orina humana fermentada como detergente para blanquear las togas y enjuague bucal debido a su alto contenido de amoníaco.',
        isLie: false,
        explanation: '¡VERDAD! La orina era tan cotizada comercialmente que el emperador Vespasiano impuso un impuesto oficial sobre su recolección en letrinas públicas.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-20-2',
        text: 'La Universidad de Oxford es cronológicamente más antigua que la fundación del Imperio Azteca en Mesoamérica.',
        isLie: false,
        explanation: '¡VERDAD! Ya existían clases organizadas en Oxford hacia el año 1096, mientras que la civilización azteca fundó Tenochtitlán en 1325.',
        category: 'historia',
        difficulty: 5,
      },
      {
        id: 'f-20-3',
        text: 'El célebre Caballo de Troya fue documentado por primera vez en detalle en los versos canónicos de la "Ilíada" de Homero.',
        isLie: true,
        explanation: '¡MENTIRA! La "Ilíada" de Homero termina con el funeral de Héctor antes de la caída de Troya. El relato del caballo de madera se narra brevemente en la "Odisea" y su versión más célebre y detallada fue escrita siglos después por Virgilio en la "Eneida".',
        category: 'historia',
        difficulty: 5,
      },
    ],
  },
];

// Banco modular de hechos verdaderos y mentiras convincentes para el Generador Infinito
export const INFINITE_POOL = {
  trueFacts: [
    {
      id: 'tp-1',
      text: 'Los tiburones aparecieron en el registro fósil de la Tierra antes que los primeros árboles.',
      explanation: '¡VERDAD! Los primeros tiburones datan de hace 400-450 millones de años, mientras que los primeros árboles evolucionaron hace unos 350 millones de años.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-2',
      text: 'Existe más distancia temporal entre la existencia del Stegosaurus y el T-Rex que entre el T-Rex y nosotros los humanos.',
      explanation: '¡VERDAD! Unos 83 millones de años separan al Stegosaurus del Tyrannosaurus, mientras que solo unos 66 millones de años nos separan del T-Rex.',
      category: 'historia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-3',
      text: 'En el espacio interestelar flota una gigantesca nube de gas y polvo llamada Sagittarius B2 que contiene millones de litros de alcohol etílico y huele a ron.',
      explanation: '¡VERDAD! Astrónomos detectaron en Sagittarius B2 formiato de etilo, la molécula responsable del aroma a ron y del sabor a frambuesas.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-4',
      text: 'Rusia y Estados Unidos están separados en su punto más cercano por apenas 3,8 kilómetros en el estrecho de Bering.',
      explanation: '¡VERDAD! Entre las islas Diómedes Mayor (Rusia) y Diómedes Menor (EE.UU.) hay menos de 4 km y 21 horas de diferencia horaria.',
      category: 'geografia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-5',
      text: 'Frank Sinatra fue el primer artista al que se le ofreció el papel de John McClane en "Duro de Matar" (Die Hard) a los 73 años de edad.',
      explanation: '¡VERDAD! Por cláusulas contractuales de una película anterior basada en la misma novela ("The Detective"), el estudio estaba obligado legalmente a ofrecérselo primero a Sinatra.',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-6',
      text: 'En "El Caballero de la Noche" (The Dark Knight), Heath Ledger diseñó y se aplicó él mismo el maquillaje del Joker con cosméticos comprados en una farmacia común.',
      explanation: '¡VERDAD! Ledger quería que luciera como si el propio personaje se hubiera maquillado de forma caótica y descuidada con sus propias manos.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-7',
      text: 'Leo Fender, el mítico inventor de guitarras eléctricas icónicas como la Fender Stratocaster y el bajo Precision, nunca supo tocar la guitarra.',
      explanation: '¡VERDAD! Fender era contable y técnico de radio apasionado por la electrónica acústica, pero jamás aprendió a afinar ni a tocar los instrumentos que creó.',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-8',
      text: 'La canción "Smells Like Teen Spirit" de Nirvana debe su título a una marca de desodorante para adolescentes que usaba la novia del vocalista Kurt Cobain.',
      explanation: '¡VERDAD! Su amiga Kathleen Hanna escribió en la pared "Kurt smells like Teen Spirit" refiriéndose al desodorante, y Cobain pensó erróneamente que era un lema revolucionario poético.',
      category: 'musica' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-9',
      text: 'En 1977, un solo detector de radioastronomía captó la señal "¡Wow!", una transmisión anómala de 72 segundos del espacio profundo que nunca más volvió a repetirse.',
      explanation: '¡VERDAD! El astrónomo Jerry Ehman rodeó con un círculo rojo la secuencia 6EQUJ5 en el papel y escribió al margen "¡Wow!", enigma que continúa hoy.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-10',
      text: 'El rey de corazones en la baraja francesa de póquer es el único rey que no tiene bigote y parece estar clavándose una espada en la cabeza.',
      explanation: '¡VERDAD! Es apodado el "Rey Suicida". Diseñadores medievales copiaron de forma deficiente un hacha de guerra levantada, convirtiéndola en una espada clavada en su sien.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-11',
      text: 'El actor Sean Bean ha muerto en pantalla en más de 20 películas y series distintas, al punto de solicitar a los directores que dejen de matar a sus personajes.',
      explanation: '¡VERDAD! Tras morir trágicamente en El Señor de los Anillos, GoldenEye y Juego de Tronos, Bean rechazó papeles donde el guion exigía su muerte prematura.',
      category: 'cine' as Category,
      difficulty: 2 as const,
    },
    {
      id: 'tp-12',
      text: 'El término "Bluetooth" proviene del rey vikingo Harald Blåtand (Diente Azul), célebre por unificar las tribus de Noruega y Dinamarca en el siglo X.',
      explanation: '¡VERDAD! Los ingenieros de Intel y Ericsson bautizaron la tecnología con ese nombre porque su propósito era unificar protocolos de comunicación inalámbrica.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-13',
      text: 'Los flamencos se alimentan con la cabeza boca abajo debido a la estructura anatómica de su pico filtrador.',
      explanation: '¡VERDAD! La mandíbula superior del flamenco es móvil y la inferior fija, por lo que para filtrar crustáceos y algas del lodo deben sumergir la cabeza al revés.',
      category: 'geografia' as Category,
      difficulty: 2 as const,
    },
    {
      id: 'tp-14',
      text: 'En Suiza es ilegal por ley de bienestar animal tener una sola cobaya o conejillo de indias porque se consideran animales gregarios que sufren soledad.',
      explanation: '¡VERDAD! La legislación suiza exige tener al menos dos, e incluso existen servicios de alquiler de cobayas en caso de que una muera para no dejar sola a la sobreviviente.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-15',
      text: 'El logotipo original de Chupa Chups fue diseñado en 1969 por el mismísimo artista surrealista Salvador Dalí en una servilleta de cafetería.',
      explanation: '¡VERDAD! El fundador Enric Bernat le pagó una fortuna a Dalí, quien diseñó la icónica flor amarilla y recomendó colocarla arriba del caramelo para que fuera visible.',
      category: 'historia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-16',
      text: 'La canción de Queen "Radio Ga Ga" inspiró el nombre artístico de la cantante pop Lady Gaga.',
      explanation: '¡VERDAD! El productor Rob Fusari solía cantarle Radio Ga Ga cuando Stefani Germanotta entraba al estudio; un error de autocorrector en un SMS terminó acuñando su nombre artístico.',
      category: 'musica' as Category,
      difficulty: 2 as const,
    },
    {
      id: 'tp-17',
      text: 'Las huellas dactilares de los koalas son tan idénticas a las humanas que expertos forenses han sido confundidos en escenas de crimen en Australia.',
      explanation: '¡VERDAD! Incluso bajo microscopio electrónico de barrido, los bucles y crestas papilares de los koalas son casi indistinguibles de las huellas humanas.',
      category: 'geografia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-18',
      text: 'En "El Caballero de la Noche Asciende", Christian Bale no necesitó efectos especiales para el cuello fornido de Batman: aumentó 14 kilos de músculo en 4 meses.',
      explanation: '¡VERDAD! Bale es célebre por sus radicales transformaciones físicas, pasando de los 55 kg de "El Maquinista" a más de 86 kg para encarnar a Bruce Wayne.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-19',
      text: 'Existe un hongo parásito (Ophiocordyceps unilateralis) que infecta hormigas, toma el control de su sistema nervioso y las hace trepar a una hoja antes de matarlas.',
      explanation: '¡VERDAD! Es el hongo zombi real que inspiró la historia de "The Last of Us". Obliga a la hormiga a fijar sus mandíbulas en una hoja alta para dispersar esporas.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-20',
      text: 'El primer dominio de internet de la historia registrado comercialmente fue Symbolics.com el 15 de marzo de 1985.',
      explanation: '¡VERDAD! La empresa fabricante de ordenadores Symbolics registró el primer .com años antes de la creación de la World Wide Web por Tim Berners-Lee.',
      category: 'historia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-21',
      text: 'Los cuervos pueden recordar y guardar rencor al rostro de un humano específico durante más de 5 años y enseñar a su descendencia a atacar a esa persona.',
      explanation: '¡VERDAD! Experimentos de la Universidad de Washington con máscaras de goma demostraron que los cuervos comunican a otros miembros de la bandada qué rostros son hostiles.',
      category: 'geografia' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-22',
      text: 'En "Alien: El octavo pasajero", la reacción de horror de los actores en la escena del quebrantapechos fue real porque no les dijeron que la criatura explotaría sangre.',
      explanation: '¡VERDAD! Ridley Scott mantuvo en secreto la cantidad de sangre y tripas falsas que saltarían sobre Sigourney Weaver y Veronica Cartwright para capturar shock auténtico.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'tp-23',
      text: 'Existe un árbol en la selva amazónica llamado Socratea exorrhiza o "palmera caminante" cuyas raíces adventicias le permiten moverse hasta 20 metros a lo largo de los años.',
      explanation: '¡VERDAD! Al brotar nuevas raíces hacia la luz solar mientras las viejas se secan, la palmera se desplaza lentamente buscando claros en el dosel de la selva.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'tp-24',
      text: 'La canción "Wonderwall" de Oasis originalmente se iba a llamar "Wishing Stone", pero Noel Gallagher la cambió tras ver una película de George Harrison.',
      explanation: '¡VERDAD! Gallagher tomó el título de "Wonderwall Music", el álbum de banda sonora experimental que George Harrison compuso en 1968.',
      category: 'musica' as Category,
      difficulty: 4 as const,
    }
  ],
  convincingLies: [
    {
      id: 'lp-1',
      text: 'La banda Queen grabó las campanas iniciales de "Bohemian Rhapsody" en la torre del reloj Big Ben de Londres tras obtener un permiso especial de la Reina Isabel II.',
      explanation: '¡MENTIRA! La canción no contiene grabaciones del Big Ben; las campanas y efectos orquestales fueron creados íntegramente en los estudios Rockfield de Gales por Freddie Mercury y Roy Thomas Baker.',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-2',
      text: 'El Canal de Panamá fue construido con compuertas fabricadas con acero reciclado de acorazados hundidos durante la Guerra de Secesión estadounidense.',
      explanation: '¡MENTIRA! Las colosales compuertas fueron forjadas con acero al carbono completamente virgen por la empresa Pennsylvania Steel Co. para garantizar resistencia estructural sin precedentes.',
      category: 'geografia' as Category,
      difficulty: 5 as const,
    },
    {
      id: 'lp-3',
      text: 'En "Matrix Reloaded", la autopista de 2 kilómetros utilizada para la persecución fue donada íntegramente al gobierno de California tras finalizar el rodaje.',
      explanation: '¡MENTIRA! La autopista fue construida sobre una pista de aterrizaje militar abandonada en Alameda y tras el rodaje fue destruida y reciclada al 97% para no violar normativas civiles.',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-4',
      text: 'Alejandro Magno padecía de hemofilia congénita, por lo que sus generales tenían orden de batirse en duelo con cualquiera que le causara un corte superficial.',
      explanation: '¡MENTIRA! Alejandro Magno sufrió múltiples heridas de guerra graves (incluyendo una flecha que le perforó el pulmón en la India) y sobrevivió a todas ellas en el acto, lo que descarta hemofilia.',
      category: 'historia' as Category,
      difficulty: 5 as const,
    },
    {
      id: 'lp-5',
      text: 'El famoso acorde de apertura de "A Hard Day\'s Night" de The Beatles fue creado accidentalmente cuando Ringo Starr tropezó sobre los cables del amplificador.',
      explanation: '¡MENTIRA! El acorde Fadd9 fue minuciosamente planificado y ejecutado simultáneamente por George Harrison en una guitarra Rickenbacker de 12 cuerdas, John Lennon y el piano de George Martin.',
      category: 'musica' as Category,
      difficulty: 5 as const,
    },
    {
      id: 'lp-6',
      text: 'En el desierto de Atacama en Chile existe un observatorio astronómico construido dentro de un cráter volcánico inactivo que utiliza magma frío como aislamiento térmico.',
      explanation: '¡MENTIRA! Los observatorios del Atacama (como ALMA o Paranal) están en mesetas rocosas elevadas y secas, sin relación alguna con cráteres volcánicos ni aislamiento por magma.',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-7',
      text: 'La risa icónica del emperador Palpatine en Star Wars fue inspirada por el sonido de una hiena sedada que el diseñador de sonido grabó en un zoológico de San Diego.',
      explanation: '¡MENTIRA! La risa y la voz fueron interpretación pura del consagrado actor escocés Ian McDiarmid, con una leve modulación de graves añadida por Ben Burtt.',
      category: 'cine' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-8',
      text: 'El Papa Gregorio IX declaró en una bula papal que los gatos negros eran encarnaciones de Satanás, lo que provocó una peste bubónica al diezmar a los felinos cazadores de ratas.',
      explanation: '¡MENTIRA! Aunque la bula "Vox in Rama" de 1233 mencionaba ritos heréticos que incluían a un gato negro mítico, jamás ordenó el exterminio de gatos en Europa ni causó la Peste Negra (que ocurrió más de un siglo después).',
      category: 'historia' as Category,
      difficulty: 5 as const,
    },
    {
      id: 'lp-9',
      text: 'Los pulpos tienen tres corazones y sangre azul porque contienen microcristales de titanio disueltos en su plasma.',
      explanation: '¡MENTIRA! Tienen 3 corazones y sangre azul, pero NO es por titanio: se debe a la hemocianina, una proteína respiratoria basada en cobre (no en hierro como nuestra hemoglobina).',
      category: 'geografia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-10',
      text: 'Beethoven dedicó inicialmente su famosa pieza "Para Elisa" a la emperatriz austríaca María Teresa por su apoyo financiero a sus tratamientos de sordera.',
      explanation: '¡MENTIRA! "Para Elisa" (Für Elise) fue dedicada a Therese Malfatti, una alumna de la que Beethoven estaba enamorado y a quien le propuso matrimonio en 1810 (y ella lo rechazó).',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-11',
      text: 'En "Volver al Futuro", el DeLorean fue elegido porque la empresa fabricante patrocinó el 40% del presupuesto total de la película.',
      explanation: '¡MENTIRA! La empresa DeLorean ya estaba en quiebra cuando se rodó la película. Robert Zemeckis lo eligió porque sus puertas de ala de gaviota hacían creíble que una familia granjera lo confundiera con una nave alienígena.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    },
    {
      id: 'lp-12',
      text: 'Durante la época victoriana en Inglaterra, la reina Victoria prohibió formalmente las patas descubiertas en las mesas de comedor por considerarlas eróticas.',
      explanation: '¡MENTIRA! Es una leyenda urbana satírica inventada por el capitán Frederick Marryat en su diario de viaje por EE.UU. como burla al puritanismo exagerado.',
      category: 'historia' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-13',
      text: 'El monte Kilimanjaro en Tanzania es el único punto de África donde jamás se han derretido sus glaciares durante los últimos 50.000 años.',
      explanation: '¡MENTIRA! Estudios de paleoclima y testigos de hielo demuestran que el Kilimanjaro ha sufrido múltiples ciclos de deshielo total en los últimos 11.000 años, y sus glaciares actuales tienen menos de 1.200 años.',
      category: 'geografia' as Category,
      difficulty: 5 as const,
    },
    {
      id: 'lp-14',
      text: 'El cantante Bob Dylan cambió su apellido legal de Robert Zimmerman a Dylan en homenaje a Dylan Thomas durante una ceremonia en el ayuntamiento de Londres.',
      explanation: '¡MENTIRA! Hizo el cambio legal de nombre en la Corte Suprema de Minneapolis (EE.UU.) en agosto de 1962, no en Londres.',
      category: 'musica' as Category,
      difficulty: 4 as const,
    },
    {
      id: 'lp-15',
      text: 'En "El Padrino II", Robert De Niro aprendió el dialecto siciliano en apenas 4 días gracias a un método hipnótico experimental de memorización.',
      explanation: '¡MENTIRA! De Niro se mudó a Sicilia durante cuatro meses reales, viviendo entre pescadores y lugareños para absorber el acento y los gestos naturales.',
      category: 'cine' as Category,
      difficulty: 3 as const,
    }
  ]
};
