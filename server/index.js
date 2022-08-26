const WebSocket = require("ws")
const wss = new WebSocket.Server({port:8082})
const msg_test= "TEST"
var clients=''
var chat=''

wss.on("connection",ws=>{
    
        console.log('client connect')
        ws.send(clients)
        ws.send(chat) 
        ws.on("message",(e)=>{
       
        let client_obj = JSON.parse(e)
        console.log(client_obj)
        // clients+='client ' + e + ' conected <br/> '
        let keys = Object.keys(client_obj)
        console.log(keys)
        if(keys[0]=='user'){
            chat += "user "+client_obj[keys[0]]+" send message  "+client_obj[keys[1]]+"<br/>";
            [...wss.clients].forEach(element => {
                
                element.send("user "+client_obj[keys[0]]+" send message  "+client_obj[keys[1]])
               });
            // ws.send("user "+client_obj[keys[0]]+" send message  "+client_obj[keys[1]])
        }
        else if(keys[0]=='name'){
            
            clients+=client_obj[keys[0]]
            clients+='<br/>'
            ws.send("client  "+client_obj[keys[0]]+" just connected")  

        }else if(keys[0] == 'move'){

        [...wss.clients].forEach(e=>{
            ws.send(client_obj[keys[0]]+' send move '+ client_obj[keys[1]])
        })
        }
        
        
    })

    ws.on("close",()=>{
    console.log("client disconected")
    })

})
