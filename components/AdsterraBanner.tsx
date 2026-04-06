import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  adKey: string;
  format: '728x90' | '300x250';
  className?: string;
}

/**
 * AdsterraBanner Component
 * Dynamically injects Adsterra iframe banners into a React component.
 */
const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ adKey, format, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content to avoid duplicate banners on re-renders
    containerRef.current.innerHTML = '';

    const width = format === '728x90' ? 728 : 300;
    const height = format === '728x90' ? 90 : 250;

    // Create the config script that sets atOptions
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    // Create the invoke script that loads the ad
    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;

    // Append scripts to the container
    containerRef.current.appendChild(configScript);
    containerRef.current.appendChild(invokeScript);

    return () => {
      // Cleanup: Clear the container when component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [adKey, format]);

  return (
    <div 
      ref={containerRef} 
      className={`flex justify-center items-center overflow-hidden ${className || ''}`}
      style={{ minHeight: format === '728x90' ? '90px' : '250px' }}
    />
  );
};

export default AdsterraBanner;
