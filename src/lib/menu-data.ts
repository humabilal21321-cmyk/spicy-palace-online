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
  "All", "BBQ", "Pakistani", "Chinese", "Fast Food", "Seafood", "Desserts", "Drinks"
];

export const menuItems: MenuItem[] = [
  // BBQ
  { id: "bbq-1", name: "Seekh Kabab Platter", price: 850, description: "Juicy charcoal-grilled seekh kababs served with naan and chutney", category: "BBQ", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop", spicy: true, popular: true },
  { id: "bbq-2", name: "Chicken Tikka", price: 750, description: "Tender marinated chicken pieces grilled to perfection", category: "BBQ", image: "https://images.unsplash.com/photo-1610057099443-fde6c99db9e1?w=400&h=300&fit=crop", popular: true },
  { id: "bbq-3", name: "Lamb Chops", price: 1800, description: "Premium lamb chops with secret spice blend, charcoal grilled", category: "BBQ", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop" },
  { id: "bbq-4", name: "Mixed Grill Platter", price: 2500, description: "Assorted BBQ meats including tikka, kabab, and chops", category: "BBQ", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop", popular: true },
  // Pakistani
  { id: "pak-1", name: "Chicken Karahi", price: 1200, description: "Traditional Rawalpindi-style karahi with fresh tomatoes and green chilies", category: "Pakistani", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop", spicy: true, popular: true },
  { id: "pak-2", name: "Mutton Biryani", price: 650, description: "Aromatic basmati rice layered with tender mutton and exotic spices", category: "Pakistani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop", popular: true },
  { id: "pak-3", name: "Nihari", price: 550, description: "Slow-cooked beef stew, a Rawalpindi breakfast favorite", category: "Pakistani", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", spicy: true },
  { id: "pak-4", name: "Haleem", price: 450, description: "Rich and creamy wheat and lentil stew with shredded meat", category: "Pakistani", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" },
  // Chinese
  { id: "chi-1", name: "Dragon Chicken", price: 950, description: "Crispy chicken in fiery dragon sauce with bell peppers", category: "Chinese", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop", spicy: true },
  { id: "chi-2", name: "Chow Mein", price: 650, description: "Stir-fried noodles with vegetables and choice of protein", category: "Chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop" },
  { id: "chi-3", name: "Hot & Sour Soup", price: 350, description: "Classic spicy and tangy soup with mushrooms and tofu", category: "Chinese", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop", spicy: true },
  // Fast Food
  { id: "ff-1", name: "Zinger Burger", price: 550, description: "Crispy spicy chicken fillet with fresh veggies and special sauce", category: "Fast Food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", popular: true },
  { id: "ff-2", name: "Loaded Fries", price: 450, description: "Crispy fries topped with cheese, jalapeños, and special sauce", category: "Fast Food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop" },
  { id: "ff-3", name: "Chicken Shawarma", price: 400, description: "Middle Eastern wrap with grilled chicken and garlic sauce", category: "Fast Food", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop" },
  // Seafood
  { id: "sea-1", name: "Grilled Fish", price: 1400, description: "Fresh whole fish marinated and grilled with lemon butter", category: "Seafood", image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop" },
  { id: "sea-2", name: "Prawn Masala", price: 1600, description: "Jumbo prawns in rich masala curry with fragrant spices", category: "Seafood", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop", spicy: true },
  // Desserts
  { id: "des-1", name: "Gulab Jamun", price: 250, description: "Soft milk dumplings soaked in rose-flavored sugar syrup", category: "Desserts", image: "https://images.unsplash.com/photo-1666190053372-26b972ddfa40?w=400&h=300&fit=crop", popular: true },
  { id: "des-2", name: "Kheer", price: 300, description: "Creamy rice pudding with cardamom, pistachios, and almonds", category: "Desserts", image: "https://images.unsplash.com/photo-1571006682466-f0e76c3e0bbb?w=400&h=300&fit=crop" },
  // Drinks
  { id: "drk-1", name: "Fresh Mango Lassi", price: 250, description: "Chilled yogurt smoothie with ripe Pakistani mangoes", category: "Drinks", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop", popular: true },
  { id: "drk-2", name: "Kashmiri Chai", price: 200, description: "Pink tea with crushed nuts and a hint of cardamom", category: "Drinks", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop" },
  { id: "drk-3", name: "Fresh Lime Soda", price: 150, description: "Sparkling lime soda with mint, perfect summer cooler", category: "Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop" },
];
