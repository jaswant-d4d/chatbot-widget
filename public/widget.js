(function () {
  console.log("...........")
  const iframe = document.createElement("iframe");

  iframe.src = "http://localhost:5173/widget";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "420px";
  iframe.style.height = "650px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999999999999 !important";
  iframe.style.borderRadius = "16px";
  iframe.style.pointerEvents = "auto";

  document.body.appendChild(iframe);
})();
