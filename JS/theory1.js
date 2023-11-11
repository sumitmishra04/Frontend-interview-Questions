// Q1) explain event delegation, bubbling, capturing and their use cases
// https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/
// loading js async : https://flaviocopes.com/javascript-async-defer/
// content visibility
// serving critical css
// resource hints
// caching using service worker, cdn
// csr, ssr
// compression techniques
// layout shifts and repainting

// Theory
// what happens when any url is clicked
// event bubbling, capturing and delegation
// http response methods and their use cases wrt to security as well
// offline caching
// browser-caches
// what are the steps one can take for security in frontend
// content-type
// img type and wht happens when we fetch a different resource
// async/defer
// async/await all use cases
// web worker/service workers
// local storage questions and events
// best ways to optimise long running sync code

/// what happens when any url is clicked
// a url is divided into protocol+domain+resource
// DNS lookup -> browser request goes to dns and then domain part of the url is converted to the ip address and is returned
// now this will be called
// domain is converted to ipAddress:portNumber (80 for http and 443 for https) port number identifies the service running in the server
// So, if a web page request comes in, the data might be addressed to 192.168.1.1:80, indicating that it's meant for the web browser.
// Your computer (house) uses the port number to know to send that data to the web browser application (room) for processing.
// Similarly, if an email arrives, it might be addressed to 192.168.1.1:25, guiding your computer to deliver it to the email application (room).

/** 
So once we have the real ip address, a tcp socket connection is established between the browser and the server. 
And so they are now finally connected. And this connection is typically kept alive for the entire time that it takes to transfer 
all files of the website or all data.  tcp is the transmission control protocol. And ip is the internet 
protocol. And together they are communication protocols that define exactly how data travels across the web. They are basically the 
internet's fundamental control system, they are the ones who set the rules about how data moves on the internet. 
The request that we make is an http request, where http stands for hypertext transfer protocol. 
So after tcp/ip, http is another communication protocol. And by the way, a communication protocol is simply a system of 
rules that allows two or more parties to communicate. Now in the case of http, it's just a protocol that allows clients and web 
servers to communicate. And that works by sending requests and response messages from client to server and back. Now a request 
message will look something like this. The beginning of the message is the most important part called the start line. And this one 
contains the http method that is used in the request, then the request target and the http version. So about the http methods, 
there are many available, but the most important ones are; get, for simply requesting data, post, for sending data and put and 
patch, to basically modify data. So you'll see that an http request to a server is not only for getting data, but we can also send 
data, now right. Now about the request target. This is where the server is told that we want to access the rest/v2/alpha resource in
this case, remember that? 

So we had this in the url before and now it is simply sent as the target in the http request. And so 
then the server can figure out what to do with it. Now, if this target was empty, so if it was just a slash basically then we 
would be accessing the website's route, which is just rest countries.Eu in this example. Then the next part of the request are the request 
headers, which is just some information that we sent about the request itself. There are tons of standard different headers, 
like what browser is used to make the request, at what time, the user's language and many, many more. Now finally, in the case, 
we're sending data to the server. There will also be a request body, and that body will contain the data that we're sending, 
for example, coming from an html form. So that is the http request. And i hope that it makes sense to you. Now, of course, it's 
not us developers who manually write these http requests, but it's still helpful and valuable that you understand what an 
http request
and also a response look like. Also, i want to mention that there's also https, as you probably know. And the main difference
between http and https is that https is encrypted using tls or ssl, which are yet some are protocols, but i'm not gonna bore
you with these. But besides that, the logic behind http requests and responses still applies to https, alright? 

So our 
request is formed and now it hits the server, which will then be working on it until it has our data or web page ready to
send back. And once it's ready, it will send it back using, as you can guess, an http response. And the http response 
message actually looks quite similar to the request. So also with a start line, headers and a body. Now, in this case, 
the start line has, besides the version also a status code and a message. And these are used to let the client know 
whether the request has been successful or failed. For example, 200 means, okay. And the status code that everyone knows is
404, which means page not found. So that is where this 404 code, that everyone already knew, comes from, okay. 
Then the response headers are information about the response itself. So just like before, and there are a ton available 
and we can also make up our own actually. And finally, the last part of the response is, again, the body, which is present in most 
responses, and this body usually contains the json data coming back from an api or the html of the web page that we requested or 
something like that. So we talked in great detail about the most important parts here, which are the http request and the response. 
But in our imaginary example, we only just did one request to restcountries.Eu and got one response back, right? And that's how it's 
gonna work when all we do is to access an api. However, if it's a web page that we're accessing, then there will be many more requests and responses. And that's because when we do the first request, all we get back is just the initial html file. That html file will then get scanned by the 
browser for all the assets that it needs in order to build the entire web page like javascript, css files, image files, or other assets. And then for each different file, there will be a new http request made to the server. So basically this entire back and forth between client and server happens for every single file that is included in the web page. However, there can be multiple requests and responses happening at the same time, but the amount is still limited because otherwise the connection would start to slow down. But anyway, when all the files have finally arrived, then the web page can be rendered in the browser, according to the html, css and javascript specifications that you already know. Now, as a final piece of the puzzle, let's talk again about tcp/ip and figure out how this request and response data is actually sent across the web, okay. So we said before that tcp and ip are the communication protocols that define how data travels across the web. Now i'm not gonna go into a lot of detail here, but here 
is what you need to know. So first the job of tcp is to break the requests and responses down into thousands of small chunks, called packets before they are sent. Once the small packets arrive at their final destination, tcp will reassemble all the packets into the original request or response. And this is necessary so that each packet can take a different route through the internet because this way the message arrives at the destination as quick as possible, which would not be possible if we sent the entire data simply as a big chunk. So that would be like trying to go through dense traffic with l
ike the biggest bus that you can imagine. So probably not a good idea. Now, as a second part, the job of the ip protocol is to actually send and route these packets through the internet. So it ensures that they arrive at the destination they should go, using ip addresses on each packet. 
Okay, and that's it. That's a broad overview of what really happens behind the scenes of the web. And i hope that you found this information useful and also interesting and not all too confusing. But anyway, now let's go back to our javascript and ajax calls.

*/

// Today all of react fundamentals and other theoritical things
