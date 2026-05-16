/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  TreePine, 
  Flame, 
  Trash2, 
  Tent, 
  Droplets, 
  PawPrint, 
  Moon, 
  Sun, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Wind,
  Info,
  Smartphone,
  Globe,
  Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Translations
const translations: Record<string, TranslationData> = {
  es: {
    title: "Rastro Cero - Naturaleza Segura",
    subtitle: "Aprende a proteger nuestro entorno",
    brand: "RAULIF",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    progress: "Progreso del aprendizaje",
    sections: {
      cooking: {
        title: "Cocina sin dejar huella",
        icon: <Flame className="w-6 h-6" />,
        content: [
          "Método tradicional: Si no tienes jabón biodegradable, limpia con agua hirviendo y arena limpia. La arena es un abrasivo natural que elimina grasas.",
          "Opción recomendada: Prefiere jabones 100% biodegradables, pH neutro y sin fragancias. Úsalos a +30m de fuentes de agua y entierra el agua gris.",
          "Pasta de dientes ecológica: Las de arcilla y bicarbonato son biodegradables y sirven para lavar loza en emergencias por su poder pulidor.",
          "Nota futura: Pronto aparecerá la 'Arcilla Limpia Multiuso', un solo producto para dientes y lavaplatos."
        ],
        warning: "Las fogatas pueden causar incendios forestales devastadores y dañan el suelo orgánico permanentemente."
      },
      hygiene: {
        title: "Higiene sin química: arcilla, arena y agua",
        icon: <Waves className="w-6 h-6" />,
        content: [
          "¿Por qué evitar jabones? Incluso los 'bio' dañan anfibios e insectos acuáticos y tardan décadas en degradarse.",
          "La solución simple: Agua caliente + arena + estropajo de fibras naturales (luffa o esponja vegetal).",
          "La solución ideal: Pasta de arcillas puras (bentonita, caolín). Degrada en horas, no es tóxica y sirve como desodorante.",
          "Dato de Raulíf: He lavado platos con arena y ceniza por 20 años en el bosque y nunca me enfermé. La arcilla es el siguiente nivel."
        ]
      },
      sleeping: {
        title: "¿Dónde dormir?",
        icon: <Tent className="w-6 h-6" />,
        content: [
          "Busca terrenos elevados y superficies resistentes (roca, grava, pasto seco).",
          "Aléjate de árboles muertos o con ramas grandes que puedan caer.",
          "PROHIBIDO: Lechos de ríos (crecidas súbitas) y laderas inestables."
        ],
        warning: "Una crecida puede ocurrir incluso si no está lloviendo donde tú estás."
      },
      waste: {
        title: "Necesidades Fisiológicas",
        icon: <Info className="w-6 h-6" />,
        content: [
          "Cacatubo: Usa un tubo con bolsa para llevarte tus deposiciones en zonas de alta sensibilidad.",
          "Oyo de gato: Pozo de 15-20 cm en suelo orgánico, a 60m del agua. Tápalo bien al terminar.",
          "Orina: Aléjate al menos 30 metros de ríos y senderos para evitar olores y contaminación."
        ]
      },
      trash: {
        title: "Basura y Residuos",
        icon: <Trash2 className="w-6 h-6" />,
        content: [
          "Técnica: Lleva comida en bolsas sellables reutilizables. Elimina los paquetes originales en casa.",
          "Regla de las 3R: Reduce porciones, Reutiliza envases, Recicla solo en puntos autorizados.",
          "Todo lo que entra, sale: Lo que llevas contigo debe volver contigo. Pesa tu basura."
        ],
        warning: "Incluso los restos 'orgánicos' como cáscaras de fruta no pertenecen al ecosistema local."
      },
      water: {
        title: "Agua de Ríos y Lagos",
        icon: <Droplets className="w-6 h-6" />,
        content: [
          "NUNCA bebas agua sin tratar. Riesgo de bacterias, parásitos y Hanta.",
          "Métodos seguros: Hervir al menos 1 minuto (más en altura).",
          "Usa filtros de membrana (0.2 micras) o pastillas potabilizadoras."
        ]
      },
      fauna: {
        title: "Fauna Nativa",
        icon: <PawPrint className="w-6 h-6" />,
        content: [
          "No alimentar ni tocar animales. Mantén una distancia mínima de 10 metros.",
          "PROHIBIDO Mascotas: Pueden transmitir enfermedades o atacar a la fauna nativa.",
          "Ratón de cola larga: Habita en matorrales. No lo extermines, es parte del equilibrio, solo evita el contacto."
        ],
        warning: "Las mascotas son la principal amenaza para muchas especies de aves y pequeños mamíferos."
      }
    }
  },
  en: {
    title: "Zero Trace - Safe Nature",
    subtitle: "Learn to protect our environment",
    brand: "RAULIF",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    progress: "Learning Progress",
    sections: {
      cooking: {
        title: "No-Trace Cooking",
        icon: <Flame className="w-6 h-6" />,
        content: [
          "Traditional method: If you lack biodegradable soap, clean with boiling water and sand. Sand is a natural abrasive that removes grease.",
          "Recommended option: Prefer 100% biodegradable, pH-neutral, fragrance-free soaps. Use +30m from water and bury gray water.",
          "Eco-friendly toothpaste: Clay and soda-based ones are biodegradable and double as emergency dish soap due to polishing power.",
          "Future Note: Soon 'Multi-use Clean Clay' will arrive, a single product for teeth and dishes."
        ],
        warning: "Campfires can cause devastating forest fires and permanently damage organic soil."
      },
      hygiene: {
        title: "Chemical-Free Hygiene: Clay, Sand, and Water",
        icon: <Waves className="w-6 h-6" />,
        content: [
          "Why avoid soaps? Even 'bio' ones harm amphibians and aquatic insects and take decades to degrade.",
          "Simple solution: Hot water + sand + natural fiber scourer (loofah or vegetal sponge).",
          "Ideal solution: Pure clay pastes (bentonite, kaolin). Degrades in hours, non-toxic, and works as deodorant.",
          "Raulíf's Tip: I've washed dishes with sand and ash for 20 years in the forest without getting sick. Clay is the next level."
        ]
      },
      sleeping: {
        title: "Where to Sleep?",
        icon: <Tent className="w-6 h-6" />,
        content: [
          "Look for high ground and resistant surfaces (rock, gravel, dry grass).",
          "Stay away from dead trees or large branches that could fall.",
          "PROHIBITED: Riverbeds (flash floods) and unstable slopes."
        ],
        warning: "A flood can happen even if it's not raining where you are."
      },
      waste: {
        title: "Physiological Needs",
        icon: <Info className="w-6 h-6" />,
        content: [
          "Cacatubo: Use a tube with a bag to carry out waste in sensitive areas.",
          "Cat Hole: 15-20 cm hole in organic soil, 60m from water. Cover well when finished.",
          "Urine: Move at least 30 meters away from rivers and trails."
        ]
      },
      trash: {
        title: "Trash and Waste",
        icon: <Trash2 className="w-6 h-6" />,
        content: [
          "Technique: Carry food in reusable sealable bags. Remove original packaging at home.",
          "3Rs Rule: Reduce portions, Reuse containers, Recycle only at authorized points.",
          "Pack it in, Pack it out: Everything you bring must come back with you. Weigh your trash."
        ],
        warning: "Even 'organic' waste like fruit peels doesn't belong to the local ecosystem."
      },
      water: {
        title: "River and Lake Water",
        icon: <Droplets className="w-6 h-6" />,
        content: [
          "NEVER drink untreated water. Risk of bacteria, parasites, and Hanta.",
          "Safe methods: Boil for at least 1 minute.",
          "Use membrane filters (0.2 microns) or purification tablets."
        ]
      },
      fauna: {
        title: "Native Fauna",
        icon: <PawPrint className="w-6 h-6" />,
        content: [
          "Do not feed or touch animals. Maintain at least 10 meters distance.",
          "No Pets: They can transmit diseases or attack native wildlife.",
          "Long-tailed mouse: Inhabits bushes. Don't exterminate, it's part of the balance, just avoid contact."
        ],
        warning: "Pets are the main threat to many species of birds and small mammals."
      }
    }
  },
  pt: {
    title: "Rastro Zero - Natureza Segura",
    subtitle: "Aprenda a proteger o nosso ambiente",
    brand: "RAULIF",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    progress: "Progresso da aprendizagem",
    sections: {
      cooking: {
        title: "Cozinhar sem deixar rastro",
        icon: <Flame className="w-6 h-6" />,
        content: [
          "Método tradicional: Se não tiver sabão biodegradável, limpe com água a ferver e areia. A areia é um abrasivo natural eficaz.",
          "Opção recomendada: Prefira sabões 100% biodegradáveis e sem fragrâncias. Use a +30m da água e enterre a água cinzenta.",
          "Pasta de dentes ecológica: Pastas de argila são biodegradáveis e ótimas para lavar a loiça em emergências.",
          "Nota futura: Em breve surgirá a 'Argila Limpa Multiusos', um produto único para dentes e loiça."
        ],
        warning: "Fogueiras podem causar incêndios florestais devastadores e danificar o solo permanentemente."
      },
      hygiene: {
        title: "Higiene sem química: argila, areia e água",
        icon: <Waves className="w-6 h-6" />,
        content: [
          "Porquê evitar sabões? Até os 'bio' prejudicam a fauna aquática e demoram décadas a degradar-se.",
          "Solução simples: Água quente + areia + esfregão de fibras naturais (luffa ou esponja vegetal).",
          "Solução ideal: Pastas de argilas puras. Degrada-se em horas, não é tóxica e serve como desodorizante.",
          "Dica do Raulíf: Lavo loiça com areia e cinza há 20 anos na floresta sem nunca adoecer. A argila é o novo nível."
        ]
      },
      sleeping: {
        title: "Onde dormir?",
        icon: <Tent className="w-6 h-6" />,
        content: [
          "Procure terrenos elevados e superfícies resistentes.",
          "Fique longe de árvores mortas ou galhos grandes que possam cair.",
          "PROIBIDO: Leitos de rios e encostas instáveis."
        ],
        warning: "Uma inundação pode ocorrer mesmo que não esteja chovendo onde você está."
      },
      waste: {
        title: "Necessidades Fisiológicas",
        icon: <Info className="w-6 h-6" />,
        content: [
          "Cacatubo: Use um tubo com saco para levar seus dejetos em áreas sensíveis.",
          "Buraco de gato: Buraco de 15-20 cm em solo orgânico, a 60m da água.",
          "Urina: Afaste-se pelo menos 30 metros de rios e trilhas."
        ]
      },
      trash: {
        title: "Lixo e Resíduos",
        icon: <Trash2 className="w-6 h-6" />,
        content: [
          "Técnica: Leve comida em sacos reutilizáveis. Elimine as embalagens originais em casa.",
          "Regra dos 3Rs: Reduza, Reutilize, Recicle apenas em pontos autorizados.",
          "Tudo o que entra, sai: O que você traz deve voltar com você."
        ],
        warning: "Mesmo resíduos 'orgânicos' como cascas de frutas não pertencem ao ecossistema local."
      },
      water: {
        title: "Água de Rios e Lagos",
        icon: <Droplets className="w-6 h-6" />,
        content: [
          "NUNCA beba água sem tratamento. Risco de bactérias e Hanta.",
          "Métodos seguros: Ferver por pelo menos 1 minuto.",
          "Use filtros de membrana (0,2 mícrons) ou pastilhas purificadoras."
        ]
      },
      fauna: {
        title: "Fauna Nativa",
        icon: <PawPrint className="w-6 h-6" />,
        content: [
          "Não alimente nem toque nos animais. Mantenha 10 metros de distância.",
          "PROIBIDO Animais de Estimação: Podem transmitir doenças à fauna nativa.",
          "Rato de cauda longa: Habita arbustos. Não o extermine, apenas evite contato."
        ],
        warning: "Animais de estimação são a principal ameaça para muitas espécies nativas."
      }
    }
  },
  fr: {
    title: "Trace Zéro - Nature Sûre",
    subtitle: "Apprenez à protéger notre environnement",
    brand: "RAULIF",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    progress: "Progrès de l'apprentissage",
    sections: {
      cooking: {
        title: "Cuisiner sans trace",
        icon: <Flame className="w-6 h-6" />,
        content: [
          "Méthode traditionnelle : Sans savon biodégradable, nettoyez à l'eau bouillante et au sable. Le sable est un abrasif naturel parfait.",
          "Option recommandée : Préférez des savons 100% biodégradables. Utilisez-les à +30m de l'eau et enterrez les eaux grises.",
          "Dentifrice écologique : L'argile et le bicarbonate sont biodégradables et lavent aussi la vaisselle en cas d'urgence.",
          "Note future : Bientôt l'argile propre multi-usage, un seul produit pour les dents et la vaisselle."
        ],
        warning: "Les feux de camp peuvent causer des incendies de forêt dévastateurs."
      },
      hygiene: {
        title: "Hygiène sans chimie : argile, sable et eau",
        icon: <Waves className="w-6 h-6" />,
        content: [
          "Pourquoi éviter les savons ? Même les 'bio' nuisent à la faune aquatique et mettent des décennies à se dégrader.",
          "Solution simple : Eau chaude + sable + éponge végétale (luffa).",
          "Solution idéale : Pâte d'argiles pures. Se dégrade en heures, non toxique, et sert de déodorant.",
          "Conseil de Raulíf : Je lave ma vaisselle au sable et à la cendre depuis 20 ans en forêt sans jamais être malade. L'argile est l'étape suivante."
        ]
      },
      sleeping: {
        title: "Où dormir ?",
        icon: <Tent className="w-6 h-6" />,
        content: [
          "Cherchez des terrains élevés et des surfaces résistantes.",
          "Éloignez-vous des arbres morts ou des grosses branches.",
          "INTERDIT : Lits de rivières et pentes instables."
        ],
        warning: "Une crue peut survenir même s'il ne pleut pas là où vous êtes."
      },
      waste: {
        title: "Besoins Physiologiques",
        icon: <Info className="w-6 h-6" />,
        content: [
          "Cacatubo : Utilisez un tube avec sac pour emporter vos déjections.",
          "Trou de chat : Trou de 15-20 cm dans le sol organique, à 60m de l'eau.",
          "Urine : Éloignez-vous d'au moins 30 mètres des rivières et des sentiers."
        ]
      },
      trash: {
        title: "Déchets",
        icon: <Trash2 className="w-6 h-6" />,
        content: [
          "Technique : Emportez de la nourriture dans des sacs réutilisables.",
          "Règle des 3R : Réduire, Réutiliser, Recycler.",
          "Tout ce qui entre, sort : Ce que vous apportez doit repartir avec vous."
        ],
        warning: "Même les déchets 'organiques' ne font pas partie de l'écosystème local."
      },
      water: {
        title: "Eau des Rivières",
        icon: <Droplets className="w-6 h-6" />,
        content: [
          "NE JAMAIS boire d'eau non traitée. Risque de bactéries et Hanta.",
          "Méthodes sûres : Bouillir au moins 1 minute.",
          "Filtres de 0,2 microns ou comprimés de purification."
        ]
      },
      fauna: {
        title: "Faune Native",
        icon: <PawPrint className="w-6 h-6" />,
        content: [
          "Ne pas nourrir ni toucher les animaux. Distance de 10 mètres.",
          "Animaux de compagnie INTERDITS : Risque de maladies pour la faune.",
          "Rat à longue queue : Ne pas l'exterminer, c'est un maillon de l'écosystème."
        ],
        warning: "Les animaux domestiques sont une menace pour la faune sauvage."
      }
    }
  },
  de: {
    title: "Spurlos - Sichere Natur",
    subtitle: "Lernen Sie, unsere Umwelt zu schützen",
    brand: "RAULIF",
    darkMode: "Dunkelmodus",
    lightMode: "Heller Modus",
    progress: "Lernfortschritt",
    sections: {
      cooking: {
        title: "Kochen ohne Spuren",
        icon: <Flame className="w-6 h-6" />,
        content: [
          "Traditionelle Methode: Ohne Bio-Seife mit kochendem Wasser und Sand reinigen. Sand wirkt als natürliches Scheuermittel.",
          "Empfohlene Option: 100% biologisch abbaubare Seifen nutzen. +30m von Wasserquellen entfernt verwenden.",
          "Öko-Zahnpasta: Tonerde-Zahnpasta ist biologisch abbaubar und reinigt im Notfall auch Geschirr hervorragend.",
          "Ausblick: Bald gibt es 'Mehrzweck-Tonerde' für Zähne und Geschirr in einem Produkt."
        ],
        warning: "Lagerfeuer können verheerende Waldbrände verursachen."
      },
      hygiene: {
        title: "Hygiene ohne Chemie: Tonerde, Sand und Wasser",
        icon: <Waves className="w-6 h-6" />,
        content: [
          "Warum Seifen vermeiden? Auch 'Bio'-Produkte schaden Wasserlebewesen und bauen sich sehr langsam ab.",
          "Einfache Lösung: Heißes Wasser + Sand + Naturschwamm (Luffa).",
          "Ideale Lösung: Reine Tonerde-Paste. Baut sich in Stunden ab, ungiftig und als Deo nutzbar.",
          "Tipp von Raulíf: Ich wasche seit 20 Jahren im Wald mit Sand und Asche und war nie krank. Tonerde ist das nächste Level."
        ]
      },
      sleeping: {
        title: "Wo schlafen?",
        icon: <Tent className="w-6 h-6" />,
        content: [
          "Erhöhtes Gelände und widerstandsfähige Oberflächen suchen.",
          "Von toten Bäumen oder großen Ästen fernhalten.",
          "VERBOTEN: Flussbetten und instabile Hänge."
        ],
        warning: "Hochwasser kann auftreten, auch wenn es bei Ihnen nicht regnet."
      },
      waste: {
        title: "Notdurft",
        icon: <Info className="w-6 h-6" />,
        content: [
          "Cacatubo: Rohr mit Beutel für Fäkalien in sensiblen Gebieten nutzen.",
          "Katzenloch: 15-20 cm tiefes Loch, 60m vom Wasser entfernt.",
          "Urin: Mindestens 30 Meter von Flüssen und Wegen entfernen."
        ]
      },
      trash: {
        title: "Müll und Abfall",
        icon: <Trash2 className="w-6 h-6" />,
        content: [
          "Technik: Lebensmittel in Metall- oder Stoffbeuteln mitnehmen.",
          "3R-Regel: Vermeiden, Wiederverwenden, Recyceln.",
          "Alles was reinkommt, geht raus: Mitgenommenes muss zurück."
        ],
        warning: "Auch 'Bio-Abfall' wie Obstschalen gehören nicht in das Ökosystem."
      },
      water: {
        title: "Wasser aus Flüssen",
        icon: <Droplets className="w-6 h-6" />,
        content: [
          "NIEMALS unbehandeltes Wasser trinken. Hantavirus-Gefahr.",
          "Sichere Methoden: Mindestens 1 Minute kochen.",
          "Wasserfilter (0,2 Mikron) oder Entkeimungstabletten."
        ]
      },
      fauna: {
        title: "Heimische Fauna",
        icon: <PawPrint className="w-6 h-6" />,
        content: [
          "Tiere nicht füttern oder berühren. 10 Meter Abstand halten.",
          "Haustierverbot: Krankheitsgefahr für Wildtiere.",
          "Langschwanzmaus: Teil des Ökosystems, nur Kontakt vermeiden."
        ],
        warning: "Haustiere sind eine Gefahr für viele Wildtierarten."
      }
    }
  }
};

