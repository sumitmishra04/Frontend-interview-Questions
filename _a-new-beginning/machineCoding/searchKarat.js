const searchInp = document.getElementById('searchInp');
const searchBtn = document.getElementById('searchBtn');
const list = document.getElementById('list');
const clearBtn = document.getElementById('clearBtn');

let todosData = [];

function createList(data) {
  const ul = document.createElement('ul');
  ul.setAttribute("id", "ul-items");
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title;
    ul.appendChild(li);
  });
  list.appendChild(ul);
}

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  todosData = await response.json(); // ✅ assign to global
  createList(todosData);
}

fetchData();

searchBtn.addEventListener('click', () => {
  if (!todosData.length) {
    alert("Data not loaded yet!");
    return;
  }

  const filteredData = todosData.filter((data) =>
    data.title.toLowerCase().includes(searchInp.value.toLowerCase().trim())
  );

  const ul = document.getElementById('ul-items');
  if (ul) ul.remove(); // ✅ safe remove
  createList(filteredData);
});

clearBtn.addEventListener('click', () => {
  searchInp.value = ""
  const ul = document.getElementById('ul-items');
  if (ul) ul.remove(); // ✅ safe remove
  createList(todosData);
});


<!DOCTYPE html>
<html>
  <head>
    <title>Hello World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div>
      <input id="searchInp" />
      <button id="searchBtn">Search</button>
            <button id="clearBtn">clear</button>

    </div>
    <section id="list"></section>
    <script src="script.js"></script>

  </body>
</html>