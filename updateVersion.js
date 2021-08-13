const fs = require('fs-extra')

// node进程中实例的参数
console.log(process.env.npm_config_type)

// npm 入参校验
const validateParam = () => {
    const fixedParams = ['main','minor','patch']
    const receivedParam =  process.env.npm_config_type
    if(fixedParams.includes('receivedParam')) {
        return receivedParam
    }else {
        return 'minor'
    }
}   

// 需要升级的类型
const typeParam = validateParam()
/**
 * @desc 处理版本升级的类型 x.y.z
 * @return {string}   version  版本类型 x(主版本).y(次版本).z( 补丁版本)； 
 * @param {string} updateType 需要升级版本的类型
 */
const handleVersionType = (updateType,version) => {
    const versionList = version.split('.')
    const updateVersionObj = {
        main: () => `${versionList[0] - 0 + 1}.${versionList[1]}.${versionList[2]}`,
        minor: () => `${versionList[0]}.${versionList[1]- 0 + 1}.${versionList[2]}`,
        patch: () => `${versionList[0]}.${versionList[1]}.${versionList[2]- 0 + 1}`,
    }
    return updateVersionObj[updateType]()
}

// 处理版本升级的函数容器
const handleVersionContainer = (type,version) => {
    // 升级
    const resl = handleVersionType(type,version)
    return resl
}

// 读文件编辑
const handleEdit = async() => {
    let data = await fs.readJSON('./test.json')
    Object.keys(data).map(key => {
        data[key].version = handleVersionContainer(typeParam,data[key].version)
    })
    return data || null
}
/**
 * @desc 处理版本升级；写文件 返回 JSON 文件
 * @ 
 */
const handleJSONFile = async() => {
    const data = await handleEdit()
    console.log(data)
    fs.writeJson('./test.json',data)
}

handleJSONFile()