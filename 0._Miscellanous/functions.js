const genericActionExecutor = (cb, name, action) => cb(name, action)

const nameAction = (name, action) => `${name} is ${action}.`

console.log(genericActionExecutor(nameAction, "Amanda", "spitting"))
console.log(genericActionExecutor(nameAction, "Malte", "shooting"))
console.log(genericActionExecutor(nameAction, "Murat", "running"))