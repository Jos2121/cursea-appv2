import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePlatformSettings } from '@/context/PlatformSettingsContext';
import { Edit3, Upload, RefreshCw, Image, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function EditPlatformModal() {
  const { appTitle, appLogo, updateSettings, isEditModalOpen, setIsEditModalOpen } = usePlatformSettings();

  const [title, setTitle] = useState(appTitle);
  const [logo, setLogo] = useState(appLogo);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditModalOpen) {
      setTitle(appTitle);
      setLogo(appLogo);
    }
  }, [isEditModalOpen, appTitle, appLogo]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('El logo no debe superar los 5MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/public/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.statusMessage || 'Error al subir logo');

      setLogo(data.url);
      toast.success('Logo cargado con éxito');
    } catch (err: any) {
      toast.error(err.message || 'Error al subir logo');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('El título no puede estar vacío');
      return;
    }

    setIsSaving(true);
    const success = await updateSettings(title, logo);
    setIsSaving(false);
    if (success) {
      setIsEditModalOpen(false);
    }
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="bg-white border-none text-neutral-900 max-w-md rounded-3xl shadow-2xl p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif font-bold flex items-center gap-2 text-[#8B1F32]">
            <Edit3 className="w-5 h-5 text-[#8B1F32]" />
            Editar Título y Logo de la Plataforma
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Platform Title */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-neutral-400 tracking-widest">
              Nombre / Título de la Plataforma
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Qustom Go"
              className="rounded-xl border-neutral-200 focus:ring-[#8B1F32] text-sm h-11"
            />
            <p className="text-[11px] text-neutral-500">
              Este título aparecerá en el Dashboard, Navbar, Landing, pestaña del navegador y footer.
            </p>
          </div>

          {/* Logo Section */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase text-neutral-400 tracking-widest">
              Logo de la Plataforma
            </Label>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
              <div className="w-14 h-14 rounded-xl bg-white border border-neutral-200 shadow-sm p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                {logo ? (
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <Image className="w-6 h-6 text-neutral-400" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="relative inline-flex items-center">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploading || isSaving}
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />
                  <Button
                    type="button"
                    disabled={isUploading || isSaving}
                    className="bg-[#8B1F32] hover:bg-[#701828] text-white text-xs font-bold h-9 px-4 rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    {isUploading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    {isUploading ? 'Subiendo...' : 'Subir nuevo logo'}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLogo('/logo.svg')}
                    className="text-[10px] text-neutral-500 hover:text-[#8B1F32] flex items-center gap-1 underline font-medium"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    Restablecer logo predeterminado
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                O URL del Logo:
              </Label>
              <Input
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://... o /logo.svg"
                className="rounded-xl border-neutral-200 focus:ring-[#8B1F32] text-xs h-9"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8 flex flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsEditModalOpen(false)}
            className="rounded-xl text-neutral-500 font-bold uppercase text-[10px] tracking-widest"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || isUploading}
            className="rounded-xl bg-[#8B1F32] hover:bg-[#731929] text-white px-6 font-bold text-sm shadow-lg shadow-[#8B1F32]/20"
          >
            {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
            Guardar Cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
