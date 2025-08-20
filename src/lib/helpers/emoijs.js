export const animalEmojis = [
    { name: "Dog", emoji: "🐶" },
    { name: "Duck", emoji: "🦆" },
    { name: "Cat", emoji: "🐱" },
    { name: "Mouse", emoji: "🐭" },
    { name: "Hamster", emoji: "🐹" },
    { name: "Rabbit", emoji: "🐰" },
    { name: "Fox", emoji: "🦊" },
    { name: "Bear", emoji: "🐻" },
    { name: "Panda", emoji: "🐼" },
    { name: "Koala", emoji: "🐨" },
    { name: "Tiger", emoji: "🐯" },
    { name: "Lion", emoji: "🦁" },
    { name: "Cow", emoji: "🐮" },
    { name: "Pig", emoji: "🐷" },
    { name: "Frog", emoji: "🐸" },
    { name: "Monkey", emoji: "🐵" },
    { name: "Chicken", emoji: "🐔" },
    { name: "Penguin", emoji: "🐧" },
    { name: "Bird", emoji: "🐦" },
    { name: "Elephant", emoji: "🐘" },
    { name: "Horse", emoji: "🐴" },
    { name: "Sheep", emoji: "🐑" },
    { name: "Goat", emoji: "🐐" },
    { name: "Duck", emoji: "🦆" },
    { name: "Owl", emoji: "🦉" },
    { name: "Snake", emoji: "🐍" },
    { name: "Turtle", emoji: "🐢" },
    { name: "Fish", emoji: "🐟" },
    { name: "Whale", emoji: "🐳" },
    { name: "Dolphin", emoji: "🐬" }
];

export const findEmoji = (name) => {
    const animal = animalEmojis.find(animal => animal.name.toLowerCase() === name.toLowerCase());
    return animal ? animal.emoji : null;
};