interface SectionData {
  title: string;
  icon: React.ReactNode;
  content: string[];
  warning?: string;
}

interface TranslationData {
  title: string;
  subtitle: string;
  brand: string;
  darkMode: string;
  lightMode: string;
  progress: string;
  sections: Record<string, SectionData>;
}

interface SectionCardProps {
  section: SectionData;
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  isCompleted: boolean;
  onComplete: () => void;
  t: TranslationData;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, id, isOpen, onToggle, isCompleted, onComplete, t }) => {
  return (
    <motion.div 
      layout
      className={`mb-4 overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen 
          ? 'bg-[var(--bg-secondary)] border-[var(--accent-color)] shadow-lg' 
          : 'bg-[var(--bg-secondary)] opacity-80 border-[var(--border-color)]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition-colors duration-300 ${isOpen ? 'bg-[var(--accent-color)] text-white' : 'bg-[var(--bg-primary)] text-[var(--text-secondary)]'}`}>
            {section.icon}
          </div>
          <div>
            <h3 className={`font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-[var(--accent-color)]' : 'text-[var(--text-primary)]'}`}>
              {section.title}
            </h3>
            {isCompleted && !isOpen && (
              <span className="text-xs text-[var(--accent-color)] flex items-center gap-1 opacity-80">
                <CheckCircle2 className="w-3 h-3" /> Revisado
              </span>
            )}
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-[var(--text-secondary)]" /> : <ChevronDown className="text-[var(--text-secondary)]" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 pt-0 border-t border-[var(--border-color)] mt-2">
              <ul className="space-y-3 mb-6">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {section.warning && (
                <div className="p-4 bg-[var(--warning)]/10 rounded-xl border border-[var(--warning)]/20 flex gap-3 mb-6">
                  <AlertTriangle className="w-5 h-5 text-[var(--warning)] shrink-0" />
                  <p className="text-sm text-[var(--text-primary)] opacity-90 font-medium italic">
                    {section.warning}
                  </p>
                </div>
              )}

              {!isCompleted && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onComplete();
                  }}
                  className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-xl font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> Entendido
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [lang, setLang] = useState('es');
  const [darkMode, setDarkMode] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [showSplash, setShowSplash] = useState(true);

  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    // Load progress
    const saved = localStorage.getItem('rastro-cero-progress');
    if (saved) setCompletedSections(JSON.parse(saved));

    // Load theme - Early check already handles initial class, but state needs sync
    const savedTheme = localStorage.getItem('rastro-cero-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemDark);
    }

    // Initial Lang Detection
    const browserLang = navigator.language.split('-')[0];
    if (Object.keys(translations).includes(browserLang)) {
      setLang(browserLang);
    }

    // Hide splash after 2s
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rastro-cero-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rastro-cero-theme', 'light');
    }
  }, [darkMode]);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const markComplete = (id: string) => {
    if (!completedSections.includes(id)) {
      const updated = [...completedSections, id];
      setCompletedSections(updated);
      localStorage.setItem('rastro-cero-progress', JSON.stringify(updated));
    }
    setOpenSection(null);
  };

  const progress = (completedSections.length / Object.keys(t.sections).length) * 100;

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <TreePine className="w-24 h-24 text-[var(--accent-color)] mx-auto mb-4" />
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter text-uppercase">RAULIF</h1>
          <p className="text-[10px] text-[var(--text-secondary)] font-bold mt-1 opacity-80 uppercase tracking-widest px-4">
            Próximamente: productos de aseo natural de arcilla – multiuso, cero residuos, hechos en Chile.
          </p>
          <div className="mt-4 w-12 h-1 bg-[var(--border-color)] mx-auto rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-full h-full bg-[var(--accent-color)]" 
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-[var(--accent-color)] selection:text-white">
      {/* Header handled above in multi_edit */}
      <header className="sticky top-0 z-40 bg-[var(--bg-secondary)]/80 backdrop-blur-md border-b border-[var(--border-color)]">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TreePine className="w-6 h-6 text-[var(--accent-color)]" />
            <span className="font-black text-xl tracking-tight text-[var(--accent-color)]">{t.brand}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-bold rounded-lg px-2 py-1 outline-none border border-[var(--border-color)] cursor-pointer"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="pt">PT</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[var(--border-color)]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full bg-[var(--accent-color)] ${progress === 100 ? 'bg-[var(--success)]' : ''}`}
          />
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8 pb-32">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black mb-3 tracking-tighter leading-none text-[var(--text-primary)]">
            {t.title}
          </h1>
          <p className="text-[var(--text-secondary)] font-medium">
            {t.subtitle}
          </p>
          <p className="text-[10px] text-[var(--accent-color)] font-bold mt-4 opacity-70 uppercase tracking-widest max-w-[250px] mx-auto leading-tight">
            Próximamente: productos de aseo natural de arcilla – multiuso, cero residuos, hechos en Chile.
          </p>
        </div>

        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-60">{t.progress}</span>
          <span className="text-xs font-bold text-[var(--accent-color)]">{Math.round(progress)}%</span>
        </div>

        <div className="space-y-4">
          {Object.entries(t.sections).map(([id, section]) => (
            <SectionCard 
              key={id}
              id={id}
              section={section}
              isOpen={openSection === id}
              onToggle={() => toggleSection(id)}
              isCompleted={completedSections.includes(id)}
              onComplete={() => markComplete(id)}
              t={t}
            />
          ))}
        </div>

        {/* special info card */}
        <div className="mt-12 p-6 rounded-3xl bg-[var(--accent-color)] text-white shadow-xl relative overflow-hidden">
          {/* subtle background pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:20px_20px]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Wind className="w-8 h-8" />
              <h2 className="text-2xl font-black">{lang === 'es' ? 'Dato Especial' : 'Special Fact'}</h2>
            </div>
            <p className="leading-relaxed mb-4 opacity-95">
              {lang === 'es' 
                ? 'El ratón de cola larga (Oligoryzomys longicaudatus) es vital para el bosque. Ayuda a dispersar semillas y es alimento de depredadores. No lo extermines, solo evita atraerlo manteniendo tu comida sellada.'
                : 'The long-tailed mouse (Oligoryzomys longicaudatus) is vital for the forest. It helps disperse seeds and is food for predators. Don\'t exterminate it, just avoid attracting it by keeping your food sealed.'}
            </p>
            <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full inline-block backdrop-blur-sm">
              Especie Clave • Bosque Templado
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-[var(--text-secondary)] opacity-50 text-xs pb-10">
          <p>© 2026 RAULIF. All rights reserved.</p>
          <p className="mt-2 text-uppercase">RAULIF</p>
        </footer>
      </main>

      {/* Floating Theme Toggle Button */}
      <motion.button
        title={darkMode ? t.lightMode : t.darkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 180 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-300 border-4 border-white/20"
        onClick={() => setDarkMode(!darkMode)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={darkMode ? 'dark' : 'light'}
            initial={{ y: 10, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Floating Info Button moved to bottom left */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 w-12 h-12 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full shadow-lg flex items-center justify-center z-50 border border-[var(--border-color)]"
        onClick={() => alert(t.brand + " - v1.1.0 Dark/Light Optimized PWA")}
      >
        <Smartphone className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
