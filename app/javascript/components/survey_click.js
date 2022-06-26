const surveyClick = () => {
  localStorage.setItem('like', '0')
  localStorage.setItem('dislike', '0')
  const likeFaces = document.querySelectorAll('.face-button')
  if (likeFaces) {
    likeFaces.forEach(likeFace => {
      likeFace.addEventListener('click', (e) => {
        if (e.currentTarget.id === 'like') {
          console.log('like');
        } else {
          console.log('dislike');
        }
      })
    });
  }
}

export { surveyClick };
