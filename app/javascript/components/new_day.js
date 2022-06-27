import { csrfToken } from "@rails/ujs"

const newDay = () => {
  const newModal = document.querySelector('#new-modal');
  if (newModal) {
    const saveButton = document.querySelector('#save-new-day')
    const newForm = document.querySelector('#new_day')

    const container = document.querySelector('.container')
    const display = (response) => {
      container.insertAdjacentHTML('beforeend', response['form'])
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
        .then((data) => {
          display(data['form'])
        })
        .then(toggleHidden());
    })
  };
}

export { newDay };
