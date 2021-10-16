// Slecting The Elements
let rootElem = document.querySelector(".root");
let form = document.querySelector("form");
let starred = document.querySelector(".starred");
let unstarred = document.querySelector(".unstarred");
let all = document.querySelector(".all");
let allTagsBox = document.querySelector(".allTags");
let user = document.querySelector(".name");


// Taking Data From LocalStorage
let notesData = JSON.parse(localStorage.getItem("notes")) || [];
let name = localStorage.getItem("name") || 'User';
user.innerText = name;
// All Tags
let allTags = [];
notesData.forEach(note => {
  if (!allTags.includes(note.tag)) {
    allTags.push(note.tag);
  }
});


// Presenting ALl Tags
allTags.forEach(tag => {
  let button = document.createElement('button');
  button.classList.add('filter');
  button.innerText = tag;
  button.addEventListener('click', (event) => {
    let arr = notesData.filter(note => {
      return note.tag === tag;
    });
    createUI(arr, rootElem);
  });
  button.style.marginRight = '.5rem'
  allTagsBox.append(button);
})

// Editing Name
function handleEditName(event) {
  let elem = event.target;
  let value = event.target.innerText;
  let name = localStorage.getItem("name") || 'User';
  let input = document.createElement('input');
  input.classList.add('name');
  input.value = name;
  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      localStorage.setItem('name',e.target.value);
      elem.innerText = e.target.value;
      let parent = e.target.parentElement;
      parent.replaceChild(elem, e.target);
    }
  });
  let parent = event.target.parentElement;
  parent.replaceChild(input, elem);
}

user.addEventListener("dblclick", (event) =>
  handleEditName(event)
);

// Handling Filters
// Starred

starred.addEventListener('click', (event) => {
  let arr = notesData.filter(note => {
    return note.isImportant === true;
  });
  createUI(arr, rootElem);
});

// Unstarred
unstarred.addEventListener('click', (event) => {
  let arr = notesData.filter(note => {
    return note.isImportant !== true;
  });
  createUI(arr, rootElem);
});

// All
all.addEventListener('click', (event) => {
  createUI(notesData, rootElem);
});

// Handling Edit Functions
// Tag
function handleEditSpan(event, info, index, label) {
  let elem = event.target;
  let input = document.createElement("input");
  input.size = '5';
  input.classList.add('classSpan');
  input.value = info;
  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      let updatedValue = e.target.value;
      notesData[index][label] = updatedValue;
      createUI();
      localStorage.setItem('notes', JSON.stringify(notesData));
    }
  });

  input.addEventListener("blur", (e) => {
    let updatedValue = e.target.value;
    notesData[index][label] = updatedValue;
    createUI();
    localStorage.setItem('notes', JSON.stringify(notesData));
    location.reload();
  });

  let parent = event.target.parentElement;
  parent.replaceChild(input, elem);
};

// Title
function handleEditH2(event, info, index, label) {
  let elem = event.target;
  let input = document.createElement("input");
  input.classList.add('classH2');
  input.value = info;
  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      let updatedValue = e.target.value;
      notesData[index][label] = updatedValue;
      createUI();
      localStorage.setItem('notes', JSON.stringify(notesData));
    }
  });

  input.addEventListener("blur", (e) => {
    let updatedValue = e.target.value;
    notesData[index][label] = updatedValue;
    createUI();
    localStorage.setItem('notes', JSON.stringify(notesData));
    location.reload();
  });

  let parent = event.target.parentElement;
  parent.replaceChild(input, elem);
};


//  Description
function handleEditP(event, info, index, label) {
  let elem = event.target;
  let input = document.createElement("textarea");

  input.classList.add('classP');
  input.value = info;
  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      let updatedValue = e.target.value;
      notesData[index][label] = updatedValue;
      createUI();
      localStorage.setItem('notes', JSON.stringify(notesData));
    }
  });

  input.addEventListener("blur", (e) => {
    let updatedValue = e.target.value;
    notesData[index][label] = updatedValue;
    createUI();
    localStorage.setItem('notes', JSON.stringify(notesData));
    location.reload();
  });

  let parent = event.target.parentElement;
  parent.replaceChild(input, elem);
};

// Delete
function hanndleDelete(event) {
  let ind = event.target.dataset.id;
  notesData.splice(ind, 1);
  createUI();
  localStorage.setItem('notes', JSON.stringify(notesData));
  location.reload();
}

// Important
function hanndleImportant(event) {
  let ind = event.target.dataset.id;
  notesData[ind].isImportant = !notesData[ind].isImportant;
  createUI();
  localStorage.setItem('notes', JSON.stringify(notesData));
}

// Handling UI
function createUI(data = notesData, root = rootElem) {
  let fragment = new DocumentFragment();

  data.forEach((elem, index) => {
    let div = document.createElement("li");
    div.classList.add('card');
    let wrap = document.createElement("div");
    wrap.classList.add('wrap');
    let dlt = document.createElement('i');
    dlt.classList.add("far", "fa-times-circle", 'dlt');
    dlt.setAttribute('data-id', index);
    dlt.addEventListener('click', hanndleDelete);
    let important = document.createElement('i');
    important.classList.add('fas', 'fa-star', 'imp');
    if (elem.isImportant === true) {
      important.classList.add('active');
    } else {
      important.classList.remove('active');
    }
    important.setAttribute('data-id', index);
    important.addEventListener('click', hanndleImportant);
    let box = document.createElement('p');
    box.append(dlt, important);
    let span = document.createElement("span");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");

    span.innerText = elem.tag;
    span.addEventListener("dblclick", (event) =>
      handleEditSpan(event, elem.tag, index, 'tag')
    );

    h2.innerText = elem.title;
    h2.addEventListener("dblclick", (event) =>
      handleEditH2(event, elem.title, index, 'title')
    );

    p.innerText = elem.description;
    p.addEventListener("dblclick", (event) =>
      handleEditP(event, elem.description, index, 'description')
    );

    wrap.append(box, span);
    div.append(wrap, h2, p);
    fragment.appendChild(div);
  });
  root.innerHTML = "";
  root.append(fragment);
}

// Handling Form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.target.elements.tag.value && event.target.elements.title.value) {
    let tag = event.target.elements.tag.value;
    let title = event.target.elements.title.value;
    let description = event.target.elements.description.value;
    let isImportant = false;
    notesData.push({ tag, title, description, isImportant });
    localStorage.setItem("notes", JSON.stringify(notesData));
    event.target.elements.tag.value = '';
    event.target.elements.title.value = '';
    event.target.elements.description.value = '';
    createUI(notesData, rootElem);
  }
});

// Calling CreateUI Function
createUI(notesData, rootElem);