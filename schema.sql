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
