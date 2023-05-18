import { IFilterRequest } from './IFilterRequest';

export interface IMovieFilterRequest extends IFilterRequest {
     release_date_start?: Date;
     release_date_end?: Date;
}
