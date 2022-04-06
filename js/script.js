//! ========= Declaration ==========
const userInput = document.querySelector('#user-input');
const addBtn = document.querySelector('.add-btn');
const userList = document.querySelector('.user-list');
let tasksArray = [];
// console.log(userInput, addBtn, userList)

//! ======= create list card(Div) =======
function createUserTaskList(x) {
  const listBox = document.createElement('section');
  const leftContent = document.createElement('div');
  const checkBox = document.createElement('input');
  const taskText = document.createElement('li');
  const rightContent = document.createElement('div');
  const saveIcon = document.createElement('i');
  const editIcon = document.createElement('i');
  const removeIcon = document.createElement('i');

  //? appended childs
  userList.appendChild(listBox);
  listBox.appendChild(leftContent);
  leftContent.appendChild(checkBox)
  leftContent.appendChild(taskText);
  taskText.textContent = `${x}`
  listBox.appendChild(rightContent);
  rightContent.appendChild(saveIcon);
  rightContent.appendChild(editIcon);
  rightContent.appendChild(removeIcon);

  //? add classes to created Elements
  listBox.classList.add('list-box')
  leftContent.classList.add('left-content');
  checkBox.setAttribute('id', 'check');
  checkBox.setAttribute('type', 'checkbox')
  rightContent.classList.add('right-content');
  saveIcon.classList.add('ri-save-fill');
  editIcon.classList.add('ri-pencil-fill');
  removeIcon.classList.add('ri-delete-bin-7-fill');
}

//! ======== Add Button Function =======
addBtn.addEventListener('click', addBtnFunction)
function addBtnFunction(e) {
  if (userInput.value === '') {
    return;
  }
  createUserTaskList(userInput.value)
  let targetValue = e.target.previousElementSibling.value
  let data = {}
  data.targetValue = targetValue
  tasksArray.push(data)
  saveToLocalStorage()

  //! ==== remove Button Function =====
  let removeBtn = document.querySelectorAll('.ri-delete-bin-7-fill')
  for (let i = 0; i < removeBtn.length; i++) {
    removeBtn[i].addEventListener('click', removeBtnFunction)
  }
  function removeBtnFunction(e) {
    let taskParent = e.target.parentElement.parentElement;
    let removeText = e.target.parentElement.previousElementSibling.lastElementChild.textContent
    taskParent.remove()
    tasksArray = JSON.parse(localStorage.getItem('key'))
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].targetValue === removeText) {
        tasksArray.splice(i, 1)
      }
    }
    saveToLocalStorage()
  } // end of remove function

  //! ===== Edit button Function =====
  let editBtn = document.querySelectorAll('.ri-pencil-fill')
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', editBtnFunction)
  }
  function editBtnFunction(e) {
    let editText = e.target.parentElement.previousElementSibling.lastElementChild
    tasksArray = JSON.parse(localStorage.getItem('key'))
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].targetValue === editText.textContent) {
        tasksArray.splice(i, 1)
      }
    }
    saveToLocalStorage()
    editText.setAttribute('contenteditable', 'true')
  } // end of edit function

  //! ===== save button Function ======
  let saveBtn = document.querySelectorAll('.ri-save-fill')
  console.log(saveBtn)
  for (let i = 0; i < editBtn.length; i++) {
    saveBtn[i].addEventListener('click', saveBtnFunction)
  }
  function saveBtnFunction(e) {
    let saveTarget = e.target.parentElement.previousElementSibling.lastElementChild
    tasksArray = JSON.parse(localStorage.getItem('key'))
    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i].targetValue === saveTarget.textContent) {
        tasksArray.splice(i, 1)
      }
    }
    saveToLocalStorage()
    saveTarget.setAttribute('contenteditable', 'false')
    let data = {}
    data.targetValue = saveTarget.textContent
    tasksArray.push(data)
    saveToLocalStorage()
  }
  userInput.value = '';
} //end of add function

//! ====== Save To Local Storage Function =====
function saveToLocalStorage() {
  localStorage.setItem('key', JSON.stringify(tasksArray))
}

//! ====== get from Local Storage Function =====
// function getFromLocalStorage() {
//   JSON.parse(localStorage.getItem('key'))
// }
document.addEventListener('DOMContentLoaded', getElementOnLoad)
function getElementOnLoad(e) {
  if (localStorage.getItem('key')) {
    tasksArray = JSON.parse(localStorage.getItem('key'));
  }
  tasksArray.forEach(e => {
    createUserTaskList(e.targetValue);
    //! ==== remove Button Function =====
    let removeBtn = document.querySelectorAll('.ri-delete-bin-7-fill')
    for (let i = 0; i < removeBtn.length; i++) {
      removeBtn[i].addEventListener('click', removeBtnFunction)
    }
    function removeBtnFunction(e) {
      let taskParent = e.target.parentElement.parentElement;
      let removeText = e.target.parentElement.previousElementSibling.lastElementChild.textContent
      taskParent.remove()
      tasksArray = JSON.parse(localStorage.getItem('key'))
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].targetValue === removeText) {
          tasksArray.splice(i, 1)
        }
      }
      saveToLocalStorage()
    } // end of remove function

    //! ===== Edit button Function =====
    let editBtn = document.querySelectorAll('.ri-pencil-fill')
    for (let i = 0; i < editBtn.length; i++) {
      editBtn[i].addEventListener('click', editBtnFunction)
    }
    function editBtnFunction(e) {
      let editText = e.target.parentElement.previousElementSibling.lastElementChild
      tasksArray = JSON.parse(localStorage.getItem('key'))
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].targetValue === editText.textContent) {
          tasksArray.splice(i, 1)
        }
      }
      saveToLocalStorage()
      editText.setAttribute('contenteditable', 'true')
    } // end of edit function
    //! ===== save button Function ======
    let saveBtn = document.querySelectorAll('.ri-save-fill')
    console.log(saveBtn)
    for (let i = 0; i < editBtn.length; i++) {
      saveBtn[i].addEventListener('click', saveBtnFunction)
    }
    function saveBtnFunction(e) {
      let saveTarget = e.target.parentElement.previousElementSibling.lastElementChild
      tasksArray = JSON.parse(localStorage.getItem('key'))
      for (let i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].targetValue === saveTarget.textContent) {
          tasksArray.splice(i, 1)
        }
      }
      saveToLocalStorage()
      saveTarget.setAttribute('contenteditable', 'false')
      let data = {}
      data.targetValue = saveTarget.textContent
      tasksArray.push(data)
      saveToLocalStorage()
    }
  }) // end of for Each
} // end of reload function

// next Time ill edit the edit btn and save btn in the way to reassign the textcontent instead of using splice method
// add the light and dark mood
// add the check function