const surveyClick = () => {
  localStorage.setItem('like', '0');
  localStorage.setItem('dislike', '0');
  const likeFaces = document.querySelectorAll('.face-button');
  if (likeFaces) {
    const addToLocals = (like) => {
      let likeCount = parseInt(localStorage.getItem(like), 10)
      likeCount++
      localStorage.setItem(like, (likeCount).toString())
      console.log(localStorage.getItem(like));
    }

    likeFaces.forEach(likeFace => {
      likeFace.addEventListener('click', (e) => { addToLocals(e.currentTarget.id) })
    });
  }

}

export { surveyClick };
