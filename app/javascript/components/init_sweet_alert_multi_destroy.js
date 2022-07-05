import swal from 'sweetalert';

const initSweetalertMultiDestroy = (selector = () => {}, name, sentence) => {
  const swalButtons = document.querySelectorAll(selector);
  if (swalButtons) { // protect other pages
    swalButtons.forEach(swalButton => {
      const id = swalButton.id
      swalButton.addEventListener('click', () => {
        const options = {
          title: "Attention!",
          text: `Etes vous sûre de vouloir supprimer ${sentence}?`,
          icon: "warning",
          buttons: ["Annuler", "Continuer"],
          className: "sweet-alert-modal"
        }
        swal(options).then((value) => {
          if (value) {
            const link = document.querySelector(`#${name}-delete-link-${id}`)
            link.click();
          }
        });
      });
    })
  }
}
  //     const callback = (id) => {
  //       , (value) => {
  //     const link = document.querySelector('#day-delete-link');
  //     if (value) {
  //       console.log(value);
  //       link.click();
  //     }
  // });

export { initSweetalertMultiDestroy };
