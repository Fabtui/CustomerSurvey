const displaySaveModal = () => {
  const saveButton = document.querySelector('#save-link');

  if (saveButton) {

    const toggleHidden = () => {
      const saveModal = document.querySelector('.save-container');
      saveModal.classList.toggle('hidden');
    }

    saveButton.addEventListener('click', (e) => {
      toggleHidden();
    })
  };
}

export { displaySaveModal };
