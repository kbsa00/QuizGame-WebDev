const Queue = []; 

const AddingUserToTheQueue = (id) =>{
    
    if(!id.includes.Queue){
        return false;
    }
    Queue.push(id);
    console.log(Queue);
    return true;
}

module.exports = {
    AddingUserToTheQueue
}