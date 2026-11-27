import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('baked body keeps the 0.2.0 PyPI install and lists the MCP Registry and Gemini CLI extension',()=>{
 const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 assert.match(html,/uv tool install &#x27;orion-phone==0\.2\.0&#x27;|uv tool install 'orion-phone==0\.2\.0'/);
 assert.ok(html.includes('Official MCP Registry as io.github.OrionArchitekton/orion-phone'));
 assert.ok(html.includes('gemini extensions install https://github.com/OrionArchitekton/orion-phone-oss'));
});
