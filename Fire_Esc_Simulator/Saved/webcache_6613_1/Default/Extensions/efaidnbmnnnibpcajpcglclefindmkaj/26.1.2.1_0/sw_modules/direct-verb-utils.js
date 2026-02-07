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
import{loggingApi as e}from"../common/loggingApi.js";import{dcSessionStorage as r}from"../common/local-storage.js";import{PDF_RENDERING_TRACKING as t}from"./constant.js";import{util as o}from"./util.js";export function getDirectVerbStorageKey(e){return`${e}_DirectVerbPerformance`}export async function executeDirectVerb(t){try{let e=t.srcUrl;const c=t.promotionSource;e=`${e}&acrobatPromotionSource=${c}`;const i=t.viewerURL,m=t.name,n=t.verb,s=t.clickTimestamp,a=o.uuid(),g=`${i}?pdfurl=${encodeURIComponent(e)}&acrobatPromotionWorkflow=${n}&pdffilename=${encodeURIComponent(m)}&directVerbSessionId=${a}`;!async function(e,t,o,c){try{const i=getDirectVerbStorageKey(e),m=r.getItem(i)||{};m[t]={promotionSource:o,clickTimestamp_startTime:c},await r.setItem(i,m)}catch(e){}}((await chrome.tabs.create({url:g,active:!0})).id,a,c,s)}catch(r){e.error({message:"Error executing direct verb",error:r.message})}}export function markDirectFlowSuccess(e){const o=(r.getItem(t.SESSIONS_WHERE_PDF_LOADING)||[]).map(r=>r.tabId===e?{...r,directFlowSuccess:!0}:r);r.setItem(t.SESSIONS_WHERE_PDF_LOADING,o)}export async function logDirectVerbPerfMetrics(t){if(t)try{const o=getDirectVerbStorageKey(t),c=r.getItem(o);if(c){const[t,i]=Object.entries(c)[0]||[];t&&i&&e.info({message:"Direct verb performance metrics",directVerbSessionId:t,...i}),await r.removeItem(o)}}catch(r){e.error({message:"Failed to log direct verb performance metrics",error:r?.message})}}