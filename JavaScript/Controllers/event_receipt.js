import UserService from "../Services/addUserService.js";

$(document).ready(function () {
  // Retrieve receiptInfo from session storage on the receipt page
  const receiptInfoString = sessionStorage.getItem("receiptInfo");

  // Check if receiptInfoString is not null or undefined
  if (receiptInfoString) {
    const receiptInfo = JSON.parse(receiptInfoString);

    // Example: Accessing individual properties
    const eventName = receiptInfo.eventName;
    const eventDate = receiptInfo.eventDate;
    const eventTime = receiptInfo.eventTime;
    const ticketDetails = receiptInfo.ticketDetails;
    const snackDetails = receiptInfo.snackDetails;
    const totalPrice = receiptInfo.totalPrice;

    // Example: Displaying values in HTML elements
    $(".eventName").text(eventName);
    $(".eventDate").text(eventDate);
    $(".eventTime").text(eventTime);

    const snacksContainer = $(".Snacks");

    if (snackDetails.length > 0) {
      for (const snack of snackDetails) {
        const snackInfo = `${snack.name}: ${snack.quantity}`;
        const snackElement = $("<li>").text(snackInfo);
        snacksContainer.append(snackElement);
      }
    } else {
      snacksContainer.text("No snacks selected");
    }

    $(".TotalPrice").text(totalPrice);

    // ... (similarly for other properties)
  } else {
    // Handle the case where receiptInfo is not found in session storage
    console.error("Receipt information not found in session storage.");
    // You might want to redirect the user or handle this situation accordingly.
  }


});
$(document).on("click", "#submitfeedback", function (event) {
  event.preventDefault();
  const userId = sessionStorage.getItem("Id");

  // Fetch user details by ID
  UserService.getuserDetailsbyID(userId)
    .then(response => {
      let user = response.data;

      // Add feedback data to user
      var feedbackOption = $('input[name="feedback-option"]:checked').val(); // Use jQuery to get the checked value
      // Validate if a feedback option is selected
      if (feedbackOption === undefined) {
        alert("Please select a feedback option");
        return Promise.reject("No feedback option selected");
      }

      var additionalComments = $(".additional-comments").val();
      
      var feedbackData = {
        option: feedbackOption,
        comments: additionalComments,
      };

      user._userfeedback.push(feedbackData);

      // Update user details in the database and return the updated user
      return UserService.putuserDetails(userId, user);
    })
    .then(response => {
      console.log(response);

      // If needed, redirect or perform additional actions after successful update
      alert("Feedback submitted successfully!");
      window.location.href = "../HTML/index.html"; // Corrected line for redirect
    })
    .catch(error => {
      console.log(error);

      // Handle error, show an alert, or redirect to an error page
      alert("Error submitting feedback. Please try again.");
    });
});


