#!/usr/bin/env node --harmony_modules

// Copyright (c) 2016 Jason Yin <jasonyin@outlook.com>
// 
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

'use strict';
import * as express from "express";

const app = express();

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

app.use(express.static('app'));
