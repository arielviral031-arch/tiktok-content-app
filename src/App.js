import React, { useState } from 'react';
import './App.css';

const IDEES_PAR_NICHE = {
  mode: [
    "5 façons de styliser un jean baggy pour l'été",
    "Transformation look : du casual au streetwear en 30 secondes",
    "3 accessoires qui changent tout ton outfit",
    "Comment porter du oversize sans avoir l'air débraillé",
    "Les couleurs à porter selon ton teint"
  ],
  business: [
    "3 erreurs qui tuent ton business en ligne",
    "Comment j'ai gagné mes premiers 100 000 FCFA en ligne",
    "L'astuce que personne ne te dit sur le e-commerce",
    "5 outils gratuits pour lancer ton business",
    "Pourquoi ton produit ne se vend pas (et comment corriger ça)"
  ],
  sport: [
    "Les stats qui prouvent que ce joueur est sous-coté",
    "Prédiction : qui va gagner cette compétition",
    "3 entraînements pour améliorer ta vitesse",
    "Le classement que personne n'attendait",
    "Analyse tactique en 60 secondes"
  ],
  default: [
    "Une astuce simple qui change tout",
    "Ce que personne ne te dit sur ce sujet",
    "3 erreurs à éviter absolument",
    "Le secret derrière ce succès",
    "Comment démarrer aujourd'hui même"
  ]
};

function genererIdeesPourNiche(niche) {
  const cle = niche.toLowerCase().trim();
  for (const key of Object.keys(IDEES_PAR_NICHE)) {
    if (cle.includes(key)) return IDEES_PAR_NICHE[key];
  }
  return IDEES_PAR_NICHE.default;
}

export default function App() {
  const [niche, setNiche] = useState('');
  const [idees, setIdees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genCount, setGenCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const LIMITE_GRATUITE = 2;

  const genererIdees = () => {
    if (!niche.trim()) return;

    if (!isPro && genCount >= LIMITE_GRATUITE) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setIdees(genererIdeesPourNiche(niche));
      setGenCount(genCount + 1);
      setLoading(false);
    }, 800);
  };

  const passerPro = (methode) => {
    alert(`Paiement via ${methode} - à connecter avec Stripe/Google Pay API`);
    setIsPro(true);
    setShowPaywall(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Générateur d'idées TikTok</h1>
        <p>Trouve tes prochaines idées de vidéos en un clic</p>
        {isPro && <span className="badge-pro">✨ PRO</span>}
      </header>

      <div className="input-section">
        <input
          type="text"
          placeholder="Ta niche (mode, business, sport...)"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="niche-input"
        />
        <button onClick={genererIdees} disabled={loading} className="btn-generer">
          {loading ? 'Génération...' : 'Générer des idées'}
        </button>
      </div>

      {!isPro && (
        <p className="compteur">
          {LIMITE_GRATUITE - genCount > 0
            ? `${LIMITE_GRATUITE - genCount} génération(s) gratuite(s) restante(s)`
            : 'Limite gratuite atteinte'}
        </p>
      )}

      <div className="idees-liste">
        {idees.map((idee, index) => (
          <div key={index} className="idee-card">
            <span className="idee-numero">{index + 1}</span>
            <p>{idee}</p>
          </div>
        ))}
      </div>

      {showPaywall && (
        <div className="paywall-overlay">
          <div className="paywall-modal">
            <h2>Passe en illimité 🚀</h2>
            <p>5$ / mois pour des générations illimitées</p>
            <button onClick={() => passerPro('Stripe')} className="btn-paiement stripe">
              Payer par carte (Stripe)
            </button>
            <button onClick={() => passerPro('Google Pay')} className="btn-paiement google">
              Payer avec Google Pay
            </button>
            <button onClick={() => setShowPaywall(false)} className="btn-fermer">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
