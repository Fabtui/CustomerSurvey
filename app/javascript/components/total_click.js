const totalClick = () => {
  const totalButton = document.querySelector('#total-link');
  if (totalButton) {
    totalButton.addEventListener('click', () => {
      const totalContainer = document.querySelector('.total-container')
      totalContainer.style.display = 'flex';
    })
  };
}

export { totalClick };
