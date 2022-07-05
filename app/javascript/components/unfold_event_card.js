const unfoldEventCard = () => {
  const eventContainer = document.querySelector('.events-container')
  if (eventContainer) {
    const statItems = document.querySelectorAll('.stats-item');
    statItems.forEach(statItem => {
      statItem.addEventListener('click', (e) => {
        const id = e.target.id;
        console.log(`#container-${id}`);
        const eventContainer = document.querySelector(`#container-${id}`)
        eventContainer.classList.toggle('fold__container');
        const eventContent = document.querySelector(`#content-${id}`)
        eventContent.classList.toggle('fold__content');
      })
    });
  };
}

export { unfoldEventCard };
