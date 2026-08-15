'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'es' | 'fr';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const uiTranslations: Translations = {
  // Brand & Nav
  navInvestigate: { en: 'Investigate', hi: 'जांच करें', es: 'Investigar', fr: 'Enquêter' },
  navDemo: { en: 'Killer Demo Report', hi: 'किलर डेमो रिपोर्ट', es: 'Informe de Demostración', fr: 'Rapport de Démo' },
  navDashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', es: 'Panel', fr: 'Tableau de bord' },
  navAdmin: { en: 'Admin Stats', hi: 'एडमिन आंकड़े', es: 'Estadísticas Admin', fr: 'Statistiques Admin' },
  navSignIn: { en: 'Sign In', hi: 'साइन इन करें', es: 'Iniciar Sesión', fr: 'Se connecter' },

  // Hero Section
  heroBadge: {
    en: 'Digital Trust Infrastructure • Next-Gen AI Verification',
    hi: 'डिजिटल ट्रस्ट इंफ्रास्ट्रक्चर • अगली पीढ़ी की एआई सत्यापन',
    es: 'Infraestructura de Confianza Digital • Verificación IA',
    fr: 'Infrastructure de Confiance Numérique • Vérification IA',
  },
  heroTitle1: { en: 'Before you believe it,', hi: 'विश्वास करने से पहले,', es: 'Antes de creerlo,', fr: 'Avant de le croire,' },
  heroTitle2: { en: 'verify it.', hi: 'सत्यापित करें।', es: 'verifícalo.', fr: 'vérifiez-le.' },
  heroDesc: {
    en: "We don't just detect deepfakes. We verify digital reality — extracting claims, tracing content to its original source, evaluating context accuracy, and presenting explainable evidence.",
    hi: 'हम केवल डीपफेक की पहचान नहीं करते। हम डिजिटल वास्तविकता का सत्यापन करते हैं — दावों को निकालना, मूल स्रोत तक ट्रैकिंग, और प्रमाण प्रस्तुत करना।',
    es: 'No solo detectamos deepfakes. Verificamos la realidad digital — extrayendo afirmaciones y rastreando el origen.',
    fr: 'Nous ne détectons pas seulement les deepfakes. Nous vérifions la réalité numérique.',
  },

  // Upload Tabs
  tabUpload: { en: 'Upload Media / Files', hi: 'मीडिया / फ़ाइलें अपलोड करें', es: 'Subir Archivos / Medios', fr: 'Télécharger des Fichiers' },
  tabUrl: { en: 'Submit Web / Social URL', hi: 'वेब / सोशल URL जमा करें', es: 'Enviar URL Web / Social', fr: 'Soumettre une URL' },
  btnRunInvestigation: { en: 'Run Parakh AI Deep Investigation', hi: 'परख एआई गहरी जांच चलाएं', es: 'Ejecutar Investigación Parakh AI', fr: 'Lancer l\'Enquête Parakh AI' },

  // Verdict Labels
  verdictVerified: { en: 'VERIFIED', hi: 'सत्यापित', es: 'VERIFICADO', fr: 'VÉRIFIÉ' },
  verdictAuthentic: { en: 'LIKELY AUTHENTIC', hi: 'संभावित प्रामाणिक', es: 'PROBABLEMENT AUTÉNTICO', fr: 'PROBABLEMENT AUTHENTIQUE' },
  verdictMisleading: { en: 'MISLEADING CONTEXT', hi: 'भ्रामक संदर्भ', es: 'CONTEXTO ENGAÑOSO', fr: 'CONTEXTE TROMPEUR' },
  verdictManipulated: { en: 'MANIPULATED MEDIA', hi: 'हेरफेर किया गया मीडिया', es: 'MEDIO MANIPULADO', fr: 'MÉDIA MANIPULÉ' },
  verdictAiGenerated: { en: 'AI GENERATED', hi: 'एआई द्वारा जनरेट किया गया', es: 'GENERADO POR IA', fr: 'GÉNÉRÉ PAR IA' },
  verdictFalseClaim: { en: 'FALSE CLAIM', hi: 'झूठा दावा', es: 'AFIRMACIÓN FALSA', fr: 'FAUSSE AFIRMATION' },
  verdictUnverified: { en: 'UNVERIFIED', hi: 'असत्यापित', es: 'NO VERIFICADO', fr: 'NON VÉRIFIÉ' },

  // Report Sections
  trustScoreLabel: { en: 'Trust Score', hi: 'विश्वास स्कोर', es: 'Puntuación de Confianza', fr: 'Score de Confiance' },
  tabOverview: { en: 'Overview & Scores', hi: 'अवलोकन और स्कोर', es: 'Resumen y Puntuaciones', fr: 'Aperçu et Scores' },
  tabForensics: { en: 'Systemic Content Breakdown', hi: 'सिस्टम विश्लेषण विवरण', es: 'Desglose Sistémico', fr: 'Analyse Systémique' },
  tabGraph: { en: 'Evidence Graph', hi: 'प्रमाण ग्राफ', es: 'Gráfico de Evidencia', fr: 'Graphe de Preuves' },
  tabTimeline: { en: 'Truth Timeline', hi: 'सत्य समयरेखा', es: 'Línea de Tiempo de la Verdad', fr: 'Chronologie de la Vérité' },
  tabReceipt: { en: 'Verification Receipt', hi: 'सत्यापन रसीद', es: 'Recibo de Verificación', fr: 'Reçu de Vérification' },
  btnChallengeVerdict: { en: 'Challenge Verdict', hi: 'फैसले को चुनौती दें', es: 'Desafiar Veredicto', fr: 'Contester le Veredict' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (uiTranslations[key] && uiTranslations[key][language]) {
      return uiTranslations[key][language];
    }
    return uiTranslations[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
