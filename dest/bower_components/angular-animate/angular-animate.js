/*! flatmate-client 2015-10-01 */
!function(window, angular, undefined) {
    "use strict";
    function assertArg(arg, name, reason) {
        if (!arg) throw ngMinErr("areq", "Argument '{0}' is {1}", name || "?", reason || "required");
        return arg;
    }
    function mergeClasses(a, b) {
        return a || b ? a ? b ? (isArray(a) && (a = a.join(" ")), isArray(b) && (b = b.join(" ")), 
        a + " " + b) : a : b : "";
    }
    function packageStyles(options) {
        var styles = {};
        return options && (options.to || options.from) && (styles.to = options.to, styles.from = options.from), 
        styles;
    }
    function pendClasses(classes, fix, isPrefix) {
        var className = "";
        return classes = isArray(classes) ? classes : classes && isString(classes) && classes.length ? classes.split(/\s+/) : [], 
        forEach(classes, function(klass, i) {
            klass && klass.length > 0 && (className += i > 0 ? " " : "", className += isPrefix ? fix + klass : klass + fix);
        }), className;
    }
    function removeFromArray(arr, val) {
        var index = arr.indexOf(val);
        val >= 0 && arr.splice(index, 1);
    }
    function stripCommentsFromElement(element) {
        if (element instanceof jqLite) switch (element.length) {
          case 0:
            return [];

          case 1:
            if (element[0].nodeType === ELEMENT_NODE) return element;
            break;

          default:
            return jqLite(extractElementNode(element));
        }
        return element.nodeType === ELEMENT_NODE ? jqLite(element) : void 0;
    }
    function extractElementNode(element) {
        if (!element[0]) return element;
        for (var i = 0; i < element.length; i++) {
            var elm = element[i];
            if (elm.nodeType == ELEMENT_NODE) return elm;
        }
    }
    function $$addClass($$jqLite, element, className) {
        forEach(element, function(elm) {
            $$jqLite.addClass(elm, className);
        });
    }
    function $$removeClass($$jqLite, element, className) {
        forEach(element, function(elm) {
            $$jqLite.removeClass(elm, className);
        });
    }
    function applyAnimationClassesFactory($$jqLite) {
        return function(element, options) {
            options.addClass && ($$addClass($$jqLite, element, options.addClass), options.addClass = null), 
            options.removeClass && ($$removeClass($$jqLite, element, options.removeClass), options.removeClass = null);
        };
    }
    function prepareAnimationOptions(options) {
        if (options = options || {}, !options.$$prepared) {
            var domOperation = options.domOperation || noop;
            options.domOperation = function() {
                options.$$domOperationFired = !0, domOperation(), domOperation = noop;
            }, options.$$prepared = !0;
        }
        return options;
    }
    function applyAnimationStyles(element, options) {
        applyAnimationFromStyles(element, options), applyAnimationToStyles(element, options);
    }
    function applyAnimationFromStyles(element, options) {
        options.from && (element.css(options.from), options.from = null);
    }
    function applyAnimationToStyles(element, options) {
        options.to && (element.css(options.to), options.to = null);
    }
    function mergeAnimationOptions(element, target, newOptions) {
        var toAdd = (target.addClass || "") + " " + (newOptions.addClass || ""), toRemove = (target.removeClass || "") + " " + (newOptions.removeClass || ""), classes = resolveElementClasses(element.attr("class"), toAdd, toRemove);
        newOptions.preparationClasses && (target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses), 
        delete newOptions.preparationClasses);
        var realDomOperation = target.domOperation !== noop ? target.domOperation : null;
        return extend(target, newOptions), realDomOperation && (target.domOperation = realDomOperation), 
        classes.addClass ? target.addClass = classes.addClass : target.addClass = null, 
        classes.removeClass ? target.removeClass = classes.removeClass : target.removeClass = null, 
        target;
    }
    function resolveElementClasses(existing, toAdd, toRemove) {
        function splitClassesToLookup(classes) {
            isString(classes) && (classes = classes.split(" "));
            var obj = {};
            return forEach(classes, function(klass) {
                klass.length && (obj[klass] = !0);
            }), obj;
        }
        var ADD_CLASS = 1, REMOVE_CLASS = -1, flags = {};
        existing = splitClassesToLookup(existing), toAdd = splitClassesToLookup(toAdd), 
        forEach(toAdd, function(value, key) {
            flags[key] = ADD_CLASS;
        }), toRemove = splitClassesToLookup(toRemove), forEach(toRemove, function(value, key) {
            flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;
        });
        var classes = {
            addClass: "",
            removeClass: ""
        };
        return forEach(flags, function(val, klass) {
            var prop, allow;
            val === ADD_CLASS ? (prop = "addClass", allow = !existing[klass]) : val === REMOVE_CLASS && (prop = "removeClass", 
            allow = existing[klass]), allow && (classes[prop].length && (classes[prop] += " "), 
            classes[prop] += klass);
        }), classes;
    }
    function getDomNode(element) {
        return element instanceof angular.element ? element[0] : element;
    }
    function applyGeneratedPreparationClasses(element, event, options) {
        var classes = "";
        event && (classes = pendClasses(event, EVENT_CLASS_PREFIX, !0)), options.addClass && (classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX))), 
        options.removeClass && (classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX))), 
        classes.length && (options.preparationClasses = classes, element.addClass(classes));
    }
    function clearGeneratedClasses(element, options) {
        options.preparationClasses && (element.removeClass(options.preparationClasses), 
        options.preparationClasses = null), options.activeClasses && (element.removeClass(options.activeClasses), 
        options.activeClasses = null);
    }
    function blockTransitions(node, duration) {
        var value = duration ? "-" + duration + "s" : "";
        return applyInlineStyle(node, [ TRANSITION_DELAY_PROP, value ]), [ TRANSITION_DELAY_PROP, value ];
    }
    function blockKeyframeAnimations(node, applyBlock) {
        var value = applyBlock ? "paused" : "", key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;
        return applyInlineStyle(node, [ key, value ]), [ key, value ];
    }
    function applyInlineStyle(node, styleTuple) {
        var prop = styleTuple[0], value = styleTuple[1];
        node.style[prop] = value;
    }
    function concatWithSpace(a, b) {
        return a ? b ? a + " " + b : a : b;
    }
    function $$BodyProvider() {
        this.$get = [ "$document", function($document) {
            return jqLite($document[0].body);
        } ];
    }
    function getCssKeyframeDurationStyle(duration) {
        return [ ANIMATION_DURATION_PROP, duration + "s" ];
    }
    function getCssDelayStyle(delay, isKeyframeAnimation) {
        var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;
        return [ prop, delay + "s" ];
    }
    function computeCssStyles($window, element, properties) {
        var styles = Object.create(null), detectedStyles = $window.getComputedStyle(element) || {};
        return forEach(properties, function(formalStyleName, actualStyleName) {
            var val = detectedStyles[formalStyleName];
            if (val) {
                var c = val.charAt(0);
                ("-" === c || "+" === c || c >= 0) && (val = parseMaxTime(val)), 0 === val && (val = null), 
                styles[actualStyleName] = val;
            }
        }), styles;
    }
    function parseMaxTime(str) {
        var maxValue = 0, values = str.split(/\s*,\s*/);
        return forEach(values, function(value) {
            "s" == value.charAt(value.length - 1) && (value = value.substring(0, value.length - 1)), 
            value = parseFloat(value) || 0, maxValue = maxValue ? Math.max(value, maxValue) : value;
        }), maxValue;
    }
    function truthyTimingValue(val) {
        return 0 === val || null != val;
    }
    function getCssTransitionDurationStyle(duration, applyOnlyDuration) {
        var style = TRANSITION_PROP, value = duration + "s";
        return applyOnlyDuration ? style += DURATION_KEY : value += " linear all", [ style, value ];
    }
    function createLocalCacheLookup() {
        var cache = Object.create(null);
        return {
            flush: function() {
                cache = Object.create(null);
            },
            count: function(key) {
                var entry = cache[key];
                return entry ? entry.total : 0;
            },
            get: function(key) {
                var entry = cache[key];
                return entry && entry.value;
            },
            put: function(key, value) {
                cache[key] ? cache[key].total++ : cache[key] = {
                    total: 1,
                    value: value
                };
            }
        };
    }
    var TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT, noop = angular.noop, extend = angular.extend, jqLite = angular.element, forEach = angular.forEach, isArray = angular.isArray, isString = angular.isString, isObject = angular.isObject, isUndefined = angular.isUndefined, isDefined = angular.isDefined, isFunction = angular.isFunction, isElement = angular.isElement, ELEMENT_NODE = 1, ADD_CLASS_SUFFIX = "-add", REMOVE_CLASS_SUFFIX = "-remove", EVENT_CLASS_PREFIX = "ng-", ACTIVE_CLASS_SUFFIX = "-active", NG_ANIMATE_CLASSNAME = "ng-animate", NG_ANIMATE_CHILDREN_DATA = "$$ngAnimateChildren", CSS_PREFIX = "";
    window.ontransitionend === undefined && window.onwebkittransitionend !== undefined ? (CSS_PREFIX = "-webkit-", 
    TRANSITION_PROP = "WebkitTransition", TRANSITIONEND_EVENT = "webkitTransitionEnd transitionend") : (TRANSITION_PROP = "transition", 
    TRANSITIONEND_EVENT = "transitionend"), window.onanimationend === undefined && window.onwebkitanimationend !== undefined ? (CSS_PREFIX = "-webkit-", 
    ANIMATION_PROP = "WebkitAnimation", ANIMATIONEND_EVENT = "webkitAnimationEnd animationend") : (ANIMATION_PROP = "animation", 
    ANIMATIONEND_EVENT = "animationend");
    var DURATION_KEY = "Duration", PROPERTY_KEY = "Property", DELAY_KEY = "Delay", TIMING_KEY = "TimingFunction", ANIMATION_ITERATION_COUNT_KEY = "IterationCount", ANIMATION_PLAYSTATE_KEY = "PlayState", SAFE_FAST_FORWARD_DURATION_VALUE = 9999, ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY, ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY, TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY, TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY, $$rAFSchedulerFactory = [ "$$rAF", function($$rAF) {
        function scheduler(tasks) {
            queue = queue.concat(tasks), nextTick();
        }
        function nextTick() {
            if (queue.length) {
                for (var items = queue.shift(), i = 0; i < items.length; i++) items[i]();
                cancelFn || $$rAF(function() {
                    cancelFn || nextTick();
                });
            }
        }
        var queue, cancelFn;
        return queue = scheduler.queue = [], scheduler.waitUntilQuiet = function(fn) {
            cancelFn && cancelFn(), cancelFn = $$rAF(function() {
                cancelFn = null, fn(), nextTick();
            });
        }, scheduler;
    } ], $$AnimateChildrenDirective = [ function() {
        return function(scope, element, attrs) {
            var val = attrs.ngAnimateChildren;
            angular.isString(val) && 0 === val.length ? element.data(NG_ANIMATE_CHILDREN_DATA, !0) : attrs.$observe("ngAnimateChildren", function(value) {
                value = "on" === value || "true" === value, element.data(NG_ANIMATE_CHILDREN_DATA, value);
            });
        };
    } ], ANIMATE_TIMER_KEY = "$$animateCss", ONE_SECOND = 1e3, ELAPSED_TIME_MAX_DECIMAL_PLACES = 3, CLOSING_TIME_BUFFER = 1.5, DETECT_CSS_PROPERTIES = {
        transitionDuration: TRANSITION_DURATION_PROP,
        transitionDelay: TRANSITION_DELAY_PROP,
        transitionProperty: TRANSITION_PROP + PROPERTY_KEY,
        animationDuration: ANIMATION_DURATION_PROP,
        animationDelay: ANIMATION_DELAY_PROP,
        animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY
    }, DETECT_STAGGER_CSS_PROPERTIES = {
        transitionDuration: TRANSITION_DURATION_PROP,
        transitionDelay: TRANSITION_DELAY_PROP,
        animationDuration: ANIMATION_DURATION_PROP,
        animationDelay: ANIMATION_DELAY_PROP
    }, $AnimateCssProvider = [ "$animateProvider", function($animateProvider) {
        var gcsLookup = createLocalCacheLookup(), gcsStaggerLookup = createLocalCacheLookup();
        this.$get = [ "$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$animate", function($window, $$jqLite, $$AnimateRunner, $timeout, $$forceReflow, $sniffer, $$rAFScheduler, $animate) {
            function gcsHashFn(node, extraClasses) {
                var KEY = "$$ngAnimateParentKey", parentNode = node.parentNode, parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);
                return parentID + "-" + node.getAttribute("class") + "-" + extraClasses;
            }
            function computeCachedCssStyles(node, className, cacheKey, properties) {
                var timings = gcsLookup.get(cacheKey);
                return timings || (timings = computeCssStyles($window, node, properties), "infinite" === timings.animationIterationCount && (timings.animationIterationCount = 1)), 
                gcsLookup.put(cacheKey, timings), timings;
            }
            function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {
                var stagger;
                if (gcsLookup.count(cacheKey) > 0 && (stagger = gcsStaggerLookup.get(cacheKey), 
                !stagger)) {
                    var staggerClassName = pendClasses(className, "-stagger");
                    $$jqLite.addClass(node, staggerClassName), stagger = computeCssStyles($window, node, properties), 
                    stagger.animationDuration = Math.max(stagger.animationDuration, 0), stagger.transitionDuration = Math.max(stagger.transitionDuration, 0), 
                    $$jqLite.removeClass(node, staggerClassName), gcsStaggerLookup.put(cacheKey, stagger);
                }
                return stagger || {};
            }
            function waitUntilQuiet(callback) {
                rafWaitQueue.push(callback), $$rAFScheduler.waitUntilQuiet(function() {
                    gcsLookup.flush(), gcsStaggerLookup.flush();
                    for (var pageWidth = $$forceReflow(), i = 0; i < rafWaitQueue.length; i++) rafWaitQueue[i](pageWidth);
                    rafWaitQueue.length = 0;
                });
            }
            function computeTimings(node, className, cacheKey) {
                var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES), aD = timings.animationDelay, tD = timings.transitionDelay;
                return timings.maxDelay = aD && tD ? Math.max(aD, tD) : aD || tD, timings.maxDuration = Math.max(timings.animationDuration * timings.animationIterationCount, timings.transitionDuration), 
                timings;
            }
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite), parentCounter = 0, rafWaitQueue = [];
            return function(element, options) {
                function endFn() {
                    close();
                }
                function cancelFn() {
                    close(!0);
                }
                function close(rejected) {
                    animationClosed || animationCompleted && animationPaused || (animationClosed = !0, 
                    animationPaused = !1, options.$$skipPreparationClasses || $$jqLite.removeClass(element, preparationClasses), 
                    $$jqLite.removeClass(element, activeClasses), blockKeyframeAnimations(node, !1), 
                    blockTransitions(node, !1), forEach(temporaryStyles, function(entry) {
                        node.style[entry[0]] = "";
                    }), applyAnimationClasses(element, options), applyAnimationStyles(element, options), 
                    options.onDone && options.onDone(), runner && runner.complete(!rejected));
                }
                function applyBlocking(duration) {
                    flags.blockTransition && blockTransitions(node, duration), flags.blockKeyframeAnimation && blockKeyframeAnimations(node, !!duration);
                }
                function closeAndReturnNoopAnimator() {
                    return runner = new $$AnimateRunner({
                        end: endFn,
                        cancel: cancelFn
                    }), waitUntilQuiet(noop), close(), {
                        $$willAnimate: !1,
                        start: function() {
                            return runner;
                        },
                        end: endFn
                    };
                }
                function start() {
                    function triggerAnimationStart() {
                        if (!animationClosed) {
                            if (applyBlocking(!1), forEach(temporaryStyles, function(entry) {
                                var key = entry[0], value = entry[1];
                                node.style[key] = value;
                            }), applyAnimationClasses(element, options), $$jqLite.addClass(element, activeClasses), 
                            flags.recalculateTimingStyles) {
                                if (fullClassName = node.className + " " + preparationClasses, cacheKey = gcsHashFn(node, fullClassName), 
                                timings = computeTimings(node, fullClassName, cacheKey), relativeDelay = timings.maxDelay, 
                                maxDelay = Math.max(relativeDelay, 0), maxDuration = timings.maxDuration, 0 === maxDuration) return void close();
                                flags.hasTransitions = timings.transitionDuration > 0, flags.hasAnimations = timings.animationDuration > 0;
                            }
                            if (flags.applyAnimationDelay && (relativeDelay = "boolean" != typeof options.delay && truthyTimingValue(options.delay) ? parseFloat(options.delay) : relativeDelay, 
                            maxDelay = Math.max(relativeDelay, 0), timings.animationDelay = relativeDelay, delayStyle = getCssDelayStyle(relativeDelay, !0), 
                            temporaryStyles.push(delayStyle), node.style[delayStyle[0]] = delayStyle[1]), maxDelayTime = maxDelay * ONE_SECOND, 
                            maxDurationTime = maxDuration * ONE_SECOND, options.easing) {
                                var easeProp, easeVal = options.easing;
                                flags.hasTransitions && (easeProp = TRANSITION_PROP + TIMING_KEY, temporaryStyles.push([ easeProp, easeVal ]), 
                                node.style[easeProp] = easeVal), flags.hasAnimations && (easeProp = ANIMATION_PROP + TIMING_KEY, 
                                temporaryStyles.push([ easeProp, easeVal ]), node.style[easeProp] = easeVal);
                            }
                            timings.transitionDuration && events.push(TRANSITIONEND_EVENT), timings.animationDuration && events.push(ANIMATIONEND_EVENT), 
                            startTime = Date.now();
                            var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime, endTime = startTime + timerTime, animationsData = element.data(ANIMATE_TIMER_KEY) || [], setupFallbackTimer = !0;
                            if (animationsData.length) {
                                var currentTimerData = animationsData[0];
                                setupFallbackTimer = endTime > currentTimerData.expectedEndTime, setupFallbackTimer ? $timeout.cancel(currentTimerData.timer) : animationsData.push(close);
                            }
                            if (setupFallbackTimer) {
                                var timer = $timeout(onAnimationExpired, timerTime, !1);
                                animationsData[0] = {
                                    timer: timer,
                                    expectedEndTime: endTime
                                }, animationsData.push(close), element.data(ANIMATE_TIMER_KEY, animationsData);
                            }
                            element.on(events.join(" "), onAnimationProgress), applyAnimationToStyles(element, options);
                        }
                    }
                    function onAnimationExpired() {
                        var animationsData = element.data(ANIMATE_TIMER_KEY);
                        if (animationsData) {
                            for (var i = 1; i < animationsData.length; i++) animationsData[i]();
                            element.removeData(ANIMATE_TIMER_KEY);
                        }
                    }
                    function onAnimationProgress(event) {
                        event.stopPropagation();
                        var ev = event.originalEvent || event, timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now(), elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));
                        Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration && (animationCompleted = !0, 
                        close());
                    }
                    if (!animationClosed) {
                        if (!node.parentNode) return void close();
                        var startTime, events = [], playPause = function(playAnimation) {
                            if (animationCompleted) animationPaused && playAnimation && (animationPaused = !1, 
                            close()); else if (animationPaused = !playAnimation, timings.animationDuration) {
                                var value = blockKeyframeAnimations(node, animationPaused);
                                animationPaused ? temporaryStyles.push(value) : removeFromArray(temporaryStyles, value);
                            }
                        }, maxStagger = itemIndex > 0 && (timings.transitionDuration && 0 === stagger.transitionDuration || timings.animationDuration && 0 === stagger.animationDuration) && Math.max(stagger.animationDelay, stagger.transitionDelay);
                        maxStagger ? $timeout(triggerAnimationStart, Math.floor(maxStagger * itemIndex * ONE_SECOND), !1) : triggerAnimationStart(), 
                        runnerHost.resume = function() {
                            playPause(!0);
                        }, runnerHost.pause = function() {
                            playPause(!1);
                        };
                    }
                }
                var node = getDomNode(element);
                if (!node || !node.parentNode || !$animate.enabled()) return closeAndReturnNoopAnimator();
                options = prepareAnimationOptions(options);
                var animationClosed, animationPaused, animationCompleted, runner, runnerHost, maxDelay, maxDelayTime, maxDuration, maxDurationTime, temporaryStyles = [], classes = element.attr("class"), styles = packageStyles(options);
                if (0 === options.duration || !$sniffer.animations && !$sniffer.transitions) return closeAndReturnNoopAnimator();
                var method = options.event && isArray(options.event) ? options.event.join(" ") : options.event, isStructural = method && options.structural, structuralClassName = "", addRemoveClassName = "";
                isStructural ? structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, !0) : method && (structuralClassName = method), 
                options.addClass && (addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX)), 
                options.removeClass && (addRemoveClassName.length && (addRemoveClassName += " "), 
                addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX)), options.applyClassesEarly && addRemoveClassName.length && applyAnimationClasses(element, options);
                var preparationClasses = [ structuralClassName, addRemoveClassName ].join(" ").trim(), fullClassName = classes + " " + preparationClasses, activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX), hasToStyles = styles.to && Object.keys(styles.to).length > 0, containsKeyframeAnimation = (options.keyframeStyle || "").length > 0;
                if (!containsKeyframeAnimation && !hasToStyles && !preparationClasses) return closeAndReturnNoopAnimator();
                var cacheKey, stagger;
                if (options.stagger > 0) {
                    var staggerVal = parseFloat(options.stagger);
                    stagger = {
                        transitionDelay: staggerVal,
                        animationDelay: staggerVal,
                        transitionDuration: 0,
                        animationDuration: 0
                    };
                } else cacheKey = gcsHashFn(node, fullClassName), stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);
                options.$$skipPreparationClasses || $$jqLite.addClass(element, preparationClasses);
                var applyOnlyDuration;
                if (options.transitionStyle) {
                    var transitionStyle = [ TRANSITION_PROP, options.transitionStyle ];
                    applyInlineStyle(node, transitionStyle), temporaryStyles.push(transitionStyle);
                }
                if (options.duration >= 0) {
                    applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;
                    var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);
                    applyInlineStyle(node, durationStyle), temporaryStyles.push(durationStyle);
                }
                if (options.keyframeStyle) {
                    var keyframeStyle = [ ANIMATION_PROP, options.keyframeStyle ];
                    applyInlineStyle(node, keyframeStyle), temporaryStyles.push(keyframeStyle);
                }
                var itemIndex = stagger ? options.staggerIndex >= 0 ? options.staggerIndex : gcsLookup.count(cacheKey) : 0, isFirst = 0 === itemIndex;
                isFirst && !options.skipBlocking && blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);
                var timings = computeTimings(node, fullClassName, cacheKey), relativeDelay = timings.maxDelay;
                maxDelay = Math.max(relativeDelay, 0), maxDuration = timings.maxDuration;
                var flags = {};
                if (flags.hasTransitions = timings.transitionDuration > 0, flags.hasAnimations = timings.animationDuration > 0, 
                flags.hasTransitionAll = flags.hasTransitions && "all" == timings.transitionProperty, 
                flags.applyTransitionDuration = hasToStyles && (flags.hasTransitions && !flags.hasTransitionAll || flags.hasAnimations && !flags.hasTransitions), 
                flags.applyAnimationDuration = options.duration && flags.hasAnimations, flags.applyTransitionDelay = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions), 
                flags.applyAnimationDelay = truthyTimingValue(options.delay) && flags.hasAnimations, 
                flags.recalculateTimingStyles = addRemoveClassName.length > 0, (flags.applyTransitionDuration || flags.applyAnimationDuration) && (maxDuration = options.duration ? parseFloat(options.duration) : maxDuration, 
                flags.applyTransitionDuration && (flags.hasTransitions = !0, timings.transitionDuration = maxDuration, 
                applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0, temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration))), 
                flags.applyAnimationDuration && (flags.hasAnimations = !0, timings.animationDuration = maxDuration, 
                temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration)))), 0 === maxDuration && !flags.recalculateTimingStyles) return closeAndReturnNoopAnimator();
                if (null != options.delay) {
                    var delayStyle = parseFloat(options.delay);
                    flags.applyTransitionDelay && temporaryStyles.push(getCssDelayStyle(delayStyle)), 
                    flags.applyAnimationDelay && temporaryStyles.push(getCssDelayStyle(delayStyle, !0));
                }
                return null == options.duration && timings.transitionDuration > 0 && (flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst), 
                maxDelayTime = maxDelay * ONE_SECOND, maxDurationTime = maxDuration * ONE_SECOND, 
                options.skipBlocking || (flags.blockTransition = timings.transitionDuration > 0, 
                flags.blockKeyframeAnimation = timings.animationDuration > 0 && stagger.animationDelay > 0 && 0 === stagger.animationDuration), 
                applyAnimationFromStyles(element, options), flags.blockTransition || flags.blockKeyframeAnimation ? applyBlocking(maxDuration) : options.skipBlocking || blockTransitions(node, !1), 
                {
                    $$willAnimate: !0,
                    end: endFn,
                    start: function() {
                        return animationClosed ? void 0 : (runnerHost = {
                            end: endFn,
                            cancel: cancelFn,
                            resume: null,
                            pause: null
                        }, runner = new $$AnimateRunner(runnerHost), waitUntilQuiet(start), runner);
                    }
                };
            };
        } ];
    } ], $$AnimateCssDriverProvider = [ "$$animationProvider", function($$animationProvider) {
        $$animationProvider.drivers.push("$$animateCssDriver");
        var NG_ANIMATE_SHIM_CLASS_NAME = "ng-animate-shim", NG_ANIMATE_ANCHOR_CLASS_NAME = "ng-anchor", NG_OUT_ANCHOR_CLASS_NAME = "ng-anchor-out", NG_IN_ANCHOR_CLASS_NAME = "ng-anchor-in";
        this.$get = [ "$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$$body", "$sniffer", "$$jqLite", function($animateCss, $rootScope, $$AnimateRunner, $rootElement, $$body, $sniffer, $$jqLite) {
            function filterCssClasses(classes) {
                return classes.replace(/\bng-\S+\b/g, "");
            }
            function getUniqueValues(a, b) {
                return isString(a) && (a = a.split(" ")), isString(b) && (b = b.split(" ")), a.filter(function(val) {
                    return -1 === b.indexOf(val);
                }).join(" ");
            }
            function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {
                function calculateAnchorStyles(anchor) {
                    var styles = {}, coords = getDomNode(anchor).getBoundingClientRect();
                    return forEach([ "width", "height", "top", "left" ], function(key) {
                        var value = coords[key];
                        switch (key) {
                          case "top":
                            value += bodyNode.scrollTop;
                            break;

                          case "left":
                            value += bodyNode.scrollLeft;
                        }
                        styles[key] = Math.floor(value) + "px";
                    }), styles;
                }
                function prepareOutAnimation() {
                    var animator = $animateCss(clone, {
                        addClass: NG_OUT_ANCHOR_CLASS_NAME,
                        delay: !0,
                        from: calculateAnchorStyles(outAnchor)
                    });
                    return animator.$$willAnimate ? animator : null;
                }
                function getClassVal(element) {
                    return element.attr("class") || "";
                }
                function prepareInAnimation() {
                    var endingClasses = filterCssClasses(getClassVal(inAnchor)), toAdd = getUniqueValues(endingClasses, startingClasses), toRemove = getUniqueValues(startingClasses, endingClasses), animator = $animateCss(clone, {
                        to: calculateAnchorStyles(inAnchor),
                        addClass: NG_IN_ANCHOR_CLASS_NAME + " " + toAdd,
                        removeClass: NG_OUT_ANCHOR_CLASS_NAME + " " + toRemove,
                        delay: !0
                    });
                    return animator.$$willAnimate ? animator : null;
                }
                function end() {
                    clone.remove(), outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME), inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);
                }
                var clone = jqLite(getDomNode(outAnchor).cloneNode(!0)), startingClasses = filterCssClasses(getClassVal(clone));
                outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME), inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME), 
                clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME), rootBodyElement.append(clone);
                var animatorIn, animatorOut = prepareOutAnimation();
                if (!animatorOut && (animatorIn = prepareInAnimation(), !animatorIn)) return end();
                var startingAnimator = animatorOut || animatorIn;
                return {
                    start: function() {
                        function endFn() {
                            currentAnimation && currentAnimation.end();
                        }
                        var runner, currentAnimation = startingAnimator.start();
                        return currentAnimation.done(function() {
                            return currentAnimation = null, !animatorIn && (animatorIn = prepareInAnimation()) ? (currentAnimation = animatorIn.start(), 
                            currentAnimation.done(function() {
                                currentAnimation = null, end(), runner.complete();
                            }), currentAnimation) : (end(), void runner.complete());
                        }), runner = new $$AnimateRunner({
                            end: endFn,
                            cancel: endFn
                        });
                    }
                };
            }
            function prepareFromToAnchorAnimation(from, to, classes, anchors) {
                var fromAnimation = prepareRegularAnimation(from, noop), toAnimation = prepareRegularAnimation(to, noop), anchorAnimations = [];
                return forEach(anchors, function(anchor) {
                    var outElement = anchor.out, inElement = anchor["in"], animator = prepareAnchoredAnimation(classes, outElement, inElement);
                    animator && anchorAnimations.push(animator);
                }), fromAnimation || toAnimation || 0 !== anchorAnimations.length ? {
                    start: function() {
                        function endFn() {
                            forEach(animationRunners, function(runner) {
                                runner.end();
                            });
                        }
                        var animationRunners = [];
                        fromAnimation && animationRunners.push(fromAnimation.start()), toAnimation && animationRunners.push(toAnimation.start()), 
                        forEach(anchorAnimations, function(animation) {
                            animationRunners.push(animation.start());
                        });
                        var runner = new $$AnimateRunner({
                            end: endFn,
                            cancel: endFn
                        });
                        return $$AnimateRunner.all(animationRunners, function(status) {
                            runner.complete(status);
                        }), runner;
                    }
                } : void 0;
            }
            function prepareRegularAnimation(animationDetails) {
                var element = animationDetails.element, options = animationDetails.options || {};
                animationDetails.structural && (options.event = animationDetails.event, options.structural = !0, 
                options.applyClassesEarly = !0, "leave" === animationDetails.event && (options.onDone = options.domOperation)), 
                options.preparationClasses && (options.event = concatWithSpace(options.event, options.preparationClasses));
                var animator = $animateCss(element, options);
                return animator.$$willAnimate ? animator : null;
            }
            if (!$sniffer.animations && !$sniffer.transitions) return noop;
            var bodyNode = getDomNode($$body), rootNode = getDomNode($rootElement), rootBodyElement = jqLite(bodyNode.parentNode === rootNode ? bodyNode : rootNode);
            applyAnimationClassesFactory($$jqLite);
            return function(animationDetails) {
                return animationDetails.from && animationDetails.to ? prepareFromToAnchorAnimation(animationDetails.from, animationDetails.to, animationDetails.classes, animationDetails.anchors) : prepareRegularAnimation(animationDetails);
            };
        } ];
    } ], $$AnimateJsProvider = [ "$animateProvider", function($animateProvider) {
        this.$get = [ "$injector", "$$AnimateRunner", "$$jqLite", function($injector, $$AnimateRunner, $$jqLite) {
            function lookupAnimations(classes) {
                classes = isArray(classes) ? classes : classes.split(" ");
                for (var matches = [], flagMap = {}, i = 0; i < classes.length; i++) {
                    var klass = classes[i], animationFactory = $animateProvider.$$registeredAnimations[klass];
                    animationFactory && !flagMap[klass] && (matches.push($injector.get(animationFactory)), 
                    flagMap[klass] = !0);
                }
                return matches;
            }
            var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            return function(element, event, classes, options) {
                function applyOptions() {
                    options.domOperation(), applyAnimationClasses(element, options);
                }
                function executeAnimationFn(fn, element, event, options, onDone) {
                    var args;
                    switch (event) {
                      case "animate":
                        args = [ element, options.from, options.to, onDone ];
                        break;

                      case "setClass":
                        args = [ element, classesToAdd, classesToRemove, onDone ];
                        break;

                      case "addClass":
                        args = [ element, classesToAdd, onDone ];
                        break;

                      case "removeClass":
                        args = [ element, classesToRemove, onDone ];
                        break;

                      default:
                        args = [ element, onDone ];
                    }
                    args.push(options);
                    var value = fn.apply(fn, args);
                    if (value) if (isFunction(value.start) && (value = value.start()), value instanceof $$AnimateRunner) value.done(onDone); else if (isFunction(value)) return value;
                    return noop;
                }
                function groupEventedAnimations(element, event, options, animations, fnName) {
                    var operations = [];
                    return forEach(animations, function(ani) {
                        var animation = ani[fnName];
                        animation && operations.push(function() {
                            var runner, endProgressCb, resolved = !1, onAnimationComplete = function(rejected) {
                                resolved || (resolved = !0, (endProgressCb || noop)(rejected), runner.complete(!rejected));
                            };
                            return runner = new $$AnimateRunner({
                                end: function() {
                                    onAnimationComplete();
                                },
                                cancel: function() {
                                    onAnimationComplete(!0);
                                }
                            }), endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {
                                var cancelled = result === !1;
                                onAnimationComplete(cancelled);
                            }), runner;
                        });
                    }), operations;
                }
                function packageAnimations(element, event, options, animations, fnName) {
                    var operations = groupEventedAnimations(element, event, options, animations, fnName);
                    if (0 === operations.length) {
                        var a, b;
                        "beforeSetClass" === fnName ? (a = groupEventedAnimations(element, "removeClass", options, animations, "beforeRemoveClass"), 
                        b = groupEventedAnimations(element, "addClass", options, animations, "beforeAddClass")) : "setClass" === fnName && (a = groupEventedAnimations(element, "removeClass", options, animations, "removeClass"), 
                        b = groupEventedAnimations(element, "addClass", options, animations, "addClass")), 
                        a && (operations = operations.concat(a)), b && (operations = operations.concat(b));
                    }
                    if (0 !== operations.length) return function(callback) {
                        var runners = [];
                        return operations.length && forEach(operations, function(animateFn) {
                            runners.push(animateFn());
                        }), runners.length ? $$AnimateRunner.all(runners, callback) : callback(), function(reject) {
                            forEach(runners, function(runner) {
                                reject ? runner.cancel() : runner.end();
                            });
                        };
                    };
                }
                3 === arguments.length && isObject(classes) && (options = classes, classes = null), 
                options = prepareAnimationOptions(options), classes || (classes = element.attr("class") || "", 
                options.addClass && (classes += " " + options.addClass), options.removeClass && (classes += " " + options.removeClass));
                var before, after, classesToAdd = options.addClass, classesToRemove = options.removeClass, animations = lookupAnimations(classes);
                if (animations.length) {
                    var afterFn, beforeFn;
                    "leave" == event ? (beforeFn = "leave", afterFn = "afterLeave") : (beforeFn = "before" + event.charAt(0).toUpperCase() + event.substr(1), 
                    afterFn = event), "enter" !== event && "move" !== event && (before = packageAnimations(element, event, options, animations, beforeFn)), 
                    after = packageAnimations(element, event, options, animations, afterFn);
                }
                return before || after ? {
                    start: function() {
                        function onComplete(success) {
                            animationClosed = !0, applyOptions(), applyAnimationStyles(element, options), runner.complete(success);
                        }
                        function endAnimations(cancelled) {
                            animationClosed || ((closeActiveAnimations || noop)(cancelled), onComplete(cancelled));
                        }
                        var closeActiveAnimations, chain = [];
                        before && chain.push(function(fn) {
                            closeActiveAnimations = before(fn);
                        }), chain.length ? chain.push(function(fn) {
                            applyOptions(), fn(!0);
                        }) : applyOptions(), after && chain.push(function(fn) {
                            closeActiveAnimations = after(fn);
                        });
                        var animationClosed = !1, runner = new $$AnimateRunner({
                            end: function() {
                                endAnimations();
                            },
                            cancel: function() {
                                endAnimations(!0);
                            }
                        });
                        return $$AnimateRunner.chain(chain, onComplete), runner;
                    }
                } : void 0;
            };
        } ];
    } ], $$AnimateJsDriverProvider = [ "$$animationProvider", function($$animationProvider) {
        $$animationProvider.drivers.push("$$animateJsDriver"), this.$get = [ "$$animateJs", "$$AnimateRunner", function($$animateJs, $$AnimateRunner) {
            function prepareAnimation(animationDetails) {
                var element = animationDetails.element, event = animationDetails.event, options = animationDetails.options, classes = animationDetails.classes;
                return $$animateJs(element, event, classes, options);
            }
            return function(animationDetails) {
                if (animationDetails.from && animationDetails.to) {
                    var fromAnimation = prepareAnimation(animationDetails.from), toAnimation = prepareAnimation(animationDetails.to);
                    if (!fromAnimation && !toAnimation) return;
                    return {
                        start: function() {
                            function endFnFactory() {
                                return function() {
                                    forEach(animationRunners, function(runner) {
                                        runner.end();
                                    });
                                };
                            }
                            function done(status) {
                                runner.complete(status);
                            }
                            var animationRunners = [];
                            fromAnimation && animationRunners.push(fromAnimation.start()), toAnimation && animationRunners.push(toAnimation.start()), 
                            $$AnimateRunner.all(animationRunners, done);
                            var runner = new $$AnimateRunner({
                                end: endFnFactory(),
                                cancel: endFnFactory()
                            });
                            return runner;
                        }
                    };
                }
                return prepareAnimation(animationDetails);
            };
        } ];
    } ], NG_ANIMATE_ATTR_NAME = "data-ng-animate", NG_ANIMATE_PIN_DATA = "$ngAnimatePin", $$AnimateQueueProvider = [ "$animateProvider", function($animateProvider) {
        function isAllowed(ruleType, element, currentAnimation, previousAnimation) {
            return rules[ruleType].some(function(fn) {
                return fn(element, currentAnimation, previousAnimation);
            });
        }
        function hasAnimationClasses(options, and) {
            options = options || {};
            var a = (options.addClass || "").length > 0, b = (options.removeClass || "").length > 0;
            return and ? a && b : a || b;
        }
        var PRE_DIGEST_STATE = 1, RUNNING_STATE = 2, rules = this.rules = {
            skip: [],
            cancel: [],
            join: []
        };
        rules.join.push(function(element, newAnimation, currentAnimation) {
            return !newAnimation.structural && hasAnimationClasses(newAnimation.options);
        }), rules.skip.push(function(element, newAnimation, currentAnimation) {
            return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);
        }), rules.skip.push(function(element, newAnimation, currentAnimation) {
            return "leave" == currentAnimation.event && newAnimation.structural;
        }), rules.skip.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;
        }), rules.cancel.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.structural && newAnimation.structural;
        }), rules.cancel.push(function(element, newAnimation, currentAnimation) {
            return currentAnimation.state === RUNNING_STATE && newAnimation.structural;
        }), rules.cancel.push(function(element, newAnimation, currentAnimation) {
            var nO = newAnimation.options, cO = currentAnimation.options;
            return nO.addClass && nO.addClass === cO.removeClass || nO.removeClass && nO.removeClass === cO.addClass;
        }), this.$get = [ "$$rAF", "$rootScope", "$rootElement", "$document", "$$body", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", function($$rAF, $rootScope, $rootElement, $document, $$body, $$HashMap, $$animation, $$AnimateRunner, $templateRequest, $$jqLite, $$forceReflow) {
            function normalizeAnimationOptions(element, options) {
                return mergeAnimationOptions(element, options, {});
            }
            function findCallbacks(element, event) {
                var targetNode = getDomNode(element), matches = [], entries = callbackRegistry[event];
                return entries && forEach(entries, function(entry) {
                    entry.node.contains(targetNode) && matches.push(entry.callback);
                }), matches;
            }
            function triggerCallback(event, element, phase, data) {
                $$rAF(function() {
                    forEach(findCallbacks(element, event), function(callback) {
                        callback(element, phase, data);
                    });
                });
            }
            function queueAnimation(element, event, options) {
                function notifyProgress(runner, event, phase, data) {
                    triggerCallback(event, element, phase, data), runner.progress(event, phase, data);
                }
                function close(reject) {
                    clearGeneratedClasses(element, options), applyAnimationClasses(element, options), 
                    applyAnimationStyles(element, options), options.domOperation(), runner.complete(!reject);
                }
                var node, parent;
                element = stripCommentsFromElement(element), element && (node = getDomNode(element), 
                parent = element.parent()), options = prepareAnimationOptions(options);
                var runner = new $$AnimateRunner();
                if (isArray(options.addClass) && (options.addClass = options.addClass.join(" ")), 
                options.addClass && !isString(options.addClass) && (options.addClass = null), isArray(options.removeClass) && (options.removeClass = options.removeClass.join(" ")), 
                options.removeClass && !isString(options.removeClass) && (options.removeClass = null), 
                options.from && !isObject(options.from) && (options.from = null), options.to && !isObject(options.to) && (options.to = null), 
                !node) return close(), runner;
                var className = [ node.className, options.addClass, options.removeClass ].join(" ");
                if (!isAnimatableClassName(className)) return close(), runner;
                var isStructural = [ "enter", "move", "leave" ].indexOf(event) >= 0, skipAnimations = !animationsEnabled || disabledElementsLookup.get(node), existingAnimation = !skipAnimations && activeAnimationsLookup.get(node) || {}, hasExistingAnimation = !!existingAnimation.state;
                if (skipAnimations || hasExistingAnimation && existingAnimation.state == PRE_DIGEST_STATE || (skipAnimations = !areAnimationsAllowed(element, parent, event)), 
                skipAnimations) return close(), runner;
                isStructural && closeChildAnimations(element);
                var newAnimation = {
                    structural: isStructural,
                    element: element,
                    event: event,
                    close: close,
                    options: options,
                    runner: runner
                };
                if (hasExistingAnimation) {
                    var skipAnimationFlag = isAllowed("skip", element, newAnimation, existingAnimation);
                    if (skipAnimationFlag) return existingAnimation.state === RUNNING_STATE ? (close(), 
                    runner) : (mergeAnimationOptions(element, existingAnimation.options, options), existingAnimation.runner);
                    var cancelAnimationFlag = isAllowed("cancel", element, newAnimation, existingAnimation);
                    if (cancelAnimationFlag) if (existingAnimation.state === RUNNING_STATE) existingAnimation.runner.end(); else {
                        if (!existingAnimation.structural) return mergeAnimationOptions(element, existingAnimation.options, newAnimation.options), 
                        existingAnimation.runner;
                        existingAnimation.close();
                    } else {
                        var joinAnimationFlag = isAllowed("join", element, newAnimation, existingAnimation);
                        if (joinAnimationFlag) {
                            if (existingAnimation.state !== RUNNING_STATE) return applyGeneratedPreparationClasses(element, isStructural ? event : null, options), 
                            event = newAnimation.event = existingAnimation.event, options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options), 
                            existingAnimation.runner;
                            normalizeAnimationOptions(element, options);
                        }
                    }
                } else normalizeAnimationOptions(element, options);
                var isValidAnimation = newAnimation.structural;
                if (isValidAnimation || (isValidAnimation = "animate" === newAnimation.event && Object.keys(newAnimation.options.to || {}).length > 0 || hasAnimationClasses(newAnimation.options)), 
                !isValidAnimation) return close(), clearElementAnimationState(element), runner;
                var counter = (existingAnimation.counter || 0) + 1;
                return newAnimation.counter = counter, markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation), 
                $rootScope.$$postDigest(function() {
                    var animationDetails = activeAnimationsLookup.get(node), animationCancelled = !animationDetails;
                    animationDetails = animationDetails || {};
                    var parentElement = element.parent() || [], isValidAnimation = parentElement.length > 0 && ("animate" === animationDetails.event || animationDetails.structural || hasAnimationClasses(animationDetails.options));
                    if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) return animationCancelled && (applyAnimationClasses(element, options), 
                    applyAnimationStyles(element, options)), (animationCancelled || isStructural && animationDetails.event !== event) && (options.domOperation(), 
                    runner.end()), void (isValidAnimation || clearElementAnimationState(element));
                    event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, !0) ? "setClass" : animationDetails.event, 
                    markElementAnimationState(element, RUNNING_STATE);
                    var realRunner = $$animation(element, event, animationDetails.options);
                    realRunner.done(function(status) {
                        close(!status);
                        var animationDetails = activeAnimationsLookup.get(node);
                        animationDetails && animationDetails.counter === counter && clearElementAnimationState(getDomNode(element)), 
                        notifyProgress(runner, event, "close", {});
                    }), runner.setHost(realRunner), notifyProgress(runner, event, "start", {});
                }), runner;
            }
            function closeChildAnimations(element) {
                var node = getDomNode(element), children = node.querySelectorAll("[" + NG_ANIMATE_ATTR_NAME + "]");
                forEach(children, function(child) {
                    var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME)), animationDetails = activeAnimationsLookup.get(child);
                    switch (state) {
                      case RUNNING_STATE:
                        animationDetails.runner.end();

                      case PRE_DIGEST_STATE:
                        animationDetails && activeAnimationsLookup.remove(child);
                    }
                });
            }
            function clearElementAnimationState(element) {
                var node = getDomNode(element);
                node.removeAttribute(NG_ANIMATE_ATTR_NAME), activeAnimationsLookup.remove(node);
            }
            function isMatchingElement(nodeOrElmA, nodeOrElmB) {
                return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);
            }
            function areAnimationsAllowed(element, parentElement, event) {
                var animateChildren, bodyElementDetected = isMatchingElement(element, $$body) || "HTML" === element[0].nodeName, rootElementDetected = isMatchingElement(element, $rootElement), parentAnimationDetected = !1, parentHost = element.data(NG_ANIMATE_PIN_DATA);
                for (parentHost && (parentElement = parentHost); parentElement && parentElement.length; ) {
                    rootElementDetected || (rootElementDetected = isMatchingElement(parentElement, $rootElement));
                    var parentNode = parentElement[0];
                    if (parentNode.nodeType !== ELEMENT_NODE) break;
                    var details = activeAnimationsLookup.get(parentNode) || {};
                    if (parentAnimationDetected || (parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode)), 
                    isUndefined(animateChildren) || animateChildren === !0) {
                        var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);
                        isDefined(value) && (animateChildren = value);
                    }
                    if (parentAnimationDetected && animateChildren === !1) break;
                    rootElementDetected || (rootElementDetected = isMatchingElement(parentElement, $rootElement), 
                    rootElementDetected || (parentHost = parentElement.data(NG_ANIMATE_PIN_DATA), parentHost && (parentElement = parentHost))), 
                    bodyElementDetected || (bodyElementDetected = isMatchingElement(parentElement, $$body)), 
                    parentElement = parentElement.parent();
                }
                var allowAnimation = !parentAnimationDetected || animateChildren;
                return allowAnimation && rootElementDetected && bodyElementDetected;
            }
            function markElementAnimationState(element, state, details) {
                details = details || {}, details.state = state;
                var node = getDomNode(element);
                node.setAttribute(NG_ANIMATE_ATTR_NAME, state);
                var oldValue = activeAnimationsLookup.get(node), newValue = oldValue ? extend(oldValue, details) : details;
                activeAnimationsLookup.put(node, newValue);
            }
            var activeAnimationsLookup = new $$HashMap(), disabledElementsLookup = new $$HashMap(), animationsEnabled = null, deregisterWatch = $rootScope.$watch(function() {
                return 0 === $templateRequest.totalPendingRequests;
            }, function(isEmpty) {
                isEmpty && (deregisterWatch(), $rootScope.$$postDigest(function() {
                    $rootScope.$$postDigest(function() {
                        null === animationsEnabled && (animationsEnabled = !0);
                    });
                }));
            }), callbackRegistry = {}, classNameFilter = $animateProvider.classNameFilter(), isAnimatableClassName = classNameFilter ? function(className) {
                return classNameFilter.test(className);
            } : function() {
                return !0;
            }, applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            return {
                on: function(event, container, callback) {
                    var node = extractElementNode(container);
                    callbackRegistry[event] = callbackRegistry[event] || [], callbackRegistry[event].push({
                        node: node,
                        callback: callback
                    });
                },
                off: function(event, container, callback) {
                    function filterFromRegistry(list, matchContainer, matchCallback) {
                        var containerNode = extractElementNode(matchContainer);
                        return list.filter(function(entry) {
                            var isMatch = entry.node === containerNode && (!matchCallback || entry.callback === matchCallback);
                            return !isMatch;
                        });
                    }
                    var entries = callbackRegistry[event];
                    entries && (callbackRegistry[event] = 1 === arguments.length ? null : filterFromRegistry(entries, container, callback));
                },
                pin: function(element, parentElement) {
                    assertArg(isElement(element), "element", "not an element"), assertArg(isElement(parentElement), "parentElement", "not an element"), 
                    element.data(NG_ANIMATE_PIN_DATA, parentElement);
                },
                push: function(element, event, options, domOperation) {
                    return options = options || {}, options.domOperation = domOperation, queueAnimation(element, event, options);
                },
                enabled: function(element, bool) {
                    var argCount = arguments.length;
                    if (0 === argCount) bool = !!animationsEnabled; else {
                        var hasElement = isElement(element);
                        if (hasElement) {
                            var node = getDomNode(element), recordExists = disabledElementsLookup.get(node);
                            1 === argCount ? bool = !recordExists : (bool = !!bool, bool ? recordExists && disabledElementsLookup.remove(node) : disabledElementsLookup.put(node, !0));
                        } else bool = animationsEnabled = !!element;
                    }
                    return bool;
                }
            };
        } ];
    } ], $$AnimateAsyncRunFactory = [ "$$rAF", function($$rAF) {
        function waitForTick(fn) {
            waitQueue.push(fn), waitQueue.length > 1 || $$rAF(function() {
                for (var i = 0; i < waitQueue.length; i++) waitQueue[i]();
                waitQueue = [];
            });
        }
        var waitQueue = [];
        return function() {
            var passed = !1;
            return waitForTick(function() {
                passed = !0;
            }), function(callback) {
                passed ? callback() : waitForTick(callback);
            };
        };
    } ], $$AnimateRunnerFactory = [ "$q", "$sniffer", "$$animateAsyncRun", function($q, $sniffer, $$animateAsyncRun) {
        function AnimateRunner(host) {
            this.setHost(host), this._doneCallbacks = [], this._runInAnimationFrame = $$animateAsyncRun(), 
            this._state = 0;
        }
        var INITIAL_STATE = 0, DONE_PENDING_STATE = 1, DONE_COMPLETE_STATE = 2;
        return AnimateRunner.chain = function(chain, callback) {
            function next() {
                return index === chain.length ? void callback(!0) : void chain[index](function(response) {
                    return response === !1 ? void callback(!1) : (index++, void next());
                });
            }
            var index = 0;
            next();
        }, AnimateRunner.all = function(runners, callback) {
            function onProgress(response) {
                status = status && response, ++count === runners.length && callback(status);
            }
            var count = 0, status = !0;
            forEach(runners, function(runner) {
                runner.done(onProgress);
            });
        }, AnimateRunner.prototype = {
            setHost: function(host) {
                this.host = host || {};
            },
            done: function(fn) {
                this._state === DONE_COMPLETE_STATE ? fn() : this._doneCallbacks.push(fn);
            },
            progress: noop,
            getPromise: function() {
                if (!this.promise) {
                    var self = this;
                    this.promise = $q(function(resolve, reject) {
                        self.done(function(status) {
                            status === !1 ? reject() : resolve();
                        });
                    });
                }
                return this.promise;
            },
            then: function(resolveHandler, rejectHandler) {
                return this.getPromise().then(resolveHandler, rejectHandler);
            },
            "catch": function(handler) {
                return this.getPromise()["catch"](handler);
            },
            "finally": function(handler) {
                return this.getPromise()["finally"](handler);
            },
            pause: function() {
                this.host.pause && this.host.pause();
            },
            resume: function() {
                this.host.resume && this.host.resume();
            },
            end: function() {
                this.host.end && this.host.end(), this._resolve(!0);
            },
            cancel: function() {
                this.host.cancel && this.host.cancel(), this._resolve(!1);
            },
            complete: function(response) {
                var self = this;
                self._state === INITIAL_STATE && (self._state = DONE_PENDING_STATE, self._runInAnimationFrame(function() {
                    self._resolve(response);
                }));
            },
            _resolve: function(response) {
                this._state !== DONE_COMPLETE_STATE && (forEach(this._doneCallbacks, function(fn) {
                    fn(response);
                }), this._doneCallbacks.length = 0, this._state = DONE_COMPLETE_STATE);
            }
        }, AnimateRunner;
    } ], $$AnimationProvider = [ "$animateProvider", function($animateProvider) {
        function setRunner(element, runner) {
            element.data(RUNNER_STORAGE_KEY, runner);
        }
        function removeRunner(element) {
            element.removeData(RUNNER_STORAGE_KEY);
        }
        function getRunner(element) {
            return element.data(RUNNER_STORAGE_KEY);
        }
        var NG_ANIMATE_REF_ATTR = "ng-animate-ref", drivers = this.drivers = [], RUNNER_STORAGE_KEY = "$$animationRunner";
        this.$get = [ "$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$HashMap", "$$rAFScheduler", function($$jqLite, $rootScope, $injector, $$AnimateRunner, $$HashMap, $$rAFScheduler) {
            function sortAnimations(animations) {
                function processNode(entry) {
                    if (entry.processed) return entry;
                    entry.processed = !0;
                    var elementNode = entry.domNode, parentNode = elementNode.parentNode;
                    lookup.put(elementNode, entry);
                    for (var parentEntry; parentNode; ) {
                        if (parentEntry = lookup.get(parentNode)) {
                            parentEntry.processed || (parentEntry = processNode(parentEntry));
                            break;
                        }
                        parentNode = parentNode.parentNode;
                    }
                    return (parentEntry || tree).children.push(entry), entry;
                }
                function flatten(tree) {
                    var i, result = [], queue = [];
                    for (i = 0; i < tree.children.length; i++) queue.push(tree.children[i]);
                    var remainingLevelEntries = queue.length, nextLevelEntries = 0, row = [];
                    for (i = 0; i < queue.length; i++) {
                        var entry = queue[i];
                        0 >= remainingLevelEntries && (remainingLevelEntries = nextLevelEntries, nextLevelEntries = 0, 
                        result.push(row), row = []), row.push(entry.fn), entry.children.forEach(function(childEntry) {
                            nextLevelEntries++, queue.push(childEntry);
                        }), remainingLevelEntries--;
                    }
                    return row.length && result.push(row), result;
                }
                var i, tree = {
                    children: []
                }, lookup = new $$HashMap();
                for (i = 0; i < animations.length; i++) {
                    var animation = animations[i];
                    lookup.put(animation.domNode, animations[i] = {
                        domNode: animation.domNode,
                        fn: animation.fn,
                        children: []
                    });
                }
                for (i = 0; i < animations.length; i++) processNode(animations[i]);
                return flatten(tree);
            }
            var animationQueue = [], applyAnimationClasses = applyAnimationClassesFactory($$jqLite);
            return function(element, event, options) {
                function getAnchorNodes(node) {
                    var SELECTOR = "[" + NG_ANIMATE_REF_ATTR + "]", items = node.hasAttribute(NG_ANIMATE_REF_ATTR) ? [ node ] : node.querySelectorAll(SELECTOR), anchors = [];
                    return forEach(items, function(node) {
                        var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);
                        attr && attr.length && anchors.push(node);
                    }), anchors;
                }
                function groupAnimations(animations) {
                    var preparedAnimations = [], refLookup = {};
                    forEach(animations, function(animation, index) {
                        var element = animation.element, node = getDomNode(element), event = animation.event, enterOrMove = [ "enter", "move" ].indexOf(event) >= 0, anchorNodes = animation.structural ? getAnchorNodes(node) : [];
                        if (anchorNodes.length) {
                            var direction = enterOrMove ? "to" : "from";
                            forEach(anchorNodes, function(anchor) {
                                var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);
                                refLookup[key] = refLookup[key] || {}, refLookup[key][direction] = {
                                    animationID: index,
                                    element: jqLite(anchor)
                                };
                            });
                        } else preparedAnimations.push(animation);
                    });
                    var usedIndicesLookup = {}, anchorGroups = {};
                    return forEach(refLookup, function(operations, key) {
                        var from = operations.from, to = operations.to;
                        if (!from || !to) {
                            var index = from ? from.animationID : to.animationID, indexKey = index.toString();
                            return void (usedIndicesLookup[indexKey] || (usedIndicesLookup[indexKey] = !0, preparedAnimations.push(animations[index])));
                        }
                        var fromAnimation = animations[from.animationID], toAnimation = animations[to.animationID], lookupKey = from.animationID.toString();
                        if (!anchorGroups[lookupKey]) {
                            var group = anchorGroups[lookupKey] = {
                                structural: !0,
                                beforeStart: function() {
                                    fromAnimation.beforeStart(), toAnimation.beforeStart();
                                },
                                close: function() {
                                    fromAnimation.close(), toAnimation.close();
                                },
                                classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),
                                from: fromAnimation,
                                to: toAnimation,
                                anchors: []
                            };
                            group.classes.length ? preparedAnimations.push(group) : (preparedAnimations.push(fromAnimation), 
                            preparedAnimations.push(toAnimation));
                        }
                        anchorGroups[lookupKey].anchors.push({
                            out: from.element,
                            "in": to.element
                        });
                    }), preparedAnimations;
                }
                function cssClassesIntersection(a, b) {
                    a = a.split(" "), b = b.split(" ");
                    for (var matches = [], i = 0; i < a.length; i++) {
                        var aa = a[i];
                        if ("ng-" !== aa.substring(0, 3)) for (var j = 0; j < b.length; j++) if (aa === b[j]) {
                            matches.push(aa);
                            break;
                        }
                    }
                    return matches.join(" ");
                }
                function invokeFirstDriver(animationDetails) {
                    for (var i = drivers.length - 1; i >= 0; i--) {
                        var driverName = drivers[i];
                        if ($injector.has(driverName)) {
                            var factory = $injector.get(driverName), driver = factory(animationDetails);
                            if (driver) return driver;
                        }
                    }
                }
                function beforeStart() {
                    element.addClass(NG_ANIMATE_CLASSNAME), tempClasses && $$jqLite.addClass(element, tempClasses);
                }
                function updateAnimationRunners(animation, newRunner) {
                    function update(element) {
                        getRunner(element).setHost(newRunner);
                    }
                    animation.from && animation.to ? (update(animation.from.element), update(animation.to.element)) : update(animation.element);
                }
                function handleDestroyedElement() {
                    var runner = getRunner(element);
                    !runner || "leave" === event && options.$$domOperationFired || runner.end();
                }
                function close(rejected) {
                    element.off("$destroy", handleDestroyedElement), removeRunner(element), applyAnimationClasses(element, options), 
                    applyAnimationStyles(element, options), options.domOperation(), tempClasses && $$jqLite.removeClass(element, tempClasses), 
                    element.removeClass(NG_ANIMATE_CLASSNAME), runner.complete(!rejected);
                }
                options = prepareAnimationOptions(options);
                var isStructural = [ "enter", "move", "leave" ].indexOf(event) >= 0, runner = new $$AnimateRunner({
                    end: function() {
                        close();
                    },
                    cancel: function() {
                        close(!0);
                    }
                });
                if (!drivers.length) return close(), runner;
                setRunner(element, runner);
                var classes = mergeClasses(element.attr("class"), mergeClasses(options.addClass, options.removeClass)), tempClasses = options.tempClasses;
                return tempClasses && (classes += " " + tempClasses, options.tempClasses = null), 
                animationQueue.push({
                    element: element,
                    classes: classes,
                    event: event,
                    structural: isStructural,
                    options: options,
                    beforeStart: beforeStart,
                    close: close
                }), element.on("$destroy", handleDestroyedElement), animationQueue.length > 1 ? runner : ($rootScope.$$postDigest(function() {
                    var animations = [];
                    forEach(animationQueue, function(entry) {
                        getRunner(entry.element) ? animations.push(entry) : entry.close();
                    }), animationQueue.length = 0;
                    var groupedAnimations = groupAnimations(animations), toBeSortedAnimations = [];
                    forEach(groupedAnimations, function(animationEntry) {
                        toBeSortedAnimations.push({
                            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),
                            fn: function() {
                                animationEntry.beforeStart();
                                var startAnimationFn, closeFn = animationEntry.close, targetElement = animationEntry.anchors ? animationEntry.from.element || animationEntry.to.element : animationEntry.element;
                                if (getRunner(targetElement)) {
                                    var operation = invokeFirstDriver(animationEntry);
                                    operation && (startAnimationFn = operation.start);
                                }
                                if (startAnimationFn) {
                                    var animationRunner = startAnimationFn();
                                    animationRunner.done(function(status) {
                                        closeFn(!status);
                                    }), updateAnimationRunners(animationEntry, animationRunner);
                                } else closeFn();
                            }
                        });
                    }), $$rAFScheduler(sortAnimations(toBeSortedAnimations));
                }), runner);
            };
        } ];
    } ];
    angular.module("ngAnimate", []).provider("$$body", $$BodyProvider).directive("ngAnimateChildren", $$AnimateChildrenDirective).factory("$$rAFScheduler", $$rAFSchedulerFactory).factory("$$AnimateRunner", $$AnimateRunnerFactory).factory("$$animateAsyncRun", $$AnimateAsyncRunFactory).provider("$$animateQueue", $$AnimateQueueProvider).provider("$$animation", $$AnimationProvider).provider("$animateCss", $AnimateCssProvider).provider("$$animateCssDriver", $$AnimateCssDriverProvider).provider("$$animateJs", $$AnimateJsProvider).provider("$$animateJsDriver", $$AnimateJsDriverProvider);
}(window, window.angular);