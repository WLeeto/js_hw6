document.addEventListener('DOMContentLoaded', function() {
  // Получаем необходимые элементы
  const form = document.getElementById('tasks__form');
  const input = document.getElementById('task__input');
  const taskList = document.getElementById('tasks__list');

  // Функция для добавления задачи
  function addTask(taskTitle) {
    // Создаем новый элемент задачи
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    // Создаем элемент для заголовка задачи
    const taskTitleElement = document.createElement('div');
    taskTitleElement.classList.add('task__title');
    taskTitleElement.textContent = taskTitle;

    // Создаем элемент для удаления задачи
    const removeLink = document.createElement('a');
    removeLink.classList.add('task__remove');
    removeLink.innerHTML = '&times;';

    // Добавляем обработчик события для удаления задачи
    removeLink.addEventListener('click', function(event) {
      event.preventDefault();
      // Удаляем родительский элемент задачи
      event.target.parentNode.remove();
      // Обновляем данные в localStorage
      updateLocalStorage();
    });

    // Добавляем заголовок и ссылку удаления в элемент задачи
    taskElement.appendChild(taskTitleElement);
    taskElement.appendChild(removeLink);

    // Добавляем новую задачу в список задач
    taskList.appendChild(taskElement);
  }

  // Функция для сохранения задач в localStorage
  function updateLocalStorage() {
    const tasks = [];

    // Перебираем все задачи и добавляем их текст в массив tasks
    const taskElements = taskList.getElementsByClassName('task');
    for (let i = 0; i < taskElements.length; i++) {
      const taskTitleElement = taskElements[i].getElementsByClassName('task__title')[0];
      const taskTitle = taskTitleElement.textContent.trim();
      tasks.push(taskTitle);
    }

    // Сохраняем массив tasks в localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Функция для загрузки задач из localStorage
  function loadTasksFromLocalStorage() {
    // Получаем сохраненные задачи из localStorage
    const savedTasks = localStorage.getItem('tasks');

    // Проверяем, есть ли сохраненные задачи
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);

      // Добавляем каждую задачу в список
      for (let i = 0; i < tasks.length; i++) {
        addTask(tasks[i]);
      }
    }
  }

  // Обработчик события отправки формы
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Получаем значение из поля ввода
    const taskTitle = input.value.trim();
    // Проверяем, чтобы поле ввода не было пустым
    if (taskTitle !== '') {
      // Вызываем функцию для добавления задачи
      addTask(taskTitle);
      // Обновляем данные в localStorage
      updateLocalStorage();
      // Очищаем поле ввода
      input.value = '';
    }
  });

  // // Обработчик события нажатия клавиши Enter в поле ввода
  // input.addEventListener('keydown', function(event) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     // Получаем значение из поля ввода
  //     const taskTitle = input.value.trim();
  //     // Проверяем, чтобы поле ввода не было пустым
  //     if (taskTitle !== '') {
  //       // Вызываем функцию для добавления задачи
  //       addTask(taskTitle);
  //       // Обновляем данные в localStorage
  //       updateLocalStorage();
  //       // Очищаем поле ввода
  //       input.value = '';
  //     }
  //   }
  // });

  // Загружаем задачи из localStorage при загрузке страницы
  loadTasksFromLocalStorage();
});
