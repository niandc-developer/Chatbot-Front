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
 * ファイル転送APIの接続を中継
 */
"use strict";

var express = require("express");
var request = require("request");
var router = express.Router();

var ApiPath = "v1/file";

router.get("/:id/:name", function(req, res) {

  var url = ApiPath + "/" + req.params.id + "/" + req.params.name;

  var options = {
      url: global.config.url + url,
      headers: {
          "X-SECURE-ID" : global.config.secure_id
      }
  };

  request.get(options).pipe(res);

});

module.exports = router;
