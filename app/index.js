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
import { createHash } from 'crypto';
import { readFile } from 'mz/fs';
import { compile } from 'handlebars';
var sassMiddleware = require('node-sass-middleware');
var path = require('path');

const app = express();
app.use(
  sassMiddleware({
    src: __dirname + '/miscs/sass',
    dest: path.join(__dirname + '/dist/css'),
    debug: true, // obvious
    force: true,
    prefix: '/styles'
  })
);

app.use('/statics', express.static('app/miscs/statics'));
app.use('/scripts', express.static(path.join(__dirname + '/miscs/js')));

// Matches paths like `/`, `/index.html`, `/about/` or `/about/index.html`.
const toplevelSection = /([^/]*)(\/|\/index.html)$/;
app.get(toplevelSection, function (req, res) {
  // Extract the menu item name from the path and attach it to
  // the request to have it available for template rendering.
  req.item = req.params[0];

  // If the request has `?partial`, don't render header and footer.
  let files;
  if ('partial' in req.query) {
    files = [readFile(`app/${req.item}/index.html`)];
  } else {
    files = [
      readFile('app/header.partial.html'),
      readFile(`app/${req.item}/index.html`),
      readFile('app/footer.partial.html')
    ];
  }

  Promise.all(files)
    .then(files => files.map(f => f.toString('utf-8')))
    .then(files => files.map(f => compile(f)(req)))
    .then(files => {
      const content = files.join('');
      // Let's use sha256 as a means to get an ETag
      const hash = createHash('sha256')
                    .update(content)
                    .digest('hex');

      // set the etag for caching
      res.set({
        'ETag': hash,
        'Cache-Control': 'public, no-cache'
      });

      // set response back
      res.status(200).send(content);
    })
    .catch(error => res.status(500).send(error.toString()));
});

const port = 8080;
app.listen(port, () => {
  console.log(`license at port ${port}`);
});
