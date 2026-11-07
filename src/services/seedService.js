import Member from "../models/Member.js";
import Resource from "../models/Resource.js";
import Event from "../models/Event.js";

/**
 * Données officielles initiales pour le Bureau Exécutif et CCI
 */
export const INITIAL_MEMBERS = [
  {
    name: "Arnold Wesley AKINA",
    role: "Président Fondateur",
    roleEn: "Founding President",
    category: "bureau",
    roleColor: "bg-accent text-white",
    description: "Visionnaire et leader engagé pour le développement économique du Congo.",
    descriptionEn: "Visionary leader committed to the economic empowerment and regional integration of Congo.",
    image: "/assets/members/president-new.jpg",
    order: 1,
    isActive: true,
  },
  {
    name: "Igor Theogene NDINGA",
    role: "Vice-Président",
    roleEn: "Vice President",
    category: "bureau",
    roleColor: "bg-accent text-white",
    description: "Chargé du développement économique, des partenariats privés et des Investissements.",
    descriptionEn: "In charge of economic development, private partnerships, and strategic investments.",
    image: "/assets/members/vice-president.jpg",
    order: 2,
    isActive: true,
  },
  {
    name: "Rachel NGUILI AKANDA",
    role: "Vice-Présidente",
    roleEn: "Vice President",
    category: "bureau",
    roleColor: "bg-accent text-white",
    description: "Chargée de l'agriculture, l'industrie et le développement de partenariats avec les PME.",
    descriptionEn: "In charge of agriculture, industry, and accelerating SME partnerships.",
    image: "/assets/members/vice-presidente.jpg",
    order: 3,
    isActive: true,
  },
  {
    name: "Makoumbou Laurensaint",
    role: "Secrétaire Général",
    roleEn: "Secretary General",
    category: "bureau",
    roleColor: "bg-green-600 text-white",
    description: "Coordination stratégique et gestion des opérations de la CDECO.",
    descriptionEn: "Strategic coordination and operational management of CDECO.",
    image: "/assets/members/secretaire-new.jpg",
    order: 4,
    isActive: true,
  },
  {
    name: "Grace BOUSSIMANITOU BENAZO",
    role: "Chargée de Communication",
    roleEn: "Communications Officer",
    category: "bureau",
    roleColor: "bg-primary/80 text-white",
    description: "Chargée de la communication et des relations avec les Médias.",
    descriptionEn: "In charge of corporate communications and international media relations.",
    image: "/assets/members/communication.jpg",
    order: 5,
    isActive: true,
  },
  {
    name: "Dakar Boteba",
    role: "Trésorière",
    roleEn: "Treasurer",
    category: "bureau",
    roleColor: "bg-primary/80 text-white",
    description: "Gestion financière rigoureuse et transparente de l'organisation.",
    descriptionEn: "Rigorous financial oversight and organizational transparency.",
    image: "/assets/members/tresoriere-new.jpg",
    order: 6,
    isActive: true,
  },
  {
    name: "Steve Patrick MBOUKOU",
    role: "Directeur KAMPUS CDECO",
    roleEn: "Director of KAMPUS CDECO",
    category: "bureau",
    roleColor: "bg-primary/80 text-white",
    description: "Chargé de l'entrepreneuriat des jeunes et Directeur du Centre KAMPUS CDECO.",
    descriptionEn: "In charge of youth entrepreneurship and Director of KAMPUS CDECO Center.",
    image: "/assets/members/directeur-kampus.jpg",
    order: 7,
    isActive: true,
  },
  // Comité Consultatif International (CCI)
  {
    name: "NAJIB BREDAA",
    role: "Directeur Relations Diplomatiques",
    roleEn: "Director of Diplomatic Relations",
    category: "cci",
    roleColor: "bg-primary text-white",
    description: "Directeur des relations diplomatiques et bilatérales.",
    descriptionEn: "Director of diplomatic and bilateral relations.",
    image: "/assets/members/cci-najib.jpg",
    order: 8,
    isActive: true,
  },
  {
    name: "Deve MABOUNGOU",
    role: "Directeur Intelligence Économique",
    roleEn: "Director of Economic Intelligence",
    category: "cci",
    roleColor: "bg-primary text-white",
    description: "Directeur de l'Intelligence Économique et des stratégies d'influence à l'international.",
    descriptionEn: "Director of Economic Intelligence and international influence strategies.",
    image: "/assets/members/cci-deve.jpg",
    order: 9,
    isActive: true,
  },
  {
    name: "Dr Arsène TATSAZEU-KENFACK",
    role: "Directeur Affaires Éducatives",
    roleEn: "Director of Educational Affairs",
    category: "cci",
    roleColor: "bg-primary text-white",
    description: "Directeur des Affaires éducatives, scientifiques et Culturelles avec l'Amérique latine.",
    descriptionEn: "Director of Educational, Scientific and Cultural Affairs with Latin America.",
    image: "/assets/members/cci-arsene.jpg",
    order: 10,
    isActive: true,
  },
  {
    name: "Amina ONDZE",
    role: "Directrice Relations Institutionnelles",
    roleEn: "Director of Institutional Relations",
    category: "cci",
    roleColor: "bg-primary text-white",
    description: "Directrice des relations institutionnelles à l'international.",
    descriptionEn: "Director of international institutional relations.",
    image: "/assets/members/cci-amina.jpg",
    order: 11,
    isActive: true,
  },
];

