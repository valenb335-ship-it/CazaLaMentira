import React, { useState } from 'react';
import { StudyMaterial } from '../types/game';
import { generateStudyRoundsFromText, SAMPLE_STUDY_MATERIALS } from '../utils/studyEngine';
import { CrossIcon } from './Icons';

interface StudyUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartStudy: (material: StudyMaterial) => void;
}

export const StudyUploadModal: React.FC<StudyUploadModalProps> = ({
  isOpen,
  onClose,
  onStartStudy,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'samples'>('paste');
  const [title, setTitle] = useState<string>('');
  const [rawText, setRawText] = useState<string>('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen) return null;

  // Manejar subida de archivo (.txt, .md)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
    };
    reader.onerror = () => {
      setErrorMsg('Error al leer el archivo. Intenta copiar y pegar el texto.');
    };
    reader.readAsText(file);
  };

  // Cargar ejemplo predefinido
  const handleLoadSample = (sample: (typeof SAMPLE_STUDY_MATERIALS)[0]) => {
    setTitle(sample.title);
    setRawText(sample.text);
    setErrorMsg(null);
    setActiveTab('paste');
  };

  // Procesar y generar la trivia de estudio
  const handleGenerate = () => {
    setErrorMsg(null);
    const studyTitle = title.trim() || 'Mis Apuntes';

    if (!rawText.trim() || rawText.trim().length < 50) {
      setErrorMsg('Por favor ingresa o sube un texto con al menos varios párrafos o afirmaciones.');
      return;
    }

    try {
      setIsProcessing(true);
      const rounds = generateStudyRoundsFromText(studyTitle, rawText);

      if (rounds.length === 0) {
        setErrorMsg('No se pudieron extraer suficientes oraciones independientes. Asegúrate de separar las ideas con puntos o saltos de línea.');
        setIsProcessing(false);
        return;
      }

      const material: StudyMaterial = {
        id: `study-${Date.now()}`,
        title: studyTitle,
        rawText,
        rounds,
        createdAt: new Date().toISOString(),
      };

      setIsProcessing(false);
      onStartStudy(material);
      onClose();
    } catch (err: unknown) {
      setIsProcessing(false);
      setErrorMsg((err as Error).message || 'Error al procesar el material de estudio.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-pop-success">
      <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Encabezado */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base">
              📚
            </div>
            <div>
              <h3 className="text-base font-black text-zinc-100 uppercase tracking-wide">
                Modo Estudio
              </h3>
              <p className="text-xs text-zinc-400">
                Aprende activamente generando 2 verdades y 1 mentira con tus propios apuntes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <CrossIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de modo de carga */}
        <div className="flex border-b border-zinc-800/80 bg-zinc-950/40 p-1 gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'paste'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Pegar Texto / Apuntes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'upload'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Subir Archivo (.txt, .md)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('samples')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'samples'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Ejemplos Rápidos
          </button>
        </div>

        {/* Contenido del formulario */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Título del Tema */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Tema o Materia:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Biología Celular, Historia Contemporánea, Derecho Romano..."
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-sm text-zinc-100 focus:outline-none placeholder:text-zinc-600"
            />
          </div>

          {/* Pestaña: Pegar texto */}
          {activeTab === 'paste' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Pega tus apuntes o resumen:
              </label>
              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={7}
                placeholder="Pega aquí el contenido de tus clases, libros o resúmenes. Cada idea o hecho separado por puntos o renglones servirá para generar preguntas..."
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-600 rounded-xl p-3 text-xs sm:text-sm text-zinc-200 focus:outline-none placeholder:text-zinc-600 resize-none font-mono leading-relaxed"
              />
              <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                <span>Mínimo 3 afirmaciones</span>
                <span>{rawText.length} caracteres</span>
              </div>
            </div>
          )}

          {/* Pestaña: Subir archivo */}
          {activeTab === 'upload' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Selecciona un archivo de tus apuntes:
              </label>
              <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-950/60 rounded-xl p-6 text-center transition-colors">
                <input
                  type="file"
                  id="study-file-input"
                  accept=".txt,.md,.text"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="study-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl">📄</span>
                  <span className="text-xs font-bold text-zinc-300">
                    {fileName ? `Archivo cargado: ${fileName}` : 'Haz clic para elegir un archivo (.txt o .md)'}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    Formatos de texto plano y markdown
                  </span>
                </label>
              </div>

              {rawText && (
                <div className="mt-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800/80 max-h-28 overflow-y-auto text-[11px] text-zinc-400 font-mono">
                  {rawText.slice(0, 300)}...
                </div>
              )}
            </div>
          )}

          {/* Pestaña: Ejemplos */}
          {activeTab === 'samples' && (
            <div className="space-y-2.5">
              <p className="text-xs text-zinc-400">
                Elige uno de los ejemplos para probar el generador al instante:
              </p>
              {SAMPLE_STUDY_MATERIALS.map((sample) => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => handleLoadSample(sample)}
                  className="w-full text-left p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {sample.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                      {sample.text.slice(0, 80)}...
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-300">Usar →</span>
                </button>
              ))}
            </div>
          )}

          {/* Mensaje de error si aplica */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/50 border border-rose-800/50 rounded-xl text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Pie y botón de acción */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isProcessing || !rawText.trim()}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <span>{isProcessing ? 'Procesando...' : 'Generar Trivia de Estudio'}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
