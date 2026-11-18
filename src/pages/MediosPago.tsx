import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, QrCode, CreditCard, Building } from 'lucide-react';
import { toast } from 'sonner';

export default function MediosPago() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [instructions, setInstructions] = useState("Transfiere a nuestra cuenta bancaria y adjunta el comprobante para comenzar a producir tu canción.");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem('paymentSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.instructions) setInstructions(parsed.instructions);
        if (parsed.qrUrl) setQrUrl(parsed.qrUrl);
      }
    } catch (e) {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular el tiempo de subida
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Voucher enviado. Validaremos tu pago en breve");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5EADC] text-neutral-900 font-sans py-12 px-6 lg:px-8 flex flex-col items-center justify-center">
      
      {/* Header */}
      <div className="max-w-4xl w-full text-center mb-12">
        <span className="text-sm font-bold uppercase tracking-widest text-[#8B1F32] mb-2 block">
          Paso final
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-[#8B1F32] font-bold">
          Tu canción está casi lista
        </h1>
        <p className="text-neutral-600 mt-4 max-w-xl mx-auto">
          Por favor, realiza el pago usando los datos a continuación y sube la captura del comprobante.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Bank / QR details */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100 flex flex-col">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Building className="w-5 h-5 text-[#8B1F32]" />
            Datos de Pago
          </h2>

          <div className="space-y-4 mb-8 flex-grow text-neutral-700 whitespace-pre-line">
            {instructions}
          </div>

          <div className="bg-neutral-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-neutral-100">
            <h3 className="font-bold text-sm uppercase tracking-wide text-neutral-500 mb-4 flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Código QR
            </h3>
            {qrUrl ? (
              <img src={qrUrl} alt="QR de Pago" className="max-w-[200px] w-full h-auto object-contain rounded-xl shadow-sm" />
            ) : (
              <div className="w-[180px] h-[180px] bg-neutral-200 rounded-xl flex items-center justify-center border-2 border-dashed border-neutral-300">
                <span className="text-xs text-neutral-400 text-center px-4">
                  Imagen de QR no configurada aún
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Upload Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#8B1F32]/10">
          <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#8B1F32]" />
            Validar tu Pago
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-grow flex flex-col justify-center mb-8">
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Sube tu comprobante de pago
              </label>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-[#F5EADC]/40 rounded-2xl group-hover:bg-[#F5EADC]/60 transition-colors pointer-events-none"></div>
                <div className="relative border-2 border-dashed border-[#8B1F32]/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all group-hover:border-[#8B1F32]/50">
                  <UploadCloud className="w-10 h-10 text-[#8B1F32] mb-3" />
                  <p className="text-sm font-medium text-neutral-900">
                    Arrastra tu imagen o haz clic aquí
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Solo imágenes (JPG, PNG)
                  </p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    required 
                    disabled={isSuccess || isSubmitting}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSuccess || isSubmitting}
              className="w-full bg-[#8B1F32] hover:bg-[#701828] text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-lg transition-transform transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  ¡Enviado!
                </>
              ) : (
                "Confirmar Pago y Enviar"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
