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
import{useState,useEffect,useCallback,useRef}from"react";import{sendAnalyticsEvent}from"../utils/fabUtils";export const useFABDrag=({containerRef:e,iframeRef:t,fabManager:a,isDraggedRef:r,onDragStart:n,onDragEnd:o})=>{const[s,c]=useState(a.fabDraggedTop||null),[i,u]=useState(!1),g=useRef(0);useEffect(()=>{a.fabDraggedTop&&c(a.fabDraggedTop)},[a.fabDraggedTop]);const f=useCallback(t=>{if(0!==t.button||t.ctrlKey)return;t.stopPropagation(),t.preventDefault(),u(!0),a.isFABActiveForDrag=!0,r.current=!1,n?.();const o=e.current;if(o){const e=o.getBoundingClientRect();g.current=t.clientY-e.top}},[a,r,n,e]),d=useCallback(t=>{if(!i&&!a.isFABActiveForDrag)return;const n=e.current;if(!n)return;r.current=!0;let o=t.clientY-g.current;const s=n.offsetHeight,u=window.innerHeight-s-20;o=Math.max(20,Math.min(u,o)),a.fabDraggedTop=o,c(o)},[i,a,r,e]),l=useCallback(()=>{(i||a.isFABActiveForDrag)&&(u(!1),a.isFABActiveForDrag=!1,r.current&&(window.dcLocalStorage.setItem("genAIFabTopPosition",a.fabDraggedTop),sendAnalyticsEvent([["DCBrowserExt:SidePanel:FabIcon:Dragged"]]),chrome.runtime.sendMessage({main_op:"log-info",log:{message:"FAB dragged",fabTop:`${a.fabDraggedTop}px`}})),o?.())},[i,a,r,o]);useEffect(()=>(document.addEventListener("mousemove",d),document.addEventListener("mouseup",l),()=>{document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",l)}),[d,l]);return{fabTop:s,handleDragHandleMouseDown:useCallback(e=>{f(e)},[f]),handleIconMouseDown:useCallback(e=>{f(e)},[f]),isFABActiveForDrag:i}};