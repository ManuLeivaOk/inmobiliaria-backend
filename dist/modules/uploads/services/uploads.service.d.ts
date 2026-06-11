import { UploadedFileResponseDto } from '../dto/upload-response.dto';
export declare class UploadsService {
    uploadPropertyImages(files: Express.Multer.File[]): Promise<UploadedFileResponseDto[]>;
    deletePropertyImages(imageUrls: string[]): Promise<void>;
    private validateFile;
}
