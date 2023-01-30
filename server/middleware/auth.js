import jwt from 'jsonwebtoken'

 const auth = async (req,res,next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
       
        const isCustomToken = token.length <500; 
        let decodeData ;
         if(token && isCustomToken) {  
            decodeData = jwt.verify(token,"testSecret") ;
            req.userId = decodeData?.id
         }
         else{
            decodeData = jwt.decode(token) ; //token  from google <cretentials>
            req.userId = decodeData?.sub
         }

         next();
    } catch (error) {
        console.log(error)
    }
}
export default  auth