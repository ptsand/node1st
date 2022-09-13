const barbieMovies = [
    { name: "name1", year: 2001 },
    { name: "name1", year: 2006 },
]

const ratedMovies = barbieMovies.map(movie => {
    movie.rating = 10;
    return movie;
})
console.log(ratedMovies);

const recentMovies = barbieMovies.filter(movie => movie.year > 2005);
console.log(recentMovies);
