-- ==========================================================
-- ESQUEMA DE BASE DE DATOS: "CAZA LA MENTIRA" (Trivia 2V y 1M)
-- Compatible con PostgreSQL y adaptable a MySQL / SQLite
-- ==========================================================

-- 1. TABLA: CATEGORÍAS (categories)
-- Almacena los temas del juego (Historia, Geografía, Música, Cine, etc.)
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY, -- 'historia', 'geografia', 'musica', 'cine'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA: DATOS CURIOSOS Y MENTIRAS (facts)
-- Almacena las afirmaciones que se presentarán a los usuarios
CREATE TABLE IF NOT EXISTS facts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id VARCHAR(50) NOT NULL,
    statement TEXT NOT NULL,
    is_lie BOOLEAN NOT NULL, -- TRUE: es la mentira a cazar / FALSE: es verdad real
    explanation TEXT NOT NULL, -- Explicación didáctica que se muestra al responder
    difficulty_level SMALLINT DEFAULT 1 CHECK (difficulty_level BETWEEN 1 AND 5),
    times_shown INT DEFAULT 0, -- Métricas de telemetría
    times_selected INT DEFAULT 0, -- Veces que los jugadores hicieron clic en este dato
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_facts_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 3. TABLA: JUGADORES / USUARIOS (players)
-- Registra a los jugadores, perfiles y estadísticas globales
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE, -- Opcional si se habilita login
    avatar_url VARCHAR(500),
    highest_score INT DEFAULT 0,
    highest_level INT DEFAULT 1,
    max_streak INT DEFAULT 0,
    total_games_played INT DEFAULT 0,
    total_correct_answers INT DEFAULT 0,
    total_wrong_answers INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA: PARTIDAS / SESIONES DE JUEGO (game_sessions)
-- Registra cada partida jugada para el historial y análisis
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID, -- NULL si es jugador invitado/anónimo
    game_mode VARCHAR(20) DEFAULT 'challenge' CHECK (game_mode IN ('challenge', 'zen')),
    final_score INT NOT NULL DEFAULT 0,
    final_level INT NOT NULL DEFAULT 1,
    max_streak INT NOT NULL DEFAULT 0,
    lives_remaining SMALLINT DEFAULT 0,
    total_questions_answered INT DEFAULT 0,
    accuracy_percentage NUMERIC(5, 2) DEFAULT 0.00,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessions_player FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE SET NULL
);

-- 5. TABLA: DETALLE DE RESPUESTAS POR RONDA (round_answers)
-- Permite saber qué eligió el usuario en cada nivel y cuánto tardó
CREATE TABLE IF NOT EXISTS round_answers (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID NOT NULL,
    level INT NOT NULL,
    selected_fact_id UUID NOT NULL,
    is_correct BOOLEAN NOT NULL,
    points_awarded INT DEFAULT 0,
    streak_multiplier NUMERIC(3, 1) DEFAULT 1.0,
    response_time_seconds NUMERIC(5, 2),
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_answers_session FOREIGN KEY (session_id) REFERENCES game_sessions(id) ON DELETE CASCADE,
    CONSTRAINT fk_answers_fact FOREIGN KEY (selected_fact_id) REFERENCES facts(id) ON DELETE CASCADE
);

