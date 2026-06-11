import { UploadsService } from '../services/uploads.service';
import { UploadedFileResponseDto } from '../dto/upload-response.dto';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadPropertyImages(files: Express.Multer.File[]): Promise<UploadedFileResponseDto[]>;
}
