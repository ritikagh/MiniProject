
//Fetching Seat Structure


import movies from "../Services/movies_service.js";
//import SeatService from "../Services/SeatService.js"


// $(document).ready(function () {

//     const urlParams = new URLSearchParams(window.location.search);
//     const movieId = urlParams.get("movieId");
//     const selectedTime = urlParams.get("time");
//     const selectedDate = urlParams.get("date");
//     const selectPara= urlParams.get("moviepara");
//     const venue = urlParams.get("venue");
//     movies.getmoviesDetailsbyId(movieId)
//     .then((response) => {
//         let aboutmoviedata = response.data;
//         aboutmoviedata.theatre.forEach((theatre) => {
//             // Assuming there's only one movie for simplicity
//             const targetDate = selectedDate;
//             const movieData = theatre.Date1.Date_movie_1;
  
//             // Check if the movie's date matches the target date
//             if (movieData.date === targetDate) {
//               // Access venue and date from the matching data
//               const venue = theatre.theatre_venue1;
//               const date = movieData.date;
//               console.log("Venue:", venue);
//               console.log("Date:", date);
  
//               // Loop through all available times
//               Object.keys(movieData).forEach((timeKey) => {
//                 if (timeKey.startsWith("time_")) {
//                   const timeDetails = movieData[timeKey];
//                   const movieTime = timeDetails.movie_time;
//                   console.log("Time:", movieTime);
  

//                 }
//               });

//             }
//           });
//     })


// })
// .catch((error) => {
//   console.log(error);
// });


/// 

//////
 
$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("movieId");
    const selectedTime = urlParams.get("time");
    const selectedDate = urlParams.get("date");
    const selectPara = urlParams.get("moviepara");
    const targetVenue = urlParams.get("venue");

    movies.getmoviesDetailsbyId(movieId).then((response) => {
        let aboutmoviedata = response.data;

        aboutmoviedata.theatre.forEach((theatre) => {
            const targetDate = selectedDate;
     //       const movieData = theatre.Date1.Date_movie_1;
     const movieData = theatre.Date1[selectPara];

            if (movieData.date === targetDate) {
                const venue = theatre.theatre_venue1;

                // Check if the current venue matches the target venue
                if (venue === targetVenue) {
                    const date = movieData.date;
                    console.log("Venue:", venue);
                    console.log("Date:", date);

                    // Loop through all available times
                    Object.keys(movieData).forEach((timeKey) => {
                        if (timeKey.startsWith("time_")) {
                            const timeDetails = movieData[timeKey];
                            const movieTime = timeDetails.movie_time;

                            // Check if the current time matches the selected time
                            if (movieTime === selectedTime) {
                                console.log("Time:", movieTime);

                                // Access seat information for the selected venue and time
                                const seatInfo = timeDetails.seats.time_1_seats;
                               
                                console.log("Seat Information:", seatInfo);

                                // Now you can perform further operations with seatInfo
                                // For example, display seat information on the page
                                displaySeatInformation(seatInfo);
                            }
                        }
                    });
                }
            }
        });
    });
});

function displaySeatInformation(seatInfo) {
    // Your logic to display seat information on the page
    console.log("Displaying Seat Information:", seatInfo);
}


let flag;
const seat_selected_array = [];
const clickEventHandler = () => {
    $(".seat").click(function () {


        if ($(this).attr("class") == "seat selected") {
            $(this).attr("class", "seat")
            flag = false;

            let indexs = $(this).attr("id")
            let rem = seat_selected_array.splice(seat_selected_array.indexOf(indexs), 1);
            console.log(seat_selected_array);

        }
        else {
            $(this).attr("class", "seat selected")
            flag = true;
            seat_selected_array.push({ row: $(this).parent().attr("id"), seatNo: $(this).attr("id"), status: $(this).attr("class") })
            console.log(seat_selected_array);
        }

    })
}


function DisplaySeat() {
    $(".cinema-seats").append(`<div class="cinema-row row-1" id="row-1" style="justify-content: center"></div>`)

    SeatService.getSeatStructure("row-1").then((res) => {
        let structure = res.data;


        structure.forEach(seat => {
            $(".row-1").append(`<div class=${seat.Status}  id=${seat.id}>${seat.SeatNo} </div>`)


        })



    })

    $(".cinema-seats").append(`<div class="cinema-row row-2" id="row-2" style="justify-content: center"></div>`)
    SeatService.getSeatStructure("row-2").then((res) => {
        let structure = res.data;

        structure.forEach(seat => {
            $(".row-2").append(`<div class=${seat.Status}  id=${seat.id}>${seat.SeatNo}</div>`)

        })

    })
    $(".cinema-seats").append(`<div class="cinema-row row-3" id="row-3" style="justify-content: center"></div>`)
    SeatService.getSeatStructure("row-3").then((res) => {
        let structure = res.data;

        structure.forEach(seat => {
            $(".row-3").append(`<div class=${seat.Status}  id=${seat.id}>${seat.SeatNo}</div>`)

        })
    })
    $(".cinema-seats").append(`<div class="cinema-row row-4" id="row-4" style="justify-content: center"></div>`)
    SeatService.getSeatStructure("row-4").then((res) => {
        let structure = res.data;

        structure.forEach(seat => {
            $(".row-4").append(`<div class=${seat.Status}  id=${seat.id}>${seat.SeatNo}</div>`)

        })
    })
    $(".cinema-seats").append(`<div class="cinema-row row-5" id="row-5" style="justify-content: center"></div>`)
    SeatService.getSeatStructure("row-5").then((res) => {
        let structure = res.data;

        structure.forEach(seat => {
            $(".row-5").append(`<div class=${seat.Status}  id=${seat.id}>${seat.SeatNo}</div>`)

        })
        clickEventHandler();
    })
    $("body").append(`<button class='btn btn-light Payment'> Booking Payment </button>`)


    $(".Payment").click(function () {
        alert("Tickets Booked");
        updateSeat(event);
    })






}



function updateSeat(event) {
    event.preventDefault();

    for (let i = 0; i < seat_selected_array.length; i++) {
        const fillSeat = seat_selected_array[i];
        const seat = fillSeat.seatNo;
        const row = fillSeat.row
        if (fillSeat.status == "seat selected") {

            SeatService.updateSeatRow(row, seat, "blocked").then((res) => {
                console.log("Success");
            });

        }
        else
            console.log("select seat");
    }
    SeatService.getSeatStructure().then(() => {
        DisplaySeat();
    })
}



$(document).ready(function () {
    DisplaySeat();



})






