-- ==========================================================
-- ÍNDICES PARA ALTO RENDIMIENTO
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_facts_category ON facts(category_id);
CREATE INDEX IF NOT EXISTS idx_facts_difficulty ON facts(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_facts_is_lie ON facts(is_lie);
CREATE INDEX IF NOT EXISTS idx_players_highest_score ON players(highest_score DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_player ON game_sessions(player_id);
CREATE INDEX IF NOT EXISTS idx_sessions_score ON game_sessions(final_score DESC);
CREATE INDEX IF NOT EXISTS idx_round_answers_session ON round_answers(session_id);

-- ==========================================================
-- VISTA DE RANKING / LEADERBOARD
-- Genera automáticamente el top de jugadores con su posición ordinal
-- ==========================================================
CREATE OR REPLACE VIEW v_leaderboard AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY s.final_score DESC, s.final_level DESC) AS rank_position,
    COALESCE(p.username, 'Invitado') AS player_name,
    s.final_score AS score,
    s.final_level AS level_reached,
    s.max_streak AS streak,
    s.accuracy_percentage AS accuracy,
    s.game_mode AS mode,
    s.ended_at AS played_at
FROM game_sessions s
LEFT JOIN players p ON s.player_id = p.id
ORDER BY s.final_score DESC, s.final_level DESC;

-- ==========================================================
-- DATOS SEMILLA (CATEGORÍAS INICIALES)
-- ==========================================================
INSERT INTO categories (id, name, description, icon_name) VALUES
('historia', 'Historia', 'Acontecimientos, personajes y paradojas del pasado.', 'HistoryIcon'),
('geografia', 'Geografía', 'Límites insólitos, climas extremos y rincones del planeta.', 'GeographyIcon'),
('musica', 'Música', 'Íconos del sonido, canciones míticas y curiosidades acústicas.', 'MusicIcon'),
('cine', 'Cine & Series', 'Secretos detrás de cámaras, películas de culto y actores.', 'MovieIcon')
ON CONFLICT (id) DO NOTHING;

-- ==========================================================
-- POLÍTICAS DE ACCESO (ROW LEVEL SECURITY - RLS PARA SUPABASE)
-- ==========================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE round_answers ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública de categorías y hechos
CREATE POLICY "Permitir lectura pública de categorías" ON categories FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública de hechos" ON facts FOR SELECT USING (true);

-- Permitir lectura y creación de jugadores y partidas públicas
CREATE POLICY "Permitir lectura pública de jugadores" ON players FOR SELECT USING (true);
CREATE POLICY "Permitir registro de jugadores" ON players FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualizar estadísticas de jugadores" ON players FOR UPDATE USING (true);

CREATE POLICY "Permitir lectura pública de partidas" ON game_sessions FOR SELECT USING (true);
CREATE POLICY "Permitir registrar partidas" ON game_sessions FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir registrar respuestas" ON round_answers FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir lectura de respuestas" ON round_answers FOR SELECT USING (true);


-- ==========================================================
-- DATOS CURIOSOS Y MENTIRAS (CATÁLOGO COMPLETO)
-- Total de datos curiosos: 86
-- ==========================================================

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'En ', true, '¡MENTIRA! De Niro se mudó a Sicilia durante cuatro meses reales, viviendo entre pescadores y lugareños para absorber el acento y los gestos naturales.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'El sonido del rugido del T-Rex en ', false, '¡VERDAD! El diseñador de sonido Gary Rydstrom mezcló un cachorro de elefante jugando, con respiraciones de cocodrilo y rugidos de tigre para lograr el mítico bramido.', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'Tom Hanks rechazó originalmente interpretar a Forrest Gump porque creía que nadie creería la historia de un hombre aficionado a los bombones.', true, '¡MENTIRA! Quien rechazó el papel protagónico de Forrest Gump fue John Travolta (decisión de la que siempre se arrepintió). Tom Hanks aceptó el papel hora y media después de leer el guión.', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Cleopatra vivió cronológicamente más cerca de la invención del iPhone y del aterrizaje en la Luna que de la construcción de las Grandes Pirámides de Guiza.', false, '¡VERDAD! La Gran Pirámide fue terminada cerca del 2560 a.C. y Cleopatra murió en el 30 a.C. (unos 2.500 años después), mientras que el alunizaje ocurrió en 1969 (unos 2.000 años después).', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'En 1932, el ejército de Australia declaró formalmente la guerra a una población de más de 20.000 emúes... y los emúes ganaron.', false, '¡VERDAD! La conocida ', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Napoleón Bonaparte padecía una fobia paralizante hacia los gatos llamada ailurofobia, que le provocaba ataques de pánico.', true, '¡MENTIRA! No existe ni un solo registro histórico de la época que demuestre que Napoleón temía a los gatos. Es un mito moderno que también se le adjudicó falsamente a Julio César y Hitler.', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'El país con la mayor cantidad de islas en todo el planeta no es Indonesia ni Filipinas, sino Suecia, con más de 267.000 islas.', false, '¡VERDAD! Suecia lidera el mundo con 267.570 islas registradas, aunque menos de mil están habitadas.', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Rusia es tan extensa geográficamente que comparte frontera terrestre oficial con 24 países soberanos distintos.', true, '¡MENTIRA! Aunque Rusia es gigante y tiene 11 husos horarios, comparte frontera terrestre oficial con 14 países (16 si se cuentan regiones parcialmente reconocidas como Osetia del Sur), muy lejos de 24.', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'En la Antártida existe una cascada que fluye con agua de color rojo sangre llamada ', false, '¡VERDAD! Las cataratas Blood Falls del glaciar Taylor emanan agua salada subterránea rica en hierro ferroso que se oxida instantáneamente al entrar en contacto con el aire.', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'Freddie Mercury compuso la exitosa canción ', false, '¡VERDAD! Ocurrió en el Hotel Bayerischer Hof de Múnich. Pidió una guitarra acústica directo al baño y escribió los acordes y la melodía casi instantáneamente.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'Wolfgang Amadeus Mozart compuso su primera sinfonía orquestal completa a los tres años, antes de aprender a escribir palabras.', true, '¡MENTIRA! Mozart era un genio prodigio, pero compuso sus primeros minuetos a los 5 años y su primera sinfonía a los 8 años. A los 3 años apenas comenzaba a imitar notas al clavecín.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'La canción ', false, '¡VERDAD! Gallagher tomó el título de ', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Durante la Edad Media, los animales podían ser formalmente juzgados y condenados en tribunales humanos con abogados defensores.', false, '¡VERDAD! Se conservan actas de juicios reales a cerdos, ratas e insectos por daños a cosechas o ataques, con alegatos jurídicos y sentencias de excomunión o ejecución.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Los vikingos utilizaban cascos ceremoniales decorados con grandes cuernos de toro para intimidar a sus enemigos en el campo de batalla.', true, '¡MENTIRA! Los vikingos jamás usaron cuernos en sus cascos de combate; habrían sido un estorbo peligroso. La imagen surgió en el siglo XIX por el diseñador de vestuario Carl Emil Doepler para la ópera de Wagner.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El emperador romano Calígula llegó a nombrar a su caballo favorito, Incitatus, como sacerdote y le acondicionó una caballeriza de mármol con pesebre de marfil.', false, '¡VERDAD! El historiador Suetonio relató cómo Calígula colmaba a Incitatus de sirvientes, mantas púrpuras y joyas para ridiculizar al mismísimo Senado romano.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'Para la escena del caballo decapitado en ', false, '¡VERDAD! Coppola no estaba conforme con la cabeza de utilería de goma, así que envió a un asistente a conseguir una cabeza real de un caballo que ya había sido sacrificado legalmente.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'El cuerpo de Walt Disney fue sometido a criogenización y descansa en una cámara frigorífica secreta bajo la atracción de Piratas del Caribe en Disneyland.', true, '¡MENTIRA! Uno de los mitos urbanos más persistentes del cine. Walt Disney fue incinerado dos días después de morir en diciembre de 1966 y sus cenizas descansan en el Forest Lawn Memorial Park de Glendale.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'La distancia en línea recta entre París y la Guayana Francesa es considerada formalmente un vuelo nacional dentro de la Unión Europea.', false, '¡VERDAD! La Guayana Francesa es un departamento de ultramar plenamente integrado a Francia y a la UE, por lo que su moneda oficial es el euro y sus vuelos internos no requieren visados especiales.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Canadá posee más de la mitad de todos los lagos naturales de agua dulce existentes en la superficie de la Tierra.', false, '¡VERDAD! Canadá alberga cerca de 2 millones de lagos; aproximadamente el 60% de todos los lagos naturales del planeta están dentro de sus fronteras.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'El monte Everest es el punto del planeta cuya cima está más cercana al espacio exterior y a la Luna.', true, '¡MENTIRA! El Everest es el más alto respecto al nivel del mar (8.848 m), pero debido al abultamiento ecuatorial de la Tierra, la cima del volcán Chimborazo en Ecuador está más alejada del centro terrestre y más cerca del espacio.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'Eminem escribió la letra de su aclamada canción ', false, '¡VERDAD! En el set de filmación de 8 Mile, Eminem aprovechaba cada pausa de iluminación para garabatear rimas continuas en un cuaderno desgastado sin borrar una sola palabra.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'Michael Jackson patentó los zapatos especiales para inclinarse 45 grados en ', true, '¡MENTIRA! El invento sí fue patentado en EE.UU. (patente US5255452A), pero los titulares registrados oficialmente fueron el propio Michael Jackson junto a Michael Bush y Dennis Tompkins, no un científico de la NASA.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'La guerra más corta documentada en la historia humana duró exactamente entre 38 y 45 minutos entre Gran Bretaña y el Sultanato de Zanzíbar en 1896.', false, '¡VERDAD! La Guerra Anglo-Zanzibariana estalló el 27 de agosto de 1896 tras la muerte del sultán. Los buques británicos bombardearon el palacio y el sucesor izó la bandera blanca a los 38 minutos.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Albert Einstein fue invitado formalmente por el gobierno en 1952 para convertirse en el segundo presidente de la historia del Estado de Israel.', false, '¡VERDAD! Tras la muerte de Chaim Weizmann, el primer ministro David Ben-Gurión le ofreció la presidencia. Einstein declinó educadamente alegando falta de aptitud natural para tratar con personas.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'La Gran Muralla China es la única construcción arquitectónica hecha por el ser humano que puede distinguirse a simple vista desde la órbita baja espacial.', true, '¡MENTIRA! Astronautas de la NASA y la ESA han confirmado reiteradamente que la muralla se mimetiza con el terreno y no se ve a simple vista. Desde el espacio se ven con más facilidad autopistas iluminadas y las pirámides con lentes telescópicas.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'El actor que interpretó a Darth Vader en el set (David Prowse) dijo todas sus líneas durante la filmación creyendo sinceramente que su voz saldría en el cine.', false, '¡VERDAD! Prowse hablaba con un marcado acento del suroeste de Inglaterra. George Lucas nunca le avisó que sería doblado posteriormente por la imponente voz de James Earl Jones.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'Keanu Reeves donó el 70% de sus ganancias salariales de ', true, '¡MENTIRA! Si bien Keanu apoya causas benéficas tras la leucemia de su hermana, el mito de que donó el 70% de su salario a hospitales fue un rumor de internet viralizado. Lo que sí hizo fue repartir bonos y motos Harley a su equipo de efectos especiales.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'El desierto del Sahara no es el desierto más grande del mundo; la Antártida y el Ártico lo superan en superficie desértica polar.', false, '¡VERDAD! Un desierto se define por su escasa precipitación anual (<250 mm). La Antártida es el desierto más grande y seco del planeta, con 14 millones de km².', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Existe una ciudad en Alaska llamada Whittier donde casi el 90% de sus 300 habitantes vive en un único edificio de 14 pisos llamado Begich Towers.', false, '¡VERDAD! Debido a las brutales tormentas de nieve, dentro del edificio hay comisaría, escuela conectada por túnel subterráneo, iglesia, supermercado y centro de salud.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'La frontera terrestre más larga del mundo entre dos países soberanos es la que separa a Rusia de la República Popular China.', true, '¡MENTIRA! La frontera binacional más larga del mundo es la frontera entre Estados Unidos y Canadá, que mide 8.891 kilómetros de longitud.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'La canción de 1982 ', false, '¡VERDAD! El presidente de CBS Records amenazó a MTV con retirar todo el catálogo de la discográfica si se negaban a pasar el video de Michael Jackson.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'Beethoven mordía una varilla de madera apoyada en la tapa de su piano para sentir las vibraciones óseas cuando ya estaba completamente sordo.', false, '¡VERDAD! Gracias a la conducción ósea del cráneo a través de la mandíbula, Beethoven lograba percibir frecuencias fundamentales de las notas que ejecutaba.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'El cantante Freddie Mercury poseía un rango vocal único de 5 octavas completas certificado por el Conservatorio Real de Londres.', true, '¡MENTIRA! Un estudio bioacústico exhaustivo de 2016 demostró que su rango documentado era de algo más de 3 octavas (F2 a E5), pero destacaba por un vibrato inusualmente rápido y uso de subarmónicos, no por 5 octavas.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Las famosas estatuas de mármol blanco de la Antigua Grecia y Roma estaban originalmente pintadas con colores chillones, dorados y patrones llamativos.', false, '¡VERDAD! Análisis químicos con luz ultravioleta han demostrado que el Partenón y las estatuas tenían colores vibrantes como rojo, azul brillante y amarillo, desgastados con los siglos.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El rey Luis XIV de Francia, conocido como el Rey Sol, se bañó únicamente dos veces en toda su vida por prescripción de sus médicos de cabecera.', true, '¡MENTIRA! Es una leyenda exagerada sobre la higiene versallesca. Luis XIV no se sumergía diariamente en tinas completas, pero sus sirvientes lo frotaban a diario con paños empapados en alcohol y perfumes de flores.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'La compañía automotriz Nintendo fue fundada originalmente en Kioto en el año 1889 como fabricante artesanal de cartas de juego japonesas (Hanafuda).', false, '¡VERDAD! Fusajiro Yamauchi fundó Nintendo Koppai en 1889 para fabricar naipes tradicionales de corteza de morera, mucho antes de ingresar a los videojuegos en los años 70.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'La máscara icónica del asesino Michael Myers en ', false, '¡VERDAD! Con un presupuesto diminuto, el director artístico Tommy Lee Wallace compró la máscara de Star Trek, le agrandó los agujeros de los ojos y le quitó las patillas.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'Christopher Nolan mandó a plantar y cosechar 500 acres reales de maíz para ', true, '¡MENTIRA! Es una verdad distorsionada: sí plantaron 500 acres de maíz cerca de Calgary (inspirados en Zack Snyder), pero la venta del maíz apenas cubrió los costos agrícolas de la producción, no dejó ganancias millonarias extras.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'En el pueblo de Baarle-Nassau, la frontera entre Holanda y Bélgica cruza por el medio de casas, cafeterías y salas de estar, delimitada con cruces blancas en el suelo.', false, '¡VERDAD! Es uno de los enclaves más intrincados del mundo, con 22 fragmentos de territorio belga dentro de los Países Bajos.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Australia es geográficamente más ancha de este a oeste que el diámetro total visible de la Luna.', false, '¡VERDAD! Australia mide cerca de 4.000 km de costa a costa este-oeste, mientras que el diámetro lunar es de aproximadamente 3.474 km.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Islandia no tiene mosquitos en absoluto debido a su alto contenido de azufre geotérmico en el agua subterránea que inhibe las larvas.', true, '¡MENTIRA! Es verdad que Islandia casi no tiene mosquitos, pero NO es por azufre geotérmico: se debe a sus ciclos climáticos donde el deshielo repentino congela y rompe el ciclo biológico larval antes de que maduren.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'La canción instrumental ', false, '¡VERDAD! La obra estrenada en 1952 invita al público a escuchar los sonidos ambientales accidentales de la propia sala de conciertos.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'David Bowie tenía una pupila permanentemente dilatada debido a un golpe en el ojo recibido durante una pelea juvenil por una chica.', false, '¡VERDAD! Su amigo George Underwood le dio un puñetazo en 1962 que le causó anisocoria permanente, dándole la apariencia de tener ojos de diferente color.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'El disco ', true, '¡MENTIRA! El célebre fenómeno ', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Thomas Jefferson y John Adams, dos de los principales padres fundadores de EE.UU., murieron el mismo día: el 4 de julio de 1826, justo en el 50 aniversario de la Independencia.', false, '¡VERDAD! Una de las coincidencias más asombrosas de la historia. Las últimas palabras de Adams fueron ', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Durante la Primera Guerra Mundial, la tregua navideña de 1914 incluyó partidos de fútbol no oficiales entre soldados alemanes y británicos en tierra de nadie.', false, '¡VERDAD! Hubo cánticos de villancicos, intercambio de cigarrillos y botones de uniformes, e incluso partidos improvisados con pelotas de trapo.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'La guillotina fue prohibida definitivamente en Francia en el año 1899 tras una convención de derechos civiles en París.', true, '¡MENTIRA! La guillotina siguió siendo el método oficial de ejecución en Francia hasta 1977 (Hamida Djandoubi fue el último ejecutado), ¡el mismo año en que se estrenó Star Wars!', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'Sean Connery usó peluquín en todas y cada una de sus películas como James Bond, ya que comenzó a quedarse calvo a los 21 años.', false, '¡VERDAD! Incluso en ', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'El papel de Neo en ', false, '¡VERDAD! El propio Will Smith ha confesado en múltiples entrevistas que no entendió el concepto de los Wachowski durante la reunión y eligió Wild Wild West.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'El ', false, '¡VERDAD! La costa más cercana está a más de 2.688 km, mientras que la EEI pasa en órbita a solo 400 km por encima.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'África es el único continente del planeta que cuenta con territorios en los cuatro hemisferios terrestres (norte, sur, este y oeste).', false, '¡VERDAD! Es atravesado tanto por la línea del Ecuador como por el meridiano de Greenwich.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'La ciudad de Estambul es la única metrópoli mundial con más de 10 millones de personas que no posee ninguna estación de metro subterránea por riesgo sísmico.', true, '¡MENTIRA! Estambul cuenta con una de las redes de metro más modernas de Europa y Asia (Metro de Estambul, con más de 10 líneas subterráneas y el túnel submarino Marmaray bajo el Bósforo).', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Los antiguos romanos utilizaban orina humana fermentada como detergente para blanquear las togas y enjuague bucal debido a su alto contenido de amoníaco.', false, '¡VERDAD! La orina era tan cotizada comercialmente que el emperador Vespasiano impuso un impuesto oficial sobre su recolección en letrinas públicas.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'La Universidad de Oxford es cronológicamente más antigua que la fundación del Imperio Azteca en Mesoamérica.', false, '¡VERDAD! Ya existían clases organizadas en Oxford hacia el año 1096, mientras que la civilización azteca fundó Tenochtitlán en 1325.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El célebre Caballo de Troya fue documentado por primera vez en detalle en los versos canónicos de la ', true, '¡MENTIRA! La ', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Los tiburones aparecieron en el registro fósil de la Tierra antes que los primeros árboles.', false, '¡VERDAD! Los primeros tiburones datan de hace 400-450 millones de años, mientras que los primeros árboles evolucionaron hace unos 350 millones de años.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Existe más distancia temporal entre la existencia del Stegosaurus y el T-Rex que entre el T-Rex y nosotros los humanos.', false, '¡VERDAD! Unos 83 millones de años separan al Stegosaurus del Tyrannosaurus, mientras que solo unos 66 millones de años nos separan del T-Rex.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'En el espacio interestelar flota una gigantesca nube de gas y polvo llamada Sagittarius B2 que contiene millones de litros de alcohol etílico y huele a ron.', false, '¡VERDAD! Astrónomos detectaron en Sagittarius B2 formiato de etilo, la molécula responsable del aroma a ron y del sabor a frambuesas.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Rusia y Estados Unidos están separados en su punto más cercano por apenas 3,8 kilómetros en el estrecho de Bering.', false, '¡VERDAD! Entre las islas Diómedes Mayor (Rusia) y Diómedes Menor (EE.UU.) hay menos de 4 km y 21 horas de diferencia horaria.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'Frank Sinatra fue el primer artista al que se le ofreció el papel de John McClane en ', false, '¡VERDAD! Por cláusulas contractuales de una película anterior basada en la misma novela (', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'Leo Fender, el mítico inventor de guitarras eléctricas icónicas como la Fender Stratocaster y el bajo Precision, nunca supo tocar la guitarra.', false, '¡VERDAD! Fender era contable y técnico de radio apasionado por la electrónica acústica, pero jamás aprendió a afinar ni a tocar los instrumentos que creó.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'En 1977, un solo detector de radioastronomía captó la señal ', false, '¡VERDAD! El astrónomo Jerry Ehman rodeó con un círculo rojo la secuencia 6EQUJ5 en el papel y escribió al margen ', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El rey de corazones en la baraja francesa de póquer es el único rey que no tiene bigote y parece estar clavándose una espada en la cabeza.', false, '¡VERDAD! Es apodado el ', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'El actor Sean Bean ha muerto en pantalla en más de 20 películas y series distintas, al punto de solicitar a los directores que dejen de matar a sus personajes.', false, '¡VERDAD! Tras morir trágicamente en El Señor de los Anillos, GoldenEye y Juego de Tronos, Bean rechazó papeles donde el guion exigía su muerte prematura.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El término ', false, '¡VERDAD! Los ingenieros de Intel y Ericsson bautizaron la tecnología con ese nombre porque su propósito era unificar protocolos de comunicación inalámbrica.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Los flamencos se alimentan con la cabeza boca abajo debido a la estructura anatómica de su pico filtrador.', false, '¡VERDAD! La mandíbula superior del flamenco es móvil y la inferior fija, por lo que para filtrar crustáceos y algas del lodo deben sumergir la cabeza al revés.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'En Suiza es ilegal por ley de bienestar animal tener una sola cobaya o conejillo de indias porque se consideran animales gregarios que sufren soledad.', false, '¡VERDAD! La legislación suiza exige tener al menos dos, e incluso existen servicios de alquiler de cobayas en caso de que una muera para no dejar sola a la sobreviviente.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El logotipo original de Chupa Chups fue diseñado en 1969 por el mismísimo artista surrealista Salvador Dalí en una servilleta de cafetería.', false, '¡VERDAD! El fundador Enric Bernat le pagó una fortuna a Dalí, quien diseñó la icónica flor amarilla y recomendó colocarla arriba del caramelo para que fuera visible.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'La canción de Queen ', false, '¡VERDAD! El productor Rob Fusari solía cantarle Radio Ga Ga cuando Stefani Germanotta entraba al estudio; un error de autocorrector en un SMS terminó acuñando su nombre artístico.', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Las huellas dactilares de los koalas son tan idénticas a las humanas que expertos forenses han sido confundidos en escenas de crimen en Australia.', false, '¡VERDAD! Incluso bajo microscopio electrónico de barrido, los bucles y crestas papilares de los koalas son casi indistinguibles de las huellas humanas.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'Existe un hongo parásito (Ophiocordyceps unilateralis) que infecta hormigas, toma el control de su sistema nervioso y las hace trepar a una hoja antes de matarlas.', false, '¡VERDAD! Es el hongo zombi real que inspiró la historia de ', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El primer dominio de internet de la historia registrado comercialmente fue Symbolics.com el 15 de marzo de 1985.', false, '¡VERDAD! La empresa fabricante de ordenadores Symbolics registró el primer .com años antes de la creación de la World Wide Web por Tim Berners-Lee.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Los cuervos pueden recordar y guardar rencor al rostro de un humano específico durante más de 5 años y enseñar a su descendencia a atacar a esa persona.', false, '¡VERDAD! Experimentos de la Universidad de Washington con máscaras de goma demostraron que los cuervos comunican a otros miembros de la bandada qué rostros son hostiles.', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Existe un árbol en la selva amazónica llamado Socratea exorrhiza o ', false, '¡VERDAD! Al brotar nuevas raíces hacia la luz solar mientras las viejas se secan, la palmera se desplaza lentamente buscando claros en el dosel de la selva.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'La banda Queen grabó las campanas iniciales de ', true, '¡MENTIRA! La canción no contiene grabaciones del Big Ben; las campanas y efectos orquestales fueron creados íntegramente en los estudios Rockfield de Gales por Freddie Mercury y Roy Thomas Baker.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'El Canal de Panamá fue construido con compuertas fabricadas con acero reciclado de acorazados hundidos durante la Guerra de Secesión estadounidense.', true, '¡MENTIRA! Las colosales compuertas fueron forjadas con acero al carbono completamente virgen por la empresa Pennsylvania Steel Co. para garantizar resistencia estructural sin precedentes.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Alejandro Magno padecía de hemofilia congénita, por lo que sus generales tenían orden de batirse en duelo con cualquiera que le causara un corte superficial.', true, '¡MENTIRA! Alejandro Magno sufrió múltiples heridas de guerra graves (incluyendo una flecha que le perforó el pulmón en la India) y sobrevivió a todas ellas en el acto, lo que descarta hemofilia.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'El famoso acorde de apertura de ', true, '¡MENTIRA! El acorde Fadd9 fue minuciosamente planificado y ejecutado simultáneamente por George Harrison en una guitarra Rickenbacker de 12 cuerdas, John Lennon y el piano de George Martin.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'En el desierto de Atacama en Chile existe un observatorio astronómico construido dentro de un cráter volcánico inactivo que utiliza magma frío como aislamiento térmico.', true, '¡MENTIRA! Los observatorios del Atacama (como ALMA o Paranal) están en mesetas rocosas elevadas y secas, sin relación alguna con cráteres volcánicos ni aislamiento por magma.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('cine', 'La risa icónica del emperador Palpatine en Star Wars fue inspirada por el sonido de una hiena sedada que el diseñador de sonido grabó en un zoológico de San Diego.', true, '¡MENTIRA! La risa y la voz fueron interpretación pura del consagrado actor escocés Ian McDiarmid, con una leve modulación de graves añadida por Ben Burtt.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'El Papa Gregorio IX declaró en una bula papal que los gatos negros eran encarnaciones de Satanás, lo que provocó una peste bubónica al diezmar a los felinos cazadores de ratas.', true, '¡MENTIRA! Aunque la bula ', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'Los pulpos tienen tres corazones y sangre azul porque contienen microcristales de titanio disueltos en su plasma.', true, '¡MENTIRA! Tienen 3 corazones y sangre azul, pero NO es por titanio: se debe a la hemocianina, una proteína respiratoria basada en cobre (no en hierro como nuestra hemoglobina).', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'Beethoven dedicó inicialmente su famosa pieza ', true, '¡MENTIRA! ', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('historia', 'Durante la época victoriana en Inglaterra, la reina Victoria prohibió formalmente las patas descubiertas en las mesas de comedor por considerarlas eróticas.', true, '¡MENTIRA! Es una leyenda urbana satírica inventada por el capitán Frederick Marryat en su diario de viaje por EE.UU. como burla al puritanismo exagerado.', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('geografia', 'El monte Kilimanjaro en Tanzania es el único punto de África donde jamás se han derretido sus glaciares durante los últimos 50.000 años.', true, '¡MENTIRA! Estudios de paleoclima y testigos de hielo demuestran que el Kilimanjaro ha sufrido múltiples ciclos de deshielo total en los últimos 11.000 años, y sus glaciares actuales tienen menos de 1.200 años.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO facts (category_id, statement, is_lie, explanation, difficulty_level, is_active)
VALUES ('musica', 'El cantante Bob Dylan cambió su apellido legal de Robert Zimmerman a Dylan en homenaje a Dylan Thomas durante una ceremonia en el ayuntamiento de Londres.', true, '¡MENTIRA! Hizo el cambio legal de nombre en la Corte Suprema de Minneapolis (EE.UU.) en agosto de 1962, no en Londres.', 4, true)
ON CONFLICT DO NOTHING;

