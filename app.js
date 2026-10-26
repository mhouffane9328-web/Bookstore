import { rechercherLivres } from "./recherche.js";
import { filtrerLivres } from "./filtre.js";
import { afficherCompteur } from "./compteur.js";

const books = [
  {
    id: 1,
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Roman",
    price: 80
  },
  {
    id: 2,
    title: "L'Alchimiste",
    author: "Paulo Coelho",
    category: "Roman",
    price: 95
  },
  {
    id: 3,
    title: "JavaScript pour débutants",
    author: "Équipe BookStore",
    category: "Informatique",
    price: 150
  },
  {
    id: 4,
    title: "Découvrir HTML et CSS",
    author: "Équipe BookStore",
    category: "Informatique",
    price: 130
  },
  {
    id: 5,
    title: "Organiser son temps",
    author: "Équipe BookStore",
    category: "Développement personnel",
    price: 110
  },
  {
    id: 6,
    title: "Les Misérables",
    author: "Victor Hugo",
    category: "Roman",
    price: 140
  }
];

const state = {
  search: "",
  category: "all"
};

const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const booksContainer = document.querySelector("#booksContainer");
const bookCount = document.querySelector("#bookCount");

function render() {
  let visibleBooks = rechercherLivres(books, state.search);

  visibleBooks = filtrerLivres(visibleBooks, state.category);

  afficherCompteur(bookCount, visibleBooks.length, books.length);

  // Vider l'ancien affichage.
  booksContainer.replaceChildren();

  if (visibleBooks.length === 0) {
    const message = document.createElement("p");

    message.className = "empty";
    message.textContent = "Aucun livre trouvé.";

    booksContainer.append(message);
    return;
  }

  visibleBooks.forEach(book => {
    const card = document.createElement("article");
    card.className = "book-card";

    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = "Auteur : " + book.author;

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = book.category;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = book.price + " MAD";

    card.append(title, author, category, price);
    booksContainer.append(card);
  });
}

function init() {
  searchInput.addEventListener("input", event => {
    state.search = event.target.value;
    render();
  });

  categoryFilter.addEventListener("change", event => {
    state.category = event.target.value;
    render();
  });

  render();
}

init();