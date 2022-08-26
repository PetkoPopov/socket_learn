 var id_for_send;
const table = document.getElementById('table')
var table_obj =[]
var size = 5
let tr = document.createElement('tr') 
for(i=0 ; i<size*size;i++){
    let td = document.createElement('td')
    let div = document.createElement('div')
    div.setAttribute('id',String(i))
    td.appendChild(div)
    let move_obj = {
        move:'move',
        my_move:String(i)
    }
    cur_move=i
    table_obj.push(move_obj)

    td.addEventListener('click',()=>{
             td.style.backgroundColor='yellow'
             to_send_move =true
             id_for_send = td.id
            })

    tr.appendChild(td)
    if(i%size == size-1){
        table.appendChild(tr)
        tr = document.createElement('tr')
    }
}
function send_move(){
    move_obj = table_obj.find(e=>{
        return e.my_move == id_for_send
    })    
    let move_str = JSON.stringify(move_obj)
    to_send_move=false
    ws.send(move_str) 
}