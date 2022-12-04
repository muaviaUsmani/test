/* TODO: create recipe fetch actions, creators, and constants
  API: use /api/recipe/:id as a get request to fetch the recipe info
*/
export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"
export const SET_RECIPE_ID = "SET_RECIPE_ID"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

const setRecipeId = (payload) => ({
  type: SET_RECIPE_ID,
  payload,
})

export const fetchRecipe = async (recipeId) => {
  const response = await fetch("/api/recipe/"+recipeId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const result = await response.json()
  return result
}

export const getRecipe = (recipeId) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return fetchRecipe(recipeId)
      .then((res) => dispatch(fetchedRecipe(res)))
      .catch((err) => dispatch(failedRecipe(err)))
  }
}

export const updateRecipeId = (recipeId) => {
  return (dispatch) => {
    return dispatch(setRecipeId(recipeId))
  }
}
