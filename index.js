
var express = require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();


var list={'list':null,'text':null,'json':null,'last_item':565829}


last_item=565829
first_item=last_item-9
// data_range=[first_item,last_item]
var db_name='/Users/chxwang/test/test/rrys/my_update_list-10000.db'
app.get('/', function (req, res) {
    res.set('Content-Type', 'text/plain');

    res.send(list.text);
})
app.get('/json', function (req, res) {
    res.set('Content-Type', 'text/json');

    res.send(list.json);
 })
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
setInterval(update_data,1000*60)

function update_data(){
    first_item=last_item-9

    let db = new sqlite3.Database(db_name, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the chinook database.');
      });
      sql=`SELECT * FROM total_list where id between ${first_item} and ${last_item} `
    //   sql='select * from total_list'
    //   console.log(sql)
    
    //   db.serialize(() => {
        //   console.log('1111\n')

        // db.each(sql, (err, row) => {
        //     // console.log('22222\n')
        //   if (err) {
        //     console.error(err.message);
        //   }
        // //   console.log("\t" + row.name + "\t" )
        // 

        // });
    //   });
        db.all(sql,[],(err,rows)=>{

            // console.log(rows)
            let t = new Date()
          if (err) {
            console.error(err.message);
          } 
        let create_time=t.toLocaleString()
        // console.log(row)
        // console.log(list)
        list['list']=rows
        list['json']= JSON.stringify(rows)
        s=''
        for(let row of rows){
            list['list']['create_time']= create_time
            s=s+row.yetts_url+'\n'
        }
        list['text']=s
        console.log(s)
        console.log('last_item:'+last_item)
    
        });
        last_item -= 10
       
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });

}