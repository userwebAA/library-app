export const PREDEFINED_CATEGORIES = [
  // 📚 Littérature
  {
    name: "Roman",
    icon: "📖",
    description: "Fictions narratives de toutes longueures",
    subcategories: ["Roman contemporain", "Roman classique", "Roman historique", "Roman d'aventure"]
  },
  {
    name: "Science-Fiction", 
    icon: "🚀",
    description: "Futurisme, espace, technologies avancées",
    subcategories: ["Space opera", "Cyberpunk", "Post-apocalyptique", "Dystopie"]
  },
  {
    name: "Fantasy",
    icon: "🐉", 
    description: "Magie, créatures mythiques, mondes imaginaires",
    subcategories: ["Fantasy épique", "Fantasy urbaine", "Dark fantasy", "High fantasy"]
  },
  {
    name: "Policier & Thriller",
    icon: "🔍",
    description: "Mystères, enquêtes, suspense",
    subcategories: ["Policier classique", "Thriller psychologique", "Espionnage", "Noir"]
  },
  
  // 🎓 Sciences & Savoir
  {
    name: "Histoire",
    icon: "📚",
    description: "Événements passés, civilisations, biographies",
    subcategories: ["Histoire ancienne", "Histoire moderne", "Guerres mondiales", "Biographies"]
  },
  {
    name: "Science",
    icon: "🔬",
    description: "Découvertes, expériences, théories scientifiques",
    subcategories: ["Physique", "Biologie", "Chimie", "Mathématiques", "Astronomie"]
  },
  {
    name: "Informatique & Tech",
    icon: "💻",
    description: "Programmation, technologies numériques, IA",
    subcategories: ["Développement web", "Intelligence artificielle", "Cybersécurité", "Data science"]
  },
  
  // 🌟 Développement Personnel
  {
    name: "Développement Personnel",
    icon: "🌱",
    description: "Croissance personnelle, compétences de vie",
    subcategories: ["Productivité", "Leadership", "Communication", "Gestion du temps"]
  },
  {
    name: "Business & Entrepreneuriat",
    icon: "💼",
    description: "Gestion, marketing, création d'entreprise",
    subcategories: ["Marketing", "Finance", "Start-up", "Management"]
  },
  
  // 🎨 Arts & Culture
  {
    name: "Art & Design",
    icon: "🎨",
    description: "Créativité, esthétique, histoire de l'art",
    subcategories: ["Peinture", "Photographie", "Design graphique", "Architecture"]
  },
  {
    name: "Musique",
    icon: "🎵",
    description: "Théorie musicale, biographies d'artistes",
    subcategories: ["Histoire de la musique", "Théorie musicale", "Biographies", "Jazz"]
  },
  {
    name: "Cinéma & Théâtre",
    icon: "🎬",
    description: "Analyse de films, scénarios, histoire du cinéma",
    subcategories: ["Scénario", "Critique de film", "Histoire du cinéma", "Théâtre"]
  },
  
  // 🏃‍♂️ Lifestyle
  {
    name: "Cuisine & Gastronomie",
    icon: "🍳",
    description: "Recettes, techniques culinaires, gastronomie",
    subcategories: ["Cuisine française", "Cuisine italienne", "Pâtisserie", "Cuisine végétarienne"]
  },
  {
    name: "Sport & Bien-être",
    icon: "⚽",
    description: "Fitness, nutrition, sports divers",
    subcategories: ["Fitness", "Nutrition", "Musculation", "Yoga", "Sports collectifs"]
  },
  {
    name: "Voyage",
    icon: "✈️",
    description: "Guides de voyage, récits, découvertes",
    subcategories: ["Guides touristiques", "Récits de voyage", "Aventure", "Backpacking"]
  },
  
  // 👶 Jeunesse & Éducation
  {
    name: "Jeunesse",
    icon: "👶",
    description: "Livres pour enfants et adolescents",
    subcategories: ["Albums jeunesse", "Romans jeunesse", "BD jeunesse", "Contes et légendes"]
  },
  {
    name: "Éducation & Pédagogie",
    icon: "🎓",
    description: "Méthodes d'apprentissage, pédagogie",
    subcategories: ["Pédagogie", "Apprentissage des langues", "Éducation positive", "Soutien scolaire"]
  },
  
  // 📖 Spiritualité & Philosophie
  {
    name: "Spiritualité",
    icon: "🧘",
    description: "Méditation, développement spirituel, religions",
    subcategories: ["Méditation", "Philosophies orientales", "Développement spirituel", "Religions"]
  },
  {
    name: "Philosophie",
    icon: "🤔",
    description: "Courants philosophiques, grands penseurs",
    subcategories: ["Philosophie antique", "Philosophie moderne", "Éthique", "Métaphysique"]
  },
  
  // 🌍 Société & Actualité
  {
    name: "Sociologie",
    icon: "👥",
    description: "Étude des sociétés, comportements humains",
    subcategories: ["Sociologie urbaine", "Famille", "Travail social", "Cultures"]
  },
  {
    name: "Politique & Économie",
    icon: "🏛️",
    description: "Systèmes politiques, économie mondiale",
    subcategories: ["Économie", "Relations internationales", "Sciences politiques", "Géopolitique"]
  },
  
  // 📚 Genre Spécifiques
  {
    name: "Biographie & Mémoires",
    icon: "👤",
    description: "Vies de personnalités, autobiographies",
    subcategories: ["Biographies", "Mémoires", "Récits de vie", "Témoignages"]
  },
  {
    name: "Poésie",
    icon: "✍️",
    description: "Recueils de poèmes, anthologies",
    subcategories: ["Poésie classique", "Poésie contemporaine", "Slam", "Haïkus"]
  },
  {
    name: "Théâtre",
    icon: "🎭",
    description: "Pièces de théâtre, scénarios",
    subcategories: ["Tragédie", "Comédie", "Drame", "Théâtre contemporain"]
  },
  
  // 🏠 Pratique
  {
    name: "Bricolage & Jardinage",
    icon: "🔧",
    description: "DIY, travaux manuels, jardinage",
    subcategories: ["Bricolage", "Jardinage", "Décoration", "Rénovation"]
  },
  {
    name: "Santé & Médecine",
    icon: "⚕️",
    description: "Santé, bien-être, médecine",
    subcategories: ["Médecine générale", "Santé naturelle", "Psychologie", "Nutrition santé"]
  }
]

