const displayNewForm = () => {
  const newDayButton = document.querySelector('#new-day-button');

  if (newDayButton) {

    const toggleHidden = () => {
      return new Promise((resolve, reject) => {

        const saveModal = document.querySelector('#new-modal');
        saveModal.classList.toggle('hidden');

        // const homeContainer = document.querySelector('.home-container')
        // if (homeContainer) {
        //   // const saveButton = document.querySelector('#save-submit-button');
        //   // saveButton.classList.toggle('hidden');
        // } else {
        //   const downArrow = document.querySelector('.arrow-down')
        //   downArrow.classList.toggle('hide-arrow');
        // }

        const error = false;
        if(!error){
            resolve();
        }
        else{
            reject('Error: Something went wrong!')
        }
      })
    }

    async function toggleAndThenScroll() {
      await toggleHidden()
      window.scrollTo(0, document.body.scrollHeight)
    }

    newDayButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAndThenScroll();
    })

    const cancelButton = document.querySelector('#cancel-new-day')
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      toggleHidden();
    })
  };
}

export { displayNewForm };
