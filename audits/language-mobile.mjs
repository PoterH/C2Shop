import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1105-1297-0_26.1105.1297.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5177'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,2000));
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];
try {
 for(const locale of ['pt-BR','pt-PT','en-US','es-ES']) {
 const context=await browser.newContext({locale,viewport:{width:320,height:740}});
 await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:5177')?r.continue():r.abort());
 const page=await context.newPage();
 await page.goto('http://127.0.0.1:5177/');
 await page.locator('header').waitFor();
 const expected=locale.startsWith('en')?'en':locale.startsWith('es')?'es':locale;
 if(await page.locator('html').getAttribute('lang')!==expected) throw Error('Language '+locale);
 const currency=page.locator('button[title]').filter({hasText:locale==='pt-BR'?'R$':'$'}).first();
 if(!await currency.count()) throw Error('Currency '+locale);
 await page.getByRole('button',{name:'Menu principal',exact:true}).click();
 await page.waitForTimeout(350);
 await page.screenshot({path:`audits/mobile-${locale}.png`});
 await page.getByRole('button',{name:'Menu principal',exact:true}).click();
 await page.locator('button[title]').filter({has:page.locator('svg[aria-label]')}).count();
 await page.goto('http://127.0.0.1:5177/catalogo');
 await page.waitForTimeout(300);
 const width=await page.evaluate(()=>document.documentElement.scrollWidth);
 if(width>320) throw Error('Overflow '+locale+' '+width);
 await page.screenshot({path:`audits/catalog-${locale}.png`});
 await page.evaluate(()=>localStorage.setItem('c2tech_language','es'));
 await page.reload();
 if(await page.locator('html').getAttribute('lang')!=='es') throw Error('Saved preference');
 results.push({locale,detected:expected,width,savedPreference:'passed'});
 await context.close();
 }
 console.log(JSON.stringify(results));
} finally {await browser.close();server.kill();}
