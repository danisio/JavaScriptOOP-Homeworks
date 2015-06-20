/* Task Description */
/*
	*	Create a module for working with books
		*	The module must provide the following functionality:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/category has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/

function solution() {
    var library = (function () {
        var books = [];
        var categories = [];

        function listBooks(params) {
            var booksSorted = books.slice();

            if (params) {
                var prop = Object.keys(params);

                booksSorted = booksSorted.filter(function (book) {
                    return book[prop] === params[prop];
                });
            }

            booksSorted.sort(function (x, y) {
                return x.ID - y.ID;
            });

            return booksSorted;
        }

        function addBook(book) {
            // Make all validations
            isUniqueTitleAndISBN(book);
            isValidISBN(book.isbn);
            isValidBookAndCategoryName(book.title);
            isValidBookAndCategoryName(book.category);
            isValidAuthorName(book.author);
            isValidCategory(book.category);

            book.ID = books.length + 1;
            books.push(book);
            categories[book.category].books.push(book.title);

            return book;
        }

        function listCategories() {
            return Object.keys(categories);
        }

        function isValidBookAndCategoryName(name) {
            if (name.length < 2 || name.length > 100) {
                throw new Error('Invalid name');
            }
        }

        function isValidAuthorName(author) {
            if (!author) {
                throw new Error('Author name is missing!');
            }
        }

        function isValidISBN(isbn) {
            if (isbn.length !== 10 && isbn.length !== 13) {
                throw new Error('Invalid ISBN length');
            }

            if (!(isFinite(isbn) && !isNaN(parseInt(isbn)))) {
                throw new Error('ISBN has to be a number.');
            }
        }

        function isUniqueTitleAndISBN(currentBook) {
            for (var book in books) {
                if (books[book].title === currentBook.title ||
                    books[book].isbn === currentBook.isbn) {
                    throw new Error('This item ' + currentBook + ' already exists!');
                }
            }
        }

        function isValidCategory(category) {
            if (!categories[category]) {
                addCategory(category);
            }
        }

        function addCategory(category) {
            categories[category] = {
                ID: categories.length + 1,
                books: []
            }
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        }
    }());

    return library;
}
