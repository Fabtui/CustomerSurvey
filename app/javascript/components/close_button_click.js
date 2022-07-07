const closeButtonClick = () => {
  const closeButton = document.querySelector('.close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      const totalContainer = document.querySelector('.total-container')
      // totalContainer.style.display = 'none';
      totalContainer.classList.add('hide-total')
    })
  };
}

export { closeButtonClick };
