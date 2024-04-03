const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },
  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },
  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },
  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },
  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];


const cardPlace = document.querySelector('#cardPlace');
const form = document.querySelector('form');
const input = document.querySelector('#pizzaId');

document.addEventListener('DOMContentLoaded', function() {
  displaySavedPizza();
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const pizzaId = parseInt(input.value);

  // Verificar si se ingresó un valor
  if (isNaN(pizzaId)) {
    cardPlace.innerHTML = 'Por favor ingrese un valor válido.';
    return;
  }

  //Busca la pizza correspondiente al id con Find
  let selectedPizza = pizzas.find(pizza => pizza.id === pizzaId);

  // Verificar si se encontró una pizza con el id proporcionado
  if (selectedPizza) {
    displayPizza(selectedPizza);
    savePizzaInLocalStorage(selectedPizza);
  } else {
    // Si no se encontró una pizza con el id proporcionado
    cardPlace.innerHTML = 'La pizza seleccionada no existe.';
  }
});

// Función para mostrar la pizza guardada en localStorage si existe
function displaySavedPizza() {
  const pizzaSave = loadLastPizzaFromLocalStorage();
  if (pizzaSave) {
    displayPizza(pizzaSave);
  }
}

// Función para mostrar una pizza en la tarjeta
function displayPizza(pizza) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h2>${pizza.nombre}</h2>
    <p>Precio: $${pizza.precio}</p>
    <p>Ingredientes: ${pizza.ingredientes.join(', ')}</p>
    <img id="pizzaImage" src="${pizza.imagen}" alt="${pizza.nombre}">
  `;
  cardPlace.innerHTML = '';
  cardPlace.appendChild(card);
}

// Función para guardar la pizza en el localStorage
function savePizzaInLocalStorage(pizza) {
  localStorage.setItem('lastPizza', JSON.stringify(pizza));
}

// Función para cargar la última pizza desde el localStorage
function loadLastPizzaFromLocalStorage() {
  const lastPizza = localStorage.getItem('lastPizza');
  if (lastPizza) {
    return JSON.parse(lastPizza);
  }
}