import fs from "fs";
import path from "path";

async function testUpload() {
  const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
  let body = "";
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="jobId"\r\n\r\n`;
  body += `1234\r\n`;
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="voucher"; filename="test.jpg"\r\n`;
  body += `Content-Type: image/jpeg\r\n\r\n`;
  body += `fake image content\r\n`;
  body += `--${boundary}--\r\n`;

  const res = await fetch("http://localhost:3000/api/public/voucher", {
    method: "POST",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${boundary}`
    },
    body: body
  });

  console.log(res.status);
  console.log(await res.text());
}

testUpload();
