const cancelSave = () => {
  const cancelSaveButton = document.querySelector('#save-cancel-button');

  if (cancelSaveButton) {

    const toggleHidden = () => {
      const saveModal = document.querySelector('.save-container');
      saveModal.classList.toggle('hidden');
    }

    cancelSaveButton.addEventListener('click', (e) => {
      toggleHidden();
    })
  };
}

export { cancelSave };
