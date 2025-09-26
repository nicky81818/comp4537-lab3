
exports.getFullDate = () => {
  const date = new Date();
  return date.toLocaleString(getLocale(), 
  { 
    timeZone: getTimezone(), 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    timeZoneName: 'short' });
}

function getLocale(){
  return Intl.DateTimeFormat().resolvedOptions().locale;
}

function getTimezone(){
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

exports.getMessage = (name) =>{
  const messages = require("../lang/en/en.json");
  if(name){
    return messages.MESSAGE_1 + " " + name + messages.MESSAGE_2;
  } else {
    return messages.MESSAGE_1 + messages.MESSAGE_2;
  }
}