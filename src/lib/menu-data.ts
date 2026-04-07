export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  spicy?: boolean;
  popular?: boolean;
}

export const categories = [
  "All",
  "Starter",
  "Paratha Roll",
  "Medium Roll",
  "Boom Boom Roll",
  "Boom Boom Sixer",
  "Chicken Karahi",
  "Boneless Karahi",
  "BBQ",
  "Burgers",
  "Broast",
  "Sandwich",
  "Pasta",
  "Grill Chicken",
  "Chinese",
  "Noodles",
  "Fries",
  "Soup",
  "Rice",
  "Biryani & Pulao",
  "Roti & Naan",
  "Salad & Raita",
  "Fresh Juice",
  "Milk Shake",
  "Lemon Soda",
  "Beverages",
  "Deals",
];

const img = {
  roll: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
  roll2: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop",
  karahi: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop",
  bbq: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  broast: "https://images.unsplash.com/photo-1626645738196-c2a98c569c2c?w=400&h=300&fit=crop",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
  grill: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
  chinese: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop",
  noodles: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
  rice: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
  roti: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  juice: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=300&fit=crop",
  shake: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
  soda: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
  wings: "https://images.unsplash.com/photo-1608039829572-9b0189c8a024?w=400&h=300&fit=crop",
  deal: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
  beverage: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
};

