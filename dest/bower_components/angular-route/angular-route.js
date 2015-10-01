/*! flatmate-client 2015-10-01 */
!function(window, angular, undefined) {
    "use strict";
    function $RouteProvider() {
        function inherit(parent, extra) {
            return angular.extend(Object.create(parent), extra);
        }
        function pathRegExp(path, opts) {
            var insensitive = opts.caseInsensitiveMatch, ret = {
                originalPath: path,
                regexp: path
            }, keys = ret.keys = [];
            return path = path.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(_, slash, key, option) {
                var optional = "?" === option ? option : null, star = "*" === option ? option : null;
                return keys.push({
                    name: key,
                    optional: !!optional
                }), slash = slash || "", "" + (optional ? "" : slash) + "(?:" + (optional ? slash : "") + (star && "(.+?)" || "([^/]+)") + (optional || "") + ")" + (optional || "");
            }).replace(/([\/$\*])/g, "\\$1"), ret.regexp = new RegExp("^" + path + "$", insensitive ? "i" : ""), 
            ret;
        }
        var routes = {};
        this.when = function(path, route) {
            var routeCopy = angular.copy(route);
            if (angular.isUndefined(routeCopy.reloadOnSearch) && (routeCopy.reloadOnSearch = !0), 
            angular.isUndefined(routeCopy.caseInsensitiveMatch) && (routeCopy.caseInsensitiveMatch = this.caseInsensitiveMatch), 
            routes[path] = angular.extend(routeCopy, path && pathRegExp(path, routeCopy)), path) {
                var redirectPath = "/" == path[path.length - 1] ? path.substr(0, path.length - 1) : path + "/";
                routes[redirectPath] = angular.extend({
                    redirectTo: path
                }, pathRegExp(redirectPath, routeCopy));
            }
            return this;
        }, this.caseInsensitiveMatch = !1, this.otherwise = function(params) {
            return "string" == typeof params && (params = {
                redirectTo: params
            }), this.when(null, params), this;
        }, this.$get = [ "$rootScope", "$location", "$routeParams", "$q", "$injector", "$templateRequest", "$sce", function($rootScope, $location, $routeParams, $q, $injector, $templateRequest, $sce) {
            function switchRouteMatcher(on, route) {
                var keys = route.keys, params = {};
                if (!route.regexp) return null;
                var m = route.regexp.exec(on);
                if (!m) return null;
                for (var i = 1, len = m.length; len > i; ++i) {
                    var key = keys[i - 1], val = m[i];
                    key && val && (params[key.name] = val);
                }
                return params;
            }
            function prepareRoute($locationEvent) {
                var lastRoute = $route.current;
                preparedRoute = parseRoute(), preparedRouteIsUpdateOnly = preparedRoute && lastRoute && preparedRoute.$$route === lastRoute.$$route && angular.equals(preparedRoute.pathParams, lastRoute.pathParams) && !preparedRoute.reloadOnSearch && !forceReload, 
                preparedRouteIsUpdateOnly || !lastRoute && !preparedRoute || $rootScope.$broadcast("$routeChangeStart", preparedRoute, lastRoute).defaultPrevented && $locationEvent && $locationEvent.preventDefault();
            }
            function commitRoute() {
                var lastRoute = $route.current, nextRoute = preparedRoute;
                preparedRouteIsUpdateOnly ? (lastRoute.params = nextRoute.params, angular.copy(lastRoute.params, $routeParams), 
                $rootScope.$broadcast("$routeUpdate", lastRoute)) : (nextRoute || lastRoute) && (forceReload = !1, 
                $route.current = nextRoute, nextRoute && nextRoute.redirectTo && (angular.isString(nextRoute.redirectTo) ? $location.path(interpolate(nextRoute.redirectTo, nextRoute.params)).search(nextRoute.params).replace() : $location.url(nextRoute.redirectTo(nextRoute.pathParams, $location.path(), $location.search())).replace()), 
                $q.when(nextRoute).then(function() {
                    if (nextRoute) {
                        var template, templateUrl, locals = angular.extend({}, nextRoute.resolve);
                        return angular.forEach(locals, function(value, key) {
                            locals[key] = angular.isString(value) ? $injector.get(value) : $injector.invoke(value, null, null, key);
                        }), angular.isDefined(template = nextRoute.template) ? angular.isFunction(template) && (template = template(nextRoute.params)) : angular.isDefined(templateUrl = nextRoute.templateUrl) && (angular.isFunction(templateUrl) && (templateUrl = templateUrl(nextRoute.params)), 
                        angular.isDefined(templateUrl) && (nextRoute.loadedTemplateUrl = $sce.valueOf(templateUrl), 
                        template = $templateRequest(templateUrl))), angular.isDefined(template) && (locals.$template = template), 
                        $q.all(locals);
                    }
                }).then(function(locals) {
                    nextRoute == $route.current && (nextRoute && (nextRoute.locals = locals, angular.copy(nextRoute.params, $routeParams)), 
                    $rootScope.$broadcast("$routeChangeSuccess", nextRoute, lastRoute));
                }, function(error) {
                    nextRoute == $route.current && $rootScope.$broadcast("$routeChangeError", nextRoute, lastRoute, error);
                }));
            }
            function parseRoute() {
                var params, match;
                return angular.forEach(routes, function(route, path) {
                    !match && (params = switchRouteMatcher($location.path(), route)) && (match = inherit(route, {
                        params: angular.extend({}, $location.search(), params),
                        pathParams: params
                    }), match.$$route = route);
                }), match || routes[null] && inherit(routes[null], {
                    params: {},
                    pathParams: {}
                });
            }
            function interpolate(string, params) {
                var result = [];
                return angular.forEach((string || "").split(":"), function(segment, i) {
                    if (0 === i) result.push(segment); else {
                        var segmentMatch = segment.match(/(\w+)(?:[?*])?(.*)/), key = segmentMatch[1];
                        result.push(params[key]), result.push(segmentMatch[2] || ""), delete params[key];
                    }
                }), result.join("");
            }
            var preparedRoute, preparedRouteIsUpdateOnly, forceReload = !1, $route = {
                routes: routes,
                reload: function() {
                    forceReload = !0, $rootScope.$evalAsync(function() {
                        prepareRoute(), commitRoute();
                    });
                },
                updateParams: function(newParams) {
                    if (!this.current || !this.current.$$route) throw $routeMinErr("norout", "Tried updating route when with no current route");
                    newParams = angular.extend({}, this.current.params, newParams), $location.path(interpolate(this.current.$$route.originalPath, newParams)), 
                    $location.search(newParams);
                }
            };
            return $rootScope.$on("$locationChangeStart", prepareRoute), $rootScope.$on("$locationChangeSuccess", commitRoute), 
            $route;
        } ];
    }
    function $RouteParamsProvider() {
        this.$get = function() {
            return {};
        };
    }
    function ngViewFactory($route, $anchorScroll, $animate) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(scope, $element, attr, ctrl, $transclude) {
                function cleanupLastView() {
                    previousLeaveAnimation && ($animate.cancel(previousLeaveAnimation), previousLeaveAnimation = null), 
                    currentScope && (currentScope.$destroy(), currentScope = null), currentElement && (previousLeaveAnimation = $animate.leave(currentElement), 
                    previousLeaveAnimation.then(function() {
                        previousLeaveAnimation = null;
                    }), currentElement = null);
                }
                function update() {
                    var locals = $route.current && $route.current.locals, template = locals && locals.$template;
                    if (angular.isDefined(template)) {
                        var newScope = scope.$new(), current = $route.current, clone = $transclude(newScope, function(clone) {
                            $animate.enter(clone, null, currentElement || $element).then(function() {
                                !angular.isDefined(autoScrollExp) || autoScrollExp && !scope.$eval(autoScrollExp) || $anchorScroll();
                            }), cleanupLastView();
                        });
                        currentElement = clone, currentScope = current.scope = newScope, currentScope.$emit("$viewContentLoaded"), 
                        currentScope.$eval(onloadExp);
                    } else cleanupLastView();
                }
                var currentScope, currentElement, previousLeaveAnimation, autoScrollExp = attr.autoscroll, onloadExp = attr.onload || "";
                scope.$on("$routeChangeSuccess", update), update();
            }
        };
    }
    function ngViewFillContentFactory($compile, $controller, $route) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(scope, $element) {
                var current = $route.current, locals = current.locals;
                $element.html(locals.$template);
                var link = $compile($element.contents());
                if (current.controller) {
                    locals.$scope = scope;
                    var controller = $controller(current.controller, locals);
                    current.controllerAs && (scope[current.controllerAs] = controller), $element.data("$ngControllerController", controller), 
                    $element.children().data("$ngControllerController", controller);
                }
                link(scope);
            }
        };
    }
    var ngRouteModule = angular.module("ngRoute", [ "ng" ]).provider("$route", $RouteProvider), $routeMinErr = angular.$$minErr("ngRoute");
    ngRouteModule.provider("$routeParams", $RouteParamsProvider), ngRouteModule.directive("ngView", ngViewFactory), 
    ngRouteModule.directive("ngView", ngViewFillContentFactory), ngViewFactory.$inject = [ "$route", "$anchorScroll", "$animate" ], 
    ngViewFillContentFactory.$inject = [ "$compile", "$controller", "$route" ];
}(window, window.angular);