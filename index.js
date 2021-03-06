const puppeteer = require('puppeteer');
const faker = require('faker');
const fs = require('fs');
const readline = require('readline');
const delay = require('delay');
const chalk = require('chalk');


/*************
SETTING LINK OFFER HERE
*************/
const link_offer = 'https://look.tracln.com/offer?prod=604&amp;ref=5283194&amp;s=soccer';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const banner = ()=>{

	console.log(chalk.red('============================='));
	console.log(chalk.yellow('++ Auto Auto wush wush ++'));
	console.log(chalk.green('============================='));
	console.log('\n\n\n');
}

(async() => {

banner();

rl.question(' INPUT YOUR CC LIST >> ', (answa) => {

  fs.readFile(answa, async function(err, data) {
      if (err) throw err;
      const array = data
        .toString()
        .replace(/\r\n|\r|\n/g, " ")
        .split(" ");
for (var ccdetail in array){
var email = faker.internet.email();
var pass = faker.internet.password();

const cicilo = array[ccdetail];
        const cardnumber = cicilo.split('|')[0];
        const expmonth = cicilo.split('|')[1];
        const expyear = cicilo.split('|')[2].replace(/^20/,"");
        const cvv = cicilo.split('|')[3];



const browser = await puppeteer.launch({
	headless:false,
	executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
 const page = await browser.newPage();
 console.log(chalk.cyan('[AWTO] USING CARD => %s'), `${cicilo}`);
 console.log(chalk.yellow('[AWTO] VISIT LINK OFFER => %s'),`${link_offer}`)
 await page.goto(link_offer,{waitUntil:'networkidle2'});
 await page.waitForSelector('#username');

console.log(chalk.green('[AWTO] FILL USERNAME AND PASSWORD '));
console.log(`[DETAIL] Email => ${email} | password => ${pass}`);

await page.type('#username',email,{delay:100});
await page.type('#password',pass,{delay:100});
await page.click('#submit');

await page.waitForSelector('#firstname');

var firstname = faker.name.firstName();
var lastname = faker.name.lastName();
var zipcode = faker.address.zipCode();

console.log(chalk.cyan('[AWTO] FILL DETAIL INFORMATION '));
console.log(`[DETAIL] firstName => ${firstname} , lastname => ${lastname} , zipcode => ${zipcode}`)
await page.type('#firstname',firstname,{delay:100})
await page.type('#lastname',lastname,{delay:100});
await page.type('#zipcode', zipcode,{delay:100});

await page.type('#creditcard',cardnumber, {delay:100});
await page.type('#month-short',expmonth,{delay:100});
await page.type('#year-short',expyear,{delay:100});
await page.type('#cvv',cvv, {delay:100});
await page.click('#submit');

const resp = await page.$eval('.text', respon => respon.textContent);
if (resp.match(/Something went wrong/i)) {
	console.log(chalk.red('[AWTO] XXXXXXXXXXXXXXXXX     TIDAK TEMBUS '));
}else{
	console.log(chalk.green('[AWTO] CROOOOOOOOOOOOOOOOOOOOOOOOTTTTTTTTT '));
}

await page.close();
await browser.close();

console.log('==================[ DELAY 5 SECONDS ]==================');
await delay(500);
console.log('\n');
}

});

    rl.close();
});

})();
