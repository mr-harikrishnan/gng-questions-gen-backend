const {
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand
} = require("@aws-sdk/client-s3")

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const { fromSSO } = require("@aws-sdk/credential-providers");

const s3 = new S3Client({
    region: "ap-south-1",
    credentials: fromSSO({ profile: "grids_and_guides" }),
});

const S3_BUCKET = "internship-bucket-grids-and-guides";

async function createMultiPartUpload(payload) {
    try {
        const multiPartParams = {
            Bucket: S3_BUCKET,
            Key: `Harikrishnan/questionsGen/${payload.questionsType}/${payload.fileKey}`
        }
        const command = new CreateMultipartUploadCommand(multiPartParams);
        const multiPartUploadData = await s3.send(command)

        return {
            fileId: multiPartUploadData.UploadId,
            fileKey: multiPartUploadData.Key
        }
    } catch (error) {
        throw error
    }
}


async function createPreSignedUrl(payload) {
    try {
        const multiPartUrlParams = {
            Bucket: S3_BUCKET, 
            Key: `Harikrishnan/questionsGen/${payload.questionsType}/${payload.fileKey}`,
            UploadId: payload.fileId,
            PartNumber: payload.partNumber 
        };
        const command = new UploadPartCommand(multiPartUrlParams);
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 2 });
        return {
            signedUrl,
            partNumber: payload.partNumber
        };
    } catch (error) {
        throw error;
    }
}

async function completeMultiPartUpload(payload) {
    try {
          let sortedParts = payload.parts.sort((a, b) => a.PartNumber - b.PartNumber);
        const multiPartParams = {
            Bucket: S3_BUCKET,
            Key: `Harikrishnan/questionsGen/${payload.questionsType}/${payload.fileKey}`,
            UploadId: payload.fileId,
            MultipartUpload:{
                Parts:sortedParts
            }
        }

        const command=new CompleteMultipartUploadCommand(multiPartParams)
        await s3.send(command)
        return{
            message:"File completed successfull"
        }
    } catch (error) {
        throw error
    }

}

module.exports = {
    createMultiPartUpload,
    createPreSignedUrl,
    completeMultiPartUpload
}