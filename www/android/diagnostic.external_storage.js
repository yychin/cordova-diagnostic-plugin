/* globals cordova, require, exports, module */

/**
 *  Diagnostic External Storage plugin for Android
 *
 *  Copyright (c) 2015 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 **/
var Diagnostic_External_Storage = (function(){
    /***********************
     *
     * Internal properties
     *
     *********************/
    var Diagnostic_External_Storage = {};

    var Diagnostic = require("cordova.plugins.diagnostic.Diagnostic");

    /********************
     *
     * Public properties
     *
     ********************/

    /********************
     *
     * Internal functions
     *
     ********************/


    /*****************************
     *
     * Protected member functions
     *
     ****************************/

    /**********************
     *
     * Public API functions
     *
     **********************/

    /**
     * Requests authorisation for runtime permission to use the external storage.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permission is already granted at installation time.
     * @param {Function} successCallback - function to call on successful request for runtime permission.
     * This callback function is passed a single string parameter which defines the resulting authorisation status as a value in cordova.plugins.diagnostic.permissionStatus.
     * @param {Function} errorCallback - function to call on failure to request authorisation.
     */
    Diagnostic_External_Storage.requestExternalStorageAuthorization = function(successCallback, errorCallback){
        function onSuccess(statuses){
            successCallback(numberOfKeys(statuses) > 1 ? cordova.plugins.diagnostic._combinePermissionStatuses(statuses): statuses[Diagnostic.permission.READ_EXTERNAL_STORAGE]);
        }
        
        return cordova.exec(onSuccess,
            errorCallback,
    		'Diagnostic_External_Storage',
    		'requestExternalStorageAuthorization',
    		[]);
    };

    /**
     * Returns the authorisation status for runtime permission to use the external storage.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permission is already granted at installation time.
     * @param {Function} successCallback - function to call on successful request for runtime permission status.
     * This callback function is passed a single string parameter which defines the current authorisation status as a value in cordova.plugins.diagnostic.permissionStatus.
     * @param {Function} errorCallback - function to call on failure to request authorisation status.
     */
    Diagnostic_External_Storage.getExternalStorageAuthorizationStatus = function(params){
        params.successCallback = params.successCallback || function(){};
        var onSuccess = function(statuses){
            params.successCallback(numberOfKeys(statuses) > 1 ? cordova.plugins.diagnostic._combinePermissionStatuses(statuses): statuses[Diagnostic.permission.READ_EXTERNAL_STORAGE]);
        };

        return cordova.exec(onSuccess,
            params.errorCallback,
            'Diagnostic_External_Storage',
            'getExternalStorageAuthorizationStatus',
            []);
    };

    /**
     * Checks if the application is authorized to use external storage.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return TRUE as permissions are already granted at installation time.
     * @param {Function} successCallback - function to call on successful request for runtime permissions status.
     * This callback function is passed a single boolean parameter which is TRUE if the app currently has runtime authorisation to external storage.
     * @param {Function} errorCallback - function to call on failure to request authorisation status.
     */
    Diagnostic_External_Storage.isExternalStorageAuthorized = function(params){
       params.successCallback = function(){};
        var onSuccess = function(status){
            params.successCallback(status === Diagnostic.permissionStatus.GRANTED);
        };

        Diagnostic_External_Storage.getExternalStorageAuthorizationStatus({
            successCallback: onSuccess,
            errorCallback: params.errorCallback,
        });
    };

    /**
     * Returns details of external SD card(s): absolute path, is writable, free space
     * @param {Function} successCallback - function to call on successful request for external SD card details.
     * This callback function is passed a single argument which is an array consisting of an entry for each external storage location found.
     * Each array entry is an object with the following keys:
     * - {String} path - absolute path to the storage location
     * - {String} filePath - absolute path prefixed with file protocol for use with cordova-plugin-file
     * - {Boolean} canWrite - true if the location is writable
     * - {Integer} freeSpace - number of bytes of free space on the device on which the storage locaiton is mounted.
     * - {String} type - indicates the type of storage location: either "application" if the path is an Android application sandbox path or "root" if the path is the device root.
     * @param {Function} errorCallback - function to call on failure to request authorisation status.
     */
    Diagnostic_External_Storage.getExternalSdCardDetails = function(successCallback, errorCallback){
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic_External_Storage',
            'getExternalSdCardDetails',
            []);
    };

    function numberOfKeys(obj){
        var count = 0;
        for(var k in obj){
            count++;
        }
        return count;
    }

    return Diagnostic_External_Storage;
});
module.exports = new Diagnostic_External_Storage();
