import { Injectable } from '@nestjs/common';
import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CreateJobCommand, CreateJobCommandInput, MediaConvertClient, OutputGroupType, ContainerType, VideoCodec, AudioCodec } from '@aws-sdk/client-mediaconvert';
import * as AWS from 'aws-sdk';
import { iam } from '../IAM Module/aws.config';
@Injectable()
export class S3BService {
    private readonly mediaConvertClient: MediaConvertClient;
    private readonly s3Client: S3Client;

    constructor() {
    this.s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
    accessKeyId: 'AKIAZQ3DQARZG26MGLAQ',
    secretAccessKey: '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',
    },
    });

    this.mediaConvertClient = new MediaConvertClient({
    region: 'us-east-1',
    credentials: {
    accessKeyId: 'AKIAZQ3DQARZG26MGLAQ',
    secretAccessKey: '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',
    },
    endpoint: 'https://vasjpylpa.mediaconvert.us-east-1.amazonaws.com'
    });
    }

    
    async upload(filename: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Body: file,
                Bucket: 'y-video-converter-bucket',
                Key: filename,
            }),
        );
    }

    async createMediaConvertJob(inputFile: string, outputFile: string) {
        const params: CreateJobCommandInput = {
            Role: 'arn:aws:iam::654654309490:role/mediaConvert',
            Settings: {
                Inputs: [
                    {
                        
                        FileInput: `s3://y-video-converter-bucket/${inputFile}`,
                        AudioSelectors: {
                            'Audio Selector 1': {
                                // or '2' if you have multiple audio tracks
                            },
                        },
                    },
                ],
                OutputGroups: [
                    {
                        OutputGroupSettings: {
                            Type: OutputGroupType.FILE_GROUP_SETTINGS,
                            FileGroupSettings: { Destination: `s3://y-video-converter-bucket/${outputFile}` },
                        },
                        Outputs: [
                            {
                                ContainerSettings: { Container: ContainerType.MP4 },
                                VideoDescription: {
                                    CodecSettings: {
                                        Codec: VideoCodec.H_264,
                                        H264Settings: {
                                            Bitrate: 5000000,
                                            FramerateControl: "SPECIFIED",
                                            FramerateNumerator: 30,
                                            FramerateDenominator: 1,
                                            RateControlMode: "CBR",
                                        },
                                    },
                                },
                                AudioDescriptions: [
                                    {
                                        CodecSettings: {
                                            Codec: AudioCodec.AAC,
                                            AacSettings: {
                                                Bitrate: 64000,
                                                SampleRate: 48000,
                                                CodingMode: "CODING_MODE_2_0",
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        };

        const command = new CreateJobCommand(params);
        return await this.mediaConvertClient.send(command);
    }



    async listOFVideos(){
        const command = new ListObjectsV2Command({
            Bucket: 'y-video-converter-bucket',
        });
         const response = await this.s3Client.send(command);
        const videoKeys = response.Contents?.map(object => object.Key ?? '') || [];

        return videoKeys;
    }
} 


