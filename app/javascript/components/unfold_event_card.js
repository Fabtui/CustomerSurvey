const unfoldEventCard = () => {
  const container = document.querySelector('.events-container')
  if (container) {
    const faIcons = document.querySelectorAll('.unfold__arrow__container > .fa');
    faIcons.forEach(faIcon => {
      faIcon.addEventListener('click', (e) => {
        const id = e.target.id;
        const eventContainer = document.querySelector(`#container-${id}`)
        const eventContent = document.querySelector(`#content-${id}`)
        if (e.target.classList.contains('fa-angle-down')) {
          e.target.classList.replace('fa-angle-down', 'fa-angle-up')
          unfold(eventContainer)
          eventContent.classList.remove('hide-content');
        } else {
          e.target.classList.replace('fa-angle-up', 'fa-angle-down')
          fold(eventContainer)
          eventContent.classList.add('hide-content');
        }
      })
    });

    function unfold(element) {
      let id = null;
      let pos = 0;
      clearInterval(id);
      id = setInterval(frame, 1);
      function frame() {
        if (pos >= 240) {
          clearInterval(id);
        } else {
          pos += 20;
          element.style.height = pos + 'px';
        }
      }
    }

    function fold(element) {
      let id = null;
      let pos = 240;
      clearInterval(id);
      id = setInterval(frame, 1);
      function frame() {
        if (pos <= 0) {
          clearInterval(id);
        } else {
          pos -= 20;
          element.style.height = pos + 'px';
        }
      }
    }

  };
}

export { unfoldEventCard };
