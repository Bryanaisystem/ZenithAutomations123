import React, { useEffect } from 'react';

declare global {
  interface Window {
    VG_CONFIG: {
      ID: string;
      region: string;
      render: string;
      stylesheets: string[];
    };
  }
}

export function VoiceflowChat() {
  useEffect(() => {
    // Create container div
    const container = document.createElement('div');
    container.id = 'VG_OVERLAY_CONTAINER';
    container.style.width = '0';
    container.style.height = '0';
    document.body.appendChild(container);

    // Add custom styles
    const customStyles = document.createElement('style');
    customStyles.textContent = `
      #vg_chat_toggle img {
        border-radius: 50% !important;
        overflow: hidden !important;
        aspect-ratio: 1/1 !important;
        object-fit: cover !important;
      }
      .vg-widget-controls-container {
        right: 20px !important;
      }
      @media (max-width: 767px) {
        #vg_chat_toggle {
          transform: scale(0.85);
          aspect-ratio: 1/1 !important;
        }
        #vg_chat_toggle img {
          width: 48px !important;
          height: 48px !important;
          min-width: 48px !important;
          min-height: 48px !important;
          max-width: 48px !important;
          max-height: 48px !important;
          border-radius: 50% !important;
          overflow: hidden !important;
          aspect-ratio: 1/1 !important;
          object-fit: cover !important;
        }
        #vg_chat_toggle > div {
          width: 48px !important;
          height: 48px !important;
          aspect-ratio: 1/1 !important;
        }
        .vg-widget-controls-container {
          bottom: 80px !important;
          right: 12px !important;
        }
      }
    `;
    document.head.appendChild(customStyles);

    // Initialize widget
    window.VG_CONFIG = {
      ID: "c6mrviqlmjs92apf",
      region: 'na',
      render: 'bottom-right',
      stylesheets: [
        "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
      ]
    };

    const script = document.createElement('script');
    script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      container.remove();
      script.remove();
      customStyles.remove();
      // Remove any other elements that might have been created by the widget
      const elements = document.querySelectorAll('[id^="VG_"]');
      elements.forEach(el => el.remove());
    };
  }, []);

  return null;
}