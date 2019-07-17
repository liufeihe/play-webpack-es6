const getDataSync = ()=>{
    return 'hello java2';
}

const getDataWithPromise = ()=>{
   return new Promise((reslove, reject)=>{
       setTimeout(()=>{
           reslove('hello javascipt.')
       }, 3000)
   })
}

const getDataWithAsync = async ()=>{
    return new Promise((reslove, reject)=>{
        setTimeout(()=>{
            reslove('hello python.')
        }, 3000)
    })
}

export {
    getDataSync
    ,getDataWithPromise
    ,getDataWithAsync
}