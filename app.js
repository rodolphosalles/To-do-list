const log = (value) => console.log(value);

// 1- Adicionar um item na lista de to-dos

const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const formSearch = document.querySelector(".form-search");

// Qubrar o codigo em fuction isoladas.

// 1.1 - func adicionar
const addTodo = (inputValue) => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
    <span>${inputValue}</span>
    <i class="far fa-trash-alt delete" data-trash="${inputValue}"></i>
    </li>`;
    event.target.reset();
  }
};

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();
  addTodo(inputValue);
});

// 2- Excluir items da to-dos list, através do click na lixeira.

todosContainer.addEventListener("click", (event) => {
  const trashElement = event.target.dataset.trash;
  deleteTodo(trashElement);
});

// 2.2 - func deletar

const deleteTodo = (trashElement) => {
  if (trashElement)
    document.querySelector(`[data-todo="${trashElement}"]`).remove();
};

// 3- Filtre os itens desejados através do 'Buscar to-do'

formSearch.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  const todo = Array.from(todosContainer.children);
  showTodo(todo, inputValue);
  hiddenTodo(todo, inputValue);
});

// 3.1 - func que filtra show and hidden

const showTodo = (todo, inputValue) => {
  const todoShow = filterTodo(todo, inputValue, true);
  manipulateClasses(todoShow, "hidden", "d-flex");
};

const hiddenTodo = (todo, inputValue) => {
  const todoHidden = filterTodo(todo, inputValue, false);
  manipulateClasses(todoHidden, "d-flex", "hidden");
};

// 3.2 - isolar em func a parte que filtra, e retorna um boolean true/false

const filterTodo = (todo, inputValue, returnMatchedTodo) =>
  todo.filter((todo) => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue);
    return returnMatchedTodo ? matchedTodos : !matchedTodos;
  });

// 3.3 - isolar em func a parte que add e rmv as classes

const manipulateClasses = (todo, classToRemove, classToAdd) => {
  todo.forEach((todo) => {
    todo.classList.remove(classToRemove);
    todo.classList.add(classToAdd);
  });
};
