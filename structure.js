let DEBUGMODE = false //if true will put into the chat all places where the verify structure was not happy

//loops through a pattern for and for every block call a callback passing the pattern value and a block after being matrix multiplied
function getStructure(block,pattern,callback,direction) {
    //let matrix = getMatrixFromDirection(direction)
    let yOff = 0
    pattern.forEach(y => {
        let zOff = 0
        y.forEach(z => {
            let xOff = 0
            Array.from(z).forEach(x => {
                if (x != ' ') {
                    //returning true in the callback stops the operation
                    if (callback( direction.offsetBlock(block,[xOff,yOff,zOff]),x )) return 
                }
                xOff++
            })
            zOff++
        })
        yOff++
    })
}

function buildStructure(block,pattern,key,direction,verify) {
    if (verify != undefined) {
        let validBlocks
        if (verify === true)
            validBlocks = ['minecraft:air','minecraft:dirt','minecraft:dead_bush','kubejs:blue_light','kubejs:yellow_light','kubejs:pink_light','minecraft:black_wool','minecraft:yellow_wool','minecraft:pink_wool','minecraft:light_blue_wool','minecraft:spruce_log','minecraft:shroomlight']
        else
            validBlocks = verify
        let valid = true
        getStructure(block,pattern, (block,data) => {
            if(!validBlocks.includes(block.id)) valid = false
        },direction)
        if (!valid) return false
    }

    getStructure(block,pattern, (block,data) => {
        let blockType = key[data]
        if (blockType != undefined) {
            if (typeof blockType == 'string') block.set(blockType)
            else block.set(blockType[0],blockType[1])
        }
    },direction)
    
    return true
}

function verifyStructure(block,pattern,key,direction) {
    let valid = true
    getStructure(block,pattern, (block,data) => {
        let blockType = key[data]
        if (blockType != undefined) {
            if (typeof blockType == 'string') {//strings check id only
                if (block.id == blockType) return
            } else { //array check id and blockstate
                if (block.id == blockType[0]) {//check id
                    let validBlock = true //check for every key in the blockstate
                    for(const key in blockType[1]) {
                        if(block.properties[key] == undefined || block.properties[key] != blockType[1][key].toString()) {
                            validBlock = false
                        }
                    }
                    if (validBlock) return
                }
            }
        }
        if (DEBUGMODE) Utils.server.tell(`At ${block.x} ${block.y} ${block.z} is ${block.id} but should be ${blockType}`)
        valid = false
        return true //stop operation of the rest of the getStructure
    },direction)
    return valid
}

function applyGlue(block1,block2) {
    const entity = block1.level.createEntity('create:super_glue')
    entity.x = (block1.x + block2.x + 1) / 2
    entity.y = Math.min(block1.y, block2.y)
    entity.z = (block1.z + block2.z + 1) / 2
    const xSize = Math.abs(block1.x - block2.x) + 1
    const zSize = Math.abs(block1.z - block2.z) + 1
    entity.mergeFullNBT({
        From: [
            xSize / -2,
            0,
            zSize / -2
        ],
        To: [
            xSize/ 2,
            Math.abs(block1.y - block2.y) + 1,
            zSize / 2
        ],
        CanUpdate:true
    })
    entity.spawn()
}

function removeGlue(block1,block2) {
    let minX = Math.min(block1.x,block2.x)
    let minY = Math.min(block1.y,block2.y)
    let minZ = Math.min(block1.z,block2.z)
    let maxX = Math.max(block1.x,block2.x)
    let maxY = Math.max(block1.y,block2.y)
    let maxZ = Math.max(block1.z,block2.z)
    block1.level.getEntitiesWithin(AABB.of(minX,minY,minZ,maxX+1,maxY+1,maxZ+1)).forEach(e => {
        if (e.type == "create:super_glue") e.kill()
    })
}
