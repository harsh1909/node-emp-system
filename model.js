const { Client } = require('pg');
const connectionString = 'postgres://postgres:kazama007@localhost:5432/test';
const client = new Client({
    connectionString: connectionString
});
client.connect();


const QUERY = {GET:"select * from employee where empid = $1",
POST:"insert into employee(firstName, lastName,age,designation) values($1,$2,$3,$4) RETURNING *",
DELETE:"delete from employee where empid = $1 RETURNING *" ,
PATCH:"update employee set firstName = $2, lastName  = $3,age  = $4,designation = $5 where empid = $1 RETURNING * "
}


var dbinit = async ()=>{
    
    const QUERY = "CREATE TABLE IF NOT EXISTS employee(empid SERIAL PRIMARY KEY, firstname VARCHAR(40) NOT NULL,lastName VARCHAR(40) NOT NULL, Age INTEGER NOT NULL, Designation VARCHAR(40) NOT NULL)"

    await client
        .query(QUERY)
        .then(() => {
                    
                    console.log("Database initiated")})
        .catch(e => {console.error(e.stack);
                    })

    
}

var queryDb = async (type,values)=>{
    const query = QUERY[type]
    console.log(query,type,values)
    var final_res = await client
        .query(query,values)
        .then(res=>res.rows )
        .catch(e => console.error(e.stack))

    return(final_res)
}



var temp = async ()=>{
    var z = await getEmpDetails("get",[2])
    console.log(z)
    client.end()
}

//temp()

module.exports = {
queryDb : queryDb
}



dbinit()