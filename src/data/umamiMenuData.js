// UMAMI Canonical Menu Data & Brand Info
// Based on UMAMI_Website_Content_Pack.md (v1.0)

export const UMAMI_BRAND_INFO = {
  name: 'UMAMI',
  japaneseName: '旨味',
  tagline: 'Japanese Fire-Grilled Burgers',
  subheading: 'Thick fire-grilled burgers on Hokkaido milk buns baked in-house each morning.',
  description: 'Japanese fire-grilled burgers on Hokkaido milk buns baked in-house daily. A counter kitchen in Sector 8B, Chandigarh.',
  address: 'Booth No. 7, Inner Market, Sector 8B, Chandigarh 160018, India',
  locality: 'Sector 8B',
  city: 'Chandigarh',
  postalCode: '160018',
  country: 'IN',
  phone: '+91 98888 77777',
  whatsapp: '+91 98888 77777',
  fssaiLicense: '10826999000123',
  gstin: '04AABCN1234F1Z5',
  email: 'hello@umamifire.com',
  pressEmail: 'press@umamifire.com',
  website: 'https://umamifire.com',
  instagram: 'https://instagram.com/umamifirechd',
  googleMapsUrl: 'https://maps.google.com/?q=Booth+7+Inner+Market+Sector+8B+Chandigarh+160018',
  openingDate: '2026-10-01',
  openingDateFormatted: '1 October 2026',
  openingHours: '11:00 AM - 11:00 PM Daily',
  entity: 'Nimantrit Foods',
  showPrices: false // Pre-launch costing mode
};

export const UMAMI_MENU_SECTIONS = [
  { id: 'burgers', title: 'Burgers', subtitle: 'Thick, fire-grilled, on a milk bun we bake at dawn.' },
  { id: 'bombs', title: 'Molten Bombs', subtitle: 'Break one open. The middle is lava.' },
  { id: 'fries', title: 'Loaded Fries', subtitle: 'Loaded, not shy.' },
  { id: 'wings', title: 'Wings', subtitle: 'Over the fire, or lacquered in glaze.' },
  { id: 'shakes', title: 'Shakes', subtitle: 'Thick enough to stand a spoon in.' },
  { id: 'drinks', title: 'Drinks', subtitle: 'Smoky, clarified, and built on ice.' },
  { id: 'dessert', title: 'Dessert', subtitle: 'Warm glaze, dark chocolate layers.' },
  { id: 'dips', title: 'The Dip Wall', subtitle: '7 proprietary house emulsions.' },
];

