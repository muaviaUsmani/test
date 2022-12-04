import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"
import Recipe from "../Recipe"
import { generateURLSearchString, getURLSearchObject } from '../../utils'

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.redirectToSearch = this.redirectToSearch.bind(this)
    this.selectRecipe = this.selectRecipe.bind(this)
    this.state = {
      term: "",
      ingredients: ["milk"],
    }
  }
  componentDidMount() {
    const { location } = this.props;
    const searchParams = getURLSearchObject(location.search);
    if (searchParams.has('recipeId')) {
      this.props.updateRecipeId(searchParams.get('recipeId'))
    }
    if (
      searchParams.has('term') && searchParams.has('ingredients')
    ) {
      const ingredientsList = searchParams.get('ingredients')
      const ingredients = ingredientsList && ingredientsList.split(',') || []
      const term = searchParams.get('term')
      this.setState({
        term: term,
        ingredients: ingredients,
      }, () => this.fetchSearch())
    }
  }
  componentDidUpdate() {
    const { recipes, recipeId } = this.props
    const recipeIds = recipes?.map(recipe => recipe.id) || []
    if (!recipeIds.includes(recipeId)) {
      this.props.updateRecipeId(null)
    }
  }
  redirectToSearch() {
    const { history, location } = this.props;
    const { term, ingredients } = this.state;

    const params = [
      {attribute: 'term', value: term},
      {attribute: 'ingredients', value: ingredients},
    ]
    if (!term && !ingredients.length) {
      params.push({attribute: 'recipeId', value: ''})
      this.props.updateRecipeId(null)
      this.props.resetRecipes()
    }
    history.push(
      `${location.pathname}?${generateURLSearchString(location.search, params)}`
    )
    this.fetchSearch();
  }
  fetchSearch() {
    const { term, ingredients } = this.state;
    if (term || ingredients.length) {
      this.props.searchRecipes(term, ingredients);
    }
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({ term })
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  selectRecipe(recipeId) {
    const { history, location } = this.props;

    history.push(
      `${location.pathname}?${generateURLSearchString(location.search, [{attribute: 'recipeId', value: recipeId}])}`
    )
  }
  render() {
    const { term, ingredients } = this.state
    const { recipes, isLoading } = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button onClick={this.redirectToSearch}>search</Button>
        <Divider />
        {recipes && (
          <List>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id}>
                <ListItemText 
                  primary={recipe.name} 
                  onClick={() => {
                    this.selectRecipe(recipe.id)
                    this.props.updateRecipeId(recipe.id)
                  }} />
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LinearProgress />}
        <Divider />
        <Recipe />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search, recipe } = state
  return { ...search, recipeId: recipe.recipeId }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      resetRecipes: actions.resetRecipes,
      updateRecipeId: actions.updateRecipeId,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
