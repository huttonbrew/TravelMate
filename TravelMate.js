
//News API call
document.getElementById("weather").addEventListener('click', gettravelMate)

let title1 = document.getElementsByClassName("card-title")
let body1 = document.getElementsByClassName("card-text")
let url1 = document.getElementsByClassName("link")
let newsImg = document.getElementsByClassName("card-img-top")
let title2 = document.getElementsByClassName("card-title1")
let body2 = document.getElementsByClassName("card-text1")
let url2 = document.getElementsByClassName("link1")
let city = document.getElementById('city').value

async function gettravelMate(e) {
    e.preventDefault()
    document.getElementById('loader').innerHTML = `<div class="d-flex justify-content-center"><div class="lds-circle"><div></div></div></div>`
    let city = document.getElementById('city').value
    await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=${city}&pageNumber=1&pageSize=3&autoCorrect=true&rapidapi-key=551df10a11msh3d849010fa27694p17866ejsn58cde5018ef3`)
        .then((response) =>{
            return response.json()
        })
        .then(data => {
            for (let index = 0; index < data.value.length; index++) {
                title1[index].innerHTML= data.value[index].title
                body1[index].innerHTML= data.value[index].snippet
                url1[index].setAttribute("href", data.value[index].url)
                newsImg[index].setAttribute("src", data.value[index].image.url)
            }
        })

    await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?pageNumber=1&autoCorrect=true&q=${city}&rapidapi-key=551df10a11msh3d849010fa27694p17866ejsn58cde5018ef3&pageSize=2`)
        .then((response) => {
            return response.json()
        })
        .then(data =>{
            console.log(data)
            for (let index = 0; index < data.value.length; index++) {
                title2[index].innerHTML= data.value[index].title
                body2[index].innerHTML= data.value[index].description
                url2[index].setAttribute("href", data.value[index].url)
            }
        })
    await fetch (`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&days=3&rapidapi-key=7d859b5d30mshfcc01545a8ec42ep1dfdebjsn453b001a9e5a`)
    .then((response) => {
        return response.json()
    })
    .then(something => { let cityInfo = {
        city: something.location.name,
        region: something.location.region,
        country: something.location.country,
        lat:  something.location.lat,
        lon: something.location.lon,
        temperatureF: something.current.temp_f,
        temperatureC: something.current.temp_c,
        condition: something.current.condition.text,
        image: something.current.condition.icon,
        uv: something.current.uv,
        }
        document.getElementById('loader').innerHTML = '';
        document.getElementById("outputCity").innerHTML = cityInfo.city
        document.getElementById("outputTemp").innerHTML = cityInfo.temperatureF
        document.getElementById("outputCon").innerHTML = cityInfo.condition
        document.getElementById("outputImg").src = cityInfo.image
        document.getElementById("outputUV").innerHTML = cityInfo.uv
        marker.setLatLng([cityInfo.lat, cityInfo.lon])
        map.panTo(new L.LatLng(cityInfo.lat, cityInfo.lon));
    })
}

//---------------------------------------------------------------

//leaflet map js
const map = L.map('map').setView([33.74,-84.38], 6);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const accessToken = 'pk.eyJ1Ijoic2FtbW9vbjkwIiwiYSI6ImNsMHkxbGZlYjExYTAzZXA1eHI1a3J6aGkifQ.KWKiZeMBZfOlRADNKOku1w'
const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(map)
const marker = L.marker([33.74,-84.38],).addTo(map);

//https://keen-lollipop-dd187d.netlify.app/