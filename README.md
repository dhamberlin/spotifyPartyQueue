# Spotify Party Queue
Allow party guests to play songs from the host's Spotify account via text.

## To use:
1. Clone repo
2. npm install
3. [Register an app](https://developer.spotify.com/my-applications/#!/) with Spotify. Make the provided client ID and client secret available to the app via a config.js file as exports.clientID and exports.clientSecret respectively.
4. [Sign up for a Twilio account](https://www.twilio.com/try-twilio), get a phone number, and configure the number to redirect SMS to <your sever's address>/sms
5. npm start
6. Visit localhost:8080 and click the link to get an access token for your Spotify account.
7. Users can now request songs by texting your Twilio number.
