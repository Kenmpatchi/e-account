const express=require('express');
const router=express.Router();
require('../config/connect');
const bcrypt=require('bcrypt');
const User=require('../models/user');

router.post('/register',async(req,res)=>{
    data= req.body;
    usr=new User(data);
    salt=bcrypt.genSaltSync(10);
    cryptpass=await bcrypt.hashSync(data.pass,salt);
    usr.pass=cryptpass;
    user=await User.findOne({email:data.email});
    if(!user){
        usr.save() 
        res.status(200).send({message:'register completed'})  
    }
    res.status(400).send({message:'email already taken'})
});
router.post('/login',async(req,res)=>{
    data=req.body;
    user=await User.findOne({email:data.email})
    if(!user){
        res.status(400).send({message:'email or pass invalid !'})
    }
    valdpass=bcrypt.compareSync(data.pass,user.pass)
    if(!valdpass){
        res.status(400).send({message:'email or pass invalid!'})
    }
    res.status(200).send({message:'login completed'})      
})
router.get('/getall',async(req,res)=>{
  User.find()
  .then(
    (users)=>{
      res.status(201).send(users)
    }
  )
  .catch(
    (err)=>{
      res.status(500).send(err)
    }
  )
})
router.get('/get/:id',async(req,res)=>{
  id=req.params.id
  User.findById({_id:id})
  .then(
    (user)=>{
      res.status(201).send(user)
    }
  )
  .catch(
    (err)=>{
      res.status(500).send(err)
    }
  )
})
router.delete('/delete/:id',async(req,res)=>{
  id=req.params.id
  User.findByIdAndDelete({_id:id})
  .then(
    res.status(201).send({message:'user has deleted'})
  )
  .catch(
    err=>{
      res.status(500).send(err)
    }
  )
})
router.put('/update/:id',(req,res)=>{
  id=req.params.id
  newdata=req.body;
  User.findOneAndUpdate({ _id: id }, newdata, { new: true })
  .then(
    (updated)=>{
      res.status(201).send(updated)
    }
  )
  .catch(
    (err)=>{
      res.status(500).send(err)
    }
  )
})
module.exports=router