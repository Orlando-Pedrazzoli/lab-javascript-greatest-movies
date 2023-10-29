// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
  const directors = moviesArray.map(movie => movie.director);
  const uniqueDirectors = new Set(directors);
  return [...uniqueDirectors];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(moviesArray) {
  if (!moviesArray || moviesArray.length === 0) {
    return 0;
  }
  const spielbergDramas = moviesArray.filter(movie => {
    return (
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
    );
  });

  return spielbergDramas.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }

  const validMovies = moviesArray.filter(
    movie => typeof movie.score === 'number'
  );
  const scoreSum = validMovies.reduce((total, movie) => total + movie.score, 0);

  const averageScore = scoreSum / validMovies.length;
  return Math.round(averageScore * 100) / 100;
}

console.log(scoresAverage(movies));
console.log(scoresAverage([]));

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(
    movie => movie.genre.includes('Drama') && typeof movie.score === 'number'
  );

  if (dramaMovies.length === 0) {
    return 0;
  }

  const totalScore = dramaMovies.reduce((sum, movie) => sum + movie.score, 0);
  const averageScore = totalScore / dramaMovies.length;

  return Math.round(averageScore * 100) / 100;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const sortedMovies = [...moviesArray];

  sortedMovies.sort((movieA, movieB) => {
    if (movieA.year !== movieB.year) {
      return movieA.year - movieB.year;
    } else {
      return movieA.title.localeCompare(movieB.title);
    }
  });

  return sortedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const sortedMovies = [...moviesArray];

  sortedMovies.sort((movieA, movieB) => {
    return movieA.title.localeCompare(movieB.title);
  });

  const titles = sortedMovies.map(movie => movie.title);

  if (titles.length > 20) {
    return titles.slice(0, 20);
  }

  return titles;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const convertedMovies = moviesArray.map(movie => {
    const duration = movie.duration.split(' ');
    let totalMinutes = 0;

    for (const item of duration) {
      if (item.includes('h')) {
        totalMinutes += parseInt(item) * 60;
      } else if (item.includes('min')) {
        totalMinutes += parseInt(item);
      }
    }

    return {
      ...movie,
      duration: totalMinutes,
    };
  });

  return convertedMovies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }

  const averageScores = {};

  moviesArray.forEach(movie => {
    const year = movie.year;
    const score = movie.score;

    if (!averageScores[year]) {
      averageScores[year] = { total: 0, count: 0 };
    }

    averageScores[year].total += score;
    averageScores[year].count++;
  });

  let bestYear = null;
  let highestAverage = -1;

  for (const year in averageScores) {
    const average = averageScores[year].total / averageScores[year].count;

    if (
      average > highestAverage ||
      (average === highestAverage && year < bestYear)
    ) {
      bestYear = year;
      highestAverage = average;
    }
  }

  return {
    year: parseInt(bestYear),
    average: parseFloat(highestAverage.toFixed(2)),
  };
}
