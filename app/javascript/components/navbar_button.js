const navbarButton = () => {
  const navbarButton = document.querySelector('.nav-menu-button');
  const totalLink = document.querySelector('#total-link')
  const navbarMenu = document.querySelector('.navbar-dropdown-menu')
  const saveLink = document.querySelector('#save-link')

  if (navbarButton) {
    navbarButton.addEventListener('click', (e) => {
      navbarMenu.classList.toggle('hide-menu')
    })
  };

  if (totalLink) {
    totalLink.addEventListener('click', (e) => {
      navbarMenu.classList.toggle('hide-menu')
    })
  }

  if (saveLink) {
    saveLink.addEventListener('click', (e) => {
      navbarMenu.classList.toggle('hide-menu')
    })
  }
}

export { navbarButton };
