import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, QrCode, CreditCard, Building, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function MediosPago() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [instructions, setInstructions] = useState("Transfiere a nuestra cuenta bancaria y adjunta el comprobante para comenzar a producir tu canción.");
  const [qrUrl, setQrUrl] = useState("");
  
  const [jobId, setJobId] = useState("");
  const [plan, setPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [voucherUrl, setVoucherUrl] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem('paymentSettings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.instructions) setInstructions(parsed.instructions);
        if (parsed.qrUrl) setQrUrl(parsed.qrUrl);
      }
    } catch (e) {}

    const params = new URLSearchParams(window.location.search);
    setJobId(params.get('jobId') || '');
    setPlan(params.get('plan') || '');
    setPhone(params.get('phone') || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobId) {
      toast.error("No se encontró el ID de la petición. Por favor, regresa al formulario.");
      return;
    }

    const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    
    if (!file) {
      toast.error("Por favor adjunta tu comprobante de pago");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('voucher', file);
      formData.append('jobId', jobId);
      if (phone) formData.append('whatsappNumber', phone);

      const res = await fetch('/api/public/voucher', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.statusMessage || "Error al enviar voucher");

      setIsSuccess(true);
      toast.success("Pago confirmado y procesado con éxito.");
    } catch (err: any) {
      toast.error(err.message || "Hubo un error al enviar tu comprobante");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const planLabel = plan === 'especial' 
      ? 'Especial - Inspirada en canción original' 
      : 'Estándar';
    const text = encodeURIComponent(`¡Hola! Ya envié mi comprobante de pago.\n\nPlan elegido: ${planLabel}\nID Petición: ${jobId}`);
    const waLink = `https://wa.me/${phone}?text=${text}`;

    return (
      <div className="min-h-screen bg-[#F5EADC] flex flex-col items-center justify-center py-12 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl w-full text-center border border-neutral-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
            ¡Pago Confirmado Exitosamente!
          </h1>
          <p className="text-neutral-600 mb-8 text-lg">
            Hemos recibido tu comprobante y el estado de tu petición ha sido actualizado a <span className="font-bold text-emerald-600">Pagado</span> en nuestro sistema. ¡Pronto comenzaremos a producir tu canción!
          </p>

          <div className="bg-neutral-50 rounded-2xl p-6 text-left mb-8 border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-3 uppercase text-xs tracking-wider">Resumen de tu compra</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><span className="font-semibold text-neutral-800">Plan:</span> {planLabel}</li>
              <li><span className="font-semibold text-neutral-800">ID de Petición:</span> {jobId}</li>
            </ul>
          </div>

          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-lg transition-transform transform hover:scale-[1.02] w-full sm:w-auto"
          >
            <MessageCircle className="w-6 h-6" />
            Notificar por WhatsApp
          </a>
        </div>
      </div>
    );
  }

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
