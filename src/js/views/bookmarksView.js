import View from './view';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg'; // parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarks yet.';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    //console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
