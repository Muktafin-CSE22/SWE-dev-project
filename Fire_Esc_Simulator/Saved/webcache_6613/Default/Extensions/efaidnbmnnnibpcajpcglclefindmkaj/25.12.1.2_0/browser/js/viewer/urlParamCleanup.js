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
import{dcLocalStorage as e}from"../../../common/local-storage.js";await e.init();let r=null;r||(r=new function(){this.cleanUrl=async r=>{try{const t=await chrome.runtime.sendMessage({main_op:"getFloodgateMeta",flag:"dc-cv-url-param-cleanup"});if(!t)return r;const a=JSON.parse(t);if(!Array.isArray(a))return r;const s=new URL(r),c=e.getItem("viewerStorage")||{};let o=!1,n={},l=!1;const i=s.searchParams.get("storage");if(i)try{n=JSON.parse(i)}catch(e){n={}}return a.forEach(e=>{const{op:r,k:t}=e;t&&Array.isArray(t)&&t.forEach(e=>{switch(r){case 1:s.searchParams.delete(e);break;case 2:Object.prototype.hasOwnProperty.call(c,e)&&(delete c[e],o=!0),Object.prototype.hasOwnProperty.call(n,e)&&(delete n[e],l=!0);break;case 3:Object.keys(c).forEach(r=>{r.startsWith(e)&&(delete c[r],o=!0)}),Object.keys(n).forEach(r=>{r.startsWith(e)&&(delete n[r],l=!0)})}})}),o&&e.setItem("viewerStorage",c),l&&s.searchParams.set("storage",JSON.stringify(n)),s.href}catch(e){return console.warn("url-param-cleanup failed",e),r}}});export const urlParamCleanup=r;