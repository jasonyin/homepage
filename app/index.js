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
import express from 'express';

const app = express();
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
});

app.listen(8080);
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