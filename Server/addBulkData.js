// import mongoose from 'mongoose';
// import { Dish } from './models/dishModel.js';


// const connectDB = async () => {
//   try {
//     await mongoose.connect( process.env.DATABASE_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 50000 
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };



// const insertDishes = async () => {
//   try {
//     const dishes = [
//       {
//         name: "Vegetable Biriyani",
//         description: "Aromatic basmati rice with indian spices and vegetables",
//         price: 220,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839957/veg_biriyani_zjc9hw.jpg",
//         menuItem: "66cf065e06c067e730a7a078"
//       },
//       {
//         name: "Mutton Biriyani",
//         description: "Aromatic basmati rice with indian spices and juicy mutton",
//         price: 275,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839956/mutton_biriyani_qggja4.jpg",
//         menuItem: "66cf065e06c067e730a7a078"
//       },
//       {
//         name: "Chicken Biriyani",
//         description: "Aromatic basmati rice with indian spices and boneless chicken",
//         price: 250,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839955/chicken_biriyani_cb6ekq.jpg",
//         menuItem: "66cf065e06c067e730a7a078"
//       },
//       {
//         name: "Steak Truffle",
//         description: "Delicate tortellini filled with steak, served in a rich truffle cream sauce",
//         price: 275,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839961/Truffle_Steak_Tortellini_cr2ujj.jpg",
//         menuItem: "66cf07f406c067e730a7a07a"
//       },
//       {
//         name: "Steak Frites",
//         description: "Juicy steak paired with crispy golden fries, served with a side of herb butter.",
//         price: 275,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839959/steak_frites_w1vodg.jpg",
//         menuItem: "66cf07f406c067e730a7a07a"
//       },
//       {
//         name: "Steak Prime Sirlion",
//         description: "Grilled prime sirloin, juicy and flavorful, served with a side of your choice.",
//         price: 300,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839958/prime_sirloin_steak_d06bge.jpg",
//         menuItem: "66cf07f406c067e730a7a07a"
//       },
//       {
//         name: "Pepperoni Pizza",
//         description: "Classic pizza topped with spicy pepperoni and melted mozzarella cheese.",
//         price: 200,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839965/pepperoni_pizza_bhatfr.jpg",
//         menuItem: "66c32b2574aaa682834e5116"
//       },
//       {
//         name: "Hawaiian Pizza",
//         description: "A sweet and savory combo of ham, pineapple, and melted mozzarella.",
//         price: 200,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839963/hawaiian_pizza_zrj6ea.jpg",
//         menuItem: "66c32b2574aaa682834e5116"
//       },
//       {
//         name: "Chicken Ranch Pizza",
//         description: "Loaded with tender chicken, crispy bacon, and creamy ranch sauce.",
//         price: 175,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839962/chicken_bacon_ranch_pizza_sffbdu.jpg",
//         menuItem: "66c32b2574aaa682834e5116"
//       },
//       {
//         name: "Fried Wings",
//         description: "Crispy, seasoned wings with a side of dipping sauce.",
//         price: 165,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839969/fried_wings_z3gxim.jpg",
//         menuItem: "66cf139906c067e730a7a080"
//       },
//       {
//         name: "Fried Drumsticks",
//         description: "Juicy drumsticks fried to golden perfection.",
//         price: 150,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839968/fried_drumsticks_ycibse.jpg",
//         menuItem: "66cf139906c067e730a7a080"
//       },
//       {
//         name: "Chicken Popcorn",
//         description: "Bite-sized chicken, crunchy on the outside, tender on the inside.",
//         price: 165,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839967/fried_chicken_popcorn_i88osu.jpg",
//         menuItem: "66cf139906c067e730a7a080"
//       },
//       {
//         name: "White Forest Cake",
//         description: "Light and airy layers of vanilla cake with white chocolate and cherries.",
//         price: 400,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839975/white_forest_tjt8jn.jpg",
//         menuItem: "66cf148e06c067e730a7a082"
//       },
//       {
//         name: "Tiramisu Cake",
//         description: "Rich coffee-soaked sponge layered with creamy mascarpone and cocoa.",
//         price: 400,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839975/white_forest_tjt8jn.jpg",
//         menuItem: "66cf148e06c067e730a7a082"
//       },
//       {
//         name: "Black Forest Cake",
//         description: "Decadent chocolate cake with layers of cherries and whipped cream.",
//         price: 400,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839971/balck_forest_cake_tobene.jpg",
//         menuItem: "66cf148e06c067e730a7a082"
//       },
//       {
//         name: "Roasted Chicken Mini",
//         description: "Savory roasted chicken, perfectly seasoned and tender.",
//         price: 220,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839978/roasted_chicken_jishbi.jpg",
//         menuItem: "66cf15cb06c067e730a7a084"
//       },
//       {
//         name: "Roasted Chicken Large",
//         description: "Juicy, full-sized roasted chicken with a crispy, flavorful skin.",
//         price: 350,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839977/roasted_chicken_family_meal_xbka5p.jpg",
//         menuItem: "66cf15cb06c067e730a7a084"
//       },
//       {
//         name: "Grilled Chicken",
//         description: "Char-grilled chicken with a smoky, succulent taste.",
//         price: 275,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839975/grilled_chicken_ah6zhc.jpg",
//         menuItem: "66cf15cb06c067e730a7a084"
//       },
//       {
//         name: "Pina Colada",
//         description: "Creamy blend of pineapple and coconut with a tropical twist.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839986/pina_colada_vn6chd.jpg",
//         menuItem: "66cf16d206c067e730a7a088"
//       },
//       {
//         name: "Mint Orange",
//         description: "Refreshing orange drink with a hint of mint.",
//         price: 90,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839983/mint_orange_wlbmb4.jpg",
//         menuItem: "66cf16d206c067e730a7a088"
//       },
//       {
//         name: "Coffee Frappe",
//         description: "Icy coffee blend, smooth and energizing.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839981/Cofee_frappe_bccw1t.jpg",
//         menuItem: "66cf16d206c067e730a7a088"
//       },
//       {
//         name: "Chilled Sodas",
//         description: "Crisp and refreshing soda served ice-cold.",
//         price: 90,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839980/cococola_kyduqm.jpg",
//         menuItem: "66cf16d206c067e730a7a088"
//       },
//       {
//         name: "Butter Tarts",
//         description: "Sweet and gooey tarts with a rich, buttery filling.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839990/butter_tarts_tyfdy4.jpg",
//         menuItem: "66cf175706c067e730a7a08a"
//       },
//       {
//         name: "Cheese Bite",
//         description: "Creamy, smooth cheesecake on a graham cracker crust.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839989/cheese_cake_tzyse9.jpg",
//         menuItem: "66cf175706c067e730a7a08a"
//       },
//       {
//         name: "Apple Pie",
//         description: " Classic pie with spiced apples encased in a flaky crust.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839986/apple_pie_lkkw73.jpg",
//         menuItem: "66cf175706c067e730a7a08a"
//       },
//       {
//         name: "Tom Yum Fried Rice",
//         description: "Flavorful fried rice with tangy Tom Yum spices and fresh herbs.",
//         price: 120,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724840000/tom_yum_fried_rice_a18wsn.jpg",
//         menuItem: "66cf182106c067e730a7a08c"
//       },
//       {
//         name: "Tofu Fried Rice",
//         description: "Delicious fried rice with crispy tofu and a medley of vegetables.",
//         price: 100,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724840000/tom_yum_fried_rice_a18wsn.jpg",
//         menuItem: "66cf182106c067e730a7a08c"
//       },
//       {
//         name: "Thai Chicken Fried Rice",
//         description: "Savory fried rice with tender chicken, vegetables, and Thai seasonings.",
//         price: 120,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839992/thai_chicken_fried_rice_upquwu.jpg",
//         menuItem: "66cf182106c067e730a7a08c"
//       },
//       {
//         name: "Shrimp Fried Rice",
//         description: "Tasty fried rice with succulent shrimp and a mix of fresh veggies.",
//         price: 140,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839991/shripm_fried_rice_fmy904.jpg",
//         menuItem: "66cf182106c067e730a7a08c"
//       },
//       {
//         name: "Vegan Meal",
//         description: "A variety of flavorful Indian vegetable dishes served with rice.",
//         price: 10.99,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839898/Veg_meal_otkmow.jpg",
//         menuItem: "66d1427bed90b87bfaac9be7"
//       },
//       {
//         name: "Seafood Meal",
//         description: "A selection of spiced seafood dishes with traditional Indian sides.",
//         price: 10.99,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839897/seafood_meal_r4vo6q.jpg",
//         menuItem: "66d1427bed90b87bfaac9be7"
//       },
//       {
//         name: "Roti Meal",
//         description: "Soft, unleavened roti served with a choice of savory Indian curries and sides.",
//         price: 10.99,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839895/roti_meal_ki1dg7.jpg",
//         menuItem: "66d1427bed90b87bfaac9be7"
//       },
//       {
//         name: "Naan Meal",
//         description: "Fluffy naan bread paired with rich, aromatic Indian curries and sides.",
//         price: 10.99,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839895/naan_meal_pdhodn.jpg",
//         menuItem: "66d1427bed90b87bfaac9be7"
//       },
//       {
//         name: "Vegan Wrap",
//         description: "Fresh vegetables and plant-based ingredients wrapped in a soft tortilla.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839936/Vegetarian_wrap_auncgm.jpg",
//         menuItem: "66d14ea8ed90b87bfaac9bfc"
//       },
//       {
//         name: "Thai Wrap",
//         description: "Flavorful Thai-inspired filling with a mix of veggies and tangy sauce.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839936/Vegetarian_wrap_auncgm.jpg",
//         menuItem: "66d14ea8ed90b87bfaac9bfc"
//       },
//       {
//         name: "Mediterranean Wrap",
//         description: "Savory Mediterranean ingredients like hummus, olives, and veggies wrapped in a tortilla.",
//         price: 110,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839934/Mediterranean_wrap_wsqdfd.jpg",
//         menuItem: "66d14ea8ed90b87bfaac9bfc"
//       },
//       {
//         name: "Shawarma",
//         description: "Spiced, marinated meat served in a pita with fresh vegetables and sauce.",
//         price: 150,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839903/shawarma_gq8x8i.jpg",
//         menuItem: "66d146f4ed90b87bfaac9be9"
//       },
//       {
//         name: "Mutton Kebab",
//         description: "Tender mutton skewers grilled to perfection with aromatic spices.",
//         price: 175,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839902/mutton_kebab_awmnvt.jpg",
//         menuItem: "66d146f4ed90b87bfaac9be9"
//       },
//       {
//         name: "Beef Kebab",
//         description: "Juicy beef skewers, seasoned and grilled for a rich, smoky flavor.",
//         price: 175,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839901/beef_kebab_knvark.jpg",
//         menuItem: "66d146f4ed90b87bfaac9be9"
//       },
//       {
//         name: "BBQ Kebab",
//         description: "Savory kebabs with a smoky barbecue glaze and grilled to perfection.",
//         price: 175,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839898/BBQ_Kebab_kxitcc.jpg",
//         menuItem: "66d146f4ed90b87bfaac9be9"
//       },
//       {
//         name: "Tom Yum Noodles",
//         description: "Spicy and tangy noodles with aromatic Tom Yum broth and fresh herbs.",
//         price: 135,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839907/tom_yum_noodels_cybaqb.jpg",
//         menuItem: "66d1481fed90b87bfaac9beb"
//       },
//       {
//         name: "Pad Thai",
//         description: "Classic Thai stir-fried noodles with shrimp, tofu, and a zesty tamarind sauce.",
//         price: 135,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839906/Pad_thai_rx2krp.jpg",
//         menuItem: "66d1481fed90b87bfaac9beb"
//       },
//       {
//         name: "Hakka Noodles",
//         description: "Flavorful stir-fried noodles with vegetables and a savory soy-based sauce.",
//         price: 135,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839904/hakka_noodles_iulnf2.jpg",
//         menuItem: "66d1481fed90b87bfaac9beb"
//       },
//       {
//         name: "Street Tacos",
//         description: "Classic Mexican tacos with a choice of fillings, topped with fresh onions and cilantro.",
//         price: 275,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839933/Street_tacos_vaxxnd.jpg",
//         menuItem: "66d14df8ed90b87bfaac9bfa"
//       },
//       {
//         name: "Fish Tacos",
//         description: "Crispy fish fillets in soft tortillas, garnished with slaw and a tangy sauce.",
//         price: 295,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839931/Fish_tacos_qydlqq.jpg",
//         menuItem: "66d14df8ed90b87bfaac9bfa"
//       },
//       {
//         name: "Carne Asada Tacos",
//         description: "Tender grilled beef, seasoned to perfection and served with fresh toppings.",
//         price: 275,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839929/Carne_asada_tacos_vwpwmq.jpg",
//         menuItem: "66d14df8ed90b87bfaac9bfa"
//       },
//       {
//         name: "Al Pastor Tacos",
//         description: "Marinated pork with a blend of spices and pineapple, served with traditional garnishes.",
//         price: 275,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839928/Al_pastor_tacos_nded0c.jpg",
//         menuItem: "66d14df8ed90b87bfaac9bfa"
//       },
//       {
//         name: "Uramaki Sushi",
//         description: "Inside-out rolls with a variety of fillings, topped with fresh ingredients.",
//         price: 200,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839927/Uramaki_sushi_p0m9bh.jpg",
//         menuItem: "66d14a8fed90b87bfaac9bf3"
//       },
//       {
//         name: "Nigiri Sushi",
//         description: "Delicate slices of raw fish or seafood atop a small mound of seasoned rice.",
//         price: 200,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839925/Nigiri_sushi_qvg9yh.jpg",
//         menuItem: "66d14a8fed90b87bfaac9bf3"
//       },
//       {
//         name: "Maki Sushi",
//         description: "Traditional rolls with a choice of fillings wrapped in seaweed and rice.",
//         price: 200,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839924/Maki_sushi_ruhrju.jpg",
//         menuItem: "66d14a8fed90b87bfaac9bf3"
//       },
//       {
//         name: "Gunkan Sushi",
//         description: "Rice and seafood or toppings wrapped in seaweed, forming a small, boat-like shape.",
//         price: 200,
//         image: "https://res.cloudinary.com/aw96/image/upload/v1724839923/Gunkan_sushi_ceu2zw.jpg",
//         menuItem: "66d14a8fed90b87bfaac9bf3"
//       }

//     ];



//     const insertedDishes = await Dish.insertMany(dishes);
//     console.log('Dishes inserted successfully:', insertedDishes);

//   } catch (error) {
//     console.error('Error inserting dishes:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// };
// connectDB();
// await insertDishes();