# YouTube Video Speed Changer
#### A simple Bookmarklet to change the speed of your video (or playback rate) of YouTube Videos (or any other HTML5 videos)

YouTube Video Speed Changer is an utility that enable you to alter the pace of YouTube videos. Even if it was tested on YouTube,
it is likely to work on other site that use HTML5 video

It works on Google Chrome and  Mozilla Firefox.

Why?
----

Lately you can find more and more lectures on YouTube. These lectures can be very long. Would not be great to watch it at an increased speed?
YouTube let you select some standard multiplicators (x1.5 and x2) out of the box. However for me x2 is too fast and but I can definitely go faster than x1.5
I created this bookmarklet to enable me to have a little more customization. In particular I usually can watch lecture at x1.75 but it ultimately depends on the speaker speed.
This bookmarklet let me easily adjust the speed. I also use it for Coursera's videos.


Installation
------------

The installation is pretty simple. It is a [bookmarklet][wiki-definition]. Manually create a bookmark with this code in URL field: 
```  javascript
   javascript:void((function(){var e=document.createElement('script');e.setAttribute('src','https://shtrih.github.io/youtube-video-speed-changer-bookmarklet/src/youtube-video-speed-changer-bookmarklet.min.js');document.body.appendChild(e)})())
```


Usage
-----

Once it is on your bookmarks, you can click on "Change Speed". A small box shows 
up in the upper left corner. You can use the + or - buttons to increase or
diminish the speed of the video.

Click it again and the small speed box will disappear and the video will go back
to normal speed.


Acknowledgements
----------------

© 2012, Chris Cinelli. Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

YouTube Video Speed Changer is authored and maintained by [Chris Cinelli][cc].

[wiki-definition]: https://en.wikipedia.org/wiki/Bookmarklet
[cc]: http://www.linkedin.com/in/criscinelli
