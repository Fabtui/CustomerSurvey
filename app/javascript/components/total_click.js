const totalClick = () => {
  const totalButton = document.querySelector('#total-link');
  if (totalButton) {
    totalButton.addEventListener('click', () => {
      const like = localStorage.getItem('like')
      const dislike = localStorage.getItem('dislike')
      const total = parseInt(localStorage.getItem('like'), 10) + parseInt(localStorage.getItem('dislike'), 10)
      const dislikeTd = document.querySelector('#dislike-td')
      const likeTd = document.querySelector('#like-td')
      const totalTd = document.querySelector('#total-td')
      dislikeTd.innerText = dislike
      likeTd.innerText = like
      totalTd.innerText = total
      const totalContainer = document.querySelector('.total-container')
      totalContainer.style.display = 'block';
    })
  };
}

export { totalClick };
