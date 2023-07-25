
let add = (a,b)=>{
    return Number(a)+Number(b);
}
module.exports = add;


// userRoute.post('/register', (req, res) => {
//     const userData =  req.body;

//     bcrypt.hash(userData.password, 10)
//     .then(encryptedPassword => {
//         const user = new User({
//             email: userData.email,
//             name: userData.name,
//             password: encryptedPassword
//         });
    
//         user.save().then(result => {
//             res.status(201).json({
//                 message: "User registered successfully!",
//                 data: result
//             });
    
//         }).catch(err => {
//             res.status(500).json({
//                 errorDesc: "Something went wrong!",
//                 err: err
//             });
//         });

//     }).catch(err => {
//         res.status(500).json({
//             errorDesc: "Internal server error"
//         });
//     })
 
// });