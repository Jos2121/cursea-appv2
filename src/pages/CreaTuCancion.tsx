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

  // Mantenemos intacta la lógica de simulación de compras reales mediante toasts
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
      answer: 'Recibirás la primera versión de tu canción en un plazo de 3 a 5 días hábiles. Nuestro estudio boutique diseña cada acorde a partir de las emociones de tu historia.'
    },
    {
      question: '¿Puedo pedir cambios si algo no me convence?',
      answer: '¡Por supuesto! Tu satisfacción absoluta es nuestra máxima premisa. Ofrecemos hasta 2 rondas de revisiones completas e incluidas para pulir cada frase musical.'
    },
    {
      question: '¿En qué formato recibiré la canción?',
      answer: 'Te entregaremos la producción final masterizada digitalmente tanto en WAV de alta resolución (calidad de estudio profesional) como en MP3 de alta fidelidad (320kbps).'
    }
  ];

  return (
    <div className="min-h-screen text-neutral-900 bg-[#FDFBF7] selection:bg-[#8B1F32]/10 selection:text-[#8B1F32] overflow-x-hidden antialiased">
      
      {/* 1. Hero Section Dividido y Asimétrico */}
      <section className="relative bg-gradient-to-b from-[#F5EADC] via-[#FDFBF7] to-[#FDFBF7] py-24 lg:py-32 px-6 lg:px-16 overflow-hidden">
        {/* Luces sutiles superiores */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-white/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Izquierdo: Textos Impactantes y CTA */}
          <div className="text-left relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white shadow-sm text-xs font-bold tracking-wider text-[#8B1F32] uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" /> Alta Costura Musical Personalizada
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif tracking-tighter text-neutral-900 font-bold leading-[1.05]">
              Convierte tu historia en una <span className="text-[#8B1F32]">canción inolvidable</span>
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-xl leading-relaxed">
              Regala emociones reales. Nosotros conceptualizamos, componemos y grabamos la banda sonora de tus mejores vivencias con instrumentistas de sesión.
            </p>
            
            <div className="pt-4">
              <button className="bg-[#8B1F32] hover:bg-[#741A29] text-white text-lg font-bold py-5 px-12 rounded-full shadow-lg shadow-[#8B1F32]/30 transition-all duration-300 transform hover:scale-105 active:scale-98">
                ¡Quiero mi canción ahora!
              </button>
            </div>
          </div>

          {/* Lado Derecho: Reproductor Inmersivo con Efecto Resplandor */}
          <div className="relative flex justify-center lg:justify-end items-center">
            {/* Divs absolutos para el efecto de resplandor brillante y moderno detrás */}
            <div className="absolute -top-12 -left-12 w-72 h-72 bg-[#8B1F32]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-64 h-64 bg-[#F5EADC] rounded-full blur-3xl pointer-events-none opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

            {/* Glassmorphism Mini-Player Card */}
            <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[2rem] p-8 transition-all duration-500 hover:shadow-neutral-900/10 hover:scale-[1.02]">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-[#8B1F32] text-white p-5 rounded-full flex-shrink-0 hover:bg-[#741A29] transition-all shadow-lg transform hover:scale-105 active:scale-95 animate-pulse"
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-0.5" fill="currentColor" />}
                </button>
                <div className="flex-grow text-left">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-neutral-950 text-base tracking-tight">"Nuestro Aniversario"</p>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1F32] bg-[#8B1F32]/10 px-2.5 py-0.5 rounded-full">Estudio Master</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Género: Pop Acústico & Arreglos de Cuerda</p>
                  
                  {/* Barra de progreso interactiva simulada */}
                  <div className="w-full bg-neutral-900/10 h-2 rounded-full mt-5 overflow-hidden">
                    <div className={`bg-[#8B1F32] h-full rounded-full transition-all duration-1000 ${isPlaying ? 'w-3/4' : 'w-1/3'}`}></div>
                  </div>
                  
                  <div className="flex justify-between text-xs font-semibold text-neutral-600 mt-2">
                    <span>{isPlaying ? '2:40' : '1:05'}</span>
                    <span>3:52</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Franja de Prueba Social Horizontal */}
      <section className="bg-white/80 backdrop-blur-md py-12 border-y border-neutral-200/40 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="flex text-[#8B1F32] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6" fill="currentColor" />
              ))}
            </div>
            <div>
              <span className="text-3xl font-serif font-black text-neutral-900">4.9<span className="text-sm font-sans font-normal text-neutral-400"> / 5.0</span></span>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Puntuación Certificada</p>
            </div>
          </div>
          <p className="text-xl font-medium text-neutral-800 max-w-3xl text-left leading-relaxed">
            Más de <span className="text-[#8B1F32] font-bold underline decoration-wavy underline-offset-4">10,000 legados emocionales</span> compuestos, grabados y cantados por profesionales con maestría internacional.
          </p>
        </div>
      </section>

      {/* 3. Galería de Ejemplos en Bento Grid Layout */}
      <section className="bg-gradient-to-b from-[#FDFBF7] to-white py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-left mb-16">
            <span className="text-xs font-bold tracking-widest text-[#8B1F32] uppercase bg-[#8B1F32]/10 px-3 py-1 rounded-full">Catálogo de Referencia</span>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tighter font-bold text-neutral-900 mt-4 mb-6">
              Escucha la nitidez de nuestro arte
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl">
              Selecciona tu género preferido y deléitate con las piezas compuestas para nuestros clientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Romántico Premium', desc: 'Arreglos sublimes de piano de cola, guitarras acústicas y voces cálidas perfectas para aniversarios entrañables.', icon: <Heart className="w-6 h-6 text-[#8B1F32]" />, label: 'El preferido de parejas' },
              { title: 'Legado Familiar', desc: 'Composiciones nostálgicas e instrumentaciones acústicas diseñadas para homenajear a padres, madres y abuelos.', icon: <MessageCircleHeart className="w-6 h-6 text-[#8B1F32]" />, label: 'Lleno de anécdotas' },
              { title: 'Celebración Pop', desc: 'Arreglos contemporáneos con ritmos dinámicos, alegres e inspiradores ideales para sorprender en cumpleaños.', icon: <Music className="w-6 h-6 text-[#8B1F32]" />, label: 'Divertido y enérgico' }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white border border-neutral-100/80 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-neutral-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <div className="bg-[#F5EADC] w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full uppercase tracking-wider">{item.label}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-neutral-900 tracking-tight">{item.title}</h3>
                  <p className="text-neutral-600 text-base leading-relaxed mb-8">{item.desc}</p>
                </div>
                <button className="flex items-center justify-center gap-2.5 w-full py-4 bg-neutral-50 hover:bg-[#8B1F32] text-neutral-800 hover:text-white rounded-2xl border border-neutral-200/60 hover:border-[#8B1F32] transition-all duration-300 font-bold text-sm">
                  <Play className="w-4 h-4 fill-current" /> Oír Muestra Oficial
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Sección Como Funciona: Revolución Horizontal Bento Box */}
      <section className="bg-gradient-to-b from-white via-[#F5EADC]/40 to-[#F5EADC] py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-left mb-16">
            <span className="text-xs font-bold tracking-widest text-[#8B1F32] uppercase bg-[#8B1F32]/10 px-3 py-1 rounded-full">Proceso Simplificado</span>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tighter font-bold text-neutral-900 mt-4 mb-6">
              Tu obra maestra en 3 actos sencillos
            </h2>
            <p className="text-lg text-neutral-700 max-w-xl">
              Abandonamos las complicaciones. Rediseñamos el flujo de creación musical para hacerlo intuitivo y fascinante.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Cuenta tu historia', desc: 'Responde nuestro formulario interactivo de anécdotas. Indícanos las vivencias, nombres clave y el mensaje principal que quieres transmitir.', icon: <MessageCircleHeart className="w-8 h-8" /> },
              { step: '2', title: 'Producción & Arreglos', desc: 'Nuestros compositores redactan la lírica ideal. Músicos profesionales graban voz e instrumentos reales directamente en el estudio.', icon: <Music className="w-8 h-8" /> },
              { step: '3', title: 'Recibe tu Master MP3', desc: 'En pocos días obtendrás los archivos finales en calidad de estudio profesional (WAV y MP3), listos para reproducir y atesorar para siempre.', icon: <Headphones className="w-8 h-8" /> }
            ].map((item, idx) => (
              <div key={idx} className="relative overflow-hidden bg-white/80 backdrop-blur-md p-10 rounded-[2rem] shadow-xl border border-white transition-all duration-500 hover:shadow-2xl hover:bg-white group">
                
                {/* Marca de agua gigante con el número del paso en el fondo */}
                <span className="absolute text-[11rem] font-serif font-black text-[#8B1F32] opacity-[0.04] select-none pointer-events-none -top-12 -right-4 group-hover:opacity-[0.08] transition-opacity duration-300">
                  {item.step}
                </span>
                
                <div className="w-16 h-16 bg-[#FDFBF7] text-[#8B1F32] rounded-2xl flex items-center justify-center shadow-inner mb-6 relative z-10 transition-transform duration-300 group-hover:scale-105">
                  {item.icon}
                </div>
                
                <div className="relative z-10 text-left">
                  <h3 className="text-2xl font-bold mb-3 text-neutral-950 tracking-tight">{item.title}</h3>
                  <p className="text-neutral-600 text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Muro de Testimonios Estilo Masonry Asimétrico */}
      <section className="bg-gradient-to-b from-[#F5EADC] to-[#FDFBF7] py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-left mb-16">
            <span className="text-xs font-bold tracking-widest text-[#8B1F32] uppercase bg-[#8B1F32]/10 px-3 py-1 rounded-full">Experiencias Reales</span>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tighter font-bold text-neutral-900 mt-4 mb-6">
              Resonando en los corazones de nuestros clientes
            </h2>
            <p className="text-lg text-neutral-600 max-w-xl">
              Conoce los relatos de quienes convirtieron palabras cotidianas en canciones imperecederas.
            </p>
          </div>
          
          {/* Layout de columnas asimétricas tipo Masonry real */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { name: 'María Gómez', role: 'Aniversario de Bodas', text: 'Fue el obsequio más conmovedor que he entregado. Lloramos juntos al oír los pasajes de nuestro noviazgo plasmados en acordes de piano de cola. Absolutamente magistral.' },
              { name: 'Roberto Díaz', role: 'Homenaje a su Madre', text: 'La nitidez técnica y la calidez del intérprete vocal me dejaron atónito. Lograron capturar con fidelidad quirúrgica el agradecimiento que deseaba plasmar. Trato de diez.' },
              { name: 'Elena Torres', role: 'Canción de Cuna Personalizada', text: 'Un servicio veloz, sofisticado y de calidad excepcional. El arreglo para mi primer hijo se ha vuelto un auténtico himno familiar nocturno.' },
              { name: 'Juan Pablo R.', role: 'Sorpresa en Recepción', text: 'Sorprendí a mi esposa a mitad del banquete reproduciendo la melodía secreta que encargué aquí. La atmósfera se volvió completamente mágica e inolvidable.' },
              { name: 'Clara M.', role: '80 Años de la Abuela', text: 'Compilamos vivencias de sus 6 hijos y 14 nietos. Lograron armar una letra poética impecable sobre arreglos folclóricos que perdurarán por siempre.' }
            ].map((testimonio, idx) => (
              <div key={idx} className="break-inside-avoid bg-white p-8 rounded-3xl shadow-lg border border-neutral-100 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:border-neutral-200">
                <div>
                  <div className="flex text-[#8B1F32] gap-0.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-base italic mb-6 leading-relaxed text-left">
                    "{testimonio.text}"
                  </p>
                </div>
                <div>
                  <div className="h-px bg-neutral-100 mb-4" />
                  <div className="text-left">
                    <div className="font-bold text-neutral-900 tracking-tight text-base">{testimonio.name}</div>
                    <div className="text-xs text-[#8B1F32] font-semibold mt-0.5">{testimonio.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FAQ Acordeón Inteligente */}
      <section className="bg-white py-24 lg:py-32 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-left mb-16">
            <span className="text-xs font-bold tracking-widest text-[#8B1F32] uppercase bg-[#8B1F32]/10 px-3 py-1 rounded-full">Preguntas Frecuentes</span>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tighter font-bold text-neutral-900 mt-4 mb-6">
              Despejando tus dudas
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-[#FDFBF7] rounded-2xl border border-neutral-200/60 overflow-hidden transition-all duration-300 hover:border-neutral-300">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-lg text-neutral-900 tracking-tight pr-4">{faq.question}</span>
                    <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-[#8B1F32]/10 text-[#8B1F32]' : 'bg-neutral-200/60 text-neutral-500'}`}>
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-60 border-t border-neutral-200/40' : 'max-h-0'}`}>
                    <div className="p-6 text-neutral-600 text-base leading-relaxed bg-white text-left">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Footer y CTA Final Confección Premium */}
      <section className="bg-[#8B1F32] py-24 lg:py-32 px-6 lg:px-16 text-center relative overflow-hidden rounded-t-[3rem]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter font-bold text-white mb-6 leading-tight">
            ¿Preparado para obsequiar una obra imperecedera?
          </h2>
          <p className="text-white/80 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Consigue hoy una pieza artística original concebida directamente a partir de tus mejores recuerdos familiares.
          </p>
          
          <button className="bg-white text-[#8B1F32] hover:bg-neutral-50 text-xl font-bold py-5 px-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-98 mb-12">
            Comenzar mi obra de arte musical
          </button>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-white/90 font-medium text-sm border-t border-white/10 pt-8 max-w-xl mx-auto">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-white/60" />
              <span>Formatos WAV & MP3 de Estudio</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-white/60" />
              <span>Garantía de Satisfacción Absoluta</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
