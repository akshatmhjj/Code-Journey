export const buildHtmlForPreview = (h, c, j) => {
  const shim = `
<script>
(function(){
  function forward(type, args){
    try { parent.postMessage({ _source: 'cj-editor-iframe', payload: { type, args } }, '*'); } catch(e){}
  }
  ['log','error','warn','info','debug'].forEach(m=>{
    const orig = console[m];
    console[m] = function(){
      try { forward(m, Array.from(arguments)); } catch(e){}
      orig.apply(console, arguments);
    };
  });
})();
</script>
`;

  return `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>${c}</style>
</head>
<body>
${h}
<script>
try {
${j}
} catch(e){ console.error(e); }
</script>
${shim}
</body>
</html>`;
};
