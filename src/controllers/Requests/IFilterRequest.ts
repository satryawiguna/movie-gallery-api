export interface IFilterRequest {
     search?: string;
     order_column?: string;
     order_sort?: string;
     limit: number;
     offset: number;
     page: number;
}
