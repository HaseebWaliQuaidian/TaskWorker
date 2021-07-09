

//const validateRequestMw = require('./validations/validateRequest')
//const logger = require('../logger/logger');
const { constructResponse, successResponse } = require('../utils/utility');

module.exports = app => {


    app.get('/api/tasks',
        async (req, res) => constructResponse(res, successResponse(tasks.filter(task => !task.done))));

    app.post('/api/tasks/',
        async (req, res) => {
            const maxId = Math.max.apply(Math, tasks.map(task => task.id))
            tasks.push({id:maxId+1,done:false,...req.body})
            constructResponse(res, successResponse({success:true,status : 200}))
        }
    );
    app.delete('/api/tasks/:id',
        async (req, res) => {
            tasks.forEach(task => {
                    if(task.id == req.params.id){
                        task.done = true;
                    }
                }
            )
            constructResponse(res, successResponse({success:true,status : 200}))
        }
    );

    app.put('/api/tasks/toggle-reminder/:id',
        async (req, res) => {
            tasks.forEach(task => {
                    if(task.id == req.params.id){
                        task.reminder = !task.reminder;
                    }
                }
            )
            constructResponse(res, successResponse({success:true,status : 200}))
        }
    );
  


    const tasks = [
        {
            id:1,
            text:"Task Todo ",
            day:"1st July 2021",
            reminder:true,
            done:false
        },{
            id:2,
            text:"Task Todo 2",
            day:"2nd July 2021",
            reminder:true,
            done:false
        },{
            id:3,
            text:"Task Todo 4",
            day:"3rd July 2021",
            reminder:true,
            done:false
        },{
            id:4,
            text:"Task Todo 6",
            day:"3rd July 2021",
            reminder:true,
            done:false
        },{
            id:5,
            text:"Task Todo 7",
            day:"3rd July 2021",
            reminder:true,
            done:false
        },{
            id:6,
            text:"Task Todo 8",
            day:"3rd July 2021",
            reminder:true,
            done:false
        },{
            id:7,
            text:"Task Todo 9",
            day:"3rd July 2021",
            reminder:true,
            done:false
        },{
            id:8,
            text:"Task Todo 5",
            day:"3rd July 2021",
            reminder:true,
            done:false
        },
    
    ]
 }

