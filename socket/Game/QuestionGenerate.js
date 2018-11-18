let Questions = require('./utils/questions'); 

module.exports.GetQuestion = () =>{
    let num = Math.floor(Math.random()*50); 
    return Questions.results[num];
}