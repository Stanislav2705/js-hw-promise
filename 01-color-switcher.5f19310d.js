!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),bodyColor:document.querySelector("body")};function n(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}var e={intervalId:null,isActive:!1,start:function(){var t=this;this.isActive||(this.isActive=!0,this.updateBackgroundColor(),this.intervalId=setInterval((function(){t.updateBackgroundColor(),console.log(n())}),1e3))},stop:function(){clearInterval(this.intervalId),this.isActive=!1},updateBackgroundColor:function(){t.bodyColor.style.backgroundColor=n()}};t.startBtn.addEventListener("click",(function(){e.start()})),t.stopBtn.addEventListener("click",(function(){e.stop()})),t.startBtn.addEventListener("click",(function(){t.startBtn.setAttribute("disabled",!0),t.stopBtn.removeAttribute("disabled")})),t.stopBtn.addEventListener("click",(function(){t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.5f19310d.js.map