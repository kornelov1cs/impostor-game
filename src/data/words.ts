/**
 * Word Lists for Impostor Social Deduction Game
 *
 * Each category contains 75+ words carefully selected for gameplay.
 * Words range from easy to hard difficulty to keep the game engaging
 * for players of all skill levels.
 */

export interface WordCategory {
  name: string;
  words: string[];
  description?: string;
}

/**
 * Animals category - creatures from common pets to exotic wildlife
 */
const animals: WordCategory = {
  name: 'Animals',
  description: 'Creatures from the animal kingdom',
  words: [
    // Easy - Common animals (25 words)
    'Dog', 'Cat', 'Fish', 'Bird', 'Cow', 'Pig', 'Horse', 'Chicken',
    'Duck', 'Rabbit', 'Mouse', 'Frog', 'Turtle', 'Bear', 'Lion',
    'Tiger', 'Elephant', 'Monkey', 'Giraffe', 'Zebra', 'Penguin',
    'Dolphin', 'Whale', 'Shark', 'Snake',

    // Medium - Less common but recognizable (25 words)
    'Raccoon', 'Squirrel', 'Deer', 'Moose', 'Fox', 'Wolf', 'Owl',
    'Eagle', 'Parrot', 'Flamingo', 'Ostrich', 'Peacock', 'Swan',
    'Pelican', 'Seal', 'Walrus', 'Otter', 'Beaver', 'Porcupine',
    'Hedgehog', 'Kangaroo', 'Koala', 'Panda', 'Gorilla', 'Cheetah',

    // Hard - Exotic or unusual animals (25 words)
    'Platypus', 'Narwhal', 'Axolotl', 'Pangolin', 'Armadillo',
    'Chameleon', 'Iguana', 'Komodo Dragon', 'Meerkat', 'Lemur',
    'Sloth', 'Toucan', 'Albatross', 'Hummingbird', 'Pelican',
    'Seahorse', 'Octopus', 'Jellyfish', 'Mantis', 'Tarantula',
    'Scorpion', 'Chinchilla', 'Capybara', 'Anteater', 'Vulture'
  ]
};

/**
 * Food category - dishes, ingredients, and culinary items
 */
const food: WordCategory = {
  name: 'Food',
  description: 'Dishes, ingredients, and culinary delights',
  words: [
    // Easy - Common foods (25 words)
    'Pizza', 'Burger', 'Sandwich', 'Bread', 'Rice', 'Pasta', 'Chicken',
    'Beef', 'Egg', 'Cheese', 'Milk', 'Butter', 'Apple', 'Banana',
    'Orange', 'Cake', 'Cookie', 'Ice Cream', 'Chocolate', 'Candy',
    'Popcorn', 'Fries', 'Soup', 'Salad', 'Water',

    // Medium - Common but more specific (25 words)
    'Spaghetti', 'Lasagna', 'Burrito', 'Taco', 'Sushi', 'Ramen',
    'Steak', 'Bacon', 'Waffle', 'Pancake', 'Donut', 'Muffin',
    'Bagel', 'Pretzel', 'Yogurt', 'Cereal', 'Oatmeal', 'Honey',
    'Peanut Butter', 'Jam', 'Ketchup', 'Mustard', 'Pickle',
    'Avocado', 'Mango',

    // Hard - Specialty or exotic foods (25 words)
    'Croissant', 'Quiche', 'Ravioli', 'Risotto', 'Paella', 'Goulash',
    'Borscht', 'Kimchi', 'Hummus', 'Falafel', 'Pho', 'Dim Sum',
    'Tiramisu', 'Bruschetta', 'Gazpacho', 'Quinoa', 'Couscous',
    'Tempura', 'Wasabi', 'Ceviche', 'Escargot', 'Baguette',
    'Soufflé', 'Macaron', 'Baklava'
  ]
};

/**
 * Places category - locations from everyday spots to exotic destinations
 */
const places: WordCategory = {
  name: 'Places',
  description: 'Locations and destinations',
  words: [
    // Easy - Common places (25 words)
    'Home', 'School', 'Park', 'Beach', 'Store', 'Mall', 'Restaurant',
    'Hospital', 'Library', 'Museum', 'Zoo', 'Playground', 'Office',
    'Gym', 'Stadium', 'Theater', 'Hotel', 'Airport', 'Station',
    'Bank', 'Church', 'Temple', 'Garden', 'Farm', 'Forest',

    // Medium - Less common locations (25 words)
    'Cathedral', 'Castle', 'Palace', 'Fortress', 'Lighthouse', 'Harbor',
    'Marina', 'Pier', 'Boardwalk', 'Carnival', 'Casino', 'Arcade',
    'Bakery', 'Café', 'Bookstore', 'Gallery', 'Studio', 'Workshop',
    'Warehouse', 'Factory', 'Laboratory', 'Aquarium', 'Planetarium',
    'Observatory', 'Monastery',

    // Hard - Exotic or unusual places (25 words)
    'Bazaar', 'Oasis', 'Fjord', 'Glacier', 'Volcano', 'Canyon',
    'Reef', 'Cavern', 'Grotto', 'Quarry', 'Vineyard', 'Orchard',
    'Meadow', 'Prairie', 'Tundra', 'Savanna', 'Rainforest', 'Archipelago',
    'Peninsula', 'Isthmus', 'Embassy', 'Consulate', 'Sanctuary',
    'Conservatory', 'Pavilion'
  ]
};

