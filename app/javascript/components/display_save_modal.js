const displaySaveModal = () => {
  const smileyContainer = document.querySelector('.smiley-container')
  if (smileyContainer) {
    const saveButton = document.querySelector('#save-link');

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
