import movies from "../Services/movies_service.js";

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  movies
    .getmoviesDetailsbyId(movieId)

    .then((response) => {
      //getting movie id and about movie data
      movies.getmoviesDetailsbyId(movieId);
      let aboutmoviedata = response.data;
      console.log(aboutmoviedata);
      console.log(aboutmoviedata.theatre[0].Date1.Date_movie_1.time_1.seats.time_1_seats[0]);

      //display data
      $("#todate").show(function () {
        $(".ontodate").text(targetDate);
        aboutmoviedata.theatre.forEach((theatre) => {
          // Assuming there's only one movie for simplicity
          const movieData = theatre.Date1.Date_movie_1;

          // Check if the movie's date matches the target date
          if (movieData.date === targetDate) {
            // Access venue and date from the matching data
            const venue = theatre.theatre_venue1;
            const date = movieData.date;
            let dd = `${venue} <br>`;
            $(".venue").append(dd);
            console.log("Venue:", venue);
            console.log("Date:", date);

            // Loop through all available times
            Object.keys(movieData).forEach((timeKey) => {
              if (timeKey.startsWith("time_")) {
                const timeDetails = movieData[timeKey];
                const movieTime = timeDetails.movie_time;
                console.log("Time:", movieTime);

                let butdisplay = `
                  <button type="button" mov-ven="${venue}"record-id="${movieTime}" mov-date="${date}" mov-id="${movieId}" movie-par="Date_movie_1"  class="btn mov-time  btn-outline-primary">${movieTime}</button>
                  `;
                $(".button-dis").append(butdisplay);
              }
            });
            let linedis = `<br><hr>`;
            $(".venue").append(linedis);
            $(".button-dis").append(linedis);
          }
        });
      });
      $("#tomdate").hide();
      $("#aftomdate").hide();
      //function for data

      $(".mov-name").text(aboutmoviedata.movie_name);
      $(".mov-genre").text(aboutmoviedata.genre);

      const targetDate = "9 Jan 2024"; // Specify the date you want to filter
      $(".ontodate").text(targetDate);
      $(".ontomdate").text("10 Jan 2024");
      $(".onaftomdate").text("11 Jan 2024");

      // aboutmoviedata.theatre.forEach(theatre => {
      //   // Assuming there's only one movie for simplicity
      //   const movieData = theatre.Date1.Date_movie_1;

      //   // Check if the movie's date matches the target date
      //   if (movieData.date === targetDate) {
      //     // Access venue and date from the matching data
      //     const venue = theatre.theatre_venue1;
      //     const date = movieData.date;
      //     let dd=`${venue} <br>`
      //     $(".venue").append(dd);
      //     console.log("Venue:", venue);
      //     console.log("Date:", date);

      //     // Loop through all available times
      //     Object.keys(movieData).forEach(timeKey => {
      //       if (timeKey.startsWith("time_")) {
      //         const timeDetails = movieData[timeKey];
      //         const movieTime = timeDetails.movie_time;
      //         console.log("Time:", movieTime);
      //         let butdisplay=`
      //         <button type="button" class="btn btn-primary">${movieTime}</button>
      //         `
      //         $(".button-dis").append(butdisplay);
      //       }
      //     });
      //     let linedis=`<br><hr>`
      //     $(".venue").append(linedis);
      //     $(".button-dis").append(linedis);

      //   }

      // });

      /////////////////////////////////////////////////////
      $(document).ready(function () {
        $(document).on("click", ".ontomdate", function () {
          movies
            .getmoviesDetails()
            .then((response) => {
              $("#todate").hide();
              $("#tomdate").show(function () {
                const targetDate = "10 Jan 2024"; // Specify the date you want to filter
                $(".ontomdate").text(targetDate);
                aboutmoviedata.theatre.forEach((theatre) => {
                  // Assuming there's only one movie for simplicity
                  const movieData = theatre.Date1.Date_movie_2;

                  // Check if the movie's date matches the target date
                  if (movieData.date === targetDate) {
                    // Access venue and date from the matching data
                    const venue = theatre.theatre_venue1;
                    const date = movieData.date;
                    let dd = `${venue} <br>`;

                    $(".venue1").append(dd);
                    console.log("Venue:", venue);
                    console.log("Date:", date);

                    // Loop through all available times
                    Object.keys(movieData).forEach((timeKey) => {
                      if (timeKey.startsWith("time_")) {
                        const timeDetails = movieData[timeKey];
                        const movieTime = timeDetails.movie_time;
                        console.log("Time:", movieTime);
                        let butdisplay = `
                  <button type="button" mov-ven="${venue}" record-id="${movieTime}" mov-date="${date}" mov-id="${movieId}" movie-par="Date_movie_1" class="btn mov-time btn-outline-primary">${movieTime}</button>
                  `;
                        $(".button-dis1").append(butdisplay);
                      }
                    });
                    let linedis = `<br><hr>`;
                    $(".venue1").append(linedis);
                    $(".button-dis1").append(linedis);
                  }
                });
              });
              $("#aftomdate").hide();
            })
            .catch((error) => {});
        });
      });

      $(document).ready(function () {
        $(document).on("click", ".onaftomdate", function () {
          movies
            .getmoviesDetails()
            .then((response) => {
              $("#todate").hide();
              $("#tomdate").hide();
              $("#aftomdate").show(function () {
                const targetDate = "11 Jan 2024"; // Specify the date you want to filter
                $(".onaftomdate ").text(targetDate);
                aboutmoviedata.theatre.forEach((theatre) => {
                  // Assuming there's only one movie for simplicity
                  const movieData = theatre.Date1.Date_movie_3;

                  // Check if the movie's date matches the target date
                  if (movieData.date === targetDate) {
                    // Access venue and date from the matching data
                    const venue = theatre.theatre_venue1;
                    const date = movieData.date;
                    let dd = `${venue} <br> `;
                    $(".venue2").append(dd);
                    console.log("Venue:", venue);
                    console.log("Date:", date);

                    // Loop through all available times
                    Object.keys(movieData).forEach((timeKey) => {
                      if (timeKey.startsWith("time_")) {
                        const timeDetails = movieData[timeKey];
                        const movieTime = timeDetails.movie_time;
                        console.log("Time:", movieTime);
                        let butdisplay = `
                  <button type="button" mov-ven="${venue}"record-id="${movieTime}" mov-date="${date}" mov-id="${movieId}" movie-par="Date_movie_1" class="btn mov-time  btn-outline-primary">${movieTime}</button>
                  `;
                        $(".button-dis2").append(butdisplay);
                      }
                    });
                    let linedis = `<br><hr>`;
                    $(".venue2").append(linedis);
                    $(".button-dis2").append(linedis);
                  }
                });
              });
            })
            .catch((error) => {});
        });
      });

      $(document).ready(function () {
        $(document).on("click", ".ontodate", function () {
          movies
            .getmoviesDetails()
            .then((response) => {
              $("#todate").show(function () {
                const targetDate = "9 Jan 2024"; // Specify the date you want to filter
                $(".ontodate").text(targetDate);
                aboutmoviedata.theatre.forEach((theatre) => {
                  // Assuming there's only one movie for simplicity
                  const movieData = theatre.Date1.Date_movie_1;

                  // Check if the movie's date matches the target date
                  if (movieData.date === targetDate) {
                    // Access venue and date from the matching data
                    const venue = theatre.theatre_venue1;
                    const date = movieData.date;
                    let dd = `${venue} <br>`;
                    $(".venue").append(dd);
                    console.log("Venue:", venue);
                    console.log("Date:", date);

                    // Loop through all available times
                    Object.keys(movieData).forEach((timeKey) => {
                      if (timeKey.startsWith("time_")) {
                        const timeDetails = movieData[timeKey];
                        const movieTime = timeDetails.movie_time;
                        console.log("Time:", movieTime);
                        let butdisplay = `
                  <button type="button" mov-ven="${venue}"record-id="${movieTime}" mov-date="${date}" mov-id="${movieId}" movie-par="Date_movie_1" class="btn mov-time btn-primary">${movieTime}</button>
                  `;
                        $(".button-dis").append(butdisplay);
                      }
                    });
                    let linedis = `<br><hr>`;
                    $(".venue").append(linedis);
                    $(".button-dis").append(linedis);
                  }
                });
              });
              $("#tomdate").hide();
              $("#aftomdate").hide();
            })
            .catch((error) => {});
        });
      });

      ///////////////////////////////////////////////////////////
    })
    .catch((error) => {
      console.log(error);
    });
});

$(document).ready(function () {
  $(document).on("click", ".mov-time", function () {
    const movieTime = $(this).attr("record-id");
    const movieDate = $(this).attr("mov-date");
    const movieId = $(this).attr("mov-id");
    const movieVenue =$(this).attr("mov-ven");
    const moviepara= $(this).attr("movie-par");

    movies

      .getmoviesDetails()
      .then((response) => {
        alert("movie");
        alert(movieId,movieDate,movieTime);
        const queryString = `?movieId=${encodeURIComponent(movieId)}&time=${encodeURIComponent(movieTime)}&date=${encodeURIComponent(movieDate)}&venue=${encodeURIComponent(movieVenue)}&moviepara=${encodeURIComponent(moviepara)}`;

        window.location.href = `../HTML/seat.html${queryString}`;
      })
      .catch((error) => {});
  });
});
