function addSearchTable(movie){
    const row = document.getElementById('search')
    let cell = document.createElement('div')
    cell.classList.add("col-sm-6","mx-auto" ,"flex") 
    cell.style.margin="12px"
    cell.addEventListener('dblclick',function(){
        let confirmAdd = confirm(`Do you want to add "${movie.title}" to favorite?`)
        if(confirmAdd){
            addToDataBase(movie)
        }
    })
   document.getElementById('searchbtn').addEventListener('click',function(){
    let query = document.getElementById('searchvalue').value
    document.getElementById('search').style.display="block"
    document.getElementById('fav').style.display="none"
    document.getElementById('home').style.display="none"
    getSearchQuery(query)
})

function getSearchQuery(query){
    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`).then((response) =>{
        return response.json()
    }).then( data => {
        searchResultList(data.results)
    })
    console.log('2')
}

function searchResultList(list){
    const row = document.getElementById('search')
    row.innerHTML=''
    for(data of list){
        addSearchTable(data)
    }
}

function onLoad(){
    document.getElementById('search').style.display="block"
}

function addToDataBase(movie){
    var id=1
    let data=`{"url":"${movie.url}","image_url":"${movie.image_url}","title":"${movie.title}","synopsis":"${movie.synopsis}","type":"${movie.type}","episodes":"${movie.episodes}","score":"${movie.score}","rated":"${movie.rated}","id":"${id}"}`
    fetch(`https://se104-project-backend.du.r.appspot.com/movies `,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"id":"632110363","movie":${data}}`
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

function getfavorite(){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110363`).then((response)=>{
        return response.json()
    }).then( data=>{
        myfav(data)
    })
}

function myfav(list){
    const row = document.getElementById('fav')
    row.innerHTML=''
    for(data of list){
        addfavtotable(data)
    }
}

function addfavtotable(movie){
    const roww = document.getElementById('fav')
    let cell = document.createElement('div')
    cell.classList.add("col-sm-3","mx-auto")
    cell.style.margin="12px"
    let cardint = document.createElement('div')
    cardint.classList.add("card","text-white","bg-dark")
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
        showdetail(movie.id)
    })
    buttons.appendChild(detailbutton)
    let delbutton = document.createElement('button')
    delbutton.classList.add("btn","btn-danger")
    delbutton.style.margin="10px";
    delbutton.innerHTML = "Delete"
    delbutton.addEventListener('click',function(){
        let confirmDel = confirm(`Are you sure you want to delete ${movie.title}?`)
        if(confirmDel){
            delid(movie.id)
        }   
    })
    buttons.appendChild(delbutton)
    cardbody.appendChild(image)
    cardbody.appendChild(brea)
    cardbody.appendChild(title2)
    cardbody.appendChild(buttons)
    cardint.appendChild(cardbody)
    cell.appendChild(cardint)
    roww.appendChild(cell)
}

document.getElementById('favoritebutton').addEventListener('click',function(){
    document.getElementById('search').style.display="none"
    document.getElementById('fav').style.display="block"
    document.getElementById('home').style.display="none"
    getfavorite()
})

function showdetail(id){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110348/${id}`)
    .then((response) => {
        return response.json()
    }).then(data => {
        const detail = document.getElementById('det')
        detail.innerHTML = '' 
        document.getElementById('det').style.display="block"
        document.getElementById('fav').style.display="none"
        document.getElementById('search').style.display="none"
        document.getElementById('home').style.display="none"
        showdet(data);
    })
}

function delid(id){
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

function showdet(movie){
    const rowww = document.getElementById('det')
    let button = document.createElement('button')
    button.classList.add("btn","btn-success")
    button.style.margin="10px"
    button.innerHTML="Back"
    button.addEventListener('click',function(){
        document.getElementById('det').style.display="none"
        document.getElementById('fav').style.display="block"
        document.getElementById('search').style.display="none"
    })
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
    cardbody.appendChild(image)
    cardbody.appendChild(brea)
    cardbody.appendChild(title)
    cardbody.appendChild(synopsis)
    cardbody.appendChild(type)
    cardbody.appendChild(episode)
    cardbody.appendChild(rated)
    cardint.appendChild(button)
    cardint.appendChild(cardbody)
    cell.appendChild(cardint)
    rowww.appendChild(cell)
}


