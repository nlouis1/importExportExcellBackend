import {user} from '../database/models';
class UserClass{
    static async PostUser(data){
        try {
            const newuser = await user.Create(data);
            return newuser;
            
        } catch (error) {
            return Error(error);
            
        }
    }
    static async fetchAllUsers(){
        try {
            return await user.findAll({
                attributes:[
                    'firstname',
                    'lastname',
                    'email',
                    'phone',
                    'role',
                    'status'
                ],
                raw: true
            });
            
        } 
        catch (error) {
            return Error(error);
        }
    }
}
export default UserClass;