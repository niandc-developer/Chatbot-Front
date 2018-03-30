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
"use strict";

// モジュールロード
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// グローバル設定（環境変数）
global.config = {
  url : process.env.LOGIC_URL,
  secure_id : process.env.SECURE_ID,
  app_name : process.env.APP_NAME
};

// Expressの設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 静的コンテンツ
app.use(express.static(__dirname + '/public'));

// HTTPの場合にHTTPSにリダイレクト
// （x-forwarded-protoヘッダが存在する環境のみ）
app.use(function (req, res, next) {
  if(req.headers["x-forwarded-proto"]){
    if(req.headers["x-forwarded-proto"] == "http"){
      res.redirect('https://' + req.headers.host + req.url);
    } else {
      next();
    }
  }else{
    next();
  }
});

// endpoints
app.use("/", require("./routes/main.js"));
app.use("/api/talk/", require("./routes/api-relay.js"));
app.use("/pamph/", require("./routes/file-api-relay.js"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found.');
  err.code = 404;
  err.message = err.message + "[url]" + req.url;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  var error = {
    code: err.code || 500,
    error: err.error || err.message
  };
  console.log('error:', error);

  res.status(error.code).json(error);
});

// server listen
var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log("listening at:", port);