export const UMAMI_MENU_ITEMS = [
  // 1. BURGERS
  {
    id: 'firebird',
    sectionId: 'burgers',
    name: 'Firebird',
    protein: 'Chicken',
    dietary: 'non-veg',
    tagline: 'The one everything else answers to.',
    description: 'A thick chicken patty grilled hard over open flame till the edges char, layered with melting cheese, our umami sauce and slow-caramelised onion.',
    ingredients: ['Open-flame grilled chicken patty', 'Melting cheese', 'House umami sauce', 'Slow-caramelised onion', '5:00 AM Hokkaido milk bun'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    pairWith: 'Big Bro Yuzu Tare',
    calories: '680 kcal',
    prepTime: '6 mins',
    price: null,
  },
  {
    id: 'volcano',
    sectionId: 'burgers',
    name: 'Volcano',
    protein: 'Chicken',
    dietary: 'non-veg',
    badge: 'Molten Core',
    tagline: 'Cut it and it pours, hot and slow, across the plate.',
    description: 'A fire-grilled chicken patty built around a molten cheese core. Cut it and it pours, hot and slow, across the plate.',
    ingredients: ['Molten smoked gouda core', 'Coarse ground fire-grilled chicken', 'Binchotan flame char', 'House pickled cucumbers', '5:00 AM Hokkaido milk bun'],
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80',
    pairWith: 'Black Gold Truffle',
    calories: '740 kcal',
    prepTime: '6 mins',
    price: null,
  },
  {
    id: 'magic-shroom',
    sectionId: 'burgers',
    name: 'Magic Shroom',
    protein: 'Paneer & Mushroom',
    dietary: 'veg',
    tagline: 'Deep, earthy, a little magic.',
    description: 'A seared paneer-mushroom patty under a pile of garlic-butter mushrooms, smoky BBQ up top, cool truffle cream below.',
    ingredients: ['Seared paneer-mushroom patty', 'Garlic-butter sautéed mushrooms', 'Smoky BBQ reduction', 'Cool truffle cream', '5:00 AM Hokkaido milk bun'],
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80',
    pairWith: 'Toum Aioli',
    calories: '610 kcal',
    prepTime: '6 mins',
    price: null,
  },
  {
    id: 'mutton-steak',
    sectionId: 'burgers',
    name: 'Mutton Steak',
    protein: 'Prime Mutton',
    dietary: 'non-veg',
    tagline: 'Big and unapologetic.',
    description: 'A thick mutton steak patty with a hard, smoky char, stacked with melted cheese, sweet caramelised onion and a cool hit of mint.',
    ingredients: ['Coarse mutton steak patty', 'Live charcoal char', 'Melted sharp cheese', 'Caramelised onions', 'Fresh garden mint swipe', '5:00 AM Hokkaido milk bun'],
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1000&q=80',
    pairWith: 'Hot Honey or Lil Bro',
    calories: '820 kcal',
    prepTime: '7 mins',
    price: null,
  },
  {
    id: 'smoked-harissa',
    sectionId: 'burgers',
    name: 'Smoked Harissa',
    protein: 'Falafel & Peppers',
    dietary: 'veg',
    tagline: 'Smoky, bright, loud.',
    description: 'Falafel smashed crisp on the iron with white cheese, fire-roasted peppers and charred onion, cooled with a swipe of toum.',
    ingredients: ['Smashed crispy falafel patty', 'Aged white cheese', 'Fire-roasted bell peppers', 'Charred onions', 'Aerated garlic toum', '5:00 AM Hokkaido milk bun'],
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1000&q=80',
    pairWith: 'Mango Habanero',
    calories: '560 kcal',
    prepTime: '5 mins',
    price: null,
  },

  // 2. MOLTEN BOMBS
  {
    id: 'golden-kiev',
    sectionId: 'bombs',
    name: 'Golden Kiev',
    protein: 'Chicken',
    dietary: 'non-veg',
    tagline: 'Panko-crisp chicken with a centre that flows out hot.',
    description: 'Panko-crisp chicken with a centre of cheese and green garlic-herb butter that flows out hot the moment you break it.',
    ingredients: ['Panko crumb coating', 'Minced chicken envelope', 'Molten cheese core', 'Green garlic-herb compound butter'],
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80',
    pairWith: 'Lil Bro Toum Aioli',
    price: null,
  },
  {
    id: 'toum-bombs',
    sectionId: 'bombs',
    name: 'Toum Bombs',
    protein: 'Falafel',
    dietary: 'veg',
    tagline: 'Crisp falafel shell hiding an oozing molten cheese centre.',
    description: 'A crisp falafel shell hiding a molten cheese centre that oozes on the cut, set on slaw with beetroot, pickle and toum.',
    ingredients: ['Herbed falafel shell', 'Molten cheese core', 'Crisp beetroot slaw', 'Pickled turnip', 'Garlic toum swipe'],
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1000&q=80',
    pairWith: 'Hot Honey',
    price: null,
  },

  // 3. LOADED FRIES
  {
    id: 'umami-loaded',
    sectionId: 'fries',
    name: 'Umami Loaded',
    protein: 'Chicken',
    dietary: 'non-veg',
    tagline: 'Fries tossed in umami dust with fire-grilled chicken.',
    description: 'Fries tossed in our umami dust, piled with fire-grilled chicken, roasted peppers and melted cheese.',
    ingredients: ['Skin-on Idaho potato fries', 'House umami dust', 'Fire-grilled diced chicken', 'Roasted peppers', 'Melted cheese sauce'],
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
  {
    id: 'steak-and-gravy',
    sectionId: 'fries',
    name: 'Steak & Gravy',
    protein: 'Chicken',
    dietary: 'non-veg',
    tagline: 'Buried under a chicken steak and glossy roast gravy.',
    description: 'Fries buried under a fire-grilled chicken steak and drowned in glossy roast gravy, with a scatter of fresh chive.',
    ingredients: ['Crisp fries', 'Fire-grilled chicken steak slices', 'Glossy roast jus gravy', 'Fresh chopped chives'],
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
  {
    id: 'truffle-cloud',
    sectionId: 'fries',
    name: 'Truffle Cloud',
    protein: 'Vegetarian',
    dietary: 'veg',
    tagline: 'Whipped truffle, molten cheese, and shaved parmesan.',
    description: 'Hot fries under a cloud of whipped truffle and molten cheese, finished with a snow of shaved parmesan.',
    ingredients: ['Hot golden fries', 'Whipped black truffle crema', 'Molten gouda blend', 'Aged Parmigiano-Reggiano snow'],
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
  {
    id: 'jalapeno-fries',
    sectionId: 'fries',
    name: 'Jalapeño Fries',
    protein: 'Vegetarian',
    dietary: 'veg',
    tagline: 'Molten cheese, fresh pico, and a sharp jalapeño kick.',
    description: 'Molten cheese, fresh pico and guacamole, with a sharp jalapeño kick running through.',
    ingredients: ['Crispy fries', 'Warm cheese sauce', 'Fresh tomato cilantro pico', 'Crushed Hass guacamole', 'Pickled jalapeño rings'],
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },

  // 4. WINGS
  {
    id: 'char-wings',
    sectionId: 'wings',
    name: 'Char Wings',
    protein: 'Chicken',
    dietary: 'non-veg',
    tagline: 'Grilled over open flame till the skin blisters.',
    description: 'Grilled over open flame till the skin blisters, brushed with lemon butter and dusted with our fire blend.',
    ingredients: ['Blistered flame-seared wings', 'Clarified lemon butter glaze', 'House fire spice blend'],
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
  {
    id: 'mango-habanero-wings',
    sectionId: 'wings',
    name: 'Mango Habanero Wings',
    protein: 'Chicken',
    dietary: 'non-veg',
    tagline: 'Sweet mango glaze with a slow habanero burn.',
    description: 'Crisp wings lacquered in sweet mango glaze with a slow habanero burn.',
    ingredients: ['Crisp chicken wings', 'Alphonso mango pulp glaze', 'Fire-roasted habanero reduction', 'Toasted sesame'],
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
  {
    id: 'toffee-wings',
    sectionId: 'wings',
    name: 'Toffee Wings',
    protein: 'Chicken',
    dietary: 'non-veg',
    tagline: 'Dark cola-toffee lacquer with charred pineapple relish.',
    description: 'Crisp wings in a dark cola-toffee lacquer with a charred pineapple relish.',
    ingredients: ['Crisp wings', 'Dark cola toffee reduction', 'Binchotan-charred pineapple relish', 'Spring onion'],
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },

  // 5. SHAKES
  {
    id: 'dark-chocolate-shake',
    sectionId: 'shakes',
    name: 'Dark Chocolate Shake',
    protein: 'Dessert Drink',
    dietary: 'veg',
    tagline: 'Rich, chocolatey, crowned with whip and biscuit.',
    description: 'Rich and properly chocolatey, crowned with whip, a biscuit and a chocolate drizzle.',
    ingredients: ['70% dark Belgian cocoa', 'Full-cream dairy ice cream', 'Whipped cream crown', 'Crushed butter biscuit', 'Fudge drizzle'],
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
  {
    id: 'salted-caramel-shake',
    sectionId: 'shakes',
    name: 'Salted Caramel Shake',
    protein: 'Dessert Drink',
    dietary: 'veg',
    tagline: 'Deep caramel with a flaky salt finish.',
    description: 'Deep caramel with a flaky-salt finish, thick and creamy.',
    ingredients: ['Slow-cooked amber caramel', 'Maldon sea salt flakes', 'Vanilla bean churned custard', 'Whipped cream'],
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },

  // 6. DRINKS
  {
    id: 'burnt-lemonade',
    sectionId: 'drinks',
    name: 'Burnt Lemonade',
    protein: 'Craft Beverage',
    dietary: 'veg',
    tagline: 'Charred lemons, smoky-sweet black salt over clear ice.',
    description: 'Lemons charred hard over the fire, pressed into a smoky-sweet lemonade with a black-salt edge, over clear ice.',
    ingredients: ['Fire-charred whole lemons', 'Raw cane syrup', 'Kala namak black salt', 'Hand-carved clear ice block'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
  {
    id: 'midori-cooler',
    sectionId: 'drinks',
    name: 'Midori Cooler',
    protein: 'Craft Beverage',
    dietary: 'veg',
    tagline: 'Clarified cucumber with mint, basil and citrus.',
    description: 'Clarified cucumber with mint, basil and a whisper of citrus over clear ice.',
    ingredients: ['Clarified English cucumber juice', 'Fresh sweet basil', 'Garden spearmint', 'Key lime mist', 'Clear ice'],
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },

  // 7. DESSERT
  {
    id: 'the-matilda',
    sectionId: 'dessert',
    name: 'The Matilda',
    protein: 'Warm Cake',
    dietary: 'veg',
    tagline: 'Dark chocolate sponge under a warm flowing glaze.',
    description: 'Layers of dark chocolate sponge under a warm glaze that flows the second you cut in.',
    ingredients: ['Triple-layer dark chocolate sponge', 'Warm molten fudge center', 'Glossy chocolate glaze'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    price: null,
  },
];

// 8. THE 7 DIP WALL
export const UMAMI_DIP_WALL = [
  { id: 'lil-bro', name: 'Lil Bro', subtitle: 'Toum Aioli', dietary: 'veg', notes: 'Creamy aerated garlic emulsion with roasted sesame.' },
  { id: 'umami', name: 'Umami Sauce', subtitle: 'House Tare', dietary: 'veg', notes: 'Smoked reduction infused with dashi and soy notes.' },
  { id: 'big-bro', name: 'Big Bro', subtitle: 'Yuzu Tare', dietary: 'veg', notes: 'Tangy, deeply savoury smoked reduction with Japanese yuzu.' },
  { id: 'hot-honey', name: 'Hot Honey', subtitle: 'Chili Glaze', dietary: 'veg', notes: 'Pure wild honey infused with slow-steeped red chilies.' },
  { id: 'mango-habanero-dip', name: 'Mango Habanero', subtitle: 'Tropical Heat', dietary: 'veg', notes: 'Alphonso pulp blended with fire-roasted habaneros.' },
  { id: 'drip', name: 'Drip', subtitle: 'Roast Gravy', dietary: 'non-veg', notes: 'Deep roasted chicken pan drippings and pepper jus.' },
  { id: 'black-gold', name: 'Black Gold', subtitle: 'Truffle Miso', dietary: 'veg', notes: 'Italian black truffle folded with aged white miso.' },
];

export const UMAMI_FAQS = [
  {
    q: 'What is UMAMI?',
    a: 'UMAMI is a Japanese fire-grilled burger counter at Booth No. 7, Inner Market, Sector 8B, Chandigarh. Burgers are grilled over live fire and served on Hokkaido milk buns baked in-house each morning.'
  },
  {
    q: 'Where is UMAMI located?',
    a: 'UMAMI is at Booth No. 7, Inner Market, Sector 8B, Chandigarh 160018.'
  },
  {
    q: 'When does UMAMI open?',
    a: 'UMAMI opens on 1 October 2026.'
  },
  {
    q: 'What makes a burger Japanese fire-grilled?',
    a: 'Two things. The bun is a Hokkaido milk bun, a Japanese style of enriched milk bread that is soft and strong at the same time. The patty is thick and cooked over live fire rather than pressed thin on a flat top.'
  },
  {
    q: 'Does UMAMI have vegetarian burgers?',
    a: 'Yes. Magic Shroom is a paneer-mushroom patty and Smoked Harissa is a falafel burger. Several loaded fries, both molten bombs options, the shakes and all drinks have vegetarian options. Veg and non-veg are marked on every menu item.'
  },
  {
    q: 'Does UMAMI deliver in Chandigarh?',
    a: 'Yes. UMAMI delivers across Chandigarh through Zomato and Swiggy, and direct ordering from the website.'
  },
  {
    q: 'Is UMAMI a sit-down restaurant?',
    a: 'No. UMAMI is a counter kitchen. You order at the counter, watch the burger come off the fire, and take it with you, or have it delivered.'
  },
  {
    q: 'What is umami?',
    a: 'Umami is the fifth basic taste, alongside sweet, sour, salty and bitter. It is the deep savoury quality found in ingredients like mushrooms, aged cheese, tomatoes and grilled meat. It was identified by a Japanese chemist in 1908.'
  },
  {
    q: 'Who operates UMAMI?',
    a: 'UMAMI is operated by Nimantrit Foods.'
  }
];
