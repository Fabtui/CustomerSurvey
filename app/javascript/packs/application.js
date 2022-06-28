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
})
