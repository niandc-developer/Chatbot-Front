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

/*
 * API接続を中継
 */
"use strict";

var express = require('express');
var router = express.Router();

var util = require('./common/util.js');

var ApiPath = "v1/";

router.post("/:name", function(req, res) {

  var url = ApiPath + req.params.name;

  util.post(url, req.body, function(err, response, body) {
    if (err || response.statusCode !== 200) {
      console.log("Failed. StatusCode = " + response.statusCode);
      console.log(err);
    } else {
      res.send(body);
    }
  });

});

module.exports = router;
