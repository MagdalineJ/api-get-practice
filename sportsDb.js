// function to fetch the data for searching the players by name 

const searchPlayers = ()=>{
    const inputField = document.getElementById('input-field');
    const searchedName = inputField.value ;
    inputField.value= '';
    hidemsg();
   if(searchedName != ''){
    const url =`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchedName}`;
    
         fetch(url)
        .then(res=> res.json())
        .then(data => displayPlayers(data.player))
        .catch(error=>errorMsg(error))
    }else{ inputField.value='Please , write a name!'}
       
}
// function to display the data in group 
const displayPlayers = players =>{
    // console.log(players)
    const dashboard= document.getElementById('dashboard');
    dashboard.textContent='';
    players.forEach(player => {
      
    const div = document.createElement('div');
    //    handling error for null images
    const img= `${player.strThumb}`;
    if(img !== 'null'){
        div.innerHTML=`
        <div class="col">
            <div class="card">
                <div onclick="loadDetails(${player.idPlayer})">
                <img src="${player.strThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${player.strPlayer}</h5>
                <p class="card-text">Team: ${player.strTeam}</p>
                <p class="card-text">Playing Position: ${player.strPosition}</p>
                </div>
            </div>
          </div>
        </div>
        `;
        dashboard.appendChild(div);
       }
    })
}
// to load single player details
const loadDetails = player =>{
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${player}`;
    fetch (url)
    .then(res=> res.json())
    .then(data=> showDetails(data.players[0]))
    .catch(error=>errorMsg(error))
    hidemsg();
} 

const showDetails = player =>{
    const playerDetail = document.getElementById('single-player');
    playerDetail.textContent='';
console.log(player)
    const div= document.createElement('div');
    div.innerHTML=`
    <div class="card mx-auto" style="width: 18rem;">
        <img src="${player.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-title fs-1">${player.strPlayer}</p>
        <p class="card-text">Playing Position:${player.strPosition} </p>
        <p class="card-text">${player.strDescriptionEN.slice(0,200)}...</p>
        </div>
    </div>
    `;
    playerDetail.appendChild(div);
}
// error handling
document.getElementById('error-msg').style.display='none';
const hidemsg= ()=>{
    document.getElementById('error-msg').style.display='none';
}
const errorMsg= error =>{
    document.getElementById('error-msg').style.display='block';
}
