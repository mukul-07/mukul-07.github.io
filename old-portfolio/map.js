/* ============================================================
   DEPLOYMENT MAP — map.js
   Uses Leaflet.js + CARTO dark-matter tiles
   ============================================================ */

(function () {
  'use strict';

  // ── Pin data ──────────────────────────────────────────────
  const PINS = {
    fortune500: [
      {
        lat: 12.68, lng: 101.28,
        name: 'Ford Motors Thailand',
        meta: 'Fortune 500 · Automotive · Rayong, Thailand',
        desc: 'Autonomous forklifts deployed on Body Shop floor. 14 trips/hr. 2-shift operation. Delivered in 60 days.',
      },
      {
        lat: 1.35, lng: 103.82,
        name: 'Caterpillar Singapore',
        meta: 'Fortune 500 · Construction · Singapore',
        desc: 'Two production-ready autonomous forklifts delivered in 15 days. Zero incidents.',
      },
      {
        lat: 18.52, lng: 73.86,
        name: 'Coca-Cola India',
        meta: 'Fortune 500 · FMCG · Pune, India',
        desc: 'Enterprise AMR deployment at a high-throughput production facility.',
      },
    ],
    enterprise: [
      // 10 cities · MMR (Material Handling Robot) at commercial building construction sites
      {
        lat: 19.07, lng: 72.87,
        name: 'L&T + Godrej',
        meta: 'Enterprise · Construction · Mumbai, India',
        desc: 'MMR (Material Handling Robot) deployment at commercial building construction sites for L&T and Godrej.',
      },
      {
        lat: 12.97, lng: 77.59,
        name: 'Sobha',
        meta: 'Enterprise · Construction · Bengaluru, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site for Sobha.',
      },
      {
        lat: 13.08, lng: 80.27,
        name: 'Enterprise deployment',
        meta: 'Enterprise · Construction · Chennai, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site.',
      },
      {
        lat: 17.38, lng: 78.49,
        name: 'K2K',
        meta: 'Enterprise · Construction · Hyderabad, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site for K2K.',
      },
      {
        lat: 17.6868, lng: 83.2185,
        name: 'Enterprise deployment',
        meta: 'Enterprise · Construction · Visakhapatnam, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site.',
      },
      {
        lat: 20.4625, lng: 85.8828,
        name: 'Enterprise deployment',
        meta: 'Enterprise · Construction · Cuttack, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site.',
      },
      {
        lat: 25.4358, lng: 81.8463,
        name: 'Enterprise deployment',
        meta: 'Enterprise · Construction · Prayagraj, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site.',
      },
      {
        lat: 21.1702, lng: 72.8311,
        name: 'Enterprise deployment',
        meta: 'Enterprise · Construction · Surat, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site.',
      },
      {
        lat: 23.02, lng: 72.57,
        name: 'Enterprise deployment',
        meta: 'Enterprise · Construction · Ahmedabad, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site.',
      },
      {
        lat: 28.61, lng: 77.21,
        name: 'Enterprise deployment',
        meta: 'Enterprise · Construction · Delhi, India',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site.',
      },
      {
        lat: 25.2048, lng: 55.2708,
        name: 'Sobha',
        meta: 'Enterprise · Construction · Dubai, UAE',
        desc: 'MMR (Material Handling Robot) deployment at a commercial building construction site for Sobha.',
      },
      {
        lat: 52.52, lng: 13.405,
        name: 'Everest Carbon',
        meta: 'Enterprise · Custom Product · Berlin, Germany',
        desc: 'Custom autonomous product designed and built for Everest Carbon.',
      },
    ],
  };

  // ── DOM ready ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('deployment-map');
    if (!el) return;

    initMap(el);
  });

  function initMap(container) {
    // Initialise Leaflet map
    const map = L.map(container, {
      center: [25, 55],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    // CARTO dark-matter tiles
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map);

    // Re-enable scroll zoom on map click / disable on mouse leave
    container.addEventListener('click', function () {
      map.scrollWheelZoom.enable();
    });
    container.addEventListener('mouseleave', function () {
      map.scrollWheelZoom.disable();
    });

    // Attribution bottom left, minimal
    L.control.attribution({ position: 'bottomleft', prefix: false })
      .addAttribution('Map © <a href="https://carto.com/" target="_blank" rel="noopener">CARTO</a>')
      .addTo(map);

    // ── Add pins ────────────────────────────────────────────
    PINS.fortune500.forEach(function (pin) {
      addPin(map, pin, 'fortune500');
    });

    PINS.enterprise.forEach(function (pin) {
      addPin(map, pin, 'enterprise');
    });
  }

  // ── Create a Fortune 500 or Enterprise marker ────────────
  function addPin(map, pin, type) {
    const isF500 = type === 'fortune500';
    const color  = isF500 ? '#f97316' : '#60a5fa';
    const size   = isF500 ? 18 : 13;
    const pulse  = isF500 ? 28 : 20;

    const icon = L.divIcon({
      className: '',
      iconSize:  [pulse, pulse],
      iconAnchor:[pulse / 2, pulse / 2],
      html: `
        <span class="map-pin map-pin--${type}" style="
          --color: ${color};
          --size: ${size}px;
          --pulse: ${pulse}px;
        "></span>
      `,
    });

    const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);

    // Custom popup
    const popupContent = `
      <div class="map-popup">
        <p class="map-popup__name">${pin.name}</p>
        <p class="map-popup__meta">${pin.meta}</p>
        <p class="map-popup__desc">${pin.desc}</p>
      </div>
    `;

    marker.bindPopup(popupContent, {
      closeButton: false,
      className: 'map-popup-wrap',
      offset: [0, -(pulse / 2 + 4)],
      maxWidth: 280,
      minWidth: 220,
    });

    marker.on('mouseenter', function () { this.openPopup(); });
    marker.on('mouseleave', function () { this.closePopup(); });
    marker.on('click',      function () { this.openPopup(); });
  }

})();
