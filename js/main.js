import { loadingData, getErrorMessage, showErrorMessage, showSuccessMessage } from './server-service';

import './full-size-photo';

import './gallery';

import './photo-thumbnails';

import { closeEditorPicture, setFormSubmit } from './upload-photo-form';

import './editor-photo-slider';

import './editor-photo-scale';

loadingData('https://32.javascript.htmlacademy.pro/kekstagram/data', getErrorMessage);

setFormSubmit(
  () => {
    closeEditorPicture();
    showSuccessMessage();
  },
  () => {
    showErrorMessage();
  }
);
