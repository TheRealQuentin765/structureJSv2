MappedDirection.prototype = {
    setFromString: function(str) {
    },
    toString: function() { // yZx would mean that x->y y->-z z->x
        return `${this.xIn}${this.yIn}${this.zIn}`
    },
    offsetBlock: function(block, offsetIn) {
        let offsetOut = this.convertOffset(offsetIn)
        return block.offset(offsetOut[0],offsetOut[1],offsetOut[2])
    },
    convertOffset: function(input) {
        return [
            input[ this.getIndex(this.xIn) ] * (this.isDigitFlipped(this.xIn) ? -1 : 1),
            input[ this.getIndex(this.yIn) ] * (this.isDigitFlipped(this.yIn) ? -1 : 1),
            input[ this.getIndex(this.zIn) ] * (this.isDigitFlipped(this.zIn) ? -1 : 1),
        ]
    },
    isDigitFlipped: function(value) {
        return value == 'X' || value == 'Y' || value == 'Z'
    },
    getIndex: function(value) {
        switch (value.toLowerCase()) {
            case 'x': return 0
            case 'y': return 1
            case 'z': return 2
        }
    },
    flipZ: function() {
        this.xIn = this.toggleSingleZ(this.xIn)
        this.yIn = this.toggleSingleZ(this.yIn)
        this.zIn = this.toggleSingleZ(this.zIn)
    },
    toggleSingleZ(input) {
        if (input == 'z') return 'Z'
        if (input == 'Z') return 'z'
        return input
    }
}

function MappedDirection(input, flipped) {
    let toValues = "xyz"
    if (input == undefined) {}
    else if (typeof input == 'string') {
        toValues = input
    } else { //assume that it is a Direction
        if (flipped)
            switch (input) {
                case Direction.east:  toValues = "xyZ"; break
                case Direction.south: toValues = "zyx"; break
                case Direction.west:  toValues = "Xyz"; break
                case Direction.north: toValues = "ZyX"; break
                case Direction.up:    toValues = "YxZ"; break
                case Direction.down:  toValues = "YXz"; break
                default:              throw "Not a valid Direction"
            }
        else
            switch (input) {
                case Direction.east:  toValues = "xyz"; break
                case Direction.south: toValues = "Zyx"; break
                case Direction.west:  toValues = "XyZ"; break
                case Direction.north: toValues = "zyX"; break
                case Direction.up:    toValues = "Yxz"; break
                case Direction.down:  toValues = "YXZ"; break
                default:              throw "Not a valid Direction"
            }
    }
    this.xIn = toValues.charAt(0)
    this.yIn = toValues.charAt(1)
    this.zIn = toValues.charAt(2)
}
