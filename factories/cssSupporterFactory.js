App.factory('cssSupporter', function() {

  function browser() {
    var ua = navigator.userAgent;
    if (contains(ua, 'Firefox') && !contains(ua, 'Seamonkey')) {
      return 'firefox';
    } else if (contains(ua, 'Seamonkey')) {
      return 'Seamonkey';
    } else if (contains(ua, 'Chrome') && !contains(ua, 'Chromium')) {
      return 'chrome';
    } else if (contains(ua, 'Chromium')) {
      return 'chromium';
    } else if (contains(ua, 'Safari') && !contains(ua, 'Chrome') || !contains(ua, 'Chromium')) {
      return 'safari';
    } else if (contains(ua, 'OPR') || contains(ua, 'Opera')) {
      return 'opera';
    } else if (contains(ua, ';MSIE')) {
      return 'explorer';
    }
  }

  function engine() {
    var b = browser();
    if (contains(b, 'chrome') || contains(b, 'safari') || contains(b, 'chromium')) {
      return '-webkit-';
    } else if (contains(b, 'firefox')) {
      return '-moz-';
    } else if (contains(b, 'opera')) {
      return '-o-';
    } else if (contains(b, 'explorer')) {
      return '-ms-';
    }
  }

  function contains(val, string) {
    return (val.search(string) > -1);
  }

  return {
    propertySupporter: function(property) {
      if (property in document.body.style) {
        return property;
      }
      var eng = engine();
      if (eng+property in document.body.style) {
        return eng+property;
      }
      return false;
    },
    browser: browser,
    engine: engine
  };
});
