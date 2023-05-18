import models from '../models';
import SuperDao from './SuperDao';
import IContactDao from './contracts/IContactDao';

const Contact = models.contact;

export default class ContactDao extends SuperDao implements IContactDao {
     constructor() {
          super(Contact);
     }
}
