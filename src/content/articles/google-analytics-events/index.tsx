function Article() {
    return (
        <article className="article">
            <h2>Google Analytics Events</h2>

            <p className="eyebrow">Originally Published on October 10th, 2016</p>

            <p>
                We all know how great Google Analytics is. Spectulated to be included within
            </p>

            <p>
                55 million sites
            </p>

            <p>
                , Google offers the most popular analytics services on the web, account for 83% of the market share. One of the coolest features of Google Analytics, is event tracking! With it, you can analyze sessions, flow, interaction and much more!Know whenever a button is clicked, a link is hovered, an articles clicked on, user’s progression and time on current page, when a form submitted, a comment posted, avideo played, text selection copied to clipboard, you site is bookmarked, how long the JavaScript took to load and initiate, when it’s shared on twitter, etc etc. All this information, when used currently, could tell you key areas of improvement or just how a user interacts with it.Below, we’re going to set up trackers for click, hover, seen, and load.
            </p>

            <h3>Reporting</h3>

            <p>
                When you initialize page tracking, you also appened Google’s <a
                    href="http://hmphry.com/articles/reporting-events-with-google-analytics#0"
                    target="_blank"
                    rel="noopener"
                >Universal Analytics Tracking Code</a> to your site, so there is nothing else we need to add. To report an event, you’re going to use the same function Google uses to initialize or report a pageview, the powerful <code>ga()</code> function. This function is the only way to interact with Google Analytics, accepting many parameters that tell it what to do.
            </p>

            <p>
                Our code will look like this:
            </p>

            <pre>
                {`ga('send', {
  hitType: 'event',
  eventCategory: 'category',
  eventAction: 'action',
  eventLabel: 'label'
  eventValue: 0
});`}
            </pre>

            <p>
                The first parameter is not a big deal, it just tells GA to send it. Whats really important here is the second parameter, the object, and its values. This object contains the data sent.
            </p>

            <ul>
                <li>
                    hitType: there are a few hit types we’ll get into at a later time, but for now we’ll just go use the “event”.
                </li>
<li>
                    eventCategory: accepts text as a value and is required. This can be anything, but usually used for vague categorization(e.g. videos).
                </li>
<li>
                    eventAction: accepts text as a value and is required. Typically used to declare the interaction(e.g. play).
                </li>
<li>
                    eventLabel: accepts text as a value. Typically used for precise catagorization(e.g. Adorable pug).
                </li>
<li>
                    eventValue: accepts a numeric value.
                </li>
            </ul>

            <p>
                example: https://jsfiddle.net/a16gpb0d/1/
            </p>

            <h3>The Prototype</h3>

            <p>
                To start, we’re going to build our prototype. I like to use a prototype for this, just incase if I have to any functions I want to extend to other functions.
            </p>

            <pre>
                {`GoogleEvent.prototype = {};
GoogleEvent.prototype.report = function(){
    console.log('send', {
        hitType: 'event',
        eventCategory: this.category,
        eventAction: this.action,
        eventLabel: this.label,
        eventValue: parseInt(this.value) || 0
    });
};

function GoogleEvent(trigger, emitter, action, category, label, value, dynamic){
    var parent = this;
    this.category = category;
    this.action = action;
    this.label = label;
    this.value = value || 0;
    this.dynamic = dynamic || 0;
    $(trigger).on(emitter, function(){
        parent.report()
    });
}`}
            </pre>

            <p>
                Now we have the prototype, with a report function, and a constructor. If you’re not familiar with this setup, you can learn more by searching for JavaScript Prototypes.
            </p>

            <h3>Add Click Events</h3>

            <p>
                There are a few ways of defining these events, but my preferred method is to create individual functions for the different event types. I’m going to use a technique called currying, as I find it a bit friendlier to read and maintain. If you’re not familiar with currying, it’s a way to evaluate a function’s arguments and is really, really cool.
            </p>

            <p>
                To begin, we’re going to declare a function expression. This function expression will accept two parameters, emitter and action, as they are most likely to be repeated. The function expression will then return an anonymous function, which will take the place of the expression when called. The anonymous function will call the constructor and bada boom, realest events in the room. How ya doing.
            </p>

            <pre>
                {`GoogleEvent.prototype = {};
GoogleEvent.prototype.report = function(){...};

function GoogleEvent(trigger, emitter, action, category, label, value, dynamic){...}

var defineGoogleEvent = function(emitter, action){
    return function(trigger, category, label, value, dynamic){
        new GoogleEvent(trigger, emitter, action, category, label, value, dynamic)
    }
};`}
            </pre>

            <p>
                Now we define our function expression for clicks and call it on buttons elements:
            </p>

            <pre>
                {`GoogleEvent.prototype = {};
GoogleEvent.prototype.report = function(){...};

function GoogleEvent(trigger, emitter, action, category, label, value, dynamic){...}

var defineGoogleEvent = function(emitter, action){...};
var defineGoogleClick = defineGoogleEvent("click", "click");

defineGoogleClick("button", "button", "innerContent");`}
            </pre>

            <p>
                Everytime we click a button on the page, we’ll now send an event to Google Analytics.
            </p>

            <h3>Add Hover Events</h3>

            <p>
                To create hover events, it’s a very similar process, except instead of using “click” for both arguments, we’re going to use “hover” and “mouseenter”.
            </p>

            <pre>
                {`GoogleEvent.prototype = {};
GoogleEvent.prototype.report = function(){...};

function GoogleEvent(trigger, emitter, action, category, label, value, dynamic){...}

var defineGoogleEvent = function(emitter, action){...};
var defineGoogleClick = defineGoogleEvent("click", "click");
var defineGoogleHover = defineGoogleEvent("mouseenter", "hover");

defineGoogleClick("button", "button", "innerContent");
defineGoogleHover("button", "button", "innerContent");`}
            </pre>

            <h3>Dynamic Events</h3>

            <p>
                One issue with this basic setup is that you may want to know what button they clicked or hovered over. We could add call this multiple times with unique identifiers for each button, but that can be cumbersome. Instead, we’ll add the functionality to tell which button was clicked on dynamically.
            </p>

            <p>
                Some people like to send the content within the element itself, but my preferred solution is with data attributes. With a data attributes, you can give the element uniquely, descriptive values to indicate what was emitted when.
            </p>

            <p>
                As you’ll notice above, we already built in the dynamic parameter and leaving it as undefined. However, to accomplish our task, we’re going to need to refactor our code here a bit.
            </p>

            <pre>
                {`GoogleEvent.prototype = {};
GoogleEvent.prototype.report = function(report){
    ga('send', {
        hitType: 'event',
        eventCategory: report.category,
        eventAction: report.action,
        eventLabel: report.label,
        eventValue: parseInt(report.value) || 0
    });
};
GoogleEvent.prototype.getNameId = function(elem){
	return elem.data("ga-name-id");
};

function GoogleEvent(trigger, emitter, action, category, label, value, dynamic){
    var parent = this;
    this.category = category;
    this.action = action;
    this.label = label;
    this.value = value || 0;
    this.dynamic = dynamic || 0;
    $(trigger).on(emitter, function(){
        var elem = $(this);
        var reportValues = {
            category: category,
            action: action,
            label: label,
            value: value,
        };
        if(parent.dynamic){
        	reportValues[dynamic.replace] = parent[dynamic.replaceValue](elem)
        }
        parent.report(reportValues)
    });
}

var defineGoogleEvent = function(emitter, action){...};
var defineGoogleClick = defineGoogleEvent("click", "click");
var defineGoogleHover = defineGoogleEvent("mouseenter", "hover");
var buttonIdReplace = {
    replace: "label",
    replaceValue: "getNameId"
};

defineGoogleClick("button", "button", "innerContent", 0, buttonIdReplace);
//defineGoogleHover("button", "button", "innerContent");`}
            </pre>

            <p>
                Below is a break down of what I refactored:
            </p>

            <ul>
                <li>
                    <strong>GoogleEvent.prototype.report</strong>: replaced all parameters with one parameter intended to be an object. Replaced arguments for ga function with keys from parameter object.
                </li>
<li>
                    <strong>GoogleEvent.prototype.getNameId</strong>: added.
                </li>
<li>
                    <strong>GoogleEvent</strong>: changed on function to pass an object as an argument, made dynamic condition and execution.
                </li>
<li>
                    <strong>buttonIdReplace</strong>: added.
                </li>
            </ul>

            <p>
                Now, when the event happens, we’re searching through the dynamic object and applying the changes requested. It’s important to note that for this to work, <code>dynamic.replace</code>‘s values must be a key in <code>reportValues</code>, and that <code>dynamic.replaceValue</code>‘s value must be the name of a method of the original prototype.
            </p>

            <h3>Advanced Events</h3>

            <p>
                Of course, the web is much more than clicks and hovers. You can gain a lot of information by tracking how often users do something on your page. For example, when a user resizes the browser.
            </p>

            <p>
                Before we get into the resize event, we need a way to identify our user. The reason being is because developers love to resize the browser to find when, and how, sites break. If my analytics reported 84 resizes 100 visits, I could assume there is something wrong with my site that forces 84% to resize. However, if I could see that the 84% was from 20 users, a more likely explanation is developers.
            </p>

            <p>
                To solve this problem, we’ll store a session cookie with an ID that Google Analytics can reference. We’re going to use a standard Base64 ID, and since we’re not storing this ID anywhere on the server, there is an astronomically small chance that two users could share an ID — just a heads up.
            </p>

            <pre>
                {`GoogleEvent.prototype = {};
GoogleEvent.prototype.report = function(report){...};
GoogleEvent.prototype.getNameId = function(elem){...};
GoogleEvent.prototype.sessionId = (function(){
    var base64 = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
    var amount = 7;
    var id = "";
    var oldId = sessionStorage.getItem('gaSessionId');

    return oldId || createId();

    function createId(){
        for(var i = 0, x = amount; i < x; i++){
            id += random(2,1) > 1 ? randomChar().toUpperCase() : randomChar();
        }
        sessionStorage.setItem("gaSessionId", id)
        return id
    }
    function randomChar(){
        return base64[random(base64.length-1)];
    }
    function random(max, min){
        min = min || 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})();

function GoogleEvent(trigger, emitter, action, category, label, value, dynamic){...}

var defineGoogleEvent = function(emitter, action){...};
var defineGoogleClick = defineGoogleEvent("click", "click");
var defineGoogleHover = defineGoogleEvent("mouseenter", "hover");
var buttonIdReplace = {...};

defineGoogleClick("button", "button", "innerContent", 0, buttonIdReplace);`}
            </pre>

            <p>
                We created <code>GoogleEvent.prototype.sessionId</code> as an immediately-invoked function expression. If an ID is stored, it’ll use the one stored. If no stored ID is found, it’ll create and store one for the session.
            </p>

            <pre>
                {`GoogleEvent.prototype = {};
GoogleEvent.prototype.report = function(report){...};
GoogleEvent.prototype.getNameId = function(elem){...};
GoogleEvent.prototype.sessionId = (function(){...})();
GoogleEvent.prototype.getSessionId = function(){
    return this.sessionId
};


function GoogleEvent(trigger, emitter, action, category, label, value, dynamic){...}

var defineGoogleEvent = function(emitter, action){...};
var defineGoogleClick = defineGoogleEvent("click", "click");
var defineGoogleHover = defineGoogleEvent("mouseenter", "hover");
var buttonIdReplace = {...};
var userIdReplace = {
    replace: "category",
    replaceValue: "getSessionId"
};

defineGoogleClick("button", "button", "innerContent", 0, buttonIdReplace)
new GoogleEvent($(window), "resize", "resize", "resize", "resize", 0, userIdReplace)`}
            </pre>

            <p>
                Like before, we’re going to create <code>GoogleEvent.prototype.getSessionId</code> and have it return the session ID. Now we’re going to create our object called <code>userIdReplace</code>. We’re going to define <code>userIdReplace.replace</code> as “category” and <code>userIdReplace.replaceValue</code> as “getSessionId”. Finally, since we’re only defining this event once, we don’t need to curry the function. We’ll create a new instance of the original GoogleEvent constructor.
            </p>

            <h3>Conclusion</h3>

            <p>
                And there you have Google Events. If you have any questions, or tips on things I could do better, reach out to me on twitter <a
                    href="https://twitter.com/heyhmphry"
                    target="_blank"
                    rel="noopener"
                >@heyhmphry</a> or leave a comment below. Thanks for reading!
            </p>
        </article>
    )
}

export default Article
