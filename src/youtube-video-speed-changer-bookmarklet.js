/*! 
 * Bookmarklet to change the speed (or playback rate) of YouTube Videos
 * but it should work on any other website with HTML5 video tags
 * 
 * Copyright(c) 2014 Chris Cinelli 
 * MIT Licensed. 
 * 
 * @author: Chris Cinelli
 * 
 * Original code: https://github.com/chriscinelli/youtube-video-speed-change-bookmarlet
 * This code: https://github.com/shtrih/youtube-video-speed-changer-bookmarklet
 */

(function (document, window) {
  const
    defaultSpeed = 100,
    prefix = "_yvscb_",
    lsMemCnst = prefix + "memory",
    controlId = prefix + "control"
  ;

  //Define a pseudo jquery (just for selection)
  function $(selector, ref) {
    return (ref ? ref : document).querySelectorAll(selector);
  }

  //In case I need iframes content
  function iframeRef(frameRef) {
    try {
      return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument;
    } catch (e) {
      console.log("iframe document is not reachable: " + frameRef.src);
      return false;
    }
  }

  let currSpeed = defaultSpeed;

  function getSpeed() {
    return localStorage.getItem(lsMemCnst) || currSpeed;
  }

  function setSpeed(val) {
    currSpeed = val;
    localStorage.setItem(lsMemCnst, val);
  }

  //Normally get the first video in the page
  let currentVideo = $("video")[0];
  if (!currentVideo) {
    //otherwise it tries to get the first video in the iframes
    let iframes = $("iframe");
    if (iframes.length > 0) {
      for (let i = 0; i < iframes.length; i++) {
        let iframeDocument = iframeRef(iframes[i]);
        if (!iframeDocument) {
          continue;
        }
        currentVideo = $("video", iframeDocument)[0]; //First video in the iframe
        if (currentVideo) {
          break;
        }
      }
    }
  }
  if (!currentVideo) {
    //Ugly alert, but seriusly, do we really want to implement a nice styled modal just for this?
    alert("This page does not have any HTML5 videos or they are not reachable!");
    return;
  }

  if (!currentVideo.playbackRate) {
    alert("This browser does not support changes of playback rate on HTML5 videos! Try Google Chrome!");
    return;
  }

  const body = $("body")[0];

  //If the element is already there, then remove it. Toggle effect.
  const oldElement = $("#" + controlId)[0];
  if (oldElement) {
    body.removeChild(oldElement);
    currentVideo.playbackRate = 1; //Also set back to normal the playback rate
    return;
  }

  //Design the element and attach it
  const controller = document.createElement('div'),
    boxSizing = "box-sizing:border-box;",
    stdStyle = ";background-color:#eee;border:1px solid #333;border-radius:3px;margin:2px;" + boxSizing,
    boxStyle = stdStyle + ";padding:2px",
    btnStyle = stdStyle + ";padding:2px 3px"
  ;

  controller.setAttribute("id", controlId);
  controller.innerHTML = '<div style="font:12px monospace;position:fixed;left:2px;top:2px;z-index:2139999999;box-shadow:1px 1px 4px #666' + boxStyle + '">'
    + '<button class="minus" style="' + btnStyle + '">-</button>'
    + '<input type="number" style="border:0;padding:0;background-color:#eee;height:26px;margin:2px;width:100px;' + boxSizing + '" step="5">%'
    + '<button class="plus" style="' + btnStyle + '">+</button>'
    + '<br /><input type="range" style="width:100%;padding:2px;margin:0;' + boxSizing + '" min="10" max="300" step="5" list="tickmarks" />'
    + '<datalist id="tickmarks">\
        <option value="25" label="×0.25"></option>\
        <option value="50" label="×0.5"></option>\
        <option value="75" label="×0.75"></option>\
        <option value="100" label="×1.0"></option>\
        <option value="125" label="×1.25"></option>\
        <option value="150" label="×1.5"></option>\
        <option value="175" label="×1.75"></option>\
        <option value="200" label="×2.0"></option>\
        <option value="225" label="×2.25"></option>\
        <option value="250" label="×2.5"></option>\
        <option value="300" label="×3.0"></option>\
      </datalist>'
    + '</div>';

  body.appendChild(controller);

  const rangeControl = $('input[type=range]', controller)[0],
    speedController = $("input[type=number]", controller)[0];

  //Accelerator to set the speed from the value of the input text
  function updateSpeed(newSpeed) {
    newSpeed = parseInt(newSpeed);

    speedController.value = newSpeed;
    rangeControl.value = newSpeed;
    currentVideo.playbackRate = newSpeed / 100;
    setSpeed(newSpeed);
  }

  rangeControl.addEventListener('input', function (e) {
    updateSpeed(e.target.value);
  });
  speedController.addEventListener('change', function (e) {
    updateSpeed(e.target.value);
  });
  $(".minus", controller)[0].addEventListener('click', function () {
    updateSpeed(parseInt(speedController.value) - 5);
  });
  $(".plus", controller)[0].addEventListener('click', function () {
    updateSpeed(parseInt(speedController.value) + 5);
  });

  //Intialize the speed to the last one or the default
  updateSpeed(getSpeed());
})(document, window);
