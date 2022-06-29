const surveyClick = () => {
  localStorage.setItem('like', '0');
  localStorage.setItem('dislike', '0');
  localStorage.setItem('middle', '0');
  const likeFaces = document.querySelectorAll('.face-button');
  if (likeFaces) {
    const addToLocals = (like) => {
      let likeCount = parseInt(localStorage.getItem(like), 10)
      likeCount++
      localStorage.setItem(like, (likeCount).toString())
      displayThanksModal();
    }

    likeFaces.forEach(likeFace => {
      likeFace.addEventListener('click', (e) => { addToLocals(e.currentTarget.id) })
    });

    function displayThanksModal(){
      const thanksModal = document.querySelector('.thanks-coontainer')
      const showModal = () => { thanksModal.style.display = 'flex'; }
      const hideModal = () => setTimeout(thanksModal.style.display = 'none', 3000)
      showModal()
      setTimeout(()=>{
          hideModal()
      },4000);
    }
  }

}

export { surveyClick };
