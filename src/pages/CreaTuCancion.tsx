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

  // Section 2: Social Proof Toast Effect
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
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const faqs = [
    {
      question: '¿Cuánto tiempo tarda en estar lista mi canción?',
      answer: 'Recibirás la primera versión de tu canción en un plazo de 3 a 5 días hábiles. Nuestro equipo de productores trabaja rápidamente sin comprometer la calidad.'
    },
    {
      question: '¿Puedo pedir cambios si algo no me convence?',
      answer: '¡Por supuesto! Tu satisfacción es nuestra prioridad. Incluimos hasta 2 rondas de revisiones gratuitas para asegurar que la canción sea exactamente como la imaginas.'
    },
    {
      question: '¿En qué formato recibiré la canción?',
      answer: 'Te entregaremos la canción en formato MP3 de alta calidad (320kbps) y en formato WAV (calidad de estudio), perfectos para reproducir en cualquier dispositivo o evento.'
    }
  ];

  return (
    <div className="min-h-screen text-neutral-900 font-sans selection:bg-[#8B1F32]/20 selection:text-[#8B1F32]">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EADC] via-[#F5EADC]/70 to-white pt-24 pb-20 md:pt-32 md:pb-28 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B1F32]/10 text-[#8B1F32] font-semibold text-sm mb-6 border border-[#8B1F32]/15">
            <Sparkles className="w-4 h-4" />
            <span>Música profesional personalizada para momentos únicos</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-[#8B1F32] font-bold mb-6 tracking-tight leading-[1.15]">
            Convierte tu historia en una canción inolvidable
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-neutral-700 max-w-2xl mx-auto font-normal leading-relaxed">
            Regala emociones. Nosotros componemos, tocamos y cantamos la banda sonora de tus mejores momentos.
          </p>

          <div>
            <button className="bg-[#8B1F32] hover:bg-[#721828] text-white text-xl font-bold py-4 px-10 md:px-12 rounded-full shadow-lg shadow-[#8B1F32]/30 transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center gap-3">
              <span>¡Quiero mi canción ahora!</span>
            </button>
          </div>

          {/* Mini-reproductor de audio simulado */}
          <div className="mt-14 bg-white/90 backdrop-blur-md max-w-md mx-auto p-5 rounded-3xl shadow-xl shadow-neutral-900/5 border border-neutral-100 flex items-center gap-4 transition-all duration-300 hover:shadow-2xl">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="bg-[#8B1F32] hover:bg-[#721828] text-white p-4 rounded-full flex-shrink-0 shadow-md shadow-[#8B1F32]/25 transition-transform transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 translate-x-0.5" fill="currentColor" />}
            </button>
            <div className="flex-grow text-left">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-neutral-900 text-sm">Ejemplo de Canción - "Nuestro Aniversario"</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1F32] bg-[#8B1F32]/10 px-2 py-0.5 rounded-full">
                  Demo
                </span>
              </div>
              <div className="w-full bg-neutral-100 h-2 rounded-full mt-2.5 overflow-hidden">
                <div className="bg-[#8B1F32] h-full w-1/3 rounded-full transition-all duration-500"></div>
              </div>
              <div className="flex justify-between text-xs text-neutral-400 mt-1 font-mono">
                <span>1:12</span>
                <span>3:45</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Prueba Social */}
      <section className="bg-white/80 backdrop-blur-md py-8 border-y border-neutral-200/60 relative z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-center md:text-left">
          <div className="flex items-center gap-2.5 bg-[#8B1F32]/5 px-4 py-2 rounded-2xl border border-[#8B1F32]/10">
            <div className="flex text-[#8B1F32]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" fill="currentColor" />
              ))}
            </div>
            <span className="text-2xl font-bold text-neutral-900 font-serif">4.9/5</span>
          </div>
          <p className="text-base md:text-lg font-medium text-neutral-700">
            Más de <span className="font-bold text-[#8B1F32] underline decoration-[#8B1F32]/30 underline-offset-4">10,000 historias</span> transformadas en canciones. ¡Clientes 100% satisfechos!
          </p>
        </div>
      </section>

      {/* 3. Galeria de Ejemplos */}
      <section className="bg-white py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-[#8B1F32] font-bold mb-4 tracking-tight">
              Escucha lo que podemos crear para ti
            </h2>
            <p className="text-neutral-600 text-lg">
              Cada canción se compone desde cero adaptando los instrumentos y la voz al sentimiento que deseas expresar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Romántico', desc: 'Para aniversarios y pedidas de mano', icon: <Heart className="w-7 h-7 text-[#8B1F32]" /> },
              { title: 'Familia', desc: 'Día de la madre, padre o abuelos', icon: <MessageCircleHeart className="w-7 h-7 text-[#8B1F32]" /> },
              { title: 'Cumpleaños', desc: 'Un regalo original y divertido', icon: <Music className="w-7 h-7 text-[#8B1F32]" /> },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-neutral-100 rounded-3xl p-8 text-center shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="bg-[#8B1F32]/10 p-4 rounded-2xl w-16 h-16 mx-auto flex items-center justify-center mb-6 group-hover:bg-[#8B1F32]/15 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-neutral-900 tracking-tight font-serif">{item.title}</h3>
                  <p className="text-neutral-600 mb-8 leading-relaxed">{item.desc}</p>
                </div>
                <button className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 bg-neutral-50 border border-neutral-200 text-[#8B1F32] font-semibold rounded-full group-hover:bg-[#8B1F32] group-hover:text-white group-hover:border-[#8B1F32] transition-all duration-300 shadow-sm">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Escuchar Demo</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Como Funciona */}
      <section className="bg-[#F5EADC]/70 py-24 px-6 lg:px-8 border-y border-[#F5EADC]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8B1F32] tracking-tight mb-4">
              Tu canción en 3 sencillos pasos
            </h2>
            <p className="text-neutral-700 text-lg">
              Un proceso guiado, rápido y sin complicaciones técnicas para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                num: '1',
                title: 'Cuenta tu historia',
                desc: 'Responde un breve formulario contándonos los detalles, anécdotas y el mensaje que quieres transmitir.',
                icon: <MessageCircleHeart className="w-8 h-8 text-[#8B1F32]" />
              },
              {
                num: '2',
                title: 'Producción',
                desc: 'Nuestros músicos profesionales componen la letra, graban los instrumentos y las voces con calidad de estudio.',
                icon: <Music className="w-8 h-8 text-[#8B1F32]" />
              },
              {
                num: '3',
                title: 'Recibe tu MP3',
                desc: 'En pocos días recibirás la canción final lista para dedicar, emocionar y guardar para siempre.',
                icon: <Headphones className="w-8 h-8 text-[#8B1F32]" />
              }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white/90 backdrop-blur-sm border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center relative"
              >
                <div className="bg-[#8B1F32]/10 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-sm border border-[#8B1F32]/10">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight font-serif text-neutral-900">
                  {step.num}. {step.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed text-base">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Muro de Testimonios */}
      <section className="bg-white py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8B1F32] tracking-tight mb-4">
              Historias que ya hemos cantado
            </h2>
            <p className="text-neutral-600 text-lg">
              Reacciones reales de personas que vivieron momentos inolvidables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'María Gómez', text: 'Fue el mejor regalo de aniversario que pude hacerle a mi esposo. Lloramos los dos al escuchar nuestra historia cantada. ¡Gracias!' },
              { name: 'Roberto Díaz', text: 'La calidad del sonido y la voz del cantante son increíbles. Captaron exactamente la esencia de mi mensaje para mi mamá.' },
              { name: 'Elena Torres', text: 'Súper rápidos y profesionales. La canción de cuna para mi bebé recién nacido es hermosa, un tesoro para toda la vida.' }
            ].map((testimonio, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 md:p-9 rounded-3xl shadow-sm border border-neutral-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-[#8B1F32] gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-neutral-700 italic mb-8 leading-relaxed text-base md:text-lg">
                    "{testimonio.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B1F32]/10 text-[#8B1F32] font-bold flex items-center justify-center font-serif">
                    {testimonio.name.charAt(0)}
                  </div>
                  <div className="font-bold text-neutral-900 tracking-tight">
                    {testimonio.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-neutral-50/60 py-24 px-6 lg:px-8 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8B1F32] tracking-tight mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-neutral-600 text-lg">
              Resolvemos tus dudas antes de comenzar tu pedido.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 hover:border-[#8B1F32]/30 transition-all duration-200 overflow-hidden"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-neutral-900 tracking-tight pr-4">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 text-[#8B1F32]">
                    {activeFaq === idx ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100/80 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer y CTA Final */}
      <section className="bg-gradient-to-br from-[#8B1F32] via-[#8B1F32] to-[#671423] py-24 px-6 lg:px-8 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight">
            ¿Listo para emocionar con una canción?
          </h2>
          <p className="text-white/85 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Únete a las miles de personas que ya han regalado un momento inolvidable.
          </p>
          
          <button className="bg-white text-[#8B1F32] hover:bg-neutral-100 text-xl font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 mb-10">
            Crear mi canción ahora
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90 font-medium">
            <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <CheckCircle className="w-5 h-5 text-white" />
              <span>Calidad de estudio</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-5 h-5 text-white" />
              <span>Garantía de satisfacción</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
