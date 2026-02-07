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
import{dcSessionStorage as e}from"./local-storage.js";import{PDF_RENDERING_TRACKING as t,CACHE_PURGE_SCHEME as r}from"../sw_modules/constant.js";import{analytics as o}from"./analytics.js";import{getFloodgateFlag as s}from"./util.js";import{logDirectVerbPerfMetrics as n}from"../sw_modules/direct-verb-utils.js";function i(r){const o=e.getItem(t.SESSIONS_WHERE_PDF_LOADING)||[];if(0===o.length)return[];const s=[],n=[];return o.forEach(e=>{e.tabId===r?s.push(e):n.push(e)}),s.length>0&&e.setItem(t.SESSIONS_WHERE_PDF_LOADING,n),s}async function a(){const o=await s("dc-cv-pdf-tab-close-analytics",r.NO_CALL);return o||e.getItem(t.SESSIONS_WHERE_PDF_LOADING)&&e.removeItem(t.SESSIONS_WHERE_PDF_LOADING),o}export async function registerPDFRenderingSession(r,o){if(!await a())return;const s=e.getItem(t.SESSIONS_WHERE_PDF_LOADING)||[];s.find(e=>e.tabId===r)||(s.push({tabId:r,source:o,startTime:Date.now()}),e.setItem(t.SESSIONS_WHERE_PDF_LOADING,s))}export async function removeAllPDFRenderingSessionsFromTab(e){await a()&&i(e)}export async function pdfRenderingTabCloseListener(e){if(!await a())return;i(e).forEach(t=>{const r=t.startTime?Date.now()-t.startTime:void 0,s=t.directFlowSuccess?"afterDirectFlowSuccess":"beforeDirectFlowSuccess";o.event("DCBrowserExt:Viewer:DirectFlow:TabClosedBeforeViewerLoaded",{source:t.source,loadTime:r,workflow:s}),n(e)})}export async function pdfRenderingTabNavigatedAwayListener(e,t,r){await a()&&(r&&r(t)||i(e))}