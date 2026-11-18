import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface PlatformSettingsContextType {
  appTitle: string;
  appLogo: string;
  updateSettings: (newTitle: string, newLogo: string) => Promise<boolean>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  openEditModal: () => void;
}

const DEFAULT_TITLE = 'Qustom Go';
const DEFAULT_LOGO = '/logo.svg';

const PlatformSettingsContext = createContext<PlatformSettingsContextType>({
  appTitle: DEFAULT_TITLE,
  appLogo: DEFAULT_LOGO,
  updateSettings: async () => false,
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
  openEditModal: () => {},
});

export function PlatformSettingsProvider({ children }: { children: React.ReactNode }) {
  const [appTitle, setAppTitle] = useState<string>(() => {
    return localStorage.getItem('appTitle') || DEFAULT_TITLE;
  });

  const [appLogo, setAppLogo] = useState<string>(() => {
    return localStorage.getItem('appLogo') || DEFAULT_LOGO;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync document.title and favicon whenever appTitle or appLogo changes
  useEffect(() => {
    document.title = appTitle;

    // Update favicon if appLogo is set
    if (appLogo) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = appLogo;

      let appleLink: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
      if (!appleLink) {
        appleLink = document.createElement('link');
        appleLink.rel = 'apple-touch-icon';
        document.getElementsByTagName('head')[0].appendChild(appleLink);
      }
      appleLink.href = appLogo;
    }
  }, [appTitle, appLogo]);

  // Fetch settings from server on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/public/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.appTitle) {
            setAppTitle(data.appTitle);
            localStorage.setItem('appTitle', data.appTitle);
          }
          if (data.appLogo) {
            setAppLogo(data.appLogo);
            localStorage.setItem('appLogo', data.appLogo);
          }
        }
      } catch (err) {
        console.warn('Could not fetch platform settings from API:', err);
      }
    };
    fetchSettings();
  }, []);

  const updateSettings = async (newTitle: string, newLogo: string): Promise<boolean> => {
    const cleanTitle = newTitle.trim() || DEFAULT_TITLE;
    const cleanLogo = newLogo.trim() || DEFAULT_LOGO;

    // Optimistic update
    setAppTitle(cleanTitle);
    setAppLogo(cleanLogo);
    localStorage.setItem('appTitle', cleanTitle);
    localStorage.setItem('appLogo', cleanLogo);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appTitle: cleanTitle,
          appLogo: cleanLogo,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.statusMessage || 'Error al guardar la configuración');
      }

      toast.success('Nombre y logo de la plataforma actualizados');
      return true;
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || 'Error al guardar configuración');
      return false;
    }
  };

  const openEditModal = () => setIsEditModalOpen(true);

  return (
    <PlatformSettingsContext.Provider
      value={{
        appTitle,
        appLogo,
        updateSettings,
        isEditModalOpen,
        setIsEditModalOpen,
        openEditModal,
      }}
    >
      {children}
    </PlatformSettingsContext.Provider>
  );
}

export function usePlatformSettings() {
  return useContext(PlatformSettingsContext);
}
