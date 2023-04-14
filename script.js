let weather = {

    Api: "5a951312ad75efb6ba728c9b41cc42ee",

    fetchWeather: function(city){

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.Api}`)
            .then((response) => {

                if (!response.ok) {
                    throw Error("City has not been found");
                } else {

                    document.querySelector('.description').style.display = `block`;
                    document.querySelector('.box').style.display = `flex`;
                    document.querySelector('.humidity').style.display = `block`;
                    document.querySelector('.wind').style.display = `block`;
                    return response.json();
                }
            })
            .then((data) => this.displayWeather(data))
            .catch ((err) => {
                console.log(err.message);
                document.querySelector('.city').innerText = err.message;
                document.querySelector('.description').style.display = `none`;
                document.querySelector('.box').style.display = `none`;
                document.querySelector('.humidity').style.display = `none`;
                document.querySelector('.wind').style.display = `none`;
            }
 
            )   
        },

    displayWeather: function(data){

        const { name } = data;
        const { humidity, temp } = data.main;
        const {icon, description } = data.weather[0];
        const { speed } = data.wind;

        document.querySelector('.city').innerText= `Weather in ${name}`;
        document.querySelector('.temp').innerText= `${temp} °C`;
        document.querySelector('.description').innerText= `Condition: ${description}`;
        document.querySelector('.humidity').innerText= `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText= `Wind Speed: ${speed} km/h`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('body').style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`;
    },

}


function search(){
    weather.fetchWeather(document.querySelector('.search-bar').value);
    document.querySelector('.weather').classList.remove('loading');
}

document.querySelector('.btn').addEventListener('click', function(){
    search();
});


document.querySelector('.search-bar').addEventListener('keyup', function(event){
    if (event.key == "Enter"){
        search();
    }
});
