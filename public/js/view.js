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
 * 表示制御
 */

var View = {
  // Loader
  loader : $("#loader"),

  // watson側出力
  talk_watson : function(text){
    this._talk("WATSON", text);
  },

  // ユーザ側出力
  talk_you : function(text){
    this._talk("YOU", text);
    this.clearInput();
  },

  // 入力エリア初期化
  clearInput : function(){
    $('.chat-window--message-input').val('');
  },

  // メッセージ出力
  success : function(message){
    alert(message);
  },

  // エラー出力
  error : function(errorMessage){
    alert(errorMessage);
  },

  // 出力共通
  _talk : function(origin, text){
    var $box = null;
    if($.isArray(text)){
      var that = this;
      $.each(text, function(index, val){
        if(!$box){
          $box = that._talk_one(origin, val);
        }else{
          that._talk_one(origin, val);
        }
      });
    }else{
      $box = this._talk_one(origin, text);
    }
    View._scroll($box);
  },

  // 出力共通（1ブロック）
  _talk_one : function(origin, text){
    var $chatBox = $('.chat-box--item_' + origin, "#template").clone();
    var $loading = $('.loader');
    $chatBox.find('div.message').html(text);
    $chatBox.insertBefore($loading);
    $chatBox.removeClass('chat-box--item_HIDDEN');
    return $chatBox;
  },

  // スクロール制御
  _scroll : function($box){
    var element = $('.chat-box--pane');
    element.animate({
        scrollTop: $box[0].offsetTop-100
    }, 'easeInQuint');
    $('.chat-window-input').focus();
  }

};
