import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause,
  Star, 
  Music, 
  MessageCircleHeart, 
  Headphones, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  ShieldCheck,
  Heart,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function CreaTuCancion() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Mantenemos intacta la lógica de los toasts de simulación
  useEffect(() => {
    const names = ['Carlos M.', 'Ana P.', 'Javier T.', 'Lucía R.', 'Miguel A.'];
    const occasions = ['aniversario', 'cumpleaños', 'boda', 'declaración', 'regalo familiar'];
    
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomOccasion = occasions[Math.floor(Math.random() * occasions.length)];
      toast.success(`${randomName} acaba de pedir una canción para su ${randomOccasion}!`);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: '¿Cuánto tiempo tarda en estar lista mi canción?',
      answer: 'Recibirás la primera versión de tu canción en un plazo de 3 a 5 días hábiles. Nuestro equipo de productores premium trabaja meticulosamente para capturar cada matiz de tu historia.'
    },
    {
      question: '¿Puedo pedir cambios si algo no me convence?',
      answer: '¡Por supuesto! Tu satisfacción absoluta es nuestra prioridad fundamental. Incluimos hasta 2 rondas completas de revisiones gratuitas para perfeccionar los arreglos y la letra.'
    },
    {
      question: '¿En qué formato recibiré la canción?',
      answer: 'Te entregaremos el máster final en formato MP3 de alta fidelidad (320kbps) y en formato WAV de alta resolución (calidad de estudio de grabación profesional), listos para reproducir en cualquier dispositivo.'
    }
  ];

  return (
    <div className="min-h-screen text-neutral-900 bg-[#FDFBF7] selection:bg-[#8B1F32]/10 selection:text-[#8B1F32] overflow-x-hidden antialiased">
      
      {/* 1. Hero Section Inmersivo */}
      <section className="relative bg-gradient-to-br from-[#F5EADC] via-[#FDFBF7] to-[#F5EADC]/70 py-28 md:py-36 px-6 lg:px-8 overflow-hidden">
        {/* Elemento de diseño de fondo sutil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-white/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm text-xs font-semibold tracking-wider text-[#8B1F32] uppercase mb-8 backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" /> Estudio de Producción Musical Personalizada
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-neutral-900 font-bold mb-8 leading-[1.1]">
            Convierte tu historia en una <span className="text-[#8B1F32] relative inline-block">canción inolvidable</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Regala emociones puras. Diseñamos, componemos y grabamos bandas sonoras a medida de tus mejores recuerdos con músicos de primer nivel.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto bg-[#8B1F32] hover:bg-[#741A29] text-white text-lg font-bold py-5 px-12 rounded-full shadow-lg shadow-[#8B1F32]/30 transition-all duration-300 transform hover:scale-105 active:scale-98">
              ¡Quiero mi canción ahora!
            </button>
          </div>

          {/* Mini-reproductor con efecto Glassmorphism */}
          <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-2xl rounded-3xl p-6 max-w-md mx-auto transition-all duration-500 hover:shadow-neutral-900/5">
            <div className="flex items-center gap-5">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-[#8B1F32] text-white p-4 rounded-full flex-shrink-0 hover:bg-[#741A29] transition-all shadow-md transform hover:scale-105 active:scale-95"
                aria-label={isPlaying ? 'Pausar demo' : 'Reproducir demo'}
              >
                {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
              </button>
              <div className="flex-grow text-left">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-neutral-900 text-sm tracking-tight">"Nuestro Aniversario" (Acústico Pop)</p>
                  <span className="text-[10px] uppercase font-bold text-[#8B1F32] bg-[#8B1F32]/10 px-2 py-0.5 rounded">Demo</span>
                </div>
                <div className="w-full bg-neutral-900/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className={`bg-[#8B1F32] h-full rounded-full transition-all duration-1000 ${isPlaying ? 'w-2/3' : 'w-1/3'}`}></div>
                </div>
                <div className="flex justify-between text-[11px] font-medium text-neutral-600 mt-1.5">
                  <span>{isPlaying ? '2:15' : '1:04'}</span>
                  <span>3:45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Prueba Social de Alta Gama */}
      <section className="bg-white/70 backdrop-blur-md py-10 border-y border-neutral-200/60 relative z-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="flex text-[#8B1F32] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" fill="currentColor" />
              ))}
            </div>
            <span className="text-2xl font-serif font-black text-neutral-900">4.9<span className="text-sm text-neutral-400 font-sans font-normal">/5</span></span>
          </div>
          <div className="h-px w-12 bg-neutral-300 hidden md:block" />
          <p className="text-lg font-medium text-neutral-700 tracking-tight">
            Más de <span className="font-bold text-neutral-900 underline decoration-[#8B1F32] decoration-2">10,000 legados emocionales</span> entregados con excelencia y pasión artesanal.
          </p>
        </div>
      </section>

      {/* 3. Galería de Ejemplos */}
      <section className="bg-white py-24 md:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-bold text-neutral-900 mb-6">
              Escucha la calidad de nuestras producciones
            </h2>
            <p className="text-lg text-neutral-600">
              Cada género está cuidadosamente producido por arreglistas profesionales en estudios de alta gama.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { title: 'Romántico Premium', desc: 'Arreglos de guitarra y piano ideales para aniversarios inolvidables y pedidas de mano mágicas.', icon: <Heart className="w-7 h-7 text-[#8B1F32]" /> },
              { title: 'Legado Familiar', desc: 'Melodías emotivas y profundas diseñadas especialmente para el día de la madre, padre o abuelos.', icon: <MessageCircleHeart className="w-7 h-7 text-[#8B1F32]" /> },
              { title: 'Cumpleaños Original', desc: 'Ritmos enérgicos, festivos y totalmente personalizados para coronar una celebración espectacular.', icon: <Music className="w-7 h-7 text-[#8B1F32]" /> },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white border border-neutral-100 rounded-3xl p-8 text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-neutral-200 flex flex-col justify-between">
                <div>
                  <div className="bg-[#F5EADC] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900 tracking-tight">{item.title}</h3>
                  <p className="text-neutral-600 text-lg mb-8 leading-relaxed">{item.desc}</p>
                </div>
                <button className="flex items-center justify-center gap-2.5 w-full py-4 bg-neutral-50 hover:bg-[#8B1F32] text-neutral-800 hover:text-white rounded-2xl border border-neutral-200/80 hover:border-[#8B1F32] transition-all duration-300 font-semibold text-sm">
                  <Play className="w-4 h-4 fill-current" /> Escuchar Muestra
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Como Funciona (Modernizado) */}
      <section className="bg-[#F5EADC] py-24 md:py-32 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-bold text-neutral-900 mb-6">
              Tu obra de arte musical en 3 actos
            </h2>
            <p className="text-lg text-neutral-700">
              Un proceso fluido e interactivo diseñado para que disfrutes co-creando.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {[
              { step: '1', title: 'Cuenta tu historia', desc: 'Responde un cuestionario intuitivo guiado. Compártenos los detalles íntimos, nombres y los hitos que definen tu mensaje.', icon: <MessageCircleHeart className="w-9 h-9" /> },
              { step: '2', title: 'Composición Premium', desc: 'Nuestros compositores redactan la lírica y músicos expertos graban los instrumentos reales y las voces en alta fidelidad.', icon: <Music className="w-9 h-9" /> },
              { step: '3', title: 'Recibe tu obra maestra', desc: 'Te enviamos los archivos finales en calidad de estudio profesional masterizados y listos para reproducir y emocionar eternamente.', icon: <Headphones className="w-9 h-9" /> }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4 relative group">
                <div className="w-20 h-20 bg-white shadow-xl shadow-neutral-900/5 rounded-full flex items-center justify-center text-[#8B1F32] mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                  <span className="absolute -top-1 -right-1 bg-[#8B1F32] text-white w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900 tracking-tight">{item.title}</h3>
                <p className="text-neutral-700 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Muro de Testimonios Premium */}
      <section className="bg-white py-24 md:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-bold text-neutral-900 mb-6">
              Reseñas que inspiran acordes
            </h2>
            <p className="text-lg text-neutral-600">
              Descubre las conmovedoras experiencias de quienes confiaron en nuestra sensibilidad artística.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { name: 'María Gómez', role: 'Aniversario de Bodas', text: 'Fue el regalo más conmovedor que he hecho. Lloramos juntos al oír los pasajes de nuestra juventud plasmados con tanta belleza en el piano. Absolutamente sublime.' },
              { name: 'Roberto Díaz', role: 'Homenaje a su Madre', text: 'La nitidez de la producción y la calidez vocal me dejaron sin palabras. Capturaron perfectamente el agradecimiento que quería expresar. Inmejorable.' },
              { name: 'Elena Torres', role: 'Canción de Cuna Personalizada', text: 'Un servicio veloz, sofisticado y de calidad excelsa. La canción para mi bebé se ha convertido en un himno familiar que durará para siempre.' }
            ].map((testimonio, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-md border border-neutral-100/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-neutral-200 flex flex-col justify-between">
                <div>
                  <div className="flex text-[#8B1F32] gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-lg italic mb-8 leading-relaxed">
                    "{testimonio.text}"
                  </p>
                </div>
                <div>
                  <div className="h-px bg-neutral-100 mb-4" />
                  <div className="font-bold text-neutral-950 tracking-tight text-lg">{testimonio.name}</div>
                  <div className="text-xs font-semibold text-[#8B1F32]/80 mt-0.5">{testimonio.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Elegante */}
      <section className="bg-[#F5EADC]/20 py-24 md:py-32 px-6 lg:px-8 border-t border-[#F5EADC]/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif tracking-tight font-bold text-neutral-900 mb-4">
              Resolviendo tus dudas
            </h2>
            <p className="text-lg text-neutral-600">
              Todo lo que necesitas saber sobre la creación de tu obra musical.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-neutral-200/70 overflow-hidden transition-all duration-300 hover:border-neutral-300">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-lg text-neutral-900 tracking-tight pr-4">{faq.question}</span>
                    <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#8B1F32]/10 text-[#8B1F32]' : 'bg-neutral-50 text-neutral-400'}`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 border-t border-neutral-100' : 'max-h-0'}`}>
                    <div className="p-6 text-neutral-600 text-lg leading-relaxed bg-neutral-50/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Footer y CTA Final de Alta Costura */}
      <section className="bg-[#8B1F32] py-24 md:py-32 px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Adornos sutiles de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight font-bold text-white mb-6 leading-tight">
            ¿Preparado para inmortalizar tus sentimientos?
          </h2>
          <p className="text-white/80 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Obtén un regalo eterno y único en el mundo que resonará de generación en generación.
          </p>
          
          <button className="bg-white text-[#8B1F32] hover:bg-neutral-50 text-xl font-bold py-5 px-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-98 mb-12">
            Comenzar mi proyecto musical
          </button>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-white/90 font-medium text-sm border-t border-white/10 pt-8 max-w-xl mx-auto">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-white/70" />
              <span>Calidad de máster de estudio</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-white/70" />
              <span>Garantía de satisfacción absoluta</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
