# 🧠 Caza la Mentira (2 Verdades y 1 Mentira)

Un juego interactivo de trivia minimalista y adictivo construido con **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS** y **Supabase**.

---

## 🎮 ¿Cómo se juega?

1. En cada nivel se presentan **3 datos curiosos fascinantes e insólitos** en 3 grandes columnas a pantalla completa.
2. Dos de los datos son **100% reales**, y uno es una **mentira muy convincente**.
3. Haz clic en la columna que creas que es la **MENTIRA**:
   - **Acierto (Verde)**: Si detectas la mentira, la columna se ilumina en verde esmeralda, sumas puntos y aumentas tu racha de combo.
   - **Fallo (Rojo)**: Si eliges una verdad, la columna vibra en rojo carmesí, pierdes una vida y se revela la mentira.
4. Tras cada ronda se explica el origen y la historia detrás de cada dato para que siempre aprendas algo nuevo.

---

## ✨ Características Principales

- **Diseño Ultra-Minimalista**: Interfaz limpia a pantalla completa en 3 columnas interactivas, en tonos grises oscuros, verde esmeralda y rojo carmesí.
- **Sistema Anti-Repetición**: Algoritmo inteligente que guarda en `localStorage` los datos ya vistos para que nunca se le repita un hecho al mismo usuario.
- **Niveles Infinitos y Dificultad Progresiva**: Mientras más subes de nivel, más sutil y engañosa se vuelve la mentira.
- **Salón de la Fama (Ranking)**: Tabla de clasificación persistente con rivales y tu posición en tiempo real.
- **Efectos de Sonido Integrados**: Síntesis de audio con Web Audio API (sin dependencias de archivos externos).
- **Integración con Supabase**: Base de datos en la nube para registrar partidas, jugadores y ranking global.

---

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Base de Datos (Supabase)

El proyecto incluye el archivo `schema.sql` con la estructura de tablas, índices, vistas y políticas de seguridad (RLS):
- `categories`: Temáticas del juego.
- `facts`: Banco de datos curiosos y mentiras.
- `players`: Perfiles y estadísticas globales de jugadores.
- `game_sessions`: Historial de partidas jugadas.
- `v_leaderboard`: Vista en tiempo real del ranking ordenado por puntuación.

Para conectarlo a tu cuenta de Supabase:
1. Copia y ejecuta `schema.sql` en el **SQL Editor** de Supabase.
2. Copia tus claves en `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```
