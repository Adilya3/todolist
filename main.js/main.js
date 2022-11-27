let btnAdd = document.querySelector(".btn-add"),
  inputName = document.querySelector("#inp-name"),
  inputEmail = document.querySelector("#inp-email"),
  inputNumber = document.querySelector("#inp-number"),
  inputLink = document.querySelector("#inp-link"),
  infoList = document.querySelector(".info-list"),
  infoItem = document.querySelectorAll(".info-item"),
  btnClearAll = document.querySelector(".btn-clear"),
  imgUrl = document.getElementById("photo-link");

//?  добавляем слушатель событий на кнопку
btnAdd.addEventListener("click", () => {
  //? добавляем проверку на заполненность полей git
  if (
    !inputName.value.trim() ||
    !inputEmail.value.trim() ||
    !inputNumber.value.trim() ||
    !inputLink.value.trim() ||
    !typeof inputNumber.value === "number"
  ) {
    alert("Необходимо заполнить все поля корректно");
    return;
  }

  //? формиркем обьект таска, под ключом task добавляем значение из input'а
  let obj = {
    taskName: inputName.value,
    taskEmail: inputEmail.value,
    taskNumber: inputNumber.value,
    taskUrl: inputLink.value,
  };

  //? вызов функций для отправки данных в localStorage
  setItemStorage(obj);
  createElement();
});

//? функция для добавления в localStorage
function setItemStorage({ taskName, taskEmail, taskNumber, taskUrl }) {
  //? делаем проверку на то, есть ли в localStorage данные под ключом tasks-data, если нет, то под ключом tasks-data создаем пустой массив
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }
  //? вытаскиваем данные из localStorage
  let data = JSON.parse(localStorage.getItem("tasks-data"));

  //? добавляем в массив новый таск
  data.push({ taskName, taskEmail, taskNumber, taskUrl });
  //? отправляем обнавленный массив в localStorage
  localStorage.setItem("tasks-data", JSON.stringify(data));
}
//? вызов функции
createElement();

//? функция для отрисовки элементов в браузере
function createElement() {
  //? вытаскиваем данные из localStorage

  let newData = JSON.parse(localStorage.getItem("tasks-data"));

  if (newData === null) {
    localStorage.setItem("tasks-data", "[]");
    return;
  }
  //? очищаем список от предыдущих элементов
  infoList.innerHTML = "";

  //? перебираем массив с данными и на каждый элемент массива создаем li с кнопками и с текстом
  newData.forEach((item, index) => {
    
    let liName = document.createElement("p"),
      liEmail = document.createElement("p"),
      liNumber = document.createElement("p"),
      liLink = document.createElement("p"),
      taskUrl = document.createElement('img')

      liMain = document.createElement("li"),
      btnDelete = document.createElement("button"),
      btnEdit = document.createElement("button");

    liName.style.listStyleType = "none";
    liEmail.style.listStyleType = "none";
    liNumber.style.listStyleType = "none";
    liLink.style.listStyleType = "none";

    liName.innerText = `Имя: ${item.taskName}`;
    liEmail.innerText = `Email: ${item.taskEmail}`;
    liNumber.innerText = `Номер телефона: ${item.taskNumber}`;
    taskUrl.setAttribute('src', item.taskUrl);
    btnDelete.innerText = "Удалить";
    btnEdit.innerText = "Изменить";


    taskUrl.setAttribute('width', 100);
    taskUrl.setAttribute('height', 100);



taskUrl.style.borderRadius  ='30px'

    btnDelete.style.borderRadius = "60px";
    btnDelete.style.margin = "0px 10px";
    btnDelete.style.border = "solid 0.5px #85bcad";
    btnDelete.style.backgroundColor = "#85bcad";

    btnEdit.style.borderRadius = "60px";
    btnEdit.style.border = "solid 0.5px #85bcad";
    btnEdit.style.backgroundColor = "#85bcad";
    infoList.append(btnDelete, btnEdit);

    // ? навешиваем слушатель событий на кнопку Delete
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });

    // ? навешиваем слушатель событий на кнопку Edit
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });

    infoList.append(liName, liEmail, liNumber, taskUrl);
  });
}

// ? функция для удаления таска
function deleteElement(index) {
  // ? вытаскиваем массив данных их localStorage
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  // ? удаляем 1 элемент по индексу из массива
  data.splice(index, 1);

  // ? помещаем обновленнный массив (без одного элемента в localStorage)
  localStorage.setItem("tasks-data", JSON.stringify(data));
  createElement();
}

// deleteAll

let deleteAllBtn = document.querySelector(".btn-clear");
deleteAllBtn.addEventListener("click", function () {
  localStorage.clear();
  infoList.innerHTML = "";
});

// Function to edit in modal form

// ? вытаскиваем все элементы модального окна

let inputName1 = document.querySelector("#inp-name1"),
  inputEmail1 = document.querySelector("#inp-email1"),
  inputNumber1 = document.querySelector("#inp-number1"),
  inputLink1 = document.querySelector("#inp-link1"),
  mainModal = document.querySelector(".main-modal"),
  btnClose = document.querySelector(".close"),
  btnSave = document.querySelector(".btn-save");

//? стилизуем инпуты
inputName1.style.borderRadius = "80px";
inputName1.style.border = "solid 0.5px #85bcad";
inputEmail1.style.borderRadius = "80px";
inputEmail1.style.border = "solid 0.5px #85bcad";
inputNumber1.style.borderRadius = "80px";
inputNumber1.style.border = "solid 0.5px #85bcad";
inputLink1.style.borderRadius = "80px";
inputLink1.style.border = "solid 0.5px #85bcad";

// ? функция для редактирования
function editElement(index) {
  // ?открытие модалки
  mainModal.style.display = "block";

  // ? вытаскиваем массив с данными из localStorage
  let data = JSON.parse(localStorage.getItem("tasks-data"));

  // ? Задаем аттрибут id инпуту в модалке
  inputName1.setAttribute("id", index);
  inputEmail1.setAttribute("id", index);
  inputNumber1.setAttribute("id", index);
  inputLink1.setAttribute("id", index);

  // ? помещаем данные редактируемого таска в инпут
  inputName1.value = data[index].task;
  inputEmail1.value = data[index].task;
  inputNumber1.value = data[index].task;
  inputLink1.value = data[index].task;
}

// ? вешаем слушатель событий для закрытия на крестик модалки
btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});

//? функция сохранения изменений
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("tasks-data"));

  //? получаем индекс
  let index = inputName1.id,
    index1 = inputEmail1.id,
    index2 = inputNumber1.id,
    index3 = inputNumber1.id;

  //? проверка на отправку пустого массива
  if (
    !inputName1.value.trim() ||
    !inputEmail1.value.trim() ||
    !inputNumber1.value.trim() ||
    !inputLink1.value.trim()
  ) {
    alert("заполните редактируемые поля");
    return;
  }

  //? формируем новый обьект с обнавленными данными
  let newTask = {
    taskName: inputName1.value,
    taskEmail: inputEmail1.value,
    taskNumber: inputNumber1.value,
    taskUrl: inputLink1.value,
  };

  infoList.innerHTML = "";

  //? обнавляем массив data
  data.splice(index, 1, newTask);
  data.splice(index1, 1, newTask);
  data.splice(index2, 1, newTask);
  data.splice(index3, 1, newTask);

  //? отправляем обнавленный массив в localStorage
  localStorage.setItem("tasks-data", JSON.stringify(data));

  //? закрываем модалку
  mainModal.style.display = "none";

  //? вызываем функцию отображения
  createElement();
});
