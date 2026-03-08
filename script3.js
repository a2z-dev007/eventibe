const fs = require('fs');
const file = 'd:/ClientProject/eventibe/app/privacy-policy/page.tsx';
let txt = fs.readFileSync(file, 'utf8');

// Match <span> containing a number with decimals like 2.1
const pattern1 = /<span className="w-8 h-8 flex-shrink-0 rounded-lg bg-accent-orange\/10 text-accent-orange text-xs flex items-center justify-center font-black">\s*\d+\.\d+\s*<\/span>/g;

const pattern2 = /<span className="text-accent-orange flex-shrink-0">\s*\d+\.\d+\s*<\/span>(\s*\{\s*"\s*"\s*\})?/g;

const pattern3 = /<span className="w-6 h-6 flex-shrink-0 rounded-md bg-accent-orange\/10 text-accent-orange text-\[10px\] flex items-center justify-center font-black">\s*\d+\.\d+\s*<\/span>/g;

let count = 0;
let newTxt = txt.replace(pattern1, () => { count++; return ''; });
newTxt = newTxt.replace(pattern2, () => { count++; return ''; });
newTxt = newTxt.replace(pattern3, () => { count++; return ''; });

fs.writeFileSync(file, newTxt);
console.log('Replaced ' + count + ' items');
