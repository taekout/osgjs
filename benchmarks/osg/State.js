'use strict';
var QUnit = require( 'qunit' );

var CullFace = require( 'osg/CullFace' );
var BlendFunc = require( 'osg/BlendFunc' );
var Depth = require( 'osg/Depth' );
var ColorMask = require( 'osg/ColorMask' );
var Material = require( 'osg/Material' );
var Light = require( 'osg/Light' );
var StateAttribute = require( 'osg/StateAttribute' );
var StateSet = require( 'osg/StateSet' );
var State = require( 'osg/State' );
var Timer = require( 'osg/Timer' );
var osgShader = require( 'osgShader/osgShader' );

var reportStats = require( 'benchmarks/reportStats' );

module.exports = function () {

    QUnit.module( 'State' );

    test( 'push/pop', function () {

        var state = new State( new osgShader.ShaderGeneratorProxy() );

        var nCount = 20;
        var stateSetList = [];
        var i;
        for ( i = 0; i < nCount; i++ ) {
            var stateSet = new StateSet();
            stateSet.setAttributeAndModes( new CullFace() );

            var override = i === 5 ? StateAttribute.OVERRIDE | StateAttribute.ON : StateAttribute.ON;
            stateSet.setAttributeAndModes( new BlendFunc(), override );
            stateSet.setAttributeAndModes( new Depth(), override );

            var attributeProtected = i < ( nCount - 1 ) ? StateAttribute.ON : StateAttribute.PROTECTED | StateAttribute.ON;

            stateSet.setAttributeAndModes( new ColorMask(), attributeProtected );
            stateSet.setAttributeAndModes( new Material(), attributeProtected );
            stateSet.setAttributeAndModes( new Light() );
            stateSetList.push( stateSet );
        }

        console.profile();
        console.time( 'time' );
        var timed = Timer.instance().tick();

        // does the test 100 times
        for ( i = 0; i < 1000; i++ ) {
            for ( var n = 0; n < nCount; n++ ) {
                state.pushStateSet( stateSetList[ n ] );
                state.popStateSet();
            }
        }

        timed = Timer.instance().tick() - timed;
        console.timeEnd( 'time' );
        console.profileEnd();

        reportStats( timed, 'State push/pop StateSet' );

    } );

};
