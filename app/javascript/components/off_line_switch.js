const offLineSwitch = () => {
  const offLineSwitchButton = document.querySelector('#OffLineSwitch')
  if (offLineSwitchButton) {
    const onLineLinks = document.querySelector('#online-links')
    offLineSwitchButton.addEventListener('change', () => {
      if (offLineSwitchButton.checked) {
        onLineLinks.style.display = 'none'
      } else {
        onLineLinks.style.display = 'block'
      }
    })
  }
}
export { offLineSwitch };
