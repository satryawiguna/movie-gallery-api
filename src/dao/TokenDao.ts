import models from "../models";
import ITokenDao from "./contracts/ITokenDao";
import SuperDao from "./SuperDao";

const Token = models.token;

export default class TokenDao extends SuperDao implements ITokenDao {
  constructor() {
    super(Token);
  }

  public async findOne(where: object) {
    console.log(where);
    return Token.findOne({ where });
  }

  public async remove(where: object) {
    return Token.destroy({ where });
  }
}
