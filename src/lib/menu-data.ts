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
  "All", "Fast Food", "Burgers", "Pizza", "Fries & Snacks", "Deals", "Drinks"
];

export const menuItems: MenuItem[] = [
  // Burgers
  { id: "brg-1", name: "Zinger Burger", price: 550, description: "Crispy spicy chicken fillet with lettuce, mayo & special sauce", category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", spicy: true, popular: true },
  { id: "brg-2", name: "Patty Burger", price: 450, description: "Juicy beef patty with cheese, pickles & classic sauce", category: "Burgers", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop", popular: true },
  { id: "brg-3", name: "Double Smash Burger", price: 750, description: "Two smashed beef patties with melted cheese & caramelized onions", category: "Burgers", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop" },
  { id: "brg-4", name: "Chicken Supreme Burger", price: 650, description: "Grilled chicken breast with avocado, bacon & garlic aioli", category: "Burgers", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee15d?w=400&h=300&fit=crop" },

  // Pizza
  { id: "pzz-1", name: "Chicken Tikka Pizza", price: 1200, description: "Loaded with spicy chicken tikka, onions & green chilies", category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop", spicy: true, popular: true },
  { id: "pzz-2", name: "Pepperoni Feast", price: 1100, description: "Classic pepperoni with extra mozzarella & Italian herbs", category: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" },
  { id: "pzz-3", name: "BBQ Ranch Pizza", price: 1300, description: "Smoky BBQ chicken with ranch drizzle & crispy onions", category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", popular: true },
  { id: "pzz-4", name: "Margherita", price: 850, description: "Fresh tomatoes, mozzarella & basil on thin crust", category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop" },

  // Fast Food
  { id: "ff-1", name: "Chicken Shawarma", price: 400, description: "Grilled chicken wrap with garlic sauce & fresh veggies", category: "Fast Food", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop", popular: true },
  { id: "ff-2", name: "Chicken Nuggets (10pc)", price: 500, description: "Golden crispy nuggets served with dipping sauces", category: "Fast Food", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop" },
  { id: "ff-3", name: "Hot Wings (6pc)", price: 550, description: "Fiery buffalo wings with blue cheese dip", category: "Fast Food", image: "https://images.unsplash.com/photo-1608039829572-9b0189c8a024?w=400&h=300&fit=crop", spicy: true },

  // Fries & Snacks
  { id: "frs-1", name: "Loaded Fries", price: 450, description: "Crispy fries topped with cheese, jalapeños & special sauce", category: "Fries & Snacks", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop", popular: true },
  { id: "frs-2", name: "Classic French Fries", price: 250, description: "Golden salted fries with ketchup", category: "Fries & Snacks", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop" },
  { id: "frs-3", name: "Mozzarella Sticks", price: 400, description: "Crispy breaded mozzarella with marinara dip", category: "Fries & Snacks", image: "https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=400&h=300&fit=crop" },
  { id: "frs-4", name: "Onion Rings", price: 300, description: "Crunchy battered onion rings with garlic mayo", category: "Fries & Snacks", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop" },

  // Deals
  { id: "deal-1", name: "Walkano Combo", price: 899, description: "Zinger Burger + Loaded Fries + Drink — Best value!", category: "Deals", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop", popular: true },
  { id: "deal-2", name: "Family Feast", price: 2499, description: "2 Burgers + Large Pizza + Fries + 4 Drinks", category: "Deals", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop" },
  { id: "deal-3", name: "Student Deal", price: 599, description: "Patty Burger + Fries + Regular Drink", category: "Deals", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop" },

  // Drinks
  { id: "drk-1", name: "Fresh Mango Shake", price: 300, description: "Thick & creamy mango milkshake with real fruit", category: "Drinks", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop", popular: true },
  { id: "drk-2", name: "Iced Lemon Soda", price: 150, description: "Sparkling lemon soda with fresh mint leaves", category: "Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop" },
  { id: "drk-3", name: "Oreo Shake", price: 350, description: "Creamy Oreo milkshake topped with whipped cream", category: "Drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop" },
  { id: "drk-4", name: "Cold Coffee", price: 300, description: "Chilled coffee blended with ice cream & chocolate", category: "Drinks", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop" },
];