export const getCategoryIcon = (categoryName: string): string => {
  const category = PREDEFINED_CATEGORIES.find(cat => 
    cat.name.toLowerCase() === categoryName.toLowerCase()
  )
  return category?.icon || "📚"
}

export const getCategoryDescription = (categoryName: string): string => {
  const category = PREDEFINED_CATEGORIES.find(cat => 
    cat.name.toLowerCase() === categoryName.toLowerCase()
  )
  return category?.description || "Catégorie de livre"
}

export const getAllCategoryNames = (): string[] => {
  return PREDEFINED_CATEGORIES.map(cat => cat.name)
}

export const getCategoriesByGroup = (): Record<string, typeof PREDEFINED_CATEGORIES> => {
  return {
    "📚 Littérature": PREDEFINED_CATEGORIES.filter(cat => 
      ["Roman", "Science-Fiction", "Fantasy", "Policier & Thriller"].includes(cat.name)
    ),
    "🎓 Sciences & Savoir": PREDEFINED_CATEGORIES.filter(cat => 
      ["Histoire", "Science", "Informatique & Tech"].includes(cat.name)
    ),
    "🌟 Développement Personnel": PREDEFINED_CATEGORIES.filter(cat => 
      ["Développement Personnel", "Business & Entrepreneuriat"].includes(cat.name)
    ),
    "🎨 Arts & Culture": PREDEFINED_CATEGORIES.filter(cat => 
      ["Art & Design", "Musique", "Cinéma & Théâtre"].includes(cat.name)
    ),
    "🏃‍♂️ Lifestyle": PREDEFINED_CATEGORIES.filter(cat => 
      ["Cuisine & Gastronomie", "Sport & Bien-être", "Voyage"].includes(cat.name)
    ),
    "👶 Jeunesse & Éducation": PREDEFINED_CATEGORIES.filter(cat => 
      ["Jeunesse", "Éducation & Pédagogie"].includes(cat.name)
    ),
    "📖 Spiritualité & Philosophie": PREDEFINED_CATEGORIES.filter(cat => 
      ["Spiritualité", "Philosophie"].includes(cat.name)
    ),
    "🌍 Société & Actualité": PREDEFINED_CATEGORIES.filter(cat => 
      ["Sociologie", "Politique & Économie"].includes(cat.name)
    ),
    "📚 Genre Spécifiques": PREDEFINED_CATEGORIES.filter(cat => 
      ["Biographie & Mémoires", "Poésie", "Théâtre"].includes(cat.name)
    ),
    "🏠 Pratique": PREDEFINED_CATEGORIES.filter(cat => 
      ["Bricolage & Jardinage", "Santé & Médecine"].includes(cat.name)
    )
  }
}
