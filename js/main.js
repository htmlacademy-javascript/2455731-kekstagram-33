import { loadingData, getErrorMessage, showErrorMessage, showSuccessMessage} from './server-service';

import './full-size-photo';

import './gallery';

import './photo-thumbnails';

import { closeEditorPicture,setFormSubmit } from './upload-photo-form';

import './editor-photo-slider';

import './editor-photo-scale';

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
