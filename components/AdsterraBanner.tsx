import React, { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  id: '728x90' | '300x250';
  className?: string;
}

const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ id, className = "" }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only inject if the ref exists and it's empty
    if (bannerRef.current && !bannerRef.current.firstChild) {
      const key = id === '728x90' ? 'cf6be9da5c1b9bb85e4a42c5926f49c7' : '76e30fba13c18617476b3ae8fd3a2d95';
      const height = id === '728x90' ? 90 : 250;
      const width = id === '728x90' ? 728 : 300;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        atOptions = {
          'key' : '${key}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `https://www.highperformanceformat.com/${key}/invoke.js`;

      bannerRef.current.appendChild(script);
      bannerRef.current.appendChild(invokeScript);
    }
  }, [id]);

  const minHeight = id === '728x90' ? '90px' : '250px';

  return (
    <div 
      ref={bannerRef} 
      className={`flex justify-center items-center w-full my-5 ${className}`}
      style={{ minHeight }}
    />
  );
};

export default AdsterraBanner;
