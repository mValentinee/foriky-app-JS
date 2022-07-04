import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // Render Spinner
    recipeView.renderSpinner();
    // Update Results View To Mark Selected Results
    resultsView.update(model.getSearchResultsPage());
    // Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // Loading Recipe
    await model.loadRecipe(id);
    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // Render Spinner
    resultsView.renderSpinner();
    // Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    // Load Search
    await model.loadSearchResults(query);
    // Render Results
    resultsView.render(model.getSearchResultsPage(1));
    console.log(model.state.search.results);
    //Render Pagination Pages
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // Render New Page Results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //Render New Pagination Buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update The Recipe Servings (in state)
  model.updateServings(newServings);
  // Update The Recipe View
  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // Update Bookmarks
  recipeView.update(model.state.recipe);
  // Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render Spinner
    addRecipeView.renderSpinner();

    // Upload New Recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success
    addRecipeView.renderMessage();

    // Render Bookmark
    bookmarksView.render(model.state.bookmarks);

    // Change URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close Form Window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('⚫️', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('git');
};
init();
