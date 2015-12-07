'use strict';
var State = require( 'benchmarks/osg/State' );
var MainPerformance = require( 'benchmarks/osg/mainPerformance' );
var Visitor = require( 'benchmarks/osg/Visitor' );
var Animations = require( 'benchmarks/osgAnimation/mainPerformance' );

module.exports = function () {

    State();
    MainPerformance();
    Animations();
    Visitor();

};
