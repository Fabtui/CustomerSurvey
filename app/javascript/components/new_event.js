import { csrfToken } from "@rails/ujs"

const newEvent = () => {
  const saveContainer = document.querySelector('.save-container')
  if (saveContainer) {
    const saveButton = document.querySelector('#save-new-event')
    const newForm = document.querySelector('#new_event')

    const container = document.querySelector('.container')
    const display = (data) => {
      container.insertAdjacentHTML('beforeend', data)
    }

    const formSelector = document.querySelector('#save-event-select')
    const insert = (id, name, date) => {
      const data = `<option class="events-item" value="${id}">${date} - ${name}</option>'`
      formSelector.insertAdjacentHTML('afterbegin', data)
    }

    const toggleHidden = () => {
      const saveModal = document.querySelector('#new-modal');
      saveModal.classList.toggle('hidden');
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
          formSelector.value = data["id"]
        })
    })
  };
}

export { newEvent };
