/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{loggingApi as e}from"../common/loggingApi.js";export function executeDirectVerb(o){try{let e=o.srcUrl;e=`${e}&acrobatPromotionSource=${o.promotionSource}`;const r=o.name,t=o.verb,c=`${o.viewerURL}?pdfurl=${encodeURIComponent(e)}&acrobatPromotionWorkflow=${t}&pdffilename=${encodeURIComponent(r)}`;chrome.tabs.create({url:c,active:!0})}catch(o){e.error({message:"Error executing direct verb",error:o.message})}}