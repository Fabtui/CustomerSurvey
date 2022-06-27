const displayNewForm = () => {
  const newDayButton = document.querySelector('#new-day-button');

  if (newDayButton) {

    const toggleHidden = () => {
      const saveModal = document.querySelector('#new-modal');
      const saveButton = document.querySelector('#save-submit-button');
      saveModal.classList.toggle('hidden');
      saveButton.classList.toggle('hidden');
    }

    newDayButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleHidden();
    })

    const cancelButton = document.querySelector('#cancel-new-day')
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleHidden();
    })
  };
}

export { displayNewForm };
