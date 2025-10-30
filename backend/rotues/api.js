const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Opportunity = require('../models/Opportunity');
const Message = require('../models/Message');

// Services - list & add (add can be used by admin)
router.get('/services', async (req,res)=>{
  const list = await Service.find().sort('-createdAt').lean();
  res.json(list);
});
router.post('/services', async (req,res)=>{
  const s = new Service(req.body);
  await s.save();
  res.status(201).json(s);
});

// Opportunities
router.get('/opportunities', async (req,res)=>{
  const list = await Opportunity.find().sort('-createdAt').lean();
  res.json(list);
});
router.post('/opportunities', async (req,res)=>{
  const o = new Opportunity(req.body);
  await o.save();
  res.status(201).json(o);
});

// Apply to an opportunity
router.post('/opportunities/:id/apply', async (req,res)=>{
  const id = req.params.id;
  const {name,email,resume} = req.body;
  const opp = await Opportunity.findById(id);
  if(!opp) return res.status(404).json({error:'Not found'});
  opp.applicants.push({name,email,resume, appliedAt: new Date()});
  await opp.save();
  res.json({ok:true});
});

// Messages (contact)
router.post('/messages', async (req,res)=>{
  const m = new Message(req.body);
  await m.save();
  res.status(201).json(m);
});
router.get('/messages', async (req,res)=>{
  const all = await Message.find().sort('-createdAt').lean();
  res.json(all);
});

module.exports = router;