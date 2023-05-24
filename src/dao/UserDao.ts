import models from '../models';
import IUserDao from './contracts/IUserDao';
import SuperDao from './SuperDao';
import { logger } from '../config/logger';

const User = models.user;
const Movie = models.movie;

export default class UserDao extends SuperDao implements IUserDao {
     constructor() {
          super(User);
     }

     public async findByEmail(email: string) {
          return User.findOne({ where: { email } });
     }

     public async isEmailExists(email: string) {
          return User.count({ where: { email } }).then((count) => {
               if (count !== 0) {
                    return true;
               }
               return false;
          });
     }

     public async createWithTransaction(user: object, transaction: object) {
          return User.create(user, { transaction });
     }

     public async findByIdInclude(where: object, includes: Array<any>) {
          includes.map((item, index) => {
               includes[index] = {
                    model: eval(item),
                    user_id: item.id,
               };
          });

          return User.findOne({
               where,
               include: includes,
          })
               .then((result) => result)
               .catch((e) => {
                    logger.error(e);
                    console.log(e);
               });
     }
}
