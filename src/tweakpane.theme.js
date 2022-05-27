/**
 * Inject Shades of Purple Tweakpane styles
 */
 const style = document.createElement('style')
 style.innerHTML = `
 :root {
   --tp-base-background-color: hsla(243, 33%, 25%, 1.00);
   --tp-base-shadow-color: hsla(0, 0%, 0%, 0.25);
   --tp-button-background-color: hsla(49, 96%, 54%, 1.00);
   --tp-button-background-color-active: hsla(49, 96%, 39%, 1.00);
   --tp-button-background-color-focus: hsla(49, 96%, 44%, 1.00);
   --tp-button-background-color-hover: hsla(49, 96%, 49%, 1.00);
   --tp-button-foreground-color: hsla(240, 35%, 18%, 1.00);
   --tp-container-background-color: hsla(0, 0%, 0%, 0.20);
   --tp-container-background-color-active: rgba(38, 38, 38, 0.20);
   --tp-container-background-color-focus: rgba(26, 26, 26, 0.20);
   --tp-container-background-color-hover: rgba(13, 13, 13, 0.20);
   --tp-container-foreground-color: hsla(249, 65%, 76%, 1.00);
   --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.50);
   --tp-input-background-color: hsla(240, 35%, 18%, 1.00);
   --tp-input-background-color-active: rgba(55, 55, 114, 1.00);
   --tp-input-background-color-focus: hsla(240, 35%, 33%, 1.00);
   --tp-input-background-color-hover: rgba(38, 38, 79, 1.00);
   --tp-input-foreground-color: hsla(0, 0%, 100%, 0.90);
   --tp-label-foreground-color: hsla(249, 65%, 76%, 1.00);
   --tp-monitor-background-color: hsla(0, 0%, 0%, 0.50);
   --tp-monitor-foreground-color: hsla(249, 65%, 76%, 1.00);
 }
 
 body .tp-dfwv {
   min-width: 300px;
   z-index: 999999999999;
 }
 /* Input and monitor view */
 body .tp-lblv_v {
   min-width: 180px;
 }
 /* scrollable panels */
 .tp-fldv .tp-brkv {
   max-height: 300px;
   overflow-y: auto !important;
 }
 `
document.head.appendChild(style)