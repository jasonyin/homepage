#!/usr/bin/env node


//    Copyright 2016 Jason Yin <jasonyin@outlook.com>
// 
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
// 
//        http://www.apache.org/licenses/LICENSE-2.0
// 
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("test1");
var app = (0, _express2.default)();
console.log("test2");
app.get('/', function (req, res) {
  console.log("test3");
  res.send('GET request to the homepage');
});
console.log("test4");
app.listen(8080);
console.log("test5");
/*
// Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
const toplevelSection = /([^/]*)(\/|\/index.html)$/;
app.get(toplevelSection, (req, res) => {
  const content = files.join('');
    // Let's use sha256 as a means to get an ETag
    const hash = crypto
                  .createHash('sha256')
                  .update(content)
                  .digest('hex');

    res.set({
      'ETag': hash,
      'Cache-Control': 'public, no-cache'
    });
    res.send(content);
});

app.use(express.static('app'));*/