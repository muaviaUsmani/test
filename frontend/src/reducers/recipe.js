import { GET_RECIPE, RECEIVE_RECIPE, FAIL_RECIPE, SET_RECIPE_ID } from "../actions"

const initialState = {
  recipe: null,
  recipeId: null,
  isLoading: false,
  error: null,
}

const recipeFetching = (state) => {
  return { ...state, isLoading: true }
}

const recipeFetched = (state, payload) => {
  // console.log(state, payload)
  return { ...state, isLoading: false, recipe: payload, recipeId: payload._id }
}

const recipeFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

const recipeIdSet = (state, payload) => {
  return { ...state, recipeId: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_RECIPE_ID:
      return recipeIdSet(state, payload)
    case GET_RECIPE:
      return recipeFetching(state)
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_RECIPE:
      return recipeFailed(state, payload)
    default:
      return {...state}
  }
}
