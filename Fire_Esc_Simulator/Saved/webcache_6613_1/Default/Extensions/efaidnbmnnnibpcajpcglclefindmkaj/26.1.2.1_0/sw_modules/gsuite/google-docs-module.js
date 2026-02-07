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
import{viewerModuleUtils as o}from"../viewer-module-utils.js";import{util as t}from"../util.js";import{floodgate as e}from"../floodgate.js";import{loggingApi as n}from"../../common/loggingApi.js";import{removeExperimentCodeForAnalytics as a,setExperimentCodeForAnalytics as r}from"../../common/experimentUtils.js";import{checkUserLocaleEnabled as c}from"./util.js";const i=o=>{try{return JSON.parse(e.getFeatureMeta(o))}catch(t){return n.error({context:"Google Docs",message:`Failure in parsing FeatureFlag ${o}`,error:t.message||t.toString()}),{validPaths:["document","spreadsheets","presentation"],selectors:{touchPointContainer:["docs-titlebar-buttons"],docTitle:["docs-title-input"]}}}},l={document:{treatmentFlag:"dc-cv-google-docs-convert-to-pdf-touch-point",controlFlag:"dc-cv-google-docs-convert-to-pdf-touch-point-control",treatmentCode:"GDCT",controlCode:"GDCC",preferenceKey:"acrobat-touch-point-in-google-docs"},presentation:{treatmentFlag:"dc-cv-google-slides-convert-to-pdf-touch-point",controlFlag:"dc-cv-google-slides-convert-to-pdf-touch-point-control",treatmentCode:"GST",controlCode:"GSC",preferenceKey:"acrobat-touch-point-in-google-slides"}};async function s(n,s,d){await o.initializeViewerVariables(d);const{docType:g}=n,m=l[g];let p=!1,u={};if(m){const o=!t.isAcrobatTouchPointEnabled(m.preferenceKey),n=await e.hasFlag(m.treatmentFlag),l=await e.hasFlag(m.controlFlag);n&&(u=i("dc-cv-google-docs-convert-to-pdf-selectors"));const s=n&&i(m.treatmentFlag),d=l&&i(m.controlFlag),g=n&&c(s?.isEnLocaleEnabled,s?.isNonEnLocaleEnabled)&&!o,T=l&&c(d?.isEnLocaleEnabled,d?.isNonEnLocaleEnabled)&&!o;g?(r(m.treatmentCode),a(m.controlCode)):T&&(r(m.controlCode),a(m.treatmentCode)),p=g}const T=t.getTranslation("gmailConvertToPdf"),f=t.getTranslation("convertToPDFTouchPointTooltip"),F={enableConvertToPDFTouchPoint:p,...u,text:{acrobatTouchPointTooltip:f,acrobatTouchPointText:T}};if(n?.surfaceNameTranslationKey){const o=t.getTranslation(n?.fteDocTypeNameKey||"fteDocTypeNameFile");F.text.touchPointFTE={title:t.getTranslation("convertToPDFFTEHeading",o),description:t.getTranslation("convertToPDFFTEBody",t.getTranslation(n?.surfaceNameTranslationKey)),button:t.getTranslation("closeButton")}}s(F)}export{s as googleDocsInit};