export const menuItems: MenuItem[] = [
  // === STARTER ===
  { id: "st-1", name: "Wings (4pcs)", price: 500, description: "Crispy fried chicken wings with special seasoning", category: "Starter", image: img.wings, popular: true },

  // === PARATHA ROLL ===
  { id: "pr-1", name: "Paratha Roll", price: 270, description: "Classic paratha roll with fresh fillings", category: "Paratha Roll", image: img.roll },
  { id: "pr-2", name: "Cheese Roll", price: 300, description: "Paratha roll loaded with melted cheese", category: "Paratha Roll", image: img.roll },
  { id: "pr-3", name: "Mayo Roll", price: 280, description: "Creamy mayo paratha roll", category: "Paratha Roll", image: img.roll },
  { id: "pr-4", name: "Malai Roll", price: 300, description: "Rich malai flavored paratha roll", category: "Paratha Roll", image: img.roll },
  { id: "pr-5", name: "Malai Cheese Roll", price: 340, description: "Double delight — malai and cheese combined", category: "Paratha Roll", image: img.roll, popular: true },
  { id: "pr-6", name: "Chapati Roll", price: 280, description: "Light chapati roll with chicken filling", category: "Paratha Roll", image: img.roll },
  { id: "pr-7", name: "Kabab Roll", price: 300, description: "Juicy kabab wrapped in paratha", category: "Paratha Roll", image: img.roll },
  { id: "pr-8", name: "Zinger Crispy Cheese Roll", price: 350, description: "Crispy zinger with cheese in paratha", category: "Paratha Roll", image: img.roll, spicy: true },
  { id: "pr-9", name: "Zinger Crispy Roll", price: 300, description: "Crispy zinger strip wrapped in paratha", category: "Paratha Roll", image: img.roll, spicy: true },
  { id: "pr-10", name: "Zinger Malai Plater", price: 300, description: "Zinger with malai sauce platter style", category: "Paratha Roll", image: img.roll },
  { id: "pr-11", name: "Behari Roll", price: 280, description: "Tender behari boti wrapped in paratha", category: "Paratha Roll", image: img.roll },
  { id: "pr-12", name: "Regular Spicy Roll", price: 270, description: "Classic spicy chicken roll", category: "Paratha Roll", image: img.roll, spicy: true },

  // === MEDIUM ROLL ===
  { id: "mr-1", name: "Jambo Roll", price: 300, description: "Jumbo sized roll with extra filling", category: "Medium Roll", image: img.roll2 },
  { id: "mr-2", name: "Jambo Cheese Roll", price: 350, description: "Jumbo roll loaded with cheese", category: "Medium Roll", image: img.roll2 },
  { id: "mr-3", name: "Jambo Mayo Roll", price: 350, description: "Jumbo roll with creamy mayo", category: "Medium Roll", image: img.roll2 },
  { id: "mr-4", name: "Jambo Malai Roll", price: 350, description: "Jumbo roll with rich malai", category: "Medium Roll", image: img.roll2 },
  { id: "mr-5", name: "Jambo Malai Cheese Roll", price: 380, description: "Jumbo roll with malai and cheese", category: "Medium Roll", image: img.roll2, popular: true },
  { id: "mr-6", name: "Jambo Chapati Roll", price: 300, description: "Jumbo chapati roll with chicken", category: "Medium Roll", image: img.roll2 },
  { id: "mr-7", name: "Zinger Jambo Roll", price: 400, description: "Jumbo roll with crispy zinger strip", category: "Medium Roll", image: img.roll2, spicy: true },
  { id: "mr-8", name: "Medium Malai Plater", price: 350, description: "Medium sized malai platter", category: "Medium Roll", image: img.roll2 },
  { id: "mr-9", name: "Jambo Chatni Roll", price: 300, description: "Jumbo roll with special chutney", category: "Medium Roll", image: img.roll2 },
  { id: "mr-10", name: "Jambo Kabab Roll", price: 350, description: "Jumbo kabab wrapped in paratha", category: "Medium Roll", image: img.roll2 },
  { id: "mr-11", name: "Jambo Behari Roll", price: 350, description: "Jumbo behari boti roll", category: "Medium Roll", image: img.roll2 },
  { id: "mr-12", name: "Jumbo Spicy Roll", price: 300, description: "Jumbo sized spicy chicken roll", category: "Medium Roll", image: img.roll2, spicy: true },

  // === BOOM BOOM ROLL ===
  { id: "bb-1", name: "Boom Boom Roll", price: 400, description: "Signature boom boom roll with special sauce", category: "Boom Boom Roll", image: img.roll, popular: true },
  { id: "bb-2", name: "Boom Boom Cheese Roll", price: 450, description: "Boom boom roll with extra cheese", category: "Boom Boom Roll", image: img.roll },
  { id: "bb-3", name: "Boom Boom Mayo Roll", price: 440, description: "Boom boom roll with creamy mayo", category: "Boom Boom Roll", image: img.roll },
  { id: "bb-4", name: "Boom Boom Chapti Roll", price: 400, description: "Boom boom roll in chapati", category: "Boom Boom Roll", image: img.roll },
  { id: "bb-5", name: "Boom Boom Malai Cheese Roll", price: 480, description: "Boom boom roll with malai and cheese", category: "Boom Boom Roll", image: img.roll },
  { id: "bb-6", name: "Boom Boom Zinger Roll", price: 450, description: "Boom boom with crispy zinger", category: "Boom Boom Roll", image: img.roll, spicy: true },
  { id: "bb-7", name: "Boom Boom Zinger Cheese Roll", price: 500, description: "Zinger boom boom loaded with cheese", category: "Boom Boom Roll", image: img.roll, spicy: true },
  { id: "bb-8", name: "Boom Boom Kabab Roll", price: 420, description: "Boom boom roll with juicy kabab", category: "Boom Boom Roll", image: img.roll },
  { id: "bb-9", name: "Boom Boom Chatni Roll", price: 400, description: "Boom boom with special chutney", category: "Boom Boom Roll", image: img.roll },
  { id: "bb-10", name: "Boom Boom Behari Roll", price: 450, description: "Boom boom with tender behari", category: "Boom Boom Roll", image: img.roll },
  { id: "bb-11", name: "Boom Boom Spicy Roll", price: 420, description: "Extra spicy boom boom roll", category: "Boom Boom Roll", image: img.roll, spicy: true },

  // === BOOM BOOM SIXER ===
  { id: "bs-1", name: "Boom Boom Sixer", price: 550, description: "6-inch boom boom roll — the ultimate size", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-2", name: "Boom Boom Sixer Cheese", price: 600, description: "Sixer loaded with melted cheese", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-3", name: "Boom Boom Sixer Mayo", price: 580, description: "Sixer with creamy mayo sauce", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-4", name: "Boom Boom Sixer Malai", price: 600, description: "Sixer with rich malai flavor", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-5", name: "Boom Boom Sixer Chapati", price: 580, description: "Sixer wrapped in chapati", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-6", name: "Boom Boom Sixer Malai Cheese", price: 630, description: "Sixer with malai and cheese combo", category: "Boom Boom Sixer", image: img.roll2, popular: true },
  { id: "bs-7", name: "Boom Boom Sixer Zinger", price: 600, description: "Sixer with crispy zinger", category: "Boom Boom Sixer", image: img.roll2, spicy: true },
  { id: "bs-8", name: "Boom Boom Sixer Zinger Cheese", price: 650, description: "Ultimate zinger cheese sixer", category: "Boom Boom Sixer", image: img.roll2, spicy: true },
  { id: "bs-9", name: "Boom Boom Sixer Kabab", price: 550, description: "Sixer with juicy kabab", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-10", name: "Boom Boom Sixer Chatni", price: 550, description: "Sixer with special chutney", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-11", name: "Boom Boom Sixer Behari", price: 600, description: "Sixer with behari boti", category: "Boom Boom Sixer", image: img.roll2 },
  { id: "bs-12", name: "Boom Boom Sixer Spicy", price: 550, description: "Extra spicy sixer roll", category: "Boom Boom Sixer", image: img.roll2, spicy: true },

  // === CHICKEN KARAHI ===
  { id: "ck-1", name: "Chicken Karahi Full", price: 1700, description: "Full size traditional chicken karahi", category: "Chicken Karahi", image: img.karahi, popular: true },
  { id: "ck-2", name: "Chicken Karahi Half", price: 950, description: "Half size chicken karahi", category: "Chicken Karahi", image: img.karahi },
  { id: "ck-3", name: "Chicken Makhani Full", price: 1800, description: "Creamy butter chicken karahi — full", category: "Chicken Karahi", image: img.karahi },
  { id: "ck-4", name: "Chicken Makhani Half", price: 1000, description: "Creamy butter chicken karahi — half", category: "Chicken Karahi", image: img.karahi },
  { id: "ck-5", name: "Chicken White Karahi Full", price: 1800, description: "White gravy chicken karahi — full", category: "Chicken Karahi", image: img.karahi },
  { id: "ck-6", name: "Chicken White Karahi Half", price: 1000, description: "White gravy chicken karahi — half", category: "Chicken Karahi", image: img.karahi },
  { id: "ck-7", name: "Chicken Achari Full", price: 1800, description: "Tangy achari chicken karahi — full", category: "Chicken Karahi", image: img.karahi, spicy: true },
  { id: "ck-8", name: "Chicken Achari Half", price: 1000, description: "Tangy achari chicken karahi — half", category: "Chicken Karahi", image: img.karahi, spicy: true },
  { id: "ck-9", name: "Chicken Kabab Karahi Full", price: 1750, description: "Kabab style chicken karahi — full", category: "Chicken Karahi", image: img.karahi },
  { id: "ck-10", name: "Chicken Kabab Karahi Half", price: 950, description: "Kabab style chicken karahi — half", category: "Chicken Karahi", image: img.karahi },

  // === CHICKEN BONELESS ===
  { id: "cb-1", name: "Chicken Boneless Karahi Full", price: 1900, description: "Boneless chicken karahi — full", category: "Boneless Karahi", image: img.karahi },
  { id: "cb-2", name: "Chicken Boneless Karahi Half", price: 1100, description: "Boneless chicken karahi — half", category: "Boneless Karahi", image: img.karahi },
  { id: "cb-3", name: "Chicken White Boneless Full", price: 2000, description: "White boneless chicken karahi — full", category: "Boneless Karahi", image: img.karahi },
  { id: "cb-4", name: "Chicken White Boneless Half", price: 1150, description: "White boneless chicken karahi — half", category: "Boneless Karahi", image: img.karahi },
  { id: "cb-5", name: "Chicken Boneless Makhani Full", price: 2000, description: "Creamy boneless makhani karahi — full", category: "Boneless Karahi", image: img.karahi, popular: true },
  { id: "cb-6", name: "Chicken Boneless Makhani Half", price: 1150, description: "Creamy boneless makhani karahi — half", category: "Boneless Karahi", image: img.karahi },
  { id: "cb-7", name: "Chicken Boneless Achari Full", price: 2000, description: "Achari boneless chicken karahi — full", category: "Boneless Karahi", image: img.karahi, spicy: true },
  { id: "cb-8", name: "Chicken Boneless Achari Half", price: 1100, description: "Achari boneless chicken karahi — half", category: "Boneless Karahi", image: img.karahi, spicy: true },

  // === BBQ ===
  { id: "bq-1", name: "Chicken Tikka Leg Piece", price: 350, description: "Smoky grilled chicken leg tikka", category: "BBQ", image: img.bbq, popular: true },
  { id: "bq-2", name: "Chicken Tikka Chest Piece", price: 370, description: "Tender grilled chicken chest tikka", category: "BBQ", image: img.bbq },
  { id: "bq-3", name: "Chicken Golden Boneless Boti", price: 350, description: "Golden crispy boneless boti pieces", category: "BBQ", image: img.bbq },
  { id: "bq-4", name: "Chicken Malai Boti (10 Pieces)", price: 400, description: "Creamy malai boti — 10 tender pieces", category: "BBQ", image: img.bbq, popular: true },
  { id: "bq-5", name: "Chicken Reshmi Kabab (4 Pieces)", price: 400, description: "Soft and juicy reshmi kabab", category: "BBQ", image: img.bbq },
  { id: "bq-6", name: "Bihari Tikka Boti (10 Pieces)", price: 450, description: "Spicy bihari style tikka boti", category: "BBQ", image: img.bbq, spicy: true },
  { id: "bq-7", name: "Malai Tikka Chest", price: 400, description: "Creamy malai tikka chest piece", category: "BBQ", image: img.bbq },
  { id: "bq-8", name: "Malai Tikka Leg", price: 380, description: "Creamy malai tikka leg piece", category: "BBQ", image: img.bbq },
  { id: "bq-9", name: "Beef Kabab (4 Pieces)", price: 500, description: "Juicy seasoned beef kababs", category: "BBQ", image: img.bbq },

  // === BURGERS ===
  { id: "bg-1", name: "Chicken Cheese Burger with Fries", price: 350, description: "Chicken burger with cheese, served with fries", category: "Burgers", image: img.burger },
  { id: "bg-2", name: "Grill Chicken Jalepino Burger", price: 520, description: "Grilled chicken with spicy jalapeños and fries", category: "Burgers", image: img.burger, spicy: true },
  { id: "bg-3", name: "Chicken Mushroom Burger", price: 520, description: "Chicken burger with mushroom sauce and fries", category: "Burgers", image: img.burger },
  { id: "bg-4", name: "Zinger Crispy Burger", price: 380, description: "Crispy zinger burger with fries", category: "Burgers", image: img.burger, popular: true },
  { id: "bg-5", name: "Zinger Crispy Double Patty Burger", price: 600, description: "Double zinger patty with fries — massive!", category: "Burgers", image: img.burger },
  { id: "bg-6", name: "Royal Chicken Burger", price: 520, description: "Premium royal chicken burger with fries", category: "Burgers", image: img.burger },
  { id: "bg-7", name: "Zinger Crispy Double Patty (Large)", price: 620, description: "Extra large double zinger with fries", category: "Burgers", image: img.burger },
  { id: "bg-8", name: "Beef Burger", price: 450, description: "Classic beef patty burger with fries", category: "Burgers", image: img.burger },

  // === BROAST ===
  { id: "br-1", name: "Quarter Broast", price: 400, description: "Quarter chicken broast — crispy and juicy", category: "Broast", image: img.broast },
  { id: "br-2", name: "Half Broast", price: 700, description: "Half chicken broast — generous portion", category: "Broast", image: img.broast, popular: true },
  { id: "br-3", name: "Full Broast", price: 1400, description: "Full chicken broast — feeds the family", category: "Broast", image: img.broast },

  // === SANDWICH ===
  { id: "sw-1", name: "Cold Sandwich", price: 250, description: "Fresh cold sandwich with veggies", category: "Sandwich", image: img.sandwich },
  { id: "sw-2", name: "Club Sandwich", price: 350, description: "Classic triple-layer club sandwich", category: "Sandwich", image: img.sandwich, popular: true },
  { id: "sw-3", name: "BBQ Club Sandwich", price: 380, description: "Club sandwich with smoky BBQ flavor", category: "Sandwich", image: img.sandwich },

  // === PASTA ===
  { id: "pa-1", name: "Chicken Fettuccine (Alfredo)", price: 700, description: "Creamy alfredo fettuccine with chicken", category: "Pasta", image: img.pasta },
  { id: "pa-2", name: "Chicken Parmesan", price: 700, description: "Chicken parmesan with rich tomato sauce", category: "Pasta", image: img.pasta },

  // === GRILL CHICKEN ===
  { id: "gc-1", name: "Mushroom Chicken", price: 850, description: "Grilled chicken with mushroom cream sauce", category: "Grill Chicken", image: img.grill },
  { id: "gc-2", name: "Taragon Chicken", price: 850, description: "Grilled chicken with taragon herb sauce", category: "Grill Chicken", image: img.grill },
  { id: "gc-3", name: "Jalapeno Chicken", price: 750, description: "Grilled chicken with spicy jalapeño glaze", category: "Grill Chicken", image: img.grill, spicy: true },
  { id: "gc-4", name: "Maracan Chicken", price: 750, description: "Grilled chicken Moroccan style", category: "Grill Chicken", image: img.grill },

  // === CHINESE ===
  { id: "ch-1", name: "Chicken Manchurian with Rice", price: 650, description: "Spicy chicken manchurian served with rice", category: "Chinese", image: img.chinese, spicy: true },
  { id: "ch-2", name: "Chicken Shashlik with Rice", price: 650, description: "Grilled shashlik skewers with fried rice", category: "Chinese", image: img.chinese, popular: true },
  { id: "ch-3", name: "Kung Pao Chicken with Rice", price: 650, description: "Classic kung pao chicken with steamed rice", category: "Chinese", image: img.chinese, spicy: true },
  { id: "ch-4", name: "Chicken Hot Garlic Sauce with Rice", price: 650, description: "Chicken in spicy garlic sauce with rice", category: "Chinese", image: img.chinese, spicy: true },
  { id: "ch-5", name: "Black Pepper Chicken with Rice", price: 650, description: "Chicken in black pepper sauce with rice", category: "Chinese", image: img.chinese },
  { id: "ch-6", name: "Chicken Chilli Dry Rice", price: 650, description: "Dry chilli chicken served with fried rice", category: "Chinese", image: img.chinese, spicy: true },

  // === NOODLES ===
  { id: "nd-1", name: "Vegetable Chowmein", price: 350, description: "Stir-fried vegetable noodles", category: "Noodles", image: img.noodles },
  { id: "nd-2", name: "Chicken Chowmein", price: 450, description: "Stir-fried chicken noodles with veggies", category: "Noodles", image: img.noodles, popular: true },

  // === FRIES ===
  { id: "fr-1", name: "French Fries (Regular)", price: 150, description: "Golden crispy french fries — regular", category: "Fries", image: img.fries },
  { id: "fr-2", name: "French Fries (Large)", price: 300, description: "Golden crispy french fries — large", category: "Fries", image: img.fries },
  { id: "fr-3", name: "Mayo Fries (Regular)", price: 250, description: "Fries with creamy mayo — regular", category: "Fries", image: img.fries },
  { id: "fr-4", name: "Mayo Fries (Large)", price: 400, description: "Fries with creamy mayo — large", category: "Fries", image: img.fries },
  { id: "fr-5", name: "Cheese Fries (Regular)", price: 250, description: "Fries loaded with cheese — regular", category: "Fries", image: img.fries },
  { id: "fr-6", name: "Cheese Fries (Large)", price: 400, description: "Fries loaded with cheese — large", category: "Fries", image: img.fries },
  { id: "fr-7", name: "Loaded Fries (Regular)", price: 350, description: "Fully loaded fries with toppings — regular", category: "Fries", image: img.fries, popular: true },
  { id: "fr-8", name: "Loaded Fries (Large)", price: 500, description: "Fully loaded fries with toppings — large", category: "Fries", image: img.fries },

  // === SOUP ===
  { id: "sp-1", name: "Chicken Corn Soup (Single)", price: 350, description: "Classic chicken corn soup — single serving", category: "Soup", image: img.soup },
  { id: "sp-2", name: "Chicken Corn Soup (Half)", price: 500, description: "Chicken corn soup — half bowl", category: "Soup", image: img.soup },
  { id: "sp-3", name: "Chicken Corn Soup (Family)", price: 700, description: "Chicken corn soup — family bowl", category: "Soup", image: img.soup },
  { id: "sp-4", name: "Hot & Sour Soup (Single)", price: 350, description: "Tangy hot and sour soup — single", category: "Soup", image: img.soup, spicy: true },
  { id: "sp-5", name: "Hot & Sour Soup (Half)", price: 500, description: "Hot and sour soup — half bowl", category: "Soup", image: img.soup, spicy: true },
  { id: "sp-6", name: "Hot & Sour Soup (Family)", price: 700, description: "Hot and sour soup — family bowl", category: "Soup", image: img.soup, spicy: true },
  { id: "sp-7", name: "Mushroom Soup (Single)", price: 350, description: "Creamy mushroom soup — single", category: "Soup", image: img.soup },
  { id: "sp-8", name: "Hot & Spicy Special Soup (Single)", price: 350, description: "Our signature special soup", category: "Soup", image: img.soup, spicy: true, popular: true },

  // === RICE ===
  { id: "rc-1", name: "Vegetable Fried Rice", price: 270, description: "Stir-fried rice with fresh vegetables", category: "Rice", image: img.rice },
  { id: "rc-2", name: "Egg Fried Rice", price: 300, description: "Classic egg fried rice", category: "Rice", image: img.rice },
  { id: "rc-3", name: "Chicken Fried Rice", price: 350, description: "Fried rice with chicken pieces", category: "Rice", image: img.rice, popular: true },

  // === BIRYANI & PULAO ===
  { id: "bi-1", name: "Simple Biryani", price: 300, description: "Traditional simple chicken biryani", category: "Biryani & Pulao", image: img.biryani },
  { id: "bi-2", name: "Special Chicken Biryani", price: 400, description: "Special recipe chicken biryani", category: "Biryani & Pulao", image: img.biryani, popular: true },
  { id: "bi-3", name: "Special Double Piece Biryani", price: 500, description: "Biryani with double chicken pieces", category: "Biryani & Pulao", image: img.biryani },

  // === ROTI & NAAN ===
  { id: "rn-1", name: "Tandoori Roti", price: 25, description: "Fresh tandoori roti", category: "Roti & Naan", image: img.roti },
  { id: "rn-2", name: "Naan", price: 60, description: "Soft & fluffy naan bread", category: "Roti & Naan", image: img.roti },
  { id: "rn-3", name: "Chapati", price: 80, description: "Fresh homestyle chapati", category: "Roti & Naan", image: img.roti },
  { id: "rn-4", name: "Rogni Naan", price: 80, description: "Buttery rogni naan", category: "Roti & Naan", image: img.roti },
  { id: "rn-5", name: "Paratha Small", price: 100, description: "Layered flaky paratha — small", category: "Roti & Naan", image: img.roti },
  { id: "rn-6", name: "Paratha Large", price: 130, description: "Layered flaky paratha — large", category: "Roti & Naan", image: img.roti },

  // === SALAD & RAITA ===
  { id: "sr-1", name: "Salad + Raita", price: 150, description: "Fresh garden salad with cool raita", category: "Salad & Raita", image: img.salad },

  // === FRESH JUICE ===
  { id: "fj-1", name: "Orange / Musami Juice", price: 250, description: "Freshly squeezed orange juice", category: "Fresh Juice", image: img.juice },
  { id: "fj-2", name: "Pineapple Juice", price: 300, description: "Fresh pineapple juice", category: "Fresh Juice", image: img.juice },
  { id: "fj-3", name: "Mango Juice", price: 250, description: "Sweet mango juice", category: "Fresh Juice", image: img.juice, popular: true },
  { id: "fj-4", name: "Strawberry Juice", price: 250, description: "Fresh strawberry juice", category: "Fresh Juice", image: img.juice },
  { id: "fj-5", name: "Falsa Juice", price: 300, description: "Traditional falsa juice", category: "Fresh Juice", image: img.juice },
  { id: "fj-6", name: "Apple Juice", price: 300, description: "Fresh apple juice", category: "Fresh Juice", image: img.juice },
  { id: "fj-7", name: "Anar Juice", price: 500, description: "Premium pomegranate juice", category: "Fresh Juice", image: img.juice },
  { id: "fj-8", name: "Peach Juice", price: 250, description: "Sweet peach juice", category: "Fresh Juice", image: img.juice },
  { id: "fj-9", name: "Grapefruit Juice", price: 250, description: "Tangy grapefruit juice", category: "Fresh Juice", image: img.juice },

  // === MILK SHAKE ===
  { id: "ms-1", name: "Mango Shake", price: 250, description: "Thick & creamy mango milkshake", category: "Milk Shake", image: img.shake, popular: true },
  { id: "ms-2", name: "Pineapple Shake", price: 300, description: "Creamy pineapple milkshake", category: "Milk Shake", image: img.shake },
  { id: "ms-3", name: "Strawberry Shake", price: 300, description: "Fresh strawberry milkshake", category: "Milk Shake", image: img.shake },
  { id: "ms-4", name: "Apple & Banana Shake", price: 200, description: "Apple banana blend milkshake", category: "Milk Shake", image: img.shake },
  { id: "ms-5", name: "Khajoor & Banana Shake", price: 250, description: "Dates & banana energy shake", category: "Milk Shake", image: img.shake },
  { id: "ms-6", name: "Khajoor Badam Shake", price: 350, description: "Premium dates & almond shake", category: "Milk Shake", image: img.shake },

  // === LEMON SODA ===
  { id: "ls-1", name: "Lemon Soda", price: 120, description: "Classic refreshing lemon soda", category: "Lemon Soda", image: img.soda },
  { id: "ls-2", name: "7up Soda", price: 150, description: "Chilled 7up soda", category: "Lemon Soda", image: img.soda },
  { id: "ls-3", name: "Sting Soda", price: 150, description: "Energy boost sting soda", category: "Lemon Soda", image: img.soda },
  { id: "ls-4", name: "Rooh Afzah / Doodh Soda", price: 150, description: "Traditional Rooh Afzah soda", category: "Lemon Soda", image: img.soda },
  { id: "ls-5", name: "Elachi / Sandal Soda", price: 150, description: "Aromatic elachi or sandal soda", category: "Lemon Soda", image: img.soda },
  { id: "ls-6", name: "Mint Margarita", price: 200, description: "Cool refreshing mint margarita", category: "Lemon Soda", image: img.soda, popular: true },

  // === BEVERAGES ===
  { id: "bv-1", name: "Water Bottle (500ml)", price: 50, description: "Mineral water 500ml", category: "Beverages", image: img.beverage },
  { id: "bv-2", name: "Water Bottle (1.5 Ltr)", price: 100, description: "Mineral water 1.5 litre", category: "Beverages", image: img.beverage },
  { id: "bv-3", name: "Regular Drink (300ml)", price: 80, description: "Soft drink 300ml", category: "Beverages", image: img.beverage },
  { id: "bv-4", name: "Cold Drink (500ml)", price: 120, description: "Cold drink 500ml", category: "Beverages", image: img.beverage },
  { id: "bv-5", name: "Cold Drink (1 Ltr)", price: 180, description: "Cold drink 1 litre", category: "Beverages", image: img.beverage },
  { id: "bv-6", name: "Cold Drink (1.5 Ltr)", price: 220, description: "Cold drink 1.5 litre", category: "Beverages", image: img.beverage },

  // === DEALS ===
  { id: "dl-1", name: "Deal 1", price: 520, description: "Club Sandwich + 1 Zinger Burger Piece with Fries + 1 Regular Drink", category: "Deals", image: img.deal, popular: true },
  { id: "dl-2", name: "Deal 2", price: 420, description: "1 Chicken Tikka + 1 Chapati + Regular Drink", category: "Deals", image: img.deal },
  { id: "dl-3", name: "Deal 3", price: 430, description: "1 Zinger Burger with Fries + Regular Drink", category: "Deals", image: img.deal },
  { id: "dl-4", name: "Deal 4", price: 1250, description: "3 Zinger Burger + 1 Ltr Drink + 1 Fries", category: "Deals", image: img.deal },
  { id: "dl-5", name: "Sunday Deal", price: 1600, description: "4 Zinger Burger + 1 Fries + 1.5 Ltr Drink", category: "Deals", image: img.deal, popular: true },
  { id: "dl-6", name: "Deal 5", price: 650, description: "3 Fried Wings + 1 Zinger Burger with Fries + Half Ltr Drink", category: "Deals", image: img.deal },
  { id: "dl-7", name: "Deal 6", price: 700, description: "1 Zinger Burger with Fries + 1 Chicken Roll + 1 Regular Drink", category: "Deals", image: img.deal },
  { id: "dl-8", name: "Deal 7", price: 1200, description: "4 Regular Roll + 1 Ltr Drink", category: "Deals", image: img.deal },
  { id: "dl-9", name: "Deal 8", price: 1350, description: "4 Jumbo Roll + 1.5 Ltr Drink", category: "Deals", image: img.deal },
  { id: "dl-10", name: "Deal 9", price: 1480, description: "3 Jumbo Roll + 2 Regular Roll + 1 Ltr Drink", category: "Deals", image: img.deal },
  { id: "dl-11", name: "Deal 10", price: 1000, description: "3 Biryani + 1 Salad + 1.5 Ltr Drink", category: "Deals", image: img.deal },
  { id: "dl-12", name: "Deal 11", price: 2100, description: "Half Karahi + Malai Boti + Chicken Boti + Salad + 10 Chapati + 1.5 Ltr Drink", category: "Deals", image: img.deal },
  { id: "dl-13", name: "Deal 12", price: 1200, description: "Chicken Shashlik with Rice + Chicken Chilli Dry Rice", category: "Deals", image: img.deal },
  { id: "dl-14", name: "Deal 13", price: 1550, description: "Kabab Karahi Half + Chicken Fried Rice + 6 Chapati + 1 Ltr Drink", category: "Deals", image: img.deal },
  { id: "dl-15", name: "Deal 14", price: 1300, description: "Half Chicken Karahi + Simple Biryani + Raita + 5 Roti + 1 Ltr Drink", category: "Deals", image: img.deal },
];
