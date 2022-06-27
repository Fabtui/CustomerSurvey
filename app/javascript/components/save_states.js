import { csrfToken } from "@rails/ujs"

const saveStates = () => {
  const saveButton = document.querySelector('#save-submit-button');
  if (saveButton) {
    const daySelector = document.querySelector('#save-day-select');
    saveButton.addEventListener('click', () => {
      const dayId = daySelector.value;
      // const params = {
      //     good: localStorage.getItem('like'),
      //     bad: localStorage.getItem('dislike')
      // };
      const options = {
          method: 'GET',
          // headers: { "Accept": "application/json", "X-CSRF-Token": csrfToken() },
          // body: JSON.stringify( params )
      };
      fetch( `/days/${dayId}/save?good=${localStorage.getItem('like')}&bad=${localStorage.getItem('dislike')}`, options )
          .then( response => response.json() )
          .then( response => {
              console.log(response);
          } );
    })
  };
}

export { saveStates };