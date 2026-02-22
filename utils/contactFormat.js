function contactFormat(no) {
  return no.split("-").join("").replace("0", "62");
}

// console.log(contactFormat("0858-1338-5224"));

export default contactFormat;
