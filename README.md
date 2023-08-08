# structureJSv2
Easily create and valididate structures in minecraft using KubeJS.
You can also create and remove create glue if you have the create mod installed.

Example:
```js
let dir = new MatrixDirection(event.direction)
let block = event.block

if (verifyStructure(block, [
	[
	], [
		"",
		"aaaaaFPa",
		"aPPPPFPa",
		"aFFFFFPa",
		"aaPFfFPa",
		"aaPFFFFF",
		"aaPFPPPP",
		"aaPFaaaa",
	], [
		"",
		"aaaaaFPa",
		"aPPPPFPa",
		"aFFFFFPa",
		"aaPFfFPa",
		"aaPFFFFF",
		"aaPFPPPP",
		"aaPFaaaa",
	], [
		"",
		"aaaaaaaa",
		"aaafffaa",
		"aafffffa",
		"aafffffa",
		"aafffffa",
		"aaafffaa",
		"aaaaaaaa",
	], [
		"",
		"aaaaaaaa",
		"aaaaaaaa",
		"aaaafaaa",
		"aaafffaa",
		"aaaafaaa",
		"aaaaaaaa",
		"aaaaaaaa",
	]
], {
	a: "minecraft:air",
	P: "minecraft:stripped_dark_oak_wood",
	f: "minecraft:pink_concrete_powder",
	F: "minecraft:pink_concrete",
}, dir)
) {
	removeGlue(dir.offsetBlock(block, [1, 1, 1]), dir.offsetBlock(block, [8, 5, 8]))
	buildStructure(block, [
		[
		], [
			"",
			"     aa ",
			" aaaaaa ",
			" aaaaaa ",
			"  aaaaa ",
			"  aaaaaa",
			"  aaaaaa",
			"  aa     ",
		], [
			"",
			"     aa ",
			" aaaaaa ",
			" aaaaaa ",
			"  aaaaa ",
			"  aaaaaa",
			"  aaaaaa",
			"  aa     ",
		], [
			"",
			"        ",
			"   aaa  ",
			"  aaaaa ",
			"  aaaaa ",
			"  aaaaa ",
			"   aaa  ",
			"        ",
		], [
			"",
			"        ",
			"        ",
			"    a   ",
			"   aaa  ",
			"    a   ",
			"        ",
			"        ",
		]
	], {
		a: "minecraft:air"
	}, dir
	)
	Utils.server.runCommandSilent(`playsound minecraft:entity.villager.yes block @a ${block.x} ${block.y} ${block.z}`)
} else {
	Utils.server.runCommandSilent(`playsound minecraft:entity.villager.no block @a ${block.x} ${block.y} ${block.z}`)
}
```
will try to verify and remove a structure (and any glue on it) at a given location and direction and will make villager sounds if successful or not
