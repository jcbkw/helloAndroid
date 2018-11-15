/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        var shareBtn = document.createElement("button");
        shareBtn.id = "btn";
        shareBtn.innerHTML = "Social Share";
        document.querySelector(".app").appendChild(shareBtn);
        document.querySelector("#btn").addEventListener("click", function () { 
      
            if(!window.device || window.device.platform === "browser") { 
                app.toggleOverlay();
                $("#feedback").html(window.navigator.userAgent); 
                $("#share").jsSocials({
                    shares: ["email", "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"],
                    url: "http://www.homemadecodes.com/game/sneakysnaeky/",
                    text: "Checkout out Sneaky Snaeky Go. This game is so much fun.",
                    
                });
                
            }
            else {
                var options = {
                    message: 'Checkout out Sneaky Snaeky Go. This game is so much fun.', // not supported on some apps (Facebook, Instagram)
                    subject: 'Checkout out Sneaky Snaeky Go. This game is so much fun.', // fi. for email
                    files: ["/img/logo.png"], // an array of filenames either locally or remotely
                    url: 'http://www.homemadecodes.com/game/sneakysnaeky/',
                    chooserTitle: 'Pick an app',// Android only, you can override the default share sheet title,
                    
                  };

                  var onSuccess = function(result) {
                    document.querySelector("#feedback").innerHTML = "Share completed? " + result.completed +
                     "\n" +  "Shared to app: " + result.app; 
                    //console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                    //console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                  };
                  
                  var onError = function(msg) {
                    console.log("Sharing failed with message: " + msg);
                  };

                window.plugins.socialsharing.shareWithOptions(
                    options, onSuccess, onError
                );
            }
        }, false);
        document.querySelector("#overlay").addEventListener("click", function () {
            app.toggleOverlay();
        }, false);

    },
    toggleOverlay:  function () {
        var overlay = document.getElementById("overlay");

        if (overlay.classList.contains("hide")) {
            overlay.classList.remove("hide");
            overlay.classList.add("show");
        }
        else {
            overlay.classList.remove("show");
            overlay.classList.add("hide");
        }
        
    }

};

app.initialize();