const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

mailchimp.setConfig({
  apiKey: //apiKey,
  server: //apiKey-server
});

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const secondName = req.body.lastName;
  const email = req.body.emailAddress;

  const listId = "e27fcd1f0f";

  const subscribingUser = {
    firstName: firstName,
    lastName: secondName,
    email: email
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    //If all goes well logging the contact's id
    res.sendFile(__dirname + "/success.html")
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${
   response.id
   }.`
    );
  } //THIS IS WHERE THE ASYNC FUNCTION ENDS

  run().catch(e => res.sendFile(__dirname + "/failure.html"));

}); //THIS IS WHERE THE APP.POST FUNCTION ENDS

app.post("/failure" , function(req , res){
  res.redirect("/");
});



// app.use(express.static(__dirname));

