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
 * 初期処理
 */

"use strict";

$(document).ready(function() {

  // 入力エリア
  var $chatInput = $('.chat-window-input');

  // イベントバインド
  /*
  $chatInput.change(function() {
    Talk.input($(this).val());
  });
  */
  $chatInput.keypress(function(event) {
    if(event.keyCode=='13'){
      Talk.input($(this).val());
    }
  });

  // セッションID取得
  Talk.session_id = $("#session_id").val();

  // 入力エリアにフォーカス移動
  $chatInput.focus();

  // 初期メッセージ表示
  Talk.input();

});
