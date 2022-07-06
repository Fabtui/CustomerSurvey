const unfoldEventCard = () => {
  const eventContainer = document.querySelector('.events-container')
  if (eventContainer) {
    const faIcons = document.querySelectorAll('.unfold__arrow__container > .fa');
    faIcons.forEach(faIcon => {
      faIcon.addEventListener('click', (e) => {
        const id = e.target.id;
        const eventContainer = document.querySelector(`#container-${id}`)
        eventContainer.classList.toggle('fold__container');
        const eventContent = document.querySelector(`#content-${id}`)
        eventContent.classList.toggle('fold__content');
        console.log(e.target.classList);
        if (e.target.classList.contains('fa-angle-down')) {
          e.target.classList.replace('fa-angle-down', 'fa-angle-up')
        } else {
          e.target.classList.replace('fa-angle-up', 'fa-angle-down')
        }
      })
    });
  };
}

export { unfoldEventCard };