/**
 * Données officielles initiales pour les Ressources / Documents PDF
 */
export const INITIAL_RESOURCES = [
  {
    title: "Présentation de la CDECO",
    titleEn: "CDECO Institutional Presentation",
    description: "Document de présentation globale de la Chambre de Diplomatie Économique du Congo.",
    descriptionEn: "Comprehensive institutional presentation of the Chamber of Economic Diplomacy of Congo.",
    fileUrl: "/documents/presentation-cdeco.pdf",
    fileSize: "PDF 2.4 Mo",
    category: "guide",
    order: 1,
    isActive: true,
  },
  {
    title: "Charte Fondatrice de la CDECO",
    titleEn: "CDECO Founding Charter",
    description: "Charte de déontologie, d'éthique et missions fondatrices de la CDECO.",
    descriptionEn: "Founding charter of ethics, governance, and strategic missions of CDECO.",
    fileUrl: "/documents/charte-cdeco.pdf",
    fileSize: "PDF 1.8 Mo",
    category: "texte",
    order: 2,
    isActive: true,
  },
  {
    title: "CCN & CCI-CDECO",
    titleEn: "CCN & CCI-CDECO Guidelines",
    description: "Document d'orientation du Comité Consultatif International de la CDECO.",
    descriptionEn: "Strategic framework document of the International Advisory Committee of CDECO.",
    fileUrl: "/documents/ccn-cci-cdeco.pdf",
    fileSize: "PDF 1.5 Mo",
    category: "rapport",
    order: 3,
    isActive: true,
  },
];

/**
 * Données officielles initiales pour les Événements
 */
