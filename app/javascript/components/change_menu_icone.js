const changeMenuIcone = () => {
  const MenuButton = document.querySelector('.nav-menu-button')
  if (MenuButton) {
    const MenuIcone = document.querySelector('.fa-bars')
    const navMenu = document.querySelector('.navbar-dropdown-menu')
    MenuButton.addEventListener('click', () => {
      if (navMenu.classList.contains("hide-menu")) {
        MenuIcone.classList.replace('fa-times', 'fa-bars')
      } else {
        MenuIcone.classList.replace('fa-bars', 'fa-times')
      }
    })
  }
}
export { changeMenuIcone };
