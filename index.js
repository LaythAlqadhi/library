const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const notReadInput = document.querySelector("#not-read");
const saveButton = document.querySelector("#save-button");
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

let bookLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return this.title, this.author, this.pages, this.read;
  }
}

saveButton.addEventListener('click', addBookToLibrary);

function addBookToLibrary() {
  if (titleInput.value === "" || authorInput.value === "" || pagesInput.value === "" || (!readInput.checked && !notReadInput.checked)) {
    alert("Please fill in all the inputs before saving.");
    return;
  }

  const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, getSelectedRadioValue());
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
    let readClass = bookLibrary[i]["read"] === "Read" ? "readButton" : "notReadButton";
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

tbody.addEventListener('click', function (event) {
  if (event.target.classList.contains("readButton")) {
    event.target.textContent = "Not Read";
    event.target.classList.replace("readButton", "notReadButton");
    updateLibraryStatus(event.target.parentNode.parentNode.rowIndex - 1, "Not Read");
  } else if (event.target.classList.contains("notReadButton")) {
    event.target.textContent = "Read";
    event.target.classList.replace("notReadButton", "readButton");
    updateLibraryStatus(event.target.parentNode.parentNode.rowIndex - 1, "Read");
  } else if (event.target.classList.contains("remove")) {
    bookLibrary.splice(event.target.parentNode.parentNode.rowIndex - 1, 1);
    showLibraryData();
  }
});

function updateLibraryStatus(index, status) {
  bookLibrary[index].read = status;
}