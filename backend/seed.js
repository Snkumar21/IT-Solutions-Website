require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const Opportunity = require('./models/Opportunity');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/itcompany';
mongoose.connect(MONGO).then(async ()=>{
  await Service.deleteMany({});
  await Opportunity.deleteMany({});

  await Service.insertMany([
    {title:'Web Development', short:'Full-stack web apps', description:'React/Node.js, REST APIs, deployment.'},
    {title:'Mobile Apps', short:'Android & iOS', description:'Flutter & native Android apps.'},
    {title:'Cloud & DevOps', short:'AWS, CI/CD', description:'Cloud infra and pipeline automation.'}
  ]);

  await Opportunity.insertMany([
    {role:'Frontend Intern', type:'Internship', duration:'3 months', description:'Work on React projects with mentors.'},
    {role:'Fullstack Trainee', type:'Training', duration:'2 months', description:'Intensive project-based training.'}
  ]);

  console.log('Seed done'); process.exit();
}).catch(e=>{console.error(e); process.exit(1)})