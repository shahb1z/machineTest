import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3BService } from "./s3.services";
import { Stats } from "fs";



@Controller('uploadaws')
export class S3Bucket {
  


 constructor(private readonly s3bService:S3BService){


 }
@Post("file")
@UseInterceptors(FileInterceptor('file'))
add(@Body() body:any, @UploadedFile() file:Express.Multer.File){
    console.log(file);
    const filePath=file.path;
    console.log(filePath);

    this.s3bService.upload(file.originalname,file.buffer);
}

@Post('convert')
  async convert(@Body() body: { inputFile: string; outputFile: string },@Res() res) {
   const data=    await this.s3bService.createMediaConvertJob(body.inputFile, body.outputFile);
    res.json ({
        status:"success",
        message: "MediaConvert job successfully created",
        converted:data
     })  
  }


  @Get()
  async getALLVideos(@Res() res) {
      const list=await this.s3bService.listOFVideos();
     res.json({
        status:"success",
        message: "All vedios list succsfully retrived",
        Vedios_list:list
     })  
  }
}