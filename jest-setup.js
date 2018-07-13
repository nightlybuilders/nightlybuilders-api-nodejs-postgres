// allows to await promises in tests
global.nextTick = () => new Promise(res => process.nextTick(res))
