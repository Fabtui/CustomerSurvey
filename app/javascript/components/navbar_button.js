const navbarButton = () => {
  const navbarButton = document.querySelector('.nav-menu-button');
  const totalLink = document.querySelector('#total-link')
  const navbarMenu = document.querySelector('.navbar-dropdown-menu')
  const saveLink = document.querySelector('#save-link')
  const MenuIcone = document.querySelector('.fa-bars')
  const MenuButton = document.querySelector('.nav-menu-button')
  const navMenu = document.querySelector('.navbar-dropdown-menu')

  const changeMenuIcone = () => {
    if (navMenu.classList.contains("hide-menu")) {
      MenuIcone.classList.replace('fa-times', 'fa-bars')
    } else {
      MenuIcone.classList.replace('fa-bars', 'fa-times')
    }
  }

  if (navbarButton) {
    navbarButton.addEventListener('click', (e) => {
      navbarMenu.classList.toggle('hide-menu')
      changeMenuIcone();
    })
  };

  if (totalLink) {
    totalLink.addEventListener('click', (e) => {
      navbarMenu.classList.toggle('hide-menu')
      changeMenuIcone();
    })
  }

  if (saveLink) {
    saveLink.addEventListener('click', (e) => {
      navbarMenu.classList.toggle('hide-menu')
      changeMenuIcone();
    })
  }
}

export { navbarButton };
