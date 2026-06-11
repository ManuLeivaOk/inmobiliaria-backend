export declare class PaginationQueryDto {
    page?: number;
    limit?: number;
}
export interface PaginatedResult<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export declare function buildPaginatedResult<T>(data: T[], total: number, page: number, limit: number): PaginatedResult<T>;
