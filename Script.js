var searchresult = document.getElementById('searchresult')
var favoriteresult = document.getElementById('favoriteresult')
var detailresult = document.getElementById('detailresult')
var home = document.getElementById('home')

document.getElementById('logobtn').addEventListener('click',function(){
    hideAll()
    home.style.display='flex'
})

document.getElementById('searchBtn').addEventListener('click',function(){
    let x = document.getElementById('value').value
    hideAll()
    searchresult.style.display="flex"
    getsearch(x)
})

function hideAll(){
    searchresult.style.display="none"
    favoriteresult.style.display="none"
    detailresult.style.display="none"
    home.style.display="none"
}

function getsearch(x){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${x}`).then((response) =>{
        return response.json()
    }).then( data => {
        loopsearch(data.results)
    })
}

function loopsearch(movielist){
    searchresult.innerHTML=''
    for(moviedata of movielist){
        showsearch(moviedata)
    }
}

function showsearch(movie){
    var resulttt = document.getElementById('searchresult')
    let cell = document.createElement('div')
    cell.classList.add("col-sm-3") 
    cell.style.margin="12px"
    cell.addEventListener('dblclick',function(){
        let confirmAdd = confirm(`Do you want to add "${movie.title}" to favorite?`)
        if(confirmAdd){
            addtofavorite(movie)
        }
    })
    let cardint = document.createElement('div')
    cardint.classList.add("card","text-dark","bg-light")
    let cardbody = document.createElement('div')
    cardbody.classList.add("card-body")
    let image = document.createElement('img')
    image.src = movie.image_url
    image.classList.add("rounded","mx-auto","d-block")
    image.style.border="3px solid white"
    let breakk = document.createElement('br')
    let title = document.createElement('h5')
    title.classList.add("card-title")
    title.innerHTML = movie.title
    let synopsis = document.createElement('p')
    synopsis.classList.add("card-text")
    synopsis.innerHTML = "Synopsis : " + movie.synopsis
    let type = document.createElement('p')
    type.classList.add("card-text")
    type.innerHTML = "Type : " + movie.type
    let episodes = document.createElement('p')
    episodes.classList.add("card-text")
    episodes.innerHTML = "Episodes : " + movie.episodes
    let rated = document.createElement('p')
    rated.classList.add("card-text")
    rated.innerHTML = "Rated : " + movie.rated
    cardbody.appendChild(image)
    cardbody.appendChild(breakk)
    cardbody.appendChild(title)
    cardbody.appendChild(synopsis)
    cardbody.appendChild(type)
    cardbody.appendChild(episodes)
    cardbody.appendChild(rated)
    cardint.appendChild(cardbody)
    cell.appendChild(cardint)
    resulttt.appendChild(cell)
    console.log(movie)
}

function addtofavorite(movie){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies `,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"id":"632110363",
                    "movie":{
                        "url":"${movie.url}",
                        "image_url":"${movie.image_url}",
                        "title":"${movie.title}",
                        "synopsis":"${movie.synopsis}",
                        "type":"${movie.type}",
                        "episodes":"${movie.episodes}",
                        "score":"${movie.score}",
                        "rated":"${movie.rated}",
                        "id":"1"
                        }
                    }`
        }).then(response=>{
            if(response.status == 200){
                return response.json()
            }else{
                throw Error(response.statusText)
            }
        }).then(data=>{
            alert('Success')
        }).catch(error=>{
            alert('Error')
        })
}

document.getElementById('listBtn').addEventListener('click',function(){
    hideAll()
    favoriteresult.style.display="flex"
    getfavorite()
})

function getfavorite(){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110363`).then((response)=>{
        return response.json()
    }).then( data=>{
        loopfavorite(data)
    })
}

function loopfavorite(favoritelist){
    favoriteresult.innerHTML=''
    for(favoritedata of favoritelist){
        showfavorite(favoritedata)
    }
}

