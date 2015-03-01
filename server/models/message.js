/* jshint camelcase: false, quotmark: false*/

'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  recieverEmail: {type: String, required: true},
  messageType: {type: String, required: true}
});

messageSchema.statics.registration = function(userEmail, cb) {
  var message = {
    // "html": "<p>Example HTML content</p>",
    "text": "You've registered for Toor!",
    "subject": "Thanks for registering for Toor!",
    "from_email": "info@toor.club",
    "from_name": "Toor",
    "to": [{
      "email": userEmail,
      "name": userEmail,
      "type": "to"
    }],
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": null,
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null
    // "merge": true,
    // "merge_language": "mailchimp",
    // "global_merge_vars": [
    // {
    //   "name": "merge1",
    //   "content": "merge1 content"
    // }
    // ],
    // "merge_vars": [{
    //   "rcpt": "recipient.email@example.com",
    //   "vars": [{
    //     "name": "merge2",
    //     "content": "merge2 content"
    //   }]
    // }],
    // "tags": [
    // "password-resets"
    // ],
    // "subaccount": "customer-123",
    // "google_analytics_domains": [
    // "example.com"
    // ],
    // "google_analytics_campaign": "message.from_email@example.com",
    // "metadata": {
    //   "website": "www.example.com"
    // },

  };

  var async = false;
  var ip_pool = "Main Pool";
  var send_at = null;
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
    cb(null, result);
  }, function(err) {
    console.log('A mandrill error occurred: ' + err.name + ' - ' + err.message);
    cb(err);
  });
};

module.exports = mongoose.model('Message', messageSchema);