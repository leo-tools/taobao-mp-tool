const {select} = require('@inquirer/prompts')
const {addLint} = require('./lint')
const add =  async () => {
  let name
  try {
    name = await select({
      message: '请选择:',
      choices: [
        {
          name: 'lint',
          value: 'lint'
        },
      ]
    })
  } catch (error) {
    if(error.isTtyError) {
      console.error('Inquirer cannot run in this environment');
    } else {
      // User force closed
      console.log('Bye!')
    }
    return
  }

  console.log("添加的feature为", name)
  if (name === 'lint') {
    addLint()
  }
}

module.exports = {
  add
}
