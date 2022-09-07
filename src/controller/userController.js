import XLSX from 'xlsx';
import UserService from '../services/userServices';
import {user} from '../database/models'
const outputPath = 'storage/outputs';
class UserController{
    static async registerUser(req,res,next){
        try {
            const allusers = await UserService(req.body);
            return res.json({
                status:200,
                message:"user created successfully",
                data:allusers
            })
            
        } catch (error) {
            return next(error);
            
        }
    }
    static async excelImport(req,res,next){
        try{
        
            const wb = XLSX.readFile(req.file.path); 
            // console.log(">>>>",wb);
            const sheets = wb.SheetNames;
            if(sheets.length > 0) {
                const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
                // console.log(">>>>>",data);
                const users = data.map(row => ({
                    firstname: row['firstname'],
                    lastname: row['lastname'],
                    email: row['email'],
                    phone: row['phone'],
                    password: row['password'],
                    role: row['role'],
                    status: row['status']
                }))
                const UserInsert = await user.bulkCreate(users); 
                return res.json({
                    status:200,
                    message:"created users",
                    data :UserInsert
                })
              }
        }
        catch(error){
                return next(error);
        } 
    }
    static async excellExport(req,res,next){
        try {
            const Eusers = await UserService.fetchAllUsers();
            // console.log(Eusers);
            // const users =[Eusers.firstname,Eusers.lastname,Eusers.email,Eusers.phone,Eusers.status];
            // console.log(Eusers);
            const headings =[
                ['firstname','lastname','email','phone','role',	'status'
                ]
            ];
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(Eusers, { 
                origin: 'A2', 
                skipHeader: true 
            });
            XLSX.utils.sheet_add_aoa(ws, headings); 
            XLSX.utils.book_append_sheet(wb, ws, 'user');

            const buffer = XLSX.write(wb, { bookType: 'csv', type: 'buffer' }); 
            res.attachment('user.csv');
            return res.send(buffer);
            
            
        } 
        catch (error) {
            return Error(error);
        }
    }
}
export default UserController;