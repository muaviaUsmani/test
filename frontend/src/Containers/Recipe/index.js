import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { RecipeWrapper } from "./styles"
import * as actions from "../../actions"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Recipe extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    const { recipeId } = this.props
    const { recipeId: oldRecipeId } = prevProps
    if (
      !oldRecipeId || 
      (oldRecipeId && recipeId && recipeId !== oldRecipeId)
    ) {
      this.props.getRecipe(recipeId)
    }
  }
  
  render() {
    const { recipe, recipeId } = this.props
    const {
      name,
      instructions,
      ingredients,
    } = recipe || {}

    if (!recipeId) {
      return <></>
    }
  
    return (
      <RecipeWrapper>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {name}
            </Typography>
            <List>
            {ingredients?.map(ingredient => (
              <ListItem key={ingredient._id}>
                <ListItemText primary={`${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`} />
              </ListItem>
            ))}
            </List>
            <Typography>
              {instructions}
            </Typography>
          </CardContent>
        </Card>
      </RecipeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { recipe: recipeState } = state
  const { recipe, recipeId } = recipeState
  return { recipe, recipeId }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecipe: actions.getRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)