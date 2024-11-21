import { loadingData, getErrorMessage, showErrorMessage, showSuccessMessage, sendData } from './server-service';

import { renderComments, openFullPhoto, closeFullPhoto } from './full-size-photo';


import { openEditorPicture, closeEditorPicture,setFormSubmit } from './upload-photo-form';

import { getEffect, updateSliderOptions, getSliderUpdate } from './editor-photo-slider';

loadingData(getErrorMessage);

setFormSubmit(
  () => {
    closeEditorPicture();
    showSuccessMessage();
  },
  () => {
    showErrorMessage();
  }
);


if (renderComments, openFullPhoto, closeFullPhoto, openEditorPicture, closeEditorPicture, getEffect,updateSliderOptions, getSliderUpdate, sendData) {
//
}
