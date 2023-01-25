
     const User = require("../model/userModel")

    const UserCtrl = {
        index: async (req,res) => {
            try {
                const data = await User.find();
              //  console.log(`users =`, data);
                res.render('index.ejs', {users:data});
            }catch(error) {
                console.log(error.message);
            }
        },
        new: async (req,res) => {
            res.render('create.ejs');
        },
        edit: async (req,res) => {
            const userId = req.params.id; // to call the id from router path
           
            const extUser = await User.findById({_id: userId});
           // console.log(`single user=`, extUser);

            res.render('update.ejs', {id: userId, user:extUser});
        },
        create: async(req,res) => {
            try {
                const newUser = User(req.body);
                //console.log(`data =`, newUser);

                // user exist or not
                const extUser = await User.findOne({email: req.body.email});
                const extMobile = await User.findOne({mobile: req.body.mobile});
                if(extUser) {
                    console.log(`user already exists`);
                } else if(extMobile) {
                    //await newUser.save();
                    console.log(`user mobile exists`);
                }
                else {
                    await newUser.save();
                    console.log(`user created successfully`);
                }


                res.redirect("/");
            }catch (error) {
                console.log(error.message);
            }
        },
        update: async(req,res) => {
            try {
                const userId = req.params.id;
               // console.log(`id =`, userId);
                //console.log(`update user =`, req.body);
                const {name, email, mobile, city } = req.body;

                await User.findByIdAndUpdate({_id: userId}, {name,email,mobile,city});
                console.log(`user updated successfuly`);

                res.redirect("/");
            }catch (error) {
                console.log(error.message);
            }
        },
        delete: async(req,res) => {
            try {
                const userId = req.params.id;
                console.log(`delete id =`, userId);
                await User.findOneAndDelete({_id: userId});
                console.log(`user deleted successfully`);

                res.redirect("/");
            }catch (error) {
                console.log(error.message);
            }
        },
        notFound: async(req,res) => {
            try {
                res.render("Pnf.ejs");
            }catch (error) {
                console.log(error.message);
            }
        }
    };

    module.exports = UserCtrl;