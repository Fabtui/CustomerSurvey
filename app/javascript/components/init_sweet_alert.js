import swal from 'sweetalert';

const initSweetalert = (selector, options = {}, callback = () => {}) => {
  const homeContainer = document.querySelector('.home-container')
  const swalButton = document.querySelector(selector);
  if (homeContainer && swalButton || swalButton && selector == "#log-out-link-button") { // protect other pages
    swalButton.addEventListener('click', () => {
      swal(options).then(callback);
    });
  } else if (swalButton && selector != "#log-out-link-button") { // protect other pages
    swalButton.addEventListener('click', () => {
      const link = document.querySelector(selector.replace('-button', ''));
      link.click();
    });
  };
}
export { initSweetalert };
