'use client';

import { useEffect, useState } from 'react';

interface UseGoogleMapsLoaderParams {
  apiKey: string;
  version?: string;
  libraries?: string[];
}

export function useGoogleMapsLoader({
  apiKey,
  version = 'beta',
  libraries = ['marker', 'places'],
}: UseGoogleMapsLoaderParams) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if already loaded
    if (typeof (window as { google?: unknown }).google !== 'undefined' && (window as { google?: { maps?: unknown } }).google?.maps) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-api-script';
    const callbackName = 'initGoogleMapsApi';

    // Set up callback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)[callbackName] = () => {
      console.log('Google Maps API loaded successfully');
      setIsLoaded(true);
    };

    // Check if script already exists
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=${version}&callback=${callbackName}&loading=async&libraries=${libraries.join(',')}`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('Failed to load the Google Maps JavaScript API');
        setLoadError(new Error('Google Maps JavaScript API could not load'));
      };
      document.head.appendChild(script);
    }
  }, [apiKey, version, libraries.join(',')]);

  return { isLoaded, loadError };
}
