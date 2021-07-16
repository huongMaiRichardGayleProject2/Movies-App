/*
    * - We need the url/key/fetch call
    * - create app function, and fetch :white_check_mark:
    * - listen for a button click
    * - DECLARE AN APP OBJ :white_check_mark:
    * - we need a form or some type of user input?
    * - We need to capture user input from our form
    * - RANDOM MOVIE BUTTON
    * - depending on the user input 
    * - then random go through that object and put on html
*/


// Hey David! when we were testing responsive design mode we were having an issue with the web page scaling to the size of the device everything seemed to shrink extremely small.  We looked into it with Paul and there didn’t seem to be anything wrong with the code itself so we are a bit stumped on what happened.


// First creating our namespace for the application
const movieApp= {}
// holding our content in memory
movieApp.baseUrl = "https://api.themoviedb.org/3"
movieApp.apiKey = "695ac71fce5922ab995f1f6b063ba94f"

// hold all of our generes in memory
movieApp.genres = [];

//fetch function
movieApp.fetchMovieGenre = () => {
    const url = new URL(`${movieApp.baseUrl}/genre/movie/list`);
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey
    })
    fetch(url)
        .then((res) => {
            console.log(res)
            return res.json();
        })
        .then((data) => {
            movieApp.genres = data.genres;
            movieApp.displayGenres(movieApp.genres);
        })
}

// Displaying the new genres to the dropdown menu and append it to HTML form

movieApp.displayGenres = (listOfGenres) => {
    // getting the select element from the screen
    const selectEl = document.getElementById("genres");

    // loop through the list of gernes and append to the select element
    listOfGenres.forEach((genre) => {
        // create a variable for option 
        const newOptionEl = document.createElement("option");
        // provide the option with values
        newOptionEl.textContent = genre.name;
        newOptionEl.setAttribute("value", genre.id);
        // append the values to the select element
        selectEl.append(newOptionEl);
    })
}

// add an event listener to the form
// so that we can get the users information

movieApp.getUserInformation = () => {
    const formEl = document.querySelector("form")
    formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        const userSelection = event.target[0].value;
        movieApp.fetchMovie(userSelection)
        
    })
}

// create function to grab all movies within a genre

movieApp.fetchMovie = (genre) => {
    const url = new URL(`${movieApp.baseUrl}/discover/movie`)
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        with_genres: genre
    })
    fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        movieApp.userSelectedMovies = data.results;
        movieApp.topMovies(movieApp.userSelectedMovies);
        movieApp.displayMovie(movieApp.userSelectedMovies);
    })
}

// TOP RATED 
// create a section of three movies that will appear above the movie list that are the top rated of that genre

movieApp.topMovies = (movieArr) => {
        // array to hold cloned movie list
        topAvg = [];
        
        // cloning movie list to new array
        movieArr.filter((mov) => {
            topAvg.push(mov)
        })
        
        // Sorting new array by highest to lowest voter average
        topAvg.sort(function(a, b) {
            // console.log(mov.vote_average)
            return b.vote_average-a.vote_average
        })

        // ===========================
        const mainSection = document.getElementById('main-section')
        const div = document.createElement('div')
        div.classList.add('top-rated')
        const hThree = document.createElement('h3')
        hThree.textContent = 'top rated'
        const ul = document.createElement('ul')
        ul.setAttribute('id', 'top')
        ul.classList.add('top-rated-ul')

        div.appendChild(hThree)
        div.appendChild(ul)
        mainSection.innerHTML = ""
        mainSection.prepend(div)

        const topRated = document.getElementById("top")

        // Loop that grabs the first three movies of sorted array and displays them
        for(let i = 0; i < topAvg.length; i++) {

            const liEl = document.createElement("li")
            const imgEl = document.createElement("img")

            const topMovieImage = `https://www.themoviedb.org/t/p/w220_and_h330_face/${topAvg[i].poster_path}`
            imgEl.setAttribute("src", topMovieImage)
            imgEl.setAttribute("alt", `This is a poster for the movie: ${topAvg[i].title}`)

            const topMovieInfo = document.createElement("div")
            const topMovieTitle = document.createElement("h4")
            topMovieTitle.textContent = topAvg[i].title

            const topMovieVote = document.createElement("p");
            topMovieVote.textContent = `Average Users Rate: ${topAvg[i].vote_average}`;

            liEl.appendChild(imgEl);
            topMovieInfo.appendChild(topMovieTitle);
            topMovieInfo.appendChild(topMovieVote);
            liEl.appendChild(topMovieInfo);

            topRated.append(liEl);
            // topRated.append(topMovieInfo);

            if (i === 2) {
                break;
            }
        }
        
}


    
// DISPLAY MOVIES
// Using the same logic of Top Rated Section
// After sorting movies basing on voter average, sort from high to low for all the movies in the user input genre
// Loop the the new sorted array and only print out array number 3 to the end of the length of the array
// Display it to the HTML
movieApp.displayMovie = (movieArr) => {

    // array to hold cloned movie list
    topAvg = [];
    
    // cloning movie list to new array
    movieArr.filter((mov) => {
        topAvg.push(mov)
    })
    
    // Sorting new array by highest to lowest voter average
    topAvg.sort(function(a, b) {
        return b.vote_average-a.vote_average
    })

    // appending movie genre array onto page
    // ===========================
    const mainSection = document.getElementById('main-section')
    const div = document.createElement('div')
    div.classList.add('other-movies')
    const hThree = document.createElement('h3')
    hThree.textContent = 'movies'
    const ul = document.createElement('ul')
    ul.setAttribute('id', 'movies')
    
    div.appendChild(hThree)
    div.appendChild(ul)
    mainSection.appendChild(div)
    // ===============================
    
    
    
    const moviesList = document.getElementById("movies");
    moviesList.innerHTML = "";
    for(let i = 3; i < topAvg.length; i++) {
        const liEl = document.createElement("li")
        
        const imgEl = document.createElement("img")
        const topMovieImage = `https://www.themoviedb.org/t/p/w220_and_h330_face/${topAvg[i].poster_path}`
        imgEl.setAttribute("src", topMovieImage)
        imgEl.setAttribute("alt", `This is a poster for the movie: ${topAvg[i].title}`)

        const topMovieInfo = document.createElement("div")
        const topMovieTitle = document.createElement("h4")
        topMovieTitle.textContent = topAvg[i].title

        const topMovieVote = document.createElement("p");
        topMovieVote.textContent = `Average Users Rate: ${topAvg[i].vote_average}`;

        liEl.appendChild(imgEl);
        topMovieInfo.appendChild(topMovieTitle);
        topMovieInfo.appendChild(topMovieVote);
        liEl.appendChild(topMovieInfo);

        moviesList.append(liEl)

        if (i === topAvg.length) {
            break;
        }
    }

}


// init 
movieApp.general = () => {
    movieApp.fetchMovieGenre();
    movieApp.getUserInformation();
};


// Init function
movieApp.general();