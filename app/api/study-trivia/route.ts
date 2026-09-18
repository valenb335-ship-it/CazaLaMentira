import { NextRequest, NextResponse } from 'next/server';
import { generateStudyRoundsFromText } from '@/app/utils/studyEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, text } = body;

    if (!text || typeof text !== 'string' || text.trim().length < 30) {
      return NextResponse.json(
        { error: 'El contenido del texto debe contener al menos 30 caracteres.' },
        { status: 400 }
      );
    }

    const studyTitle = (title && typeof title === 'string') ? title.trim() : 'Material de Estudio';

    // Generar rondas de estudio
    const rounds = generateStudyRoundsFromText(studyTitle, text);

    return NextResponse.json({
      success: true,
      title: studyTitle,
      rounds,
    });
  } catch (err: unknown) {
    console.error('Error en API de trivia de estudio:', err);
    return NextResponse.json(
      { error: (err as Error).message || 'Error al procesar el material de estudio.' },
      { status: 500 }
    );
  }
}
