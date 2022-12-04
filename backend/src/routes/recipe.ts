import { RecipeModel } from "../models"
import { Request, Response, NextFunction } from "express"
import { Types } from 'mongoose'

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // TODO fetch and return a recipe
  const { id } = req.params

  const recipe = await RecipeModel.findOne({ "_id": id })
  res.send(recipe)
}
