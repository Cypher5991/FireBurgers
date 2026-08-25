export const BRAND_INFO = {
  name: "Tasty",
  tagline: "The Modern Japanese Fire Grill & Burger House",
  location: "#7, Inner Market, Sector 8, Chandigarh",
  hours: "11:00 AM – 11:00 PM Daily",
  deliveryRadius: "All Chandigarh & Mohali / Panchkula border",
  counterCommitment: "Strict 6-Minute Counter-to-Hand Commitment",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  marqueeMantras: [
    "BAKED AT 5:00 AM",
    "BINCHOTAN CHARCOAL FIRE",
    "6-MINUTE COUNTER-TO-HAND",
    "JAPANESE ROBATAYAKI CRAFT",
    "HOKKAIDO SHOKUPAN BUNS",
    "MOLTEN CHEESE VOLCANO",
    "SECTOR 8 CHANDIGARH",
    "UMAMI FIRE DUST"
  ]
};

export const TOP_FEATURED_BURGERS = [
  {
    id: "volcano-burger",
    specIndex: "N° 01",
    kanji: "火山バーガー",
    name: "The Volcano Core",
    tagline: "Molten Smoked Gouda & Robata Sear",
    price: 399,
    calories: "780 kcal",
    searTemp: "300°C Robata",
    bakeTime: "5:00 AM Yudane",
    dietary: "non-veg",
    badge: "Chef's Masterpiece",
    heroImage: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=85",
    description: "Our crowning engineering triumph. A coarse-ground prime patty forged on 300°C Binchotan charcoal, concealing an explosive lava core of double-aged smoked gouda and cheddar that flows upon the first cut.",
    specs: [
      { label: "Sear Method", val: "Binchotan Charcoal" },
      { label: "Baking Technique", val: "Japanese Yudane Roux" },
      { label: "Molten Core", val: "Aged Smoked Gouda" },
      { label: "Glaze", val: "4-Hr Mirin Onion Reduction" }
    ],
    layers: [
      {
        id: "v-top-bun",
        name: "Hokkaido Shokupan Milk Crown",
        sub: "5:00 AM Yudane Bake",
        temp: "180°C Miso-Butter Glaze",
        desc: "Pillowy Japanese milk bun made with scalded flour technique for extreme softness, toasted golden with clarified miso butter.",
        icon: "🍞",
        color: "#E59866",
        offset: 140,
        highlight: "Yudane Technique"
      },
      {
        id: "v-sauce-top",
        name: "Yuzu Tare & Hydroponic Tatsoi",
        sub: "Robata Emulsion",
        temp: "Chilled 4°C",
        desc: "Velvety Big Bro house emulsion laced with Japanese Kochi yuzu zest and fresh hydroponic micro tatsoi.",
        icon: "🥬",
        color: "#E67E22",
        offset: 95,
        highlight: "Micro Greens"
      },
      {
        id: "v-cheese-core",
        name: "Molten Gouda Volcano Core",
        sub: "Signature Lava Center",
        temp: "88°C Flow State",
        desc: "Double-aged smoked gouda and sharp cheddar center with 4-hour mirin and soy caramelized onions.",
        icon: "🧀",
        color: "#F39C12",
        offset: 50,
        highlight: "88°C Lava Flow"
      },
      {
        id: "v-patty",
        name: "300°C Binchotan Prime Patty",
        sub: "Forged Over Charcoal",
        temp: "300°C Charcoal Sear",
        desc: "Coarse-ground prime beef-style blend seared over Japanese white oak Binchotan coals for deep umami crust.",
        icon: "🥩",
        color: "#784212",
        offset: 5,
        highlight: "Binchotan Char"
      },
      {
        id: "v-pickles-bottom",
        name: "Tsukemono Pickles & Shokupan Heel",
        sub: "Toasted Base Foundation",
        temp: "Toasted 160°C",
        desc: "72-hour rice vinegar & ginger Tsukemono pickled cucumbers resting on the toasted Shokupan heel.",
        icon: "🥒",
        color: "#D35400",
        offset: -40,
        highlight: "Tsukemono Crunch"
      }
    ]
  },
  {
    id: "tasty-umami",
    specIndex: "N° 02",
    kanji: "旨味バーガー",
    name: "The Tasty Umami Wagyu",
    tagline: "Binchotan Charcoal & Black Truffle Shoyu",
    price: 329,
    calories: "680 kcal",
    searTemp: "300°C Robata",
    bakeTime: "5:00 AM Yudane",
    dietary: "non-veg",
    badge: "Bestseller",
    heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
    description: "The pure distillation of Japanese Robatayaki flavor. Flame-licked prime patty, black truffle shoyu glaze, aged sharp cheddar, and 5:00 AM Shokupan bun.",
    specs: [
      { label: "Sear Method", val: "Direct Flame Robata" },
      { label: "Baking Technique", val: "Hokkaido Yudane" },
      { label: "Umami Source", val: "Black Truffle Shoyu" },
      { label: "Cheese", val: "Aged White Cheddar" }
    ],
    layers: [
      {
        id: "u-top-bun",
        name: "Toasted Sesame Shokupan Crown",
        sub: "5:00 AM Yudane Bake",
        temp: "180°C Toasted",
        desc: "Golden toasted crown dusted with organic white sesame seeds and clarified butter.",
        icon: "🍞",
        color: "#E59866",
        offset: 140,
        highlight: "Sesame Glaze"
      },
      {
        id: "u-sauce-top",
        name: "Black Truffle Shoyu Emulsion",
        sub: "Truffle Glaze",
        temp: "Chilled 4°C",
        desc: "Rich emulsion crafted with aged Japanese dark shoyu, Italian black truffle oil, and egg yolk.",
        icon: "✨",
        color: "#E67E22",
        offset: 95,
        highlight: "Truffle Shoyu"
      },
      {
        id: "u-cheese",
        name: "Aged White Cheddar Melt",
        sub: "Sharp Cheese Blanket",
        temp: "75°C Melt",
        desc: "18-month aged white cheddar melted directly over the fiery grill grate.",
        icon: "🧀",
        color: "#F39C12",
        offset: 50,
        highlight: "18-Mo Cheddar"
      },
      {
        id: "u-patty",
        name: "Charcoal Seared Wagyu-Style Patty",
        sub: "Robata Fire Crust",
        temp: "300°C Binchotan",
        desc: "Prime coarse blend with 20% marbling seared on high-heat charcoal to lock in natural juices.",
        icon: "🥩",
        color: "#784212",
        offset: 5,
        highlight: "300°C Sear"
      },
      {
        id: "u-heel",
        name: "Pickled Daikon & Shokupan Base",
        sub: "Foundation",
        temp: "Crisp Toasted",
        desc: "Sweet-sour pickled daikon radish slices with toasted base to maintain structural crunch.",
        icon: "🥢",
        color: "#D35400",
        offset: -40,
        highlight: "Daikon Crunch"
      }
    ]
  },
  {
    id: "the-firebird",
    specIndex: "N° 03",
    kanji: "火の鳥カツ",
    name: "The Firebird Tori Katsu",
    tagline: "Double Panko Crunch & Shichimi Dust",
    price: 349,
    calories: "710 kcal",
    searTemp: "High-Heat Crisp",
    bakeTime: "5:00 AM Yudane",
    dietary: "non-veg",
    badge: "Spicy High-Heat",
    heroImage: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=85",
    description: "Shatter-crispy chicken breast coated in double Japanese panko crumbs, tossed in fiery 7-spice Shichimi Togarashi dust with cool purple cabbage slaw and whipped garlic aioli.",
    specs: [
      { label: "Crumb Type", val: "Coarse Japanese Panko" },
      { label: "Spice Profile", val: "7-Spice Shichimi Togarashi" },
      { label: "Slaw Base", val: "Purple Cabbage & Yuzu" },
      { label: "Garlic Sauce", val: "Whipped Lil Bro Aioli" }
    ],
    layers: [
      {
        id: "fb-top-bun",
        name: "Shokupan Brioche Crown",
        sub: "5:00 AM Bake",
        temp: "175°C Toasted",
        desc: "Feather-light Japanese brioche crown with silky butter glaze.",
        icon: "🍞",
        color: "#E59866",
        offset: 140,
        highlight: "Brioche Crown"
      },
      {
        id: "fb-slaw",
        name: "Purple Cabbage & Yuzu Slaw",
        sub: "Cooling Slaw",
        temp: "Chilled 2°C",
        desc: "Shredded organic purple cabbage tossed in light yuzu vinaigrette for instant palate cooling.",
        icon: "🥗",
        color: "#9B59B6",
        offset: 95,
        highlight: "Yuzu Slaw"
      },
      {
        id: "fb-dust",
        name: "7-Spice Shichimi Togarashi Dust",
        sub: "Fiery Fire Dust",
        temp: "Dry Rub",
        desc: "Artisanal blend of red chili, sansho pepper, roasted orange peel, sesame, and ginger.",
        icon: "🌶️",
        color: "#E74C3C",
        offset: 50,
        highlight: "Shichimi Spice"
      },
      {
        id: "fb-patty",
        name: "Double Panko Tori Katsu Breast",
        sub: "Shatter Crisp",
        temp: "185°C Flash Fry",
        desc: "Whole chicken fillet marinated in ginger shoyu, dredged in airy Japanese panko for maximum crunch.",
        icon: "🍗",
        color: "#D35400",
        offset: 5,
        highlight: "Panko Crunch"
      },
      {
        id: "fb-heel",
        name: "Whipped Garlic Aioli & Base",
        sub: "Foundation",
        temp: "Toasted Base",
        desc: "Lil Bro roasted garlic aioli spread across the toasted Shokupan base.",
        icon: "🧄",
        color: "#F39C12",
        offset: -40,
        highlight: "Whipped Garlic"
      }
    ]
  },
  {
    id: "magic-shroom",
    specIndex: "N° 04",
    kanji: "魔法のキノコ",
    name: "Magic Shroom Robata Zen",
    tagline: "Shiitake Umami & Black Truffle Emulsion",
    price: 349,
    calories: "590 kcal",
    searTemp: "280°C Robata",
    bakeTime: "5:00 AM Yudane",
    dietary: "veg",
    badge: "Vegetarian Hero",
    heroImage: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=1000&q=85",
    description: "Crafted for discerning palates. Hand-formed patty of king oyster and roasted shiitake mushrooms, crowned with black truffle emulsion, melted Swiss emmental, and crispy shoestring shallots.",
    specs: [
      { label: "Mushroom Blend", val: "King Oyster & Shiitake" },
      { label: "Truffle Type", val: "Italian Black Truffle" },
      { label: "Crunch Layer", val: "Shoestring Crispy Shallots" },
      { label: "Cheese Melt", val: "Swiss Emmental" }
    ],
    layers: [
      {
        id: "ms-top-bun",
        name: "Herb Butter Shokupan Crown",
        sub: "5:00 AM Bake",
        temp: "180°C Glazed",
        desc: "Toasted milk bun with fine parsley and seaweed herb butter glaze.",
        icon: "🍞",
        color: "#E59866",
        offset: 140,
        highlight: "Herb Butter"
      },
      {
        id: "ms-truffle",
        name: "Black Truffle Aioli & Micro Greens",
        sub: "Earth Emulsion",
        temp: "Chilled 4°C",
        desc: "Velvety black truffle emulsion with fresh baby arugula and micro greens.",
        icon: "🌿",
        color: "#27AE60",
        offset: 95,
        highlight: "Black Truffle"
      },
      {
        id: "ms-shallots",
        name: "Crispy Shoestring Shallot Nest",
        sub: "Golden Crisps",
        temp: "170°C Crisped",
        desc: "Ultra-thin sliced shallots fried to golden crispness for textural contrast.",
        icon: "🧅",
        color: "#F39C12",
        offset: 50,
        highlight: "Shallot Crunch"
      },
      {
        id: "ms-patty",
        name: "Robata Shiitake & ShroomBean Patty",
        sub: "Charred Mushrooms",
        temp: "280°C Robata",
        desc: "Roasted king oyster, shiitake mushrooms, and black beans seared over glowing charcoal.",
        icon: "🍄",
        color: "#784212",
        offset: 5,
        highlight: "Shiitake Blend"
      },
      {
        id: "ms-heel",
        name: "Melted Emmental & Shokupan Base",
        sub: "Foundation",
        temp: "Toasted 160°C",
        desc: "Melted nutty Swiss emmental sealing the toasted Shokupan base.",
        icon: "🧀",
        color: "#D35400",
        offset: -40,
        highlight: "Swiss Emmental"
      }
    ]
  }
];

