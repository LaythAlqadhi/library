const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const notReadInput = document.querySelector("#not-read");
const saveButton = document.querySelector("#save-button");
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const tbody = document.querySelector("tbody");
const error = document.querySelectorAll(".error");
const titleError = document.querySelector(".title-error");
const authorError = document.querySelector(".author-error");
const pagesError = document.querySelector(".pages-error");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

let bookLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return this.title, this.author, this.pages, this.read;
  }
}

function addBookToLibrary() {
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    getSelectedRadioValue(),
  );
  bookLibrary.push(newBook);
  showLibraryData();

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
  notReadInput.checked = false;
}

function getSelectedRadioValue() {
  if (readInput.checked) {
    return readInput.value;
  } else if (notReadInput.checked) {
    return notReadInput.value;
  } else {
    return "";
  }
}

function showLibraryData() {
  tbody.innerHTML = "";
  for (let i = 0; i < bookLibrary.length; i++) {
    let readClass =
      bookLibrary[i]["read"] === "Read" ? "readButton" : "notReadButton";
    tbody.innerHTML += `
        <tr>
          <td>${1 + i}</td>
          <td>${bookLibrary[i]["title"]}</td>
          <td>${bookLibrary[i]["author"]}</td>
          <td>${bookLibrary[i]["pages"]}</td>
          <td><span class="${readClass}">${bookLibrary[i]["read"]}</span></td>
          <td><span class="remove">Remove</span></td>
        </tr>
        `;
  }
}

tbody.addEventListener("click", function (event) {
  const getIndex = event.target.parentNode.parentNode.rowIndex - 1;
  if (event.target.classList.contains("readButton")) {
    event.target.textContent = "Not Read";
    event.target.classList.replace("readButton", "notReadButton");
    updateLibraryStatus(getIndex, "Not Read");
  } else if (event.target.classList.contains("notReadButton")) {
    event.target.textContent = "Read";
    event.target.classList.replace("notReadButton", "readButton");
    updateLibraryStatus(getIndex, "Read");
  } else if (event.target.classList.contains("remove")) {
    bookLibrary.splice(getIndex, 1);
    showLibraryData();
  }
});

function updateLibraryStatus(index, status) {
  bookLibrary[index].read = status;
}

inputs.forEach(input => input.addEventListener('input', function () {
    if (input.validity.valid) {
        error.forEach(item => {
            item.textContent = '';
            item.classList = 'error';
        })
    } else {
        showError();
    }
}))

form.addEventListener('submit', function (e) {
    const inputsValid = validateInputs();
    
    if (!inputsValid) {
        showError();
        e.preventDefault();
    } else {
        addBookToLibrary();
    }
});

function validateInputs() {
    const validTitle = validateInput(titleInput, titleError);
    const validAuthor = validateInput(authorInput, authorError);
    const validPages = validateInput(pagesInput, pagesError);

    const validReadStatus = notReadInput.checked || readInput.checked;
    
    return validTitle && validAuthor && validPages && validReadStatus;
}

function validateInput(input, errorElement) {
    const validity = input.validity;

    if (validity.valueMissing) {
        errorElement.textContent = 'Value is missing';
    } else if (validity.typeMismatch) {
        errorElement.textContent = 'Value type is not match';
    } else if (validity.tooLong) {
        errorElement.textContent = 'Value is too long';
    } else if (validity.tooShort) {
        errorElement.textContent = 'Value is too short';
    } else if (validity.rangeOverflow) {
        errorElement.textContent = 'Value is over the required range';
    } else if (validity.rangeUnderflow) {
        errorElement.textContent = 'Value is under the required range';
    } else {
        errorElement.textContent = '';
        return true;
    }

    return false;
}

function showError() {
    error.forEach(item => {
        item.className = "error active";
    })
}