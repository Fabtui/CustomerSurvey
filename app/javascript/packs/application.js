// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import { surveyClick } from '../components/survey_click'
import { totalClick } from '../components/total_click'
import { closeButtonClick } from '../components/close_button_click'
import { saveStates } from '../components/save_states'
import { displayNewForm } from '../components/display_new_day_form'
import { newDay } from '../components/new_day'
import { displaySaveModal } from '../components/display_save_modal'
import { cancelSave } from '../components/cancel_save'
import { previewImageOnFileSelect } from '../components/photo_preview'
import { navbarButton } from '../components/navbar_button'
import { initSweetalert } from '../components/init_sweet_alert'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "controllers"
import "bootstrap"



document.addEventListener('turbolinks:load', () => {
  surveyClick();
  totalClick();
  closeButtonClick();
  saveStates();
  displayNewForm();
  newDay();
  displaySaveModal();
  cancelSave();
  previewImageOnFileSelect();
  navbarButton();
  initSweetalert('#home-link-button', {
    title: "Attention!",
    text: "Vous allez perdre vos données non sauvegardées si vous n'êtes pas connecté à internet, êtes vous sûre?",
    icon: "warning",
    buttons: ["Annuler", "Continuer"],
    className: "sweet-alert-modal",
    }, (value) => {
      const link = document.querySelector('#home-link');
      if (value) {
        link.click();
      }
  });
  initSweetalert('#days-link-button', {
    title: "Attention!",
    text: "Vous allez perdre vos données non sauvegardées si vous n'êtes pas connecté à internet, êtes vous sûre?",
    icon: "warning",
    buttons: ["Annuler", "Continuer"],
    className: "sweet-alert-modal",
    }, (value) => {
      const link = document.querySelector('#days-link');
      if (value) {
        link.click();
      }
  });
  initSweetalert('#edit-link-button', {
    title: "Attention!",
    text: "Vous allez perdre vos données non sauvegardées si vous n'êtes pas connecté à internet, êtes vous sûre?",
    icon: "warning",
    buttons: ["Annuler", "Continuer"],
    className: "sweet-alert-modal",
    }, (value) => {
      const link = document.querySelector('#edit-link');
      if (value) {
        link.click();
      }
  });
  initSweetalert('#log-out-link-button', {
    title: "Attention!",
    text: "Vous allez perdre vos données non sauvegardées si vous vous déconnectez, êtes vous sûre?",
    icon: "warning",
    buttons: ["Annuler", "Continuer"],
    className: "sweet-alert-modal",
    }, (value) => {
      const link = document.querySelector('#log-out-link');
      if (value) {
        link.click();
      }
  });
})
