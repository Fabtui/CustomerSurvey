import swal from 'sweetalert';

const initSweetalertMultiDestroyFolder = (selector = () => {}, name, sentence) => {
  const swalButtons = document.querySelectorAll(selector);
  if (swalButtons) { // protect other pages
    swalButtons.forEach(swalButton => {
      const id = swalButton.id
      swalButton.addEventListener('click', () => {
          const options = {
                  title: "Attention!",
                  text: `Etes vous sûre de vouloir supprimer ${sentence} ainsi que tout ses évènements?`,
                  icon: "warning",
                  buttons: {
                  cancel: "Annuler",
                  all: {
                    text: "Tout",
                    value: "all",
                  },
                  folder: {
                    text: "Dossier",
                    value: "folder",
                  }},
                  className: "sweet-alert-modal"
                }
        swal(options).then((value) => {
          if (value) {
            switch (value) {
            case "folder":
              const link = document.querySelector(`#${name}-delete-link-${id}`)
              link.click();
              break;
            case "all":
              const linkAll = document.querySelector(`#${name}-delete-link-${id}-all`)
              linkAll.click();
              break;
            }
          }
        });
      });
    })
  }
}
  //     const callback = (id) => {
  //       , (value) => {
  //     const link = document.querySelector('#event-delete-link');
  //     if (value) {
  //       console.log(value);
  //       link.click();
  //     }
  // });

export { initSweetalertMultiDestroyFolder };
