// src/utils/formatAIResponse.js
export function formatAIResponse(text = "") {
  if (typeof text !== "string") return "";

  let formatted = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Fix broken HTML or Markdown code sections
  formatted = formatted.replace(
    /(<html[\s\S]*?<\/html>)/gi,
    "\n```html\n$1\n```\n"
  );

  formatted = formatted.replace(
    /(<style[\s\S]*?<\/style>)/gi,
    "\n```css\n$1\n```\n"
  );

  formatted = formatted.replace(
    /(<script[\s\S]*?<\/script>)/gi,
    "\n```js\n$1\n```\n"
  );

  // Add double newlines for better spacing
  formatted = formatted.replace(/([.!?])\s*(?=[A-Z])/g, "$1\n\n");

  return formatted.trim();
}
