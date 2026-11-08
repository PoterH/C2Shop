import { spawn } from 'node:child_process';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5175'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,2500));
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1105-1297-0_26.1105.1297.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({channel:'msedge',headless:true});
const results=[];
for(const width of [320,375,768,1024,1440]) {
 const context=await browser.newContext({viewport:{width,height:850},locale:'en-US'});
 await context.route('**/*',route=>route.request().url().startsWith('http://127.0.0.1:5175') ? route.continue() : route.abort());
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:5175/');
 const product=await page.locator('a[href^="/produto/"]').first().getAttribute('href');
 for(const route of ['/', '/catalogo',product,'/sobre-nos','/contato','/faq','/entrega-e-pagamento','/termos','/privacidade']) {
  await page.goto('http://127.0.0.1:5175'+route); await page.waitForTimeout(250);
  results.push(await page.evaluate(({route,width})=>({route,width,scroll:document.documentElement.scrollWidth,lang:document.documentElement.lang,overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect(); const s=getComputedStyle(e); return r.width && (r.right>innerWidth+2||r.left< -2)&&s.visibility!=='hidden'&&s.opacity!=='0'&&!e.closest('[class*="pointer-events-none"]')}).slice(0,8).map(e=>({tag:e.tagName,cls:e.className?.baseVal??e.className,text:e.textContent.slice(0,50)}))}),{route,width}));
 }
 await context.close();
}
const {writeFileSync}=await import('node:fs'); writeFileSync('audits/after.json',JSON.stringify(results,null,2)); console.log(JSON.stringify(results.filter(x=>x.scroll>x.width),null,2));
await browser.close(); server.kill();



