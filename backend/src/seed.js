const { prisma } = require("./config/db");

const products = [
  // APPAREL (20)
  {
    name: "Oversized Hoodie",
    description: "Premium cotton oversized hoodie",
    price: 89.99,
    stockQuantity: 45,
    category: "APPAREL",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400",
  },
  {
    name: "Cargo Pants",
    description: "Utility cargo trousers",
    price: 119.99,
    stockQuantity: 30,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
  },
  {
    name: "Graphic Tee",
    description: "Cotton graphic print tee",
    price: 39.99,
    stockQuantity: 80,
    category: "APPAREL",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
  {
    name: "Denim Jacket",
    description: "Classic washed denim jacket",
    price: 149.99,
    stockQuantity: 25,
    category: "APPAREL",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400",
  },
  {
    name: "Slim Chinos",
    description: "Stretch slim fit chinos",
    price: 79.99,
    stockQuantity: 40,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
  },
  {
    name: "Linen Shirt",
    description: "Breathable linen button-up",
    price: 69.99,
    stockQuantity: 35,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
  },
  {
    name: "Bomber Jacket",
    description: "Satin bomber with embroidery",
    price: 189.99,
    stockQuantity: 15,
    category: "APPAREL",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
  },
  {
    name: "Track Pants",
    description: "Tapered athletic track pants",
    price: 64.99,
    stockQuantity: 50,
    category: "APPAREL",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400",
  },
  {
    name: "Turtleneck Knit",
    description: "Merino wool turtleneck",
    price: 99.99,
    stockQuantity: 20,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400",
  },
  {
    name: "Coach Jacket",
    description: "Lightweight nylon coach jacket",
    price: 129.99,
    stockQuantity: 22,
    category: "APPAREL",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400",
  },
  {
    name: "Pleated Trousers",
    description: "High waist pleated trousers",
    price: 109.99,
    stockQuantity: 18,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4b7c?w=400",
  },
  {
    name: "Flannel Shirt",
    description: "Brushed cotton flannel",
    price: 59.99,
    stockQuantity: 42,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400",
  },
  {
    name: "Zip Hoodie",
    description: "Full zip heavyweight hoodie",
    price: 94.99,
    stockQuantity: 33,
    category: "APPAREL",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400",
  },
  {
    name: "Wide Leg Jeans",
    description: "90s wide leg denim",
    price: 134.99,
    stockQuantity: 28,
    category: "APPAREL",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
  },
  {
    name: "Polo Shirt",
    description: "Pique cotton polo",
    price: 54.99,
    stockQuantity: 60,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400",
  },
  {
    name: "Puffer Vest",
    description: "Lightweight down puffer vest",
    price: 114.99,
    stockQuantity: 24,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=400",
  },
  {
    name: "Crewneck Sweatshirt",
    description: "Fleece lined crewneck",
    price: 74.99,
    stockQuantity: 55,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=400",
  },
  {
    name: "Shorts",
    description: "Twill bermuda shorts",
    price: 49.99,
    stockQuantity: 65,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400",
  },
  {
    name: "Trench Coat",
    description: "Double breasted trench",
    price: 299.99,
    stockQuantity: 10,
    category: "APPAREL",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400",
  },
  {
    name: "Muscle Tee",
    description: "Ribbed sleeveless muscle tee",
    price: 29.99,
    stockQuantity: 90,
    category: "APPAREL",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
  },

  // ACCESSORIES (15)
  {
    name: "Bucket Hat",
    description: "Cotton twill bucket hat",
    price: 34.99,
    stockQuantity: 70,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
  },
  {
    name: "Beanie",
    description: "Ribbed knit beanie",
    price: 24.99,
    stockQuantity: 85,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400",
  },
  {
    name: "Canvas Belt",
    description: "Webbing canvas belt",
    price: 19.99,
    stockQuantity: 100,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400",
  },
  {
    name: "Wool Scarf",
    description: "Merino wool plaid scarf",
    price: 44.99,
    stockQuantity: 40,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400",
  },
  {
    name: "Snapback Cap",
    description: "Structured snapback cap",
    price: 39.99,
    stockQuantity: 60,
    category: "ACCESSORIES",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400",
  },
  {
    name: "Leather Gloves",
    description: "Touchscreen leather gloves",
    price: 54.99,
    stockQuantity: 30,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400",
  },
  {
    name: "Sunglasses",
    description: "UV400 square sunglasses",
    price: 79.99,
    stockQuantity: 45,
    category: "ACCESSORIES",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
  },
  {
    name: "Chain Necklace",
    description: "Stainless steel chain",
    price: 29.99,
    stockQuantity: 55,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
  },
  {
    name: "Dad Hat",
    description: "Unstructured cotton dad hat",
    price: 32.99,
    stockQuantity: 75,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400",
  },
  {
    name: "Wristwatch",
    description: "Minimalist quartz watch",
    price: 149.99,
    stockQuantity: 20,
    category: "ACCESSORIES",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
  {
    name: "Leather Wallet",
    description: "Slim bifold leather wallet",
    price: 49.99,
    stockQuantity: 50,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
  },
  {
    name: "Rings Set",
    description: "Minimalist silver rings set",
    price: 34.99,
    stockQuantity: 65,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
  },
  {
    name: "Ear Studs",
    description: "Gold plated ear studs",
    price: 24.99,
    stockQuantity: 80,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400",
  },
  {
    name: "Balaclava",
    description: "Knit face balaclava",
    price: 29.99,
    stockQuantity: 35,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1610398752800-146f269dfcc8?w=400",
  },
  {
    name: "Socks Pack",
    description: "Pack of 5 crew socks",
    price: 19.99,
    stockQuantity: 120,
    category: "ACCESSORIES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400",
  },

  // BAGS (10)
  {
    name: "Tote Bag",
    description: "Heavy canvas tote",
    price: 44.99,
    stockQuantity: 55,
    category: "BAGS",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400",
  },
  {
    name: "Backpack",
    description: "30L utility backpack",
    price: 119.99,
    stockQuantity: 25,
    category: "BAGS",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
  },
  {
    name: "Crossbody Bag",
    description: "Mini crossbody shoulder bag",
    price: 69.99,
    stockQuantity: 40,
    category: "BAGS",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
  },
  {
    name: "Duffle Bag",
    description: "Waxed canvas duffle",
    price: 159.99,
    stockQuantity: 15,
    category: "BAGS",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400",
  },
  {
    name: "Fanny Pack",
    description: "Nylon waist fanny pack",
    price: 39.99,
    stockQuantity: 60,
    category: "BAGS",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
  },
  {
    name: "Messenger Bag",
    description: "Waxed cotton messenger",
    price: 89.99,
    stockQuantity: 20,
    category: "BAGS",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?w=400",
  },
  {
    name: "Gym Bag",
    description: "Sport duffel gym bag",
    price: 54.99,
    stockQuantity: 35,
    category: "BAGS",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
  },
  {
    name: "Laptop Bag",
    description: "Padded 15in laptop bag",
    price: 79.99,
    stockQuantity: 28,
    category: "BAGS",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400",
  },
  {
    name: "Shopping Bag",
    description: "Reusable shopping tote",
    price: 14.99,
    stockQuantity: 150,
    category: "BAGS",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
  },
  {
    name: "Mini Backpack",
    description: "Compact mini backpack",
    price: 64.99,
    stockQuantity: 45,
    category: "BAGS",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400",
  },

  // SHOES (5)
  {
    name: "Chunky Sneakers",
    description: "Chunky sole dad sneakers",
    price: 139.99,
    stockQuantity: 30,
    category: "SHOES",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  },
  {
    name: "Chelsea Boots",
    description: "Leather chelsea boots",
    price: 199.99,
    stockQuantity: 18,
    category: "SHOES",
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400",
  },
  {
    name: "Slip On",
    description: "Canvas slip on shoes",
    price: 59.99,
    stockQuantity: 50,
    category: "SHOES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
  },
  {
    name: "High Top Sneakers",
    description: "Canvas high top sneakers",
    price: 89.99,
    stockQuantity: 40,
    category: "SHOES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400",
  },
  {
    name: "Loafers",
    description: "Suede penny loafers",
    price: 169.99,
    stockQuantity: 22,
    category: "SHOES",
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1604163546180-039a1781c0d2?w=400",
  },
];

const seed = async () => {
  await prisma.products.createMany({
    data: products,
  });
  console.log("Seeded!");
  await prisma.$disconnect();
};

seed();
