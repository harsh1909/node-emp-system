var express = require('express')
var models = require('./model')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());

var PORT = 3001


//Homepage
app.get('/', (request,response)=>{
    console.log("Here in HomePage")
    response.send({a:"Welcome to Employee database"})
})



//Read Employee Details
app.get('/:empID', async (request,response)=>{
    console.log("Getting Details for Employee : ")
    let pathParam = request.params
    let empID = pathParam.empID
    const values = [empID]
    var res = await models.queryDb(request.method,values)
    console.log(res)
    response.send("Details are as Follow : "+ JSON.stringify(res))
})



//Create a new Employee
app.post('/add-new-emp', async(request,response)=>{
    console.log("Creating details for new employee")
    
    let body = request.body
    console.log("body",body)
    const values = [body.firstname,body.lastname,body.age,body.designation]
    var res = await models.queryDb(request.method,values)
    console.log(res)
    response.send("Details Added"+ JSON.stringify(res))
})



//update employee details
app.patch('/:empID', async(request,response)=>{
    console.log("updating Details for Employee : ")
    let pathParam = request.params
    let empID = pathParam.empID
    let body = request.body
    console.log("body",body)
    const values = [empID,body.firstname,body.lastname,body.age,body.designation]
    var res = await models.queryDb(request.method,values)
    console.log(res)
    response.send("Employee details updated : "+ JSON.stringify(res))
})



app.delete('/:empID', async (request,response)=>{
    console.log("deleting Details for Employee : ")
    let pathParam = request.params
    let empID = pathParam.empID
    const values = [empID]
    var res = await models.queryDb(request.method,values)
    console.log(res)
    response.send("Employee details deleted successfully : "+ JSON.stringify(res))
})


app.get('*', (request,response)=>{
    console.log("Here lies nothing")
    response.send("SORRY PAGE NOT FOUND !!!!")
})



app.listen(PORT,()=>{
    console.log("App server started at  PORT : ",PORT, "!!!!")
})