export const BURGER_LAYERS = TOP_FEATURED_BURGERS[0].layers;

export const MENU_CATEGORIES = [
  { id: "all", label: "All Items", icon: "✨" },
  { id: "burgers", label: "Robata Fire Burgers", icon: "🍔" },
  { id: "sides", label: "Sides & Bonbons", icon: "🍟" },
  { id: "combos", label: "Combo Bundles", icon: "🔥" },
  { id: "shakes", label: "Artisanal Drinks", icon: "🥤" },
  { id: "dips", label: "The 7 Dip Wall", icon: "🥫" },
];

export const MENU_ITEMS = [
  {
    id: "tasty-umami",
    category: "burgers",
    name: "The Tasty Umami Burger",
    tagline: "Japanese Robata Charcoal Masterpiece",
    price: 329,
    dietary: "non-veg",
    calories: "680 kcal",
    spiciness: 1,
    badge: "Bestseller",
    description: "Thick prime patty seared over Japanese Binchotan charcoal, 5am Hokkaido milk bun, tare glaze, crisp greens, Tsukemono pickles, melted sharp cheddar.",
    ingredients: ["Binchotan-Seared Patty", "Hokkaido Milk Bun", "Tare Umami Glaze", "Sharp Cheddar", "Tsukemono Pickles"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    pairWith: "Truffle Cloud Fries + Big Bro Dip"
  },
  {
    id: "volcano-burger",
    category: "burgers",
    name: "The Volcano Burger",
    tagline: "Explosive Molten Cheese Center",
    price: 399,
    dietary: "non-veg",
    calories: "780 kcal",
    spiciness: 2,
    badge: "Chef's Signature",
    description: "Flame-crusted thick patty loaded with a molten smoked gouda and cheddar lava center, 4-hour mirin caramelized onions, and Big Bro yuzu tare sauce.",
    ingredients: ["Molten Cheese Core", "Robata Patty", "Mirin Onions", "Big Bro Sauce", "Shokupan Glaze"],
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    pairWith: "Mozza Pull + Ghost Habanero Dip"
  },
  {
    id: "the-firebird",
    category: "burgers",
    name: "The Firebird (Tori Katsu)",
    tagline: "Shatter-Crispy Chicken & Shichimi Dust",
    price: 349,
    dietary: "non-veg",
    calories: "710 kcal",
    spiciness: 3,
    badge: "Spicy High-Heat",
    description: "Double buttermilk panko fried chicken tossed in fiery Japanese Shichimi togarashi fire dust, purple cabbage slaw, pickles & Lil Bro whipped garlic.",
    ingredients: ["Panko-Crunch Chicken", "Shichimi Fire Dust", "Cool Purple Slaw", "Lil Bro Garlic", "Pickled Jalapeños"],
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    pairWith: "Citrus Fire Cooler + Sweet Beet Balsamic"
  },
  {
    id: "magic-shroom",
    category: "burgers",
    name: "Magic Shroom Burger",
    tagline: "Shiitake & Truffle Umami Vegetarian Perfection",
    price: 349,
    dietary: "veg",
    calories: "590 kcal",
    spiciness: 1,
    badge: "Vegetarian Hero",
    description: "Handcrafted ShroomBean patty with roasted king oyster & shiitake mushrooms, black truffle emulsion, crispy shoestring onions, and melted Swiss emmental.",
    ingredients: ["Shiitake & ShroomBean Patty", "Black Truffle Mayo", "Crispy Onions", "Swiss Emmental", "Hokkaido Bun"],
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    pairWith: "Truffle Mayo Dip + Biscoff Brûlée Shake"
  },
  {
    id: "falafel-smash",
    category: "burgers",
    name: "Falafel Smash",
    tagline: "Crispy Lacy Edges & Sesame Tahini",
    price: 289,
    dietary: "veg",
    calories: "520 kcal",
    spiciness: 1,
    badge: "Craft Vegetarian",
    description: "Coarsely crushed spiced chickpea & herb patty smashed ultra-thin for lacy crispy edges, drizzled with nutty roasted sesame tahini and sumac onions.",
    ingredients: ["Smashed Falafel Patty", "Sesame Tahini", "Sumac Onions", "Mint Labneh", "Toasted Bun"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    pairWith: "Volcano Bonbons + Herb Tahini Dip"
  },
  {
    id: "volcano-bonbons",
    category: "sides",
    name: "Volcano Bonbons (6 pcs)",
    tagline: "Cheesy Molten Panko Explosions",
    price: 269,
    dietary: "veg",
    calories: "410 kcal",
    spiciness: 1,
    badge: "Addictive Snack",
    description: "Golden Japanese panko-crusted bonbons stuffed with molten three-cheese blend, jalapeño bits, served piping hot with Lil Bro dip.",
    ingredients: ["Three-Cheese Core", "Japanese Panko", "Jalapeño", "Lil Bro Garlic"],
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
    prepTime: "4 mins",
    pairWith: "Big Bro Sauce"
  },
  {
    id: "mozza-pull",
    category: "sides",
    name: "Mozza Pull Sticks (4 pcs)",
    tagline: "Epic Stretch Premium Mozzarella",
    price: 199,
    dietary: "veg",
    calories: "360 kcal",
    spiciness: 0,
    badge: "High Stretch",
    description: "Artisanal mozzarella sticks in light panko crumb crust, engineered for the ultimate molten cheese pull.",
    ingredients: ["Aged Mozzarella", "Panko Crumb", "Shichimi Dust"],
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80",
    prepTime: "4 mins",
    pairWith: "Sweet Beet Balsamic"
  },
  {
    id: "ghost-mango-wings",
    category: "sides",
    name: "Ghost Mango Lacquered Wings (6 pcs)",
    tagline: "Spicy-Sweet Robata Lacquered Wings",
    price: 299,
    dietary: "non-veg",
    calories: "580 kcal",
    spiciness: 3,
    badge: "Spicy Glory",
    description: "Crispy jumbo wings glazed in a reduction of Alphonso mango puree, Japanese mirin, and Bhut Jolokia ghost pepper honey glaze.",
    ingredients: ["Crispy Wings", "Ghost Pepper Glaze", "Alphonso Mango", "Toasted White Sesame"],
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 mins",
    pairWith: "Lil Bro Garlic Dip"
  },
  {
    id: "truffle-cloud-fries",
    category: "sides",
    name: "Truffle Cloud Fries",
    tagline: "Hand-Cut Double-Fried Perfection",
    price: 179,
    dietary: "veg",
    calories: "380 kcal",
    spiciness: 0,
    badge: "Must-Try",
    description: "Crispy double-cooked skin-on potatoes dusted with white truffle oil, shaved parmesan snow, nori flakes, and sea salt.",
    ingredients: ["Russet Potatoes", "White Truffle Oil", "Nori Flakes", "Sea Salt"],
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80",
    prepTime: "3 mins",
    pairWith: "Truffle Mayo Dip"
  },
  {
    id: "biscoff-brulee-shake",
    category: "shakes",
    name: "Biscoff Brûlée Shake",
    tagline: "Caramelized Lotus Biscoff Decadence",
    price: 199,
    dietary: "veg",
    calories: "450 kcal",
    spiciness: 0,
    badge: "Dessert Legend",
    description: "Thick whole milk gelato blended with Lotus Biscoff butter, topped with torch-caramelized sugar brûlée cap and biscuit crumble.",
    ingredients: ["Artisanal Gelato", "Lotus Biscoff", "Torched Sugar Cap", "Whipped Cream"],
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    prepTime: "3 mins",
    pairWith: "Any Robata Burger"
  },
  {
    id: "citrus-fire-cooler",
    category: "shakes",
    name: "Yuzu Citrus Fire Cooler",
    tagline: "Japanese Yuzu, Blood Orange & Jalapeño Fizz",
    price: 149,
    dietary: "veg",
    calories: "120 kcal",
    spiciness: 1,
    badge: "Refreshing",
    description: "Fresh Japanese Kochi yuzu extract, blood orange juice, sparkling soda, and a subtle flame-tinged jalapeño aroma mist.",
    ingredients: ["Japanese Yuzu", "Blood Orange", "Sparkling Soda", "Smoked Jalapeño Mist"],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    prepTime: "2 mins",
    pairWith: "The Firebird"
  },
  {
    id: "smoked-berry-fizz",
    category: "shakes",
    name: "Smoked Wild Berry Fizz",
    tagline: "Muddled Berries & Hinoki Smoke",
    price: 159,
    dietary: "veg",
    calories: "135 kcal",
    spiciness: 0,
    badge: "Botanical",
    description: "Muddled wild berries, fresh mint, craft tonic, and glass captured with aromatic wood smoke aroma.",
    ingredients: ["Wild Berries", "Fresh Mint", "Craft Tonic", "Wood Smoke"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    prepTime: "2 mins",
    pairWith: "The Tasty Umami"
  },
  {
    id: "bundle-noon-fire",
    category: "combos",
    name: "The Noon Fire Combo",
    tagline: "Quick Robata Power Lunch For One",
    price: 499,
    dietary: "non-veg",
    calories: "920 kcal",
    spiciness: 2,
    badge: "Save ₹129",
    description: "Choice of any signature burger + Truffle Cloud Fries + Yuzu Cooler + 1 House Dip.",
    ingredients: ["1 Signature Burger", "Truffle Cloud Fries", "1 Cooler Drink", "1 Dip of Choice"],
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    pairWith: "Perfect for lunch"
  },
  {
    id: "bundle-fire-combo",
    category: "combos",
    name: "The Fire Combo (Meal)",
    tagline: "Ultimate Solo Robata Feast",
    price: 649,
    dietary: "non-veg",
    calories: "1250 kcal",
    spiciness: 2,
    badge: "Save ₹179",
    description: "The Volcano Burger + Truffle Cloud Fries + Biscoff Brûlée Shake + Volcano Bonbons (3 pcs) + 2 Dips.",
    ingredients: ["The Volcano Burger", "Truffle Cloud Fries", "Biscoff Shake", "3 Bonbons", "2 House Dips"],
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 mins",
    pairWith: "Chef Recommended"
  },
  {
    id: "bundle-the-sharer",
    category: "combos",
    name: "The Sector 8 Sharer Box",
    tagline: "Grand Japanese Fire Feast for 2 to 3",
    price: 999,
    dietary: "non-veg",
    calories: "2100 kcal",
    spiciness: 2,
    badge: "Save ₹319",
    description: "2 Robata Fire Burgers of your choice + Full Volcano Bonbon Box (6 pcs) + Truffle Cloud Fries + 2 Coolers or Shakes + 3 Dip Wall Sauces.",
    ingredients: ["2 Burgers", "6 Bonbons", "Truffle Fries", "2 Drinks", "3 Dip Sauces"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    prepTime: "8 mins",
    pairWith: "Car-hop & Group Favorite"
  }
];

export const DIP_WALL = [
  {
    id: "big-bro",
    name: "Big Bro Dip",
    tag: "Smoky Yuzu Tare Emulsion",
    price: 49,
    color: "#E65100",
    bgGradient: "from-orange-600 to-amber-700",
    description: "Our legendary house emulsion laced with smoked chipotle, charred Japanese scallions, yuzu vinegar, and coarse black pepper.",
    pairings: ["The Tasty Umami Burger", "Truffle Cloud Fries", "Volcano Bonbons"],
    radar: {
      umami: 95,
      heat: 65,
      acidity: 75,
      sweetness: 40,
      smoke: 90
    }
  },
  {
    id: "lil-bro",
    name: "Lil Bro Dip",
    tag: "Whipped Cloud Garlic",
    price: 49,
    color: "#FFF9C4",
    bgGradient: "from-amber-200 to-yellow-400",
    description: "Ultra-silky aerated garlic toum whipped with sea salt, cold-pressed sesame oil, and a touch of Kochi yuzu zest.",
    pairings: ["The Firebird", "Ghost Mango Wings", "Mozza Pull"],
    radar: {
      umami: 80,
      heat: 20,
      acidity: 50,
      sweetness: 30,
      smoke: 10
    }
  },
  {
    id: "truffle-mayo",
    name: "Truffle Miso Mayo",
    tag: "Earthy · Shiitake · Velvety",
    price: 69,
    color: "#3E2723",
    bgGradient: "from-amber-900 to-stone-800",
    description: "Cage-free egg yolk emulsion blended with Italian black truffle paste, white miso, and toasted sesame oil.",
    pairings: ["Magic Shroom Burger", "Truffle Cloud Fries", "Robata Steak Patty"],
    radar: {
      umami: 100,
      heat: 10,
      acidity: 40,
      sweetness: 25,
      smoke: 35
    }
  },
  {
    id: "ghost-habanero",
    name: "Ghost Togarashi",
    tag: "High-Intensity Fire",
    price: 49,
    color: "#D50000",
    bgGradient: "from-red-600 to-orange-700",
    description: "Fermented Bhut Jolokia and Japanese Shichimi Togarashi balanced with wild honey, smoked lime juice, and roasted garlic.",
    pairings: ["The Firebird", "Volcano Burger", "Lacquered Wings"],
    radar: {
      umami: 70,
      heat: 100,
      acidity: 80,
      sweetness: 45,
      smoke: 80
    }
  },
  {
    id: "sweet-beet",
    name: "Sweet Beet Umeboshi",
    tag: "Tangy · Ruby Plum · Vibrant",
    price: 49,
    color: "#880E4F",
    bgGradient: "from-pink-800 to-purple-900",
    description: "Slow-roasted beet purée infused with Japanese Umeboshi plum glaze, cracked peppercorns, and ginger.",
    pairings: ["Falafel Smash", "Mozza Pull Sticks", "Magic Shroom"],
    radar: {
      umami: 60,
      heat: 15,
      acidity: 90,
      sweetness: 85,
      smoke: 20
    }
  },
  {
    id: "smoky-mustard",
    name: "Smoky Wasabi Mustard",
    tag: "Pungent · Wasabi · Deep",
    price: 49,
    color: "#F57F17",
    bgGradient: "from-yellow-600 to-amber-800",
    description: "Whole-grain mustard steeped in Binchotan wood smoke, fresh grated Shizuoka wasabi, and blossom honey.",
    pairings: ["The Tasty Umami", "Steak Patties", "Cloud Fries"],
    radar: {
      umami: 80,
      heat: 65,
      acidity: 80,
      sweetness: 45,
      smoke: 85
    }
  },
  {
    id: "herb-tahini",
    name: "Toasted Sesame Herb Tahini",
    tag: "Nutty · Roasted Sesame · Bright",
    price: 49,
    color: "#1B5E20",
    bgGradient: "from-emerald-700 to-teal-900",
    description: "Silky roasted sesame paste blended with fresh shiso, coriander, roasted cumin, and yuzu lime.",
    pairings: ["Falafel Smash", "Volcano Bonbons", "Grilled Shrooms"],
    radar: {
      umami: 85,
      heat: 25,
      acidity: 65,
      sweetness: 30,
      smoke: 30
    }
  }
];

export const FULFILLMENT_MODES = [
  {
    id: "curbside",
    name: "In-Car Curbside Hop",
    subtext: "Sector 8 Inner Market Parking Delivery",
    icon: "🚗",
    badge: "Chandigarh Special",
    desc: "Park in Sector 8 inner market. Our team brings piping hot food directly to your car window."
  },
  {
    id: "takeaway",
    name: "Takeaway Express",
    subtext: "Ready in 6 mins at counter",
    icon: "⚡",
    badge: "Zero Waiting",
    desc: "Grab and go from our Japanese Robata fire counter at #7 Inner Market, Sector 8."
  },
  {
    id: "delivery",
    name: "Doorstep Delivery",
    subtext: "Chandigarh, Mohali, Panchkula",
    icon: "🛵",
    badge: "Thermal Sealed",
    desc: "Delivered in temperature-controlled thermal boxes within 25-35 minutes."
  },
  {
    id: "dinein",
    name: "Dine-In Table QR",
    subtext: "Counter & High-Top Seating",
    icon: "🍽️",
    badge: "Instant Fire",
    desc: "Order directly to your table number inside our modern fire grill house."
  }
];