function showfavorite(movie){
    
    let cell = document.createElement('div')
    cell.classList.add("col-sm-3")
    cell.style.margin="12px"
    let cardint = document.createElement('div')
    cardint.classList.add("card","text-dark","bg-light")
    let cardbody = document.createElement('div')
    cardbody.classList.add("card-body")
    let image = document.createElement('img')
    image.src = movie.image_url
    image.classList.add("rounded","mx-auto","d-block")
    image.style.border="3px solid white"
    let brea = document.createElement('br')
    let title2 = document.createElement('div')
    title2.classList.add("d-flex","justify-content-center","mx-auto")
    let title = document.createElement('h5')
    title.classList.add("card-title")
    title.innerHTML = movie.title
    title2.appendChild(title)
    let buttons = document.createElement('div')
    buttons.classList.add("d-flex","justify-content-center","mx-auto")
    let detailbutton = document.createElement('button')
    detailbutton.classList.add("btn","btn-primary")
    detailbutton.style.margin="10px";
    detailbutton.innerHTML = "Details"
    detailbutton.addEventListener('click',function(){
        getdetail(movie.id)
    })
    buttons.appendChild(detailbutton)
    let delbutton = document.createElement('button')
    delbutton.classList.add("btn","btn-danger")
    delbutton.style.margin="10px";
    delbutton.innerHTML = "Delete"
    delbutton.addEventListener('click',function(){
        let confirmDel = confirm(`Are you sure you want to delete ${movie.title}?`)
        if(confirmDel){
            deleteid(movie.id)
        }   
    })
    buttons.appendChild(delbutton)
    cardbody.appendChild(image)
    cardbody.appendChild(brea)
    cardbody.appendChild(title2)
    cardbody.appendChild(buttons)
    cardint.appendChild(cardbody)
    cell.appendChild(cardint)
    favoriteresult.appendChild(cell)
}

function deleteid(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110363&&movieId=${id}`,{
        method: 'DELETE'
    }).then(response =>{
        if(response.status == 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert(`Movie ${data.title} is deleted`)
        
        getfavorite()
    }).catch(error =>{
        alert('Error')
    })
}

function getdetail(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110363/${id}`)
    .then((response) => {
        return response.json()
    }).then(data => {
        detailresult.innerHTML = '' 
        hideAll()
        detailresult.style.display="flex"
        showdetail(data);
    })
}

function showdetail(movie){
    
    let cell = document.createElement('div')
    cell.classList.add("col-sm-6","mx-auto")
    cell.style.margin="12px"
    let cardint = document.createElement('div')
    cardint.classList.add("card","text-dark","bg-white")
    let cardbody = document.createElement('div')
    cardbody.classList.add("card-body")
    let image = document.createElement('img')
    image.src = movie.image_url
    image.classList.add("rounded","mx-auto","d-block")
    image.style.border="3px solid white"
    let brea = document.createElement('br')
    let title = document.createElement('h5')
    title.classList.add("card-title")
    title.innerHTML = movie.title
    let synopsis = document.createElement('p')
    synopsis.classList.add("card-text")
    synopsis.innerHTML = "Synopsis : " + movie.synopsis
    let type = document.createElement('p')
    type.classList.add("card-text")
    type.innerHTML = "Type : " + movie.type
    let episode = document.createElement('p')
    episode.classList.add("card-text")
    episode.innerHTML = "Episodes : " + movie.episodes
    let rated = document.createElement('p')
    rated.classList.add("card-text")
    rated.innerHTML = "Rated : " + movie.rated
    let button = document.createElement('button')
    button.classList.add("btn","btn-primary")
    button.style.margin="10px"
    button.innerHTML="Back"
    button.addEventListener('click',function(){
        hideAll()
        favoriteresult.style.display="flex"
    })
    cardbody.appendChild(image)
    cardbody.appendChild(brea)
    cardbody.appendChild(title)
    cardbody.appendChild(synopsis)
    cardbody.appendChild(type)
    cardbody.appendChild(episode)
    cardbody.appendChild(rated)
    cardint.appendChild(cardbody)
    cardint.appendChild(button)
    cell.appendChild(cardint)
    detailresult.appendChild(cell)
}

function onLoad(){
    
}