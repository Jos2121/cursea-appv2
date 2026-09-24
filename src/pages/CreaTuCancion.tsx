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
  Heart
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
    <div className="min-h-screen text-neutral-900 font-sans">
      
      {/* 1. Hero Section */}
      <section className="bg-[#F5EADC] pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#8B1F32] font-bold mb-6">
            Convierte tu historia en una canción inolvidable
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-neutral-800">
            Regala emociones. Nosotros componemos, tocamos y cantamos la banda sonora de tus mejores momentos.
          </p>
          <button className="bg-[#8B1F32] hover:bg-[#701828] text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105">
            ¡Quiero mi canción ahora!
          </button>

          {/* Mini-reproductor de audio simulado */}
          <div className="mt-12 bg-white max-w-md mx-auto p-4 rounded-2xl shadow-xl border border-neutral-200 flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-[#8B1F32] text-white p-4 rounded-full flex-shrink-0 hover:bg-[#701828] transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6" fill="currentColor" />}
            </button>
            <div className="flex-grow text-left">
              <p className="font-bold text-neutral-900 text-sm">Ejemplo de Canción - "Nuestro Aniversario"</p>
              <div className="w-full bg-neutral-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#8B1F32] h-full w-1/3 rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>1:12</span>
                <span>3:45</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Prueba Social */}
      <section className="bg-white/60 backdrop-blur-sm py-8 border-y border-[#F5EADC]/50 relative z-10" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="flex text-[#8B1F32]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6" fill="currentColor" />
              ))}
            </div>
            <span className="text-2xl font-bold text-neutral-900">4.9/5</span>
          </div>
          <p className="text-lg font-medium text-neutral-800">
            Más de <span className="font-bold text-[#8B1F32]">10,000 historias</span> transformadas en canciones. ¡Clientes 100% satisfechos!
          </p>
        </div>
      </section>

      {/* 3. Galeria de Ejemplos */}
      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-center font-bold mb-12 text-[#8B1F32]">
            Escucha lo que podemos crear para ti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Romántico', desc: 'Para aniversarios y pedidas de mano', icon: <Heart className="w-8 h-8 text-[#8B1F32]" /> },
              { title: 'Familia', desc: 'Día de la madre, padre o abuelos', icon: <MessageCircleHeart className="w-8 h-8 text-[#8B1F32]" /> },
              { title: 'Cumpleaños', desc: 'Un regalo original y divertido', icon: <Music className="w-8 h-8 text-[#8B1F32]" /> },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F5EADC]/20 border border-[#F5EADC] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900">{item.title}</h3>
                <p className="text-neutral-600 mb-6">{item.desc}</p>
                <button className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-[#8B1F32] text-[#8B1F32] rounded-full hover:bg-[#F5EADC] transition-colors font-medium">
                  <Play className="w-4 h-4" /> Escuchar Demo
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Como Funciona */}
      <section className="bg-[#F5EADC] py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-16 text-[#8B1F32]">
            Tu canción en 3 sencillos pasos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="flex flex-col items-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-6 relative z-10 text-[#8B1F32]">
                <MessageCircleHeart className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Cuenta tu historia</h3>
              <p className="text-neutral-800">
                Responde un breve formulario contándonos los detalles, anécdotas y el mensaje que quieres transmitir.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-6 relative z-10 text-[#8B1F32]">
                <Music className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Producción</h3>
              <p className="text-neutral-800">
                Nuestros músicos profesionales componen la letra, graban los instrumentos y las voces con calidad de estudio.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-6 relative z-10 text-[#8B1F32]">
                <Headphones className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Recibe tu MP3</h3>
              <p className="text-neutral-800">
                En pocos días recibirás la canción final lista para dedicar, emocionar y guardar para siempre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Muro de Testimonios */}
      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-center font-bold mb-12 text-[#8B1F32]">
            Historias que ya hemos cantado
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'María Gómez', text: 'Fue el mejor regalo de aniversario que pude hacerle a mi esposo. Lloramos los dos al escuchar nuestra historia cantada. ¡Gracias!' },
              { name: 'Roberto Díaz', text: 'La calidad del sonido y la voz del cantante son increíbles. Captaron exactamente la esencia de mi mensaje para mi mamá.' },
              { name: 'Elena Torres', text: 'Súper rápidos y profesionales. La canción de cuna para mi bebé recién nacido es hermosa, un tesoro para toda la vida.' }
            ].map((testimonio, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
                <div className="flex text-[#8B1F32] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5" fill="currentColor" />
                  ))}
                </div>
                <p className="text-neutral-700 italic mb-6">"{testimonio.text}"</p>
                <div className="font-bold text-neutral-900">- {testimonio.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-[#F5EADC]/30 py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-serif text-center font-bold mb-12 text-[#8B1F32]">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-neutral-900">{faq.question}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-6 h-6 text-[#8B1F32]" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#8B1F32]" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-neutral-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer y CTA Final */}
      <section className="bg-[#8B1F32] py-20 px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            ¿Listo para emocionar con una canción?
          </h2>
          <p className="text-white/80 text-xl mb-10">
            Únete a las miles de personas que ya han regalado un momento inolvidable.
          </p>
          <button className="bg-white text-[#8B1F32] text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:bg-neutral-100 transition-transform transform hover:scale-105 mb-8">
            Crear mi canción ahora
          </button>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Calidad de estudio</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Garantía de satisfacción</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
