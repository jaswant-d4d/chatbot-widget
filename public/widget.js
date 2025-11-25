(function () {
  const iframe = document.createElement("iframe");

  iframe.src = "https://chatbot-widget-seven-zeta.vercel.app/widget";
  iframe.style.position = "fixed";
  iframe.style.height = "90%";
  iframe.style.bottom = "24px";
  iframe.style.right = "24px";
  iframe.style.maxWidth = "375px";
  iframe.style.maxHeight = "725px";
  iframe.style.minWidth = "320px";
  iframe.style.borderRadius = "8px";
  iframe.style.width = "100%";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999999999999 !important";
  iframe.style.borderRadius = "0px";
  iframe.style.pointerEvents = "auto";
  iframe.style.boxShadow = "rgba(0, 0, 0, 0.12) 0px 12px 48px 4px";
  iframe.style.opacity = "1";
  iframe.style.visibility = "visible";
  iframe.style.transform = "transform";
  iframe.style.transition = "transform 300ms, opacity 300ms";
  document.body.appendChild(iframe);
})();
