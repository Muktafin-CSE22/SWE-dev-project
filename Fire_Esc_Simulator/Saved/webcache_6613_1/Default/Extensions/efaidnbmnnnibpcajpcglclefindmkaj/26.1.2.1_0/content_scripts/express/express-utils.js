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
class ExpressUtils{expressEventsCache={};addFontToDocument=async()=>{if("true"===sessionStorage.getItem("adobeCleanFontAdded"))return;const e=chrome.runtime.getURL("browser/css/fonts/AdobeClean-Regular.otf"),s=chrome.runtime.getURL("browser/css/fonts/AdobeClean-Bold.otf"),t=new FontFace("AdobeClean-Regular",`url(${e})`),n=new FontFace("AdobeClean-Bold",`url(${s})`);document.fonts.add(t),document.fonts.add(n),await t.load(),await n.load(),sessionStorage.setItem("adobeCleanFontAdded","true")};isExpressFteTooltipSecond=async()=>{const{env:e}=await chrome.storage.local.get("env");if("prod"===e)return!1;return!!new URLSearchParams(window.location.search).has("expressFteTooltipSecond")};sendAnalyticsEvent=e=>{try{chrome.runtime.sendMessage({main_op:"analytics",analytics:e})}catch(e){}};sendAnalyticsEventOncePerDay=e=>{try{const s=(new Date).toISOString().split("T")[0];chrome.storage.local.get(["expressEventsLastSent"],t=>{const n=t.expressEventsLastSent||{};let o=!1;for(const t of e){const[e,r]=t;this.expressEventsCache[e]!==s&&n[e]!==s&&(o=!0,this.sendAnalyticsEvent(t),this.expressEventsCache[e]=s,n[e]=s)}o&&chrome.storage.local.set({expressEventsLastSent:n})})}catch(e){}};getElementsFromClassNames(e,s){const t=[];for(const n of s){const s=e?.getElementsByClassName?.(n);s&&t.push(...s)}return t}getClosestElementBasedOnSelectors(e,s){for(const t of s){const s=e.closest(t);if(s)return s}return null}getElementsFromXPath=(e,s)=>{const t=[];for(const n of s){const s=document.evaluate(n,e,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let e=0;e<s.snapshotLength;e++)t.push(s.snapshotItem(e))}return t};launchExpress=(e,s,t)=>{chrome.runtime.sendMessage({main_op:"launch-express",imgUrl:e,intent:t,touchpoint:s})};sendInfoLog=(e,...s)=>{chrome.runtime.sendMessage({main_op:"log-info",log:{message:e,...s}})};sendErrorLog=(e,s)=>{chrome.runtime.sendMessage({main_op:"log-error",log:{message:e,error:s}})};removeContextualFte=()=>{const e=document.getElementById("express-contextual-fte");e&&e.remove()}}const expressUtils=new ExpressUtils;export default expressUtils;