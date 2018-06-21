// add book project using javascript object orianted programming ES6 versuib
// book class for managing consgtructor and variables
class Book{
  constructor (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn =  isbn;
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// UI class for managing the methods
class UI{
  addBookList (book){
    // console.log(book);
  const list = document.getElementById('book-list');
  // create element
  const row = document.createElement('tr');
  // console.log(row); 
  // insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
  }
  showAlert (message, className){
    const div = document.createElement('div');
    // Add class name to div
    div.className = `alert ${className}`;
  
    // add text
    div.appendChild(document.createTextNode(message));
    // get Parent for insertion of the error msg after container
    const contain = document.querySelector('.container');
  // get form for insertion of the error msg befor form
    const form1 = document.querySelector('#form-book');
    //insert alert
   // container.insertBefore(div, form);
    contain.insertBefore(div, form1);
    // timeout after 3 seconds
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  deletebook (target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    
      }
  }
  clearFields (){
    document.getElementById('title').value ='';
    document.getElementById('author').value ='';
    document.getElementById('isbn').value ='';

  }
}

// add eventlistener on the form submit
document.getElementById('form-book').addEventListener('submit', function(e){
  // console.log('test');
  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
        
  // console.log(title, author, isbn);
  // lets instinitate the book object and pass the form elements to the object as a parameters
  const book = new Book(title, author, isbn);
// instantiate the UI
  const ui = new UI(book);

  // validation
  if(title === '' || author === ''|| isbn === ''){
    // alert('failed to save the record!');
    ui.showAlert('Please fill all the fields', 'error');
  } else{
    // Add books
    ui.addBookList(book);

      // Add to LS
      Store.addBook(book);

    ui.clearFields();
    ui.showAlert('Book Added!','success');
  }

  
 // console.log(book);

  e.preventDefault();
})

// deleting row of recorded books
document.getElementById('book-list').addEventListener('click', function(e){
  // console.log(1221);
  // instantiate the UI
  const ui = new UI();
  ui.deletebook(e.target);
  ui.showAlert('Book removed', 'success');
  e.preventDefault();
})