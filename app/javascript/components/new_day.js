import { csrfToken } from "@rails/ujs"

const newDay = () => {
  const saveContainer = document.querySelector('.save-container')
  if (saveContainer) {
    const saveButton = document.querySelector('#save-new-day')
    const newForm = document.querySelector('#new_day')

    const container = document.querySelector('.container')
    const display = (data) => {
      container.insertAdjacentHTML('beforeend', data)
    }

    const formSelector = document.querySelector('#save-day-select')
    const insert = (id, name, date) => {
      formSelector.insertAdjacentHTML('afterbegin', `<option class="days-item" value="${id}">${date} - ${name}</option>'`)
    }

    const toggleHidden = () => {
      const saveModal = document.querySelector('#new-modal');
      const saveButton = document.querySelector('#save-submit-button');
      saveModal.classList.toggle('hidden');
      saveButton.classList.toggle('hidden');
    }

    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      fetch(newForm.action, {
        method: "POST",
        headers: { "Accept": "application/json", "X-CSRF-Token": csrfToken() },
        body: new FormData(newForm)
      })
        .then(response => response.json())
        .then(toggleHidden())
        .then((data) => {
          insert(data["id"], data['name'], data['date'])
          display(data['notice'])
        })
    })
  };
}

export { newDay };
