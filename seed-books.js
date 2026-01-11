require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./src/models/book');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore';

const sampleBooks = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        price: 12.99,
        publishedDate: new Date("1960-07-11"),
        inStock: true
    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        price: 14.99,
        publishedDate: new Date("1949-06-08"),
        inStock: true
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        price: 10.99,
        publishedDate: new Date("1925-04-10"),
        inStock: true
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        price: 9.99,
        publishedDate: new Date("1813-01-28"),
        inStock: true
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        price: 11.99,
        publishedDate: new Date("1951-07-16"),
        inStock: false
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        genre: "Fantasy",
        price: 15.99,
        publishedDate: new Date("1997-06-26"),
        inStock: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        price: 13.99,
        publishedDate: new Date("1937-09-21"),
        inStock: true
    },
    {
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        genre: "Science Fiction",
        price: 12.49,
        publishedDate: new Date("1953-10-19"),
        inStock: true
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        price: 24.99,
        publishedDate: new Date("1954-07-29"),
        inStock: true
    },
    {
        title: "Animal Farm",
        author: "George Orwell",
        genre: "Political Satire",
        price: 8.99,
        publishedDate: new Date("1945-08-17"),
        inStock: true
    },
    {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Mystery",
        price: 16.99,
        publishedDate: new Date("2003-03-18"),
        inStock: false
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        price: 13.50,
        publishedDate: new Date("1988-01-01"),
        inStock: true
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science Fiction",
        price: 11.99,
        publishedDate: new Date("1932-01-01"),
        inStock: true
    },
    {
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        genre: "Fantasy",
        price: 19.99,
        publishedDate: new Date("1950-10-16"),
        inStock: true
    },
    {
        title: "Gone with the Wind",
        author: "Margaret Mitchell",
        genre: "Historical Fiction",
        price: 17.99,
        publishedDate: new Date("1936-06-30"),
        inStock: false
    },
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        genre: "Young Adult",
        price: 14.99,
        publishedDate: new Date("2008-09-14"),
        inStock: true
    },
    {
        title: "Moby Dick",
        author: "Herman Melville",
        genre: "Adventure",
        price: 12.99,
        publishedDate: new Date("1851-10-18"),
        inStock: true
    },
    {
        title: "War and Peace",
        author: "Leo Tolstoy",
        genre: "Historical Fiction",
        price: 22.99,
        publishedDate: new Date("1869-01-01"),
        inStock: true
    },
    {
        title: "The Odyssey",
        author: "Homer",
        genre: "Epic Poetry",
        price: 10.99,
        publishedDate: new Date("1998-01-01"), // Modern translation
        inStock: true
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        genre: "Non-Fiction",
        price: 18.99,
        publishedDate: new Date("2011-01-01"),
        inStock: true
    }
];

const seedDatabase = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing books (optional - comment out if you want to keep existing data)
        console.log('🗑️  Clearing existing books...');
        await Book.deleteMany({});
        console.log('✅ Cleared existing books');

        // Insert sample books
        console.log('📚 Inserting 20 sample books...');
        const books = await Book.insertMany(sampleBooks);
        console.log(`✅ Successfully inserted ${books.length} books!`);

        // Display inserted books
        console.log('\n📖 Inserted Books:');
        books.forEach((book, index) => {
            console.log(`${index + 1}. "${book.title}" by ${book.author} - $${book.price}`);
        });

        console.log('\n🎉 Database seeding completed successfully!');

        await mongoose.connection.close();
        console.log('🔌 Connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
