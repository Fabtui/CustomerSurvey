const totalClick = () => {
  const totalButton = document.querySelector('#total-link');
  if (totalButton) {
    totalButton.addEventListener('click', () => {
      const like = parseInt(localStorage.getItem('like'), 10)
      const dislike = parseInt(localStorage.getItem('dislike'), 10)
      const middle = parseInt(localStorage.getItem('middle'), 10)
      const total = (like + dislike + middle)
      const dislikeTd = document.querySelector('#dislike-td')
      const likeTd = document.querySelector('#like-td')
      const middleTd = document.querySelector('#middle-td')
      const totalTd = document.querySelector('#total-td')
      const dislikeStatTd = document.querySelector('#dislike-stats-td')
      const middleStatTd = document.querySelector('#middle-stats-td')
      const likeStatTd = document.querySelector('#like-stats-td')
      const dislikeStats = Math.round((dislike / total)*100)
      const likeStats = Math.round((like / total)*100)
      const middleStats = Math.round((middle / total)*100)
      dislikeTd.innerText = dislike
      likeTd.innerText = like
      middleTd.innerText = middle
      totalTd.innerText = total
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
      if (middleStats) {
        middleStatTd.innerText = `${middleStats}%`
      } else {
        middleStatTd.innerText = `0%`
      }
      const totalContainer = document.querySelector('.total-container')
      // totalContainer.style.display = 'flex';
      totalContainer.classList.remove('hide-total')
    })
  };
}

export { totalClick };
