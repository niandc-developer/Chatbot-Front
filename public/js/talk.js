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
 * 会話制御
 */

var Talk = {

  // セッションID
  session_id : "",

  // コンテキスト変数
  context : null,

  // 入力
  input : function(input){
    View.loader.show();

    // 入力チェック
    if(input != null && $.trim(input) == ''){
      View.loader.hide();
      return;
    }

    // 入力文字列表示
    if($.trim(input) !== ''){
      View.talk_you(input);
    }

    var data = {
      session_id : this.session_id,
      context : this.context,
      message : {
        inputType : "text",
        inputText : input
      }
    };

    $.ajax(this._getRequestPostInfo("./api/talk/talk", data))
    .done(function(data){
      this.context = data.context;
      View.talk_watson(data.message.displayText);
    }).fail(function(data){
      View.error("接続エラーが発生しました。");
    }).always(function(){
      View.loader.hide();
    });

  },

  // フィードバック（いいね）
  feedbackGood : function(question_id, data_id) {

    var data = {
      session_id : this.session_id,
      context : this.context,
      question_id : question_id,
      data_id : data_id,
      message : {
        inputType : "button",
        inputText : "good"
      }
    };

    $.ajax(this._getRequestPostInfo("./api/talk/feedback", data))
    .done(function(data){
      View.success("「いいね」をフィードバックしました！");
    }).fail(function(data){
      View.error("接続エラーが発生しました。再度実行してください。");
    });

  },

  // フィードバック（回答なし）
  feedbackBad : function(question_id) {

    var data = {
      session_id : this.session_id,
      context : this.context,
      question_id : question_id,
      data_id : null,
      message: {
        inputType : "button",
        inputText : "bad"
      }
    };

    $.ajax(this._getRequestPostInfo("./api/talk/feedback", data))
    .done(function(data){
      View.success("「回答なし」をフィードバックしました！");
    }).fail(function(data){
      View.error("接続エラーが発生しました。再度実行してください。");
    });

  },

  // Conversationと会話を中断
  cancel : function(){

    var data = {
      session_id : this.session_id,
      context: this.context,
      message: {
        inputType : "button",
        inputText : "cancel"
      }
    };

    $.ajax(this._getRequestPostInfo("./api/talk/cancel", data))
    .done(function(data){
      this.context = data.context;
      View.talk_watson(data.message.displayText);
    }).fail(function(data){
      View.error("接続エラーが発生しました。再度実行してください。");
    });

  },

  // 検索モード変更
  change : function(mode,data){

    var data = {
      session_id : this.session_id,
      context: this.context,
      message: {
        inputType : "button",
        inputText : data
      },
      mode: mode
    };

    $.ajax(this._getRequestPostInfo("./api/talk/mode", data))
    .done(function(data){
      this.context = data.context;
      View.talk_watson(data.message.displayText);
    }).fail(function(data){
      View.error("接続エラーが発生しました。再度実行してください。");
    });

  },

  // 接続情報生成
  _getRequestPostInfo : function(path, data){
    var info = {
      url: path,
      data: JSON.stringify(data),
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      context: this,
      timeout: 10000
    };
    return info;
  }

};
