//create an Event handler
document.getElementById('weather').addEventListener('click', getCity)
//Get Weather function
function getCity() {
    // let city = document.getElementById('city').value
    // let units = document.querySelector('select').value
    fetch (`https://weatherapi-com.p.rapidapi.com/current.json?q=houston&days=3&rapidapi-key=7d859b5d30mshfcc01545a8ec42ep1dfdebjsn453b001a9e5a`)
    .then((response) => {
        return response.json()
        //console.log(response)
    })
 //We return this value so that the next .the() is able to access the value
    .then(something => { console.log({
        city: something.location.name,
        region: something.location.region,
        country: something.location.country,
        temperatureF: something.current.temp_f,
        temperatureC: something.current.temp_c,
        condition: something.current.condition.text,
        image: something.current.condition.icon,
        uv: something.current.uv,
        })
    })
}