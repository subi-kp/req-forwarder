// Make sure to install dependencies before local testing
// > frsh install
// > frsh run

/*
   - load the npm dependencies using loadDependency.
   - load the lib directory files using loadLib.
*/

var request = loadDependency('request');
var async = loadDependency('async');
//var handler = loadLib('handle-response');


exports = {

  events: [
    { event: 'onTicketCreate', callback: 'onTicketCreateHandler' }
  ],

  onTicketCreateHandler: function(args) {
    console.log('Posting ticket data to backend Server');
    //var url = "http://54.255.184.198/?q=" + args['data']['requester']['name'];
    /*var url = "http://54.255.184.198/?q=" + args['data']['requester']['name'];
    
    request(url, function (error, response) {
      handler.handleResponse(error, response);
    
    });
  */
  async.parallel([
        function(callback) {
            var options = {
                method: 'POST',
                url: 'http://54.255.184.198/api/get',
                headers: {
                    'cache-control': 'no-cache',
                    'content-type': 'application/json'
                },
                body: args,
                json: true
            };

            request(options, function (error, response, body) {
                if (error) { console.log(error); callback(true); return; }
                callback(false, body);
                //console.log(body);
            });
        }
    ],
    function(err, results) {
        if(err) { console.log(err); res.send(500,"Server Error"); return; }
        console.log(results[0]);
        //res.send(results[0]);
    });
  }

};
