(function () {
  console.log("...........")
  const iframe = document.createElement("iframe");

  iframe.src = "https://chatbot-widget-seven-zeta.vercel.app/widget";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.minWidth = "320px";
  iframe.style.maxWidth = "380px";
  iframe.style.height = "650px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999999999999 !important";
  iframe.style.borderRadius = "16px";
  iframe.style.pointerEvents = "auto";
  iframe.style.boxShadow = "0 4px 10px rgba(0,0,0,0.20)";



  document.body.appendChild(iframe);
})();
