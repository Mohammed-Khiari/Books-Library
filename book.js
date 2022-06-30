let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => `\"${title} by ${author}, ${pages}, ${read}\"`;
}

const addBtn = document.querySelector('.trigger');
const formDiv = document.querySelector('.modal');
const form = document.getElementById('bookForm');
const renderlibrary = document.createElement('div');
const closeBtn = document.querySelector('.close');

addBtn.addEventListener('click', () => {
  formDiv.classList.remove('hide')
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBookToLibrary();
  
        
  renderlibrary.innerHTML = "";
  displaBooks(myLibrary);
  form.reset();

  // set my library in the local storage object:
 window.localStorage.clear() 
 window.localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
 
  
});

closeBtn.addEventListener('click',() => {
  formDiv.className = 'modal hide';
})


window.addEventListener('click', (e) => {
  if (e.target === formDiv) {
    formDiv.className = 'modal hide';
  }
})


function addBookToLibrary() {
  let author = document.querySelector('#author').value;
  let title = document.querySelector('#BookTitle').value;
  let pages = document.querySelector('#pages').value;
  let readQuest = document.querySelector('#read').checked;

  // create a new Book Object:
  const newBook = new Book(title, author, pages, readQuest);
  myLibrary.push(newBook);
  }

function displaBooks(library) {

  renderlibrary.setAttribute('id', 'renderLibrary1'); 

  library.forEach((book, index, library) => {

  const bookContainer = document.createElement('div');
  bookContainer.className = 'bookContainer';

  // create and style Title text:
  const bookTitle = document.createElement('p');
  bookTitle.className = 'bookTitle bookDetail'
  bookTitle.textContent = book.title;
  bookContainer.appendChild(bookTitle);

  // create and style Author text:
  const bookAuthor = document.createElement('p');
  bookAuthor.className = 'bookAuthor bookDetail';
  bookAuthor.textContent = book.author;
  bookContainer.appendChild(bookAuthor);

  // create and style pages text:
  const bookPages = document.createElement('p');
  bookPages.className = 'numPages bookDetail';
  bookPages.textContent = `Number of Pages: ${book.pages}`;
  bookContainer.appendChild(bookPages);

  //create and style and programme read button:
  const readBtn = document.createElement('button');
  readBtn.className = 'readBtn'
  readBtn.setAttribute('type', 'button');
  isChecked();
  bookContainer.appendChild(readBtn);
  readBtn.addEventListener('click', () => {
    if (readBtn.innerHTML === "Read: Yes") {
      readBtn.innerHTML = "Read: No"
      readBtn.style.backgroundColor = "Red"
    } else {
      readBtn.innerHTML = "Read: Yes"
      readBtn.style.backgroundColor = "limegreen" 
    }
  })
  
  //create and style and programme remove button:
  const removeBtn = document.createElement('button');
  removeBtn.className = 'deleteBookBtn'
  removeBtn.setAttribute('type', 'button');
  removeBtn.textContent = 'Remove';
  bookContainer.appendChild(removeBtn);
  renderlibrary.appendChild(bookContainer);
  // remove books from library array and reinvoke the display function: 
  removeBtn.addEventListener('click', () => {
    library.splice(index, 1);
    console.log(library);
    renderlibrary.innerHTML = "";
    displaBooks(myLibrary);
    window.localStorage.clear() 
    window.localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  })




  document.body.appendChild(renderlibrary);
 

  function isChecked() {
    if(book.read){
      readBtn.innerHTML = "Read: Yes"
      readBtn.style.backgroundColor = "limegreen"
    }
    else {
      readBtn.innerHTML = "Read: No"
      readBtn.style.backgroundColor = "Red"
    }
  }
});
}

// Render myLibrary through Localstorage when page is refreshed.
function renderLibraryStorage() {
  if(localStorage.myLibrary) {
      let getBooks = JSON.parse(localStorage.getItem("myLibrary"))
      myLibrary = getBooks
      displaBooks(myLibrary);
  }
}

renderLibraryStorage();







 