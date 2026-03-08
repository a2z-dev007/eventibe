const fs = require('fs');
const file = 'd:/ClientProject/eventibe/app/privacy-policy/page.tsx';
let txt = fs.readFileSync(file, 'utf8');

txt = txt.replace(/<span[^>]*>\s*\d+\.\d+\s*<\/span>(\s*\{\" \"\})?/g, '');

fs.writeFileSync(file, txt);
console.log('done node replace script');
