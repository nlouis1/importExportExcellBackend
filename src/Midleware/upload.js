import upload from '../Utils/fileupload'
import { onError } from "../utils/response";
 const uploading = upload.single("user",(req,res,next)=>{
        try{
            res.send(req.file);
            console.log(req.file);
        }
        catch{
            res.send("no file found");
        }
        return next;
    });
// }
 

module.exports= uploading;