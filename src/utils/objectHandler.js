const sortObject = (o) => { //copy from VNPay document
  const sorted = {}
  let key = []
  const a = []

  for (key in o) {
    // eslint-disable-next-line no-prototype-builtins
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

export default sortObject
