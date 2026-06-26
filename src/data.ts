export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Ceramic Vase",
    description: "A beautiful, handcrafted ceramic vase perfect for dried flowers or as a standalone piece. Features a matte white finish.",
    price: 45.00,
    category: "Decor",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8
  },
  {
    id: "2",
    name: "Linen Lounge Chair",
    description: "Comfort meets style with this mid-century inspired lounge chair. Upholstered in premium natural linen.",
    price: 350.00,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2069&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: "3",
    name: "Matte Black Table Lamp",
    description: "Provide warm ambient lighting to any room with this sleek, modern table lamp. Features adjustable brightness.",
    price: 85.00,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7
  },
  {
    id: "4",
    name: "Woven Storage Basket",
    description: "Keep your space organized with these hand-woven seagrass baskets. Durable and aesthetically pleasing.",
    price: 32.00,
    category: "Storage",
    image: "https://images.unsplash.com/photo-1610427978252-8d77421ab509?q=80&w=2071&auto=format&fit=crop",
    rating: 4.6
  },
  {
    id: "5",
    name: "Abstract Canvas Wall Art",
    description: "Add a touch of color to your walls with this original abstract canvas print. Framed in natural oak.",
    price: 120.00,
    category: "Art",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5
  },
  {
    id: "6",
    name: "Solid Oak Dining Table",
    description: "Gather around this sturdy, beautifully crafted solid oak dining table. Seats up to 6 people comfortably.",
    price: 850.00,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0
  }
];

export const CATEGORIES = [
  "All",
  "Furniture",
  "Lighting",
  "Decor",
  "Storage",
  "Art"
];
