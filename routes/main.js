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
 * トップページ・認証機能
 */
"use strict";

var express = require('express');
var router = express.Router();

var util = require('./common/util.js');

var ApiPath = "v1/auth";

/* トップページ　*/
router.get('/', function(req, res){
  res.render('index', {"errorMessage" : null});
});

/* ログイン */
router.post("/login", function(req, res) {

  util.post(ApiPath, req.body, function(err, response, body) {
    if (err || response.statusCode !== 200) {
      res.render('index', {"errorMessage" : "認証時にエラーが発生しました。"});
    } else {
      if(body.result){
        res.render('main', {
          "app_name": global.config.app_name,
          "sid" : body.sid
        });
      }else{
        res.render('index', {"errorMessage" : "認証情報に誤りがあります。"});
      }
    }
  });

});

// 直接アクセスした場合にトップページにリダイレクト
router.get("/login", function(req, res){
  res.redirect(302, "/");
});

module.exports = router;
