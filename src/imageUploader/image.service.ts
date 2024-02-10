import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { v4 as uuid} from 'uuid'
const { ShareServiceClient } = require("@azure/storage-file-share");

@Injectable()
export class ImageService {
    azureConnectionString: string = process.env.AZURE_BLOB_STRING;
    containerName: string = process.env.CONTAINER_NAME;

    getBlobClient(imageName: string): BlockBlobClient {
        const blobClientService = BlobServiceClient.fromConnectionString(
            this.azureConnectionString,
        );
        const containerClient = blobClientService.getContainerClient(
            this.containerName,
        );
      
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient;
    }

    async upload(file: Express.Multer.File) {
        try {
            const newName = uuid();
            const blobClient = this.getBlobClient(newName + '.webp');
            await blobClient.uploadData(file.buffer);
            return {fileName:newName + '.webp'};
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async uploadNormalFile(file: Express.Multer.File) {
        try {
            const newName = uuid();
            const blobClient = this.getBlobClient(newName + file.originalname);
            await blobClient.uploadData(file.buffer);
            return {fileName:newName + file.originalname};
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async getImage(fileName) {
        const blobClientService = BlobServiceClient.fromConnectionString(
            this.azureConnectionString,
        );
        const containerClient = blobClientService.getContainerClient(
            this.containerName,
        );

        const a = await containerClient.findBlobsByTags(fileName)
        const str = `https://${'ajayshankar'}.file.core.windows.net/${process.env.AZURE_STORAGE_SAS_KEY}`
        const serviceClient = new ShareServiceClient(containerClient.url);
        const fileClient = serviceClient
            .getShareClient('b2b')
            .rootDirectoryClient.getFileClient(fileName);

        const downloadFileResponse = await fileClient.download(0);
        return await this.blobToString(await downloadFileResponse.blobBody)
    }

    async blobToString(blob) {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onloadend = (ev) => {
                resolve(ev.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsText(blob);
        });
    }

}
