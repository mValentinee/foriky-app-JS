import View from './view';
import icons from 'url:../../img/icons.svg'; // parcel 2

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    return this._generateMarkupButton(this._data);
  }

  _generateMarkupButton() {
    // Data Needed for Button
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const nextPage = `
              <button data-goto="${
                curPage + 1
              }"class="btn--inline pagination__btn--next">
                <span>${curPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
             </button>
              `;

    const previousPage = `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${curPage - 1}</span>
    </button>
    `;

    // Button Logic
    // page 1 with more pages
    return curPage === 1 && numPages > 1
      ? nextPage
      : curPage === numPages && numPages > 1
      ? previousPage
      : curPage < numPages
      ? [nextPage, previousPage]
      : '';
  }
}
export default new paginationView();
