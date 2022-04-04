//! ======= Declaration =======
const input = document.querySelector('.user-input');
const addBtn = document.querySelector('.add-btn')
const listContainer = document.querySelector('.list-container')
let arr = [];

//! ======= create list card(Div) =======
function createListElements(textInput) {
  const doElement = document.createElement('div')
  listContainer.appendChild(doElement)
  doElement.classList.add('card')

  const li = document.createElement('li');
  doElement.appendChild(li)
  li.textContent = `${textInput}`

  const removeButton = document.createElement('button');
  doElement.appendChild(removeButton);
  removeButton.textContent = 'remove'
  removeButton.classList.add('remove')

  const editButton = document.createElement('button');
  doElement.appendChild(editButton)
  editButton.textContent = 'Edit'
  editButton.classList.add('edit')

  const saveBtn = document.createElement('button')
  doElement.appendChild(saveBtn)
  saveBtn.textContent = 'Save'
  saveBtn.classList.add('save')
}

//! ======= Add Button Function =======
addBtn.addEventListener('click', addBtnFunction)
function addBtnFunction(e) {
  if (input.value === '') {
    return;
  }
  createListElements(input.value)
  let targetValue = e.target.previousElementSibling.value
  let data = {}
  data.targetValue = targetValue
  arr.push(data)
  saveToLocalStorage()

  //! ==== remove Button Function =====
  let remove = document.querySelectorAll('.remove')
  for (let i = 0; i < remove.length; i++) {
    remove[i].addEventListener('click', removeBtnFunction)
  }
  function removeBtnFunction(e) {
    let removeTarget = e.target.parentElement;
    let removeText = e.target.previousElementSibling.textContent
    removeTarget.remove()
    arr = JSON.parse(localStorage.getItem('key'))
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].targetValue === removeText) {
        arr.splice(i, 1)
        console.log(arr)
      }
    }
    saveToLocalStorage()
  }

  //! ===== Edit button Function =====
  let edit = document.querySelectorAll('.edit')
  for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener('click', editBtnFunction)
  }
  function editBtnFunction(e) {
    let editTarget = e.target.parentElement.firstElementChild
    arr = JSON.parse(localStorage.getItem('key'))
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].targetValue === editTarget.textContent) {
        arr.splice(i, 1)
      }
    }
    saveToLocalStorage()
    editTarget.setAttribute('contenteditable', 'true')

    //! ===== save button Function ======
    let saveBtn = e.target.nextElementSibling
    // console.log(saveBtn)
    saveBtn.addEventListener('click', saveBtnFunction)
    function saveBtnFunction(e) {
      arr = JSON.parse(localStorage.getItem('key'))
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].targetValue === editTarget.textContent) {
          arr.splice(i, 1)
        }
      }
      saveToLocalStorage()
      let saveTarget = e.target.parentElement.firstElementChild
      // console.log()
      saveTarget.setAttribute('contenteditable', 'false')
      let data = {}
      data.targetValue = saveTarget.textContent
      arr.push(data)
      saveToLocalStorage()
    }
  }
  input.value = '';
} // End of add event Listener (add Button)

//! ====== Save To Local Storage Function =====
function saveToLocalStorage() {
  localStorage.setItem('key', JSON.stringify(arr))
}

//! ======= On Load Function ======

document.addEventListener('DOMContentLoaded', getElementOnLoad)
function getElementOnLoad(e) {
  if (localStorage.getItem('key')) {
    arr = JSON.parse(localStorage.getItem('key'))
  }
  arr.forEach(e => {
    createListElements(e.targetValue)

    //     //! ===remove Button inside onLoad Function ====
    let remove = document.querySelectorAll('.remove')
    for (let i = 0; i < remove.length; i++) {
      remove[i].addEventListener('click', removeBtnFunction)
    }
    function removeBtnFunction(e) {
      let removeTarget = e.target.parentElement;
      let removeText = e.target.previousElementSibling.textContent
      removeTarget.remove()
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].targetValue === removeText) {
          arr.splice(i, 1)
        }
      }
      saveToLocalStorage()
    }
    //! ===== Edit button Function  on Load =====
    // let edit = document.querySelectorAll('.edit')
    // for (let i = 0; i < edit.length; i++) {
    //   edit[i].addEventListener('click', editBtnFunction)
    // }
    // function editBtnFunction(e) {
    //   let editTarget = e.target.parentElement.firstElementChild
    //   let editParent = e.target.parentElement
    //   let saveBtn = document.createElement('button')
    //   editParent.appendChild(saveBtn)
    //   saveBtn.textContent = 'save'

    //   arr = JSON.parse(localStorage.getItem('key'))
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].targetValue === editTarget.textContent) {
    //       arr.splice(i, 1)
    //     }
    //   }
    //   editTarget.setAttribute('contenteditable', 'true')
    //   saveToLocalStorage()

    //   //! ===== save button Function on Load======
    //   saveBtn.addEventListener('click', saveBtnFunction)
    //   function saveBtnFunction(e) {
    //     editTarget.setAttribute('contenteditable', 'false')
    //     let editText = e.target.parentElement.firstElementChild.textContent
    //     let data = {}
    //     data.targetValue = editText
    //     arr.push(data)
    //     saveToLocalStorage()
    //   }
    // }
  }) // end of forEach
}
