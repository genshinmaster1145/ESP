// functions/api.js 临时测试版
export async function onRequest(context) {
  return new Response("Hello from EdgeOne Functions!", {
    headers: { "Content-Type": "text/plain" }
  });
}
