document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
  
    // Загрузка задач из localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((taskText, index) => {
        const li = createTaskElement(taskText, index);
        taskList.appendChild(li);
      });
    }
  
    function createTaskElement(text, index) {
      const li = document.createElement('li');
      li.textContent = text;
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
  
      li.appendChild(deleteButton);
      return li;
    }
  
    addTaskButton.addEventListener('click', () => {
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        newTaskInput.value = '';
      }
    });
  
    newTaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskButton.click();
      }
    });
  
    renderTasks();
  });
  