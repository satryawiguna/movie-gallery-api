import models from "../models";
import SuperDao from "./SuperDao";
import IFavoriteDao from "./contracts/IFavoriteDao";

const Favorite = models.favorite;

export default class FavoriteDao extends SuperDao implements IFavoriteDao {
  constructor() {
    super(Favorite);
  }
}
