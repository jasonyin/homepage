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
import { readFileSync } from 'fs';

const app = express();
app.get('/', function (req, res) {
  // Extract the menu item name from the path and attach it to
  // the request to have it available for template rendering.
  req.item = req.params[0] == undefined ? 'home' : req.params[0];

  // If the request has `?partial`, don't render header and footer.
  let files;
  if ('partial' in req.query) {
    files = [readFileSync(`app/${req.item}/index.html`)];
  } else {
    files = [
      readFileSync('app/header.partial.html'),
      readFileSync(`app/${req.item}/index.html`),
      readFileSync('app/footer.partial.html')
    ];
  }

  res.send(files.join(''));
});

app.get('\/about\/?', function (req, res) {
  res.send('GET request to the about');
});

app.get('\/contact\/?', function (req, res) {
  res.send('GET request to the contact');
});

const port = 8080;
app.listen(port, () => {
  console.log(`license at port ${port}`);
});
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
