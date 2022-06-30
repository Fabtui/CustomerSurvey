import { csrfToken } from "@rails/ujs"

const saveStates = () => {
  const saveButton = document.querySelector('#save-submit-button');
  if (saveButton) {
    const daySelector = document.querySelector('#save-day-select');
    const replaceRadioButton = document.querySelector('#replace-radio-button');
    const saveContainer = document.querySelector('.save-container')
    const homeContainer = document.querySelector('.home-container')
    const container = document.querySelector('.container')
    const display = (response) => {
      container.insertAdjacentHTML('beforeend', response['form'])
    }

    const refreshHome = (time) => {
      setTimeout("location.reload(true);", time);
    }

    saveButton.addEventListener('click', () => {
      const dayId = daySelector.value;
      const replaceValue = replaceRadioButton.checked
      // const params = {
      //     good: localStorage.getItem('like'),
      //     bad: localStorage.getItem('dislike')
      // };
      const options = {
          method: 'GET',
          // headers: { "Accept": "application/json", "X-CSRF-Token": csrfToken() },
          // body: JSON.stringify( params )
      };
      fetch( `/days/${dayId}/save?good=${localStorage.getItem('like')}&middle=${localStorage.getItem('middle')}&bad=${localStorage.getItem('dislike')}&replace=${replaceValue}`, options )
          .then( response => response.json() )
          .then( response => {
            if (response) {
              saveContainer.classList.add('hidden')
              homeContainer.classList.remove('hidden')
              display(response)
            }
          })
    })
  };
}

export { saveStates };
