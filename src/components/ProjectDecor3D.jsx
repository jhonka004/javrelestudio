/**
 * ProjectDecor3D.jsx
 * ─────────────────────────────────────────────────────────────────
 * Emblemas vectoriales 3D con volumen, sombras y brillo especular
 * para cada uno de los 8 proyectos reales de Javrel Studio.
 */

export default function ProjectDecor3D({ previewId }) {
  switch (previewId) {
    case 'comercia':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(8,123,255,0.45)]">
          <defs>
            <linearGradient id="posBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00BFFF" />
              <stop offset="55%" stopColor="#087BFF" />
              <stop offset="100%" stopColor="#173BCE" />
            </linearGradient>
          </defs>
          <rect x="10" y="12" width="60" height="56" rx="16" fill="url(#posBlue)" />
          <rect x="12" y="14" width="56" height="24" rx="12" fill="#FFFFFF" fillOpacity="0.16" />
          <path d="M22 28h7l4.5 18h19l4-12H31" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="35" cy="53" r="3.5" fill="#FFFFFF" />
          <circle cx="51" cy="53" r="3.5" fill="#FFFFFF" />
        </svg>
      )

    case 'javrelstore':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(121,43,255,0.45)]">
          <defs>
            <linearGradient id="storeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#087BFF" />
              <stop offset="100%" stopColor="#792BFF" />
            </linearGradient>
          </defs>
          <rect x="10" y="12" width="60" height="56" rx="16" fill="url(#storeGrad)" />
          <path d="M21 27h6l5 19h20l4-13H29" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="34" cy="53" r="3.5" fill="#00BFFF" />
          <circle cx="50" cy="53" r="3.5" fill="#00BFFF" />
          <path d="M39 33l3 3 6-6" fill="none" stroke="#00BFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'evora':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(121,43,255,0.45)]">
          <defs>
            <linearGradient id="evoraGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#792BFF" />
              <stop offset="100%" stopColor="#3B0764" />
            </linearGradient>
          </defs>
          <rect x="31" y="10" width="18" height="10" rx="3" fill="#1E1B4B" />
          <rect x="34" y="20" width="12" height="5" fill="#E9D5FF" />
          <rect x="18" y="25" width="44" height="44" rx="12" fill="url(#evoraGlass)" />
          <rect x="22" y="29" width="12" height="36" rx="6" fill="#FFFFFF" fillOpacity="0.22" />
          <rect x="28" y="40" width="24" height="14" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
          <text x="40" y="50" textAnchor="middle" fill="#4C1D95" fontSize="8" fontWeight="800" fontFamily="serif">ÉVORA</text>
        </svg>
      )

    case 'clones':
      return (
        <svg viewBox="0 0 84 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(16,27,69,0.45)]">
          <defs>
            <linearGradient id="padBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#090D16" />
            </linearGradient>
          </defs>
          <path
            d="M22 26h40c7 0 12 6 14 18 1.5 9-3 16-9 16-4 0-7-3-10-8H27c-3 5-6 8-10 8-6 0-10.5-7-9-16 2-12 7-18 14-18z"
            fill="url(#padBody)"
            stroke="#087BFF"
            strokeWidth="2"
          />
          <path d="M25 35v10M20 40h10" stroke="#94A3B8" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="56" cy="36" r="2.6" fill="#087BFF" />
          <circle cx="62" cy="41" r="2.6" fill="#EF4444" />
          <circle cx="56" cy="46" r="2.6" fill="#00BFFF" />
          <circle cx="50" cy="41" r="2.6" fill="#A12BFF" />
        </svg>
      )

    case 'green':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(5,150,105,0.45)]">
          <defs>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#065F46" />
            </linearGradient>
          </defs>
          <rect x="14" y="42" width="52" height="24" rx="8" fill="#064E3B" stroke="#FBBF24" strokeWidth="1.5" />
          <polygon points="40,12 58,26 52,48 28,48 22,26" fill="url(#emeraldGrad)" stroke="#ECFDF5" strokeWidth="1.5" />
          <polygon points="40,18 50,27 46,42 34,42 30,27" fill="#A7F3D0" fillOpacity="0.45" />
          <circle cx="54" cy="18" r="2.5" fill="#FDE68A" />
        </svg>
      )

    case 'realpe':
      return (
        <svg viewBox="0 0 84 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(8,123,255,0.4)]">
          <defs>
            <linearGradient id="shoeBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#087BFF" />
              <stop offset="100%" stopColor="#792BFF" />
            </linearGradient>
          </defs>
          <path
            d="M12 50c0-7 5-16 14-20l8 8c5 3 10 1 14-4l18 10c4 2 6 5 6 9v5H12v-8z"
            fill="url(#shoeBlue)"
          />
          <rect x="11" y="56" width="62" height="8" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M28 42l14 6M32 37l12 5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )

    case 'mrpollo':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(234,88,12,0.45)]">
          <defs>
            <linearGradient id="polloGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <circle cx="40" cy="44" r="24" fill="url(#polloGrad)" />
          <path d="M26 24c0-6 6-10 14-10s14 4 14 10H26z" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1.5" />
          <circle cx="33" cy="41" r="3" fill="#101B45" />
          <circle cx="47" cy="41" r="3" fill="#101B45" />
          <polygon points="40,44 35,51 45,51" fill="#FEF08A" />
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-[0_12px_18px_rgba(121,43,255,0.45)]">
          <defs>
            <linearGradient id="phoneScreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00BFFF" />
              <stop offset="50%" stopColor="#087BFF" />
              <stop offset="100%" stopColor="#792BFF" />
            </linearGradient>
          </defs>
          <rect x="22" y="10" width="36" height="60" rx="9" fill="#101B45" />
          <rect x="25" y="14" width="30" height="52" rx="6" fill="url(#phoneScreen)" />
          <rect x="34" y="16" width="12" height="3" rx="1.5" fill="#101B45" />
          <circle cx="40" cy="40" r="9" fill="#FFFFFF" fillOpacity="0.25" />
        </svg>
      )
  }
}
