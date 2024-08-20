import { faker } from '@faker-js/faker';

const musicCategories = [
    "Instrumentos Musicales",
    "Accesorios Musicales",
    "Álbumes",
    "Merchandising",
    "Software de Producción Musical"
];

const musicGenres = [
    "Rock",
    "Pop",
    "Jazz",
    "Blues",
    "Clásica",
    "Reggae",
    "Hip-Hop",
    "Electrónica",
    "Country",
    "Metal"
];

const musicArtists = [
    "Queen",
    "The Beatles",
    "Michael Jackson",
    "Madonna",
    "Elvis Presley",
    "Bob Marley",
    "Eminem",
    "Miles Davis",
    "Ludwig van Beethoven",
    "Nirvana"
];

export const generateMockMusicProducts = (count = 100) => {
    let products = [];
    for (let i = 0; i < count; i++) {
        products.push({
            title: faker.music.songName(),
            description: `${faker.helpers.arrayElement(musicGenres)} por ${faker.helpers.arrayElement(musicArtists)}`,
            price: faker.commerce.price(),
            thumbnails: [faker.image.imageUrl()],
            code: faker.random.alphaNumeric(10),
            stock: faker.datatype.number({ min: 1, max: 100 }),
            category: faker.helpers.arrayElement(musicCategories),
            status: true,
        });
    }
    return products;
};
