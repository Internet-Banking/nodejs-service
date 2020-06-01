const generateAccountID = () => {
  return '9704' + '88' + Math.random().toString().slice(2, 12)
}
//cannot import from utils because of "Cannot use import statement outside a module" error

const accountIdSeeds = []

const init = () => {
  for (let i = 0; i < 9; i++) {
    accountIdSeeds.push(generateAccountID())
  }
}

init()

module.exports = {accountIdSeeds}
