/* global toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('app')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();