/**
 * Objects category - everyday items and specialized tools
 */
const objects: WordCategory = {
  name: 'Objects',
  description: 'Things and items from daily life',
  words: [
    // Easy - Common household items (25 words)
    'Phone', 'Computer', 'Television', 'Chair', 'Table', 'Bed', 'Lamp',
    'Clock', 'Mirror', 'Door', 'Window', 'Book', 'Pen', 'Pencil',
    'Bag', 'Wallet', 'Keys', 'Bottle', 'Cup', 'Plate', 'Fork',
    'Spoon', 'Knife', 'Shoes', 'Hat',

    // Medium - Less common objects (25 words)
    'Umbrella', 'Briefcase', 'Suitcase', 'Backpack', 'Helmet', 'Goggles',
    'Camera', 'Microphone', 'Speaker', 'Headphones', 'Guitar', 'Piano',
    'Drum', 'Trumpet', 'Violin', 'Paintbrush', 'Canvas', 'Easel',
    'Telescope', 'Microscope', 'Compass', 'Binoculars', 'Flashlight',
    'Lantern', 'Candle',

    // Hard - Specialized or technical objects (25 words)
    'Synthesizer', 'Metronome', 'Sextant', 'Astrolabe', 'Hourglass',
    'Sundial', 'Abacus', 'Typewriter', 'Gramophone', 'Phonograph',
    'Loom', 'Anvil', 'Kiln', 'Crucible', 'Cauldron', 'Bellows',
    'Theodolite', 'Periscope', 'Kaleidoscope', 'Prism', 'Pendulum',
    'Spindle', 'Lyre', 'Harp', 'Tambourine'
  ]
};

/**
 * Activities/Concepts category - actions, emotions, and abstract ideas
 */
const activitiesConcepts: WordCategory = {
  name: 'Activities & Concepts',
  description: 'Actions, emotions, and abstract ideas',
  words: [
    // Easy - Common activities and basic concepts (25 words)
    'Running', 'Walking', 'Jumping', 'Swimming', 'Dancing', 'Singing',
    'Cooking', 'Eating', 'Sleeping', 'Reading', 'Writing', 'Drawing',
    'Painting', 'Playing', 'Shopping', 'Cleaning', 'Driving', 'Flying',
    'Sailing', 'Fishing', 'Camping', 'Hiking', 'Biking', 'Skiing',
    'Surfing',

    // Medium - More complex activities (25 words)
    'Gardening', 'Baking', 'Knitting', 'Sewing', 'Sculpting', 'Photography',
    'Jogging', 'Sprinting', 'Climbing', 'Diving', 'Kayaking', 'Rafting',
    'Bowling', 'Golf', 'Tennis', 'Basketball', 'Soccer', 'Baseball',
    'Volleyball', 'Boxing', 'Wrestling', 'Karate', 'Yoga', 'Meditation',
    'Gymnastics',

    // Hard - Abstract concepts and specialized activities (25 words)
    'Negotiation', 'Diplomacy', 'Democracy', 'Freedom', 'Justice',
    'Equality', 'Harmony', 'Balance', 'Evolution', 'Revolution',
    'Innovation', 'Creativity', 'Imagination', 'Inspiration', 'Courage',
    'Patience', 'Wisdom', 'Knowledge', 'Philosophy', 'Psychology',
    'Architecture', 'Engineering', 'Astronomy', 'Geology', 'Ecology'
  ]
};

/**
 * All word categories organized in an array
 */
export const wordCategories: WordCategory[] = [
  animals,
  food,
  places,
  objects,
  activitiesConcepts
];

/**
 * Get a random word from a specific category
 * @param categoryName - The name of the category
 * @returns A random word from the category, or null if category not found
 */
export function getRandomWord(categoryName: string): string | null {
  const category = wordCategories.find(
    cat => cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category || category.words.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * category.words.length);
  const word = category.words[randomIndex];
  return word ?? null;
}

/**
 * Get a random word from any category
 * @returns A random word from all categories
 */
export function getRandomWordFromAll(): string {
  const allWords = wordCategories.flatMap(cat => cat.words);
  const randomIndex = Math.floor(Math.random() * allWords.length);
  const word = allWords[randomIndex];
  if (!word) {
    throw new Error('No words available');
  }
  return word;
}

/**
 * Get all available category names
 * @returns Array of category names
 */
export function getCategoryNames(): string[] {
  return wordCategories.map(cat => cat.name);
}

/**
 * Get a category by name
 * @param categoryName - The name of the category
 * @returns The category object, or undefined if not found
 */
export function getCategory(categoryName: string): WordCategory | undefined {
  return wordCategories.find(
    cat => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
}

/**
 * Validate if a word exists in the word lists
 * @param word - The word to validate
 * @returns boolean indicating if the word exists
 */
export function isValidWord(word: string): boolean {
  return wordCategories.some(cat =>
    cat.words.some(w => w.toLowerCase() === word.toLowerCase())
  );
}

/**
 * Get word count statistics
 * @returns Object with word count per category and total
 */
export function getWordStats() {
  const stats = wordCategories.reduce((acc, cat) => {
    acc[cat.name] = cat.words.length;
    return acc;
  }, {} as Record<string, number>);

  stats['Total'] = wordCategories.reduce((sum, cat) => sum + cat.words.length, 0);

  return stats;
}

// Export individual categories for direct access
export { animals, food, places, objects, activitiesConcepts };
