import EventsService from "../Services/Events_Service.js";
import SnacksService from "../Services/snack_service.js";
import UserService from "../Services/addUserService.js";

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const eventID = urlParams.get('id');
  const snacksPromise = SnacksService.getSnacksDetails();
      // Check if 'Id' key is present in sessionStorage
      const storedId = sessionStorage.getItem('Id');
      if (!storedId) {
          // 'Id' is not present, redirect to login page
          alert('Please login to proceed.');
          window.location.href = '../HTML/login.html';

          // You can redirect to the login page or handle it as per your application's logic
          // window.location.href = '../HTML/login.html';
          return;
      }


  EventsService.getEventsDetailsbyId(eventID)
    .then((eventsResponse) => {
      let eventdata = eventsResponse.data;

      $(".Event-name").text(eventdata.event_name);
      $(".Event-artist").text(eventdata.artist_name);
      $(".Event-date").text(eventdata.date);
      $(".Event-time").text(eventdata.time);

      const snacksContainer = $(".snacks_info");

      snacksPromise.then((snacksResponse) => {
        let snacks = snacksResponse.data;

        for (let snack of snacks) {
          let div = `
            <div class="col-md-3">
              <div class="card">
                <img src="${snack.snacks_poster}" class="card-img-top" alt="Image">
                <div class="card-body">
                  <h5>${snack.name}</h5>
                  <h5>${snack.price}</h5>
                  <a href="#" class="book-now-btn add-snack"
                    data-name="${snack.name}"
                    data-price="${snack.price}">Add</a>
                </div>
              </div>
            </div>`;

          snacksContainer.append(div);
        }

        let ticketCounts = {
          "silver": 0,
          "gold": 0,
          "platinum": 0,
          "diamond": 0
        };

        function appendTicketInfo(ticketType, ticketPrice) {
          var ticketBlock = $('<div>').addClass('ticket-block');
          var ticketInfo = $('<div>').addClass('ticket-info');
          var heading = $('<h2>').text(ticketType + " Ticket");
          var price = $('<p>').html('<strong>' + ticketPrice + '</strong>');

          ticketInfo.append(heading, price);
          ticketBlock.append(ticketInfo);

          // Add the "ADD" button for each ticket type
          var addButton = $('<button>').addClass('add-btn').attr('data-type', ticketType).text('ADD');
          ticketBlock.append(addButton);

          $('#ticket-container').append(ticketBlock);
        }

        $.each(eventdata.ticket_price, function (type, price) {
          appendTicketInfo(type, price);
        });

        const snackDetails = [];

        $(document).on('click', '.add-btn', function () {
          const ticketType = $(this).data('type');

          if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).html(`
              <button class="increment" data-type="${ticketType}">+</button>
              <span class="count" data-type="${ticketType}">${ticketCounts[ticketType]}</span>
              <button class="decrement" data-type="${ticketType}">-</button>
            `);
          }
        });

        $(document).on('click', '.increment', function () {
          const ticketType = $(this).data('type');
          ticketCounts[ticketType]++;
          updateCountDisplay(ticketType);
          updateTotalInfo();
        });

        $(document).on('click', '.decrement', function () {
          const ticketType = $(this).data('type');
          if (ticketCounts[ticketType] > 0) {
            ticketCounts[ticketType]--;
            updateCountDisplay(ticketType);
            updateTotalInfo();
          }
        });

        function updateCountDisplay(ticketType) {
          $(`.count[data-type="${ticketType}"]`).text(ticketCounts[ticketType]);
        }

        function updateTotalInfo() {
          const totalCount = Object.values(ticketCounts).reduce((a, b) => a + b, 0);
          const totalTicketPrice =
            ticketCounts['silver'] * eventdata.ticket_price['silver'] +
            ticketCounts['gold'] * eventdata.ticket_price['gold'] +
            ticketCounts['platinum'] * eventdata.ticket_price['platinum'] +
            ticketCounts['diamond'] * eventdata.ticket_price['diamond'];

          const totalSnackPrice = $('.add-snack.active').toArray().reduce((sum, snack) => {
            const snackPrice = parseFloat($(snack).data('price')) || 0;
            return sum + snackPrice;
          }, 0);

          const totalPrice = totalTicketPrice + totalSnackPrice;

          $('#total-count').text(totalCount);
          $('#total-price').text(totalPrice.toFixed(2));
          $('#total-snacks').text(totalSnackPrice.toFixed(2));

          // Display selected tickets
          const selectedTicketsList = $('#selected-tickets-list');
          selectedTicketsList.empty();
          for (const type in ticketCounts) {
            if (ticketCounts[type] > 0) {
              const ticketQuantity = ticketCounts[type];
              const ticketType = type + " Ticket";
              const listItem = `<li>${ticketType}: ${ticketQuantity}</li>`;
              selectedTicketsList.append(listItem);
            }
          }

          // Display selected snacks
          const selectedSnacksList = $('#selected-snacks-list');
          selectedSnacksList.empty();
          for (const snack of snackDetails) {
            const listItem = `<li>${snack.name}: ${snack.quantity}</li>`;
            selectedSnacksList.append(listItem);
          }
        }

        $(document).on('click', '.add-snack', function () {
          const snackName = $(this).data('name');
          const snackPrice = parseFloat($(this).data('price')) || 0;

          if (!$(this).hasClass('active')) {
            $(this).addClass('active');
            snackDetails.push({
              name: snackName,
              quantity: 1,
              price: snackPrice,
              totalPrice: snackPrice
            });
          } else {
            $(this).removeClass('active');
            const index = snackDetails.findIndex((snack) => snack.name === snackName);
            if (index !== -1) {
              snackDetails.splice(index, 1);
            }
          }

          updateTotalInfo();
        });

// ...

$('#proceed-btn').click(function () {
  const totalCount = Object.values(ticketCounts).reduce((a, b) => a + b, 0);

  if (totalCount === 0) {
      alert('Please select a seat to proceed.');
      return false;
  } else {
      const receiptInfo = {
          eventName: eventdata.event_name,
          eventDate: eventdata.date,
          eventTime: eventdata.time,
          ticketDetails: ticketCounts,
          snackDetails: snackDetails,
          totalPrice: $('#total-price').text()
      };

      // Fetch user details by ID from sessionStorage
      const userId = sessionStorage.getItem('Id');
      UserService.getuserDetailsbyID(userId)
          .then(response => {
              let user = response.data;

              // Add receiptInfo to user's history
             user._userhistory.push(receiptInfo);
             sessionStorage.setItem('receiptInfo', JSON.stringify(receiptInfo));

              // Update user details
              UserService.putuserDetails(userId, user)
                  .then(response => {
                      console.log(response);

                      // Now, you can pass the receiptInfo object to the next page or store it in your desired way
                      const receiptInfoString = JSON.stringify(receiptInfo);

                      // Display the string in an alert
                      alert(receiptInfoString);
                      window.location.href = '../HTML/event_receipt.html';
 

                      // Redirect to the receipt page
   
                  })
                  .catch(error => {
                      console.log(error);
                  });

                  window.location.href = '../HTML/event_receipt.html';

          })
          .catch(error => {
              console.log(error);
          });
  }
});

// ...

      
      });
    })
  })
  
