/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

/*
  Network API overview: http://www.w3.org/TR/netinfo-api/
  and http://w3c.github.io/netinfo/
*/

var cordova = require('cordova'),
    Connection = require('./Connection')

module.exports = {
    getConnectionInfo: function(successCallback, errorCallback) {
        window.navigator.connection.type = Connection.NONE;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://www.google.com', true);
        
        xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.navigator.connection.type = Connection.WIFI;
            } else {
                window.navigator.connection.type = Connection.NONE;
            }
            setTimeout(function() {
                successCallback(window.navigator.connection.type);
            }, 0);
        };

        xhr.send();

        xhr.onerror = function() {
            successCallback(window.navigator.connection.type);
        };

        xhr.onabort = function() {
            successCallback(window.navigator.connection.type);
        };
        
        xhr.ontimeout = function() {
            successCallback(window.navigator.connection.type);
        };
    }
};

require("cordova/exec/proxy").add("NetworkStatus", module.exports);