export const INITIAL_EVENTS = [
  {
    title: "Forum Économique Congo-Europe 2025",
    titleEn: "Congo-Europe Economic Forum 2025",
    category: "upcoming",
    date: "15-17 Mars 2025",
    dateEn: "March 15-17, 2025",
    location: "Brazzaville, Congo",
    locationEn: "Brazzaville, Congo",
    type: "Forum",
    typeEn: "Forum",
    typeColor: "bg-primary",
    description: "Rencontre stratégique entre investisseurs européens et acteurs économiques congolais pour explorer les opportunités de partenariat.",
    descriptionEn: "Strategic summit connecting European investors and Congolese economic stakeholders to explore high-impact partnership opportunities.",
    attendees: "200+ participants attendus",
    attendeesEn: "200+ attendees expected",
    order: 1,
    isActive: true,
  },
  {
    title: "Séminaire PME/PMI : Accès aux Marchés Internationaux",
    titleEn: "SME Seminar: Global Market Access",
    category: "upcoming",
    date: "5 Avril 2025",
    dateEn: "April 5, 2025",
    location: "Pointe-Noire, Congo",
    locationEn: "Pointe-Noire, Congo",
    type: "Formation",
    typeEn: "Training",
    typeColor: "bg-cdeco-green",
    description: "Formation intensive sur les stratégies d'internationalisation pour les petites et moyennes entreprises congolaises.",
    descriptionEn: "Intensive executive training on export strategies and trade compliance for Congolese small and medium enterprises.",
    attendees: "50 places disponibles",
    attendeesEn: "50 seats available",
    order: 2,
    isActive: true,
  },
  {
    title: "Mission B2B : Secteur Agricole",
    titleEn: "B2B Trade Mission: Agriculture",
    category: "upcoming",
    date: "20-25 Mai 2025",
    dateEn: "May 20-25, 2025",
    location: "Abidjan, Côte d'Ivoire",
    locationEn: "Abidjan, Ivory Coast",
    type: "Mission",
    typeEn: "Mission",
    typeColor: "bg-accent",
    description: "Mission commerciale pour connecter les producteurs congolais avec les importateurs et distributeurs ivoiriens.",
    descriptionEn: "High-level trade mission linking Congolese producers with Ivorian distributors and agribusiness investors.",
    attendees: "30 entreprises sélectionnées",
    attendeesEn: "30 selected enterprises",
    order: 3,
    isActive: true,
  },
  {
    title: "Conférence Annuelle CDECO 2025",
    titleEn: "CDECO Annual Summit 2025",
    category: "upcoming",
    date: "12-14 Juillet 2025",
    dateEn: "July 12-14, 2025",
    location: "Brazzaville, Congo",
    locationEn: "Brazzaville, Congo",
    type: "Conférence",
    typeEn: "Conference",
    typeColor: "bg-primary",
    description: "Bilan annuel et perspectives pour la diplomatie économique congolaise. Présentation des nouveaux programmes d'accompagnement.",
    descriptionEn: "Annual review and strategic outlook for Congolese economic diplomacy. Launch of new SME acceleration programs.",
    attendees: "300+ participants",
    attendeesEn: "300+ participants",
    order: 4,
    isActive: true,
  },
  {
    title: "Forum Économique Paris-Brazzaville",
    titleEn: "Paris-Brazzaville Economic Forum",
    category: "highlight",
    date: "18-20 Septembre 2024",
    dateEn: "September 18-20, 2024",
    location: "Paris, France",
    locationEn: "Paris, France",
    type: "Forum International",
    typeEn: "International Forum",
    typeColor: "bg-primary",
    description: "Rencontre de haut niveau réunissant des délégations officielles, des chefs d'entreprises et des investisseurs pour promouvoir le climat des affaires au Congo.",
    descriptionEn: "High-level summit bringing together official delegations, business leaders, and private equity investors to promote Congo's investment climate.",
    impact: "12 accords bilatéraux initiés",
    impactEn: "12 bilateral preliminary agreements",
    order: 5,
    isActive: true,
  },
  {
    title: "Délégation Économique OCDE",
    titleEn: "OECD Economic Delegation",
    category: "highlight",
    date: "5 Juin 2024",
    dateEn: "June 5, 2024",
    location: "Siège de l'OCDE, Paris",
    locationEn: "OECD Headquarters, Paris",
    type: "Diplomatie",
    typeEn: "Diplomacy",
    typeColor: "bg-accent",
    description: "Sessions de travail avec les représentants de l'OCDE sur la transparence financière et les incitations aux investissements durables en Afrique centrale.",
    descriptionEn: "Working sessions with OECD representatives on financial governance and sustainable investment incentives in Central Africa.",
    impact: "Partenariat stratégique renforcé",
    impactEn: "Strengthened strategic partnership",
    order: 6,
    isActive: true,
  },
  {
    title: "Conférence Internationale IEFA",
    titleEn: "IEFA International Conference",
    category: "highlight",
    date: "12 Novembre 2024",
    dateEn: "November 12, 2024",
    location: "Paris, France",
    locationEn: "Paris, France",
    type: "Conférence",
    typeEn: "Conference",
    typeColor: "bg-cdeco-green",
    description: "Présentation des corridors logistiques et des opportunités d'infrastructures énergétiques au Congo auprès de fonds d'investissement mondiaux.",
    descriptionEn: "Showcase of strategic transport corridors and energy infrastructure opportunities in Congo to global infrastructure funds.",
    impact: "Visibilité accrue auprès des bailleurs",
    impactEn: "Enhanced global investor visibility",
    order: 7,
    isActive: true,
  },
  {
    title: "Sommet PME & Climat des Affaires 2024",
    titleEn: "SME & Business Climate Summit 2024",
    category: "past",
    date: "10-12 Octobre 2024",
    dateEn: "October 10-12, 2024",
    location: "Brazzaville, Congo",
    locationEn: "Brazzaville, Congo",
    type: "Sommet National",
    typeEn: "National Summit",
    typeColor: "bg-primary",
    description: "Grand rassemblement des PME et PMI congolaises avec les ministères économiques et les bailleurs multilatéraux pour faciliter l'accès aux financements.",
    descriptionEn: "Major gathering of Congolese SMEs with economic ministries and multilateral development banks to unlock structured growth financing.",
    attendees: "250+ entreprises participantes",
    attendeesEn: "250+ participating companies",
    order: 8,
    isActive: true,
  },
  {
    title: "Table Ronde Investissements Verts",
    titleEn: "Green Investments Roundtable",
    category: "past",
    date: "15 Juin 2024",
    dateEn: "June 15, 2024",
    location: "Pointe-Noire, Congo",
    locationEn: "Pointe-Noire, Congo",
    type: "Table Ronde",
    typeEn: "Roundtable",
    typeColor: "bg-cdeco-green",
    description: "Échanges ciblés sur le financement des projets éco-responsables, la gestion durable des forêts et la transition énergétique en République du Congo.",
    descriptionEn: "Focused dialogues on climate finance, sustainable forestry management, and the energy transition in the Republic of Congo.",
    attendees: "80 experts et dirigeants",
    attendeesEn: "80 industry experts and executives",
    order: 9,
    isActive: true,
  },
];

/**
 * Fonction d'amorçage automatique des collections vides
 */
export const seedInitialData = async () => {
  try {
    const memberCount = await Member.countDocuments();
    if (memberCount === 0) {
      await Member.insertMany(INITIAL_MEMBERS);
      console.log(`[CDECO SEED] ${INITIAL_MEMBERS.length} membres officiels insérés dans MongoDB.`);
    }

    const resourceCount = await Resource.countDocuments();
    if (resourceCount === 0) {
      await Resource.insertMany(INITIAL_RESOURCES);
      console.log(`[CDECO SEED] ${INITIAL_RESOURCES.length} ressources officielles insérées dans MongoDB.`);
    }

    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(INITIAL_EVENTS);
      console.log(`[CDECO SEED] ${INITIAL_EVENTS.length} événements officiels insérés dans MongoDB.`);
    }
  } catch (error) {
    console.error("[CDECO SEED] Erreur lors de l'amorçage des données :", error.message);
  }
};

export default seedInitialData;

