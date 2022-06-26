const totalClick = () => {
  const totalButton = document.querySelector('#total-link');
  if (totalButton) {
    totalButton.addEventListener('click', () => {
      const like = parseInt(localStorage.getItem('like'), 10)
      const dislike = parseInt(localStorage.getItem('dislike'), 10)
      const total = parseInt(localStorage.getItem('like'), 10) + parseInt(localStorage.getItem('dislike'), 10)
      const dislikeTd = document.querySelector('#dislike-td')
      const likeTd = document.querySelector('#like-td')
      const totalTd = document.querySelector('#total-td')
      const dislikeStatTd = document.querySelector('#dislike-stats-td')
      const likeStatTd = document.querySelector('#like-stats-td')
      dislikeTd.innerText = dislike
      likeTd.innerText = like
      totalTd.innerText = total
      const dislikeStats = Math.round((dislike / total)*100)
      const likeStats = Math.round((like / total)*100)
      if (dislikeStats) {
        dislikeStatTd.innerText = `${dislikeStats}%`
      } else {
        dislikeStatTd.innerText = `0%`
      }
      if (likeStats) {
        likeStatTd.innerText = `${likeStats}%`
      } else {
        likeStatTd.innerText = `0%`
      }
      const totalContainer = document.querySelector('.total-container')
      totalContainer.style.display = 'flex';
    })
  };
}

export { totalClick };
