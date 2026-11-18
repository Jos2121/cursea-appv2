import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatformSettings } from '@/context/PlatformSettingsContext';
import {
  Play,
  Pause,
  Star,
  Music,
  MessageCircleHeart,
  Headphones,
  ChevronDown,
  CheckCircle,
  ShieldCheck,
  Heart,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  Clock,
  Volume2,
  Disc3,
  Quote,
  RefreshCw,
  Check,
  Zap,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

export default function CreaTuCancion() {
  const { appTitle, appLogo } = usePlatformSettings();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGoToForm = (selectedPlan?: 'estandar' | 'especial') => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(selectedPlan ? `/crea-tu-cancion?plan=${selectedPlan}` : '/crea-tu-cancion');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const togglePlay = (url: string) => {
    if (!audioRef.current) return;

    if (playingTrack === url) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        setPlayingTrack(null);
      }
    } else {
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingTrack(url);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, url: string) => {
    if (!audioRef.current || playingTrack !== url || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newTime = (clickX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || 0;
      setProgress((current / total) * 100 || 0);
      setCurrentTime(formatTime(current));
      setDuration(formatTime(total));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleAudioEnded = () => {
    setPlayingTrack(null);
    setProgress(0);
    setCurrentTime('0:00');
  };

  // Prueba social en tiempo real
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

  const demoTracks = [
    {
      title: 'Romántico',
      planType: 'estandar' as const,
      tag: 'Aniversarios y Pedidas',
      inspiredBy: null,
      desc: 'Melodías íntimas y letras profundas diseñadas para emocionar desde el primer acorde.',
      icon: Heart,
      url: '/audio/romantico.mp3',
      accent: 'from-rose-500/15 to-[#8B1F32]/10'
    },
    {
      title: 'Cumbia Romántica',
      planType: 'inspirada' as const,
      tag: 'Estilo Cumbia',
      inspiredBy: 'Corazón Serrano - Te Vas Y No Volverás',
      desc: 'Letra personalizada adaptada con el sentimiento, ritmo y esencia de este clásico de la cumbia.',
      icon: Disc3,
      url: '/audio/corazonserrano.mp3',
      accent: 'from-[#8B1F32]/20 to-rose-500/10'
    },
    {
      title: 'Familia',
      planType: 'estandar' as const,
      tag: 'Madre, Padre o Abuelos',
      inspiredBy: null,
      desc: 'Homenajes cálidos llenos de gratitud, recuerdos compartidos y abrazos hechos música.',
      icon: MessageCircleHeart,
      url: '/audio/familia.mp3',
      accent: 'from-amber-500/15 to-[#8B1F32]/10'
    },
    {
      title: 'Huayno Sentimental',
      planType: 'inspirada' as const,
      tag: 'Estilo Andino',
      inspiredBy: 'Chinito del ande - Por ti',
      desc: 'Historia hecha canción con arreglos andinos fieles a la vibra y emoción de tu tema favorito.',
      icon: Sparkles,
      url: '/audio/chinoande.mp3',
      accent: 'from-[#8B1F32]/20 to-amber-500/10'
    },
    {
      title: 'Cumpleaños',
      planType: 'estandar' as const,
      tag: 'Original y Divertido',
      inspiredBy: null,
      desc: 'Ritmos alegres y anécdotas personalizadas para sorprender en su día especial.',
      icon: Music,
      url: '/audio/cumpleanos.mp3',
      accent: 'from-orange-400/15 to-[#8B1F32]/10'
    },
    {
      title: 'Salsa & Despecho',
      planType: 'inspirada' as const,
      tag: 'Estilo Tropical',
      inspiredBy: 'Galy Galiano - Me Bebí Tu Recuerdo',
      desc: 'Tu historia interpretada con la fuerza, cadencia y atmósfera inconfundible de esta canción original.',
      icon: Headphones,
      url: '/audio/galygaliano.mp3',
      accent: 'from-[#8B1F32]/20 to-orange-400/10'
    }
  ];

  const testimonials = [
    {
      name: 'María Gómez',
      initials: 'MG',
      occasion: 'Aniversario de Bodas',
      text: 'Fue el mejor regalo de aniversario que pude hacerle a mi esposo. Lloramos los dos al escuchar nuestra historia cantada. ¡Gracias!'
    },
    {
      name: 'Roberto Díaz',
      initials: 'RD',
      occasion: 'Regalo para Mamá',
      text: 'La calidad del sonido y la voz del cantante son increíbles. Captaron exactamente la esencia de mi mensaje para mi mamá.'
    },
    {
      name: 'Elena Torres',
      initials: 'ET',
      occasion: 'Recién Nacido',
      text: 'Súper rápidos y profesionales. La canción de cuna para mi bebé recién nacido es hermosa, un tesoro para toda la vida.'
    }
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo tarda en estar lista mi canción?',
      answer: 'En el plan Estándar recibirás tu canción en un plazo máximo de 30 minutos una vez verificado el pago. Si eliges la opción Inspirada en una Canción Original, el tiempo de producción es de 2 a 3 horas debido al trabajo musical a medida.'
    },
    {
      question: '¿Puedo pedir cambios si algo no me convence?',
      answer: '¡Por supuesto! Tu satisfacción es nuestra prioridad. Incluimos hasta 2 rondas de revisiones gratuitas para asegurar que la canción sea exactamente como la imaginas.'
    },
    {
      question: '¿En qué formato recibiré la canción?',
      answer: 'Te entregaremos la canción en formato WAV con máxima calidad de audio de estudio, junto con una portada en video personalizado lista para compartir y proyectar en tus momentos especiales.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5EADC] text-neutral-900 font-sans selection:bg-[#8B1F32]/20">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#F5EADC]/80 backdrop-blur-md border-b border-[#8B1F32]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#8B1F32]/15 flex items-center justify-center shadow-sm p-1">
              <img src={appLogo || "/logo.svg"} alt={appTitle} className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <span className="font-serif font-bold text-lg text-neutral-900 tracking-tight block">
                {appTitle}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B1F32] block">
                Estudio Musical
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700">
            <button onClick={() => scrollToSection('ejemplos')} className="hover:text-[#8B1F32] transition-colors">
              Ejemplos
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className="hover:text-[#8B1F32] transition-colors">
              Cómo funciona
            </button>
            <button onClick={() => scrollToSection('precio')} className="hover:text-[#8B1F32] transition-colors">
              Precio
            </button>
            <button onClick={() => scrollToSection('testimonios')} className="hover:text-[#8B1F32] transition-colors">
              Testimonios
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#8B1F32] transition-colors">
              Preguntas
            </button>
          </nav>

          <button
            onClick={() => handleGoToForm()}
            className="inline-flex items-center gap-2 bg-[#8B1F32] hover:bg-[#701828] text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-full shadow-md shadow-[#8B1F32]/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <span>Crear mi canción</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 1. Hero Section (Split Modern Layout) */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Ambient Decorative Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#8B1F32]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Copy, CTAs & Audio Demo Player */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#8B1F32]/15 text-[#8B1F32] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Entrega en máx. 30 min • Audio WAV + Video 9:16</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 tracking-tight leading-[1.08]">
              Convierte tu historia en una{' '}
              <span className="text-[#8B1F32] relative inline-block">
                canción inolvidable
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#8B1F32]/25"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9.5C75 3.5 225 3.5 298 9.5"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Regala emociones reales. Nuestro equipo compone, produce y graba la banda sonora personalizada para tus momentos más especiales, lista para dedicar y proyectar.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                onClick={() => handleGoToForm()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#8B1F32] hover:bg-[#701828] text-white text-base sm:text-lg font-bold py-4 px-8 rounded-full shadow-xl shadow-[#8B1F32]/25 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>¡Quiero mi canción ahora!</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollToSection('ejemplos')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-neutral-800 border border-[#8B1F32]/20 text-base font-semibold py-4 px-7 rounded-full shadow-sm transition-all"
              >
                <Volume2 className="w-4 h-4 text-[#8B1F32]" />
                <span>Escuchar ejemplos</span>
              </button>
            </div>
          </div>

          {/* Right Column: 9:16 Video Cover Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[290px] sm:max-w-[310px]">
              {/* Glow behind phone */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#8B1F32]/25 via-rose-400/15 to-amber-300/20 rounded-[48px] blur-2xl" />

              {/* Floating Top-Left Badge */}
              <div className="hidden sm:flex absolute -left-10 top-10 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-neutral-100 items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Entrega rápida</p>
                  <p className="text-xs font-bold text-neutral-900">Máx. 30 min</p>
                </div>
              </div>

              {/* Floating Bottom-Right Badge */}
              <div className="hidden sm:flex absolute -right-10 bottom-14 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-neutral-100 items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#8B1F32]/10 text-[#8B1F32] flex items-center justify-center">
                  <Headphones className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Incluye</p>
                  <p className="text-xs font-bold text-neutral-900">WAV + Video 9:16</p>
                </div>
              </div>

              {/* Phone Bezel */}
              <div className="relative aspect-[9/16] bg-neutral-950 rounded-[36px] overflow-hidden shadow-2xl border-[6px] border-white ring-1 ring-black/10 group">
                {!imageError ? (
                  <img
                    src="/images/hero-cover.png"
                    alt="Portada de Video Personalizada"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/80 bg-neutral-900">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-3 text-white">
                      <ImageIcon className="w-7 h-7" />
                    </div>
                    <p className="font-serif font-bold text-lg text-white mb-1">Portada Video (9:16)</p>
                    <p className="text-xs text-neutral-400 font-mono mt-1">public/images/hero-cover.png</p>
                    <p className="text-[11px] text-neutral-500 mt-3 leading-relaxed">
                      Sube tu imagen en la carpeta public para que aparezca aquí automáticamente.
                    </p>
                  </div>
                )}

                {/* Subtle bottom gradient label */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex items-center justify-between">
                  <div className="text-left text-white">
                    <p className="text-[10px] uppercase tracking-widest text-white/70 font-semibold">Vista previa</p>
                    <p className="text-xs font-bold">Portada en Video (9:16)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Prueba Social & Garantías */}
      <section className="bg-white/80 backdrop-blur-md border-y border-[#8B1F32]/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="flex text-[#8B1F32]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" fill="currentColor" />
              ))}
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-900 block leading-none">4.9 / 5</span>
              <span className="text-xs text-neutral-500">Valoración promedio</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5EADC] text-[#8B1F32] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-900 block leading-none">+1,000 historias</span>
              <span className="text-xs text-neutral-500">Transformadas en canciones</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5EADC] text-[#8B1F32] flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-900 block leading-none">Calidad WAV</span>
              <span className="text-xs text-neutral-500">+ Portada en video 9:16</span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5EADC] text-[#8B1F32] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-neutral-900 block leading-none">2 Revisiones</span>
              <span className="text-xs text-neutral-500">Gratuitas incluidas</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Galería de Ejemplos */}
      <section id="ejemplos" className="scroll-mt-16 bg-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8B1F32] block">
              Muestras reales de estudio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900">
              Escucha lo que podemos{' '}
              <span className="text-[#8B1F32]">crear para ti</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Compara nuestras producciones <strong>Estándar</strong> e <strong>Inspiradas en Canción Original</strong> y dale play para sentir su calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {demoTracks.map((item) => {
              const Icon = item.icon;
              const isPlaying = playingTrack === item.url;
              const isInspired = item.planType === 'inspirada';

              return (
                <div
                  key={item.url}
                  className={`relative rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isPlaying
                      ? 'bg-[#F5EADC]/45 border-[#8B1F32] shadow-xl shadow-[#8B1F32]/10 -translate-y-1'
                      : isInspired
                      ? 'bg-white border-[#8B1F32]/25 shadow-sm hover:border-[#8B1F32]/50 hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-[#F5EADC]/20 border-[#8B1F32]/10 hover:border-[#8B1F32]/35 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${item.accent} pointer-events-none`} />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-2 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-[#8B1F32]/10 flex items-center justify-center text-[#8B1F32] shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                            isInspired
                              ? 'bg-[#8B1F32] text-white shadow-sm'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {isInspired ? (
                            <>
                              <Sparkles className="w-3 h-3" />
                              Inspirada en Original
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3" />
                              Estándar
                            </>
                          )}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-neutral-600 border border-neutral-200">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
                      {item.title}
                    </h3>

                    {item.inspiredBy && (
                      <div className="mb-3 px-3 py-2 rounded-xl bg-[#F5EADC]/60 border border-[#8B1F32]/15 text-xs text-neutral-800">
                        <span className="font-bold text-[#8B1F32] block text-[10px] uppercase tracking-wider mb-0.5">
                          Inspirada en:
                        </span>
                        <span className="font-semibold">{item.inspiredBy}</span>
                      </div>
                    )}

                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="relative space-y-3 pt-2">
                    {/* Track progress bar when active */}
                    <div
                      onClick={(e) => handleSeek(e, item.url)}
                      className={`w-full h-1.5 bg-neutral-200/80 rounded-full overflow-hidden ${
                        isPlaying ? 'cursor-pointer' : ''
                      }`}
                    >
                      <div
                        className="h-full bg-[#8B1F32] rounded-full transition-all duration-100"
                        style={{ width: isPlaying ? `${progress}%` : '0%' }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>{isPlaying ? currentTime : '0:00'}</span>
                      <span>{isPlaying ? duration : 'Audio WAV'}</span>
                    </div>

                    <button
                      onClick={() => togglePlay(item.url)}
                      className={`flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
                        isPlaying
                          ? 'bg-[#8B1F32] text-white shadow-lg shadow-[#8B1F32]/25'
                          : 'bg-white border border-[#8B1F32]/25 text-[#8B1F32] hover:bg-[#8B1F32] hover:text-white'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" fill="currentColor" /> : <Play className="w-4 h-4" fill="currentColor" />}
                      <span>{isPlaying ? 'Pausar Demo' : 'Escuchar Demo'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Cómo Funciona */}
      <section id="como-funciona" className="scroll-mt-16 bg-[#F5EADC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8B1F32] block">
              Proceso simple y guiado
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900">
              Tu canción en <span className="text-[#8B1F32]">3 sencillos pasos</span>
            </h2>
            <p className="text-neutral-700 text-base sm:text-lg">
              Sin conocimientos musicales. Tú pones los recuerdos y nosotros los convertimos en música.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line on desktop */}
            <div className="hidden md:block absolute top-14 left-[18%] right-[18%] h-[2px] border-t-2 border-dashed border-[#8B1F32]/20 pointer-events-none" />

            {[
              {
                step: '01',
                title: 'Cuenta tu historia',
                desc: 'Responde un breve formulario contándonos los detalles, anécdotas, nombres y el mensaje que quieres transmitir.',
                icon: MessageCircleHeart
              },
              {
                step: '02',
                title: 'Producción profesional',
                desc: 'Nuestro equipo da vida a tu historia produciendo la letra, melodías y voces con los más altos estándares sonoros.',
                icon: Music
              },
              {
                step: '03',
                title: 'Recibe tu WAV + Video',
                desc: 'Recibe tu audio en formato WAV de alta fidelidad más tu portada en video personalizado en un máximo de 30 minutos una vez verificado el pago.',
                icon: Headphones
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-[#8B1F32]/10 shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <div className="bg-[#8B1F32] text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#8B1F32]/25">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="absolute -top-2 -right-3 bg-[#F5EADC] text-[#8B1F32] border border-[#8B1F32]/20 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => handleGoToForm()}
              className="inline-flex items-center gap-2.5 bg-[#8B1F32] hover:bg-[#701828] text-white text-lg font-bold py-4 px-10 rounded-full shadow-xl shadow-[#8B1F32]/25 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              <span>Comenzar a crear mi canción</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Sección de Precios */}
      <section id="precio" className="scroll-mt-16 bg-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8B1F32] block">
              Planes y Precios
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900">
              Elige cómo quieres <span className="text-[#8B1F32]">crear tu canción</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg">
              Pago único por canción completa con audio WAV de estudio y video personalizado. Selecciona tu moneda preferida:
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex justify-center mb-12">
            <div
              role="group"
              aria-label="Selector de moneda"
              className="inline-flex items-center p-1.5 rounded-full bg-[#F5EADC]/70 border border-[#8B1F32]/15 shadow-sm"
            >
              <button
                type="button"
                onClick={() => setCurrency('PEN')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  currency === 'PEN'
                    ? 'bg-[#8B1F32] text-white shadow-md shadow-[#8B1F32]/20'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                Soles (S/ PEN)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-[#8B1F32] text-white shadow-md shadow-[#8B1F32]/20'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                Dólares ($ USD)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Plan 1: Estándar */}
            <div className="relative bg-[#F5EADC]/25 rounded-3xl p-8 sm:p-9 border border-[#8B1F32]/15 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#8B1F32] border border-[#8B1F32]/15 text-[11px] font-bold uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5" />
                    Entrega Express
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    Listo en 30 min
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
                  Canción Personalizada Estándar
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Ideal si quieres sorprender hoy mismo con una canción original creada desde cero con tu historia, estilo y voz elegida.
                </p>

                <div className="pb-6 mb-6 border-b border-[#8B1F32]/10 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-neutral-900">
                    {currency === 'PEN' ? 'S/ 19' : '$7'}
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">
                    {currency === 'PEN' ? 'soles • pago único' : 'dólares USD • pago único'}
                  </span>
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#8B1F32] mb-4">
                  Beneficios incluidos
                </p>
                <ul className="space-y-3.5 text-sm text-neutral-700 mb-8">
                  {[
                    'Letra 100% personalizada con tus nombres, fechas y anécdotas.',
                    'Elige género musical, tono emocional y voz (masculina o femenina).',
                    'Audio en calidad de estudio WAV + portada en video 9:16 personalizada.',
                    'Producción rápida: entrega garantizada en máx. 30 minutos.',
                    'Hasta 2 rondas de revisiones gratuitas incluidas.'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#8B1F32]/10 text-[#8B1F32] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleGoToForm('estandar')}
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#8B1F32] text-[#8B1F32] hover:text-white border-2 border-[#8B1F32] font-bold py-4 px-6 rounded-2xl transition-all shadow-sm"
              >
                <span>Elegir Canción Estándar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Plan 2: Inspirada en Canción Original */}
            <div className="relative bg-white rounded-3xl p-8 sm:p-9 border-2 border-[#8B1F32] shadow-2xl shadow-[#8B1F32]/15 flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#8B1F32] text-white text-[11px] font-bold uppercase tracking-widest shadow-md">
                  <Award className="w-3.5 h-3.5" />
                  Edición Especial
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 mb-5 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1F32]/10 text-[#8B1F32] text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Inspiración Original
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    Listo en 2 a 3 horas
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
                  Inspirada en tu Canción Favorita
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  Pensada para cuando tienen una canción especial que los representa. Creamos tu tema inspirándonos en la vibra, ritmo y esencia de esa canción original.
                </p>

                <div className="pb-6 mb-6 border-b border-[#8B1F32]/10 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#8B1F32]">
                    {currency === 'PEN' ? 'S/ 35' : '$12'}
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">
                    {currency === 'PEN' ? 'soles • pago único' : 'dólares USD • pago único'}
                  </span>
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#8B1F32] mb-4">
                  ¿Por qué elegir este plan?
                </p>
                <ul className="space-y-3.5 text-sm text-neutral-700 mb-8">
                  {[
                    'Inspiración musical directa en la canción original/favorita que tú nos indiques.',
                    'Adaptación artesanal de tu historia manteniendo la atmósfera, tempo y estilo de tu referencia.',
                    'Trabajo de producción a medida y mezcla cuidada al detalle (entrega en 2 a 3 horas).',
                    'Audio en calidad de estudio WAV + portada en video 9:16 personalizada.',
                    'Hasta 2 rondas de revisiones gratuitas incluidas.'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#8B1F32] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleGoToForm('especial')}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#8B1F32] hover:bg-[#701828] text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-[#8B1F32]/25 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Elegir Inspirada en Original</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-10 bg-[#F5EADC]/50 border border-[#8B1F32]/15 rounded-2xl p-5 text-center max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <strong className="text-[#8B1F32]">¿Cuál te conviene?</strong> Elige la <strong>Estándar</strong> ({currency === 'PEN' ? 'S/ 19' : '$7'}) si buscas rapidez en <strong>30 minutos</strong> con un estilo musical nuevo. Elige <strong>Inspirada en tu Canción Favorita</strong> ({currency === 'PEN' ? 'S/ 35' : '$12'}) si deseas que nuestro equipo dedique <strong>2 a 3 horas</strong> a recrear la vibra de una canción original especial para ustedes.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Muro de Testimonios */}
      <section id="testimonios" className="scroll-mt-16 bg-[#F5EADC]/70 py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#8B1F32]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8B1F32] block">
              Experiencias inolvidables
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-neutral-900">
              Historias que ya <span className="text-[#8B1F32]">hemos cantado</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((testimonio, idx) => (
              <div
                key={idx}
                className="relative bg-white p-8 rounded-3xl border border-[#8B1F32]/15 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex text-[#8B1F32] gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4" fill="currentColor" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#8B1F32]/20" />
                  </div>
                  <p className="text-neutral-700 text-base leading-relaxed italic mb-7">
                    "{testimonio.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#8B1F32]/10">
                  <div className="w-10 h-10 rounded-full bg-[#8B1F32] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {testimonio.initials}
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900 text-sm">{testimonio.name}</div>
                    <div className="text-xs text-neutral-500">{testimonio.occasion}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="scroll-mt-16 bg-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#8B1F32]/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8B1F32] block">
              Resolvemos tus dudas
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900">
              Preguntas <span className="text-[#8B1F32]">Frecuentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-[#8B1F32]/30 shadow-md'
                      : 'border-neutral-200/80 shadow-sm hover:border-[#8B1F32]/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left focus:outline-none"
                  >
                    <span className="font-bold text-base sm:text-lg text-neutral-900">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-[#8B1F32] text-white rotate-180' : 'bg-[#F5EADC] text-[#8B1F32]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-neutral-600 text-sm sm:text-base leading-relaxed border-t border-neutral-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CTA Final & Footer */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#8B1F32] via-[#751828] to-[#510E1A] px-6 py-14 sm:p-16 text-center shadow-2xl shadow-[#8B1F32]/25">
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-rose-300/10 blur-3xl" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              ¿Listo para emocionar con una canción?
            </h2>
            <p className="text-white/85 text-lg sm:text-xl leading-relaxed">
              Únete a las miles de personas que ya han regalado un momento inolvidable hecho música.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleGoToForm()}
                className="inline-flex items-center gap-2.5 bg-white text-[#8B1F32] text-lg font-bold py-4 px-10 rounded-full shadow-xl hover:bg-[#F5EADC] transition-all hover:scale-105 active:scale-95"
              >
                <span>Crear mi canción ahora</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Calidad de estudio WAV</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Garantía de satisfacción</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Entrega máx. 30 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-white border-t border-neutral-100 text-center px-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          © {new Date().getFullYear()} {appTitle} • Canciones con Alma
        </p>
      </footer>
    </div>
  );
}
