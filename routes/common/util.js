/**
 * Copyright 2017 Nippon Information and Communication Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var request = require('request');

/*
 * POSTリクエスト
 */
exports.post = function(path, data, callback){

  var options = {
    url: createUrl(path),
    headers: {
      "X-SECURE-ID" : global.config.secure_id
    },
    json: true,
    body: data
  };

  request.post(options, function(err, response, body) {
    callback(err, response, body);
  });
}


/* URLの生成 */
function createUrl(path){
  var url = global.config.url;
  if(url.charAt(url.length - 1) != '/'){
    url = url + '/';
  }
  return url + path;
}
