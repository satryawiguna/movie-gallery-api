import { IUser } from '../../models/interfaces/IUser';
import { IContact } from '../../models/interfaces/IContact';

export interface IRegisterRequest extends IUser, IContact {}
