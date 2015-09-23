# JavaScript Tank War Game

This is a Tank War Game written use JavaScript.
Read the [blog article](http://blog.whlcsj.com/javascript-tank-game.html) about how it works or [try to play](http://blog.whlcsj.com/c/tankwar/index.html).
If you have any suggestion or bug to post, [click here](https://github.com/markliu2013/tank-war/issues/new).

I built my own [jQuery library](https://github.com/markliu2013/tank-war/blob/master/js/jQuery.js) in this project. [How to build your own js library?](http://net.tutsplus.com/tutorials/javascript-ajax/build-your-first-javascript-library/)

## Installing
This is only static html files, it is very easy to install. You don't even need a web server like apache or tomcat to run.
Just [download](https://github.com/markliu2013/tank-war/archive/master.zip) the files, open index.html with your browser application, we suggest [Chrome](https://www.google.com/chrome/browser/).

## Building GruntJS Task
GruntJS is a JavaScript Task Runner, there are many plugins can help you make your project from development to production.
I have created a grunt file, contains min css and javascript, change html link, deploy to server.
How to run GruntJS?
Firstly, you need install [nodejs >= 0.8.0](http://nodejs.org/download/).
```sh
  $ npm install -g grunt-cli
  $ git clone https://github.com/markliu2013/tank-war.git
  $ cd tank-war
  $ npm install
  $ grunt #compile all files
  $ grunt deploy  #compile and deploy
```
**NOTE:** You should change the ftp configuration.

## Grunt Plugin List :
1. [grunt-contrib-concat](https://www.npmjs.org/package/grunt-contrib-concat)
2. [grunt-contrib-cssmin](https://www.npmjs.org/package/grunt-contrib-cssmin)
3. [grunt-contrib-uglify](https://www.npmjs.org/package/grunt-contrib-uglify)
4. [grunt-processhtml](https://www.npmjs.org/package/grunt-processhtml)
5. [grunt-contrib-htmlmin](https://www.npmjs.org/package/grunt-contrib-htmlmin)
6. [grunt-contrib-clean](https://npmjs.org/package/grunt-contrib-clean)
7. [grunt-contrib-watch](https://www.npmjs.org/package/grunt-contrib-watch)
8. [grunt-ftpush](https://www.npmjs.org/package/grunt-ftpush)


## Browser Supported
Your browser should support [document.querySelectorAll](https://developer.mozilla.org/en/docs/Web/API/Document.querySelectorAll) :
- [Chrome](https://www.google.com/chrome/browser/)
- [IE9+](http://www.microsoft.com/en-us/download/internet-explorer-10-details.aspx)
- [Firefox](https://www.mozilla.org/en-US/firefox/new/)
- [Safari](https://www.apple.com/safari/)
- [Opera](http://www.opera.com/)

## License
(The MIT License)

Copyright (c) 2014 Mark Liu < [markliu2013@gmail.com](mailto:markliu2013@gmail.com) >

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
